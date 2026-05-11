import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

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

  const zenPhrases = [
    // 春
    { kanji: '花', reading: 'か', meaning: '厳しい冬さを乗り越えて、光り輝く暖かな春到来を指す。心の華が開いて転迷開悟という。', season: 'spring', length: 1 },
    { kanji: '春芳', reading: 'しゅんほう', meaning: '芳香な春の草のこと。', season: 'spring', length: 2 },
    { kanji: '春風', reading: 'はるかぜ', meaning: '春に吹く暖かい風。穏やかな気候。', season: 'spring', length: 2 },
    { kanji: '春光', reading: 'しゅんこう', meaning: '春の景色。', season: 'spring', length: 2 },
    { kanji: '花月', reading: 'かげつ', meaning: '花と月。春夏秋冬の風雅を楽しむ、その道の達人の最もよい対象である。', season: 'spring', length: 2 },
    { kanji: '桜花', reading: 'おうか', meaning: '桜の花。春の象徴。', season: 'spring', length: 2 },
    { kanji: '暄風', reading: 'けんぷう', meaning: '春の風であり、陽風ともいわれる。暄は温暖の意味。', season: 'spring', length: 2 },
    { kanji: '春風浩々', reading: 'しゅんぷうこうこう', meaning: '勇んで行くものと、淋しく送るものとの心の対比。「浩々」は広々としたさま。', season: 'spring', length: 4 },
    { kanji: '雨後青山緑', reading: 'うごのせいざんみどりなり', meaning: '雨過ぎて、清々しい山のながめ。大雨が煩悩妄想の塵を洗い流して、うつくしい景色があらわれた。', season: 'spring', length: 5 },
    { kanji: '桜花無尽蔵', reading: 'おうかむじんぞう', meaning: '一輪の桜花は短い命であるがそこに永遠の生命を見出す禅人の境涯。', season: 'spring', length: 5 },
    { kanji: '春光日々新', reading: 'しゅんこうひびあらた', meaning: '春の景色は日を追って変化し、毎日毎日が新しいという意味。', season: 'spring', length: 5 },
    { kanji: '百華春至', reading: 'ひゃっかはるにいたる', meaning: '春が来て数えきれないくらいの花が咲き乱れている様子。', season: 'spring', length: 4 },

    // 夏
    { kanji: '滴翠', reading: 'てきすい', meaning: '滴るような緑。生き生きとした様子。', season: 'summer', length: 2 },
    { kanji: '青嵐', reading: 'あおあらし', meaning: '青葉を吹く強い風。初夏の力強さ。', season: 'summer', length: 2 },
    { kanji: '松濤', reading: 'しょうとう', meaning: '「濤」は波立つさま。松風の音を波にたとえた詩語。', season: 'summer', length: 2 },
    { kanji: '清流', reading: 'せいりゅう', meaning: '清らかな流れ。涼しさを感じる。', season: 'summer', length: 2 },
    { kanji: '涼風', reading: 'りょうふう', meaning: '涼しい風。暑さの中の心地よさ。', season: 'summer', length: 2 },
    { kanji: '青葉', reading: 'あおば', meaning: '青々とした葉。瑞々しさ。', season: 'summer', length: 2 },
    { kanji: '清風', reading: 'せいふう', meaning: '清らかな風。心地よい風。', season: 'summer', length: 2 },
    { kanji: '青山緑水', reading: 'せいざんりょくすい', meaning: '青い山、緑の水。雄大な自然の情景。', season: 'summer', length: 4 },
    { kanji: '山青水緑', reading: 'さんせいすいりょく', meaning: '青い山とみどりの水。森羅万象がそれぞれ所を得て安住しているさま。', season: 'summer', length: 4 },
    { kanji: '清流無間断', reading: 'せいりゅうかんだんなし', meaning: '清らかな流れは絶えることなく流れつづけている。涼しさを誘う言葉。', season: 'summer', length: 5 },
    { kanji: '水声無古今', reading: 'すいせい ここんなし', meaning: '水は絶え間なく流れ、その水音は今も昔も変わりない。', season: 'summer', length: 5 },

    // 秋
    { kanji: '露', reading: 'ろ', meaning: '「露」とは露出の露、つまり「あらわれる」とか「むき出しになる」という意味。', season: 'autumn', length: 1 },
    { kanji: '月', reading: 'つき', meaning: '秋の月。月見の季節。', season: 'autumn', length: 1 },
    { kanji: '菊', reading: 'きく', meaning: '気品ある秋の花。', season: 'autumn', length: 1 },
    { kanji: '秋風', reading: 'あきかぜ', meaning: '秋の涼しい風。爽やかな風。', season: 'autumn', length: 2 },
    { kanji: '名月', reading: 'めいげつ', meaning: '十五夜の美しい月。月見の宴。', season: 'autumn', length: 2 },
    { kanji: '紅葉', reading: 'もみじ', meaning: '秋に色づく葉。美しい秋の景色。', season: 'autumn', length: 2 },
    { kanji: '霜月', reading: 'そうげつ', meaning: '霜が降りる月。', season: 'autumn', length: 2 },
    { kanji: '明月', reading: 'めいげつ', meaning: '明るい月。中秋の名月。', season: 'autumn', length: 2 },
    { kanji: '霜月夜', reading: 'そうげつや', meaning: '霜が降りる月の夜。寒夜、一面に降りた霜が月光でキラキラと輝く風景。', season: 'autumn', length: 3 },
    { kanji: '明月清風', reading: 'めいげつせいふう', meaning: '明月と清風、清らかに落ち着いた境涯。自然を友にした自在なありかた。', season: 'autumn', length: 4 },
    { kanji: '清風拂明月', reading: 'せいふうめいげつをはらう', meaning: '秋の夜空には明るく輝く月がかかり、地上には涼しく秋風が吹くという情景の意味。', season: 'autumn', length: 5 },
    { kanji: '吾心似秋月', reading: 'わがこころしゅうげつににたり', meaning: 'わたしの心は秋の月に似ている。澄み切った悟りの境地を誌の中に託したもの。', season: 'autumn', length: 5 },

    // 冬
    { kanji: '雪', reading: 'ゆき', meaning: '冬の雪。清浄の象徴。', season: 'winter', length: 1 },
    { kanji: '氷', reading: 'こおり', meaning: '冬の氷。清らかさの象徴。', season: 'winter', length: 1 },
    { kanji: '寒月', reading: 'かんげつ', meaning: '冬の冷たい月。凛とした美しさ。', season: 'winter', length: 2 },
    { kanji: '初雪', reading: 'はつゆき', meaning: 'その年初めて降る雪。冬の訪れ。', season: 'winter', length: 2 },
    { kanji: '雪月', reading: 'せつげつ', meaning: '雪と月。冬の美しい景色。', season: 'winter', length: 2 },
    { kanji: '冰雪心', reading: 'ひょうせつしん', meaning: '氷や雪のように真っ白で清らかな心。', season: 'winter', length: 3 },
    { kanji: '雪月花', reading: 'せつげつか', meaning: '雪と月と花。四季の移り変わりの中の自然の美の総称の意味。', season: 'winter', length: 3 },
    { kanji: '紅炉一点雪', reading: 'こうろいってんのゆき', meaning: '真っ赤に燃え盛る炉の上に一片の雪が舞い落ち、瞬時に消えるさまをいう意味。', season: 'winter', length: 5 },
    { kanji: '松樹千年翠', reading: 'しょうじゅせんねんのみどり', meaning: 'つねに緑を保っている松とは、万古不易の真実の象徴であるという意味。', season: 'winter', length: 5 },
    { kanji: '松無古今色', reading: 'まつにここんのいろなし', meaning: '松は常に緑で変わらない。不変の真実の象徴。', season: 'winter', length: 5 },

    // 通年
    { kanji: '心', reading: 'こころ', meaning: '求めても得られないけれども、大切な教えを伝える主体となる。', season: 'yearRound', length: 1 },
    { kanji: '無', reading: 'む', meaning: 'いちばん簡単な一字「無」。「有」・「無」単純な対立的な見方では到底真実はつかめない。', season: 'yearRound', length: 1 },
    { kanji: '道', reading: 'どう', meaning: '宇宙を含むすべての存在が存在たらしめられている根源的な理のこと。', season: 'yearRound', length: 1 },
    { kanji: '真', reading: 'しん', meaning: '真理、真実、本当のこと。仏教では悟りによって得られた正しい道理をいう。', season: 'yearRound', length: 1 },
    { kanji: '静', reading: 'せい', meaning: '不動でいること。落ち着いていること。', season: 'yearRound', length: 1 },
    { kanji: '円相', reading: 'えんそう', meaning: '◯は「一円相」ともいい、宇宙の究極の姿を意味しています。', season: 'yearRound', length: 2 },
    { kanji: '喫茶去', reading: 'きっさこ', meaning: '「喫茶」とはお茶を飲む事。まあ一つお茶でも飲みに行こうじゃないかとと言う意味になる。', season: 'yearRound', length: 3 },
    { kanji: '知足', reading: 'ちそく', meaning: '「足ることを知る」ということ。足ることを知る者は心が満たされ安らかである。', season: 'yearRound', length: 2 },
    { kanji: '無心', reading: 'むしん', meaning: 'なにものにも心をとどめないこと。心を空っぽにして、自由になること。', season: 'yearRound', length: 2 },
    { kanji: '無我', reading: 'むが', meaning: '我に対する否定を表し、執着を否定し、それを超越したもの。', season: 'yearRound', length: 2 },
    { kanji: '守破離', reading: 'しゅはり', meaning: '最初は師の教えを守り、自分の個性を創造したのちに、師から離れて自立すること。', season: 'yearRound', length: 3 },
    { kanji: '一期一会', reading: 'いちごいちえ', meaning: '一期は一生、一会は唯一の出会い。この出会いは二度とないと思えば、出会いを大切に。', season: 'yearRound', length: 4 },
    { kanji: '日々是好日', reading: 'にちにちこれこうにち', meaning: '晴の日も雨の日も楽しい日も辛い日も、全てが人生最良の日であるいう意味。', season: 'yearRound', length: 5 },
    { kanji: '和敬清寂', reading: 'わけいせいじゃく', meaning: '茶道の祖である村田珠光の創唱とされ、利休の茶の精神をあらわす四つの規範。', season: 'yearRound', length: 4 },
    { kanji: '茶禅一味', reading: 'ちゃぜんいちみ', meaning: '茶道の心と禅の極意とは一つであること。茶道にいう「和敬清寂」の心。', season: 'yearRound', length: 4 },
    { kanji: '以心伝心', reading: 'いしんでんしん', meaning: '言葉や文字で表現することが難しい仏法の真髄を師から弟子の心に伝えること。', season: 'yearRound', length: 4 },
    { kanji: '行雲流水', reading: 'こううんりゅうすい', meaning: '行く雲、流れる水の如く、悠々と自在に場所を変え、一処不住、無執着、自由に生きる姿をあらわす。', season: 'yearRound', length: 4 },
    { kanji: '明鏡止水', reading: 'めいきょうしすい', meaning: '明らかな鏡としずかな水。心にわだかまりがなく、静かに落ちついていることのたとえ。', season: 'yearRound', length: 4 },
    { kanji: '平常心', reading: 'へいじょうしん', meaning: '普段と変わらない心。揺れ動くことのない心理状態。', season: 'yearRound', length: 3 },
    { kanji: '不動心', reading: 'ふどうしん', meaning: '何ものにも動かされることのない強い心。妄想煩悩に惑わされず動揺しない心。', season: 'yearRound', length: 3 },
    { kanji: '放下着', reading: 'ほうげじゃく', meaning: 'なんだって捨ててしまいなさい。捨ててこそ本来の立場がくっきり浮かぶ。', season: 'yearRound', length: 3 },
    { kanji: '本来無一物', reading: 'ほんらいむいちもつ', meaning: '人間は本来一物も有しない。執着心を捨ててしまうと、本来無一物が無一物中無尽蔵であることに気づくこと。', season: 'yearRound', length: 5 },
    { kanji: '無事是貴人', reading: 'ぶじこれきにん', meaning: '仏の道を歩み、悟りを得るというのは、何もしないということ。', season: 'yearRound', length: 5 },
    { kanji: '啐啄同時', reading: 'そったくどうじ', meaning: '「啐」はひな鳥が内側から殻をつつくこと。「啄」は親鳥が外から殻をつつくこと。', season: 'yearRound', length: 4 },
    { kanji: '主客一体', reading: 'しゅかくいったい', meaning: '亭主と客が一つになること。', season: 'yearRound', length: 4 },
    { kanji: '一座建立', reading: 'いちざこんりゅう', meaning: '一つの茶席を全員で作り上げること。', season: 'yearRound', length: 4 },
    { kanji: '直心是道場', reading: 'じきしんこれどうじょう', meaning: '直心とは自分のありのままの心を指し、これこそが道場であり、いたるところが修行の場所となる意味。', season: 'yearRound', length: 5 }
  ];

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
        </div>
      </footer>
    </div>
  );
};

export default Zengo;