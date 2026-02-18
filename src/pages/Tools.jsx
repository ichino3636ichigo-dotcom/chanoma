import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Tools = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedTool, setSelectedTool] = useState(null);

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
      title: '茶道具',
      subtitle: 'お点前に使う道具たち',
      intro: '茶道では、様々な道具を使ってお茶を点てます。それぞれの道具には意味があり、美しさと機能性が調和しています。',
      tools: [
        {
          id: 'chawan',
          name: '茶碗',
          reading: 'ちゃわん',
          category: '主要道具',
          image: '/images/chawan.jpg',
          description: 'お茶を点て、飲むための器。楽焼、萩焼、唐津焼など、様々な焼き物があります。季節や趣向に合わせて選びます。',
          details: [
            '夏は浅く広い平茶碗を使用',
            '冬は深く筒状の筒茶碗を使用',
            '見込み（内側）の景色も鑑賞のポイント',
            '高台の形や削りも重要な要素'
          ]
        },
        {
          id: 'chasen',
          name: '茶筅',
          reading: 'ちゃせん',
          category: '主要道具',
          image: '/images/chasen.jpg',
          description: '抹茶を点てるための竹製の道具。細かく割った竹の穂先で、お茶をかき混ぜて泡立てます。',
          details: [
            '竹を細かく割って作られる',
            '穂の数は80本、100本、120本など',
            '薄茶用と濃茶用で形が異なる',
            '使用後は必ず水洗いして陰干しする'
          ]
        },
        {
          id: 'chashaku',
          name: '茶杓',
          reading: 'ちゃしゃく',
          category: '主要道具',
          image: '/images/chashaku.jpg',
          description: '抹茶をすくう竹製のスプーン。季節や趣向に合わせた「銘」がつけられることがあります。',
          details: [
            '竹や象牙、木で作られる',
            '茶人が自ら削ることもある',
            '季節の銘がつけられる（春：花の名、夏：涼を感じる言葉など）',
            '先端の曲がり具合が美しさのポイント'
          ]
        },
        {
          id: 'mizusashi',
          name: '水指',
          reading: 'みずさし',
          category: '主要道具',
          image: '/images/mizusashi.jpg',
          description: '茶席で使う水を入れる器。釜に水を足したり、茶碗をすすぐための水を入れておきます。',
          details: [
            '陶磁器、金属、ガラスなどで作られる',
            '蓋付きのものが一般的',
            '季節や趣向に合わせて選ぶ',
            '格の高い茶事では重要な道具'
          ]
        },
        {
          id: 'natsume',
          name: '棗',
          reading: 'なつめ',
          category: '主要道具',
          image: '/images/natsume.jpg',
          description: '薄茶の抹茶を入れる容器。棗の実に形が似ていることから名付けられました。',
          details: [
            '木地に漆を塗って作られる',
            '蒔絵や螺鈿などの装飾が施される',
            '大棗、中棗、小棗などサイズがある',
            '季節や趣向に合わせて選ぶ'
          ]
        },
        {
          id: 'chaire',
          name: '茶入',
          reading: 'ちゃいれ',
          category: '主要道具',
          image: '/images/chaire.jpg',
          description: '濃茶の抹茶を入れる陶製の容器。茶道具の中でも特に格が高いとされます。',
          details: [
            '唐物、和物、島物などの種類がある',
            '仕覆（しふく）という袋に入れて使う',
            '形によって様々な銘がある',
            '名物茶入は茶人憧れの道具'
          ]
        },
        {
          id: 'hishaku',
          name: '柄杓',
          reading: 'ひしゃく',
          category: '補助道具',
          image: '/images/hishaku.jpg',
          description: '湯や水をすくうための竹製の柄の長い道具。',
          details: [
            '竹で作られる',
            '柄の長さは約40cm',
            '湯を汲む動作も美しさの一つ',
            '節の位置や合の大きさに規定がある'
          ]
        },
        {
          id: 'futaoki',
          name: '蓋置',
          reading: 'ふたおき',
          category: '補助道具',
          image: '/images/futaoki.jpg',
          description: '釜の蓋や柄杓を置くための小さな道具。竹や陶器で作られます。',
          details: [
            '竹製と陶器製がある',
            '三つ足が一般的',
            'サイズは小さいが重要な役割',
            '季節によって使い分ける'
          ]
        },
        {
          id: 'kama',
          name: '釜',
          reading: 'かま',
          category: '補助道具',
          image: '/images/kama.jpg',
          description: 'お湯を沸かすための鉄製の釜。風炉または炉に掛けて使います。',
          details: [
            '鋳鉄で作られる',
            '季節によって形が異なる',
            '釜の形や音色も楽しみの一つ',
            '有名な釜師の作品は高価'
          ]
        },
        {
          id: 'furo',
          name: '風炉',
          reading: 'ふろ',
          category: '補助道具',
          image: '/images/furo.jpg',
          description: '炭火を入れて釜を掛ける道具。5月から10月まで使用します。',
          details: [
            '陶器や金属で作られる',
            '夏の茶事に使用',
            '炉に対して地上に置く',
            '様々な形と装飾がある'
          ]
        },
        {
          id: 'kensui',
          name: '建水',
          reading: 'けんすい',
          category: '補助道具',
          image: '/images/kensui.jpg',
          description: '使った湯や水を捨てるための器。「こぼし」とも呼ばれます。',
          details: [
            '金属、陶器、竹などで作られる',
            '茶碗を温めた湯を捨てる',
            '茶筅をすすいだ水を捨てる',
            '形は丸いものや四角いものがある'
          ]
        },
        {
          id: 'chakin',
          name: '茶巾',
          reading: 'ちゃきん',
          category: '補助道具',
          image: '/images/chakin.jpg',
          description: '茶碗を拭くための白い麻の布。清潔さを保つための大切な道具です。',
          details: [
            '白い麻や綿で作られる',
            '使用前にお湯で湿らせる',
            '茶碗の飲み口を拭う',
            '使用後は必ず洗って清潔に保つ'
          ]
        }
      ]
    },
    en: {
      title: 'Tea Utensils',
      subtitle: 'Tools Used in Tea Ceremony',
      intro: 'Various utensils are used in the tea ceremony, each with its own meaning and purpose. They harmonize beauty and functionality.',
      tools: [
        {
          id: 'chawan',
          name: 'Chawan',
          reading: 'Tea Bowl',
          category: 'Main Utensils',
          image: '/images/chawan.jpg',
          description: 'The bowl used for preparing and drinking tea. Made from various pottery styles including Raku, Hagi, and Karatsu.',
          details: [
            'Shallow wide bowls used in summer',
            'Deep cylindrical bowls used in winter',
            'Interior landscape is also appreciated',
            'Shape and carving of the foot ring is important'
          ]
        },
        {
          id: 'chasen',
          name: 'Chasen',
          reading: 'Tea Whisk',
          category: 'Main Utensils',
          image: '/images/chasen.jpg',
          description: 'A bamboo whisk used to mix and froth the matcha tea. Made by splitting bamboo into fine bristles.',
          details: [
            'Made by finely splitting bamboo',
            'Available with 80, 100, or 120 prongs',
            'Different shapes for thin and thick tea',
            'Must be rinsed and air-dried after use'
          ]
        },
        {
          id: 'chashaku',
          name: 'Chashaku',
          reading: 'Tea Scoop',
          category: 'Main Utensils',
          image: '/images/chashaku.jpg',
          description: 'A bamboo scoop for measuring matcha powder. Often given poetic names related to seasons.',
          details: [
            'Made from bamboo, ivory, or wood',
            'Sometimes carved by tea practitioners',
            'Given seasonal poetic names',
            'Curvature of the tip is an aesthetic point'
          ]
        },
        {
          id: 'mizusashi',
          name: 'Mizusashi',
          reading: 'Fresh Water Container',
          category: 'Main Utensils',
          image: '/images/mizusashi.jpg',
          description: 'A container for fresh water used during the tea ceremony. Water is added to the kettle or used to rinse the tea bowl.',
          details: [
            'Made of ceramics, metal, or glass',
            'Usually has a lid',
            'Selected according to season and occasion',
            'Important utensil in formal tea ceremonies'
          ]
        },
        {
          id: 'natsume',
          name: 'Natsume',
          reading: 'Tea Caddy for Thin Tea',
          category: 'Main Utensils',
          image: '/images/natsume.jpg',
          description: 'A container for thin tea powder. Named after the jujube fruit due to its similar shape.',
          details: [
            'Made of wood covered with lacquer',
            'Decorated with maki-e or mother-of-pearl',
            'Available in large, medium, and small sizes',
            'Selected according to season and occasion'
          ]
        },
        {
          id: 'chaire',
          name: 'Chaire',
          reading: 'Tea Caddy for Thick Tea',
          category: 'Main Utensils',
          image: '/images/chaire.jpg',
          description: 'A ceramic container for thick tea powder. Considered one of the most prestigious tea utensils.',
          details: [
            'Categories include Chinese, Japanese, and island origin',
            'Stored in a silk pouch called shifuku',
            'Various shapes with specific names',
            'Famous chaire are highly prized'
          ]
        },
        {
          id: 'hishaku',
          name: 'Hishaku',
          reading: 'Ladle',
          category: 'Auxiliary Utensils',
          image: '/images/hishaku.jpg',
          description: 'A bamboo ladle with a long handle used to scoop hot water.',
          details: [
            'Made of bamboo',
            'Handle length is about 40cm',
            'The motion of scooping water is also beautiful',
            'Specific regulations for joint position and cup size'
          ]
        },
        {
          id: 'futaoki',
          name: 'Futaoki',
          reading: 'Lid Rest',
          category: 'Auxiliary Utensils',
          image: '/images/futaoki.jpg',
          description: 'A small utensil for resting the kettle lid or ladle. Made of bamboo or ceramics.',
          details: [
            'Available in bamboo and ceramic',
            'Usually has three legs',
            'Small but plays an important role',
            'Different types for different seasons'
          ]
        },
        {
          id: 'kama',
          name: 'Kama',
          reading: 'Kettle',
          category: 'Auxiliary Utensils',
          image: '/images/kama.jpg',
          description: 'An iron kettle for boiling water. Placed on a furo (brazier) or ro (hearth).',
          details: [
            'Made of cast iron',
            'Different shapes for different seasons',
            'Shape and sound are part of the enjoyment',
            'Works by famous kettle makers are valuable'
          ]
        },
        {
          id: 'furo',
          name: 'Furo',
          reading: 'Brazier',
          category: 'Auxiliary Utensils',
          image: '/images/furo.jpg',
          description: 'A portable brazier for heating the kettle. Used from May to October.',
          details: [
            'Made of ceramics or metal',
            'Used for summer tea ceremonies',
            'Placed above ground, unlike ro',
            'Various shapes and decorations'
          ]
        },
        {
          id: 'kensui',
          name: 'Kensui',
          reading: 'Waste Water Container',
          category: 'Auxiliary Utensils',
          image: '/images/kensui.jpg',
          description: 'A container for discarding used water. Also called "koboshi".',
          details: [
            'Made of metal, ceramics, or bamboo',
            'Used to discard water from warming the bowl',
            'Used to discard water from rinsing the whisk',
            'Available in round or square shapes'
          ]
        },
        {
          id: 'chakin',
          name: 'Chakin',
          reading: 'Tea Cloth',
          category: 'Auxiliary Utensils',
          image: '/images/chakin.jpg',
          description: 'A white linen cloth for wiping the tea bowl. Essential for maintaining cleanliness.',
          details: [
            'Made of white linen or cotton',
            'Moistened with hot water before use',
            'Used to wipe the rim of the tea bowl',
            'Must be washed and kept clean after use'
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
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.tools.map((tool, index) => (
              <div 
                key={tool.id}
                className="content-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedTool(tool)}
              >
                <div className="w-full h-40 mb-4 flex items-center justify-center bg-white rounded-xl overflow-hidden">
                  <img 
                    src={tool.image} 
                    alt={tool.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl font-semibold mb-1">{tool.name}</h3>
                  <p className="text-sm text-matcha mb-2">{tool.reading}</p>
                  <span className="inline-block px-3 py-1 bg-matcha/10 text-matcha text-xs rounded-full">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedTool && (
        <div 
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="bg-paper rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 content-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-display text-4xl font-bold mb-2">{selectedTool.name}</h2>
                <p className="text-lg text-matcha">{selectedTool.reading}</p>
              </div>
              <button 
                onClick={() => setSelectedTool(null)}
                className="text-ink/50 hover:text-ink transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="w-full h-64 mb-6 flex items-center justify-center bg-white rounded-2xl overflow-hidden">
              <img 
                src={selectedTool.image} 
                alt={selectedTool.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            
            <p className="text-lg text-ink/80 leading-relaxed mb-6">
              {selectedTool.description}
            </p>
            
            <h3 className="font-display text-2xl font-semibold mb-4 text-matcha">
              {language === 'ja' ? '詳細' : 'Details'}
            </h3>
            <ul className="space-y-3">
              {selectedTool.details.map((detail, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-matcha rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-ink/70">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-8">
            {language === 'ja' ? '次のステップ' : 'Next Steps'}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/basics" className="px-8 py-4 bg-matcha text-paper rounded-full font-medium hover:bg-matcha-dark transition-all hover:scale-105 shadow-lg">
              {language === 'ja' ? '茶道の基本' : 'Basics'}
            </Link>
            <Link to="/history" className="px-8 py-4 border-2 border-matcha text-matcha rounded-full font-medium hover:bg-matcha hover:text-paper transition-all hover:scale-105">
              {language === 'ja' ? '歴史と文化' : 'History & Culture'}
            </Link>
            <Link to="/" className="px-8 py-4 border-2 border-ink/20 text-ink rounded-full font-medium hover:border-ink hover:bg-ink hover:text-paper transition-all hover:scale-105">
              {language === 'ja' ? 'ホームに戻る' : 'Back to Home'}
            </Link>
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

export default Tools;