import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PractitionerIndex = () => {
  const [language, setLanguage] = useState('ja');

  const Logo = () => (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <ellipse cx="60" cy="25" rx="8" ry="25" fill="#2D5016" transform="rotate(25 60 25)"/>
          <ellipse cx="35" cy="50" rx="8" ry="25" fill="#2D5016" transform="rotate(-25 35 50)"/>
          <ellipse cx="60" cy="75" rx="8" ry="25" fill="#2D5016" transform="rotate(15 60 75)"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-display text-2xl font-semibold tracking-tight">茶乃間</span>
        <span className="text-ink/50 font-light tracking-wider text-sm">Cha no Ma</span>
      </div>
    </Link>
  );

  const content = {
    ja: {
      title: '日々のお稽古を充実させたい方へ',
      subtitle: '深い学びで茶道をさらに楽しむ',
      intro: 'お稽古の辞書として使える専門的な知識をまとめました。茶杓の銘から禅語、焼き物、裂地まで、より深い茶道の世界を探求できます。',
      sections: [
        {
          title: '茶杓の銘',
          description: '各月の茶杓の銘とその意味を詳しく解説。季節感あふれる美しい言葉の世界を学べます。',
          link: '/chashaku'
        },
        {
          title: '禅語解説',
          description: '茶道に深く関わる禅語の意味と背景を学び、お点前の精神性を理解できます。',
          link: '/zengo'
        },
        {
          title: '焼き物図鑑',
          description: '楽焼、萩焼、唐津焼など、茶道で使われる様々な焼き物の特徴と見分け方を解説します。',
          link: '/pottery'
        },
        {
          title: '裂地図鑑',
          description: '仕覆や服紗に使われる裂地の種類、柄、由来を学び、道具選びの参考にできます。',
          link: '/fabrics'
        }
      ]
    },
    en: {
      title: 'For Dedicated Practitioners',
      subtitle: 'Deepen Your Tea Ceremony Practice',
      intro: 'Specialized knowledge to serve as your practice dictionary. Explore the deeper world of tea ceremony from tea scoop names to Zen phrases, pottery, and fabrics.',
      sections: [
        {
          title: 'Tea Scoop Names',
          description: 'Detailed explanations of seasonal tea scoop names (mei) and their meanings throughout the year.',
          link: '/chashaku'
        },
        {
          title: 'Zen Phrases',
          description: 'Learn the meanings and backgrounds of Zen phrases deeply connected to tea ceremony.',
          link: '/zengo'
        },
        {
          title: 'Pottery Guide',
          description: 'Characteristics and identification of various pottery styles used in tea ceremony.',
          link: '/pottery'
        },
        {
          title: 'Fabric Collection',
          description: 'Types, patterns, and origins of fabrics used for shifuku and fukusa.',
          link: '/fabrics'
        }
      ]
    }
  };

  const t = content[language];
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' }
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Crimson+Pro:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');
        
        :root {
          --ink: #1a1a1a;
          --paper: #f8f7f4;
          --matcha: #7fa67f;
          --matcha-dark: #5d7d5d;
          --gold: #d4af37;
          --shadow: rgba(26, 26, 26, 0.08);
        }
        
        .font-serif {
          font-family: 'Crimson Pro', 'Noto Serif JP', serif;
        }
        
        .font-display {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
        }
        
        .text-ink { color: var(--ink); }
        .bg-paper { background-color: var(--paper); }
        .text-matcha { color: var(--matcha); }
        .bg-matcha { background-color: var(--matcha); }
        .text-gold { color: var(--gold); }
        
        .nav-blur {
          backdrop-filter: blur(12px);
          background: rgba(248, 247, 244, 0.85);
          border-bottom: 1px solid rgba(127, 166, 127, 0.1);
        }
        
        .content-card {
          background: white;
          border: 1px solid rgba(127, 166, 127, 0.15);
          transition: all 0.3s ease;
        }
        
        .content-card:hover {
          border-color: var(--gold);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.12);
          transform: translateY(-4px);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-ink/70 hover:text-matcha transition-colors">
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{language === 'ja' ? 'ホームに戻る' : 'Back to Home'}</span>
            </Link>
            
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-matcha rounded-full px-4 py-2 font-medium text-sm cursor-pointer hover:bg-matcha hover:text-paper transition-all"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-gold/5 to-paper">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-ink mb-6">
            {t.title}
          </h1>
          <p className="text-2xl text-ink/70 font-light mb-8">
            {t.subtitle}
          </p>
          <p className="text-lg text-ink/60 max-w-3xl mx-auto">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {t.sections.map((section, index) => (
            <Link 
              key={index}
              to={section.link}
              className="content-card p-10 rounded-3xl block group bg-gradient-to-br from-white to-gold/5"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="font-display text-4xl font-bold mb-3 group-hover:text-gold transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-xl text-ink/70 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-paper py-12 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <Logo />
          <p className="text-paper/60 text-sm mt-6">
            © 2026 茶乃間 (Chanoma). {language === 'ja' ? 'すべての権利を保有' : 'All rights reserved'}.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PractitionerIndex;