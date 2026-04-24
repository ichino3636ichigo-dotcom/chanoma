import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const History = () => {
  const [language, setLanguage] = useState('ja');

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
      title: '歴史と文化',
      subtitle: '茶の湯の歩み',
      intro: {
        title: '茶道の起源',
        text: '茶を飲む習慣は、平安時代に最澄や空海といった僧侶によって中国（唐）より伝えられたと言われています。当初は薬として、また宗教儀式の一部として用いられていました。'
      },
      periods: [
        {
          era: '平安時代（794-1185）',
          title: '茶の伝来',
          content: '最澄や空海が中国から茶の種子を持ち帰り、比叡山や高野山で栽培を始めました。この時代の茶は主に貴族や僧侶の間で飲まれ、薬効や覚醒作用が重視されていました。'
        },
        {
          era: '鎌倉時代（1185-1333）',
          title: '抹茶の伝来と禅との結びつき',
          content: '栄西が中国（宋）から抹茶の製法と喫茶法を伝えました。『喫茶養生記』を著し、茶の効能を説きました。禅寺での修行の一環として茶を飲む習慣が広まり、茶と禅が深く結びつくようになります。将軍や武士の間でも茶を飲む文化が普及しました。'
        },
        {
          era: '室町時代（1336-1573）',
          title: '茶の湯の成立',
          content: '足利義政の時代、中国渡来の美術品（唐物）を愛玩する茶が流行しました。この豪華絢爛な茶の湯に対し、村田珠光（1423-1502）は「わび」の精神を取り入れた草庵茶を提唱。武野紹鷗（1502-1555）がこれを継承し、茶の湯の精神性を深めました。'
        },
        {
          era: '安土桃山時代（1573-1603）',
          title: '千利休と侘び茶の完成',
          content: '千利休（1522-1591）が侘び茶を大成しました。豪華な茶道具ではなく、素朴で簡素な道具を用い、「一期一会」「和敬清寂」の精神を重視しました。小さな茶室（二畳の茶室も）で、主客が心を通わせる茶の湯を確立。利休の美学は今日まで茶道の根幹をなしています。'
        },
        {
          era: '江戸時代（1603-1868）',
          title: '三千家の成立と茶道の普及',
          content: '利休の孫、千宗旦の三人の息子がそれぞれ茶道の家を興し、三千家（表千家・裏千家・武者小路千家）が成立しました。茶道は武家だけでなく、町人の間にも広がり、日本文化として定着していきます。各流派が独自の作法や美意識を発展させました。'
        },
        {
          era: '明治時代以降（1868-現在）',
          title: '近代化と世界への広がり',
          content: '明治維新後、西洋化の波の中で一時衰退しかけた茶道ですが、女子教育の一環として取り入れられ、再び盛んになりました。戦後は海外にも紹介され、「ZEN」や「WABI-SABI」として世界中で注目されています。現代では、伝統を守りながらも新しい試みが行われ、茶道は進化を続けています。'
        }
      ],
      figures: {
        title: '茶道を築いた人々',
        people: [
          {
            name: '栄西（えいさい）',
            years: '1141-1215',
            contribution: '中国から抹茶と禅を伝えた僧侶。『喫茶養生記』を著し、茶の効能を説きました。'
          },
          {
            name: '村田珠光（むらたじゅこう）',
            years: '1423-1502',
            contribution: '侘び茶の創始者。禅の精神を茶の湯に取り入れ、「月も雲間のなきは嫌にて候」と述べ、不完全の美を見出しました。'
          },
          {
            name: '武野紹鷗（たけのじょうおう）',
            years: '1502-1555',
            contribution: '珠光の精神を継承し、茶の湯の精神性を深めました。利休の師として知られています。'
          },
          {
            name: '千利休（せんのりきゅう）',
            years: '1522-1591',
            contribution: '侘び茶を大成し、茶道の精神と美学を確立。「和敬清寂」を説き、茶道を芸術の域にまで高めました。'
          },
          {
            name: '古田織部（ふるたおりべ）',
            years: '1544-1615',
            contribution: '利休の弟子。武家茶道を発展させ、独創的な「織部焼」を生み出しました。'
          },
          {
            name: '小堀遠州（こぼりえんしゅう）',
            years: '1579-1647',
            contribution: '「きれいさび」の美学を提唱。建築や庭園にも優れ、総合芸術としての茶道を追求しました。'
          }
        ]
      },
      philosophy: {
        title: '茶道の哲学',
        concepts: [
          {
            term: 'わび・さび',
            description: '簡素で静かな美しさ。不完全なものや古びたものの中に見出す深い趣。'
          },
          {
            term: '一期一会',
            description: '一生に一度の出会い。この茶会は二度と同じようには訪れないという心構え。'
          },
          {
            term: '和敬清寂',
            description: '茶道の四規。主客が互いに和み、敬い、心身を清め、どんなときも動じない境地。'
          },
          {
            term: '守破離',
            description: '学びの三段階。まず型を守り、次に型を破り、最後に型から離れて独自の境地に至る。'
          }
        ]
      }
    },
    en: {
      title: 'History & Culture',
      subtitle: 'The Journey of the Way of Tea',
      intro: {
        title: 'Origins of Tea Ceremony',
        text: 'The custom of drinking tea was brought to Japan from China (Tang Dynasty) during the Heian period by Buddhist monks such as Saicho and Kukai. Initially, tea was used as medicine and as part of religious rituals.'
      },
      periods: [
        {
          era: 'Heian Period (794-1185)',
          title: 'Introduction of Tea',
          content: 'Saicho and Kukai brought tea seeds from China and began cultivation at Mt. Hiei and Mt. Koya. Tea during this period was mainly consumed by nobility and monks, valued for its medicinal and awakening properties.'
        },
        {
          era: 'Kamakura Period (1185-1333)',
          title: 'Introduction of Matcha and Connection with Zen',
          content: 'Eisai introduced the method of preparing and drinking matcha from China (Song Dynasty). He wrote "Kissa Yojoki" explaining the benefits of tea. The practice of drinking tea as part of Zen training spread, deeply connecting tea with Zen Buddhism. Tea culture also spread among shoguns and samurai.'
        },
        {
          era: 'Muromachi Period (1336-1573)',
          title: 'Establishment of Tea Ceremony',
          content: 'During Ashikaga Yoshimasa\'s era, lavish tea gatherings centered on Chinese imported art objects became popular. In contrast, Murata Juko (1423-1502) introduced the spirit of "wabi" into grass-hut tea. Takeno Joo (1502-1555) inherited this and deepened the spirituality of tea ceremony.'
        },
        {
          era: 'Azuchi-Momoyama Period (1573-1603)',
          title: 'Sen no Rikyu and Perfection of Wabi-cha',
          content: 'Sen no Rikyu (1522-1591) perfected wabi-cha. Instead of luxurious tea utensils, he used simple and humble tools, emphasizing the spirits of "ichi-go ichi-e" and "wa-kei-sei-jaku". He established tea ceremony in small tea rooms where host and guests could connect spiritually. Rikyu\'s aesthetics remain the foundation of tea ceremony today.'
        },
        {
          era: 'Edo Period (1603-1868)',
          title: 'Establishment of San-Senke and Spread of Tea Ceremony',
          content: 'Three sons of Sen Sotan, Rikyu\'s grandson, each established tea schools, forming the San-Senke (Omotesenke, Urasenke, and Mushanokojisenke). Tea ceremony spread not only among samurai but also among townspeople, becoming established as Japanese culture. Each school developed its own practices and aesthetics.'
        },
        {
          era: 'Meiji Period to Present (1868-Present)',
          title: 'Modernization and Global Spread',
          content: 'After the Meiji Restoration, tea ceremony temporarily declined amid Westernization, but revived as part of women\'s education. After WWII, it was introduced abroad and gained attention worldwide as "ZEN" and "WABI-SABI". Today, tea ceremony continues to evolve, preserving tradition while embracing new approaches.'
        }
      ],
      figures: {
        title: 'Pioneers of Tea Ceremony',
        people: [
          {
            name: 'Eisai',
            years: '1141-1215',
            contribution: 'Monk who introduced matcha and Zen from China. Wrote "Kissa Yojoki" explaining the benefits of tea.'
          },
          {
            name: 'Murata Juko',
            years: '1423-1502',
            contribution: 'Founder of wabi-cha. Incorporated Zen spirit into tea ceremony, finding beauty in imperfection.'
          },
          {
            name: 'Takeno Joo',
            years: '1502-1555',
            contribution: 'Inherited Juko\'s spirit and deepened the spirituality of tea ceremony. Known as Rikyu\'s teacher.'
          },
          {
            name: 'Sen no Rikyu',
            years: '1522-1591',
            contribution: 'Perfected wabi-cha and established the spirit and aesthetics of tea ceremony. Taught "wa-kei-sei-jaku" and elevated tea ceremony to an art form.'
          },
          {
            name: 'Furuta Oribe',
            years: '1544-1615',
            contribution: 'Rikyu\'s disciple. Developed samurai tea ceremony and created distinctive "Oribe ware".'
          },
          {
            name: 'Kobori Enshu',
            years: '1579-1647',
            contribution: 'Advocated "kirei-sabi" aesthetics. Excelled in architecture and gardens, pursuing tea ceremony as a comprehensive art.'
          }
        ]
      },
      philosophy: {
        title: 'Philosophy of Tea Ceremony',
        concepts: [
          {
            term: 'Wabi-Sabi',
            description: 'Simple and quiet beauty. Finding deep aesthetic value in imperfect and aged things.'
          },
          {
            term: 'Ichi-go Ichi-e',
            description: 'One time, one meeting. The awareness that this tea gathering will never occur in the same way again.'
          },
          {
            term: 'Wa-Kei-Sei-Jaku',
            description: 'Four principles of tea ceremony. Host and guests harmonize, respect each other, maintain purity, and achieve tranquility.'
          },
          {
            term: 'Shu-Ha-Ri',
            description: 'Three stages of learning. First protect the form, then break the form, finally separate from the form to reach one\'s own境地.'
          }
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
        
        .timeline-dot {
          width: 16px;
          height: 16px;
          background: var(--matcha);
          border-radius: 50%;
          border: 4px solid var(--paper);
          box-shadow: 0 2px 8px rgba(127, 166, 127, 0.3);
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
          <h1 className="font-display text-4xl md:text-6xl font-bold text-ink mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-ink/70 font-light">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-matcha mb-4">
            {t.intro.title}
          </h2>
          <p className="text-lg leading-relaxed text-ink/80">
            {t.intro.text}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-matcha">
            {language === 'ja' ? '茶道の歴史' : 'Tea Ceremony Timeline'}
          </h2>
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            {t.periods.map((period, index) => (
              <div key={index} className="border-l-4 border-matcha pl-4">
                <div className="mb-2">
                  <span className="text-xs text-ink/50">{period.era}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{period.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80">{period.content}</p>
              </div>
            ))}
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:block space-y-8">
            {t.periods.map((period, index) => (
              <div key={index} className="flex gap-6">
                {/* Left side - Era */}
                <div className="w-40 flex-shrink-0 text-right pt-2">
                  <div className="text-sm text-ink/60 mb-1">{period.era.split('（')[1]?.replace('）', '')}</div>
                  <div className="font-display text-2xl font-bold text-matcha">{period.era.split('（')[0]}</div>
                </div>
                
                {/* Center - Timeline */}
                <div className="relative flex flex-col items-center">
                  <div className="w-4 h-4 bg-matcha rounded-full border-4 border-paper shadow-md z-10"></div>
                  {index < t.periods.length - 1 && (
                    <div className="w-0.5 h-full bg-matcha/30 absolute top-4"></div>
                  )}
                </div>
                
                {/* Right side - Content card */}
                <div className="flex-1 pb-8">
                  <div className="bg-matcha/10 rounded-2xl p-6 border-l-4 border-matcha">
                    <h3 className="font-display text-2xl font-bold mb-3 text-ink">{period.title}</h3>
                    <p className="text-base leading-relaxed text-ink/80">{period.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-matcha">
            {t.figures.title}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {t.figures.people.map((person, index) => {
              const imageNames = ['eisai.jpg', 'muratajukou.jpg', 'takenojouou.jpg', 'sennnorikyu.jpg', 'furutaoribe.jpg', 'koborienshu.jpg'];
              
              return (
                <div key={index} className="content-card rounded-2xl overflow-hidden">
                  <img 
                    src={`/images/${imageNames[index]}`} 
                    alt={person.name}
                    style={{
                      width: '100%',
                      height: index === 0 ? '450px' : '400px',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="p-4 md:p-6 text-center">
                    <h3 className="font-display text-lg md:text-2xl font-bold mb-1">{person.name}</h3>
                    <p className="text-xs md:text-sm text-matcha mb-2 md:mb-3">{person.years}</p>
                    <p className="text-sm md:text-base text-ink/70 leading-relaxed">{person.contribution}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-matcha">
            {t.philosophy.title}
          </h2>
          
          <div className="space-y-6">
            {t.philosophy.concepts.map((concept, index) => (
              <div key={index} className="content-card p-6 rounded-2xl">
                <h3 className="font-display text-2xl font-bold mb-3 text-matcha">{concept.term}</h3>
                <p className="text-lg leading-relaxed text-ink/80">{concept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-8">
            {language === 'ja' ? '次のステップ' : 'Next Steps'}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/basics" className="px-8 py-4 bg-matcha text-paper rounded-full font-medium hover:bg-matcha-dark transition-all hover:scale-105 shadow-lg">
              {language === 'ja' ? '茶道の基本' : 'Basics'}
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

export default History;