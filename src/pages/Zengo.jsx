import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { ZEN_PHRASES } from '../data/zengo';

const Zengo = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedLength, setSelectedLength] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const Logo = () => (
    <Link to="/" className="flex items-center gap-3">
      <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
        <span className="text-ink/50 font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
      </div>
    </Link>
  );

  const content = {
    ja: {
      title: '禅語',
      subtitle: '茶道に息づく禅の教え',
      intro: '茶道と深く結びついた禅語。その意味と茶道との関わりを学びましょう。',
      seasons: {
        all: 'すべて',
        spring: '春',
        summer: '夏',
        autumn: '秋',
        winter: '冬',
        yearRound: '通年'
      },
      lengths: {
        all: 'すべて',
        one: '一文字',
        two: '二文字',
        three: '三文字',
        four: '四文字',
        five: '五文字以上'
      },
      searchPlaceholder: '禅語を検索...',
      noResults: '該当する禅語が見つかりませんでした'
    },
    en: {
      title: 'Zen Phrases',
      subtitle: 'Zen Teachings in Tea Ceremony',
      intro: 'Learn the meaning of Zen phrases deeply connected to the tea ceremony.',
      seasons: {
        all: 'All',
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn',
        winter: 'Winter',
        yearRound: 'Year-round'
      },
      lengths: {
        all: 'All',
        one: '1 char',
        two: '2 chars',
        three: '3 chars',
        four: '4 chars',
        five: '5+ chars'
      },
      searchPlaceholder: 'Search...',
      noResults: 'No Zen phrases found'
    }
  };

  const zenPhrases = ZEN_PHRASES;

  const t = content[language];
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' }
  ];

  const seasons = ['all', 'spring', 'summer', 'autumn', 'winter', 'yearRound'];
  const lengths = ['all', 'one', 'two', 'three', 'four', 'five'];

  const lengthMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5
  };

  const filteredPhrases = zenPhrases.filter(phrase => {
    const matchesSeason = selectedSeason === 'all' || phrase.season === selectedSeason;
    const matchesLength = selectedLength === 'all' || 
      (selectedLength === 'five' ? phrase.length >= 5 : phrase.length === lengthMap[selectedLength]);
    const matchesSearch = searchQuery === '' || 
      phrase.kanji.includes(searchQuery) || 
      phrase.reading.includes(searchQuery);
    
    return matchesSeason && matchesLength && matchesSearch;
  });

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
        }
        
        .season-tab {
          position: relative;
          background: white;
          border: 1px solid rgba(127, 166, 127, 0.2);
          transition: all 0.3s ease;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
        }
        
        .season-tab:hover {
          border-color: var(--matcha);
        }
        
        .season-tab.active {
          background: var(--matcha);
          color: white;
          border-color: var(--matcha);
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

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-white border-y border-matcha/10 px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Season Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`season-tab font-medium whitespace-nowrap text-sm ${
                  selectedSeason === season ? 'active' : ''
                }`}
              >
                {t.seasons[season]}
              </button>
            ))}
          </div>

          {/* Length & Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
              className="bg-transparent border border-matcha rounded-full px-4 py-2 font-medium text-sm cursor-pointer hover:bg-matcha/5 transition-all"
            >
              {lengths.map((length) => (
                <option key={length} value={length}>{t.lengths[length]}</option>
              ))}
            </select>

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matcha" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-2 border border-matcha rounded-full font-medium text-sm focus:outline-none focus:ring-2 focus:ring-matcha/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zen Phrases List */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredPhrases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink/50">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPhrases.map((phrase, index) => (
                <div key={index} className="content-card p-4 md:p-6 rounded-2xl">
                  <div className="border-l-4 border-matcha pl-3 md:pl-4 mb-3">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-1">
                      {phrase.kanji}
                    </h3>
                    <p className="text-xs md:text-sm text-matcha font-medium">{phrase.reading}</p>
                  </div>
                  
                  <p className="text-sm md:text-base text-ink/80 leading-relaxed">{phrase.meaning}</p>
                </div>
              ))}
            </div>
          )}
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

export default Zengo;