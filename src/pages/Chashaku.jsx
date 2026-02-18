import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Chashaku = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedMonth, setSelectedMonth] = useState(1);

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
      title: '茶杓の銘',
      subtitle: '季節を感じる美しい言葉',
      intro: '茶杓には季節や趣向に応じた「銘」がつけられます。茶人の感性や教養が表れる、茶道ならではの美しい文化です。',
      monthNames: ['睦月', '如月', '弥生', '卯月', '皐月', '水無月', '文月', '葉月', '長月', '神無月', '霜月', '師走'],
      months: [
        { // 1月
          month: 1,
          sekki: ['小寒（1/5頃）', '大寒（1/20頃）'],
          shichijunikou: ['芹乃栄（せりすなわちさかう）', '水泉動（しみずあたたかをふくむ）', '雉始雊（きじはじめてなく）', '款冬華（ふきのはなさく）', '水沢腹堅（さわみずこおりつめる）', '鶏始乳（にわとりはじめてとやにつく）'],
          mei: [
            { name: '初音', reading: 'はつね', meaning: '新年に初めて聞く鶯の鳴き声', notes: '春の訪れを告げる喜び' },
            { name: '松風', reading: 'まつかぜ', meaning: '松の枝を吹く風の音', notes: '格調高い正月の銘' },
            { name: '若水', reading: 'わかみず', meaning: '元日の朝に汲む水', notes: '一年の無病息災を願う' },
            { name: '福寿', reading: 'ふくじゅ', meaning: '幸福と長寿', notes: '新年の祝いにふさわしい' },
            { name: '千代の春', reading: 'ちよのはる', meaning: '永遠に続く春', notes: '繁栄を願う縁起の良い銘' },
            { name: '寿老', reading: 'じゅろう', meaning: '長寿の神', notes: '七福神の一柱' },
            { name: '玉兎', reading: 'ぎょくと', meaning: '月の兎', notes: '餅をつく兎の伝説' }
          ]
        },
        { // 2月
          month: 2,
          sekki: ['立春（2/4頃）', '雨水（2/19頃）'],
          shichijunikou: ['東風解凍（はるかぜこおりをとく）', '黄鶯睍睆（うぐいすなく）', '魚上氷（うおこおりをいずる）', '土脉潤起（つちのしょううるおいおこる）', '霞始靆（かすみはじめてたなびく）', '草木萌動（そうもくめばえいずる）'],
          mei: [
            { name: '春近し', reading: 'はるちかし', meaning: '春の訪れが近いこと', notes: '寒さの中に春を感じる' },
            { name: '梅が香', reading: 'うめがか', meaning: '梅の花の香り', notes: '春を告げる芳香' },
            { name: '淡雪', reading: 'あわゆき', meaning: 'すぐに解ける薄い雪', notes: '儚い美しさ' },
            { name: '東風', reading: 'こち', meaning: '春に吹く東からの風', notes: '暖かい風の訪れ' },
            { name: '残雪', reading: 'ざんせつ', meaning: '春になっても残る雪', notes: '冬の名残' },
            { name: '鶯', reading: 'うぐいす', meaning: '春を告げる鳥', notes: '美しい鳴き声' },
            { name: '黄梅', reading: 'おうばい', meaning: '黄色い梅の花', notes: '早春の花' }
          ]
        },
        { // 3月
          month: 3,
          sekki: ['啓蟄（3/6頃）', '春分（3/21頃）'],
          shichijunikou: ['蟄虫啓戸（すごもりむしとをひらく）', '桃始笑（ももはじめてさく）', '菜虫化蝶（なむしちょうとなる）', '雀始巣（すずめはじめてすくう）', '桜始開（さくらはじめてひらく）', '雷乃発声（かみなりすなわちこえをはっす）'],
          mei: [
            { name: '春霞', reading: 'はるがすみ', meaning: '春にかかる霞', notes: 'おぼろげな春の景色' },
            { name: '桃の花', reading: 'もものはな', meaning: '桃の節句の花', notes: '雛祭りに因んで' },
            { name: '春風', reading: 'はるかぜ', meaning: '春に吹く暖かい風', notes: '穏やかな気候' },
            { name: '陽炎', reading: 'かげろう', meaning: '春の暖かさで揺らぐ空気', notes: '春の日差し' },
            { name: '雲雀', reading: 'ひばり', meaning: '春の野を舞う鳥', notes: '高く舞い上がる' },
            { name: '若草', reading: 'わかくさ', meaning: '春に芽吹く草', notes: '新緑の季節' },
            { name: '初花', reading: 'はつはな', meaning: 'その年初めて咲く花', notes: '春の喜び' }
          ]
        },
        { // 4月
          month: 4,
          sekki: ['清明（4/5頃）', '穀雨（4/20頃）'],
          shichijunikou: ['玄鳥至（つばめきたる）', '鴻雁北（こうがんかえる）', '虹始見（にじはじめてあらわる）', '葭始生（あしはじめてしょうず）', '霜止出苗（しもやみてなえいずる）', '牡丹華（ぼたんはなさく）'],
          mei: [
            { name: '花盛り', reading: 'はなざかり', meaning: '桜が満開の様子', notes: '春の最盛期' },
            { name: '花筏', reading: 'はないかだ', meaning: '散った花びらが川に浮かぶ様', notes: '風流な景色' },
            { name: '春の夜', reading: 'はるのよ', meaning: '春の宵', notes: '朧月夜の趣' },
            { name: '朧月', reading: 'おぼろづき', meaning: '霞んで見える春の月', notes: 'ぼんやりとした美しさ' },
            { name: '山吹', reading: 'やまぶき', meaning: '鮮やかな黄色の花', notes: '春の花' },
            { name: '春雨', reading: 'はるさめ', meaning: '春に降る細かい雨', notes: '優しい雨' },
            { name: '躑躅', reading: 'つつじ', meaning: '春の花木', notes: '鮮やかな色' }
          ]
        },
        { // 5月
          month: 5,
          sekki: ['立夏（5/6頃）', '小満（5/21頃）'],
          shichijunikou: ['蛙始鳴（かわずはじめてなく）', '蚯蚓出（みみずいずる）', '竹笋生（たけのこしょうず）', '蚕起食桑（かいこおきてくわをはむ）', '紅花栄（べにばなさかう）', '麦秋至（むぎのときいたる）'],
          mei: [
            { name: '薫風', reading: 'くんぷう', meaning: '新緑の香りを運ぶ風', notes: '初夏の爽やかさ' },
            { name: '若葉', reading: 'わかば', meaning: '新しく出た緑の葉', notes: '生命力を感じる' },
            { name: '卯の花', reading: 'うのはな', meaning: '卯月に咲く白い花', notes: '清楚な美しさ' },
            { name: '五月雨', reading: 'さみだれ', meaning: '梅雨の雨', notes: '静かに降る雨' },
            { name: '郭公', reading: 'ほととぎす', meaning: '初夏を告げる鳥', notes: '特徴的な鳴き声' },
            { name: '菖蒲', reading: 'あやめ', meaning: '端午の節句の花', notes: '凛とした姿' },
            { name: '新樹', reading: 'しんじゅ', meaning: '新しく茂った木々', notes: '若々しい緑' }
          ]
        },
        { // 6月
          month: 6,
          sekki: ['芒種（6/6頃）', '夏至（6/21頃）'],
          shichijunikou: ['螳螂生（かまきりしょうず）', '腐草為螢（くされたるくさほたるとなる）', '梅子黄（うめのみきばむ）', '乃東枯（なつかれくさかるる）', '菖蒲華（あやめはなさく）', '半夏生（はんげしょうず）'],
          mei: [
            { name: '清流', reading: 'せいりゅう', meaning: '清らかな流れ', notes: '涼しさを感じる' },
            { name: '紫陽花', reading: 'あじさい', meaning: '梅雨時に咲く花', notes: '雨に映える美しさ' },
            { name: '蛍', reading: 'ほたる', meaning: '夏の夜に光る虫', notes: '幻想的な光' },
            { name: '青嵐', reading: 'あおあらし', meaning: '青葉を吹く強い風', notes: '初夏の力強さ' },
            { name: '滴翠', reading: 'てきすい', meaning: '滴るような緑', notes: '生き生きとした様子' },
            { name: '夏雲', reading: 'なつぐも', meaning: '夏の空に浮かぶ雲', notes: '夏らしい景色' },
            { name: '青葉', reading: 'あおば', meaning: '青々とした葉', notes: '瑞々しさ' }
          ]
        },
        { // 7月
          month: 7,
          sekki: ['小暑（7/7頃）', '大暑（7/23頃）'],
          shichijunikou: ['温風至（あつかぜいたる）', '蓮始開（はすはじめてひらく）', '鷹乃学習（たかすなわちわざをならう）', '桐始結花（きりはじめてはなをむすぶ）', '土潤溽暑（つちうるおうてむしあつし）', '大雨時行（たいうときどきふる）'],
          mei: [
            { name: '天の川', reading: 'あまのがわ', meaning: '七夕の夜空', notes: '織姫と彦星の伝説' },
            { name: '涼風', reading: 'りょうふう', meaning: '涼しい風', notes: '暑さの中の心地よさ' },
            { name: '夕立', reading: 'ゆうだち', meaning: '夏の夕方の雨', notes: '激しいが短い' },
            { name: '星祭', reading: 'ほしまつり', meaning: '七夕の別称', notes: '星に願いを' },
            { name: '笹の葉', reading: 'ささのは', meaning: '七夕の飾り', notes: '短冊を結ぶ' },
            { name: '蝉時雨', reading: 'せみしぐれ', meaning: '蝉の鳴き声', notes: '夏の風物詩' },
            { name: '朝顔', reading: 'あさがお', meaning: '夏の朝に咲く花', notes: '爽やかな朝' }
          ]
        },
        { // 8月
          month: 8,
          sekki: ['立秋（8/8頃）', '処暑（8/23頃）'],
          shichijunikou: ['涼風至（すずかぜいたる）', '寒蝉鳴（ひぐらしなく）', '蒙霧升降（ふかききりまとう）', '綿柎開（わたのはなしべひらく）', '天地始粛（てんちはじめてさむし）', '禾乃登（こくものすなわちみのる）'],
          mei: [
            { name: '残暑', reading: 'ざんしょ', meaning: '秋になっても残る暑さ', notes: '夏の名残' },
            { name: '秋近し', reading: 'あきちかし', meaning: '秋の訪れが近いこと', notes: '季節の変わり目' },
            { name: '秋風', reading: 'あきかぜ', meaning: '秋の涼しい風', notes: '爽やかな風' },
            { name: '夕涼み', reading: 'ゆうすずみ', meaning: '夕方の涼しさを楽しむ', notes: '暑さの和らぎ' },
            { name: '月', reading: 'つき', meaning: '秋の月', notes: '月見の季節' },
            { name: '秋の声', reading: 'あきのこえ', meaning: '秋を感じさせる音', notes: '虫の音など' },
            { name: '萩', reading: 'はぎ', meaning: '秋の七草の一つ', notes: '可憐な花' }
          ]
        },
        { // 9月
          month: 9,
          sekki: ['白露（9/8頃）', '秋分（9/23頃）'],
          shichijunikou: ['草露白（くさのつゆしろし）', '鶺鴒鳴（せきれいなく）', '玄鳥去（つばめさる）', '雷乃収声（かみなりすなわちこえをおさむ）', '蟄虫坏戸（むしかくれてとをふさぐ）', '水始涸（みずはじめてかる）'],
          mei: [
            { name: '名月', reading: 'めいげつ', meaning: '十五夜の美しい月', notes: '月見の宴' },
            { name: '秋草', reading: 'あきくさ', meaning: '秋の野に咲く草花', notes: '風情ある景色' },
            { name: '露', reading: 'つゆ', meaning: '秋の朝の露', notes: '冷え込む朝' },
            { name: '虫の音', reading: 'むしのね', meaning: '秋の虫の鳴き声', notes: '風流な音色' },
            { name: '桔梗', reading: 'ききょう', meaning: '秋の七草', notes: '清楚な紫の花' },
            { name: '彼岸花', reading: 'ひがんばな', meaning: '秋のお彼岸に咲く花', notes: '鮮やかな赤' },
            { name: '秋桜', reading: 'こすもす', meaning: 'コスモスの花', notes: '秋を彩る' }
          ]
        },
        { // 10月
          month: 10,
          sekki: ['寒露（10/8頃）', '霜降（10/23頃）'],
          shichijunikou: ['鴻雁来（こうがんきたる）', '菊花開（きくのはなひらく）', '蟋蟀在戸（きりぎりすとにあり）', '霜始降（しもはじめてふる）', '霎時施（こさめときどきふる）', '楓蔦黄（もみじつたきばむ）'],
          mei: [
            { name: '紅葉', reading: 'もみじ', meaning: '秋に色づく葉', notes: '美しい秋の景色' },
            { name: '菊', reading: 'きく', meaning: '秋を代表する花', notes: '気品ある花' },
            { name: '秋深し', reading: 'あきふかし', meaning: '秋が深まること', notes: '季節の移ろい' },
            { name: '時雨', reading: 'しぐれ', meaning: '秋から冬の通り雨', notes: '物寂しさ' },
            { name: '錦秋', reading: 'きんしゅう', meaning: '錦のように美しい秋', notes: '色鮮やかな紅葉' },
            { name: '霧', reading: 'きり', meaning: '秋の朝の霧', notes: '幻想的な景色' },
            { name: '木の実', reading: 'このみ', meaning: '秋に実る果実', notes: '豊かな実り' }
          ]
        },
        { // 11月
          month: 11,
          sekki: ['立冬（11/7頃）', '小雪（11/22頃）'],
          shichijunikou: ['山茶始開（つばきはじめてひらく）', '地始凍（ちはじめてこおる）', '金盞香（きんせんかさく）', '虹蔵不見（にじかくれてみえず）', '朔風払葉（きたかぜこのはをはらう）', '橘始黄（たちばなはじめてきばむ）'],
          mei: [
            { name: '初冬', reading: 'しょとう', meaning: '冬の始まり', notes: '寒さの訪れ' },
            { name: '木枯らし', reading: 'こがらし', meaning: '冬の冷たい風', notes: '葉を落とす風' },
            { name: '落葉', reading: 'らくよう', meaning: '木から葉が落ちること', notes: '冬支度' },
            { name: '初霜', reading: 'はつしも', meaning: 'その年初めての霜', notes: '寒さの証' },
            { name: '山茶花', reading: 'さざんか', meaning: '初冬に咲く花', notes: '寒さに強い' },
            { name: '枯野', reading: 'かれの', meaning: '草木が枯れた野', notes: '寂しい景色' },
            { name: '冬近し', reading: 'ふゆちかし', meaning: '冬が近づくこと', notes: '季節の変わり目' }
          ]
        },
        { // 12月
          month: 12,
          sekki: ['大雪（12/7頃）', '冬至（12/22頃）'],
          shichijunikou: ['閉塞成冬（そらさむくふゆとなる）', '熊蟄穴（くまあなにこもる）', '鱖魚群（さけのうおむらがる）', '乃東生（なつかれくさしょうず）', '麋角解（さわしかつのおつる）', '雪下出麦（ゆきわたりてむぎのびる）'],
          mei: [
            { name: '歳末', reading: 'さいまつ', meaning: '年の暮れ', notes: '一年の終わり' },
            { name: '初雪', reading: 'はつゆき', meaning: 'その年初めて降る雪', notes: '冬の訪れ' },
            { name: '寒月', reading: 'かんげつ', meaning: '冬の冷たい月', notes: '凛とした美しさ' },
            { name: '柚子', reading: 'ゆず', meaning: '冬至の風呂に入れる果実', notes: '香り高い' },
            { name: '冬至', reading: 'とうじ', meaning: '一年で昼が最も短い日', notes: '節目の日' },
            { name: '雪化粧', reading: 'ゆきげしょう', meaning: '雪で覆われた景色', notes: '白く美しい' },
            { name: '師走', reading: 'しわす', meaning: '12月の別称', notes: '忙しい年末' }
          ]
        }
      ]
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
          <div className="content-card p-10 rounded-3xl mb-12">
            <div className="flex-1">
              <h2 className="font-display text-5xl font-bold mb-6">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMonth.mei.map((mei, index) => (
              <div key={index} className="content-card p-6 rounded-2xl hover:scale-105 transition-transform">
                <div className="border-l-4 border-matcha pl-4 mb-4">
                  <h3 className="font-display text-3xl font-bold text-ink mb-1">
                    {mei.name}
                  </h3>
                  <p className="text-sm text-matcha font-medium">{mei.reading}</p>
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
        </div>
      </footer>
    </div>
  );
};

export default Chashaku;