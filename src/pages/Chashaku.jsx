import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CHASHAKU_MONTHS_JA } from '../data/chashakuMei';

const Chashaku = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedMonth, setSelectedMonth] = useState(1);

  const Logo = ({ size = 'md' }) => {
    const sizes = {
      sm: { container: 'gap-2', img: 'w-8 h-8', title: 'text-xl', subtitle: 'text-xs' },
      md: { container: 'gap-3', img: 'w-10 h-10', title: 'text-2xl', subtitle: 'text-sm' },
      lg: { container: 'gap-4', img: 'w-12 h-12', title: 'text-3xl', subtitle: 'text-base' }
    };
    const s = sizes[size];
    
    return (
      <Link to="/" className={`flex items-center ${s.container}`}>
        <img src="/icon.png" alt="茶乃間" className={s.img} />
        <div className="flex flex-col">
          <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
          <span className="text-ink/50 font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
        </div>
      </Link>
    );
  };

  const content = {
    ja: {
      title: '茶杓の銘',
      subtitle: '季節を感じる美しい言葉',
      intro: '茶杓には季節や趣向に応じた「銘」がつけられます。茶人の感性や教養が表れる、茶道ならではの美しい文化です。',
      monthNames: ['睦月', '如月', '弥生', '卯月', '皐月', '水無月', '文月', '葉月', '長月', '神無月', '霜月', '師走'],
      months: CHASHAKU_MONTHS_JA
    },
    en: {
      title: 'Tea Scoop Names (Mei)',
      subtitle: 'Beautiful Words Reflecting the Seasons',
      intro: 'Tea scoops are given poetic names (mei) that reflect the season and occasion. This is a unique aspect of tea ceremony culture that expresses the sensibility and refinement of tea practitioners.',
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      months: [
        {
          month: 1,
          sekki: ['Shōkan (Jan 5)', 'Daikan (Jan 20)'],
          shichijunikou: ['Parsley flourishes', 'Springs thaw', 'Pheasants start to call', 'Butterburs bud', 'Ice thickens on ponds', 'Hens start laying eggs'],
          mei: [
            { name: 'Hatsune', reading: 'First Song', meaning: 'The first song of a bush warbler in the new year', notes: 'Heralds the arrival of spring' },
            { name: 'Matsukaze', reading: 'Pine Wind', meaning: 'The sound of wind through pine branches', notes: 'Dignified name for New Year' },
            { name: 'Wakamizu', reading: 'Young Water', meaning: 'Water drawn on New Year\'s morning', notes: 'Wishes for good health' }
          ]
        }
      ]
    }
  };

  const t = content[language];
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' }
  ];

  const currentMonth = t.months.find(m => m.month === selectedMonth);

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
          border-color: var(--matcha);
          box-shadow: 0 8px 30px rgba(127, 166, 127, 0.12);
        }
        
        .month-tab {
          position: relative;
          background: white;
          border: 1px solid rgba(127, 166, 127, 0.2);
          transition: all 0.3s ease;
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
          padding: 0.75rem 1.5rem;
        }
        
        .month-tab:hover {
          transform: translateY(-2px);
          border-color: var(--matcha);
        }
        
        .month-tab.active {
          background: var(--matcha);
          color: white;
          border-color: var(--matcha);
          transform: translateY(-4px);
          z-index: 10;
        }
        
        .tabs-container {
          display: flex;
          gap: 0.25rem;
          overflow-x: auto;
          padding: 1rem 0;
          scrollbar-width: thin;
          scrollbar-color: var(--matcha) var(--paper);
        }
        
        .tabs-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .tabs-container::-webkit-scrollbar-track {
          background: var(--paper);
        }
        
        .tabs-container::-webkit-scrollbar-thumb {
          background: var(--matcha);
          border-radius: 3px;
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
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-matcha/5 to-paper">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-6xl font-bold text-ink mb-4 md:mb-6">
            {t.title}
          </h1>
          <p className="text-lg md:text-2xl text-ink/70 font-light mb-6 md:mb-8">
            {t.subtitle}
          </p>
          <p className="text-base md:text-lg text-ink/60 max-w-3xl mx-auto">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Month Tabs */}
      <section className="sticky top-16 z-40 bg-paper/95 backdrop-blur-sm border-y border-matcha/10 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="tabs-container">
            {t.months.map((month, index) => (
              <button
                key={month.month}
                onClick={() => setSelectedMonth(month.month)}
                className={`month-tab font-medium whitespace-nowrap ${
                  selectedMonth === month.month ? 'active' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-sm">{month.month}月</div>
                  <div className="text-xs opacity-80">{t.monthNames[index]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Month Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Month Info */}
          <div className="content-card p-6 md:p-10 rounded-3xl mb-12">
            <div className="flex-1">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                {currentMonth.month}月 {t.monthNames[currentMonth.month - 1]}
              </h2>
              
              {/* 二十四節気 */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-matcha mb-2">
                  {language === 'ja' ? '二十四節気' : '24 Solar Terms'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentMonth.sekki.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-matcha/10 text-matcha rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 七十二候 */}
              <div>
                <p className="text-sm font-semibold text-ink/50 mb-2">
                  {language === 'ja' ? '七十二候' : '72 Microseasons'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentMonth.shichijunikou.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-ink/5 text-ink/70 rounded-full text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mei Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentMonth.mei.map((mei, index) => (
              <div key={index} className="content-card p-4 md:p-6 rounded-2xl hover:scale-105 transition-transform">
                <div className="border-l-4 border-matcha pl-3 md:pl-4 mb-3 md:mb-4">
                  <h3 className="font-display text-xl md:text-3xl font-bold text-ink mb-1">
                    {mei.name}
                  </h3>
                  <p className="text-xs md:text-sm text-matcha font-medium">{mei.reading}</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-ink/50 font-semibold mb-1">
                      {language === 'ja' ? '意味' : 'Meaning'}
                    </p>
                    <p className="text-ink/80 leading-relaxed">{mei.meaning}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-ink/50 font-semibold mb-1">
                      {language === 'ja' ? '由来・解説' : 'Notes'}
                    </p>
                    <p className="text-sm text-ink/70 leading-relaxed">{mei.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to Other Months */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-6">
            {language === 'ja' ? '他の月を見る' : 'View Other Months'}
          </h2>
          <div className="flex gap-2 justify-center flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <button
                key={month}
                onClick={() => {
                  setSelectedMonth(month);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedMonth === month
                    ? 'bg-matcha text-paper'
                    : 'bg-paper border-2 border-matcha text-matcha hover:bg-matcha hover:text-paper'
                }`}
              >
                {month}月
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-paper py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Logo />
          <p className="text-paper/60 text-sm mt-6">
            © 2026 茶乃間 (Chanoma). {language === 'ja' ? 'すべての権利を保有' : 'All rights reserved'}.
          </p>
          <p className="text-sm mt-3">
            <Link to="/about" style={{ color: 'rgba(248, 247, 244, 0.6)' }} className="underline underline-offset-4 hover:opacity-80">
              {language === 'ja' ? '運営者情報' : 'About'}
            </Link>
            <span className="mx-3" style={{ color: 'rgba(248, 247, 244, 0.3)' }}>|</span>
            <Link to="/contact" style={{ color: 'rgba(248, 247, 244, 0.6)' }} className="underline underline-offset-4 hover:opacity-80">
              {language === 'ja' ? 'お問い合わせ' : 'Contact'}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Chashaku;