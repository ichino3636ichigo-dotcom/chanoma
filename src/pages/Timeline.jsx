import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Trash2, Flag, X, Send, ShieldCheck, ImagePlus } from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../lib/firebase';

// ─────────────────────────────────────────────────────────────
// みんなのお稽古（タイムライン）
// ・読むのは誰でも、書くのはログインしてニックネームを決めた人だけ
// ・自分の投稿は削除できる。他の人の投稿は通報できる
// ・管理者（admins コレクションに登録した人）は、どの投稿も削除でき、通報の一覧を見られる
// ─────────────────────────────────────────────────────────────

const MAX_LEN = 280;
// 写真：横長 3:2 に切り抜き、長辺 1200px の JPEG に縮めて投稿と一緒に保存する（1枚およそ 100〜300KB）
const PHOTO_W = 1200;
const PHOTO_H = 800;
const PHOTO_MAX_CHARS = 550000;

// 選んだ写真を横長 3:2 に中央で切り抜いて、軽い JPEG にする
const makePhoto = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const ratio = PHOTO_W / PHOTO_H;
      let sw = img.naturalWidth;
      let sh = img.naturalHeight;
      let sx = 0;
      let sy = 0;
      if (sw / sh > ratio) {
        sx = (sw - sh * ratio) / 2;
        sw = sh * ratio;
      } else {
        sy = (sh - sw / ratio) / 2;
        sh = sw / ratio;
      }
      const w = Math.min(PHOTO_W, Math.round(sw));
      const h = Math.round(w / ratio);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      let q = 0.8;
      let data = canvas.toDataURL('image/jpeg', q);
      while (data.length > PHOTO_MAX_CHARS && q > 0.4) {
        q -= 0.1;
        data = canvas.toDataURL('image/jpeg', q);
      }
      if (data.length > PHOTO_MAX_CHARS) reject(new Error('too-large'));
      else resolve(data);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable'));
    };
    img.src = url;
  });

// 写真の額：白い余白と細い枠、毛筆の一言
const Shikishi = ({ src, caption, alt }) => (
  <figure className="tl-shikishi">
    <div className="tl-shikishi-mat">
      <img src={src} alt={alt} className="tl-shikishi-photo" loading="lazy" />
      {caption && <figcaption className="tl-shikishi-caption tl-pre">{caption}</figcaption>}
    </div>
  </figure>
);
const NICK_MAX = 20;
const PAGE = 30;

const TEXT = {
  ja: {
    back: 'ホームに戻る',
    title: 'みんなのお稽古',
    subtitle: '今日のお稽古、ひとことどうぞ',
    notReady: 'みんなのお稽古は現在準備中です。もうしばらくお待ちください。',
    loginToPost: 'Googleでログインして投稿する',
    logout: 'ログアウト',
    placeholder: '今日のお稽古はどうでしたか？（お点前、お道具、季節のことなど）',
    photoPlaceholder: '写真にひとこと（色紙に書き添えます）',
    addPhoto: '写真を添える',
    removePhoto: '写真を外す',
    photoNote: '写真は横長に切り抜かれます。人の顔や個人がわかるものが写っていないか確かめてください。',
    errPhoto: 'この写真は読み込めませんでした。JPEG か PNG の写真でお試しください。',
    post: '投稿する',
    posting: '投稿中…',
    nickTitle: 'ニックネームを決めましょう',
    nickLead: '投稿にはこの名前が表示されます。本名でなくて大丈夫です。あとから変えられます。',
    nickPh: '例：抹茶すき',
    nickSave: 'この名前で始める',
    nickChange: '名前を変える',
    nickNote: '名前を変えても、これまでの投稿の名前は変わりません。',
    postingAs: (n) => `${n} として投稿`,
    empty: 'まだ投稿がありません。最初のひとことをどうぞ。',
    loading: '読み込み中...',
    more: 'もっと見る',
    remove: '削除',
    report: '通報',
    confirmDelete: 'この投稿を削除しますか？元に戻せません。',
    reportTitle: 'この投稿を通報する',
    reportLead: '運営者が内容を確認します。通報したことは投稿者には伝わりません。',
    reportPh: '理由（任意）',
    reportSend: '通報する',
    reportDone: '通報しました。ご協力ありがとうございます。',
    cancel: 'キャンセル',
    rulesTitle: '投稿のルール',
    rules: [
      '茶道やお稽古にまつわることを、気軽に書いてください。',
      '人を傷つける言葉、宣伝、個人を特定できる情報（自分や他人の本名・連絡先など）は書かないでください。',
      'ルールに合わない投稿は、運営者が予告なく削除することがあります。',
    ],
    justNow: 'たった今',
    minAgo: (n) => `${n}分前`,
    hourAgo: (n) => `${n}時間前`,
    adminReports: '通報の一覧（管理者だけに表示）',
    noReports: '未対応の通報はありません。',
    reportReason: '理由',
    deletedPost: '（すでに削除された投稿）',
    dismiss: '対応済みにする',
    errLogin: 'ログインできませんでした。もう一度お試しください。',
    errDomain: 'このサイトのドメインがまだログイン許可されていません。',
    errRules: '読み込めませんでした。少し時間をおいてお試しください。',
    errPost: '投稿できませんでした。通信状況を確認して、もう一度お試しください。',
  },
  en: {
    back: 'Back to Home',
    title: 'Practice Log',
    subtitle: 'Share a word about today’s lesson',
    notReady: 'The Practice Log is being set up. Please check back soon.',
    loginToPost: 'Sign in with Google to post',
    logout: 'Sign out',
    placeholder: 'How was your lesson today? (temae, utensils, the season...)',
    photoPlaceholder: 'A few words for your photo',
    addPhoto: 'Add a photo',
    removePhoto: 'Remove photo',
    photoNote: 'Photos are cropped to landscape. Please make sure no faces or personal details are visible.',
    errPhoto: 'This photo could not be read. Please try a JPEG or PNG.',
    post: 'Post',
    posting: 'Posting…',
    nickTitle: 'Choose a nickname',
    nickLead: 'This name appears on your posts. It doesn’t need to be your real name, and you can change it later.',
    nickPh: 'e.g. matcha lover',
    nickSave: 'Start with this name',
    nickChange: 'Change name',
    nickNote: 'Changing your name does not update your past posts.',
    postingAs: (n) => `Posting as ${n}`,
    empty: 'No posts yet. Be the first to share.',
    loading: 'Loading...',
    more: 'Show more',
    remove: 'Delete',
    report: 'Report',
    confirmDelete: 'Delete this post? This cannot be undone.',
    reportTitle: 'Report this post',
    reportLead: 'The site operator will review it. The author will not be told who reported it.',
    reportPh: 'Reason (optional)',
    reportSend: 'Report',
    reportDone: 'Reported. Thank you.',
    cancel: 'Cancel',
    rulesTitle: 'Posting rules',
    rules: [
      'Share anything about tea and your practice.',
      'No hurtful language, advertising, or personal information (real names, contact details) about yourself or others.',
      'Posts that break these rules may be removed without notice.',
    ],
    justNow: 'just now',
    minAgo: (n) => `${n} min ago`,
    hourAgo: (n) => `${n} h ago`,
    adminReports: 'Reports (visible to admins only)',
    noReports: 'No open reports.',
    reportReason: 'Reason',
    deletedPost: '(post already deleted)',
    dismiss: 'Mark as handled',
    errLogin: 'Could not sign in. Please try again.',
    errDomain: 'This site’s domain is not yet authorized for sign-in.',
    errRules: 'Could not load posts. Please try again later.',
    errPost: 'Could not post. Check your connection and try again.',
  },
};

const toDate = (ts) => (ts && typeof ts.toDate === 'function' ? ts.toDate() : null);

const Timeline = () => {
  const [language, setLanguage] = useState('ja');
  const t = TEXT[language];
  const locale = language === 'ja' ? 'ja-JP' : 'en-US';

  const [user, setUser] = useState(undefined); // undefined=確認中 / null=未ログイン
  const [nickname, setNickname] = useState(undefined); // undefined=確認中 / ''=未設定
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState(null);
  const [count, setCount] = useState(PAGE);
  const [hasMore, setHasMore] = useState(false);
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const fileRef = React.useRef(null);
  const [sending, setSending] = useState(false);
  const [nickForm, setNickForm] = useState(null); // null=閉じている / 文字列=入力中
  const [reporting, setReporting] = useState(null); // 通報中の投稿
  const [reportReason, setReportReason] = useState('');
  const [notice, setNotice] = useState('');
  const [errorKey, setErrorKey] = useState('');
  const [reports, setReports] = useState([]);
  const [now, setNow] = useState(() => Date.now());

  // 「○分前」を更新
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  // ログイン状態
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  // ニックネームと管理者かどうか
  useEffect(() => {
    if (!user) {
      setNickname(undefined);
      setIsAdmin(false);
      return;
    }
    let alive = true;
    getDoc(doc(db, 'profiles', user.uid))
      .then((snap) => alive && setNickname(snap.exists() ? snap.data().nickname || '' : ''))
      .catch(() => alive && setNickname(''));
    getDoc(doc(db, 'admins', user.uid))
      .then((snap) => alive && setIsAdmin(snap.exists()))
      .catch(() => alive && setIsAdmin(false));
    return () => {
      alive = false;
    };
  }, [user]);

  // 投稿一覧（新しい順・リアルタイム）
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(count + 1));
    return onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) }));
        setHasMore(list.length > count);
        setPosts(list.slice(0, count));
        setErrorKey((k) => (k === 'errRules' ? '' : k));
      },
      () => {
        setPosts([]);
        setErrorKey('errRules');
      }
    );
  }, [count]);

  // 管理者だけ：通報の一覧
  useEffect(() => {
    if (!isAdmin) {
      setReports([]);
      return undefined;
    }
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(
      q,
      (snap) => setReports(snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) }))),
      () => setReports([])
    );
  }, [isAdmin]);

  // 入力画面を開いている間は背景をスクロールさせない
  const modalOpen = nickForm !== null || reporting !== null;
  useEffect(() => {
    if (!modalOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const login = async () => {
    setErrorKey('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      const code = e?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
      if (code === 'auth/unauthorized-domain') {
        setErrorKey('errDomain');
        return;
      }
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch {
          /* 下で共通エラー表示 */
        }
      }
      setErrorKey('errLogin');
    }
  };

  const saveNickname = async (e) => {
    e.preventDefault();
    const name = (nickForm || '').trim().slice(0, NICK_MAX);
    if (!name) return;
    try {
      await setDoc(doc(db, 'profiles', user.uid), { nickname: name, updatedAt: serverTimestamp() });
      setNickname(name);
      setNickForm(null);
    } catch {
      setErrorKey('errPost');
    }
  };

  const pickPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!nickname) {
      setNickForm('');
      return;
    }
    setPhotoBusy(true);
    setErrorKey('');
    try {
      setPhoto(await makePhoto(file));
    } catch {
      setErrorKey('errPhoto');
    } finally {
      setPhotoBusy(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const body = text.trim();
    if ((!body && !photo) || body.length > MAX_LEN || sending) return;
    if (!nickname) {
      setNickForm('');
      return;
    }
    setSending(true);
    setErrorKey('');
    try {
      await addDoc(collection(db, 'posts'), {
        uid: user.uid,
        nickname,
        text: body,
        ...(photo ? { image: photo } : {}),
        createdAt: serverTimestamp(),
      });
      setText('');
      setPhoto(null);
    } catch {
      setErrorKey('errPost');
    } finally {
      setSending(false);
    }
  };

  const remove = (post) => {
    if (!window.confirm(t.confirmDelete)) return;
    deleteDoc(doc(db, 'posts', post.id)).catch(() => setErrorKey('errPost'));
  };

  const sendReport = async (e) => {
    e.preventDefault();
    if (!reporting) return;
    try {
      await addDoc(collection(db, 'reports'), {
        postId: reporting.id,
        reason: reportReason.trim().slice(0, 200),
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      setNotice(t.reportDone);
    } catch {
      setErrorKey('errPost');
    }
    setReporting(null);
    setReportReason('');
  };

  const postById = useMemo(() => new Map((posts || []).map((p) => [p.id, p])), [posts]);

  const timeLabel = (ts) => {
    const d = toDate(ts);
    if (!d) return t.justNow;
    const diff = Math.max(0, now - d.getTime());
    if (diff < 60000) return t.justNow;
    if (diff < 3600000) return t.minAgo(Math.floor(diff / 60000));
    if (diff < 86400000) return t.hourAgo(Math.floor(diff / 3600000));
    const sameYear = d.getFullYear() === new Date(now).getFullYear();
    return d.toLocaleDateString(locale, sameYear ? { month: 'short', day: 'numeric' } : { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const initial = (name) => (name || '?').trim().charAt(0);

  return (
    <div className="tl-page min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Crimson+Pro:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap');
        .tl-page { background: #f8f7f4; color: #1a1a1a; font-family: 'Crimson Pro', 'Noto Serif JP', serif; }
        .tl-display { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; }
        .tl-nav { backdrop-filter: blur(12px); background: rgba(248, 247, 244, 0.88); border-bottom: 1px solid rgba(127, 166, 127, 0.25); }
        .tl-soft { color: rgba(26, 26, 26, 0.68); }
        .tl-faint { color: rgba(26, 26, 26, 0.5); }
        .tl-accent { color: #5d7d5d; }
        .tl-select { background: transparent; border: 1px solid #7fa67f; border-radius: 9999px; padding: 0.5rem 1rem; font-size: 0.875rem; cursor: pointer; }
        .tl-card { background: #fff; border: 1px solid rgba(127, 166, 127, 0.25); border-radius: 1.25rem; }
        .tl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 9999px; background: #5d7d5d; color: #fff; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s, opacity 0.2s; }
        .tl-btn:hover { background: #4d6b4d; }
        .tl-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .tl-ghost { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.9rem; border-radius: 9999px; border: 1px solid rgba(127, 166, 127, 0.3); background: #fff; color: rgba(26, 26, 26, 0.65); font-size: 0.85rem; cursor: pointer; }
        .tl-ghost:hover { border-color: #5d7d5d; color: #5d7d5d; }
        .tl-danger:hover { border-color: #b4553f; color: #b4553f; }
        .tl-link { font-size: 0.8rem; color: rgba(26, 26, 26, 0.45); display: inline-flex; align-items: center; gap: 0.25rem; }
        .tl-link:hover { color: #b4553f; }
        .tl-input { width: 100%; background: #fff; border: 1px solid rgba(127, 166, 127, 0.3); border-radius: 0.9rem; padding: 0.8rem 1rem; font-size: 16px; font-family: inherit; color: #1a1a1a; line-height: 1.7; resize: vertical; }
        .tl-input:focus { outline: none; border-color: #5d7d5d; box-shadow: 0 0 0 3px rgba(127, 166, 127, 0.15); }
        .tl-avatar { width: 2.6rem; height: 2.6rem; border-radius: 9999px; background: rgba(127, 166, 127, 0.18); color: #4d6b4d; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .tl-error { background: #fbeeea; border: 1px solid #e8c3b8; color: #8a3a26; border-radius: 0.9rem; padding: 0.75rem 1rem; }
        .tl-notice { background: rgba(127, 166, 127, 0.12); border: 1px solid rgba(127, 166, 127, 0.3); color: #3f5a3f; border-radius: 0.9rem; padding: 0.75rem 1rem; }
        .tl-pre { white-space: pre-wrap; word-break: break-word; }
        .tl-overlay { background: rgba(26, 26, 26, 0.5); }
        /* 写真の投稿は外側の丸角の枠を付けず、額だけを置く */
        .tl-post-photo { padding: 0.5rem 0.25rem 0.75rem; }
        @media (min-width: 768px) { .tl-post-photo { padding: 0.75rem 0.25rem 1rem; } }
        /* 額装：白い余白と、細い焦げ茶の枠だけのミニマルな額 */
        .tl-shikishi { margin: 0; border: 1.5px solid #3b2f25; background: #fdfcf9; }
        .tl-shikishi-mat { padding: 16px 16px 12px; }
        @media (min-width: 768px) { .tl-shikishi-mat { padding: 22px 22px 16px; } }
        .tl-shikishi-photo { display: block; width: 100%; aspect-ratio: 3 / 2; object-fit: cover; box-shadow: 0 0 0 0.5px rgba(59, 47, 37, 0.25); }
        .tl-shikishi-caption { margin-top: 12px; text-align: center; font-family: 'Yuji Syuku', 'Noto Serif JP', serif; font-size: 1rem; line-height: 1.7; color: #3b2f25; letter-spacing: 0.12em; }
        .tl-ghost:disabled { opacity: 0.5; cursor: wait; }
        .tl-admin { background: #fff8e8; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 1.25rem; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-40 tl-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="tl-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
              <span className="tl-faint font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="tl-soft flex items-center gap-2" aria-label={t.back}>
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{t.back}</span>
            </Link>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="tl-select">
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-8 px-6 text-center">
        <h1 className="tl-display text-3xl md:text-5xl font-bold mb-3">{t.title}</h1>
        <p className="tl-soft text-lg md:text-xl font-light">{t.subtitle}</p>
      </header>

      <main className="max-w-2xl mx-auto px-5 md:px-6 pb-24">
        {!isFirebaseConfigured && <div className="tl-card p-8 text-center tl-soft">{t.notReady}</div>}

        {isFirebaseConfigured && (
          <>
            {errorKey && <div className="tl-error mb-5">{t[errorKey]}</div>}
            {notice && (
              <div className="tl-notice mb-5 flex items-start justify-between gap-3">
                <span>{notice}</span>
                <button type="button" onClick={() => setNotice('')} aria-label={t.cancel} className="tl-faint">
                  <X size={18} />
                </button>
              </div>
            )}

            {/* 投稿欄 */}
            {user === null && (
              <div className="tl-card p-6 text-center mb-8">
                <button type="button" onClick={login} className="tl-btn">
                  {t.loginToPost}
                </button>
              </div>
            )}

            {user && (
              <form onSubmit={submit} className="tl-card p-4 md:p-5 mb-8">
                <div className="flex items-start justify-between gap-3 mb-3 text-sm">
                  <span className="tl-soft min-w-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {nickname && <span className="break-all">{t.postingAs(nickname)}</span>}
                    {nickname && (
                      <button type="button" onClick={() => setNickForm(nickname)} className="tl-accent underline underline-offset-4">
                        {t.nickChange}
                      </button>
                    )}
                  </span>
                  <button type="button" onClick={() => signOut(auth)} className="tl-ghost flex-shrink-0">
                    <LogOut size={14} />
                    {t.logout}
                  </button>
                </div>
                {photo && (
                  <div className="relative mb-3">
                    <Shikishi src={photo} caption={text.trim()} alt="" />
                    <button type="button" onClick={() => setPhoto(null)} className="tl-ghost absolute" style={{ top: 8, right: 8 }}>
                      <X size={14} />
                      {t.removePhoto}
                    </button>
                  </div>
                )}
                <textarea
                  rows={photo ? 2 : 3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => nickname === '' && setNickForm('')}
                  placeholder={photo ? t.photoPlaceholder : t.placeholder}
                  className="tl-input"
                  maxLength={MAX_LEN}
                />
                {photo && <p className="tl-faint text-xs mt-2">{t.photoNote}</p>}
                <div className="flex items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-3">
                    <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} className="hidden" />
                    {!photo && (
                      <button type="button" onClick={() => (nickname ? fileRef.current?.click() : setNickForm(''))} className="tl-ghost" disabled={photoBusy}>
                        <ImagePlus size={15} />
                        {photoBusy ? '…' : t.addPhoto}
                      </button>
                    )}
                    <span className={`text-sm ${text.length > MAX_LEN - 20 ? 'tl-accent font-semibold' : 'tl-faint'}`}>
                      {text.length} / {MAX_LEN}
                    </span>
                  </div>
                  <button type="submit" className="tl-btn flex-shrink-0" disabled={(!text.trim() && !photo) || sending || photoBusy || nickname === undefined}>
                    <Send size={16} />
                    {sending ? t.posting : t.post}
                  </button>
                </div>
              </form>
            )}

            {/* 管理者だけ：通報の一覧 */}
            {isAdmin && (
              <section className="tl-admin p-5 mb-8">
                <h2 className="flex items-center gap-2 font-semibold mb-3" style={{ color: '#7a5f10' }}>
                  <ShieldCheck size={18} />
                  {t.adminReports}
                </h2>
                {reports.length === 0 && <p className="tl-soft text-sm">{t.noReports}</p>}
                <ul className="space-y-3">
                  {reports.map((r) => {
                    const target = postById.get(r.postId);
                    return (
                      <li key={r.id} className="bg-white rounded-xl p-3 text-sm">
                        <p className="tl-pre mb-1">{target ? `${target.nickname}：${target.text}` : t.deletedPost}</p>
                        {target?.image && <img src={target.image} alt="" className="rounded-lg mb-2" style={{ maxWidth: 220 }} />}
                        {r.reason && (
                          <p className="tl-faint mb-2">
                            {t.reportReason}：{r.reason}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {target && (
                            <button type="button" onClick={() => remove(target)} className="tl-ghost tl-danger">
                              <Trash2 size={14} />
                              {t.remove}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteDoc(doc(db, 'reports', r.id)).catch(() => setErrorKey('errPost'))}
                            className="tl-ghost"
                          >
                            {t.dismiss}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* タイムライン */}
            {posts === null && <p className="text-center tl-faint py-12">{t.loading}</p>}
            {posts && posts.length === 0 && !errorKey && <p className="text-center tl-soft py-12">{t.empty}</p>}

            <ul className="space-y-3">
              {(posts || []).map((p) => {
                const mine = user && p.uid === user.uid;
                return (
                  <li key={p.id} className={p.image ? 'tl-post-photo' : 'tl-card p-4 md:p-5'}>
                    <div className="flex gap-3">
                      <div className="tl-avatar" aria-hidden="true">{initial(p.nickname)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-baseline gap-x-2">
                          <span className="font-semibold">{p.nickname}</span>
                          <span className="tl-faint text-sm">{timeLabel(p.createdAt)}</span>
                        </p>
                        {p.image ? (
                          <div className="mt-2">
                            <Shikishi src={p.image} caption={p.text} alt={p.text || `${p.nickname}`} />
                          </div>
                        ) : (
                          <p className="tl-pre leading-relaxed mt-1">{p.text}</p>
                        )}
                        {user && (
                          <div className="flex justify-end gap-4 mt-2">
                            {(mine || isAdmin) && (
                              <button type="button" onClick={() => remove(p)} className="tl-link">
                                <Trash2 size={13} />
                                {t.remove}
                              </button>
                            )}
                            {!mine && (
                              <button type="button" onClick={() => setReporting(p)} className="tl-link">
                                <Flag size={13} />
                                {t.report}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {hasMore && (
              <div className="text-center mt-6">
                <button type="button" onClick={() => setCount((c) => c + PAGE)} className="tl-ghost">
                  {t.more}
                </button>
              </div>
            )}

            {/* 投稿のルール */}
            <section className="mt-12 tl-soft text-sm">
              <h2 className="tl-accent font-semibold mb-2">{t.rulesTitle}</h2>
              <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                {t.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>

      {/* ニックネーム設定 */}
      {nickForm !== null && (
        <div className="tl-overlay fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6" onClick={() => setNickForm(null)}>
          <form onSubmit={saveNickname} onClick={(e) => e.stopPropagation()} className="w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 md:p-8" style={{ background: '#f8f7f4' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="tl-display text-2xl font-bold">{t.nickTitle}</h2>
              <button type="button" onClick={() => setNickForm(null)} className="tl-faint p-1" aria-label={t.cancel}>
                <X size={22} />
              </button>
            </div>
            <p className="tl-soft text-sm leading-relaxed mb-4">{t.nickLead}</p>
            <input
              type="text"
              value={nickForm}
              onChange={(e) => setNickForm(e.target.value)}
              placeholder={t.nickPh}
              maxLength={NICK_MAX}
              className="tl-input"
              autoFocus
            />
            {nickname && <p className="tl-faint text-xs mt-2">{t.nickNote}</p>}
            <div className="flex justify-end mt-5">
              <button type="submit" className="tl-btn" disabled={!nickForm.trim()}>
                {t.nickSave}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 通報 */}
      {reporting && (
        <div className="tl-overlay fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6" onClick={() => setReporting(null)}>
          <form onSubmit={sendReport} onClick={(e) => e.stopPropagation()} className="w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 md:p-8" style={{ background: '#f8f7f4' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="tl-display text-2xl font-bold">{t.reportTitle}</h2>
              <button type="button" onClick={() => setReporting(null)} className="tl-faint p-1" aria-label={t.cancel}>
                <X size={22} />
              </button>
            </div>
            {reporting.image && <img src={reporting.image} alt="" className="rounded-xl mb-2 w-full" />}
            {reporting.text && <p className="tl-card p-3 text-sm tl-pre mb-3">{reporting.text}</p>}
            <p className="tl-soft text-sm leading-relaxed mb-3">{t.reportLead}</p>
            <textarea rows={2} value={reportReason} onChange={(e) => setReportReason(e.target.value)} placeholder={t.reportPh} maxLength={200} className="tl-input" />
            <div className="flex justify-end gap-3 mt-5">
              <button type="button" onClick={() => setReporting(null)} className="tl-ghost">
                {t.cancel}
              </button>
              <button type="submit" className="tl-btn" style={{ background: '#a8553f' }}>
                <Flag size={15} />
                {t.reportSend}
              </button>
            </div>
          </form>
        </div>
      )}

      <footer className="py-10 px-6 text-center" style={{ background: '#1a1a1a', color: 'rgba(248,247,244,0.6)' }}>
        <p className="text-sm">© 2026 茶乃間 (Chanoma)</p>
        <p className="text-sm mt-3">
          <Link to="/about" style={{ color: 'inherit' }} className="underline underline-offset-4">{language === 'ja' ? '運営者情報' : 'About'}</Link>
        </p>
      </footer>
    </div>
  );
};

export default Timeline;
