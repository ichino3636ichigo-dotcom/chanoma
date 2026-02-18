import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Shield, CheckCircle } from 'lucide-react';

const Contribute = () => {
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
      title: '情報を投稿する',
      subtitle: 'みんなで育てる茶道の知識',
      intro: '茶乃間は、皆様の知識と経験で育つプラットフォームです。信頼できる出典に基づいた情報をお待ちしています。',
      guidelines: {
        title: '投稿ガイドライン',
        items: [
          {
            icon: Shield,
            title: '出典の明記',
            description: '書籍名、ページ数、著者など、情報源を明確に記載してください。'
          },
          {
            icon: CheckCircle,
            title: '資料写真の添付',
            description: '出典元のページや資料の写真を必ず添付してください。'
          },
          {
            icon: Send,
            title: '審査プロセス',
            description: '投稿内容は管理者が確認し、承認後にサイトに掲載されます。'
          }
        ]
      },
      formTitle: '投稿フォーム',
      formDescription: '以下のフォームから情報を投稿できます。審査には数日かかる場合がございます。',
      categories: [
        '茶杓の銘',
        '茶道具',
        '禅語',
        '焼き物',
        '裂地',
        'その他'
      ]
    },
    en: {
      title: 'Contribute Information',
      subtitle: 'Growing Tea Knowledge Together',
      intro: 'Chanoma grows with your knowledge and experience. We welcome information based on reliable sources.',
      guidelines: {
        title: 'Contribution Guidelines',
        items: [
          {
            icon: Shield,
            title: 'Clear Citations',
            description: 'Please provide book title, page number, author, and other source details.'
          },
          {
            icon: CheckCircle,
            title: 'Attach Source Photos',
            description: 'Please attach photos of the source page or materials.'
          },
          {
            icon: Send,
            title: 'Review Process',
            description: 'Submissions will be reviewed by administrators before publication.'
          }
        ]
      },
      formTitle: 'Submission Form',
      formDescription: 'Use the form below to submit information. Review may take several days.',
      categories: [
        'Tea Scoop Names',
        'Tea Utensils',
        'Zen Phrases',
        'Pottery',
        'Fabrics',
        'Other'
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

      {/* Guidelines */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12">
            {t.guidelines.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.guidelines.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="content-card p-8 rounded-2xl text-center">
                  <div className="w-20 h-20 bg-matcha/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-matcha" size={36} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              {t.formTitle}
            </h2>
            <p className="text-lg text-ink/60 mb-8">
              {t.formDescription}
            </p>
            
            <a 
              href="https://forms.gle/S16D54vmkaF2NT6C6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-5 bg-matcha text-paper rounded-full font-medium text-lg hover:bg-matcha-dark transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Send size={24} />
              {language === 'ja' ? '投稿フォームを開く' : 'Open Form'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

          <div className="mt-8 p-6 bg-matcha/5 rounded-2xl border border-matcha/20">
            <p className="text-sm text-ink/70 leading-relaxed">
              {language === 'ja' 
                ? '※ 投稿いただいた情報は、管理者が内容を確認した上で掲載いたします。審査には数日お時間をいただく場合がございますので、予めご了承ください。' 
                : '* Submitted information will be reviewed by administrators before publication. Please allow several days for review.'}
            </p>
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
        </div>
      </footer>
    </div>
  );
};

export default Contribute;