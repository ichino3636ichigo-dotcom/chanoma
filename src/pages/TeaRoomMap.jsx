import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Globe, X } from 'lucide-react';

const TeaRoomMap = () => {
  const [language, setLanguage] = useState('ja');
  const [selectedPrefecture, setSelectedPrefecture] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);

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
      title: '茶室マップ',
      subtitle: '全国の茶室を探す',
      intro: '日本各地の茶室を検索できます。気になる茶室をクリックして詳細情報をご覧ください。',
      selectPrefecture: '都道府県を選択',
      allPrefectures: 'すべて',
      noResults: '該当する茶室が見つかりませんでした',
      details: {
        address: '住所',
        school: '流派',
        phone: '電話',
        website: 'ウェブサイト',
        description: '説明',
        viewOnMap: '地図で見る',
        close: '閉じる'
      }
    },
    en: {
      title: 'Tea Room Map',
      subtitle: 'Find Tea Rooms Across Japan',
      intro: 'Search for tea rooms throughout Japan. Click on a tea room to see detailed information.',
      selectPrefecture: 'Select Prefecture',
      allPrefectures: 'All',
      noResults: 'No tea rooms found',
      details: {
        address: 'Address',
        school: 'School',
        phone: 'Phone',
        website: 'Website',
        description: 'Description',
        viewOnMap: 'View on Map',
        close: 'Close'
      }
    }
  };

  const teaRooms = [
    {
      id: 1,
      name: '裏千家今日庵',
      prefecture: '京都府',
      address: '京都市上京区小川通寺之内上る本法寺前町613',
      school: '裏千家',
      phone: '075-431-3111',
      website: 'https://www.urasenke.or.jp/',
      description: '裏千家の家元。茶道裏千家の総本山として、伝統的な茶道文化を継承しています。',
      lat: 35.0386,
      lng: 135.7502,
      image: null
    },
    {
      id: 2,
      name: '表千家不審菴',
      prefecture: '京都府',
      address: '京都市上京区堀川通寺之内上る寺之内竪町682',
      school: '表千家',
      phone: '075-432-2195',
      website: 'https://www.omotesenke.jp/',
      description: '表千家の家元。千利休の茶道を正統に受け継ぐ、格式高い茶室です。',
      lat: 35.0392,
      lng: 135.7485,
      image: null
    },
    {
      id: 3,
      name: '武者小路千家官休庵',
      prefecture: '京都府',
      address: '京都市上京区武者小路通小川東入',
      school: '武者小路千家',
      phone: '075-411-1000',
      website: 'http://www.mushakouji-senke.or.jp/',
      description: '武者小路千家の家元。三千家の一つとして、独自の茶道文化を伝えています。',
      lat: 35.0365,
      lng: 135.7513,
      image: null
    },
    {
      id: 4,
      name: '高台寺遺芳庵',
      prefecture: '京都府',
      address: '京都市東山区高台寺下河原町526',
      school: '裏千家',
      phone: '075-561-9966',
      website: 'https://www.kodaiji.com/',
      description: '高台寺境内にある茶室。豊臣秀吉とねねゆかりの地で、美しい庭園と共に茶道体験ができます。',
      lat: 35.0009,
      lng: 135.7808,
      image: null
    },
    {
      id: 5,
      name: '大徳寺龍光院',
      prefecture: '京都府',
      address: '京都市北区紫野大徳寺町',
      school: '大徳寺派',
      phone: '075-491-7635',
      website: null,
      description: '大徳寺の塔頭寺院。国宝の茶室「密庵」を有し、禅と茶道の深い関わりを体現しています。',
      lat: 35.0481,
      lng: 135.7472,
      image: null
    },
    {
      id: 6,
      name: '金地院八窓席',
      prefecture: '京都府',
      address: '京都市左京区南禅寺福地町',
      school: '小堀遠州',
      phone: '075-771-3511',
      website: null,
      description: '小堀遠州作の国宝茶室。八つの窓から差し込む光が美しい、格調高い茶室です。',
      lat: 35.0115,
      lng: 135.7943,
      image: null
    }
  ];

  const t = content[language];
  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' }
  ];

  const prefectures = ['京都府', '東京都', '愛知県', '大阪府', '神奈川県'];

  const filteredRooms = selectedPrefecture === 'all' 
    ? teaRooms 
    : teaRooms.filter(room => room.prefecture === selectedPrefecture);

  const openGoogleMaps = (lat, lng, name) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
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
          cursor: pointer;
        }
        
        .content-card:hover {
          border-color: var(--matcha);
          box-shadow: 0 8px 30px rgba(127, 166, 127, 0.12);
          transform: translateY(-2px);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
          overflow-y: auto;
        }
        
        .modal-content {
          background: white;
          border-radius: 1rem;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
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

      {/* Search Section */}
      <section className="py-8 px-6 bg-white border-y border-matcha/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-ink/70">{t.selectPrefecture}</label>
            <select 
              value={selectedPrefecture}
              onChange={(e) => setSelectedPrefecture(e.target.value)}
              className="flex-1 max-w-xs bg-transparent border border-matcha rounded-full px-4 py-2 font-medium text-sm cursor-pointer hover:bg-matcha/5 transition-all"
            >
              <option value="all">{t.allPrefectures}</option>
              {prefectures.map(pref => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tea Rooms List */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink/50">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {filteredRooms.map(room => (
                <div 
                  key={room.id}
                  className="content-card p-6 rounded-2xl"
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="text-matcha flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{room.name}</h3>
                      <p className="text-sm text-ink/60 mb-1">{room.address}</p>
                      <div className="flex gap-3 text-xs text-matcha">
                        <span>{room.school}</span>
                        {room.prefecture && <span>• {room.prefecture}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Image Placeholder */}
            <div style={{
              width: '100%',
              height: '250px',
              background: 'linear-gradient(135deg, #7fa67f 0%, #5d7d5d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              borderRadius: '1rem 1rem 0 0'
            }}>
              画像準備中
            </div>

            <div className="p-6">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedRoom(null)}
                className="float-right text-ink/50 hover:text-ink transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{selectedRoom.name}</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink/50 font-semibold mb-1 flex items-center gap-2">
                    <MapPin size={14} />
                    {t.details.address}
                  </p>
                  <p className="text-sm text-ink/80">{selectedRoom.address}</p>
                </div>

                <div>
                  <p className="text-xs text-ink/50 font-semibold mb-1">{t.details.school}</p>
                  <p className="text-sm text-ink/80">{selectedRoom.school}</p>
                </div>

                {selectedRoom.phone && (
                  <div>
                    <p className="text-xs text-ink/50 font-semibold mb-1 flex items-center gap-2">
                      <Phone size={14} />
                      {t.details.phone}
                    </p>
                    <p className="text-sm text-ink/80">{selectedRoom.phone}</p>
                  </div>
                )}

                {selectedRoom.website && (
                  <div>
                    <p className="text-xs text-ink/50 font-semibold mb-1 flex items-center gap-2">
                      <Globe size={14} />
                      {t.details.website}
                    </p>
                    <a 
                      href={selectedRoom.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-matcha hover:underline"
                    >
                      {selectedRoom.website}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-xs text-ink/50 font-semibold mb-1">{t.details.description}</p>
                  <p className="text-sm text-ink/80 leading-relaxed">{selectedRoom.description}</p>
                </div>

                <button 
                  onClick={() => openGoogleMaps(selectedRoom.lat, selectedRoom.lng, selectedRoom.name)}
                  className="w-full mt-4 py-3 bg-matcha text-paper rounded-full font-medium hover:bg-matcha-dark transition-all"
                >
                  {t.details.viewOnMap}
                </button>
              </div>
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
        </div>
      </footer>
    </div>
  );
};

export default TeaRoomMap;