import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Basics = () => {
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
      title: '茶道の基本',
      subtitle: '茶の湯への第一歩',
      intro: {
        title: '茶道とは',
        text: '茶道は、日本の伝統文化の一つで、お茶を点て、振る舞い、いただくことを通じて、心の交流を深める総合芸術です。単なる飲茶の作法ではなく、禅の精神を基盤とした「わび・さび」の美意識、そして「一期一会」の心を大切にする道です。'
      },
      history: {
        title: '茶道の歴史',
        text: '茶を飲む習慣は、平安時代に最澄や空海といった僧侶によって中国（唐）より伝えられたと言われています。鎌倉時代になると臨済宗を伝えた栄西も宋代の喫茶法である抹茶を伝えました。我が国最古の茶書とされる『喫茶養生記』を記したことでも有名です。\n\n室町時代になると、度々禁令も出されるほどに中国渡来の美術品を愛玩する唐物趣味の茶が流行します。その中にあって八代将軍足利義政の時代に登場した珠光（1422-1502）は、国産の茶道具にも目を向けて不足の美を見いだすなど、深い精神性に基づいた草庵の茶の湯を志向した人物です。この精神を受け継いだのが、武野紹鷗(1502-1555)であり、さらに哲学的・審美的に思想を深めて茶の湯文化を大成したのが、千利休（1522-1591）だと言われています。'
      },
      principles: {
        title: '四規',
        subtitle: '和敬清寂',
        items: [
          { kanji: '和', title: 'わ', desc: 'お互いに心を開いて仲良くすること' },
          { kanji: '敬', title: 'けい', desc: 'お互いに敬い合うこと' },
          { kanji: '清', title: 'せい', desc: '心身ともに清らかであること' },
          { kanji: '寂', title: 'じゃく', desc: 'どんなときにも動じない心' }
        ]
      },
      shikishichisoku: {
        title: '四規七則',
        intro: '千利休の言葉として伝わるものに、「四規七則（しきしちそく）」があります。「四規」とは、茶道の精神を要約した「和敬清寂」という四語の言葉を指します。また、七則とは、「茶は服のよきように点て」「炭は湯のわくように置き」「夏は涼しく冬は暖かに」「花は野にあるように」「刻限は早めに」「降らずとも雨の用意」「相客に心せよ」という茶人が心に留めるべき七つの教えから成っています。',
        story: '利休にある人が「茶の湯とは何ですか、教えてください」と尋ねました。「この七則がすべてです」と応えました。すると尋ねた人は「そんなことくらいは、三才の赤子でもわかっております」といいました。利休は「わかっていてもできないのが人間ではないですか。あなたが本当にできるならば、私が弟子になりましょう」と答えたといいます。',
        conclusion: '茶道では、このような精神を基本にして、客を招き、心の交流を図ります。その基本を身につけるために稽古を行います。繰り返して「型」を学んでいく中で、自分自身と向き合い、自分なりの形を整えていくのです。',
        items: [
          { title: '茶は服のよきように点て', desc: 'お茶は相手が美味しく飲めるように心を込めて点てる' },
          { title: '炭は湯のわくように置き', desc: '炭は湯が適切に沸くように置く' },
          { title: '夏は涼しく冬は暖かに', desc: '季節に応じた心配りをする' },
          { title: '花は野にあるように', desc: '花は自然のままの美しさを大切に' },
          { title: '刻限は早めに', desc: '時間に余裕を持って準備する' },
          { title: '降らずとも雨の用意', desc: '万が一に備えて準備を怠らない' },
          { title: '相客に心せよ', desc: '共に茶会を楽しむ客への配慮を忘れない' }
        ]
      }
    },
    en: {
      title: 'Tea Ceremony Basics',
      subtitle: 'Your First Step into the Way of Tea',
      intro: {
        title: 'What is Tea Ceremony?',
        text: 'The Japanese tea ceremony, or "chado," is a traditional art form that goes beyond simply preparing and drinking tea. It is a comprehensive cultural practice rooted in Zen Buddhism, emphasizing the aesthetics of "wabi-sabi" and the principle of "ichi-go ichi-e" (one time, one meeting).'
      },
      history: {
        title: 'History of Tea Ceremony',
        text: 'The custom of drinking tea was brought to Japan from China (Tang Dynasty) during the Heian period by Buddhist monks such as Saicho and Kukai. In the Kamakura period, Eisai, who introduced Rinzai Zen, also brought the Song Dynasty method of preparing matcha. He is famous for writing "Kissa Yojoki," considered Japan\'s oldest tea text.\n\nDuring the Muromachi period, the tea culture centered on Chinese imported art objects became so popular that it was repeatedly banned. In this context, Juko (1422-1502), who emerged during the time of the eighth Shogun Ashikaga Yoshimasa, turned attention to domestic tea utensils and found beauty in imperfection, aspiring to a deeply spiritual grass-hut style of tea. This spirit was inherited by Takeno Joo (1502-1555), and the tea culture was philosophically and aesthetically perfected by Sen no Rikyu (1522-1591).'
      },
      principles: {
        title: 'Four Principles',
        subtitle: 'Wa Kei Sei Jaku',
        items: [
          { kanji: '和', title: 'Wa (Harmony)', desc: 'Creating harmony with others and nature' },
          { kanji: '敬', title: 'Kei (Respect)', desc: 'Showing respect to all things' },
          { kanji: '清', title: 'Sei (Purity)', desc: 'Maintaining purity in heart and space' },
          { kanji: '寂', title: 'Jaku (Tranquility)', desc: 'Finding inner peace and calm' }
        ]
      },
      shikishichisoku: {
        title: 'Four Principles and Seven Rules',
        intro: 'The teachings of Sen no Rikyu include the "Four Principles and Seven Rules." The Four Principles refer to "Wa Kei Sei Jaku," four words summarizing the spirit of tea ceremony. The Seven Rules are teachings that tea practitioners should keep in mind: "Prepare tea to suit the taste," "Arrange charcoal to heat the water," "Cool in summer, warm in winter," "Flowers as in the field," "Be early," "Prepare for rain even if it doesn\'t fall," and "Be mindful of fellow guests."',
        story: 'When someone asked Rikyu, "What is the tea ceremony? Please teach me," he replied, "These seven rules are everything." The person said, "Even a three-year-old child knows that much." Rikyu responded, "Even if you know, being unable to practice is human nature. If you can truly do it, I will become your disciple."',
        conclusion: 'In tea ceremony, based on this spirit, we invite guests and foster heartfelt exchange. We practice to master these basics. Through repeatedly learning the "forms," we face ourselves and develop our own style.',
        items: [
          { title: 'Prepare tea to suit the taste', desc: 'Make tea with care so guests enjoy it' },
          { title: 'Arrange charcoal properly', desc: 'Place charcoal so water boils appropriately' },
          { title: 'Cool in summer, warm in winter', desc: 'Show seasonal consideration' },
          { title: 'Flowers as in the field', desc: 'Cherish natural beauty of flowers' },
          { title: 'Be early', desc: 'Prepare with time to spare' },
          { title: 'Prepare for rain', desc: 'Always be prepared for contingencies' },
          { title: 'Be mindful of fellow guests', desc: 'Show consideration to other guests' }
        ]
      }
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
          <p className="text-2xl text-ink/70 font-light">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-matcha mb-6">
            {t.intro.title}
          </h2>
          <p className="text-xl leading-relaxed text-ink/80">
            {t.intro.text}
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-matcha mb-6">
            {t.history.title}
          </h2>
          <div className="text-lg leading-relaxed text-ink/80 whitespace-pre-line">
            {t.history.text}
          </div>
        </div>
      </section>

      {/* Shiki Shichisoku Introduction */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-center mb-12">
            {t.shikishichisoku.title}
          </h2>
          
          <p className="text-lg leading-relaxed text-ink/80 mb-6">
            {t.shikishichisoku.intro}
          </p>
          <div className="p-6 bg-matcha/5 rounded-2xl border-l-4 border-matcha mb-6">
            <p className="text-lg leading-relaxed text-ink/80 italic">
              {t.shikishichisoku.story}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-ink/80">
            {t.shikishichisoku.conclusion}
          </p>
        </div>
      </section>

      {/* Four Principles */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-center mb-4">
            {t.principles.title}
          </h2>
          <p className="text-2xl text-center text-matcha font-semibold mb-16">
            {t.principles.subtitle}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {t.principles.items.map((item, i) => (
              <div key={i} className="content-card p-8 rounded-2xl hover:scale-105 transition-transform">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-matcha/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-4xl font-bold text-matcha">{item.kanji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-ink/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seven Rules */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12 text-matcha">
            {language === 'ja' ? '七則' : 'Seven Rules'}
          </h2>
          
          <div className="space-y-4">
            {t.shikishichisoku.items.map((item, i) => (
              <div key={i} className="content-card p-6 rounded-2xl hover:scale-102 transition-transform">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-matcha rounded-full flex items-center justify-center text-paper font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-ink/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-8">
            {language === 'ja' ? '次のステップ' : 'Next Steps'}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/history" className="px-8 py-4 bg-matcha text-paper rounded-full font-medium hover:bg-matcha-dark transition-all hover:scale-105 shadow-lg">
              {language === 'ja' ? '歴史と文化' : 'History & Culture'}
            </Link>
            <Link to="/tools" className="px-8 py-4 border-2 border-matcha text-matcha rounded-full font-medium hover:bg-matcha hover:text-paper transition-all hover:scale-105">
              {language === 'ja' ? '茶道具' : 'Tea Utensils'}
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

export default Basics;