import React, { useState, useEffect } from 'react';
import { Globe, BookOpen, Map, ChevronRight, Menu, X, Users } from 'lucide-react';
const ChanomaWebsite = () => {
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
      <div className={`flex items-center ${s.container}`}>
        <svg className={s.svg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 茶葉のイラスト - 3枚の有機的な葉 */}
          <ellipse cx="60" cy="25" rx="8" ry="25" fill="#2d4a2d" transform="rotate(25 60 25)"/>
          <ellipse cx="35" cy="50" rx="8" ry="25" fill="#3d5a3d" transform="rotate(-25 35 50)"/>
          <ellipse cx="60" cy="75" rx="8" ry="25" fill="#2d4a2d" transform="rotate(15 60 75)"/>
        </svg>
        <div className="flex flex-col">
          <span className={`font-display font-semibold tracking-tight ${s.title}`}>茶乃間</span>
          <span className={`text-ink/50 font-light tracking-wider ${s.subtitle}`}>Cha no Ma</span>
        </div>
      </div>
    );
  };

  const translations = {
    ja: {
      tagline: '世界中どこからでも、茶道を学ぶ',
      subtitle: '伝統と革新が交わる場所',
      forBeginners: '初めて茶道に触れる方へ',
      forPractitioners: '日々のお稽古をさらに充実させたい方へ',
      beginnersDesc: '茶道の基本から歴史、茶室マップまで',
      practitionersDesc: 'お稽古の辞書として使える深い知識',
      explore: '探索する',
      features: {
        title: '茶乃間の特徴',
        items: [
          { icon: Globe, title: '多言語対応', desc: '7つの言語で茶道を学べます' },
          { icon: BookOpen, title: '豊富なコンテンツ', desc: '基礎から専門知識まで網羅' },
          { icon: Map, title: '茶室マップ', desc: '世界中の茶室を探索' }
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
          title: '深い学び',
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
          { icon: Map, title: 'Tea Room Maps', desc: 'Explore rooms worldwide' }
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
    },
    zh: {
      tagline: '在世界任何地方学习茶道',
      subtitle: '传统与创新的交汇',
      forBeginners: '初学者',
      forPractitioners: '进阶练习者',
      beginnersDesc: '从基础到历史和茶室地图',
      practitionersDesc: '作为您练习词典的深度知识',
      explore: '探索',
      features: {
        title: '茶之间的特点',
        items: [
          { icon: Globe, title: '多语言', desc: '用7种语言学习' },
          { icon: BookOpen, title: '丰富内容', desc: '从基础到专业' },
          { icon: Map, title: '茶室地图', desc: '探索全球茶室' }
        ]
      },
      pathTitle: '选择您的路径',
      pathSubtitle: '根据您的水平和目标定制内容',
      content: {
        basics: '基础知识',
        history: '历史与文化',
        tools: '茶具',
        maps: '茶室地图',
        advanced: {
          title: '深度学习',
          items: ['茶匙命名', '禅宗哲学', '陶器指南', '织物收藏']
        }
      }
    },
    ko: {
      tagline: '세계 어디서나 다도를 배우다',
      subtitle: '전통과 혁신이 만나는 곳',
      forBeginners: '초보 학습자',
      forPractitioners: '전문 수련자',
      beginnersDesc: '기초부터 역사와 다실 지도까지',
      practitionersDesc: '수련 사전으로서의 깊은 지식',
      explore: '탐색',
      features: {
        title: '차노마의 특징',
        items: [
          { icon: Globe, title: '다국어 지원', desc: '7개 언어로 학습' },
          { icon: BookOpen, title: '풍부한 콘텐츠', desc: '기초부터 전문 지식까지' },
          { icon: Map, title: '다실 지도', desc: '전 세계 다실 탐색' }
        ]
      },
      pathTitle: '경로 선택',
      pathSubtitle: '수준과 목표에 맞는 맞춤형 콘텐츠',
      content: {
        basics: '기초',
        history: '역사와 문화',
        tools: '다도구',
        maps: '다실 지도',
        advanced: {
          title: '심화 학습',
          items: ['차숟가락 명칭', '선 철학', '도자기 가이드', '직물 컬렉션']
        }
      }
    },
    fr: {
      tagline: 'Apprenez la Cérémonie du Thé partout dans le monde',
      subtitle: 'Où la Tradition rencontre l\'Innovation',
      forBeginners: 'Pour les Débutants',
      forPractitioners: 'Pour les Pratiquants Dévoués',
      beginnersDesc: 'Des bases à l\'histoire et aux cartes des salons de thé',
      practitionersDesc: 'Connaissances approfondies comme dictionnaire de pratique',
      explore: 'Explorer',
      features: {
        title: 'Caractéristiques de Chanoma',
        items: [
          { icon: Globe, title: 'Multilingue', desc: 'Apprenez en 7 langues' },
          { icon: BookOpen, title: 'Contenu Riche', desc: 'Des bases à l\'expertise' },
          { icon: Map, title: 'Cartes des Salons', desc: 'Explorez les salons du monde' }
        ]
      },
      pathTitle: 'Choisissez Votre Voie',
      pathSubtitle: 'Contenu adapté à votre niveau et vos objectifs',
      content: {
        basics: 'Bases',
        history: 'Histoire & Culture',
        tools: 'Ustensiles de Thé',
        maps: 'Cartes des Salons',
        advanced: {
          title: 'Apprentissage Avancé',
          items: ['Noms des Cuillers', 'Philosophie Zen', 'Guide de Poterie', 'Collection de Tissus']
        }
      }
    },
    es: {
      tagline: 'Aprende la Ceremonia del Té desde cualquier lugar del mundo',
      subtitle: 'Donde la Tradición encuentra la Innovación',
      forBeginners: 'Para Principiantes',
      forPractitioners: 'Para Practicantes Dedicados',
      beginnersDesc: 'Desde lo básico hasta la historia y mapas de salas de té',
      practitionersDesc: 'Conocimiento profundo como diccionario de práctica',
      explore: 'Explorar',
      features: {
        title: 'Características de Chanoma',
        items: [
          { icon: Globe, title: 'Multilingüe', desc: 'Aprende en 7 idiomas' },
          { icon: BookOpen, title: 'Contenido Rico', desc: 'De lo básico a la experiencia' },
          { icon: Map, title: 'Mapas de Salas', desc: 'Explora salas en todo el mundo' }
        ]
      },
      pathTitle: 'Elige Tu Camino',
      pathSubtitle: 'Contenido adaptado a tu nivel y objetivos',
      content: {
        basics: 'Básicos',
        history: 'Historia y Cultura',
        tools: 'Utensilios de Té',
        maps: 'Mapas de Salas',
        advanced: {
          title: 'Aprendizaje Avanzado',
          items: ['Nombres de Cucharas', 'Filosofía Zen', 'Guía de Cerámica', 'Colección de Telas']
        }
      }
    },
    hi: {
      tagline: 'दुनिया में कहीं से भी चाय समारोह सीखें',
      subtitle: 'जहां परंपरा नवाचार से मिलती है',
      forBeginners: 'शुरुआती लोगों के लिए',
      forPractitioners: 'समर्पित अभ्यासियों के लिए',
      beginnersDesc: 'मूल बातें से इतिहास और चाय कक्ष मानचित्र तक',
      practitionersDesc: 'अभ्यास शब्दकोश के रूप में गहन ज्ञान',
      explore: 'अन्वेषण करें',
      features: {
        title: 'चानोमा की विशेषताएं',
        items: [
          { icon: Globe, title: 'बहुभाषी', desc: '7 भाषाओं में सीखें' },
          { icon: BookOpen, title: 'समृद्ध सामग्री', desc: 'मूल बातों से विशेषज्ञता तक' },
          { icon: Map, title: 'चाय कक्ष मानचित्र', desc: 'दुनिया भर के कमरों का अन्वेषण करें' }
        ]
      },
      pathTitle: 'अपना रास्ता चुनें',
      pathSubtitle: 'आपके स्तर और लक्ष्यों के लिए अनुकूलित सामग्री',
      content: {
        basics: 'मूल बातें',
        history: 'इतिहास और संस्कृति',
        tools: 'चाय के बर्तन',
        maps: 'चाय कक्ष मानचित्र',
        advanced: {
          title: 'उन्नत शिक्षा',
          items: ['चम्मच के नाम', 'ज़ेन दर्शन', 'मिट्टी के बर्तनों की गाइड', 'कपड़ा संग्रह']
        }
      }
    }
  };

  const t = translations[language];
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
        
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        .gradient-border {
          position: relative;
        }
        
        .gradient-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, var(--gold), var(--matcha));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        .fade-in {
          animation: fadeIn 1.2s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in {
          transform: translateY(30px);
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 60px var(--shadow);
        }
        
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
        
        @media (max-width: 768px) {
          .vertical-text {
            writing-mode: horizontal-tb;
          }
        }
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
              <button className="px-8 py-4 bg-matcha text-paper rounded-full font-medium hover:bg-matcha-dark transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                {t.explore}
              </button>
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
            <div className="content-card p-10 rounded-3xl hover-lift fade-in delay-200">
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
              <button className="w-full py-4 border-2 border-matcha text-matcha rounded-full font-medium hover:bg-matcha hover:text-paper transition-all group">
                {t.explore}
                <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
            
            {/* Practitioners Card */}
            <div className="content-card p-10 rounded-3xl hover-lift fade-in delay-300 bg-gradient-to-br from-matcha/5 to-gold/5">
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
              <button className="w-full py-4 bg-gradient-to-r from-matcha to-matcha-dark text-paper rounded-full font-medium hover:shadow-2xl transition-all hover:scale-105 group">
                {t.explore}
                <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
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
                <li><a href="#" className="hover:text-matcha transition-colors">{t.content.basics}</a></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{t.content.history}</a></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{t.content.tools}</a></li>
                <li><a href="#" className="hover:text-matcha transition-colors">{t.content.maps}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-xl font-semibold mb-4">{language === 'ja' ? 'コミュニティ' : 'Community'}</h4>
              <ul className="space-y-2 text-paper/70">
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

export default ChanomaWebsite;