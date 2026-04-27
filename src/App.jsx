import { useState, useEffect } from 'react';

// ── 星座データ ──────────────────────────────────────────────
const ZODIACS = [
  { id: 'aries',       name: 'おひつじ座', symbol: '♈', date: '3/21〜4/19',   types: ['fire', 'fighting'] },
  { id: 'taurus',      name: 'おうし座',   symbol: '♉', date: '4/20〜5/20',   types: ['grass', 'ground'] },
  { id: 'gemini',      name: 'ふたご座',   symbol: '♊', date: '5/21〜6/21',   types: ['electric', 'flying'] },
  { id: 'cancer',      name: 'かに座',     symbol: '♋', date: '6/22〜7/22',   types: ['water', 'ice'] },
  { id: 'leo',         name: 'しし座',     symbol: '♌', date: '7/23〜8/22',   types: ['fire', 'normal'] },
  { id: 'virgo',       name: 'おとめ座',   symbol: '♍', date: '8/23〜9/22',   types: ['grass', 'psychic'] },
  { id: 'libra',       name: 'てんびん座', symbol: '♎', date: '9/23〜10/23',  types: ['fairy', 'flying'] },
  { id: 'scorpio',     name: 'さそり座',   symbol: '♏', date: '10/24〜11/22', types: ['poison', 'ghost'] },
  { id: 'sagittarius', name: 'いて座',     symbol: '♐', date: '11/23〜12/21', types: ['dragon', 'flying'] },
  { id: 'capricorn',   name: 'やぎ座',     symbol: '♑', date: '12/22〜1/19',  types: ['rock', 'ground'] },
  { id: 'aquarius',    name: 'みずがめ座', symbol: '♒', date: '1/20〜2/18',   types: ['electric', 'psychic'] },
  { id: 'pisces',      name: 'うお座',     symbol: '♓', date: '2/19〜3/20',   types: ['water', 'fairy'] },
];

// ── Seed ユーティリティ ─────────────────────────────────────
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateRanking(seed) {
  const shuffledIds = seededShuffle(ZODIACS.map(z => z.id), seed);
  return shuffledIds.map((id, i) => ({
    zodiacId: id,
    rank: i + 1,
  }));
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [ranking, setRanking] = useState([]);

  const seed = getDailySeed();
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  useEffect(() => {
    setRanking(generateRanking(seed));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <h1>🔮 今日のポケモン星座占い</h1>
      <p style={{ color: '#888', marginBottom: '20px' }}>{dateStr}</p>

      <h2>今日のランキング</h2>
      <ol style={{ lineHeight: '2' }}>
        {ranking.map(({ zodiacId, rank }) => {
          const z = ZODIACS.find(z => z.id === zodiacId);
          return (
            <li key={zodiacId}>
              {rank}位　{z.symbol} {z.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
