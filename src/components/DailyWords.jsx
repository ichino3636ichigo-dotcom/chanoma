import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CHASHAKU_MONTHS_JA } from '../data/chashakuMei';
import { ZEN_PHRASES } from '../data/zengo';

// ─────────────────────────────────────────────────────────────
// ホームの「今日のことば」
// 禅語は掛け軸、茶杓の銘は短冊に見立てて縦書きで飾る。
// 日本時間の日付で毎日入れ替わり、季節ごとに色合いが変わる。
// ─────────────────────────────────────────────────────────────

const MONTH_NAMES = ['睦月', '如月', '弥生', '卯月', '皐月', '水無月', '文月', '葉月', '長月', '神無月', '霜月', '師走'];
const SEASON_OF_MONTH = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];

// 季節の色（背景・中廻しの裂・文字のアクセント）
const PALETTE = {
  spring: { bg: '#f7eff0', glow: 'rgba(214, 150, 168, 0.22)', fabric: '#c98f9f', fabricDark: '#a86a7c', accent: '#9c5468', name: { ja: '春', en: 'Spring' } },
  summer: { bg: '#edf4f2', glow: 'rgba(110, 168, 170, 0.22)', fabric: '#7fb0ae', fabricDark: '#5a8d8b', accent: '#3d6f72', name: { ja: '夏', en: 'Summer' } },
  autumn: { bg: '#f6efe5', glow: 'rgba(196, 120, 72, 0.2)', fabric: '#bf7f52', fabricDark: '#9c6038', accent: '#8f4a26', name: { ja: '秋', en: 'Autumn' } },
  winter: { bg: '#eef0f1', glow: 'rgba(120, 138, 156, 0.2)', fabric: '#8a97a4', fabricDark: '#6a7784', accent: '#475565', name: { ja: '冬', en: 'Winter' } },
};

const TEXT = {
  ja: {
    title: '今日のことば',
    zengo: '今日の禅語',
    mei: '今日の茶杓の銘',
    moreZengo: '禅語をもっと見る',
    moreMei: '茶杓の銘をもっと見る',
  },
  en: {
    title: 'Words for Today',
    zengo: 'Zen phrase of the day',
    mei: 'Tea scoop name of the day',
    moreZengo: 'More Zen phrases',
    moreMei: 'More tea scoop names',
  },
};

const KANJI_DIGITS = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const toKanji = (n) => {
  if (n < 10) return KANJI_DIGITS[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${tens === 1 ? '' : KANJI_DIGITS[tens]}十${KANJI_DIGITS[ones]}`;
};

// 日本時間の今日
const todayInJapan = () => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'numeric', day: 'numeric' })
    .formatToParts(new Date())
    .reduce((acc, p) => ({ ...acc, [p.type]: Number(p.value) }), {});
  const dayOfYear = Math.round((Date.UTC(parts.year, parts.month - 1, parts.day) - Date.UTC(parts.year, 0, 1)) / 86400000);
  return { year: parts.year, month: parts.month, day: parts.day, dayOfYear };
};

// 今日がどの二十四節気に入っているか（茶杓の銘データの「立冬（11/7頃）」から読み取る）
const currentSekki = (month, day) => {
  const parse = (m) =>
    (CHASHAKU_MONTHS_JA.find((x) => x.month === m)?.sekki || []).map((s) => {
      const name = s.split('（')[0];
      const d = Number((s.match(/\/(\d+)/) || [])[1]);
      return { name, day: d };
    });
  const thisMonth = parse(month).filter((s) => s.day && s.day <= day);
  if (thisMonth.length) return thisMonth[thisMonth.length - 1].name;
  const prev = parse(month === 1 ? 12 : month - 1);
  return prev.length ? prev[prev.length - 1].name : '';
};

// 和紙の質感（細かいノイズ）
const WASHI =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// 短冊の金砂子
const KINSUNAGO = [
  'radial-gradient(circle at 18% 12%, rgba(201, 162, 39, 0.55) 0 1.5px, transparent 2px)',
  'radial-gradient(circle at 72% 8%, rgba(201, 162, 39, 0.45) 0 1px, transparent 1.6px)',
  'radial-gradient(circle at 40% 20%, rgba(201, 162, 39, 0.4) 0 1.2px, transparent 1.8px)',
  'radial-gradient(circle at 82% 26%, rgba(201, 162, 39, 0.5) 0 1.4px, transparent 2px)',
  'radial-gradient(circle at 25% 88%, rgba(201, 162, 39, 0.45) 0 1.2px, transparent 1.8px)',
  'radial-gradient(circle at 66% 94%, rgba(201, 162, 39, 0.55) 0 1.6px, transparent 2.2px)',
  'radial-gradient(circle at 50% 80%, rgba(201, 162, 39, 0.35) 0 1px, transparent 1.6px)',
  'linear-gradient(180deg, rgba(212, 175, 55, 0.18), transparent 22%, transparent 78%, rgba(212, 175, 55, 0.18))',
].join(', ');

const DailyWords = ({ language = 'ja' }) => {
  const t = TEXT[language] || TEXT.ja;
  const today = useMemo(todayInJapan, []);
  const season = SEASON_OF_MONTH[today.month - 1];
  const c = PALETTE[season];
  const sekki = useMemo(() => currentSekki(today.month, today.day), [today]);

  const mei = useMemo(() => {
    const list = CHASHAKU_MONTHS_JA.find((m) => m.month === today.month)?.mei || [];
    return list.length ? list[(today.day - 1) % list.length] : null;
  }, [today]);

  const zen = useMemo(() => {
    const pool = ZEN_PHRASES.filter((z) => z.season === season || z.season === 'yearRound');
    return pool.length ? pool[(today.dayOfYear * 7 + today.year) % pool.length] : null;
  }, [today, season]);

  if (!mei && !zen) return null;

  const dateLabel =
    language === 'ja'
      ? `${MONTH_NAMES[today.month - 1]}　${toKanji(today.day)}日`
      : new Date(today.year, today.month - 1, today.day).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <section
      className="dw relative overflow-hidden py-20 md:py-28 px-6"
      style={{
        backgroundColor: c.bg,
        backgroundImage: `radial-gradient(ellipse at 15% 0%, ${c.glow}, transparent 55%), radial-gradient(ellipse at 90% 100%, ${c.glow}, transparent 50%), ${WASHI}`,
        '--dw-accent': c.accent,
        '--dw-fabric': c.fabric,
        '--dw-fabric-dark': c.fabricDark,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap');
        .dw { font-family: 'Noto Serif JP', 'Crimson Pro', serif; color: #1a1a1a; }
        .dw-tate { writing-mode: vertical-rl; text-orientation: upright; letter-spacing: 0.18em; }
        /* 掛け軸・短冊の文字は毛筆風（読み込めないときは明朝で表示） */
        .dw-brush { font-family: 'Yuji Syuku', 'Noto Serif JP', serif; font-weight: 400; color: #141414; }
        .dw-accent { color: var(--dw-accent); }
        .dw-soft { color: rgba(26, 26, 26, 0.68); }
        .dw-faint { color: rgba(26, 26, 26, 0.48); }

        /* 掛け軸 */
        .dw-scroll { width: min(100%, 210px); margin: 0 auto; filter: drop-shadow(0 18px 24px rgba(40, 40, 40, 0.18)); }
        .dw-cord { display: block; margin: 0 auto -2px; }
        .dw-ten, .dw-chi { background-color: #e9dcc3; background-image: ${WASHI}; position: relative; }
        .dw-ten { height: 54px; }
        .dw-chi { height: 64px; }
        .dw-futai { position: absolute; top: 0; width: 9px; height: 100%; background: var(--dw-fabric); opacity: 0.9; }
        .dw-naka { background: var(--dw-fabric); padding: 14px 12px; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 7px); }
        .dw-honshi { position: relative; background-color: #fbf8f1; background-image: ${WASHI}; min-height: 290px; display: flex; align-items: center; justify-content: center; padding: 22px 8px; }
        .dw-ichi { border-top: 3px solid var(--dw-fabric-dark); border-bottom: 3px solid var(--dw-fabric-dark); }
        .dw-jiku { height: 14px; margin: 0 -14px; border-radius: 9999px; background: linear-gradient(180deg, #4a3a2c, #2b211a 60%, #4a3a2c); }
        .dw-seal { position: absolute; left: 12px; bottom: 16px; width: 22px; height: 22px; border: 2px solid #b0392b; color: #b0392b; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center; border-radius: 3px; transform: rotate(-4deg); background: rgba(176, 57, 43, 0.06); }

        /* 短冊 */
        .dw-tanzaku-wrap { position: relative; width: 120px; margin: 0 auto; }
        .dw-tanzaku { width: 120px; height: 360px; border-radius: 3px; background-color: #fbf8f1; background-image: ${KINSUNAGO}, ${WASHI}; border: 1px solid rgba(201, 162, 39, 0.35); box-shadow: 0 18px 26px rgba(40, 40, 40, 0.14); display: flex; justify-content: center; padding: 34px 0 26px; position: relative; }
        .dw-tanzaku::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 14px; background: linear-gradient(90deg, var(--dw-fabric-dark), var(--dw-fabric)); opacity: 0.55; border-radius: 3px 3px 0 0; }

        .dw-more { display: inline-flex; align-items: center; font-size: 0.9rem; font-weight: 600; color: var(--dw-accent); }
        .dw-more:hover svg { transform: translateX(3px); }
        .dw-more svg { transition: transform 0.2s; }
        .dw-sekki { display: inline-block; padding: 0.2rem 0.9rem; border: 1px solid var(--dw-accent); color: var(--dw-accent); border-radius: 9999px; font-size: 0.85rem; letter-spacing: 0.2em; }
      `}</style>

      {/* 背景の円相 */}
      <svg aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-120px', top: '40px', width: 420, height: 420, opacity: 0.07 }} viewBox="0 0 200 200">
        <path d="M100 18 C 52 16, 16 54, 20 102 C 24 150, 70 184, 116 178 C 160 172, 188 134, 182 92 C 177 58, 150 32, 118 24" fill="none" stroke="#1a1a1a" strokeWidth="13" strokeLinecap="round" />
      </svg>

      <div className="relative max-w-5xl mx-auto">
        {/* 見出し */}
        <div className="text-center mb-12 md:mb-16">
          <p className="dw-accent text-lg md:text-xl tracking-[0.3em] mb-3">{dateLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-5">{t.title}</h2>
          {language === 'ja' && sekki && <span className="dw-sekki">{sekki}</span>}
          {language !== 'ja' && <span className="dw-sekki">{c.name.en}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
          {/* 今日の禅語：掛け軸 */}
          {zen && (
            <figure className="flex flex-col items-center text-center">
              <div className="dw-scroll">
                <svg className="dw-cord" width="120" height="36" viewBox="0 0 120 36" aria-hidden="true">
                  <path d="M60 2 L14 34 M60 2 L106 34" stroke="#6b5a45" strokeWidth="1.5" fill="none" />
                  <circle cx="60" cy="3" r="2.5" fill="#6b5a45" />
                </svg>
                <div className="dw-ten">
                  <span className="dw-futai" style={{ left: '32%' }}></span>
                  <span className="dw-futai" style={{ right: '32%' }}></span>
                </div>
                <div className="dw-naka">
                  <div className="dw-honshi dw-ichi">
                    <p className="dw-tate dw-brush" style={{ fontSize: zen.kanji.length > 4 ? '2.3rem' : '2.9rem', lineHeight: 1.1 }}>
                      {zen.kanji}
                    </p>
                    <span className="dw-seal dw-brush" aria-hidden="true" style={{ color: '#b0392b' }}>乃</span>
                  </div>
                </div>
                <div className="dw-chi"></div>
                <div className="dw-jiku"></div>
              </div>

              <figcaption className="mt-10 max-w-sm">
                <p className="dw-accent text-sm font-semibold tracking-[0.2em] mb-2">{t.zengo}</p>
                <p className="text-2xl font-bold mb-1">{zen.kanji}</p>
                <p className="dw-faint text-sm mb-4">{zen.reading}</p>
                <p className="dw-soft leading-loose text-left md:text-center">{zen.meaning}</p>
                <Link to="/zengo" className="dw-more mt-5">
                  {t.moreZengo}
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </figcaption>
            </figure>
          )}

          {/* 今日の茶杓の銘：短冊 */}
          {mei && (
            <figure className="flex flex-col items-center text-center">
              <div className="dw-tanzaku-wrap" style={{ marginTop: 36 }}>
                <div className="dw-tanzaku">
                  <div className="flex flex-row-reverse items-start gap-2">
                    <p className="dw-tate dw-brush" style={{ fontSize: mei.name.length > 3 ? '2.3rem' : '2.7rem', lineHeight: 1.1 }}>
                      {mei.name}
                    </p>
                    <p className="dw-tate dw-faint" style={{ fontSize: '0.8rem', letterSpacing: '0.25em', marginTop: '0.4rem' }}>
                      {mei.reading}
                    </p>
                  </div>
                </div>
                {/* 茶杓 */}
                <svg aria-hidden="true" width="190" height="34" viewBox="0 0 190 34" style={{ position: 'absolute', left: '50%', bottom: '-30px', transform: 'translateX(-50%) rotate(-6deg)' }}>
                  <path d="M6 22 C 10 12, 22 10, 34 16 L 182 22 L 182 27 L 34 22 C 24 22, 12 28, 6 22 Z" fill="#c9a46a" />
                  <path d="M88 19 L 88 25" stroke="#8f6a37" strokeWidth="1.5" />
                  <path d="M34 18 L 180 23.5" stroke="rgba(120, 85, 40, 0.35)" strokeWidth="0.8" />
                </svg>
              </div>

              <figcaption className="mt-16 max-w-sm">
                <p className="dw-accent text-sm font-semibold tracking-[0.2em] mb-2">{t.mei}</p>
                <p className="text-2xl font-bold mb-1">{mei.name}</p>
                <p className="dw-faint text-sm mb-4">{mei.reading}</p>
                <p className="dw-soft leading-loose">{mei.meaning}</p>
                {mei.notes && <p className="dw-faint text-sm mt-1">{mei.notes}</p>}
                <Link to="/chashaku" className="dw-more mt-5">
                  {t.moreMei}
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
};

export default DailyWords;
