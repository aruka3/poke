const TOTAL_POKEMON = 1025;

const TYPE_DATA = {
  normal:   { color: '#9ca3af', lucky: '白・グレー', messages: ['穏やかな一日になりそうです。日常の小さな幸せに目を向けてみて。', '安定した運気が続きます。地道な努力が実を結ぶ日です。', '平和な雰囲気が周囲を包みます。人間関係が良好になりそう。'] },
  fire:     { color: '#ef4444', lucky: '赤・オレンジ', messages: ['情熱とエネルギーが溢れる一日！新しいことに挑戦するのに最適。', '強いパワーがみなぎっています。大胆な行動が吉。', '熱い気持ちが周りを巻き込みます。リーダーシップを発揮して。'] },
  water:    { color: '#3b82f6', lucky: '青・水色', messages: ['直感が冴える日。心の声に耳を傾けてみましょう。', '流れに身を任せることで、良い結果が訪れます。', '癒しのパワーが満ちています。大切な人との時間を大切に。'] },
  electric: { color: '#eab308', lucky: '黄色・ゴールド', messages: ['素早い判断が幸運を呼び込みます。チャンスは逃さずに！', '閃きとアイデアが豊富な日。クリエイティブな活動が吉。', '明るいエネルギーが充電されています。積極的に動きましょう。'] },
  grass:    { color: '#22c55e', lucky: '緑・若草色', messages: ['成長と発展の気配があります。種まきをするなら今日。', '自然のリズムに合わせることで運気アップ。癒しを求めて。', '粘り強く取り組むことで大きな実りをもたらします。'] },
  ice:      { color: '#67e8f9', lucky: '水色・白', messages: ['クールな判断力が冴えています。感情に流されず冷静に。', '静かな環境で集中すると才能が開花します。', '清々しい気持ちで新しいスタートを切るのに良い日。'] },
  fighting: { color: '#b91c1c', lucky: '赤・銀', messages: ['強い意志と勇気が試される日。困難も乗り越えられます。', '体を動かすことで運気がアップ。スポーツや運動が吉。', '正直に、真っ直ぐに行動することが幸運を引き寄せます。'] },
  poison:   { color: '#a855f7', lucky: '紫・マゼンタ', messages: ['独特の感性が輝く日。個性を前面に出してみて。', '表と裏を見極める洞察力が冴えています。騙されないで。', '神秘的な魅力が増している日。印象に残る出会いがあるかも。'] },
  ground:   { color: '#92400e', lucky: '茶色・ベージュ', messages: ['地に足のついた堅実な行動が吉。焦らずじっくり進もう。', '基礎固めに最適な日。準備や計画を立てることが大切。', '安定した土台があるから大きなことも成し遂げられます。'] },
  flying:   { color: '#818cf8', lucky: '空色・白', messages: ['自由な発想で高みを目指しましょう。枠にとらわれないで。', '視野を広げることで新しい可能性が見えてきます。', '軽やかな気持ちでいることが運気を高めます。'] },
  psychic:  { color: '#ec4899', lucky: 'ピンク・紫', messages: ['深い洞察力と直感が冴えわたる日。第六感を信じて。', '精神的な豊かさを追い求めることで充実感を得られます。', '不思議な縁やシンクロニシティが起きやすい日です。'] },
  bug:      { color: '#84cc16', lucky: '黄緑・茶', messages: ['小さなことでも丁寧に取り組むことで大きな成果に繋がります。', '変化と成長のチャンスが訪れます。変身の時かも！', '細部への注意力が光る日。見落としがちなチャンスに気づいて。'] },
  rock:     { color: '#78716c', lucky: 'グレー・ブラウン', messages: ['強固な意志と忍耐力で困難を乗り越えられます。', '長期的な目標に向けて一歩一歩着実に進む日。', '揺るぎない信念があなたを守ります。ぶれずに前進して。'] },
  ghost:    { color: '#6d28d9', lucky: '黒・紫', messages: ['神秘的なエネルギーに包まれています。スピリチュアルな気づきの日。', '夢や直感にメッセージが隠れているかもしれません。', '見えない力があなたをサポートしています。信じてみて。'] },
  dragon:   { color: '#1d4ed8', lucky: '金・青', messages: ['強大なパワーが宿っています！大きな夢を描くのにふさわしい日。', '運命的な出来事が起きやすい日。流れに乗ることで大飛躍。', '高貴な気品と強さが輝いています。自信を持って進んで。'] },
  dark:     { color: '#374151', lucky: '黒・深緑', messages: ['戦略的な思考が冴える日。じっくり考えてから動こう。', '独立心と自立心が高まっています。自分の道を信じて。', '逆境をチャンスに変えるしなやかさがあります。'] },
  steel:    { color: '#94a3b8', lucky: 'シルバー・白', messages: ['鋼のような意志と信念が力を発揮します。', '粘り強い努力が実る日。品質にこだわることが吉。', '守りが固い日。重要な決断や契約に向いています。'] },
  fairy:    { color: '#f472b6', lucky: 'ピンク・白', messages: ['愛と優しさに溢れる素敵な一日になりそうです。', '周りを幸せにすることで自分も幸せになれる日。', '純粋な気持ちで行動することが最大の幸運を呼びます。'] },
};

const LUCKY_ACTIONS = [
  '早起きして朝日を浴びる', '誰かに感謝の気持ちを伝える', '新しいカフェに立ち寄る',
  '好きな音楽をかけながら作業する', '散歩で普段と違う道を歩く', '日記に今日の気持ちを記す',
  'お気に入りの服を着る', '深呼吸をして心を落ち着かせる', '友人に連絡してみる',
  '水をしっかり飲む', '早めに寝る準備をする', '好きな本を読む時間を作る',
];

const ADVICE_TEMPLATES = [
  (name) => `${name}は告げます。「今日という日はあなただけのもの。一歩踏み出す勇気が未来を変えます。」`,
  (name) => `${name}のパワーがあなたに届きます。「焦らなくていい。あなたのペースで進めば、必ずたどり着けます。」`,
  (name) => `${name}が見守っています。「小さな努力の積み重ねが、やがて大きな花を咲かせます。」`,
  (name) => `${name}からのメッセージ。「あなたには無限の可能性がある。それを信じることから始めよう。」`,
  (name) => `${name}が語りかけます。「感謝の気持ちを忘れずに。それがさらなる幸運を引き寄せます。」`,
];

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getDailySeeds() {
  const today = new Date();
  const dateString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
  return parseInt(dateString, 10);
}

function starsHTML(count) {
  return '⭐'.repeat(count) + '☆'.repeat(5 - count);
}

function getTypeDisplay(typeName) {
  const typeNames = {
    normal: 'ノーマル', fire: 'ほのお', water: 'みず', electric: 'でんき',
    grass: 'くさ', ice: 'こおり', fighting: 'かくとう', poison: 'どく',
    ground: 'じめん', flying: 'ひこう', psychic: 'エスパー', bug: 'むし',
    rock: 'いわ', ghost: 'ゴースト', dragon: 'ドラゴン', dark: 'あく',
    steel: 'はがね', fairy: 'フェアリー',
  };
  return typeNames[typeName] || typeName;
}

function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --duration: ${Math.random() * 4 + 2}s;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }
}

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

async function fetchPokemonSpecies(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if (!res.ok) return null;
  return res.json();
}

function getJapaneseName(speciesData) {
  if (!speciesData) return null;
  const jaEntry = speciesData.names.find(n => n.language.name === 'ja-Hrkt' || n.language.name === 'ja');
  return jaEntry ? jaEntry.name : null;
}

function generateFortune(pokemon, seed) {
  const types = pokemon.types.map(t => t.type.name);
  const primaryType = types[0];
  const typeInfo = TYPE_DATA[primaryType] || TYPE_DATA.normal;

  const msgIndex = Math.floor(seededRandom(seed) * typeInfo.messages.length);
  const actionIndex = Math.floor(seededRandom(seed + 1) * LUCKY_ACTIONS.length);
  const adviceIndex = Math.floor(seededRandom(seed + 2) * ADVICE_TEMPLATES.length);
  const luckyNumber = Math.floor(seededRandom(seed + 3) * 99) + 1;

  const overall = Math.floor(seededRandom(seed + 4) * 3) + 3;
  const love    = Math.floor(seededRandom(seed + 5) * 3) + 3;
  const work    = Math.floor(seededRandom(seed + 6) * 3) + 3;
  const money   = Math.floor(seededRandom(seed + 7) * 3) + 3;

  return {
    message: typeInfo.messages[msgIndex],
    luckyColor: typeInfo.lucky,
    luckyNumber,
    luckyAction: LUCKY_ACTIONS[actionIndex],
    advice: ADVICE_TEMPLATES[adviceIndex],
    overall, love, work, money,
  };
}

function showFortune(pokemon, jaName, fortune) {
  const displayName = jaName || pokemon.name;

  const content = document.getElementById('pokemon-content');
  const img = document.getElementById('pokemon-img');
  const nameEl = document.getElementById('pokemon-name');
  const badgesEl = document.getElementById('type-badges');

  const sprite = pokemon.sprites.other?.['official-artwork']?.front_default
    || pokemon.sprites.front_default;

  img.src = sprite || '';
  img.alt = displayName;
  nameEl.textContent = `No.${pokemon.id} ${displayName}`;

  badgesEl.innerHTML = pokemon.types.map(t =>
    `<span class="type-badge type-${t.type.name}">${getTypeDisplay(t.type.name)}</span>`
  ).join('');

  document.getElementById('loading').hidden = true;
  content.hidden = false;

  document.getElementById('fortune-message').textContent = fortune.message;
  document.getElementById('overall-stars').textContent = starsHTML(fortune.overall);
  document.getElementById('love-stars').textContent = starsHTML(fortune.love);
  document.getElementById('work-stars').textContent = starsHTML(fortune.work);
  document.getElementById('money-stars').textContent = starsHTML(fortune.money);
  document.getElementById('lucky-color').textContent = fortune.luckyColor;
  document.getElementById('lucky-number').textContent = fortune.luckyNumber;
  document.getElementById('lucky-action').textContent = fortune.luckyAction;
  document.getElementById('pokemon-advice').textContent = fortune.advice(displayName);

  const fortuneResult = document.getElementById('fortune-result');
  fortuneResult.hidden = false;
}

async function drawFortune() {
  const btn = document.getElementById('draw-btn');
  const card = document.getElementById('fortune-card');
  const fortuneResult = document.getElementById('fortune-result');

  btn.disabled = true;
  btn.classList.add('loading');
  btn.querySelector('.btn-text').textContent = '占い中...';

  fortuneResult.hidden = true;

  const loading = document.getElementById('loading');
  const content = document.getElementById('pokemon-content');
  loading.hidden = false;
  content.hidden = true;

  card.classList.add('flipped');

  try {
    const seed = getDailySeeds();
    const pokemonId = Math.floor(seededRandom(seed) * TOTAL_POKEMON) + 1;

    const [pokemon, species] = await Promise.all([
      fetchPokemon(pokemonId),
      fetchPokemonSpecies(pokemonId),
    ]);

    const jaName = getJapaneseName(species);
    const fortune = generateFortune(pokemon, seed);

    await new Promise(resolve => setTimeout(resolve, 600));

    showFortune(pokemon, jaName, fortune);

    btn.querySelector('.btn-text').textContent = 'もう一度占う';
  } catch (err) {
    console.error(err);
    loading.hidden = true;
    card.classList.remove('flipped');
    btn.querySelector('.btn-text').textContent = '占う';
    alert('ポケモンの召喚に失敗しました。もう一度お試しください。');
  } finally {
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

document.getElementById('draw-btn').addEventListener('click', drawFortune);
document.getElementById('fortune-card').addEventListener('click', () => {
  if (!document.getElementById('fortune-card').classList.contains('flipped')) {
    drawFortune();
  }
});

createStars();
