import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Chabana = () => {
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
      title: '茶花',
      subtitle: '「花は野にあるように」',
      intro: '茶室に活ける花は、季節の移ろいと茶人の心を表現します。控えめでありながら存在感のある、茶道ならではの花の美学を学びましょう。',
      monthNames: ['睦月', '如月', '弥生', '卯月', '皐月', '水無月', '文月', '葉月', '長月', '神無月', '霜月', '師走'],
      months: [
        { // 1月
          month: 1,
          flowers: [
            { name: '水仙', reading: 'すいせん', meaning: '清楚で凛とした美しさ', season: '冬の代表花' },
            { name: '寒椿', reading: 'かんつばき', meaning: '寒さの中で咲く力強さ', season: '冬を彩る' },
            { name: '千両', reading: 'せんりょう', meaning: '赤い実が縁起良い', season: '正月の飾り' },
            { name: '蝋梅', reading: 'ろうばい', meaning: '黄色い花と芳香', season: '早春の香り' },
            { name: '侘助', reading: 'わびすけ', meaning: '素朴で控えめな椿', season: '茶花の定番' },
            { name: '福寿草', reading: 'ふくじゅそう', meaning: '春を告げる黄金の花', season: '新年の喜び' }
          ]
        },
        { // 2月
          month: 2,
          flowers: [
            { name: '梅', reading: 'うめ', meaning: '早春を告げる香り高い花', season: '春の訪れ' },
            { name: '侘助', reading: 'わびすけ', meaning: '一重の素朴な椿', season: '茶花の王道' },
            { name: '雪柳', reading: 'ゆきやなぎ', meaning: '白い小花が雪のよう', season: '春の始まり' },
            { name: '沈丁花', reading: 'じんちょうげ', meaning: '芳香が特徴', season: '春の香り' },
            { name: '寒緋桜', reading: 'かんひざくら', meaning: '早咲きの桜', season: '春近し' },
            { name: '満作', reading: 'まんさく', meaning: '春一番に咲く', season: '豊作祈願' }
          ]
        },
        { // 3月
          month: 3,
          flowers: [
            { name: '桃', reading: 'もも', meaning: '雛祭りの花', season: '春の象徴' },
            { name: '椿', reading: 'つばき', meaning: '茶花の代表格', season: '春の気品' },
            { name: '沈丁花', reading: 'じんちょうげ', meaning: '芳しい香り', season: '春の訪れ' },
            { name: '木瓜', reading: 'ぼけ', meaning: '鮮やかな赤や白の花', season: '早春の彩り' },
            { name: '連翹', reading: 'れんぎょう', meaning: '黄色い花が枝を覆う', season: '春の喜び' },
            { name: '雪割草', reading: 'ゆきわりそう', meaning: '雪を割って咲く', season: '早春の力' }
          ]
        },
        { // 4月
          month: 4,
          flowers: [
            { name: '桜', reading: 'さくら', meaning: '日本の春を代表する花', season: '花の季節' },
            { name: '山吹', reading: 'やまぶき', meaning: '鮮やかな黄色', season: '春爛漫' },
            { name: '木蓮', reading: 'もくれん', meaning: '大輪の白や紫の花', season: '春の華やぎ' },
            { name: '海棠', reading: 'かいどう', meaning: '桜に似た可憐な花', season: '春の風情' },
            { name: '椿', reading: 'つばき', meaning: '春の茶花の定番', season: '茶席の花' },
            { name: '雪柳', reading: 'ゆきやなぎ', meaning: '白い小花の連なり', season: '春の清涼感' }
          ]
        },
        { // 5月
          month: 5,
          flowers: [
            { name: '菖蒲', reading: 'あやめ', meaning: '端午の節句の花', season: '初夏の訪れ' },
            { name: '牡丹', reading: 'ぼたん', meaning: '豪華絢爛な花', season: '花の王' },
            { name: '藤', reading: 'ふじ', meaning: '紫の房状の花', season: '初夏の風情' },
            { name: '卯の花', reading: 'うのはな', meaning: '白い小花', season: '清楚な美' },
            { name: '都忘れ', reading: 'みやこわすれ', meaning: '紫の可憐な花', season: '初夏の彩り' },
            { name: '鈴蘭', reading: 'すずらん', meaning: '白い鈴のような花', season: '初夏の清らかさ' }
          ]
        },
        { // 6月
          month: 6,
          flowers: [
            { name: '紫陽花', reading: 'あじさい', meaning: '梅雨を彩る花', season: '雨の季節' },
            { name: '露草', reading: 'つゆくさ', meaning: '青い小花', season: '梅雨の風情' },
            { name: '半夏生', reading: 'はんげしょう', meaning: '葉が白くなる', season: '梅雨の終わり' },
            { name: '杜若', reading: 'かきつばた', meaning: '水辺に咲く紫の花', season: '初夏の水景' },
            { name: '花菖蒲', reading: 'はなしょうぶ', meaning: '大輪の花菖蒲', season: '水辺の華' },
            { name: '泰山木', reading: 'たいさんぼく', meaning: '大きな白い花', season: '初夏の気品' }
          ]
        },
        { // 7月
          month: 7,
          flowers: [
            { name: '朝顔', reading: 'あさがお', meaning: '夏の朝を彩る', season: '夏の風物詩' },
            { name: '撫子', reading: 'なでしこ', meaning: '可憐なピンクの花', season: '秋の七草' },
            { name: '桔梗', reading: 'ききょう', meaning: '清楚な紫の花', season: '夏から秋へ' },
            { name: '百合', reading: 'ゆり', meaning: '気品ある大輪', season: '夏の華麗' },
            { name: '萩', reading: 'はぎ', meaning: '秋を先取りする花', season: '秋の気配' },
            { name: '女郎花', reading: 'おみなえし', meaning: '黄色い小花', season: '秋の七草' }
          ]
        },
        { // 8月
          month: 8,
          flowers: [
            { name: '百日紅', reading: 'さるすべり', meaning: '夏中咲き続ける', season: '盛夏の彩り' },
            { name: '萩', reading: 'はぎ', meaning: '秋の訪れを告げる', season: '秋の七草' },
            { name: '女郎花', reading: 'おみなえし', meaning: '黄色い秋の花', season: '秋の気配' },
            { name: '桔梗', reading: 'ききょう', meaning: '秋の七草の一つ', season: '秋の風情' },
            { name: '芙蓉', reading: 'ふよう', meaning: '大輪の花', season: '夏の終わり' },
            { name: '木槿', reading: 'むくげ', meaning: '朝咲き夕方散る', season: '夏の一日花' }
          ]
        },
        { // 9月
          month: 9,
          flowers: [
            { name: '秋桜', reading: 'こすもす', meaning: '秋を彩る花', season: '秋の代表花' },
            { name: '桔梗', reading: 'ききょう', meaning: '秋の七草', season: '秋の風雅' },
            { name: '葛', reading: 'くず', meaning: '秋の七草の一つ', season: '秋の野' },
            { name: '萩', reading: 'はぎ', meaning: '秋の代表花', season: '秋の風情' },
            { name: '女郎花', reading: 'おみなえし', meaning: '黄色い秋草', season: '秋の野花' },
            { name: '彼岸花', reading: 'ひがんばな', meaning: '秋彼岸に咲く', season: '秋の象徴' }
          ]
        },
        { // 10月
          month: 10,
          flowers: [
            { name: '菊', reading: 'きく', meaning: '気品ある秋の花', season: '秋の代表花' },
            { name: '野菊', reading: 'のぎく', meaning: '野に咲く小菊', season: '秋の野花' },
            { name: '竜胆', reading: 'りんどう', meaning: '深い青紫の花', season: '秋の深まり' },
            { name: '秋桜', reading: 'こすもす', meaning: '秋風に揺れる', season: '秋の情景' },
            { name: '紫苑', reading: 'しおん', meaning: '紫の野菊', season: '秋の雅' },
            { name: '吾亦紅', reading: 'われもこう', meaning: '渋い赤の小花', season: '秋の趣' }
          ]
        },
        { // 11月
          month: 11,
          flowers: [
            { name: '山茶花', reading: 'さざんか', meaning: '冬の訪れを告げる', season: '初冬の花' },
            { name: '紅葉', reading: 'もみじ', meaning: '秋の彩り', season: '晩秋の美' },
            { name: '石蕗', reading: 'つわぶき', meaning: '黄色い花', season: '晩秋の彩り' },
            { name: '菊', reading: 'きく', meaning: '晩秋の気品', season: '秋の終わり' },
            { name: '竜胆', reading: 'りんどう', meaning: '深い青紫', season: '秋の深まり' },
            { name: '寒椿', reading: 'かんつばき', meaning: '冬に向かう', season: '初冬の気配' }
          ]
        },
        { // 12月
          month: 12,
          flowers: [
            { name: '椿', reading: 'つばき', meaning: '冬の茶花の定番', season: '冬の気品' },
            { name: '南天', reading: 'なんてん', meaning: '赤い実が美しい', season: '冬の彩り' },
            { name: '千両', reading: 'せんりょう', meaning: '縁起の良い赤い実', season: '冬の喜び' },
            { name: '山茶花', reading: 'さざんか', meaning: '寒さに負けない', season: '冬の力強さ' },
            { name: '侘助', reading: 'わびすけ', meaning: '茶花の王道', season: '冬の風情' },
            { name: '水仙', reading: 'すいせん', meaning: '清楚な白い花', season: '冬の清らかさ' }
          ]
        }
      ]
    },
    en: {
      title: 'Tea Flowers (Chabana)',
      subtitle: 'The Beauty of a Single Bloom',
      intro: 'Flowers arranged in the tea room express the changing seasons and the tea master\'s heart. Learn the aesthetic of tea ceremony flowers - understated yet impactful.',
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      months: [] // 簡略化のため英語版は省略
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

      {/* Flowers Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Month Title */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
              {currentMonth.month}月 {t.monthNames[currentMonth.month - 1]}
            </h2>
          </div>

          {/* Flower Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentMonth.flowers.map((flower, index) => (
              <div key={index} className="content-card rounded-2xl overflow-hidden">
                {/* Placeholder for image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, #7fa67f 0%, #5d7d5d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  画像準備中
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="border-l-4 border-matcha pl-3 md:pl-4 mb-3">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-1">
                      {flower.name}
                    </h3>
                    <p className="text-xs md:text-sm text-matcha font-medium">{flower.reading}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-ink/50 font-semibold mb-1">
                        {language === 'ja' ? '特徴' : 'Features'}
                      </p>
                      <p className="text-sm text-ink/80">{flower.meaning}</p>
                    </div>
                  </div>
                </div>
              </div>
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
        </div>
      </footer>
    </div>
  );
};

export default Chabana;