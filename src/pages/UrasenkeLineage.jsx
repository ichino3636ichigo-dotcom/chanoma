import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// 裏千家 歴代家元の家系図
// relation: 前の代とのつながり（kind が 'child' なら実線、'adopted' なら点線で描く）
// 文章を直したいときは、この下の LINEAGE と TEXT の中だけ書き換えればOK
// ─────────────────────────────────────────────────────────────
const LINEAGE = [
  {
    gen: 1,
    sai: { ja: '抛筌斎', en: 'Hōsensai' },
    saiYomi: 'ほうせんさい',
    name: { ja: '千利休（宗易）', en: 'Sen no Rikyū (Sōeki)' },
    nameYomi: 'せんのりきゅう（そうえき）',
    years: '1522–1591',
    desc: {
      ja: '侘び茶を大成し「茶聖」と呼ばれる。簡素な道具と小さな茶室で、主客が心を通わせる茶の湯を確立した。その美意識は今も茶道の根本となっている。',
      en: 'Perfected wabi-cha and is revered as the "sage of tea." With simple utensils and small tea rooms, he established a way of tea in which host and guest meet heart to heart.',
    },
  },
  {
    gen: 2,
    sai: { ja: '少庵', en: 'Shōan' },
    saiYomi: 'しょうあん',
    name: { ja: '少庵宗淳', en: 'Shōan Sōjun' },
    nameYomi: 'しょうあんそうじゅん',
    years: '1546–1614',
    relation: {
      kind: 'adopted',
      ja: '養子・娘婿（利休の後妻 宗恩の連れ子）',
      en: 'Adopted son and son-in-law (stepson through Rikyū’s second wife, Sōon)',
    },
    desc: {
      ja: '利休の後妻 宗恩の連れ子で、利休の娘を妻とした。利休の死後、京都で千家を再び興し、茶の湯を次の代へつないだ。',
      en: 'Stepson of Rikyū who married Rikyū’s daughter. After Rikyū’s death he revived the Sen family in Kyoto and carried the tradition forward.',
    },
  },
  {
    gen: 3,
    sai: { ja: '咄々斎', en: 'Totsutotsusai' },
    saiYomi: 'とつとつさい',
    name: { ja: '元伯宗旦', en: 'Genpaku Sōtan' },
    nameYomi: 'げんぱくそうたん',
    years: '1578–1658',
    relation: { kind: 'child', ja: '少庵の子', en: 'Son of Shōan' },
    desc: {
      ja: '大名に仕えることなく、祖父 利休の侘び茶をさらに突きつめた。晩年に今日庵を建てて隠居。三人の息子がそれぞれ表千家・裏千家・武者小路千家の祖となった。',
      en: 'Never served a lord and pursued his grandfather’s wabi-cha even further. In old age he built Konnichian. Three of his sons founded the three Sen houses.',
    },
    branch: {
      ja: {
        title: '宗旦の息子たちと三千家',
        items: [
          { name: '江岑宗左', note: '表千家 4代' },
          { name: '一翁宗守', note: '武者小路千家 初代' },
          { name: '仙叟宗室', note: '裏千家 4代', main: true },
        ],
      },
      en: {
        title: 'Sōtan’s sons and the three Sen houses',
        items: [
          { name: 'Kōshin Sōsa', note: 'Omotesenke, 4th' },
          { name: 'Ichiō Sōshu', note: 'Mushakōjisenke, 1st' },
          { name: 'Sensō Sōshitsu', note: 'Urasenke, 4th', main: true },
        ],
      },
    },
  },
  {
    gen: 4,
    sai: { ja: '臘月庵', en: 'Rōgetsuan' },
    saiYomi: 'ろうげつあん',
    name: { ja: '仙叟宗室', en: 'Sensō Sōshitsu' },
    nameYomi: 'せんそうそうしつ',
    years: '1622–1697',
    relation: { kind: 'child', ja: '宗旦の四男', en: 'Fourth son of Sōtan' },
    desc: {
      ja: '父 宗旦から今日庵・又隠・寒雲亭を受け継ぎ、裏千家を確立した。加賀の前田家に仕え、地元の職人とともに多くの好み物を生み出した。',
      en: 'Inherited Konnichian, Yūin and Kan’untei from his father and established Urasenke. Served the Maeda lords of Kaga and created many favored utensils with local artisans.',
    },
  },
  {
    gen: 5,
    sai: { ja: '不休斎', en: 'Fukyūsai' },
    saiYomi: 'ふきゅうさい',
    name: { ja: '常叟宗室', en: 'Jōsō Sōshitsu' },
    nameYomi: 'じょうそうそうしつ',
    years: '1673–1704',
    relation: { kind: 'child', ja: '仙叟の長男', en: 'Eldest son of Sensō' },
    desc: {
      ja: '父と同じく加賀の前田家に茶道方として仕え、のちの伊予松山 松平（久松）家への出仕の足がかりを築いた。32歳で早世。',
      en: 'Like his father, served the Maeda as tea master, laying the groundwork for later service to the Matsudaira (Hisamatsu) of Iyo-Matsuyama. Died young at 32.',
    },
  },
  {
    gen: 6,
    sai: { ja: '六閑斎', en: 'Rikkansai' },
    saiYomi: 'りっかんさい',
    name: { ja: '泰叟宗室', en: 'Taisō Sōshitsu' },
    nameYomi: 'たいそうそうしつ',
    years: '1694–1726',
    relation: { kind: 'child', ja: '常叟の長男', en: 'Eldest son of Jōsō' },
    desc: {
      ja: '父の早世により11歳で家を継いだ。表千家6代 覚々斎のもとで茶を学んだ。',
      en: 'Became head at age 11 after his father’s early death, and studied tea under Kakukakusai, the 6th head of Omotesenke.',
    },
  },
  {
    gen: 7,
    sai: { ja: '最々斎', en: 'Saisaisai' },
    saiYomi: 'さいさいさい',
    name: { ja: '竺叟宗室', en: 'Chikusō Sōshitsu' },
    nameYomi: 'ちくそうそうしつ',
    years: '1709–1733',
    relation: {
      kind: 'adopted',
      ja: '養子（表千家6代 覚々斎の次男）',
      en: 'Adopted (second son of Kakukakusai, 6th head of Omotesenke)',
    },
    desc: {
      ja: '表千家から迎えられた養子。大徳寺の僧から「竺叟」の号を授かった。25歳で早世した。',
      en: 'Adopted from Omotesenke. Received the name "Chikusō" from a Daitokuji monk. Died young at 25.',
    },
  },
  {
    gen: 8,
    sai: { ja: '又玄斎', en: 'Yūgensai' },
    saiYomi: 'ゆうげんさい',
    name: { ja: '一燈宗室', en: 'Ittō Sōshitsu' },
    nameYomi: 'いっとうそうしつ',
    years: '1719–1771',
    relation: {
      kind: 'adopted',
      ja: '竺叟の弟（覚々斎の三男）',
      en: 'Younger brother of Chikusō (third son of Kakukakusai)',
    },
    desc: {
      ja: '兄 竺叟の早世を受けて家を継いだ。実の兄である表千家7代 如心斎らとともに、稽古の形式「七事式」を定めた。',
      en: 'Succeeded after his brother’s early death. With his elder brother Joshinsai, 7th head of Omotesenke, he established the Shichijishiki practice forms.',
    },
  },
  {
    gen: 9,
    sai: { ja: '不見斎', en: 'Fukensai' },
    saiYomi: 'ふけんさい',
    name: { ja: '石翁宗室', en: 'Sekiō Sōshitsu' },
    nameYomi: 'せきおうそうしつ',
    years: '1746–1801',
    relation: { kind: 'child', ja: '一燈の長男', en: 'Eldest son of Ittō' },
    desc: {
      ja: '1788年の天明の大火で焼けた家を再建し、又隠を復興した。利休の二百回忌を営んだ。',
      en: 'Rebuilt the house after the Great Tenmei Fire of 1788 and restored Yūin. Held the 200th memorial for Rikyū.',
    },
  },
  {
    gen: 10,
    sai: { ja: '認得斎', en: 'Nintokusai' },
    saiYomi: 'にんとくさい',
    name: { ja: '柏叟宗室', en: 'Hakusō Sōshitsu' },
    nameYomi: 'はくそうそうしつ',
    years: '1770–1826',
    relation: { kind: 'child', ja: '不見斎の長男', en: 'Eldest son of Fukensai' },
    desc: {
      ja: '後妻の松室宗江は、のちに11代となる玄々斎の教育に力を尽くした。',
      en: 'His second wife, Matsumuro Sōkō, devoted herself to educating the future 11th head, Gengensai.',
    },
  },
  {
    gen: 11,
    sai: { ja: '玄々斎', en: 'Gengensai' },
    saiYomi: 'げんげんさい',
    name: { ja: '精中宗室', en: 'Seichū Sōshitsu' },
    nameYomi: 'せいちゅうそうしつ',
    years: '1810–1877',
    relation: {
      kind: 'adopted',
      ja: '婿養子（三河 奥殿藩主 松平乗友の子）',
      en: 'Adopted son-in-law (son of Matsudaira Noritomo, lord of Okutono)',
    },
    desc: {
      ja: '椅子に座って行う立礼式や、茶箱の点前を考案した。明治の初めには『茶道の源意』を政府に提出し、茶道の存続に力を尽くした。',
      en: 'Created the ryūrei table-and-chair style and the chabako procedures. In early Meiji he submitted "Sadō no Gen’i" to the government, working to preserve the way of tea.',
    },
  },
  {
    gen: 12,
    sai: { ja: '又玅斎', en: 'Yūmyōsai' },
    saiYomi: 'ゆうみょうさい',
    name: { ja: '直叟宗室', en: 'Jikisō Sōshitsu' },
    nameYomi: 'じきそうそうしつ',
    years: '1852–1917',
    relation: {
      kind: 'adopted',
      ja: '婿養子（京都の角倉家の出）',
      en: 'Adopted son-in-law (from the Suminokura family of Kyoto)',
    },
    desc: {
      ja: '明治の初めに家を継いだ。妻の猶鹿子は女学校や華族に茶を教え、女性に茶道を広めた。',
      en: 'Became head in early Meiji. His wife Yukako taught tea at girls’ schools and to noble families, spreading tea among women.',
    },
  },
  {
    gen: 13,
    sai: { ja: '圓能斎', en: 'Ennōsai' },
    saiYomi: 'えんのうさい',
    name: { ja: '鉄中宗室', en: 'Tetchū Sōshitsu' },
    nameYomi: 'てっちゅうそうしつ',
    years: '1872–1924',
    relation: { kind: 'child', ja: '又玅斎の長男', en: 'Eldest son of Yūmyōsai' },
    desc: {
      ja: '女学校の授業に茶道を取り入れ、1908年には機関誌『今日庵月報』を創刊した。',
      en: 'Brought tea into girls’ school curricula and in 1908 launched the journal "Konnichian Geppō."',
    },
  },
  {
    gen: 14,
    sai: { ja: '淡々斎', en: 'Tantansai' },
    saiYomi: 'たんたんさい',
    name: { ja: '碩叟宗室', en: 'Sekisō Sōshitsu' },
    nameYomi: 'せきそうそうしつ',
    years: '1893–1964',
    relation: { kind: 'child', ja: '圓能斎の長男', en: 'Eldest son of Ennōsai' },
    desc: {
      ja: '1940年に茶道裏千家淡交会を結成し、全国に組織を広げた。学校での茶道や海外への普及も進めた。',
      en: 'Founded the Urasenke Tankōkai in 1940 and built a nationwide network. Promoted tea in schools and overseas.',
    },
  },
  {
    gen: 15,
    sai: { ja: '鵬雲斎', en: 'Hōunsai' },
    saiYomi: 'ほううんさい',
    name: { ja: '汎叟宗室（千玄室）', en: 'Hansō Sōshitsu (Sen Genshitsu)' },
    nameYomi: 'はんそうそうしつ（せんげんしつ）',
    years: '1923–2025',
    relation: { kind: 'child', ja: '淡々斎の長男', en: 'Eldest son of Tantansai' },
    desc: {
      ja: '1964年に家元を継ぎ、2002年に譲ってからは大宗匠 千玄室として活動。「一盌からピースフルネスを」を掲げ、世界中に茶道を広めた。茶道界で初めて文化勲章を受章。2025年8月、102歳で逝去。',
      en: 'Head from 1964; after 2002 he continued as Daisōshō Sen Genshitsu. Under the motto "Peacefulness through a bowl of tea" he brought tea to the world, and was the first in the tea world to receive the Order of Culture. Died in August 2025 at 102.',
    },
  },
  {
    gen: 16,
    sai: { ja: '坐忘斎', en: 'Zabōsai' },
    saiYomi: 'ざぼうさい',
    name: { ja: '玄黙宗室', en: 'Genmoku Sōshitsu' },
    nameYomi: 'げんもくそうしつ',
    years: '1956–',
    current: true,
    relation: { kind: 'child', ja: '鵬雲斎の長男', en: 'Eldest son of Hōunsai' },
    desc: {
      ja: '2002年に家元を継いだ当代。若い世代の育成や、茶の文化を学問として明らかにする取り組みに力を入れている。',
      en: 'The current head since 2002. Focuses on nurturing young practitioners and on scholarly work on tea culture.',
    },
  },
];

const TEXT = {
  ja: {
    back: 'ホームに戻る',
    title: '裏千家 歴代家元',
    subtitle: '利休から当代まで、十六代の系譜',
    intro: '千利休から始まり、孫の宗旦の代に三つの千家に分かれた茶の湯の家。そのうち裏千家の家元十六代を、親子・養子のつながりとともにたどります。名前をタップすると、それぞれの人物の説明が開きます。',
    legendChild: '実子',
    legendAdopted: '養子・婿養子・兄弟',
    gen: (n) => `${n}代`,
    current: '当代',
    open: '詳しく見る',
    close: '閉じる',
    expandAll: 'すべて開く',
    collapseAll: 'すべて閉じる',
    nextTitle: 'あわせて読む',
    history: '歴史と文化',
    basics: '茶道の基本',
  },
  en: {
    back: 'Back to Home',
    title: 'Urasenke Lineage',
    subtitle: 'Sixteen generations, from Rikyū to today',
    intro: 'The Sen family tradition began with Sen no Rikyū and split into three houses in the time of his grandson Sōtan. Follow the sixteen generations of Urasenke heads and how each was connected to the last. Tap a name to read about each person.',
    legendChild: 'Son',
    legendAdopted: 'Adopted / son-in-law / brother',
    gen: (n) => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`,
    current: 'Current head',
    open: 'Read more',
    close: 'Close',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    nextTitle: 'Related pages',
    history: 'History & Culture',
    basics: 'Basics',
  },
};

const UrasenkeLineage = () => {
  const [language, setLanguage] = useState('ja');
  const [open, setOpen] = useState(() => new Set());
  const t = TEXT[language];

  const toggle = (gen) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(gen)) next.delete(gen);
      else next.add(gen);
      return next;
    });
  const allOpen = open.size === LINEAGE.length;
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(LINEAGE.map((p) => p.gen)));

  return (
    <div className="ul-page min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Crimson+Pro:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');
        .ul-page { background: #f8f7f4; color: #1a1a1a; font-family: 'Crimson Pro', 'Noto Serif JP', serif; }
        .ul-display { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; }
        .ul-nav { backdrop-filter: blur(12px); background: rgba(248, 247, 244, 0.88); border-bottom: 1px solid rgba(127, 166, 127, 0.25); }
        .ul-soft { color: rgba(26, 26, 26, 0.68); }
        .ul-faint { color: rgba(26, 26, 26, 0.5); }
        .ul-accent { color: #5d7d5d; }
        .ul-select { background: transparent; border: 1px solid #7fa67f; border-radius: 9999px; padding: 0.5rem 1rem; font-size: 0.875rem; cursor: pointer; }

        /* 系譜の縦線：左に代数の丸、その右にカード */
        .ul-tree { --dot: 3rem; }
        @media (min-width: 768px) { .ul-tree { --dot: 3.5rem; } }
        .ul-row, .ul-link { display: grid; grid-template-columns: var(--dot) minmax(0, 1fr); column-gap: 0.75rem; }
        .ul-dot {
          width: var(--dot); height: var(--dot);
          border-radius: 9999px; background: #fff; border: 2px solid #7fa67f;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; color: #5d7d5d; font-size: 0.85rem; line-height: 1;
        }
        .ul-dot.is-current { background: #5d7d5d; color: #fff; border-color: #5d7d5d; }
        .ul-link { min-height: 3rem; }
        .ul-rail { display: flex; flex-direction: column; align-items: center; }
        .ul-line-fill { flex: 1 1 auto; justify-self: auto; }
        .ul-line { justify-self: center; width: 0; border-left: 2px solid #7fa67f; }
        .ul-line.is-adopted { border-left: 2px dashed #d4af37; }
        .ul-rel { align-self: center; font-size: 0.85rem; padding: 0.2rem 0.75rem; border-radius: 9999px; justify-self: start; margin: 0.5rem 0; }
        .ul-rel.is-child { background: rgba(127, 166, 127, 0.14); color: #4d6b4d; }
        .ul-rel.is-adopted { background: rgba(212, 175, 55, 0.16); color: #7a5f10; }

        .ul-card { background: #fff; border: 1px solid rgba(127, 166, 127, 0.25); border-radius: 1.25rem; transition: border-color 0.2s, box-shadow 0.2s; }
        .ul-card:hover { border-color: #7fa67f; box-shadow: 0 6px 24px rgba(127, 166, 127, 0.14); }
        .ul-card.is-current { border: 2px solid #5d7d5d; }
        .ul-card > button { text-align: left; width: 100%; display: block; }
        .ul-badge { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; padding: 0.15rem 0.6rem; border-radius: 9999px; background: #5d7d5d; color: #fff; margin-bottom: 0.4rem; }

        .ul-branch { background: rgba(127, 166, 127, 0.08); border: 1px solid rgba(127, 166, 127, 0.25); border-radius: 1rem; }
        .ul-chip { display: inline-flex; flex-direction: column; padding: 0.5rem 0.9rem; border-radius: 0.8rem; background: #fff; border: 1px solid rgba(127, 166, 127, 0.25); }
        .ul-chip.is-main { border: 2px solid #5d7d5d; }
        .ul-ghost { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border-radius: 9999px; border: 1px solid rgba(127, 166, 127, 0.35); color: #5d7d5d; font-size: 0.9rem; background: #fff; }
        .ul-ghost:hover { border-color: #5d7d5d; }
        .ul-pill { display: inline-flex; padding: 0.85rem 1.8rem; border-radius: 9999px; font-weight: 600; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-40 ul-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="ul-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
              <span className="ul-faint font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="ul-soft flex items-center gap-2" aria-label={t.back}>
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{t.back}</span>
            </Link>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="ul-select">
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-8 px-6 text-center">
        <h1 className="ul-display text-3xl md:text-5xl font-bold mb-3">{t.title}</h1>
        <p className="ul-accent text-lg md:text-xl mb-6">{t.subtitle}</p>
        <p className="ul-soft max-w-2xl mx-auto leading-relaxed text-left md:text-center">{t.intro}</p>
      </header>

      <main className="max-w-3xl mx-auto px-5 md:px-6 pb-24">
        {/* 凡例と一括開閉 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm ul-soft">
            <span className="flex items-center gap-2">
              <span style={{ display: 'inline-block', width: 22, borderTop: '2px solid #7fa67f' }}></span>
              {t.legendChild}
            </span>
            <span className="flex items-center gap-2">
              <span style={{ display: 'inline-block', width: 22, borderTop: '2px dashed #d4af37' }}></span>
              {t.legendAdopted}
            </span>
          </div>
          <button type="button" onClick={toggleAll} className="ul-ghost">
            <ChevronDown size={16} style={{ transform: allOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            {allOpen ? t.collapseAll : t.expandAll}
          </button>
        </div>

        <ol className="ul-tree">
          {LINEAGE.map((p, i) => {
            const nextRelation = LINEAGE[i + 1]?.relation;
            const isOpen = open.has(p.gen);
            const branch = p.branch?.[language];
            const adopted = p.relation?.kind === 'adopted';
            return (
              <li key={p.gen}>
                {/* 前の代とのつながり */}
                {p.relation && (
                  <div className="ul-link">
                    <span className={`ul-line ${adopted ? 'is-adopted' : ''}`}></span>
                    <span className={`ul-rel ${adopted ? 'is-adopted' : 'is-child'}`}>{p.relation[language]}</span>
                  </div>
                )}

                <div className="ul-row">
                  <div className="ul-rail">
                    <div className={`ul-dot ${p.current ? 'is-current' : ''}`}>{t.gen(p.gen)}</div>
                    {nextRelation && (
                      <span className={`ul-line ul-line-fill ${nextRelation.kind === 'adopted' ? 'is-adopted' : ''}`}></span>
                    )}
                  </div>
                  <div className={`ul-card ${p.current ? 'is-current' : ''}`}>
                    <button type="button" onClick={() => toggle(p.gen)} aria-expanded={isOpen} className="p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {p.current && <span className="ul-badge">{t.current}</span>}
                          <p className="ul-display text-2xl md:text-3xl font-bold leading-tight">
                            {p.sai[language]}
                            {language === 'ja' && <span className="ul-faint text-sm font-normal ml-2">{p.saiYomi}</span>}
                          </p>
                          <p className="mt-1">
                            {p.name[language]}
                            <span className="ul-faint text-sm ml-2 whitespace-nowrap">{p.years}</span>
                          </p>
                          {language === 'ja' && <p className="ul-faint text-xs mt-0.5">{p.nameYomi}</p>}
                        </div>
                        <ChevronDown
                          size={20}
                          className="ul-faint flex-shrink-0 mt-2"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                          aria-label={isOpen ? t.close : t.open}
                        />
                      </div>
                      {isOpen && <p className="ul-soft leading-relaxed mt-3">{p.desc[language]}</p>}
                    </button>

                    {/* 宗旦の代：三千家への分かれ */}
                    {branch && (
                      <div className="ul-branch mx-4 md:mx-5 mb-4 md:mb-5 p-4">
                        <p className="ul-accent text-sm font-semibold mb-3">{branch.title}</p>
                        <div className="flex flex-wrap gap-2">
                          {branch.items.map((b) => (
                            <span key={b.name} className={`ul-chip ${b.main ? 'is-main' : ''}`}>
                              <span className="font-semibold">{b.name}</span>
                              <span className={`text-xs ${b.main ? 'ul-accent' : 'ul-faint'}`}>{b.note}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="mt-16 text-center">
          <h2 className="ul-display text-2xl font-bold mb-5">{t.nextTitle}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/history" className="ul-pill" style={{ background: '#5d7d5d', color: '#fff' }}>{t.history}</Link>
            <Link to="/basics" className="ul-pill" style={{ border: '2px solid #7fa67f', color: '#5d7d5d' }}>{t.basics}</Link>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 text-center" style={{ background: '#1a1a1a', color: 'rgba(248,247,244,0.6)' }}>
        <p className="text-sm">© 2026 茶乃間 (Chanoma)</p>
        <p className="text-sm mt-3">
          <Link to="/about" style={{ color: 'inherit' }} className="underline underline-offset-4">{language === 'ja' ? '運営者情報' : 'About'}</Link>
        </p>
      </footer>
    </div>
  );
};

export default UrasenkeLineage;
