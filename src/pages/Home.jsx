import React, { useState, useEffect } from 'react';
import { Globe, BookOpen, Map, ChevronRight, Menu, X, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [language, setLanguage] = useState('ja');
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ロゴコンポーネント
  const Logo = ({ size = 'md' }) => {
    const sizes = {
      sm: { container: 'gap-2', svg: 'w-8 h-8', title: 'text-xl', subtitle: 'text-xs' },
      md: { container: 'gap-3', svg: 'w-10 h-10', title: 'text-2xl', subtitle: 'text-sm' },
      lg: { container: 'gap-4', svg: 'w-12 h-12', title: 'text-3xl', subtitle: 'text-base' }
    };
    const s = sizes[size];
    
    return (
      <Link to="/" className={`flex items-center ${s.container}`}>
        <div className={`flex items-center justify-center ${s.svg}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="60" cy="25" rx="8" ry="25" fill="#2D5016" transform="rotate(25 60 25)"/>
            <ellipse cx="35" cy="50" rx="8" ry="25" fill="#2D5016" transform="rotate(-25 35 50)"/>
            <ellipse cx="60" cy="75" rx="8" ry="25" fill="#2D5016" transform="rotate(15 60 75)"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className={`font-display font-semibold tracking-tight ${s.title}`}>茶乃間</span>
          <span className={`text-ink/50 font-light tracking-wider ${s.subtitle}`}>Cha no Ma</span>
        </div>
      </Link>
    );
  };

  const translations = {
    ja: {
      tagline: '世界中どこからでも、茶道を学ぶ',
      subtitle: '伝統と革新が交わる場所',
      forBeginners: '初めて茶道に触れる方へ',
      forPractitioners: '日々のお稽古を充実させたい方へ',
      beginnersDesc: '茶道の基本から歴史、茶室マップまで',
      practitionersDesc: 'お稽古の辞書として使える深い知識',
      explore: '探索する',
      features: {
        title: '茶乃間の特徴',
        items: [
          { icon: Globe, title: '多言語対応', desc: '7つの言語で茶道を学べます' },
          { icon: BookOpen, title: '豊富なコンテンツ', desc: '基礎から専門知識まで網羅' },
          { icon: Users, title: '情報を投稿する', desc: 'みんなで育てる茶道の知識' }
        ]
      },
      pathTitle: 'あなたに合った学び',
      pathSubtitle: 'レベルと目的に応じた最適なコンテンツをご用意',
      content: {
        basics: '茶道の基本',
        history: '歴史と文化',
        tools: '茶道具',
        maps: '茶室マップ',
        advanced: {
          items: ['茶杓の銘', '禅語解説', '焼き物図鑑', '裂地コレクション']
        }
      }
    },
    en: {
      tagline: 'Learn Tea Ceremony from Anywhere in the World',
      subtitle: 'Where Tradition Meets Innovation',
      forBeginners: 'For First-Time Learners',
      forPractitioners: 'For Dedicated Practitioners',
      beginnersDesc: 'From basics to history and tea room maps',
      practitionersDesc: 'Deep knowledge as your practice dictionary',
      explore: 'Explore',
      features: {
        title: 'Features of Chanoma',
        items: [
          { icon: Globe, title: 'Multilingual', desc: 'Learn in 7 languages' },
          { icon: BookOpen, title: 'Rich Content', desc: 'From basics to expertise' },
          { icon: Users, title: 'Contribute', desc: 'Growing tea knowledge together' }
        ]
      },
      pathTitle: 'Choose Your Path',
      pathSubtitle: 'Tailored content for your level and goals',
      content: {
        basics: 'Basics',
        history: 'History & Culture',
        tools: 'Tea Utensils',
        maps: 'Tea Room Maps',
        advanced: {
          title: 'Advanced Learning',
          items: ['Tea Scoop Names', 'Zen Philosophy', 'Pottery Guide', 'Fabric Collection']
        }
      }
    }
  };

  const t = translations[language] || translations.ja;
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिन्दी' }
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
        
        body {
          overflow-x: hidden;
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
        
        .tea-pattern {
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(127, 166, 127, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
        }
        
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
        
        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 60px var(--shadow);
        }
        
        .fade-in {
          animation: fadeIn 1.2s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          
          <div className="hidden md:flex items-center gap-8">
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
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {menuOpen && (
          <div className="md:hidden bg-paper border-t border-matcha/10 p-6">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-transparent border border-matcha rounded-full px-4 py-3 font-medium cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center tea-pattern overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-matcha rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="space-y-8 fade-in">
            <div className="inline-block px-4 py-2 bg-matcha/10 rounded-full border border-matcha/20">
              <span className="text-matcha font-medium text-sm tracking-wide">SINCE 2026</span>
            </div>
            
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="block text-ink">{t.tagline.split('、')[0]}</span>
              <span className="block text-matcha mt-2">{t.tagline.split('、')[1] || t.tagline.split(',')[1]}</span>
            </h1>
            
            <p className="text-2xl text-ink/70 font-light leading-relaxed max-w-3xl mx-auto">
              {t.subtitle}
            </p>
            
            <div className="flex gap-4 pt-8 justify-center">
              <button className="px-8 py-4 border-2 border-ink rounded-full font-medium hover:bg-ink hover:text-paper transition-all hover:scale-105">
                <Globe className="inline mr-2" size={20} />
                {languages.find(l => l.code === language)?.name}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      
      <section className="py-32 px-6 tea-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl font-bold mb-6 fade-in">{t.features.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-matcha to-gold mx-auto fade-in delay-100"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((feature, i) => {
              const Icon = feature.icon;
              const isContribute = i === 2; // 3番目のカード（投稿する）
              
              if (isContribute) {
                return (
                  <Link 
                    key={i} 
                    to="/contribute"
                    className={`content-card p-8 rounded-2xl text-center hover-lift bg-white fade-in delay-${(i + 2) * 100} block`}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-matcha/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="text-matcha" size={36} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-ink/70 leading-relaxed">{feature.desc}</p>
                  </Link>
                );
              }
              
              return (
                <div key={i} className={`content-card p-8 rounded-2xl text-center hover-lift bg-white fade-in delay-${(i + 2) * 100}`}>
                  <div className="w-20 h-20 bg-gradient-to-br from-matcha/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-matcha" size={36} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience Selection */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-center mb-6 fade-in">
            {t.pathTitle}
          </h2>
          <p className="text-center text-ink/60 text-lg mb-20 fade-in delay-100">
            {t.pathSubtitle}
          </p>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Beginners Card */}
            <Link to="/beginner-index" className="content-card p-10 rounded-3xl hover-lift fade-in delay-200 block">
              <h3 className="font-display text-3xl font-semibold mb-4">{t.forBeginners}</h3>
              <p className="text-ink/70 text-lg mb-8 leading-relaxed">{t.beginnersDesc}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-matcha rounded-full flex-shrink-0"></div>
                  <span>{t.content.basics}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-matcha rounded-full flex-shrink-0"></div>
                  <span>{t.content.history}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-matcha rounded-full flex-shrink-0"></div>
                  <span>{t.content.tools}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-matcha rounded-full flex-shrink-0"></div>
                  <span>{t.content.maps}</span>
                </li>
              </ul>
              <div className="w-full py-4 border-2 border-matcha text-matcha rounded-full font-medium hover:bg-matcha hover:text-paper transition-all group flex items-center justify-center">
                {t.explore}
                <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </div>
            </Link>  
            
            {/* Practitioners Card */}
            <Link to="/practitioner-index" className="content-card p-10 rounded-3xl hover-lift fade-in delay-300 bg-gradient-to-br from-matcha/5 to-gold/5 block">
              <h3 className="font-display text-3xl font-semibold mb-4">{t.forPractitioners}</h3>
              <p className="text-ink/70 text-lg mb-8 leading-relaxed">{t.practitionersDesc}</p>
              <div className="mb-8">
                <p className="font-semibold mb-3 text-lg">{t.content.advanced.title}</p>
                <ul className="space-y-3">
                  {t.content.advanced.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full py-4 bg-gradient-to-r from-matcha to-matcha-dark text-paper rounded-full font-medium hover:shadow-2xl transition-all hover:scale-105 group flex items-center justify-center">
                {t.explore}
                <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-6 bg-ink text-paper relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-matcha rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 fade-in">
            <span className="text-gold text-8xl font-display">"</span>
          </div>
          <blockquote className="font-display text-4xl md:text-5xl font-light leading-relaxed mb-12 fade-in delay-100">
            {language === 'ja' ? '一期一会' : 'Ichi-go Ichi-e'}
          </blockquote>
          <p className="text-xl text-paper/80 font-light fade-in delay-200">
            {language === 'ja' 
              ? '一生に一度の出会い。この瞬間を大切に。' 
              : 'One time, one meeting. Treasure every moment.'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-paper py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Logo size="lg" />
              </div>
              <p className="text-paper/70 leading-relaxed mb-6">
                {language === 'ja' 
                  ? '世界中どこからでも、茶道を学ぶことができるプラットフォーム。伝統と革新が出会う場所。' 
                  : 'A platform to learn the Way of Tea from anywhere in the world. Where tradition meets innovation.'}
              </p>
              <div className="flex gap-4">
                {languages.slice(0, 4).map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      language === lang.code 
                        ? 'bg-matcha text-paper' 
                        : 'bg-paper/10 text-paper/70 hover:bg-paper/20'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-xl font-semibold mb-4">{language === 'ja' ? 'コンテンツ' : 'Content'}</h4>
              <ul className="space-y-2 text-paper/70">
                <li><Link to="/basics" className="hover:text-matcha transition-colors">{t.content.basics}</Link></li>
                <li><Link to="/history" className="hover:text-matcha transition-colors">{t.content.history}</Link></li>
                <li><Link to="/tools" className="hover:text-matcha transition-colors">{t.content.tools}</Link></li>
                <li><Link to="/tearoom-map" className="hover:text-matcha transition-colors">{t.content.maps}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-xl font-semibold mb-4">{language === 'ja' ? 'コミュニティ' : 'Community'}</h4>
              <ul className="space-y-2 text-paper/70">
                <li><Link to="/contribute" className="hover:text-matcha transition-colors">{language === 'ja' ? '情報を投稿' : 'Contribute'}</Link></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? 'フォーラム' : 'Forum'}</a></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? 'イベント' : 'Events'}</a></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? 'ニュースレター' : 'Newsletter'}</a></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? 'お問い合わせ' : 'Contact'}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-paper/60 text-sm">
              © 2026 茶乃間 (Chanoma). {language === 'ja' ? 'すべての権利を保有' : 'All rights reserved'}.
            </p>
            <div className="flex gap-6 text-sm text-paper/60">
              <a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? 'プライバシー' : 'Privacy'}</a>
              <a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? '利用規約' : 'Terms'}</a>
              <a href="#" className="hover:text-matcha transition-colors">{language === 'ja' ? 'アクセシビリティ' : 'Accessibility'}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;