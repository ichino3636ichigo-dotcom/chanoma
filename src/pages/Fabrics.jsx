import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, X, Check } from 'lucide-react';
 
const Fabrics = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    origin: [],
    use: []
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const sectionsRef = {
    donsu: useRef(null),
    kinran: useRef(null),
    kando: useRef(null),
    sarasa: useRef(null),
    nishiki: useRef(null),
    fuutsu: useRef(null),
    other: useRef(null)
  };
 
  const Logo = () => (
    <Link to="/" className="flex items-center gap-3">
      <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
        <span className="text-ink/50 font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
      </div>
    </Link>
  );
 
  const scrollToSection = (sectionKey) => {
    sectionsRef[sectionKey]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
 
  const sectionColors = {
    donsu: '#7fa67f',    // 抹茶
    kinran: '#d4af37',   // 金色
    kando: '#99b899',    // 明るい抹茶
    sarasa: '#6b9b8f',   // 青緑抹茶
    nishiki: '#b3ccb3',  // 淡い抹茶
    fuutsu: '#8fa68f',   // ミント抹茶
    other: '#5d7d5d'     // 濃い抹茶
  };
 
  const content = {
    ja: {
      title: '裂地図鑑',
      subtitle: '名物裂の世界',
      intro: '茶道具の仕覆や表装裂として珍重されてきた名物裂。中国、インド、ペルシャから渡来した美しい染織品の数々をご紹介します。',
      searchPlaceholder: '裂地を検索...',
      filters: '絞り込み',
      clearFilters: 'クリア',
      specialSection: '三大名物金襴',
      specialIntro: '茶道において最も格が高く珍重される三つの金襴',
      sections: {
        donsu: '緞子（どんす）',
        kinran: '金襴（きんらん）',
        kando: '間道（かんとう）',
        sarasa: '更紗（さらさ）',
        nishiki: '錦（にしき）',
        fuutsu: '風通（ふうつう）',
        other: 'その他'
      },
      filterCategories: {
        type: '種類',
        origin: '産地',
        use: '用途'
      },
      fabricList: {
        special: [
          {
            id: 'kofukuji',
            name: '興福寺金襴',
            reading: 'こうふくじきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['金襴', '中国', '表装', '名物裂', '古金襴'],
            description: '興福寺の帳として使われたと伝わる最高峰の金襴。',
            details: '興福寺に伝わる帳として使用されていたとされる名品。金糸による華麗な文様が特徴で、三大名物金襴の筆頭として最も格が高い。明代に中国で織られたものとされ、表装裂として珍重されます。'
          },
          {
            id: 'daito',
            name: '大燈金襴',
            reading: 'だいとうきんらん',
            type: '金襴',
            origin: '中国',
            period: '鎌倉時代',
            use: ['袈裟裂', '表装'],
            tags: ['金襴', '中国', '袈裟裂', '霊芝雲文', '名物裂'],
            description: '大燈国師の袈裟裂と伝えられる格調高い金襴。',
            details: '鎌倉時代の禅僧・大燈国師（宗峰妙超）の袈裟裂に由来するとされます。霊芝雲文（上下に爪を配した瑞雲）が特徴的で、金糸による繊細な織りが美しい名品です。'
          },
          {
            id: 'futarishizuka',
            name: '二人静金襴',
            reading: 'ふたりしずかきんらん',
            type: '金襴',
            origin: '中国',
            period: '室町時代',
            use: ['装束裂', '表装'],
            tags: ['金襴', '中国', '装束裂', '足利義政', '名物裂'],
            description: '足利義政が「二人静」を舞った装束の裂と伝わる。',
            details: '足利義政が能「二人静」を舞った際の装束裂と伝えられます。華やかで優美な金襴で、室町時代の美意識を体現する名品として知られています。'
          }
        ],
        donsu: [
          {
            id: 'juko_donsu',
            name: '珠光緞子',
            reading: 'じゅこうどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆', '古帛紗'],
            tags: ['緞子', '中国', '仕覆', '村田珠光', '三本爪龍', '名物裂'],
            description: '村田珠光好みの緞子。三本爪の龍と唐草文が特徴。',
            details: 'わび茶の祖・村田珠光が好んだとされる緞子。三本の指（爪）を持つ龍と唐草文様が織り出されており、茶道を学ぶ人なら一つは持っておきたい代表的な名物裂です。柔らかな地合いが仕覆に最適。'
          },
          {
            id: 'jooh_donsu',
            name: '紹鴎緞子',
            reading: 'じょうおうどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '武野紹鴎', '名物裂'],
            description: '武野紹鴎好みの緞子。格調高い風格。',
            details: '武野紹鴎が愛用したとされる緞子。珠光から利休へと続く茶の湯の系譜の中で重要な位置を占める名物裂です。'
          },
          {
            id: 'rikyu_donsu',
            name: '利休緞子',
            reading: 'りきゅうどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆', '袱紗'],
            tags: ['緞子', '中国', '仕覆', '千利休', '侘び', '名物裂'],
            description: '千利休好みの緞子。侘びた風情が特徴。',
            details: '千利休が好んだとされる緞子。派手さを抑えた落ち着いた色合いと文様が、利休の侘び茶の精神を体現しています。'
          },
          {
            id: 'enshu_donsu',
            name: '遠州緞子',
            reading: 'えんしゅうどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆', '古帛紗'],
            tags: ['緞子', '中国', '仕覆', '小堀遠州', '七宝文', '牡丹', '名物裂'],
            description: '小堀遠州好みの緞子。最も著名な名物裂の一つ。',
            details: '小堀遠州が好んだ名物裂の中で最も著名なもの。白地と縹地で大石畳文を織り出し、白の唐花文と縹地の輪違い七宝文を配しています。花色に近い薄い縹の地合いは「清」と「寂」そして「知性」を思わせます。'
          },
          {
            id: 'shoboji_donsu',
            name: '正法寺緞子',
            reading: 'しょうぼうじどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '名物裂'],
            description: '正法寺に伝わる格式高い緞子。',
            details: '正法寺に伝来したとされる緞子。落ち着いた風格があり、茶入の仕覆として珍重されます。'
          },
          {
            id: 'teika_donsu',
            name: '定家緞子',
            reading: 'ていかどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆', '表装'],
            tags: ['緞子', '中国', '仕覆', '表装', '名物裂'],
            description: '藤原定家にちなむ優美な緞子。',
            details: '藤原定家にちなんで名付けられたとされる緞子。優美な文様が特徴で、仕覆や表装裂として広く用いられます。'
          },
          {
            id: 'rinchigai_donsu',
            name: '輪違緞子',
            reading: 'りんちがいどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '輪違い文', '七宝', '名物裂'],
            description: '輪違い七宝文が美しい緞子。',
            details: '輪違い七宝文様が織り出された緞子。七宝は吉祥を表す文様で、格調高い印象を与えます。'
          },
          {
            id: 'fujidane_donsu',
            name: '藤種緞子',
            reading: 'ふじだねどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '名物裂'],
            description: '藤の種を模した文様の緞子。',
            details: '藤の種をモチーフにした文様が特徴的な緞子。自然の造形美を取り入れた優雅な裂です。'
          },
          {
            id: 'ume_donsu',
            name: '梅緞子',
            reading: 'うめどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '梅文', '名物裂'],
            description: '梅の文様が織り出された緞子。',
            details: '梅の花や枝を文様化した緞子。春の訪れを告げる梅は、茶の湯でも好まれる吉祥文様です。'
          },
          {
            id: 'rikyu_ume_donsu',
            name: '利休梅緞子',
            reading: 'りきゅううめどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '千利休', '梅文', '名物裂'],
            description: '利休好みの梅文様緞子。',
            details: '千利休が好んだとされる梅文様の緞子。侘びた風情の中にも華やかさを併せ持ちます。'
          },
          {
            id: 'mandaiya_donsu',
            name: '万代屋緞子',
            reading: 'まんだいやどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '名物裂'],
            description: '万代屋に伝わる格式ある緞子。',
            details: '京都の豪商・万代屋に伝来したとされる緞子。商家に伝わる名物裂として知られています。'
          },
          {
            id: 'mikumoya_donsu',
            name: '三雲屋緞子',
            reading: 'みくもやどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '名物裂'],
            description: '三雲屋に伝わる優美な緞子。',
            details: '三雲屋に伝来したとされる緞子。優美な文様と柔らかな地合いが特徴です。'
          },
          {
            id: 'araiso_donsu',
            name: '荒磯緞子',
            reading: 'あらいそどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆', '古帛紗'],
            tags: ['緞子', '中国', '仕覆', '波文', '名物裂'],
            description: '荒波を表した力強い緞子。',
            details: '荒波を表現した力強い文様が特徴。海の波濤を思わせる動的な表現が見事です。'
          },
          {
            id: 'uraku_donsu',
            name: '有楽緞子',
            reading: 'うらくどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '織田有楽斎', '名物裂'],
            description: '織田有楽斎好みの緞子。',
            details: '織田有楽斎が好んだとされる緞子。有楽斎は織田信長の弟で、茶人として知られました。'
          },
          {
            id: 'sasazuru_donsu',
            name: '笹蔓緞子',
            reading: 'ささづるどんす',
            type: '緞子',
            origin: '中国',
            period: '明代（古渡）',
            use: ['仕覆', '古帛紗'],
            tags: ['緞子', '中国', '仕覆', '笹文', '蔓草', '名物裂'],
            description: '笹と蔓草の文様。古渡として名高い。',
            details: '笹と蔓草を組み合わせた文様が特徴。古渡の名品として古くから珍重され、柔らかな地合いと優美な文様が魅力です。'
          },
          {
            id: 'hakugyoku_donsu',
            name: '白極緞子',
            reading: 'はくぎょくどんす',
            type: '緞子',
            origin: '中国',
            period: '明代（古渡）',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '白地', '名物裂'],
            description: '白地の上品な緞子。古渡の名品。',
            details: '白を基調とした上品な緞子。古渡として名高く、清楚で格調高い印象を与えます。'
          },
          {
            id: 'botan_donsu',
            name: '牡丹緞子',
            reading: 'ぼたんどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆', '表装'],
            tags: ['緞子', '中国', '仕覆', '牡丹文', '富貴', '名物裂'],
            description: '牡丹文様の華やかな緞子。',
            details: '牡丹は富貴を象徴する吉祥文様。大輪の牡丹が織り出された華麗な緞子で、格の高い道具の仕覆に用いられます。'
          },
          {
            id: 'boyo_donsu',
            name: '亡羊緞子',
            reading: 'ぼうようどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '名物裂'],
            description: '独特の文様を持つ緞子。',
            details: '「亡羊」という独特の名を持つ緞子。名称の由来には諸説ありますが、格調高い文様が特徴です。'
          },
          {
            id: 'manji_donsu',
            name: '卍字緞子',
            reading: 'まんじどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '卍文', '仏教文様', '名物裂'],
            description: '卍文様が織り込まれた緞子。',
            details: '仏教の吉祥文様である卍字を織り込んだ緞子。連続する卍文が格式高い印象を与えます。'
          },
          {
            id: 'kikko_ryu_donsu',
            name: '亀甲龍紋緞子',
            reading: 'きっこうりゅうもんどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '亀甲文', '龍文', '吉祥', '名物裂'],
            description: '亀甲と龍の文様。吉祥の組み合わせ。',
            details: '長寿を表す亀甲文と、権威と吉祥を象徴する龍文を組み合わせた格調高い緞子です。'
          },
          {
            id: 'toridatsuki_donsu',
            name: '鳥襷緞子',
            reading: 'とりだすきどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '鳥文', '名物裂'],
            description: '鳥と襷文様の優美な緞子。',
            details: '鳥と襷（たすき）を組み合わせた文様が特徴。優美で動きのある表現が魅力です。'
          },
          {
            id: 'edaume_ryusui_donsu',
            name: '枝梅流水紋緞子',
            reading: 'えだうめりゅうすいもんどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '梅文', '流水', '名物裂'],
            description: '梅の枝と流水を表した緞子。',
            details: '梅の枝と流れる水を組み合わせた風雅な文様。春の訪れと水の流れという自然の美を表現しています。'
          },
          {
            id: 'hosomaru_ryu_toridatsuki_donsu',
            name: '細丸竜鳥襷緞子',
            reading: 'ほそまるりゅうとりだすきどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '龍文', '鳥文', '名物裂'],
            description: '竜と鳥襷の複雑な文様を持つ緞子。',
            details: '細丸の中に竜と鳥襷文様を織り込んだ技巧的な緞子。複雑な文様構成が見事です。'
          },
          {
            id: 'manjiiri_ryumon_donsu',
            name: '卍入竜文緞子',
            reading: 'まんじいりりゅうもんどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '卍文', '龍文', '名物裂'],
            description: '卍文と竜文を組み合わせた格式高い緞子。',
            details: '仏教文様の卍と、権威を象徴する竜文を組み合わせた格調高い緞子です。'
          },
          {
            id: 'shibayama_donsu',
            name: '柴山緞子',
            reading: 'しばやまどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '名物裂'],
            description: '柴山に伝わる緞子。',
            details: '柴山家に伝来したとされる緞子。落ち着いた風格が特徴です。'
          },
          {
            id: 'tsurukameshika_donsu',
            name: '鶴亀鹿文緞子',
            reading: 'つるかめしかもんどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '鶴', '亀', '鹿', '吉祥', '名物裂'],
            description: '鶴・亀・鹿の三吉祥を表した緞子。',
            details: '鶴（長寿）、亀（長寿）、鹿（禄）の三つの吉祥文様を組み合わせた格の高い緞子です。'
          },
          {
            id: 'kakaryu_marubun_donsu',
            name: '唐花龍の丸文緞子',
            reading: 'からはなりゅうのまるもんどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '唐花', '龍文', '名物裂'],
            description: '唐花と龍を丸文に配した緞子。',
            details: '唐花（中国風の花文様）と龍を丸い枠内に配した華麗な緞子。格調高い印象を与えます。'
          },
          {
            id: 'shiki_shippo_donsu',
            name: '四季七宝緞子',
            reading: 'しきしっぽうどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '七宝文', '四季', '名物裂'],
            description: '四季の草花と七宝文を組み合わせた緞子。',
            details: '四季折々の草花と七宝文様を織り込んだ豊かな表現の緞子。季節感と吉祥を併せ持ちます。'
          },
          {
            id: 'hishijimon_maruhana_donsu',
            name: '菱地紋丸花緞子',
            reading: 'ひしじもんまるはなどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '菱文', '花文', '名物裂'],
            description: '菱地紋に丸花文を配した緞子。',
            details: '地に菱文様を敷き、その上に丸い花文様を配した優美な緞子。幾何学文と有機的な花文の調和が美しい。'
          },
          {
            id: 'sokyu_donsu',
            name: '宗及緞子',
            reading: 'そうきゅうどんす',
            type: '緞子',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['緞子', '中国', '仕覆', '津田宗及', '名物裂'],
            description: '津田宗及好みの緞子。',
            details: '天正・慶長期の豪商茶人・津田宗及が好んだとされる緞子。武野紹鴎、千利休と並ぶ茶人の名を冠します。'
          },
          {
            id: 'banreki_donsu',
            name: '万暦緞子',
            reading: 'ばんれきどんす',
            type: '緞子',
            origin: '中国',
            period: '明代（万暦年間）',
            use: ['仕覆', '帛紗挟み'],
            tags: ['緞子', '中国', '仕覆', '万暦', '名物裂'],
            description: '明の万暦年間に作られた緞子。',
            details: '明の万暦帝の時代（1573-1620年）に織られた緞子。この時期の中国染織品は特に精緻で美しいとされます。'
          }
        ],
        kinran: [
          {
            id: 'kodaiji_kinran',
            name: '高台寺金襴',
            reading: 'こうだいじきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['金襴', '中国', '表装', '牡丹唐草', '名物裂'],
            description: '高台寺に伝わる牡丹唐草文様の金襴。',
            details: '京都・高台寺に伝わる金襴。紺地に金糸で牡丹唐草文様を織り出したもので、「紺地牡丹唐草文金襴」が正式名称。唐草文様の金襴には各種のものがあります。'
          },
          {
            id: 'sumikura_kinran',
            name: '角倉金襴',
            reading: 'すみのくらきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '角倉家', '名物裂'],
            description: '京都の豪商・角倉家に伝わる金襴。',
            details: '京都の豪商・角倉家に伝来した金襴。角倉家は大堰川の開削で知られる豪商で、優れた染織品を多数所蔵していました。'
          },
          {
            id: 'hanakirin_kinran',
            name: '花麒麟金襴',
            reading: 'はなきりんきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '麒麟', '花文', '名物裂'],
            description: '麒麟と花文様を組み合わせた華麗な金襴。',
            details: '瑞獣・麒麟と花文様を金糸で織り出した華麗な金襴。麒麟は吉祥を表す想像上の動物です。'
          },
          {
            id: 'ryuzume_kinran',
            name: '竜爪金襴',
            reading: 'りゅうづめきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '龍文', '名物裂'],
            description: '竜の爪を強調した力強い金襴。',
            details: '竜の爪を強調して表現した力強い金襴。竜は権威と吉祥を象徴する文様です。'
          },
          {
            id: 'keito_kinran',
            name: '鶏頭金襴',
            reading: 'けいとうきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '鶏頭', '名物裂'],
            description: '鶏頭の花を表した金襴。',
            details: '鶏頭（ケイトウ）の花を文様化した金襴。秋の草花として茶の湯でも親しまれます。'
          },
          {
            id: 'araiso_kinran',
            name: '荒磯金襴',
            reading: 'あらいそきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['金襴', '中国', '表装', '波文', '名物裂'],
            description: '荒波を金糸で表現した金襴。',
            details: '荒波を金糸で表現した力強い金襴。動的な波の表現が見事です。'
          },
          {
            id: 'reishiun_kinran',
            name: '霊芝雲文金襴',
            reading: 'れいしうんもんきんらん',
            type: '金襴',
            origin: '中国',
            period: '宋〜明代',
            use: ['表装', '袈裟裂'],
            tags: ['金襴', '中国', '表装', '霊芝雲', '東京国立博物館', '名物裂'],
            description: '霊芝雲文様の最高峰の金襴。',
            details: '上下に爪を配した霊芝雲（瑞雲）文様の金襴。東京国立博物館所蔵の名品が特に有名で、宋代から明代にかけて織られた最高級の金襴です。'
          },
          {
            id: 'ninjo_kinran',
            name: '二人静金襴',
            reading: 'にんじょうきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '二人静', '名物裂'],
            description: '二人で静を舞う文様の金襴。',
            details: '能の演目「二人静」にちなんだ文様の金襴。二人の静御前が舞う様子を表現したとされます。'
          },
          {
            id: 'nara_kinran',
            name: '奈良金襴',
            reading: 'ならきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '名物裂'],
            description: '奈良に伝わる格調高い金襴。',
            details: '奈良に伝来したとされる金襴。名称の由来ははっきりしませんが、古くから珍重されてきた名品です。'
          },
          {
            id: 'takano_kinran',
            name: '高野金襴',
            reading: 'こうやきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装', '袈裟裂'],
            tags: ['金襴', '中国', '表装', '高野山', '名物裂'],
            description: '高野山に伝わる金襴。',
            details: '高野山に伝来した金襴。仏教との深い関わりを持つ貴重な裂です。'
          },
          {
            id: 'daikokuya_kinran',
            name: '大黒屋金襴',
            reading: 'だいこくやきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '大黒屋', '蔓牡丹', '宝尽くし', '名物裂'],
            description: '大黒屋に伝わる蔓牡丹文様の金襴。',
            details: '堺の商家・大黒屋、または江戸の町人茶人に由来するとされます。蔓牡丹唐草文様の間に宝尽くし文を散らした華やかな金襴です。'
          },
          {
            id: 'yakegire_kinran',
            name: '焼切金襴',
            reading: 'やけぎれきんらん',
            type: '金襴',
            origin: '不明',
            period: '江戸初期',
            use: ['表装'],
            tags: ['金襴', '南蛮船', '表装', '珍品', '名物裂'],
            description: '焼き討ちされた南蛮船から持ち出された伝説の金襴。',
            details: '寛永17年（1640）に禁制を犯して長崎に入港した南蛮船を焼き討ちした際、船中から持ち出したという伝承を持つ珍しい裂です。'
          },
          {
            id: 'kinshun_kinran',
            name: '金春金襴',
            reading: 'こんぱるきんらん',
            type: '金襴',
            origin: '中国',
            period: '明〜清代',
            use: ['装束裂', '表装'],
            tags: ['金襴', '中国', '装束裂', '金春太夫', '名物裂'],
            description: '能役者・金春太夫が足利義政より拝領した装束裂。',
            details: '能役者の金春太夫が足利義政より拝領した能装束の裂と伝えられますが、実際には桃山末期から江戸初期に中国から渡来した繻子地の金襴。「金入り緞子」とも呼ばれる瀟洒な名物裂です。'
          },
          {
            id: 'edo_wakuda_kinran',
            name: '江戸和久田金襴',
            reading: 'えどわくだきんらん',
            type: '金襴',
            origin: '中国',
            period: '清代初期',
            use: ['表装'],
            tags: ['金襴', '中国', '表装', '和久田', '名物裂'],
            description: '和久田家に伝わる金入り緞子。',
            details: '地合は繻子地で、江戸和久田、金春、高木、四座などと同手の金入り緞子と称される中国清初の織製。抑えられた金色の美しさが特徴です。'
          },
          {
            id: 'hitoezuru_kobotanno_kinran',
            name: '一重蔓小牡丹之金襴',
            reading: 'ひとえづるこぼたんのきんらん',
            type: '金襴',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['金襴', '中国', '表装', '牡丹', '蔓草', '名物裂'],
            description: '一重の蔓草に小さな牡丹を配した金襴。',
            details: '浅黄地に一重の蔓草と小さな牡丹を金糸で織り出した優美な金襴。繊細な表現が特徴です。'
          }
        ],
        kando: [
          {
            id: 'aoki_kando',
            name: '青木間道',
            reading: 'あおきかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '名物裂'],
            description: '青木家に伝わる縞間道。',
            details: '青木家に伝来した縞織物の間道。間道は中国南部で製作された絹の縞織物で、茶の湯で「草」の格付けとされます。'
          },
          {
            id: 'asakura_kando',
            name: '朝倉間道',
            reading: 'あさくらかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '名物裂'],
            description: '朝倉家に伝わる間道。',
            details: '朝倉家に伝来した間道。落ち着いた色合いの縞が特徴です。'
          },
          {
            id: 'amaryu_kando',
            name: '雨龍間道',
            reading: 'あまりゅうかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '龍文', '名物裂'],
            description: '龍文が織り込まれた間道。',
            details: '縞の中に龍文様が織り込まれた珍しい間道。縞と文様の組み合わせが見事です。'
          },
          {
            id: 'funakoshi_kando',
            name: '船越間道',
            reading: 'ふなこしかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '船越', '名物裂'],
            description: '船越に伝わる格調高い間道。',
            details: '肥後国人吉の城主である相良家との関わりがあるという説もあります。縞文だけでなく幾何学文も織り出されています。'
          },
          {
            id: 'hino_kando',
            name: '日野間道',
            reading: 'ひのかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '名物裂'],
            description: '日野家に伝わる間道。',
            details: '日野家に伝来した間道。細縞から派手なものまで数種類あり、それぞれが珍重されます。'
          },
          {
            id: 'mochizuki_kando',
            name: '望月間道',
            reading: 'もちづきかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '名物裂'],
            description: '望月家に伝わる間道。',
            details: '望月家に伝来した間道。縞の配色が美しく、古帛紗などに好んで用いられます。'
          },
          {
            id: 'yazaemon_kando',
            name: '弥左衛門間道',
            reading: 'やざえもんかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '織止', '名物裂'],
            description: '弥左衛門に伝わる織止入りの間道。',
            details: '弥左衛門に伝来した間道。織止（おりどめ）が入っているのが特徴で、日野肩衝・玉津島茶入の仕覆に用いられました。'
          },
          {
            id: 'yoshino_kando',
            name: '吉野間道',
            reading: 'よしのかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '名物裂'],
            description: '吉野に因む格調高い間道。',
            details: '吉野にちなんで名付けられた間道。細縞のものや子持真田入りのものなど、数種類があります。'
          },
          {
            id: 'yoshino_goshiki_kando',
            name: '吉野五色間道',
            reading: 'よしのごしきかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '五色', '名物裂'],
            description: '五色の縞が美しい吉野間道。',
            details: '吉野間道の中でも五色の縞を用いた華やかなもの。色彩の調和が見事です。'
          },
          {
            id: 'rikyu_kando',
            name: '利休間道',
            reading: 'りきゅうかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '千利休', '縞', '名物裂'],
            description: '千利休好みの間道。',
            details: '千利休が好んだとされる間道。侘びた風情の中に洗練された美しさがあります。'
          },
          {
            id: 'kamakura_kando',
            name: '鎌倉間道',
            reading: 'かまくらかんどう',
            type: '間道',
            origin: 'チャンパ',
            period: '17世紀頃',
            use: ['仕覆'],
            tags: ['間道', '東南アジア', '仕覆', '縞', '名物裂'],
            description: '鎌倉に伝わる間道。チャンパから舶載。',
            details: '源頼朝の着衣であったとも、鎌倉建長寺の打敷とも伝えられますが、実際には17世紀頃に占城（チャンパ）あたりから舶載されたもの。色彩の組み合わせと縞の構成が特徴的です。'
          },
          {
            id: 'satsuma_kando',
            name: '薩摩間道',
            reading: 'さつまかんどう',
            type: '間道',
            origin: 'チモールまたはミンダナオ',
            period: '17世紀頃',
            use: ['仕覆'],
            tags: ['間道', '東南アジア', '仕覆', '縞', '幾何学文', '名物裂'],
            description: '薩摩に伝わる幾何学文入りの間道。',
            details: '縞文だけでなく幾何学文様や唐草文も織り出されています。チモールまたはミンダナオから舶載されたと考えられます。'
          },
          {
            id: 'satsuma_kunai_kando',
            name: '薩摩宮内間道',
            reading: 'さつまくないかんどう',
            type: '間道',
            origin: '中国南部',
            period: '明〜清代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '龍文', '唐花', '名物裂'],
            description: '小堀遠州好みの薩摩焼仕覆に用いられた間道。',
            details: '小堀遠州好みの薩摩焼甫十「楽」茶入の仕覆として使われました。茶・紺・白・蘇芳などの細縞と、龍・唐花が織り出された太縞で規則的に構成されています。'
          },
          {
            id: 'jissai_kando',
            name: '十彩間道',
            reading: 'じっさいかんどう',
            type: '間道',
            origin: '東南アジア',
            period: '17世紀頃',
            use: ['仕覆'],
            tags: ['間道', '東南アジア', '仕覆', '縞', '多色', '名物裂'],
            description: '十色の縞が鮮やかな間道。',
            details: '十種類の色を用いた華やかな間道。細い縦縞の美しさと色彩の豊富さが特徴で、縞の一部に真田紐状の浮織が入ったものもあります。'
          },
          {
            id: 'iyosudare_kando',
            name: '伊予簾間道',
            reading: 'いよすだれかんどう',
            type: '間道',
            origin: '中国',
            period: '明代',
            use: ['仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '石畳', '宝尽くし', '名物裂'],
            description: '小堀遠州所持の中興名物茶入の仕覆。',
            details: '名称の由来は小堀遠州が所持した中興名物「伊予簾」茶入の仕覆から。縞には紺、萌黄、白、茶などの色が用いられ、小石畳の地文には宝尽文が織り出されています。'
          },
          {
            id: 'taishibu_kando',
            name: '太子布間道',
            reading: 'たいしぶかんどう',
            type: '錦',
            origin: '中国',
            period: '古代',
            use: ['仕覆', '表装'],
            tags: ['間道', '錦', '中国', '経絣', '聖徳太子', '名物裂'],
            description: '聖徳太子が用いたと伝わる経絣の錦。',
            details: '法隆寺に残る広東錦のこと。経糸をほぼ5色に染め分けた平織の経絣で、「間道」の名がついていますが実際は錦です。聖徳太子が用いたことに由来する説と、茶人の太子屋宗有が愛好したことからの呼称ともいわれます。'
          },
          {
            id: 'tsurugaoka_kando',
            name: '鶴ヶ岡間道',
            reading: 'つるがおかかんどう',
            type: '間道',
            origin: '東南アジア',
            period: '17世紀頃',
            use: ['仕覆'],
            tags: ['間道', '東南アジア', '仕覆', '縞', '名物裂'],
            description: '鶴岡八幡宮に伝わる間道。',
            details: '鶴岡八幡宮に伝わったとされる間道。実際は17世紀頃に東南アジアから舶載されたものと考えられます。'
          },
          {
            id: 'kinshun_kando',
            name: '金春間道',
            reading: 'こんぱるかんどう',
            type: '間道',
            origin: '中国',
            period: '明〜清代',
            use: ['装束裂', '仕覆'],
            tags: ['間道', '中国', '仕覆', '縞', '金春', '名物裂'],
            description: '能役者・金春家に伝わる間道。',
            details: '能役者の金春家に伝来した間道。地合は繻子地で金入りの縞が特徴。太い縞柄の中に抑えられた金色の美しさがあります。'
          }
        ],
        sarasa: [
          {
            id: 'india_sarasa',
            name: 'インド更紗',
            reading: 'いんどさらさ',
            type: '更紗',
            origin: 'インド',
            period: '室町〜江戸時代',
            use: ['仕覆', '袋物'],
            tags: ['更紗', 'インド', '染織', '手描き', '名物裂'],
            description: '更紗の本場・インドで作られた染織品。',
            details: 'インドが起源の、木綿地に多色で文様を染めた布製品。手描きや木版染を併用した古いものが特に珍重されます。えんじ、藍、緑などで花模様を描いたものが多く、古渡りのインド更紗は名物裂として最高の評価を受けます。'
          },
          {
            id: 'java_sarasa',
            name: 'ジャワ更紗',
            reading: 'じゃわさらさ',
            type: '更紗',
            origin: 'ジャワ（インドネシア）',
            period: '室町〜江戸時代',
            use: ['仕覆', '袋物'],
            tags: ['更紗', 'ジャワ', '染織', '蝋纈染', 'バティック', '名物裂'],
            description: 'ジャワ島で作られたバティック（蝋纈染）。',
            details: 'ジャワ更紗は蝋纈染（ろうけつぞめ）で作られ、藍、茶、黄などが用いられます。幾何学的・抽象的な模様が多く、世界的には「バティック」の名で知られています。独特の趣が大名や豪商に珍重されました。'
          },
          {
            id: 'persia_sarasa',
            name: 'ペルシャ更紗',
            reading: 'ぺるしゃさらさ',
            type: '更紗',
            origin: 'ペルシャ（イラン）',
            period: '室町〜江戸時代',
            use: ['仕覆', '袋物'],
            tags: ['更紗', 'ペルシャ', '染織', '名物裂'],
            description: 'ペルシャ（現イラン）で作られた更紗。',
            details: 'ペルシャで製作された更紗も名高く、独特の文様と色彩が特徴。インド更紗とは異なる趣を持ちます。'
          },
          {
            id: 'siam_sarasa',
            name: 'シャム更紗',
            reading: 'しゃむさらさ',
            type: '更紗',
            origin: 'シャム（タイ）',
            period: '江戸時代',
            use: ['仕覆', '袋物'],
            tags: ['更紗', 'シャム', 'タイ', '染織', '名物裂'],
            description: 'シャム（現タイ）で作られた更紗。',
            details: 'タイで製作された更紗。シャム王国時代に日本へもたらされ、独特の文様が珍重されました。'
          },
          {
            id: 'wa_sarasa',
            name: '和更紗',
            reading: 'わさらさ',
            type: '更紗',
            origin: '日本',
            period: '江戸時代',
            use: ['帯', '袋物', '小物'],
            tags: ['更紗', '日本', '染織', '型染', '国産'],
            description: '江戸時代に日本で作られた更紗。',
            details: '江戸中期頃に国内の職人が更紗を模して染織を始めたもの。鍋島更紗、長崎更紗、堺更紗、京更紗などが有名。縮緬や羽二重に染めた和更紗は、結城紬や唐桟木綿に合い、人気がありました。'
          },
          {
            id: 'nabeshima_sarasa',
            name: '鍋島更紗',
            reading: 'なべしまさらさ',
            type: '更紗',
            origin: '日本（佐賀）',
            period: '江戸時代',
            use: ['帯', '袋物'],
            tags: ['更紗', '日本', '佐賀', '鍋島藩', '型染'],
            description: '鍋島藩で作られた和更紗。',
            details: '佐賀の鍋島藩で製作された和更紗。藩の保護のもと、高度な技術で作られました。'
          },
          {
            id: 'nagasaki_sarasa',
            name: '長崎更紗',
            reading: 'ながさきさらさ',
            type: '更紗',
            origin: '日本（長崎）',
            period: '江戸時代',
            use: ['帯', '袋物'],
            tags: ['更紗', '日本', '長崎', '貿易', '型染'],
            description: '貿易港・長崎で作られた和更紗。',
            details: '貿易港として栄えた長崎で、舶来の更紗を参考に製作された和更紗。異国情緒あふれる文様が特徴です。'
          },
          {
            id: 'sakai_sarasa',
            name: '堺更紗',
            reading: 'さかいさらさ',
            type: '更紗',
            origin: '日本（大阪）',
            period: '江戸時代',
            use: ['帯', '袋物'],
            tags: ['更紗', '日本', '堺', '型染'],
            description: '堺で作られた和更紗。',
            details: '商業都市・堺で製作された和更紗。町人文化の中で発展しました。'
          },
          {
            id: 'kyo_sarasa',
            name: '京更紗',
            reading: 'きょうさらさ',
            type: '更紗',
            origin: '日本（京都）',
            period: '江戸時代',
            use: ['帯', '袋物', '装飾'],
            tags: ['更紗', '日本', '京都', '型染', '西陣'],
            description: '京都で作られた洗練された和更紗。',
            details: '京都で製作された和更紗。京都の染織技術の粋を集めた洗練されたデザインが特徴です。'
          },
          {
            id: 'amakusa_sarasa',
            name: '天草更紗',
            reading: 'あまくささらさ',
            type: '更紗',
            origin: '日本（熊本）',
            period: '江戸〜現代',
            use: ['帯', '袋物', '小物'],
            tags: ['更紗', '日本', '熊本', '天草', '伝統工芸'],
            description: '天草で伝統が受け継がれる和更紗。',
            details: '熊本県天草で製作される和更紗。和更紗のうち、今も技術が引き継がれているのは天草更紗が代表的です。'
          },
          {
            id: 'ryukyu_sarasa',
            name: '琉球更紗',
            reading: 'りゅうきゅうさらさ',
            type: '更紗',
            origin: '琉球（沖縄）',
            period: '江戸時代',
            use: ['衣装', '帯', '袋物'],
            tags: ['更紗', '琉球', '沖縄', '染織', '紅型'],
            description: '琉球王国で作られた更紗。紅型との関連も。',
            details: '琉球王国時代に製作された更紗。琉球独自の染織技術である紅型（びんがた）との関連も深く、南国らしい鮮やかな色彩が特徴です。'
          },
          {
            id: 'kinkafu',
            name: '金華布',
            reading: 'きんかふ',
            type: '更紗',
            origin: 'インド',
            period: '室町〜江戸時代',
            use: ['仕覆', '表装'],
            tags: ['更紗', 'インド', '金入り', '仕覆', '名物裂'],
            description: '金糸の入った華やかな更紗。',
            details: '金の入った更紗で、特に珍重されました。古渡りのインド更紗や金華布は名物裂として最高の評価を受けます。'
          },
          {
            id: 'ichigo_gire',
            name: '苺裂',
            reading: 'いちごぎれ',
            type: '更紗',
            origin: 'ペルシャまたは中国南方',
            period: '17世紀',
            use: ['挽家袋'],
            tags: ['更紗', 'ペルシャ', '中国', '花文', '名物裂'],
            description: '丸い花文を苺に見立てた更紗。',
            details: '丸形の花文を苺に見立てたことからこの名があります。挽家袋（茶入を保管する木材容器の袋）などに用いられることが多い裂で、17世紀に中国南方やペルシャ方面で製作されたという説があります。'
          }
        ],
        nishiki: [
          {
            id: 'kanton_nishiki',
            name: '広東錦',
            reading: 'かんとうにしき',
            type: '錦',
            origin: '中国',
            period: '古代',
            use: ['表装', '装飾'],
            tags: ['錦', '中国', '経絣', '五色', '法隆寺'],
            description: '法隆寺に伝わる経絣の錦。太子布とも。',
            details: '経糸をほぼ5色に染め分けた平織の経絣。法隆寺に残る貴重な錦で、「太子布間道」とも呼ばれます。聖徳太子が用いたという伝承があります。'
          },
          {
            id: 'karahana_nishiki',
            name: '唐花錦',
            reading: 'からはなにしき',
            type: '錦',
            origin: '中国',
            period: '唐〜明代',
            use: ['表装', '装飾'],
            tags: ['錦', '中国', '唐花', '表装'],
            description: '唐風の花文様を織り出した錦。',
            details: '中国風の花文様（唐花）を複数の色糸で織り出した錦。金襴とは違った豪華さがあります。'
          },
          {
            id: 'ryu_nishiki',
            name: '龍錦',
            reading: 'りゅうにしき',
            type: '錦',
            origin: '中国',
            period: '明〜清代',
            use: ['表装', '装飾'],
            tags: ['錦', '中国', '龍文', '表装'],
            description: '龍文様を織り出した格調高い錦。',
            details: '龍を主文様として織り出した錦。権威と吉祥を象徴する龍文は、格の高い錦に用いられました。'
          },
          {
            id: 'hosho_nishiki',
            name: '宝相華錦',
            reading: 'ほうそうげにしき',
            type: '錦',
            origin: '中国',
            period: '唐代',
            use: ['表装', '装飾'],
            tags: ['錦', '中国', '宝相華', '唐代', '正倉院'],
            description: '宝相華文様の錦。正倉院裂の代表格。',
            details: '宝相華（架空の花）を文様化した錦。正倉院に伝わる古代裂の代表的なもので、唐代の染織技術の粋を示します。'
          },
          {
            id: 'shippo_nishiki',
            name: '七宝錦',
            reading: 'しっぽうにしき',
            type: '錦',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['錦', '中国', '七宝文', '吉祥'],
            description: '七宝文様を織り出した吉祥の錦。',
            details: '輪違い七宝文様を複数の色糸で織り出した錦。七宝は吉祥を表す文様として好まれました。'
          }
        ],
        fuutsu: [
          {
            id: 'fuutsu',
            name: '風通',
            reading: 'ふうつう',
            type: '風通',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['風通', '中国', '二重織', '表装'],
            description: '表と裏を同じ文様に織り出す二重織の技法。',
            details: '二重織の一種で、表と裏を同じ文様に織り出す高度な技法。明代の中国で発達し、立体感のある美しい織物として珍重されました。'
          },
          {
            id: 'karahana_fuutsu',
            name: '唐花風通',
            reading: 'からはなふうつう',
            type: '風通',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['風通', '中国', '二重織', '唐花', '表装'],
            description: '唐花文様の風通。',
            details: '中国風の花文様（唐花）を風通の技法で織り出したもの。二重織による立体的な表現が美しい。'
          }
        ],
        other: [
          {
            id: 'inkin',
            name: '印金',
            reading: 'いんきん',
            type: '印金',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['印金', '中国', '金箔押', '表装'],
            description: '金箔を押した染織品。',
            details: '織物に金箔を押して文様を表現したもの。金襴とは異なる製法で、仕覆よりも表装裂として広く活用されました。'
          },
          {
            id: 'kinmoru',
            name: '金モール',
            reading: 'きんもーる',
            type: 'モール',
            origin: 'ムガール',
            period: '17世紀以降',
            use: ['表装', '装飾'],
            tags: ['モール', 'ムガール', '金線', '毛織'],
            description: '絹糸に金線を巻きつけて織ったもの。',
            details: 'ムガール王朝のムガールがなまってモールになったと言われます。絹糸に金線が巻きつけてあり、金襴とは異なる独特の質感があります。山形状の組織地紋を持ち、強い撚りのかかった糸を使っている場合が多い。'
          },
          {
            id: 'ginmoru',
            name: '銀モール',
            reading: 'ぎんもーる',
            type: 'モール',
            origin: 'ムガール',
            period: '17世紀以降',
            use: ['表装', '装飾'],
            tags: ['モール', 'ムガール', '銀線', '毛織'],
            description: '絹糸に銀線を巻きつけて織ったもの。',
            details: '金モールの銀線版。絹糸に銀線が巻きつけてあり、落ち着いた輝きが特徴です。'
          },
          {
            id: 'birodo',
            name: '天鵞絨',
            reading: 'びろーど',
            type: 'ビロード',
            origin: 'ヨーロッパ',
            period: '江戸時代',
            use: ['装飾', '袋物'],
            tags: ['ビロード', 'ヨーロッパ', '南蛮', '毛足'],
            description: '毛足の長いビロード。南蛮貿易でもたらされた。',
            details: '毛足が長く、独特の手触りを持つ織物。南蛮貿易を通じてヨーロッパからもたらされました。毛足が長く、金糸を織り込んだビロードは特に珍重されました。'
          },
          {
            id: 'shuchin',
            name: '繻珍',
            reading: 'しゅちん',
            type: '繻珍',
            origin: '中国',
            period: '明〜清代',
            use: ['表装', '装飾'],
            tags: ['繻珍', '中国', '繻子', '表装'],
            description: '繻子織の一種。光沢のある織物。',
            details: '繻子織の一種で、光沢のある美しい織物。緞子よりも薄手で、表装裂などに用いられます。'
          },
          {
            id: 'kinsha',
            name: '金紗',
            reading: 'きんしゃ',
            type: '金紗',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金紗', '中国', '紗', '金糸', '表装'],
            description: '紗地に金糸で文様を織り出したもの。',
            details: '透け感のある紗地に金糸で文様を織り出した軽やかな織物。夏の表装裂などに用いられます。'
          },
          {
            id: 'kinra',
            name: '金羅',
            reading: 'きんら',
            type: '金羅',
            origin: '中国',
            period: '明代',
            use: ['表装'],
            tags: ['金羅', '中国', '羅', '金糸', '表装'],
            description: '羅地に金糸で文様を織り出したもの。',
            details: '羅（らしゃ）地に金糸で文様を織り出した織物。透け感があり、軽やかな印象を与えます。'
          },
          {
            id: 'shoha',
            name: '紹巴',
            reading: 'しょうは',
            type: '紹巴',
            origin: '中国',
            period: '明代',
            use: ['表装', '仕覆'],
            tags: ['紹巴', '中国', '斜文', '表装'],
            description: '山形の斜文線を織り出したもの。',
            details: '山形の斜文線が特徴的な織物。独特の幾何学的な美しさがあります。'
          },
          {
            id: 'wakuda_shoha',
            name: '和久田紹巴',
            reading: 'わくだしょうは',
            type: '紹巴',
            origin: '中国',
            period: '明〜清代',
            use: ['表装'],
            tags: ['紹巴', '中国', '和久田', '表装'],
            description: '和久田家に伝わる紹巴。',
            details: '和久田家に伝来した紹巴。山形状の組織地紋を持ち、強い撚りのかかった糸を使っているのが特徴です。'
          }
        ]
      }
    },
    en: {
      title: 'Fabric Guide',
      subtitle: 'Meibutsugire Collection',
      intro: 'Explore the beautiful textile arts treasured in tea ceremony.',
      searchPlaceholder: 'Search fabrics...',
      specialSection: 'Three Great Meibutsu Kinran',
      specialIntro: 'The most prestigious gold brocades in tea ceremony'
    }
  };
 
  const t = content[language];
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' }
  ];
 
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };
 
  const clearFilters = () => {
    setSelectedFilters({ type: [], origin: [], use: [] });
  };
 
  const filterFabrics = (fabrics) => {
    let filtered = fabrics;
 
    // Search query
    if (searchQuery) {
      filtered = filtered.filter(fabric => 
        fabric.name.includes(searchQuery) || 
        fabric.reading.includes(searchQuery) ||
        fabric.tags?.some(tag => tag.includes(searchQuery))
      );
    }
 
    // Type filter
    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter(fabric => 
        selectedFilters.type.includes(fabric.type)
      );
    }
 
    // Origin filter
    if (selectedFilters.origin.length > 0) {
      filtered = filtered.filter(fabric => 
        selectedFilters.origin.includes(fabric.origin)
      );
    }
 
    // Use filter
    if (selectedFilters.use.length > 0) {
      filtered = filtered.filter(fabric => 
        fabric.use && fabric.use.some(u => selectedFilters.use.includes(u))
      );
    }
 
    return filtered;
  };
 
  const allTypes = ['緞子', '金襴', '間道', '更紗', '錦', '風通', 'モール', 'その他'];
  const allOrigins = ['中国', '日本', 'インド', 'ペルシャ', '東南アジア', 'ヨーロッパ'];
  const allUses = ['仕覆', '表装', '古帛紗', '袱紗', '装束裂', '袈裟裂'];
 
  const hasActiveFilters = selectedFilters.type.length > 0 || 
                          selectedFilters.origin.length > 0 || 
                          selectedFilters.use.length > 0;
 
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
        }
        
        .font-serif { font-family: 'Crimson Pro', 'Noto Serif JP', serif; }
        .font-display { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; }
        
        .nav-blur {
          backdrop-filter: blur(12px);
          background: rgba(248, 247, 244, 0.85);
          border-bottom: 1px solid rgba(127, 166, 127, 0.1);
        }
        
        .fabric-card {
          background: white;
          border: 1px solid rgba(127, 166, 127, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .fabric-card:hover {
          border-color: var(--matcha);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(127, 166, 127, 0.15);
        }
        
        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .filter-chip:hover {
          transform: scale(1.05);
        }
        .tag-selected {
          background: white !important;
          color: #5d7d5d !important;
          border: 3px solid #7fa67f !important;
          font-weight: 600 !important;
          box-shadow: 0 2px 8px rgba(127, 166, 127, 0.2) !important;
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
 
      {/* Search & Filter */}
      <section className="sticky top-16 z-40 bg-white border-y border-matcha/10 px-6 py-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matcha" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 border border-matcha rounded-full font-medium text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-matcha/20"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-matcha text-white border-matcha'
                  : 'bg-transparent text-matcha border-matcha hover:bg-matcha hover:text-white'
              }`}
            >
              <Filter size={20} />
              <span className="hidden sm:inline">{t.filters}</span>
              {hasActiveFilters && (
                <span className="bg-white text-matcha rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {selectedFilters.type.length + selectedFilters.origin.length + selectedFilters.use.length}
                </span>
              )}
            </button>
          </div>
 
          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-matcha/5 rounded-2xl p-6 space-y-4">
              
 
              {/* Type Filter */}
              <div>
                <h3 className="font-semibold text-ink mb-3">{t.filterCategories?.type || '種類'}</h3>
                <div className="flex flex-wrap gap-2">
                  {allTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter('type', type)}
                      className={`filter-chip ${
                        selectedFilters.type.includes(type)
                          ? 'tag-selected'
                          : 'bg-white text-ink border border-matcha/20'
                      }`}
                    >
                      {selectedFilters.type.includes(type) && (
                        <Check size={16} className="font-bold" />
                      )}
                      {type}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Origin Filter */}
              <div>
                <h3 className="font-semibold text-ink mb-3">{t.filterCategories?.origin || '産地'}</h3>
                <div className="flex flex-wrap gap-2">
                  {allOrigins.map(origin => (
                    <button
                      key={origin}
                      onClick={() => toggleFilter('origin', origin)}
                      className={`filter-chip ${
                        selectedFilters.origin.includes(origin)
                          ? 'tag-selected'
                          : 'bg-white text-ink border border-matcha/20'
                      }`}
                    >
                      {selectedFilters.origin.includes(origin) && (
                        <Check size={16} className="font-bold" />
                      )}
                      {origin}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Use Filter */}
              <div>
                <h3 className="font-semibold text-ink mb-3">{t.filterCategories?.use || '用途'}</h3>
                <div className="flex flex-wrap gap-2">
                  {allUses.map(use => (
                    <button
                      key={use}
                      onClick={() => toggleFilter('use', use)}
                      className={`filter-chip ${
                        selectedFilters.use.includes(use)
                          ? 'tag-selected'
                          : 'bg-white text-ink border border-matcha/20'
                      }`}
                    >
                      {selectedFilters.use.includes(use) && (
                        <Check size={16} className="font-bold" />
                      )}
                      {use}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-matcha/10">
                {hasActiveFilters ? (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-matcha hover:text-matcha-dark transition-colors"
                  >
                    <X size={16} />
                    {t.clearFilters || 'クリア'}
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={() => setShowFilters(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 32px',
                  background: '#5d7d5d',
                  color: 'white',
                  border: '3px solid white',
                  borderRadius: '9999px',
                  fontWeight: '600',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(93, 125, 93, 0.4)',
                  cursor: 'pointer'
                }}
                >
                  {language === 'ja' ? '検索' : 'Search'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
 
      {/* Special Section: 三大名物金襴 */}
      <section className="py-16 px-6 bg-gradient-to-b from-gold/5 to-paper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
              {t.specialSection}
            </h2>
            <p className="text-base md:text-lg text-ink/70">
              {t.specialIntro}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {t.fabricList.special.map((fabric, index) => (
              <div 
                key={fabric.id}
                onClick={() => setSelectedFabric(fabric)}
                className="fabric-card p-6 rounded-2xl"
              >
                <div className="aspect-square bg-gold/5 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-6xl text-gold/30">🧵</div>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gold">{index + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink">{fabric.name}</h3>
                      <p className="text-sm text-matcha">{fabric.reading}</p>
                    </div>
                  </div>
                  <p className="text-sm text-ink/60 mb-2">{fabric.origin} ・ {fabric.period}</p>
                  <p className="text-sm text-ink/80">{fabric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Category Sections */}
      {Object.entries(t.fabricList).filter(([key]) => key !== 'special').map(([sectionKey, fabrics]) => {
        const filteredFabrics = filterFabrics(fabrics);
        if (filteredFabrics.length === 0) return null;
 
        return (
          <section 
            key={sectionKey}
            ref={sectionsRef[sectionKey]}
            className="py-16 px-6 scroll-mt-32"
            style={{ backgroundColor: `${sectionColors[sectionKey]}08` }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 
                className="font-display text-3xl md:text-4xl font-bold text-ink mb-8 pb-4 border-b-4"
                style={{ borderColor: sectionColors[sectionKey] }}
              >
                {t.sections[sectionKey]}
              </h2>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredFabrics.map((fabric) => (
                  <div 
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className="fabric-card p-6 rounded-2xl"
                  >
                    <div 
                      className="aspect-square rounded-xl mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${sectionColors[sectionKey]}15` }}
                    >
                      <div className="text-4xl" style={{ color: sectionColors[sectionKey], opacity: 0.4 }}>
                        🧵
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink mb-1">{fabric.name}</h3>
                    <p className="text-xs text-matcha mb-2">{fabric.reading}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs bg-matcha/10 text-matcha px-2 py-1 rounded-full">
                        {fabric.type}
                      </span>
                      <span className="text-xs bg-ink/5 text-ink/60 px-2 py-1 rounded-full">
                        {fabric.origin}
                      </span>
                    </div>
                    <p className="text-sm text-ink/80 line-clamp-2">{fabric.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
 
      {/* Detail Modal */}
      {selectedFabric && (
        <div 
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(26, 26, 26, 0.55)' }}
          onClick={() => setSelectedFabric(null)}
        >
          <div 
            className="rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
            style={{ background: '#f8f7f4', border: '1px solid rgba(127, 166, 127, 0.3)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-display text-4xl font-bold mb-2">{selectedFabric.name}</h2>
                <p className="text-lg text-matcha mb-1">{selectedFabric.reading}</p>
                <p className="text-sm text-ink/60">
                  {selectedFabric.origin} ・ {selectedFabric.period}
                </p>
              </div>
              <button 
                onClick={() => setSelectedFabric(null)}
                className="text-ink/50 hover:text-ink transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video bg-matcha/5 rounded-2xl mb-6 flex items-center justify-center">
              <div className="text-9xl text-matcha/30">🧵</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm" style={{ background: '#5d7d5d', color: '#fff' }}>
                  {selectedFabric.type}
                </span>
                {selectedFabric.use?.map(use => (
                  <span key={use} className="px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(127, 166, 127, 0.15)', color: '#4d6b4d' }}>
                    {use}
                  </span>
                ))}
              </div>
 
              <div>
                <h3 className="font-display text-xl font-semibold text-matcha mb-2">
                  {language === 'ja' ? '特徴' : 'Description'}
                </h3>
                <p className="text-base text-ink/80 leading-relaxed">
                  {selectedFabric.description}
                </p>
              </div>
              
              {selectedFabric.details && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-matcha mb-2">
                    {language === 'ja' ? '詳細' : 'Details'}
                  </h3>
                  <p className="text-base text-ink/80 leading-relaxed">
                    {selectedFabric.details}
                  </p>
                </div>
              )}
 
              {selectedFabric.tags && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-matcha mb-2">
                    {language === 'ja' ? 'タグ' : 'Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFabric.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(26, 26, 26, 0.06)', color: 'rgba(26, 26, 26, 0.7)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
 
      {/* Footer */}
      <footer className="bg-ink text-paper py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Logo />
          <p className="text-paper/60 text-sm mt-6">
            © 2026 茶乃間 (Chanoma). {language === 'ja' ? 'すべての権利を保有' : 'All rights reserved'}.
          </p>
          <p className="text-sm mt-3">
            <Link to="/about" style={{ color: 'rgba(248, 247, 244, 0.6)' }} className="underline underline-offset-4 hover:opacity-80">
              {language === 'ja' ? '運営者情報' : 'About'}
            </Link>
            <span className="mx-3" style={{ color: 'rgba(248, 247, 244, 0.3)' }}>|</span>
            <Link to="/contact" style={{ color: 'rgba(248, 247, 244, 0.6)' }} className="underline underline-offset-4 hover:opacity-80">
              {language === 'ja' ? 'お問い合わせ' : 'Contact'}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};
 
export default Fabrics;