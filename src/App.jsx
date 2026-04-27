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

// ── 占いコメント ────────────────────────────────────────────
const FORTUNE_COMMENTS = {
  top:    ['今日は流れが味方してくれる日。思いきって前に出て◎', 'すべての星があなたを応援しています。自信を持って進んで。', 'ラッキーな出会いや発見がありそうな日。アンテナ高く！'],
  upper:  ['好調な流れが続いています。大切なことに集中すると吉。', '直感が冴えています。ひらめいたことを大切にして。', 'いつもより少し丁寧に過ごすと、いいことが返ってきそう。'],
  middle: ['大きな変化より、いつものことを丁寧に整えるとよさそう。', 'コツコツ積み重ねることが、やがて大きな実りになります。', 'ゆっくり自分のペースで。焦らずに進めれば大丈夫。'],
  lower:  ['無理に進めるより、今日は守りの日。小さく整えるだけで大丈夫。', '明日に向けて準備をするのに最適な日。充電しておいて。', 'ゆっくり自分と向き合う時間を作って。それが明日の力に。'],
};

// ── Seed ユーティリティ ─────────────────────────────────────
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickFromArray(arr, seed) {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function getFortuneComment(rank, seed) {
  if (rank <= 3)  return pickFromArray(FORTUNE_COMMENTS.top,    seed);
  if (rank <= 6)  return pickFromArray(FORTUNE_COMMENTS.upper,  seed);
  if (rank <= 9)  return pickFromArray(FORTUNE_COMMENTS.middle, seed);
  return pickFromArray(FORTUNE_COMMENTS.lower, seed);
}

function generateRanking(seed) {
  return seededShuffle(ZODIACS.map(z => z.id), seed).map((id, i) => {
    const rank = i + 1;
    return {
      zodiacId: id,
      rank,
      comment: getFortuneComment(rank, seed + hashString(id)),
    };
  });
}

// ── TOP3 カードのスタイル ───────────────────────────────────
const RANK_STYLE = {
  1: { bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '#f59e0b', medal: '🥇' },
  2: { bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', border: '#94a3b8', medal: '🥈' },
  3: { bg: 'linear-gradient(135deg, #fff7ed, #fde8d0)', border: '#fb923c', medal: '🥉' },
};

// ── コンポーネント ──────────────────────────────────────────
function Top3Card({ entry }) {
  const z = ZODIACS.find(z => z.id === entry.zodiacId);
  const style = RANK_STYLE[entry.rank];

  return (
    <div style={{
      background: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '2rem' }}>{style.medal}</span>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{z.symbol} {z.name}</div>
          <div style={{ fontSize: '0.75rem', color: '#888' }}>{z.date}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', fontStyle: 'italic' }}>
        「{entry.comment}」
      </p>
    </div>
  );
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

  const top3 = ranking.slice(0, 3);

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.3rem', margin: '0 0 4px' }}>🔮 今日のポケモン星座占い</h1>
        <p style={{ color: '#888', fontSize: '0.85rem' }}>{dateStr}</p>
      </div>

      <h2 style={{ fontSize: '1rem', marginBottom: '12px' }}>✨ 今日のラッキー星座 TOP3</h2>
      {top3.map(entry => <Top3Card key={entry.zodiacId} entry={entry} />)}

      <h2 style={{ fontSize: '1rem', margin: '24px 0 12px' }}>全ランキング</h2>
      <ol style={{ lineHeight: '2', paddingLeft: '20px' }}>
        {ranking.map(({ zodiacId, rank }) => {
          const z = ZODIACS.find(z => z.id === zodiacId);
          return <li key={zodiacId}>{z.symbol} {z.name}</li>;
        })}
      </ol>
    </div>
  );
}
