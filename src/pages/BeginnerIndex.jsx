import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, History, Wrench, Map } from 'lucide-react';

const BeginnerIndex = () => {
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
      title: '初めて茶道に触れる方へ',
      subtitle: 'あなたの茶道の旅をサポートします',
      intro: '茶道の基本から歴史、道具、そして実際に茶室を訪れる方法まで。初心者の方に必要な情報をまとめました。',
      sections: [
        {
          title: '茶道の基本',
          description: '茶道とは何か、基本的な作法、お茶会の流れなど、茶道の基礎知識を学べます。',
          link: '/basics'
        },
        {
          title: '歴史と文化',
          description: '茶道の歴史、千利休、茶道の流派など、茶道の文化的背景を理解できます。',
          link: '/history'
        },
        {
          title: '茶道具',
          description: '茶碗、茶筅、茶杓など、茶道で使う様々な道具について詳しく解説します。',
          link: '/tools'
        },
        {
          title: '茶室マップ',
          description: '世界中の茶室を探して訪れることができます。実際に茶道を体験してみましょう。',
          link: '/tearoom-map'
        }
      ]
    },
    en: {
      title: 'For First-Time Learners',
      subtitle: 'Supporting Your Tea Ceremony Journey',
      intro: 'From the basics of tea ceremony to history, utensils, and how to visit tea rooms. Everything beginners need to know.',
      sections: [
        {
          title: 'Basics',
          description: 'Learn the fundamentals: what tea ceremony is, basic etiquette, and the flow of a tea gathering.',
          link: '/basics'
        },
        {
          title: 'History & Culture',
          description: 'Understand the cultural background of tea ceremony, including its history and Sen no Rikyū.',
          link: '/history'
        },
        {
          title: 'Tea Utensils',
          description: 'Detailed explanations of various tea utensils including tea bowls, whisks, and scoops.',
          link: '/tools'
        },
        {
          title: 'Tea Room Map',
          description: 'Find and visit tea rooms around the world. Experience tea ceremony firsthand.',
          link: '/tearoom-map'
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
          border-color: var(--matcha);
          box-shadow: 0 8px 30px rgba(127, 166, 127, 0.12);
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
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-matcha/5 to-paper">
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
              className="content-card p-10 rounded-3xl block group"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="font-display text-4xl font-bold mb-3 group-hover:text-matcha transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-xl text-ink/70 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="text-matcha opacity-0 group-hover:opacity-100 transition-opacity">
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

export default BeginnerIndex;