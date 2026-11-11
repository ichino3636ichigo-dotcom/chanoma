import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Pencil, Trash2, X, LogOut, ChevronDown } from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../lib/firebase';

const TEXT = {
  ja: {
    title: 'お稽古ノート',
    subtitle: '今日の学びを、次のお稽古へ',
    back: 'ホームに戻る',
    notReady: 'お稽古ノートは現在準備中です。もうしばらくお待ちください。',
    loginLead:
      'お稽古で学んだことや、先生に教わったことを書き留めておけるノートです。ログインすると、スマホでもパソコンでも同じノートを開けます。',
    loginBtn: 'Googleでログイン',
    privacy: '書いた内容は、あなただけが見られます。',
    logout: 'ログアウト',
    newNote: '新しい記録',
    editNote: '記録を編集',
    search: 'ノートを検索...',
    count: (n) => `これまでの記録 ${n}回`,
    empty: 'まだ記録がありません。今日のお稽古から書いてみましょう。',
    noResult: '該当する記録がありません。',
    loading: '読み込み中...',
    date: '日付',
    temae: 'お点前・内容',
    temaePh: '例：薄茶点前（棚）',
    learned: '学んだこと・先生からのご指導',
    learnedPh: '気づいたこと、注意されたこと、覚えておきたいこと',
    next: '次回への課題',
    nextPh: '次のお稽古で意識したいこと',
    shitsurae: 'お道具・しつらえ（任意）',
    kakemono: '掛物',
    chabana: '茶花',
    chashaku: '茶杓の銘',
    okashi: 'お菓子',
    save: '保存する',
    cancel: 'キャンセル',
    edit: '編集',
    remove: '削除',
    confirmDelete: 'この記録を削除しますか？元に戻せません。',
    needContent: '「お点前・内容」か「学んだこと」のどちらかを入力してください。',
    untitled: 'お稽古',
    errLogin: 'ログインできませんでした。もう一度お試しください。',
    errDomain: 'このサイトのドメインがまだログイン許可されていません（Firebaseの承認済みドメインに追加が必要です）。',
    errRules: 'ノートを読み書きできませんでした。保存先の設定（セキュリティルール）を確認してください。',
    errSave: '保存できませんでした。通信状況を確認して、もう一度お試しください。',
  },
  en: {
    title: 'Practice Notes',
    subtitle: 'Carry today’s lesson into the next',
    back: 'Back to Home',
    notReady: 'Practice Notes is being set up. Please check back soon.',
    loginLead:
      'A notebook for what you learn in each lesson and what your teacher tells you. Sign in to open the same notes on your phone and your computer.',
    loginBtn: 'Sign in with Google',
    privacy: 'Only you can see what you write.',
    logout: 'Sign out',
    newNote: 'New entry',
    editNote: 'Edit entry',
    search: 'Search notes...',
    count: (n) => `${n} ${n === 1 ? 'lesson' : 'lessons'} recorded`,
    empty: 'No entries yet. Start with today’s lesson.',
    noResult: 'No matching entries.',
    loading: 'Loading...',
    date: 'Date',
    temae: 'Temae / what you practiced',
    temaePh: 'e.g. Usucha with tana',
    learned: 'What you learned / teacher’s guidance',
    learnedPh: 'Things you noticed, corrections, points to remember',
    next: 'For next time',
    nextPh: 'What to keep in mind at the next lesson',
    shitsurae: 'Utensils & setting (optional)',
    kakemono: 'Scroll',
    chabana: 'Flowers',
    chashaku: 'Tea scoop name',
    okashi: 'Sweets',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    remove: 'Delete',
    confirmDelete: 'Delete this entry? This cannot be undone.',
    needContent: 'Please fill in either what you practiced or what you learned.',
    untitled: 'Lesson',
    errLogin: 'Could not sign in. Please try again.',
    errDomain: 'This site’s domain is not yet authorized for sign-in (add it to Firebase authorized domains).',
    errRules: 'Could not read or write notes. Please check the security rules.',
    errSave: 'Could not save. Check your connection and try again.',
  },
};

const TEMAE_SUGGESTIONS = [
  '割稽古',
  '盆略点前',
  '薄茶点前',
  '濃茶点前',
  '棚点前（薄茶）',
  '棚点前（濃茶）',
  '初炭手前',
  '後炭手前',
  '茶箱点前',
  '貴人点',
  '四ヶ伝',
  '花月',
  '客の作法',
];

const todayString = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD（端末の日付）

const emptyForm = () => ({
  date: todayString(),
  temae: '',
  learned: '',
  next: '',
  kakemono: '',
  chabana: '',
  chashaku: '',
  okashi: '',
});

const FIELD_KEYS = ['date', 'temae', 'learned', 'next', 'kakemono', 'chabana', 'chashaku', 'okashi'];
const SHITSURAE_KEYS = ['kakemono', 'chabana', 'chashaku', 'okashi'];

const KeikoNote = () => {
  const [language, setLanguage] = useState('ja');
  const t = TEXT[language];

  const [user, setUser] = useState(undefined); // undefined = 確認中 / null = 未ログイン
  const [notes, setNotes] = useState(null); // null = 読み込み中
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState(null); // null = 閉じている
  const [editingId, setEditingId] = useState(null);
  const [showShitsurae, setShowShitsurae] = useState(false);
  const [formError, setFormError] = useState('');
  const [errorKey, setErrorKey] = useState('');

  // ログイン状態を監視
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  // 自分のノートを新しい順にリアルタイム取得
  useEffect(() => {
    if (!user) {
      setNotes(null);
      return undefined;
    }
    const q = query(collection(db, 'users', user.uid, 'notes'), orderBy('date', 'desc'));
    return onSnapshot(
      q,
      (snap) => {
        setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setErrorKey('');
      },
      () => {
        setNotes([]);
        setErrorKey('errRules');
      }
    );
  }, [user]);

  // 入力画面を開いている間は背景をスクロールさせない
  useEffect(() => {
    if (!form) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [form]);

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

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setShowShitsurae(false);
    setFormError('');
  };

  const openEdit = (note) => {
    const next = emptyForm();
    FIELD_KEYS.forEach((k) => {
      if (typeof note[k] === 'string') next[k] = note[k];
    });
    setEditingId(note.id);
    setForm(next);
    setShowShitsurae(SHITSURAE_KEYS.some((k) => next[k]));
    setFormError('');
  };

  const closeForm = () => {
    setForm(null);
    setEditingId(null);
  };

  const save = (e) => {
    e.preventDefault();
    const data = {};
    FIELD_KEYS.forEach((k) => {
      data[k] = (form[k] || '').trim();
    });
    if (!data.date) data.date = todayString();
    if (!data.temae && !data.learned) {
      setFormError(t.needContent);
      return;
    }
    const notesRef = collection(db, 'users', user.uid, 'notes');
    const write = editingId
      ? updateDoc(doc(notesRef, editingId), { ...data, updatedAt: serverTimestamp() })
      : addDoc(notesRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    // オフラインでも端末内に先に保存されるので、完了を待たずに画面を閉じる
    write.catch(() => setErrorKey('errSave'));
    closeForm();
  };

  const remove = (note) => {
    if (!window.confirm(t.confirmDelete)) return;
    deleteDoc(doc(db, 'users', user.uid, 'notes', note.id)).catch(() => setErrorKey('errSave'));
    setOpenId(null);
  };

  const filtered = useMemo(() => {
    if (!notes) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) =>
      FIELD_KEYS.some((k) => typeof n[k] === 'string' && n[k].toLowerCase().includes(q))
    );
  }, [notes, searchQuery]);

  // 月ごとにまとめる
  const groups = useMemo(() => {
    const map = new Map();
    filtered.forEach((n) => {
      const key = (n.date || '').slice(0, 7);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(n);
    });
    return [...map.entries()];
  }, [filtered]);

  const locale = language === 'ja' ? 'ja-JP' : 'en-US';
  const formatDay = (date) => {
    const d = new Date(`${date}T00:00:00`);
    if (Number.isNaN(d.getTime())) return date || '';
    return d.toLocaleDateString(locale, { month: 'long', day: 'numeric', weekday: 'short' });
  };
  const formatMonth = (ym) => {
    const d = new Date(`${ym}-01T00:00:00`);
    if (Number.isNaN(d.getTime())) return ym || '';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
  };

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="kn-page min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Crimson+Pro:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');

        .kn-page {
          --ink: #1a1a1a;
          --ink-soft: rgba(26, 26, 26, 0.65);
          --ink-faint: rgba(26, 26, 26, 0.45);
          --paper: #f8f7f4;
          --matcha: #7fa67f;
          --matcha-dark: #5d7d5d;
          --matcha-tint: rgba(127, 166, 127, 0.1);
          --line: rgba(127, 166, 127, 0.25);
          --gold: #d4af37;
          background: var(--paper);
          color: var(--ink);
          font-family: 'Crimson Pro', 'Noto Serif JP', serif;
        }
        .kn-display { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; }
        .kn-soft { color: var(--ink-soft); }
        .kn-faint { color: var(--ink-faint); }
        .kn-accent { color: var(--matcha-dark); }

        .kn-nav {
          backdrop-filter: blur(12px);
          background: rgba(248, 247, 244, 0.88);
          border-bottom: 1px solid var(--line);
        }
        .kn-navlink { color: var(--ink-soft); transition: color 0.2s; }
        .kn-navlink:hover { color: var(--matcha-dark); }
        .kn-select {
          background: transparent;
          border: 1px solid var(--matcha);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: var(--ink);
          cursor: pointer;
        }

        .kn-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.6rem;
          border-radius: 9999px;
          background: var(--matcha-dark);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .kn-btn:hover { background: #4d6b4d; }
        .kn-btn:active { transform: scale(0.98); }
        .kn-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.1rem;
          border-radius: 9999px;
          background: transparent;
          color: var(--ink-soft);
          border: 1px solid var(--line);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .kn-btn-ghost:hover { border-color: var(--matcha-dark); color: var(--matcha-dark); }
        .kn-btn-danger:hover { border-color: #b4553f; color: #b4553f; }

        .kn-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 1.25rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .kn-card-click { cursor: pointer; }
        .kn-card-click:hover { border-color: var(--matcha); box-shadow: 0 6px 24px rgba(127, 166, 127, 0.14); }

        .kn-input {
          width: 100%;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          font-size: 16px; /* iPhoneで入力時に拡大されないサイズ */
          font-family: inherit;
          color: var(--ink);
          line-height: 1.6;
        }
        .kn-input:focus { outline: none; border-color: var(--matcha-dark); box-shadow: 0 0 0 3px var(--matcha-tint); }
        .kn-input::placeholder { color: var(--ink-faint); }
        .kn-label { display: block; font-weight: 600; font-size: 0.95rem; margin-bottom: 0.4rem; }

        .kn-next {
          background: var(--matcha-tint);
          border-left: 3px solid var(--matcha);
          padding: 0.75rem 1rem;
          border-radius: 0 0.75rem 0.75rem 0;
        }
        .kn-chip {
          display: inline-block;
          background: rgba(26, 26, 26, 0.05);
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.85rem;
        }
        .kn-error {
          background: #fbeeea;
          border: 1px solid #e8c3b8;
          color: #8a3a26;
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
        }
        .kn-overlay { background: rgba(26, 26, 26, 0.5); }
        .kn-sheet { background: var(--paper); }
        .kn-pre { white-space: pre-wrap; word-break: break-word; }
        .kn-fab { box-shadow: 0 8px 24px rgba(93, 125, 93, 0.4); }
        /* 「新しい記録」ボタン：PCは検索欄の横、スマホは右下に1つだけ表示 */
        .kn-btn.kn-only-pc { display: none; }
        @media (min-width: 768px) {
          .kn-btn.kn-only-pc { display: inline-flex; }
          .kn-btn.kn-only-sp { display: none; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 kn-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="kn-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
              <span className="kn-faint font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="kn-navlink flex items-center gap-2" aria-label={t.back}>
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{t.back}</span>
            </Link>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="kn-select">
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-8 px-6 text-center">
        <h1 className="kn-display text-3xl md:text-5xl font-bold mb-3">{t.title}</h1>
        <p className="kn-soft text-lg md:text-xl font-light">{t.subtitle}</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-32">
        {errorKey && <div className="kn-error mb-6">{t[errorKey]}</div>}

        {/* Firebase未設定 */}
        {!isFirebaseConfigured && (
          <div className="kn-card p-8 text-center kn-soft">{t.notReady}</div>
        )}

        {/* ログイン確認中 */}
        {isFirebaseConfigured && user === undefined && (
          <p className="text-center kn-faint py-12">{t.loading}</p>
        )}

        {/* 未ログイン */}
        {isFirebaseConfigured && user === null && (
          <div className="kn-card p-8 md:p-10 text-center">
            <p className="kn-soft leading-relaxed mb-8">{t.loginLead}</p>
            <button type="button" onClick={login} className="kn-btn">
              {t.loginBtn}
            </button>
            <p className="kn-faint text-sm mt-5">{t.privacy}</p>
          </div>
        )}

        {/* ログイン済み */}
        {isFirebaseConfigured && user && (
          <>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="kn-soft text-sm min-w-0">
                <p className="truncate">{user.displayName || user.email}</p>
                {notes && notes.length > 0 && <p className="kn-faint">{t.count(notes.length)}</p>}
              </div>
              <button type="button" onClick={() => signOut(auth)} className="kn-btn-ghost flex-shrink-0">
                <LogOut size={15} />
                {t.logout}
              </button>
            </div>

            <div className="flex gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 kn-accent" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className="kn-input"
                  style={{ paddingLeft: '2.75rem', borderRadius: '9999px' }}
                />
              </div>
              <button type="button" onClick={openNew} className="kn-btn kn-only-pc">
                <Plus size={18} />
                {t.newNote}
              </button>
            </div>

            {notes === null && <p className="text-center kn-faint py-12">{t.loading}</p>}

            {notes && notes.length === 0 && !errorKey && (
              <div className="kn-card p-8 text-center">
                <p className="kn-soft mb-6">{t.empty}</p>
                <button type="button" onClick={openNew} className="kn-btn">
                  <Plus size={18} />
                  {t.newNote}
                </button>
              </div>
            )}

            {notes && notes.length > 0 && filtered.length === 0 && (
              <p className="text-center kn-faint py-12">{t.noResult}</p>
            )}

            {groups.map(([ym, items]) => (
              <section key={ym} className="mb-8">
                <h2 className="kn-display kn-accent text-xl font-bold mb-3 pb-2" style={{ borderBottom: '2px solid var(--line)' }}>
                  {formatMonth(ym)}
                </h2>
                <div className="space-y-3">
                  {items.map((note) => {
                    const isOpen = openId === note.id;
                    const chips = SHITSURAE_KEYS.filter((k) => note[k]);
                    return (
                      <article key={note.id} className="kn-card kn-card-click p-5 md:p-6" onClick={() => setOpenId(isOpen ? null : note.id)}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="kn-accent text-sm mb-1">{formatDay(note.date)}</p>
                            <h3 className="kn-display text-xl font-bold">{note.temae || t.untitled}</h3>
                          </div>
                          <ChevronDown
                            size={20}
                            className="kn-faint flex-shrink-0 mt-1"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                          />
                        </div>

                        {note.learned && (
                          <p className={`kn-pre kn-soft leading-relaxed mt-3 ${isOpen ? '' : 'line-clamp-3'}`}>{note.learned}</p>
                        )}

                        {isOpen && (
                          <div className="mt-4 space-y-4">
                            {note.next && (
                              <div className="kn-next">
                                <p className="kn-accent text-sm font-semibold mb-1">{t.next}</p>
                                <p className="kn-pre leading-relaxed">{note.next}</p>
                              </div>
                            )}
                            {chips.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {chips.map((k) => (
                                  <span key={k} className="kn-chip">
                                    <span className="kn-faint">{t[k]}：</span>
                                    {note[k]}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex justify-end gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                              <button type="button" onClick={() => openEdit(note)} className="kn-btn-ghost">
                                <Pencil size={15} />
                                {t.edit}
                              </button>
                              <button type="button" onClick={() => remove(note)} className="kn-btn-ghost kn-btn-danger">
                                <Trash2 size={15} />
                                {t.remove}
                              </button>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* スマホ用の追加ボタン */}
            {!form && (
              <button
                type="button"
                onClick={openNew}
                className="kn-btn kn-fab kn-only-sp fixed bottom-6 right-6 z-30"
                aria-label={t.newNote}
              >
                <Plus size={20} />
                {t.newNote}
              </button>
            )}
          </>
        )}
      </main>

      {/* 入力・編集画面 */}
      {form && (
        <div className="kn-overlay fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6" onClick={closeForm}>
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="kn-sheet w-full md:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="kn-display text-2xl font-bold">{editingId ? t.editNote : t.newNote}</h2>
              <button type="button" onClick={closeForm} className="kn-faint p-1" aria-label={t.cancel}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="kn-label" htmlFor="kn-date">{t.date}</label>
                <input id="kn-date" type="date" required value={form.date} onChange={setField('date')} className="kn-input" />
              </div>

              <div>
                <label className="kn-label" htmlFor="kn-temae">{t.temae}</label>
                <input
                  id="kn-temae"
                  type="text"
                  list="kn-temae-list"
                  value={form.temae}
                  onChange={setField('temae')}
                  placeholder={t.temaePh}
                  className="kn-input"
                  maxLength={100}
                />
                <datalist id="kn-temae-list">
                  {TEMAE_SUGGESTIONS.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="kn-label" htmlFor="kn-learned">{t.learned}</label>
                <textarea
                  id="kn-learned"
                  rows={6}
                  value={form.learned}
                  onChange={setField('learned')}
                  placeholder={t.learnedPh}
                  className="kn-input"
                  maxLength={5000}
                />
              </div>

              <div>
                <label className="kn-label" htmlFor="kn-next">{t.next}</label>
                <textarea
                  id="kn-next"
                  rows={3}
                  value={form.next}
                  onChange={setField('next')}
                  placeholder={t.nextPh}
                  className="kn-input"
                  maxLength={2000}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowShitsurae((v) => !v)}
                  className="kn-accent flex items-center gap-1 font-semibold"
                >
                  <ChevronDown
                    size={18}
                    style={{ transform: showShitsurae ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                  {t.shitsurae}
                </button>
                {showShitsurae && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {SHITSURAE_KEYS.map((k) => (
                      <div key={k}>
                        <label className="kn-label" htmlFor={`kn-${k}`}>{t[k]}</label>
                        <input
                          id={`kn-${k}`}
                          type="text"
                          value={form[k]}
                          onChange={setField(k)}
                          className="kn-input"
                          maxLength={100}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {formError && <div className="kn-error">{formError}</div>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="kn-btn-ghost">
                  {t.cancel}
                </button>
                <button type="submit" className="kn-btn">
                  {t.save}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <footer className="py-10 px-6 text-center" style={{ background: 'var(--ink)', color: 'rgba(248,247,244,0.6)' }}>
        <p className="text-sm">© 2026 茶乃間 (Chanoma)</p>
      </footer>
    </div>
  );
};

export default KeikoNote;
