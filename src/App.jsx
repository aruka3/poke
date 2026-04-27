import { useState, useEffect } from 'react';
import './App.css';

// ── 初代151匹 タイプ別IDリスト ──────────────────────────────
const GEN1_BY_TYPE = {
  fire:     [4,5,6,37,38,58,59,77,78,126,136,146],
  fighting: [56,57,62,66,67,68,106,107],
  grass:    [1,2,3,43,44,45,46,47,69,70,71,102,103],
  ground:   [27,28,50,51,74,75,76,95,104,105,111,112],
  electric: [25,26,81,82,100,101,125,135,145],
  flying:   [12,16,17,18,21,22,41,42,83,84,85,123,142,144,146],
  water:    [7,8,9,54,55,60,61,72,73,79,80,86,87,90,91,98,99,116,117,118,119,120,121,130,131,134,138,139,140,141],
  fairy:    [35,36,39,40,122],
  poison:   [13,14,15,29,30,31,32,33,34,48,49,88,89,92,93,94],
  ghost:    [92,93,94],
  dragon:   [147,148,149],
  rock:     [74,75,76,95,111,112,138,139,140,141,142],
  psychic:  [63,64,65,79,80,96,97,121,122,124,150,151],
  ice:      [87,91,124,131,144],
  normal:   [16,17,18,19,20,52,53,83,84,85,108,128,132,133],
};

// ── ラッキーアイテム辞書 ────────────────────────────────────
const LUCKY_ITEMS = {
  fire:     ['赤いマグカップ','あたたかい飲み物','キャンドル','赤いスカーフ'],
  fighting: ['スポーツタオル','プロテインバー','スニーカー','ウォーターボトル'],
  grass:    ['観葉植物','緑のノート','ハーブティー','エコバッグ'],
  ground:   ['テラコッタの小物','木のコースター','ブラウンの革小物','岩塩'],
  electric: ['充電器','黄色い小物','イヤホン','モバイルバッテリー'],
  flying:   ['白いスカーフ','羽根のしおり','空色のノート','軽いトートバッグ'],
  water:    ['青いハンカチ','水筒','入浴剤','青いノート'],
  fairy:    ['ピンクのリボン','小さな花','ピンクのポーチ','かわいい付箋'],
  poison:   ['紫のポーチ','アロマオイル','ラベンダーの香り','紫のメモ帳'],
  ghost:    ['黒いポーチ','秘密のメモ','星座の本','黒いノート'],
  dragon:   ['ゴールドのアクセサリー','金色のペン','高級チョコレート','メタリックな小物'],
  rock:     ['天然石','グレーのマグカップ','岩塩ランプ','鉱物標本'],
  psychic:  ['読みかけの本','紫のペン','アロマキャンドル','クリスタル'],
  ice:      ['白いカップ','ミントキャンディ','水色のハンカチ','クリアポーチ'],
  normal:   ['白いノート','シンプルなペン','ベージュのポーチ','白いマグカップ'],
};

// ── わざ日本語辞書（主要Gen1わざ） ─────────────────────────
const MOVE_JA = {
  'pound':'はたく','scratch':'ひっかく','tackle':'たいあたり','ember':'ひのこ',
  'water-gun':'みずでっぽう','thunder-shock':'でんきショック','razor-leaf':'はっぱカッター',
  'vine-whip':'つるのムチ','surf':'なみのり','flamethrower':'かえんほうしゃ',
  'psychic':'サイコキネシス','thunderbolt':'10まんボルト','ice-beam':'れいとうビーム',
  'blizzard':'ふぶき','hyper-beam':'はかいこうせん','solar-beam':'ソーラービーム',
  'earthquake':'じしん','fire-blast':'だいもんじ','thunder':'かみなり',
  'bite':'かみつく','slam':'たたきつける','tail-whip':'しっぽをふる',
  'growth':'せいちょう','sleep-powder':'ねむりごな','poison-powder':'どくのこな',
  'swift':'スピードスター','double-edge':'すてみタックル','take-down':'とっしん',
  'lick':'したでなめる','night-shade':'ナイトヘッド','confuse-ray':'あやしいひかり',
  'fly':'そらをとぶ','agility':'こうそくいどう','hydro-pump':'ハイドロポンプ',
  'fire-spin':'ほのおのうず','dragon-rage':'りゅうのいかり','wrap':'まきつく',
  'karate-chop':'からてチョップ','seismic-toss':'ちきゅうなげ','pay-day':'ネコにこばん',
  'leer':'にらみつける','stomp':'ふみつけ','body-slam':'のしかかり',
  'rock-slide':'いわなだれ','dig':'あなをほる','toxic':'どくどく',
  'bubble-beam':'バブルこうせん','peck':'つつく','drill-peck':'ドリルくちばし',
  'pin-missile':'ミサイルばり','horn-drill':'つのドリル','spore':'キノコのほうし',
  'flash':'フラッシュ','leech-seed':'やどりぎのたね','psybeam':'サイケこうせん',
  'recover':'じこさいせい','high-jump-kick':'とびひざげり','double-kick':'にどげり',
  'mega-drain':'メガドレイン','absorb':'すいとる','leech-life':'きゅうけつ',
  'smokescreen':'けむりだま','disable':'かなしばり','screech':'いやなおと',
  'mirror-move':'オウムがえし','selfdestruct':'じばく','explosion':'だいばくはつ',
  'string-shot':'いとをはく','fury-attack':'みだれづき','crabhammer':'クラブハンマー',
  'amnesia':'わすれる','splash':'はねる','glare':'へびにらみ',
};

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

// ── PokeAPI フェッチ ────────────────────────────────────────
async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error(`pokemon ${id} fetch failed`);
  return res.json();
}

async function fetchSpecies(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

function getJaName(species) {
  if (!species) return null;
  const e = species.names.find(n => n.language.name === 'ja-Hrkt' || n.language.name === 'ja');
  return e?.name ?? null;
}

function selectPokemonId(zodiacId, seed) {
  const z = ZODIACS.find(z => z.id === zodiacId);
  let ids = [];
  for (const type of z.types) ids = [...ids, ...(GEN1_BY_TYPE[type] ?? [])];
  ids = [...new Set(ids)];
  if (ids.length === 0) ids = GEN1_BY_TYPE.normal;
  return pickFromArray(ids, seed + hashString(zodiacId));
}

function selectLuckyMove(moves, seed) {
  if (!moves?.length) return 'たいあたり';
  const gen1 = moves.filter(m =>
    m.version_group_details.some(d => ['red-blue','yellow'].includes(d.version_group.name))
  );
  const pool = gen1.length > 0 ? gen1 : moves;
  const name = pickFromArray(pool, seed)?.move?.name ?? 'tackle';
  return MOVE_JA[name] ?? name;
}

function getLuckyItem(zodiacId, seed) {
  const z = ZODIACS.find(z => z.id === zodiacId);
  for (const type of z.types) {
    const items = LUCKY_ITEMS[type];
    if (items?.length) return pickFromArray(items, seed + hashString(zodiacId) + 999);
  }
  return pickFromArray(LUCKY_ITEMS.normal, seed);
}

function generateRanking(seed) {
  return seededShuffle(ZODIACS.map(z => z.id), seed).map((id, i) => {
    const rank = i + 1;
    return { zodiacId: id, rank, comment: getFortuneComment(rank, seed + hashString(id)) };
  });
}

// ── TOP3スタイル (rank別のカラーのみ inline) ──────────────
const RANK_STYLE = {
  1: { bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', border: '#f59e0b', medal: '🥇' },
  2: { bg: 'linear-gradient(135deg,#f8fafc,#e2e8f0)', border: '#94a3b8', medal: '🥈' },
  3: { bg: 'linear-gradient(135deg,#fff7ed,#fde8d0)', border: '#fb923c', medal: '🥉' },
};

// ── TOP3 カード ─────────────────────────────────────────────
function PokemonInfo({ entry }) {
  return (
    <>
      {entry.sprite
        ? <img src={entry.sprite} alt={entry.pokemonName} className="pokemon-img" />
        : <div className="pokemon-placeholder">？</div>
      }
      <p className="pokemon-name">{entry.pokemonName}</p>
      <div className="lucky-rows">
        <div className="lucky-row">
          <span className="lucky-label">⚡ ラッキーわざ</span>
          <span className="lucky-val">{entry.luckyMove}</span>
        </div>
        <div className="lucky-row">
          <span className="lucky-label">🎁 ラッキーアイテム</span>
          <span className="lucky-val">{entry.luckyItem}</span>
        </div>
      </div>
    </>
  );
}

function Top3Card({ entry, isUser }) {
  const z = ZODIACS.find(z => z.id === entry.zodiacId);
  const rs = RANK_STYLE[entry.rank];
  return (
    <div className="top3-card" style={{ background: rs.bg, border: `2px solid ${rs.border}` }}>
      {isUser && <span className="badge-you">あなた</span>}
      <div className="top3-card-header">
        <span className="top3-medal">{rs.medal}</span>
        <div>
          <div className="top3-zodiac-name">{z.symbol} {z.name}</div>
          <div className="top3-zodiac-date">{z.date}</div>
        </div>
      </div>
      <p className="top3-comment">「{entry.comment}」</p>
      <PokemonInfo entry={entry} />
    </div>
  );
}

// ── 星座選択UI ──────────────────────────────────────────────
function ZodiacSelector({ onSelect }) {
  return (
    <div className="card">
      <p className="zodiac-selector-title">どの星のもとに生まれましたか？</p>
      <p className="zodiac-selector-sub">あなたの星座を選んでください</p>
      <div className="zodiac-grid">
        {ZODIACS.map(z => (
          <button key={z.id} className="zodiac-btn" onClick={() => onSelect(z.id)}>
            <span className="zodiac-btn-symbol">{z.symbol}</span>
            <span className="zodiac-btn-name">{z.name}</span>
            <span className="zodiac-btn-date">{z.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── 自分の運勢カード (TOP3外) ───────────────────────────────
function UserFortuneCard({ entry, onChangeZodiac }) {
  const z = ZODIACS.find(z => z.id === entry.zodiacId);
  return (
    <div className="card">
      <div className="user-card-header">
        <span className="user-rank">{entry.rank}位</span>
        <div>
          <div className="user-zodiac-name">{z.symbol} {z.name}</div>
          <div className="user-zodiac-date">{z.date}</div>
        </div>
      </div>
      <p className="user-comment">「{entry.comment}」</p>
      <PokemonInfo entry={entry} />
      <button className="change-btn" onClick={onChangeZodiac}>星座を変更する</button>
    </div>
  );
}

// ── 4位〜12位 アコーディオン ───────────────────────────────
function AccordionItem({ entry, isUser, isOpen, onToggle }) {
  const z = ZODIACS.find(z => z.id === entry.zodiacId);
  return (
    <div className={`accordion-item${isUser ? ' is-user' : ''}`}>
      <button className="accordion-btn" onClick={onToggle}>
        <span className="acc-rank">{entry.rank}位</span>
        <span className="acc-symbol">{z.symbol}</span>
        <span className="acc-name">{z.name}</span>
        {entry.pokemonName && <span className="acc-pokemon">{entry.pokemonName}</span>}
        {isUser && <span className="acc-badge">あなた</span>}
        <span className="acc-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="accordion-body">
          <PokemonInfo entry={entry} />
          <p className="acc-comment">「{entry.comment}」</p>
        </div>
      )}
    </div>
  );
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [ranking, setRanking]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [userZodiac, setUserZodiac]     = useState(() => localStorage.getItem('userZodiac'));
  const [showSelector, setShowSelector] = useState(!localStorage.getItem('userZodiac'));
  const [openAccordion, setOpenAccordion] = useState(null);

  const seed = getDailySeed();
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  useEffect(() => {
    const base = generateRanking(seed);
    Promise.all(
      base.map(async entry => {
        try {
          const pokemonId = selectPokemonId(entry.zodiacId, seed);
          const [pokemon, species] = await Promise.all([
            fetchPokemon(pokemonId),
            fetchSpecies(pokemonId),
          ]);
          const jaName   = getJaName(species) ?? pokemon.name;
          const sprite   = pokemon.sprites?.other?.['official-artwork']?.front_default
                        ?? pokemon.sprites?.front_default ?? null;
          const move     = selectLuckyMove(pokemon.moves, seed + hashString(entry.zodiacId) + 777);
          const item     = getLuckyItem(entry.zodiacId, seed);
          return { ...entry, pokemonName: jaName, sprite, luckyMove: move, luckyItem: item };
        } catch {
          return { ...entry, pokemonName: '？', sprite: null,
            luckyMove: 'たいあたり', luckyItem: getLuckyItem(entry.zodiacId, seed) };
        }
      })
    ).then(results => {
      setRanking(results);
      setLoading(false);
    });
  }, []);

  function handleSelect(zodiacId) {
    localStorage.setItem('userZodiac', zodiacId);
    setUserZodiac(zodiacId);
    setShowSelector(false);
  }

  function handleChangeZodiac() {
    setShowSelector(true);
  }

  const top3       = ranking.slice(0, 3);
  const userEntry  = ranking.find(r => r.zodiacId === userZodiac);
  const userInTop3 = userEntry && userEntry.rank <= 3;

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner" />
      <p className="loading-text">星の声を聞いています...</p>
    </div>
  );

  return (
    <div className="app">
      {/* ヘッダー */}
      <header className="header">
        <h1 className="header-title">🔮 今日のポケモン星座占い</h1>
        <p className="header-date">{dateStr}</p>
      </header>

      <div className="section">
        {/* TOP3 */}
        <h2 className="section-title">✨ 今日のラッキー星座 TOP3</h2>
        {top3.map(entry => (
          <Top3Card key={entry.zodiacId} entry={entry} isUser={entry.zodiacId === userZodiac} />
        ))}

        {/* 自分の星座エリア */}
        <h2 className="section-title">🌟 あなたの今日の運勢</h2>
        {showSelector ? (
          <ZodiacSelector onSelect={handleSelect} />
        ) : userInTop3 ? (
          <div className="card user-top3-notice">
            <p className="user-top3-emoji">🎉</p>
            <p className="user-top3-text">
              今日は <strong>{userEntry.rank}位</strong> です。<br />
              上のカードで詳しく見られます ✨
            </p>
            <button className="change-btn" onClick={handleChangeZodiac}>星座を変更する</button>
          </div>
        ) : userEntry ? (
          <UserFortuneCard entry={userEntry} onChangeZodiac={handleChangeZodiac} />
        ) : null}

        {/* 4位〜12位 アコーディオン */}
        <h2 className="section-title">📋 全星座ランキング（4〜12位）</h2>
        {ranking.slice(3).map(entry => (
          <AccordionItem
            key={entry.zodiacId}
            entry={entry}
            isUser={entry.zodiacId === userZodiac}
            isOpen={openAccordion === entry.zodiacId}
            onToggle={() => setOpenAccordion(
              openAccordion === entry.zodiacId ? null : entry.zodiacId
            )}
          />
        ))}
      </div>
    </div>
  );
}
