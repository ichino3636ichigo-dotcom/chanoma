import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const Pottery = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedPottery, setSelectedPottery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const mapContainerRef = useRef(null);
  
  const regionsRef = {
    hokkaido: useRef(null),
    kanto: useRef(null),
    chubu: useRef(null),
    kinki: useRef(null),
    chugoku: useRef(null),
    kyushu: useRef(null),
    okinawa: useRef(null)
  };

  // 都道府県を地域にマッピング（SVGは「県」「府」「都」なしの形式）
  const prefectureToRegion = {
    // 北海道・東北
    '北海道': 'hokkaido', '青森': 'hokkaido', '岩手': 'hokkaido', 
    '宮城': 'hokkaido', '秋田': 'hokkaido', '山形': 'hokkaido', '福島': 'hokkaido',
    // 関東
    '茨城': 'kanto', '栃木': 'kanto', '群馬': 'kanto', 
    '埼玉': 'kanto', '千葉': 'kanto', '東京': 'kanto', '神奈川': 'kanto',
    // 中部・北陸
    '新潟': 'chubu', '富山': 'chubu', '石川': 'chubu', '福井': 'chubu',
    '山梨': 'chubu', '長野': 'chubu', '岐阜': 'chubu', '静岡': 'chubu', '愛知': 'chubu',
    // 近畿
    '三重': 'kinki', '滋賀': 'kinki', '京都': 'kinki', 
    '大阪': 'kinki', '兵庫': 'kinki', '奈良': 'kinki', '和歌山': 'kinki',
    // 中国・四国
    '鳥取': 'chugoku', '島根': 'chugoku', '岡山': 'chugoku', 
    '広島': 'chugoku', '山口': 'chugoku', '徳島': 'chugoku', 
    '香川': 'chugoku', '愛媛': 'chugoku', '高知': 'chugoku',
    // 九州
    '福岡': 'kyushu', '佐賀': 'kyushu', '長崎': 'kyushu', 
    '熊本': 'kyushu', '大分': 'kyushu', '宮崎': 'kyushu', '鹿児島': 'kyushu',
    // 沖縄
    '沖縄': 'okinawa'
  };

  const regionColors = {
    hokkaido: '#5d7d5d',  // 濃い抹茶
    kanto: '#7fa67f',     // 抹茶（サイトのメインカラー）
    chubu: '#99b899',     // 明るい抹茶
    kinki: '#d4af37',     // 金色（特別・京都）
    chugoku: '#b3ccb3',   // 淡い抹茶
    kyushu: '#8fa68f',    // ミント抹茶
    okinawa: '#6b9b8f'    // 青緑抹茶
  };

  useEffect(() => {
    const loadMap = async () => {
      const container = mapContainerRef.current;
      if (!container) return;

      try {
        const response = await fetch('/map-full.svg');
        const svgText = await response.text();
        container.innerHTML = svgText;

        // SVG要素にスタイルとイベントを追加
        const svgElement = container.querySelector('svg');
        if (svgElement) {
          svgElement.style.width = '100%';
          svgElement.style.height = 'auto';
          svgElement.classList.add('drop-shadow-lg');
        }

        // 各都道府県にイベントを追加
        const prefectures = container.querySelectorAll('.prefecture');
        prefectures.forEach((pref) => {
          // <title>タグから都道府県名を取得
          const titleElement = pref.querySelector('title');
          const titleText = titleElement?.textContent || '';
          const prefName = titleText.split('/')[0].trim(); // "沖縄 / Okinawa" → "沖縄"
          const region = prefectureToRegion[prefName];
          
          if (region) {
            // 地域ごとの色を設定
            const polygons = pref.querySelectorAll('polygon, path');
            polygons.forEach((shape) => {
              shape.style.fill = regionColors[region];
              shape.style.fillOpacity = '0.6';
              shape.style.stroke = 'white';
              shape.style.strokeWidth = '1.5';
              shape.style.transition = 'all 0.3s ease';
            });

            pref.style.cursor = 'pointer';

            // ホバーイベント
            pref.addEventListener('mouseenter', () => {
              polygons.forEach((shape) => {
                shape.style.fillOpacity = '0.9';
                shape.style.filter = 'brightness(1.15)';
              });
              setHoveredRegion(region);
            });

            pref.addEventListener('mouseleave', () => {
              polygons.forEach((shape) => {
                shape.style.fillOpacity = '0.6';
                shape.style.filter = 'none';
              });
              setHoveredRegion(null);
            });

            // クリックイベント
            pref.addEventListener('click', () => {
              scrollToRegion(region);
            });
          }
        });
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadMap();
  }, []);

  const Logo = () => (
    <Link to="/" className="flex items-center gap-3">
      <img src="/icon.png" alt="茶乃間" className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">茶乃間</span>
        <span className="text-ink/50 font-light tracking-wider text-xs md:text-sm">Cha no Ma</span>
      </div>
    </Link>
  );

  const scrollToRegion = (regionKey) => {
    regionsRef[regionKey]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const content = {
    ja: {
      title: '焼き物図鑑',
      subtitle: '日本各地の陶磁器',
      intro: '日本には各地に特色ある焼き物があります。産地ごとの特徴や歴史を学びましょう。',
      searchPlaceholder: '焼き物を検索...',
      specialSection: '「一楽、二萩、三唐津」',
      specialIntro: '茶の湯の世界で特に格が高いとされる三つの焼き物',
      regions: {
        hokkaido: '北海道・東北',
        kanto: '関東',
        chubu: '中部・北陸',
        kinki: '近畿',
        chugoku: '中国・四国',
        kyushu: '九州',
        okinawa: '沖縄'
      },
      potteryList: {
        special: [
          {
            id: 'raku',
            name: '楽焼',
            reading: 'らくやき',
            region: 'kinki',
            prefecture: '京都府',
            description: '「一楽」として最も格が高い。手捏ねで成形し、低温で焼成する独特の技法。',
            details: '千利休の指導のもと、初代長次郎により創始されました。轆轤を使わず手で成形し、800度前後の低温で焼成します。黒楽と赤楽が代表的で、柔らかな手触りと深い味わいが特徴です。茶碗として最高の格を持ちます。'
          },
          {
            id: 'hagi',
            name: '萩焼',
            reading: 'はぎやき',
            region: 'chugoku',
            prefecture: '山口県',
            description: '「二萩」として知られる。使い込むほど味わいが増す「萩の七化け」が特徴。',
            details: '朝鮮から渡来した陶工により始まりました。土の粗さと釉薬の収縮率の違いから生じる貫入が特徴で、使い込むことで茶が染み込み、独特の景色「萩の七化け」が現れます。柔らかな肌合いと優しい色合いが魅力です。'
          },
          {
            id: 'karatsu',
            name: '唐津焼',
            reading: 'からつやき',
            region: 'kyushu',
            prefecture: '佐賀県',
            description: '「三唐津」として親しまれる。素朴で力強い作風が特徴。',
            details: '桃山時代に朝鮮の技術を取り入れて発展しました。絵唐津、朝鮮唐津、斑唐津など多彩な技法があります。土の温かみを活かした素朴な風合いと、力強さが特徴。「一楽二萩三唐津」と称されます。'
          }
        ],
        hokkaido: [
          {
            id: 'osoma',
            name: '大堀相馬焼',
            reading: 'おおぼりそうまやき',
            prefecture: '福島県',
            description: '青ひび模様と走り駒の絵柄が特徴。二重構造で熱くなりにくい。',
            details: '青ひび（貫入）と走り駒の図柄が特徴的です。二重焼きという独特の技法により、熱い飲み物を入れても器が熱くなりにくく、冷めにくいという実用性を持ちます。'
          },
          {
            id: 'aizuhongo',
            name: '会津本郷焼',
            reading: 'あいづほんごうやき',
            prefecture: '福島県',
            description: '素朴で実用的な器。会津藩の保護を受けて発展。',
            details: '江戸時代初期から続く陶器で、会津藩の保護を受けて発展しました。素朴で実用的な器が多く、日常使いに適しています。'
          }
        ],
        kanto: [
          {
            id: 'mashiko',
            name: '益子焼',
            reading: 'ましこやき',
            prefecture: '栃木県',
            description: '民芸運動により発展。ぽってりとした厚みと温かみが特徴。',
            details: '江戸時代末期に始まり、濱田庄司らの民芸運動により全国的に知られるようになりました。厚手で素朴な風合いと、実用性の高さが特徴です。'
          },
          {
            id: 'kasama',
            name: '笠間焼',
            reading: 'かさまやき',
            prefecture: '茨城県',
            description: '関東最古の窯。作家の個性を活かした自由な作風。',
            details: '江戸時代中期から続く関東最古の焼き物。伝統にとらわれない自由な作風が特徴で、多くの陶芸家が集まります。'
          }
        ],
        chubu: [
          {
            id: 'kutani',
            name: '九谷焼',
            reading: 'くたにやき',
            prefecture: '石川県',
            description: '鮮やかな五彩の上絵付けが特徴。華やかで力強い絵柄。',
            details: '赤・黄・緑・紫・紺青の五彩を使った華やかな上絵付けが特徴です。大胆な構図と力強い筆致で、器全体を絵画のように仕上げます。'
          },
          {
            id: 'echizen',
            name: '越前焼',
            reading: 'えちぜんやき',
            prefecture: '福井県',
            description: '日本六古窯の一つ。素朴で力強い作風。',
            details: '平安時代から続く日本六古窯の一つ。釉薬を使わない焼締めが特徴で、素朴で力強い味わいがあります。'
          },
          {
            id: 'mino',
            name: '美濃焼',
            reading: 'みのやき',
            prefecture: '岐阜県',
            description: '志野・織部・黄瀬戸など多彩な技法。日本最大の陶磁器産地。',
            details: '桃山時代に茶陶として発展し、志野・織部・黄瀬戸など多様な技法を生み出しました。現在は日本最大の陶磁器産地です。'
          },
          {
            id: 'seto',
            name: '瀬戸焼',
            reading: 'せとやき',
            prefecture: '愛知県',
            description: '「せともの」の語源。千年以上の歴史を持つ。',
            details: '平安時代から続く日本六古窯の一つ。「せともの」の語源となった窯で、釉薬を使った多彩な技法が特徴です。'
          },
          {
            id: 'akatsu',
            name: '赤津焼',
            reading: 'あかづやき',
            prefecture: '愛知県',
            description: '七釉十二技法を持つ多彩な焼き物。',
            details: '瀬戸焼の一派で、七種類の釉薬と十二の技法を持つ多彩な表現が可能です。茶器から日用品まで幅広く作られます。'
          },
          {
            id: 'tokoname',
            name: '常滑焼',
            reading: 'とこなめやき',
            prefecture: '愛知県',
            description: '日本六古窯の一つ。朱泥の急須が有名。',
            details: '平安時代から続く日本六古窯の一つ。鉄分を含む赤い土で作られる朱泥の急須が特に有名です。'
          },
          {
            id: 'inuyama',
            name: '犬山焼',
            reading: 'いぬやまやき',
            prefecture: '愛知県',
            description: '桃山時代に始まる。茶陶として発展。',
            details: '桃山時代に始まり、茶陶として発展しました。素朴な風合いと実用性が特徴です。'
          },
          {
            id: 'shigaraki',
            name: '信楽焼',
            reading: 'しがらきやき',
            prefecture: '滋賀県',
            description: '日本六古窯の一つ。たぬきの置物で有名。土の温かみが特徴。',
            details: '奈良時代から続く日本六古窯の一つ。粗い土と自然釉の景色が美しく、素朴で力強い作風が特徴です。狸の置物でも知られています。'
          },
          {
            id: 'zeze',
            name: '膳所焼',
            reading: 'ぜぜやき',
            prefecture: '滋賀県',
            description: '遠州七窯の一つ。茶陶として発展。',
            details: '小堀遠州が好んだ遠州七窯の一つ。繊細で上品な作風が特徴で、茶器として珍重されます。'
          }
        ],
        kinki: [
          {
            id: 'kiyomizu',
            name: '京焼・清水焼',
            reading: 'きょうやき・きよみずやき',
            prefecture: '京都府',
            description: '華やかな絵付けが特徴。京都の伝統と美意識を体現。',
            details: '京都で作られる陶磁器の総称。華やかな色絵や金彩が特徴で、洗練された美意識を反映しています。茶陶から日用品まで幅広く作られます。'
          },
          {
            id: 'tamba',
            name: '丹波焼・丹波立杭焼',
            reading: 'たんばやき・たんばたちくいやき',
            prefecture: '兵庫県',
            description: '日本六古窯の一つ。素朴で力強い。自然釉の景色が美しい。',
            details: '平安時代から続く日本六古窯の一つ。穴窯で焼かれ、灰が降りかかってできる自然釉の景色が特徴です。素朴で力強い味わいがあります。'
          },
          {
            id: 'izushi',
            name: '出石焼',
            reading: 'いずしやき',
            prefecture: '兵庫県',
            description: '白磁の美しさ。繊細で上品な作風。',
            details: '白い磁器が特徴で、「但馬の白磁」として知られます。繊細で上品な作風が魅力です。'
          },
          {
            id: 'akahada',
            name: '赤膚焼',
            reading: 'あかはだやき',
            prefecture: '奈良県',
            description: '乳白色の地肌に奈良絵が特徴。',
            details: '乳白色の柔らかな肌合いに、奈良絵と呼ばれる素朴な絵付けが施されます。温かみのある風合いが特徴です。'
          },
          {
            id: 'iga',
            name: '伊賀焼',
            reading: 'いがやき',
            prefecture: '三重県',
            description: '古伊賀として茶陶に珍重される。力強く豪快な景色。',
            details: '桃山時代の古伊賀は茶陶として珍重されます。粗い土と高温焼成による歪みや焦げ、ビードロ釉の景色が力強く豪快です。'
          },
          {
            id: 'yokkaichi',
            name: '四日市萬古焼',
            reading: 'よっかいちばんこやき',
            prefecture: '三重県',
            description: '紫泥の急須が有名。耐熱性に優れる。',
            details: '紫泥と呼ばれる鉄分の多い土で作られる急須が有名です。耐熱性に優れ、実用性が高いのが特徴です。'
          },
          {
            id: 'akogi',
            name: '阿漕焼',
            reading: 'あこぎやき',
            prefecture: '三重県',
            description: '茶褐色の地肌が特徴。',
            details: '鉄分を含む土による茶褐色の地肌が特徴的な焼き物です。'
          }
        ],
        chugoku: [
          {
            id: 'bizen',
            name: '備前焼',
            reading: 'びぜんやき',
            prefecture: '岡山県',
            description: '日本六古窯の一つ。釉薬を使わない焼締め。土の味わいが深い。',
            details: '平安時代から続く日本六古窯の一つ。釉薬を使わず、土の性質と炎の作用だけで焼き上げます。使い込むほど味わいが増します。'
          },
          {
            id: 'mushiake',
            name: '虫明焼',
            reading: 'むしあけやき',
            prefecture: '岡山県',
            description: '備前焼の流れを汲む。繊細な作風。',
            details: '備前焼の流れを汲みながら、より繊細で上品な作風が特徴です。茶陶として発展しました。'
          },
          {
            id: 'izumo',
            name: '出雲焼',
            reading: 'いずもやき',
            prefecture: '島根県',
            description: '温かみのある釉調。',
            details: '柔らかな釉調と温かみのある色合いが特徴です。日常使いの器として親しまれています。'
          },
          {
            id: 'shussai',
            name: '出西焼',
            reading: 'しゅっさいやき',
            prefecture: '島根県',
            description: '民芸運動の流れを汲む。実用的で美しい。',
            details: '民芸運動の影響を受けて始まりました。実用性と美しさを兼ね備えた器作りが特徴です。'
          },
          {
            id: 'iwami',
            name: '石見焼',
            reading: 'いわみやき',
            prefecture: '島根県',
            description: '大型の水瓶や甕で知られる。',
            details: '江戸時代から大型の水瓶や甕を作ってきました。堅牢で実用的な器が特徴です。'
          },
          {
            id: 'tobe',
            name: '砥部焼',
            reading: 'とべやき',
            prefecture: '愛媛県',
            description: '白磁に藍色の絵付け。厚手で丈夫。',
            details: '厚手で丈夫な白磁に、呉須による藍色の絵付けが特徴です。日常使いに適した実用的な器です。'
          },
          {
            id: 'otani',
            name: '大谷焼',
            reading: 'おおたにやき',
            prefecture: '徳島県',
            description: '大型の壺や甕が特徴。力強い作風。',
            details: '大型の壺や甕を得意とし、寝ロクロという独特の技法で作られます。力強く豪快な作風が特徴です。'
          }
        ],
        kyushu: [
          {
            id: 'arita',
            name: '有田焼・伊万里焼',
            reading: 'ありたやき・いまりやき',
            prefecture: '佐賀県',
            description: '日本初の磁器。華やかな色絵が特徴。',
            details: '日本で初めて磁器が焼かれた地。白い磁肌に華やかな色絵が施され、伊万里港から積み出されたため伊万里焼とも呼ばれます。'
          },
          {
            id: 'hasami',
            name: '波佐見焼',
            reading: 'はさみやき',
            prefecture: '長崎県',
            description: '日常使いの磁器。モダンなデザインも人気。',
            details: '江戸時代から日常使いの磁器を作り続けてきました。近年はモダンなデザインでも注目を集めています。'
          },
          {
            id: 'mikawachi',
            name: '三川内焼',
            reading: 'みかわちやき',
            prefecture: '長崎県',
            description: '透かし彫りや繊細な染付が特徴。',
            details: '平戸藩の御用窯として発展しました。透かし彫りや繊細な染付など、技巧的な作品が特徴です。'
          },
          {
            id: 'koishiwara',
            name: '小石原焼',
            reading: 'こいしわらやき',
            prefecture: '福岡県',
            description: '飛び鉋や刷毛目の装飾が特徴。民芸的な味わい。',
            details: '飛び鉋や刷毛目などの装飾技法が特徴です。民芸運動により全国的に知られるようになりました。'
          },
          {
            id: 'takatori',
            name: '高取焼',
            reading: 'たかとりやき',
            prefecture: '福岡県',
            description: '遠州七窯の一つ。茶陶として発展。',
            details: '小堀遠州が好んだ遠州七窯の一つ。茶陶として発展し、多彩な釉薬による美しい景色が特徴です。'
          },
          {
            id: 'agano',
            name: '上野焼',
            reading: 'あがのやき',
            prefecture: '福岡県',
            description: '遠州七窯の一つ。薄造りで繊細。',
            details: '小堀遠州が好んだ遠州七窯の一つ。薄造りで繊細な作風が特徴です。茶陶として珍重されます。'
          },
          {
            id: 'kuromuta',
            name: '黒牟田焼',
            reading: 'くろむたやき',
            prefecture: '福岡県',
            description: '民窯として発展。素朴な風合い。',
            details: '江戸時代から続く民窯。素朴で力強い風合いが特徴です。'
          },
          {
            id: 'gennai',
            name: '源内焼',
            reading: 'げんないやき',
            prefecture: '佐賀県',
            description: '平賀源内が関わったとされる焼き物。',
            details: '平賀源内が陶技を伝えたとされる窯。独特の釉調が特徴です。'
          },
          {
            id: 'nabeshima',
            name: '鍋島焼',
            reading: 'なべしまやき',
            prefecture: '佐賀県',
            description: '鍋島藩の御用窯。最高級の献上品。',
            details: '鍋島藩の御用窯として、将軍家への献上品を作りました。精緻な絵付けと完璧な仕上げが特徴です。'
          },
          {
            id: 'genkawa',
            name: '現川焼',
            reading: 'げんかわやき',
            prefecture: '佐賀県',
            description: '繊細な絵付けが特徴。',
            details: '繊細で丁寧な絵付けが特徴の焼き物です。日常の器から茶陶まで幅広く作られます。'
          },
          {
            id: 'shodai',
            name: '小代焼',
            reading: 'しょうだいやき',
            prefecture: '熊本県',
            description: '象嵌技法が特徴。力強い作風。',
            details: '象嵌という技法で白い土を埋め込んだ装飾が特徴です。力強く素朴な風合いがあります。'
          },
          {
            id: 'takada',
            name: '高田焼（八代焼）',
            reading: 'たかだやき（やつしろやき）',
            prefecture: '熊本県',
            description: '象嵌技法による幾何学模様が特徴。',
            details: '象嵌技法による幾何学的な模様が美しい焼き物です。細川家の保護を受けて発展しました。'
          },
          {
            id: 'onta',
            name: '小鹿田焼',
            reading: 'おんたやき',
            prefecture: '大分県',
            description: '民芸的な装飾。飛び鉋や刷毛目が特徴。',
            details: '民芸運動により注目されました。飛び鉋や刷毛目などの装飾技法が特徴で、素朴な美しさがあります。'
          },
          {
            id: 'manshozan',
            name: '萬祥山焼',
            reading: 'まんしょうざんやき',
            prefecture: '鹿児島県',
            description: '薩摩焼の一派。',
            details: '薩摩焼の流れを汲む窯。独特の釉調と装飾が特徴です。'
          }
        ],
        okinawa: [
          {
            id: 'yachimun',
            name: 'やちむん',
            reading: 'やちむん',
            prefecture: '沖縄県',
            description: '沖縄の焼き物の総称。おおらかで温かみのある風合い。',
            details: '沖縄の方言で「焼き物」を意味します。おおらかで温かみのある風合いと、力強い絵付けが特徴です。'
          },
          {
            id: 'tsuboya',
            name: '壺屋焼',
            reading: 'つぼややき',
            prefecture: '沖縄県',
            description: 'やちむんの代表格。琉球王朝時代から続く伝統。',
            details: '那覇市壺屋で作られるやちむんの代表格。琉球王朝時代から続く伝統を持ち、南国らしい力強い装飾が特徴です。'
          }
        ]
      }
    },
    en: {
      title: 'Pottery Guide',
      subtitle: 'Japanese Ceramics by Region',
      intro: 'Japan has distinctive pottery traditions in each region. Learn about their characteristics and history.',
      searchPlaceholder: 'Search pottery...',
      specialSection: 'Three Great Tea Kilns',
      specialIntro: 'Three most prestigious pottery styles in tea ceremony',
      regions: {
        hokkaido: 'Hokkaido/Tohoku',
        kanto: 'Kanto',
        chubu: 'Chubu/Hokuriku',
        kinki: 'Kinki',
        chugoku: 'Chugoku/Shikoku',
        kyushu: 'Kyushu',
        okinawa: 'Okinawa'
      }
    }
  };

  const t = content[language];
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' }
  ];

  const filterPotteries = (potteries) => {
    if (!searchQuery) return potteries;
    return potteries.filter(pottery => 
      pottery.name.includes(searchQuery) || 
      pottery.reading.includes(searchQuery) ||
      pottery.prefecture.includes(searchQuery)
    );
  };

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
        
        .pottery-card {
          background: white;
          border: 1px solid rgba(127, 166, 127, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .pottery-card:hover {
          border-color: var(--matcha);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(127, 166, 127, 0.15);
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

      {/* Search */}
      <section className="sticky top-16 z-40 bg-white border-y border-matcha/10 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matcha" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 border border-matcha rounded-full font-medium text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-matcha/20"
            />
          </div>
        </div>
      </section>

      {/* Special Section: 一楽二萩三唐津 */}
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
            {t.potteryList.special.map((pottery, index) => (
              <div 
                key={pottery.id}
                onClick={() => setSelectedPottery(pottery)}
                className="pottery-card p-6 rounded-2xl"
              >
                <div className="aspect-square bg-gold/5 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-6xl text-gold/30">🏺</div>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gold">{index + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink">{pottery.name}</h3>
                      <p className="text-sm text-matcha">{pottery.reading}</p>
                    </div>
                  </div>
                  <p className="text-sm text-ink/60 mb-2">{pottery.prefecture}</p>
                  <p className="text-sm text-ink/80">{pottery.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Japan Map - Geolonia */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-8">
            {language === 'ja' ? '産地マップ' : 'Regional Map'}
          </h2>
          <p className="text-center text-ink/60 mb-8">
            {language === 'ja' ? '地域をクリックしてその地域の焼き物を見る' : 'Click a region to view pottery'}
          </p>
          
          {/* Map Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full max-w-2xl mx-auto"
            style={{ minHeight: '400px' }}
          />

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Object.entries(t.regions).map(([key, name]) => (
              <div 
                key={key} 
                className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => scrollToRegion(key)}
              >
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: regionColors[key] }}
                />
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Sections */}
      {Object.entries(t.potteryList).filter(([key]) => key !== 'special').map(([regionKey, potteries]) => (
        <section 
          key={regionKey}
          ref={regionsRef[regionKey]}
          className="py-16 px-6 scroll-mt-32"
          style={{ backgroundColor: `${regionColors[regionKey]}08` }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 
              className="font-display text-3xl md:text-4xl font-bold text-ink mb-8 pb-4 border-b-4"
              style={{ borderColor: regionColors[regionKey] }}
            >
              {t.regions[regionKey]}
            </h2>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterPotteries(potteries).map((pottery) => (
                <div 
                  key={pottery.id}
                  onClick={() => setSelectedPottery(pottery)}
                  className="pottery-card p-6 rounded-2xl"
                >
                  <div 
                    className="aspect-square rounded-xl mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${regionColors[regionKey]}15` }}
                  >
                    <div className="text-4xl" style={{ color: regionColors[regionKey], opacity: 0.4 }}>
                      🏺
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-1">{pottery.name}</h3>
                  <p className="text-xs text-matcha mb-2">{pottery.reading}</p>
                  <p className="text-xs text-ink/60 mb-2">{pottery.prefecture}</p>
                  <p className="text-sm text-ink/80 line-clamp-2">{pottery.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Detail Modal */}
      {selectedPottery && (
        <div 
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPottery(null)}
        >
          <div 
            className="bg-paper rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-matcha/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-display text-4xl font-bold mb-2">{selectedPottery.name}</h2>
                <p className="text-lg text-matcha mb-1">{selectedPottery.reading}</p>
                <p className="text-sm text-ink/60">{selectedPottery.prefecture}</p>
              </div>
              <button 
                onClick={() => setSelectedPottery(null)}
                className="text-ink/50 hover:text-ink transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video bg-matcha/5 rounded-2xl mb-6 flex items-center justify-center">
              <div className="text-9xl text-matcha/30">🏺</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-matcha mb-2">
                  {language === 'ja' ? '特徴' : 'Characteristics'}
                </h3>
                <p className="text-base text-ink/80 leading-relaxed">
                  {selectedPottery.description}
                </p>
              </div>
              
              {selectedPottery.details && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-matcha mb-2">
                    {language === 'ja' ? '詳細' : 'Details'}
                  </h3>
                  <p className="text-base text-ink/80 leading-relaxed">
                    {selectedPottery.details}
                  </p>
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

export default Pottery;
