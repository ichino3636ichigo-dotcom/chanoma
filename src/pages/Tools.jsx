import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Tools = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedTool, setSelectedTool] = useState(null);

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

  const chawanCategories = [
    { id: 'hira', name: '平茶碗', reading: 'ひらちゃわん' },
    { id: 'tsutsu', name: '筒茶碗', reading: 'つつちゃわん' },
    { id: 'raku', name: '楽茶碗', reading: 'らくちゃわん' },
    { id: 'kazu', name: '数茶碗', reading: 'かずちゃわん' },
    { id: 'matcha', name: '抹茶茶碗', reading: 'まっちゃちゃわん' },
    { id: 'ko', name: '小茶碗', reading: 'こちゃわん' },
    { id: 'tenmoku', name: '天目茶碗・天目台・天目仕服', reading: 'てんもくちゃわん' }
  ];

  const content = {
    ja: {
      title: '茶道具',
      subtitle: 'お点前に使う道具たち',
      intro: '茶道では、様々な道具を使ってお茶を点てます。それぞれの道具には意味があり、美しさと機能性が調和しています。',
      detailsLabel: '詳細',
      tools: [
        {
          id: 'chawan',
          name: '茶碗',
          reading: 'ちゃわん',
          category: '点前道具',
          image: '/images/chawan.jpg',
          shortDescription: '茶事・茶会において、亭主が最も思いを入れる道具であり、お茶を点て、飲むための器。',
          longDescription: '茶碗は茶道において最も重要な道具の一つです。単にお茶を飲むためだけの物ではなく、作法の流れの一環として茶碗を鑑賞するという所作があります。また、茶室の中に季節感の演出をする役割もあります。茶碗は器としてだけではなく、一つの芸術品として茶道の中に存在し、茶を点てる側の趣味や品格、心意気などがそこに現れます。茶の湯の世界では古から「一楽二萩三唐津」と言われ、楽焼（京都）、萩焼（山口県萩市）、唐津焼（佐賀県唐津市）が格の高い茶碗として好まれています。濃茶では格の高い茶碗が好まれ、楽、萩、唐津、井戸などが良いとされます。薄茶に関しては、特に格などを意識する必要はないとされています。',
          hasCategories: true
        },
        {
          id: 'chasen',
          name: '茶筅・くせ直し',
          reading: 'ちゃせん',
          category: '点前道具',
          image: '/images/chasen.jpg',
          shortDescription: '抹茶を点てるための竹製の道具。細かく割った竹の穂先で、お茶をかき混ぜて泡立てます。',
          longDescription: '茶筅は濃茶を練り薄茶を点てる際に用いる竹製の道具です。各流儀によって白竹、紫竹、黒竹、油竹（煤竹）などで作られています。竹製のものがほとんどですが、最近では樹脂製のものなどもあります。穂の数によっても種類があり、穂の少ないものから荒穂、数穂、八十本立、百本立などがあり、通常は数穂を用います。深めの茶碗（筒茶碗）に用いることができる長穂もあります。茶筅直し（くせ直し）を用いることによって長く使うことも出来ます。くせ直しとは、茶筅の穂先のくせをなおし、整えるものです。'
        },
        {
          id: 'chashaku',
          name: '茶杓',
          reading: 'ちゃしゃく',
          category: '点前道具',
          image: '/images/chashaku.jpg',
          shortDescription: '抹茶をすくう竹製のスプーン。季節や趣向に合わせた「銘」がつけられることがあります。',
          longDescription: '茶杓は茶入や薄茶器から抹茶をすくって茶碗に入れるための道具で、茶匙とも呼ばれ、単に杓ともいいます。古くは鼈甲でできたものや、金属製のものもありました。また木地、塗りを施したもの、蒔絵のあるものなどもありますが、大半は竹製です。茶杓には銘がつけられ、茶杓を納める竹筒にその銘を墨書することがあります。'
        },
        {
          id: 'mizusashi',
          name: '水指',
          reading: 'みずさし',
          category: '点前道具',
          image: '/images/mizusashi.jpg',
          shortDescription: '茶席で使う水を入れる器。釜に水を足したり、茶碗をすすぐための水を入れておきます。',
          longDescription: '水指は点前の際に使用する清水を入れておく容器です。釜に水を足したり、茶碗をすすぐための水を入れておきます。陶磁器、金属、ガラスなどで作られ、蓋付きのものが一般的です。季節や趣向に合わせて選び、格の高い茶事では重要な道具となります。'
        },
        {
          id: 'natsume',
          name: '棗',
          reading: 'なつめ',
          category: '点前道具',
          image: '/images/natsume.jpg',
          shortDescription: '薄茶の抹茶を入れる容器。棗の実に形が似ていることから名付けられました。',
          longDescription: '棗は薄茶用の抹茶を入れておく容器のことです。その形状が植物のナツメの実に類似していたことから棗と呼ばれるようになりました。素材としては、木地をはじめ竹などです。稀に、焼き物を使用している場合もあります。表面は漆塗りが一般的であり、柄はシンプルな無地から絵巻物、季節の花々まで多種多様です。大きさで、千利休が好み使っていた利休形と呼ばれる大棗、中棗、小棗が基本です。平棗と呼ばれる、碁笥のように全体が平べったいものもあります。茶道は四季折々のお菓子、花、掛け軸を楽しみながら抹茶をいただきます。棗は季節感を出しやすい道具です。抹茶は温度や湿度の変化に敏感なので、保存次第では急速に劣化が進みます。これを防ぐためには適切な茶器を選び、取り扱いにも細心の注意を払う必要があります。'
        },
        {
          id: 'chaire',
          name: '茶入',
          reading: 'ちゃいれ',
          category: '点前道具',
          image: '/images/chaire.jpg',
          shortDescription: '濃茶の抹茶を入れる陶製の容器。茶道具の中でも特に格が高いとされます。',
          longDescription: '茶入は濃茶用の抹茶を入れておく陶器製の容器のことです。茶入は、唐物と和物に大別され、他に東南アジア製の南蛮物と称されるものもあります。唐物茶入は、その器形によって、肩衝、茄子、大海（だいかい）、驢蹄（ろてい）などと分類されています。なお、唐物茶入のうち、時代が古く、作も上手（じょうて）のものを、特に漢作（かんさく）と称します。和物茶入は、美濃窯で焼かれた瀬戸茶入と、他の国焼茶入の二つに分けることが通例とされています。'
        },
        {
          id: 'hishaku',
          name: '柄杓',
          reading: 'ひしゃく',
          category: '点前道具',
          image: '/images/hishaku.jpg',
          shortDescription: '湯や水をすくうための竹製の柄の長い道具。',
          longDescription: '柄杓は竹製の柄のついた道具で、水指から湯や水を汲むために用います。柄の長さは約40cmで、湯を汲む動作も美しさの一つとされています。節の位置や合の大きさに規定があり、茶道の所作において重要な役割を果たします。'
        },
        {
          id: 'futaoki',
          name: '蓋置',
          reading: 'ふたおき',
          category: '点前道具',
          image: '/images/futaoki.jpg',
          shortDescription: '釜の蓋や柄杓を置くための小さな道具。竹や陶器で作られます。',
          longDescription: '蓋置は釜の蓋や柄杓を置くための小さな台です。竹製と陶器製があり、三つ足が一般的です。サイズは小さいですが重要な役割を果たし、季節によって使い分けられます。'
        },
        {
          id: 'kama',
          name: '釜・風炉',
          reading: 'かま・ふろ',
          category: '点前道具',
          image: '/images/kama.jpg',
          shortDescription: 'お湯を沸かすための鉄製の釜。風炉または炉に掛けて使います。',
          longDescription: '釜は湯を沸かすための鉄製の道具で、風炉は炉の季節以外に使用する炉のことです。小釜、置炉釜、釣釜、炉釜など様々な種類があります。鉄瓶や透木釜なども含まれ、茶道において湯を沸かす音色も重要な要素となります。季節によって形が異なり、釜の形や音色も楽しみの一つです。有名な釜師の作品は高価で珍重されます。'
        },
        {
          id: 'kensui',
          name: '建水',
          reading: 'けんすい',
          category: '点前道具',
          image: '/images/kensui.jpg',
          shortDescription: '使った湯や水を捨てるための器。「こぼし」とも呼ばれます。',
          longDescription: '建水は茶碗をすすいだお湯や水を捨てるための容器です。金属、陶器、竹などで作られ、茶碗を温めた湯や茶筅をすすいだ水を捨てます。形は丸いものや四角いものがあります。'
        },
        {
          id: 'chakin',
          name: '茶巾',
          reading: 'ちゃきん',
          category: '点前道具',
          image: '/images/chakin.jpg',
          shortDescription: '茶碗を拭くための白い麻の布。清潔さを保つための大切な道具です。',
          longDescription: '茶巾は麻でできた布で、茶碗を拭き清めるために用います。白い麻や綿で作られ、使用前にお湯で湿らせます。茶碗の飲み口を拭い、使用後は必ず洗って清潔に保つことが大切です。'
        },
        {
          id: 'kakemono',
          name: '掛物',
          reading: 'かけもの',
          category: '点前道具',
          image: '/images/kakemono.jpg',
          shortDescription: '茶室の床の間に掛けられる軸装された書画。亭主の意図や季節感を表現します。',
          longDescription: '掛物は茶室の床の間に掛けられる軸装された書画です。お客様が茶室へ入り一番初めに拝見するもので、茶事・茶会において、掛物は亭主の意図するところや、季節感を端的に表現する第一のもので大切なお道具です。掛物は紙や裂で表装して掛けるように仕立てられたものをいいますが、大きくは「書蹟」と「絵画」、そして両者が一体となった「画賛」に分けられます。数寄者の間では「開炉一行、春懐紙、夏は短冊、秋は文」とも言われています。墨跡、一行物、横物、懐紙、短冊、色紙、画賛など様々な形式があります。掛物はその作者が最も重要とされていますが、四季それぞれに合わせた季節感も大切です。'
        },
        {
          id: 'sensu',
          name: '扇子',
          reading: 'せんす',
          category: '客の道具',
          image: '/images/sensu.jpg',
          shortDescription: '茶席に招かれたお客様が持つもの。広げて扇ぐためではなく、挨拶などで使います。',
          longDescription: '扇子は茶道のお稽古を始める場合、まず用意しなければならないものです。茶道で用いる扇子は、茶席に招かれたお客様が持つもので、広げて扇ぐために使うのではなく、挨拶などで使います。流派によって扇子の使い方やサイズなどが異なりますので、事前ご確認の上、流派に合った扇子をお選びください。'
        },
        {
          id: 'kaishi',
          name: '懐紙',
          reading: 'かいし',
          category: '客の道具',
          image: '/images/kaishi.jpg',
          shortDescription: 'お菓子を食べる時のお皿代わりや、茶碗を拭うのに使用する紙。',
          longDescription: '懐紙は懐中紙、すなわち茶室用の小菊紙のことです。お菓子を食べる時のお皿代わりにしたり、お茶を飲んだ後の茶碗を拭うのに使用します。茶道においてお菓子を置くお皿代わりに使用したりする欠かせない道具の1つで、基本的には使い捨てです。また、茶道以外にも活用できるシーンが多いアイテムで、多めに購入しておくと便利ですし安心でしょう。季節ごとに絵柄を使い分けるのもお洒落ですね。'
        },
        {
          id: 'yoji',
          name: '楊枝・菓子切り',
          reading: 'ようじ・かしきり',
          category: '客の道具',
          image: '/images/yoji.jpg',
          shortDescription: '茶道で出された菓子を一口大に切り分ける道具。',
          longDescription: '楊枝、菓子切り、黒文字は、茶道において出された菓子を一口大に切り分ける道具です。元来、クロモジというクスノキ科の木の枝を材料としていたことから、楊枝自体を「黒文字」と呼ぶことがあります。木製のものに加え、竹製、ステンレス製、プラスチック製のものもあります。茶道で用いるだけでなく、自宅でお客様にお菓子をお出しする際、フォークの代わりに菓子切りを添えるだけで、趣のある特別な時間を過ごしていただけます。'
        },
        {
          id: 'fukusa',
          name: '帛紗',
          reading: 'ふくさ',
          category: '客の道具',
          image: '/images/fukusa.jpg',
          shortDescription: '点前の中で道具を清めたり、釜の蓋をとるときに使う布。',
          longDescription: '帛紗は、点前の中で道具を清めたり、釜の蓋をとるときに使う布です。茶道では、ふくさを服紗や帛紗と表記します。袱紗という表記は使いません。大きさは縦が約28.5cm、横が約27.5cmです。服紗を腰につけるのは、亭主です。一方、客は着物の胸元に服紗を懐中しておきます。帛紗の布地は、正絹だけではなく人絹の服紗もあります。正絹の塩瀬か羽二重などの生地で作られ、重さは匁（もんめ）で表記しています。匁は重さの単位で、1匁は3.75グラムです。初心者には正絹帛紗7匁がさばきやすくおすすめです。色については、男性は紫、女性は朱色（表千家）か赤色（裏千家）を使用します。'
        },
        {
          id: 'kobukusa',
          name: '古帛紗',
          reading: 'こぶくさ',
          category: '客の道具',
          image: '/images/kobukusa.jpg',
          shortDescription: '濃茶を飲むときや、道具を拝見するときなどに使う小さな布。',
          longDescription: '古帛紗は濃茶を飲むときや、道具を拝見するときなどに使います。金襴、緞子などいろいろな織物で作られています。'
        },
        {
          id: 'fukusabasami',
          name: '帛紗挟み・数奇屋袋',
          reading: 'ふくさばさみ・すきやぶくろ',
          category: '客の道具',
          image: '/images/fukusabasami.jpg',
          shortDescription: '茶席で必要な持ち物一式を入れておくための袋。',
          longDescription: '帛紗挟みと数奇屋袋は、茶席で必要な持ち物一式を入れておくためのものです。懐紙、扇子、楊枝、古帛紗などをまとめて携帯でき、茶会への参加に欠かせない道具です。'
        }
      ]
    },
    en: {
      title: 'Tea Utensils',
      subtitle: 'Tools Used in Tea Ceremony',
      intro: 'Various utensils are used in the tea ceremony, each with its own meaning and purpose. They harmonize beauty and functionality.',
      detailsLabel: 'Details',
      tools: [
        {
          id: 'chawan',
          name: 'Chawan',
          reading: 'Tea Bowl',
          category: 'Tea Preparation',
          image: '/images/chawan.jpg',
          shortDescription: 'The vessel into which the host pours their greatest care, used for preparing and drinking tea.',
          longDescription: 'The tea bowl is one of the most important utensils in tea ceremony. More than just a drinking vessel, the tea bowl is appreciated as part of the ceremony\'s ritual. It also serves to express seasonal themes in the tea room. The tea bowl exists as a work of art, reflecting the host\'s taste, character, and spirit. In the tea world, "First Raku, Second Hagi, Third Karatsu" has been said since ancient times, with Raku ware (Kyoto), Hagi ware (Yamaguchi), and Karatsu ware (Saga) being preferred as high-ranking tea bowls. For thick tea, high-ranking bowls such as Raku, Hagi, Karatsu, and Ido are preferred. For thin tea, rank is not particularly emphasized.',
          hasCategories: true
        },
        {
          id: 'chasen',
          name: 'Chasen',
          reading: 'Tea Whisk',
          category: 'Tea Preparation',
          image: '/images/chasen.jpg',
          shortDescription: 'A bamboo tool for whisking matcha. Fine split bamboo bristles mix and froth the tea.',
          longDescription: 'The tea whisk is a bamboo tool used to mix thick tea and whisk thin tea. Made from white bamboo, purple bamboo, black bamboo, or smoked bamboo depending on the school. While most are bamboo, some modern versions use resin. Types vary by the number of prongs, from coarse to fine, 80-prong, 100-prong varieties. Long-bristled whisks are also available for deep bowls (cylindrical bowls). A whisk rest (kusenaoshi) helps maintain its shape and extends its life.'
        },
        {
          id: 'chashaku',
          name: 'Chashaku',
          reading: 'Tea Scoop',
          category: 'Tea Preparation',
          image: '/images/chashaku.jpg',
          shortDescription: 'A bamboo scoop for measuring tea. Often given poetic names related to seasons.',
          longDescription: 'The tea scoop is used to transfer matcha from the tea container to the bowl. Also called chasa or simply shaku. Historically made from tortoiseshell or metal, but now primarily bamboo. Some feature lacquer or maki-e decoration. Tea scoops are often given poetic names, which may be written on the bamboo tube that stores them.'
        },
        {
          id: 'mizusashi',
          name: 'Mizusashi',
          reading: 'Fresh Water Container',
          category: 'Tea Preparation',
          image: '/images/mizusashi.jpg',
          shortDescription: 'A container for fresh water. Water is added to the kettle or used to rinse the tea bowl.',
          longDescription: 'The mizusashi holds fresh water used during the tea ceremony. It provides water to add to the kettle or rinse the tea bowl. Made of ceramics, metal, or glass, usually with a lid. Selected according to season and occasion, it is an important utensil in formal tea ceremonies.'
        },
        {
          id: 'natsume',
          name: 'Natsume',
          reading: 'Tea Caddy for Thin Tea',
          category: 'Tea Preparation',
          image: '/images/natsume.jpg',
          shortDescription: 'A container for thin tea powder. Named after the jujube fruit due to its similar shape.',
          longDescription: 'Natsume is a container for thin tea powder. Named after the jujube fruit due to its similar shape. Usually made of wood or bamboo, with lacquered surfaces being most common. Decorations range from simple plain finishes to elaborate designs and seasonal flowers. Sizes include large, medium, and small natsume based on Rikyu\'s preferred form. Flat natsume, resembling a go stone container, also exists. Tea ceremony involves enjoying seasonal sweets, flowers, and scrolls while drinking matcha. Natsume are excellent for expressing seasonal themes. Since matcha is sensitive to temperature and humidity changes, proper storage containers with tight-fitting lids must be selected and handled with care.'
        },
        {
          id: 'chaire',
          name: 'Chaire',
          reading: 'Tea Caddy for Thick Tea',
          category: 'Tea Preparation',
          image: '/images/chaire.jpg',
          shortDescription: 'A ceramic container for thick tea. Considered particularly prestigious among tea utensils.',
          longDescription: 'Chaire is a ceramic container for thick tea powder. Divided into Chinese (karamono) and Japanese (wamono) origins, with some Southeast Asian (nanbamono) pieces. Chinese chaire are classified by shape: katatsuki, nasu, taikai, rotei. Particularly old and excellent pieces are called kansaku. Japanese chaire are typically divided into Seto ware from Mino kilns and other domestic kilns.'
        },
        {
          id: 'hishaku',
          name: 'Hishaku',
          reading: 'Ladle',
          category: 'Tea Preparation',
          image: '/images/hishaku.jpg',
          shortDescription: 'A bamboo tool with a long handle for scooping hot water.',
          longDescription: 'A bamboo ladle with a long handle used to scoop hot water from the mizusashi. The handle is approximately 40cm long. The motion of scooping water is considered part of the ceremony\'s beauty. Specific regulations govern the joint position and cup size, playing an important role in tea ceremony movements.'
        },
        {
          id: 'futaoki',
          name: 'Futaoki',
          reading: 'Lid Rest',
          category: 'Tea Preparation',
          image: '/images/futaoki.jpg',
          shortDescription: 'A small utensil for resting the kettle lid or ladle. Made of bamboo or ceramics.',
          longDescription: 'A small stand for resting the kettle lid or ladle. Available in bamboo and ceramic, usually with three legs. Though small, it plays an important role and different types are used for different seasons.'
        },
        {
          id: 'kama',
          name: 'Kama & Furo',
          reading: 'Kettle & Brazier',
          category: 'Tea Preparation',
          image: '/images/kama.jpg',
          shortDescription: 'An iron kettle for boiling water. Placed on a furo (brazier) or ro (hearth).',
          longDescription: 'The kettle is an iron vessel for boiling water, while the furo is a brazier used outside of hearth season. Types include small kettles, placed brazier kettles, hanging kettles, and hearth kettles. Iron teapots and openwork kettles are also included. The sound of boiling water is an important element in tea ceremony. Shapes vary by season, and both the form and sound are appreciated. Works by famous kettle makers are valuable and highly prized.'
        },
        {
          id: 'kensui',
          name: 'Kensui',
          reading: 'Waste Water Container',
          category: 'Tea Preparation',
          image: '/images/kensui.jpg',
          shortDescription: 'A container for discarding used water. Also called "koboshi".',
          longDescription: 'A container for discarding used water from rinsing the tea bowl. Made of metal, ceramics, or bamboo. Used to discard water from warming the bowl and rinsing the whisk. Available in round or square shapes.'
        },
        {
          id: 'chakin',
          name: 'Chakin',
          reading: 'Tea Cloth',
          category: 'Tea Preparation',
          image: '/images/chakin.jpg',
          shortDescription: 'A white linen cloth for wiping the tea bowl. Essential for maintaining cleanliness.',
          longDescription: 'A linen cloth for wiping and purifying the tea bowl. Made of white linen or cotton, moistened with hot water before use. Used to wipe the rim of the tea bowl. Must be washed and kept clean after use.'
        },
        {
          id: 'kakemono',
          name: 'Kakemono',
          reading: 'Hanging Scroll',
          category: 'Tea Preparation',
          image: '/images/kakemono.jpg',
          shortDescription: 'A mounted scroll hung in the alcove. Expresses the host\'s intention and seasonal feeling.',
          longDescription: 'A mounted scroll hung in the alcove of the tea room. The first thing guests view upon entering, it is an important tool that clearly expresses the host\'s intention and seasonal feeling in tea ceremonies. Broadly divided into calligraphy, paintings, and combinations (gasan). Among tea practitioners, the saying goes: "Single line for hearth opening, kaishi for spring, strips for summer, letter for autumn." Various forms include bokuseki, single-line pieces, horizontal pieces, kaishi, tanzaku, shikishi, and gasan. The creator is most important, but seasonal appropriateness is also essential.'
        },
        {
          id: 'sensu',
          name: 'Sensu',
          reading: 'Folding Fan',
          category: 'Guest Items',
          image: '/images/sensu.jpg',
          shortDescription: 'Carried by guests invited to tea gatherings. Used for greetings, not fanning.',
          longDescription: 'The folding fan is one of the first items to prepare when beginning tea practice. Used by guests invited to tea gatherings, not for fanning but for greetings. Usage and size vary by school, so confirmation is recommended before selecting.'
        },
        {
          id: 'kaishi',
          name: 'Kaishi',
          reading: 'Pocket Paper',
          category: 'Guest Items',
          image: '/images/kaishi.jpg',
          shortDescription: 'Paper used as a plate substitute for sweets or to wipe the tea bowl.',
          longDescription: 'Kaishi refers to pocket paper, specifically small chrysanthemum paper for the tea room. Used as a plate substitute for sweets or to wipe the tea bowl after drinking. An indispensable tool in tea ceremony, basically disposable. Also useful in many scenarios outside tea ceremony. Purchasing extras is convenient and reassuring. Using seasonal designs is also stylish.'
        },
        {
          id: 'yoji',
          name: 'Yoji & Kashikiri',
          reading: 'Pick & Cake Cutter',
          category: 'Guest Items',
          image: '/images/yoji.jpg',
          shortDescription: 'Tools for cutting sweets served in tea ceremony into bite-sized pieces.',
          longDescription: 'Yoji, kashikiri, and kuromoji are tools for cutting sweets served in tea ceremony into bite-sized pieces. Originally made from kuromoji tree branches (in the laurel family), the picks themselves are sometimes called "kuromoji." Available in wood, bamboo, stainless steel, and plastic. Beyond tea ceremony use, adding a kashikiri when serving sweets to guests at home creates a special, elegant moment instead of using forks.'
        },
        {
          id: 'fukusa',
          name: 'Fukusa',
          reading: 'Silk Cloth',
          category: 'Guest Items',
          image: '/images/fukusa.jpg',
          shortDescription: 'A cloth used to purify utensils and handle the kettle lid during preparation.',
          longDescription: 'Fukusa is a cloth used to purify utensils and handle the kettle lid during preparation. In tea ceremony, written as fukusa or hakusa. Approximately 28.5cm vertical by 27.5cm horizontal. The host tucks it at the waist, while guests keep it in the breast fold of their kimono. Made from pure silk crepe or habutae fabric, or synthetic silk. Weight measured in monme (3.75 grams per monme). For beginners, 7-monme pure silk fukusa is recommended for easy handling. Color-wise, men use purple, women use vermillion (Omotesenke) or red (Urasenke).'
        },
        {
          id: 'kobukusa',
          name: 'Kobukusa',
          reading: 'Small Silk Cloth',
          category: 'Guest Items',
          image: '/images/kobukusa.jpg',
          shortDescription: 'A small cloth used when drinking thick tea or examining utensils.',
          longDescription: 'Kobukusa is used when drinking thick tea or examining utensils. Made from various fabrics including gold brocade and damask.'
        },
        {
          id: 'fukusabasami',
          name: 'Fukusabasami & Sukiyabukuro',
          reading: 'Silk Pouch',
          category: 'Guest Items',
          image: '/images/fukusabasami.jpg',
          shortDescription: 'Pouches for carrying all necessary items to a tea gathering.',
          longDescription: 'Fukusabasami and sukiyabukuro are pouches for carrying all necessary items to a tea gathering. They hold kaishi, sensu, yoji, kobukusa and other items, making them indispensable for tea ceremony attendance.'
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
        
        .category-btn {
          background: white;
          border: 1px solid rgba(127, 166, 127, 0.3);
          transition: all 0.3s ease;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
        }
        
        .category-btn:hover {
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
              {selectedTool.shortDescription}
            </p>
            
            <h3 className="font-display text-2xl font-semibold mb-4 text-matcha">
              {t.detailsLabel}
            </h3>
            <p className="text-base text-ink/80 leading-relaxed mb-6">
              {selectedTool.longDescription}
            </p>
            
            {/* 茶碗のカテゴリボタン */}
            {selectedTool.hasCategories && (
              <div className="mt-8">
                <h3 className="font-display text-2xl font-semibold mb-4 text-matcha">
                  {language === 'ja' ? '茶碗の種類' : 'Types of Tea Bowls'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {chawanCategories.map((category) => (
                    <button
                      key={category.id}
                      className="category-btn font-medium text-sm"
                    >
                      <div className="text-center">
                        <div className="font-bold">{category.name}</div>
                        <div className="text-xs text-ink/60">{category.reading}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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

export default Tools;