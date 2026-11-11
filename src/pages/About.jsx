import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

// 運営者情報ページ。文章を直したいときは、下の content の中だけ書き換えればOK
const content = {
  ja: {
    back: 'ホームに戻る',
    title: '運営者情報',
    subtitle: '茶乃間について',
    rows: [
      { label: 'サイト名', value: '茶乃間（Cha no Ma）' },
      { label: '運営', value: '茶乃間' },
      { label: '運営者', value: '宮崎 一乃' },
      { label: 'URL', value: 'https://chanoma.pages.dev' },
    ],
    aboutTitle: '運営者より',
    about: [
      '京都生まれ。幼い頃から祖母のもとで裏千家の茶道を学んできました。',
      '現在は京都大学大学院で生命科学の研究をしながら、京都・中京区で海外からのお客様向けの茶道体験「茶乃間」を開いています。',
      '茶道を習い始めたばかりの方にも、長くお稽古を続けている方にも、知りたいことにすぐ手が届く場所をつくりたいと思い、このサイトを始めました。お気づきの点があれば、お問い合わせからお知らせいただけるとうれしいです。',
    ],
    careerTitle: '茶道の経歴',
    career: [
      '立命館大学 茶道部 79期 副部長',
      '裏千家淡交会 京都西青年部 役員',
    ],
    contact: 'お問い合わせ',
  },
  en: {
    back: 'Back to Home',
    title: 'About',
    subtitle: 'About Cha no Ma',
    rows: [
      { label: 'Site', value: 'Cha no Ma (茶乃間)' },
      { label: 'Operated by', value: 'Cha no Ma' },
      { label: 'Operator', value: 'Ichino Miyazaki' },
      { label: 'URL', value: 'https://chanoma.pages.dev' },
    ],
    aboutTitle: 'From the operator',
    about: [
      'Born in Kyoto, I have studied Urasenke tea ceremony with my grandmother since childhood.',
      'I am a graduate student in life sciences at Kyoto University, and I also host tea ceremony experiences for visitors from abroad in Nakagyo, Kyoto, under the name Cha no Ma.',
      'I started this site to give both beginners and long-time practitioners a place where what they want to know is always close at hand. If you notice anything, I would be glad to hear from you through the contact page.',
    ],
    careerTitle: 'Tea ceremony background',
    career: [
      'Vice President (79th class), Tea Ceremony Club, Ritsumeikan University',
      'Officer, Kyoto Nishi Youth Division, Urasenke Tankokai',
    ],
    contact: 'Contact',
  },
};

const About = () => {
  const [language, setLanguage] = useState('ja');
  const t = content[language];

  return (
    <div className="ab-page min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Crimson+Pro:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');
        .ab-page { background: #f8f7f4; color: #1a1a1a; font-family: 'Crimson Pro', 'Noto Serif JP', serif; }
        .ab-display { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; }
        .ab-nav { backdrop-filter: blur(12px); background: rgba(248, 247, 244, 0.88); border-bottom: 1px solid rgba(127, 166, 127, 0.25); }
        .ab-soft { color: rgba(26, 26, 26, 0.68); }
        .ab-faint { color: rgba(26, 26, 26, 0.5); }
        .ab-accent { color: #5d7d5d; }
        .ab-card { background: #fff; border: 1px solid rgba(127, 166, 127, 0.25); border-radius: 1.5rem; }
        .ab-row + .ab-row { border-top: 1px solid rgba(127, 166, 127, 0.18); }
        .ab-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 1.8rem; border-radius: 9999px; background: #5d7d5d; color: #fff; font-weight: 600; transition: background 0.2s; }
        .ab-btn:hover { background: #4d6b4d; }
        .ab-select { background: transparent; border: 1px solid #7fa67f; border-radius: 9999px; padding: 0.5rem 1rem; font-size: 0.875rem; cursor: pointer; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-40 ab-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="ab-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
              <span className="ab-faint font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="ab-soft flex items-center gap-2" aria-label={t.back}>
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{t.back}</span>
            </Link>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="ab-select">
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-10 px-6 text-center">
        <h1 className="ab-display text-3xl md:text-5xl font-bold mb-3">{t.title}</h1>
        <p className="ab-soft text-lg md:text-xl font-light">{t.subtitle}</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
        <section className="ab-card px-6 md:px-10 py-2">
          <dl>
            {t.rows.map((row) => (
              <div key={row.label} className="ab-row grid grid-cols-[6.5rem_1fr] md:grid-cols-[9rem_1fr] gap-4 py-5">
                <dt className="ab-accent font-semibold">{row.label}</dt>
                <dd className="break-words">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ab-card p-6 md:p-10">
          <h2 className="ab-display ab-accent text-2xl font-bold mb-5">{t.aboutTitle}</h2>
          <div className="space-y-4 leading-loose ab-soft">
            {t.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 className="ab-accent font-semibold mt-8 mb-3">{t.careerTitle}</h3>
          <ul className="space-y-2">
            {t.career.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="mt-2.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#7fa67f' }}></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center">
          <Link to="/contact" className="ab-btn">
            <Mail size={18} />
            {t.contact}
          </Link>
        </div>
      </main>

      <footer className="py-10 px-6 text-center" style={{ background: '#1a1a1a', color: 'rgba(248,247,244,0.6)' }}>
        <p className="text-sm">© 2026 茶乃間 (Chanoma)</p>
      </footer>
    </div>
  );
};

export default About;
