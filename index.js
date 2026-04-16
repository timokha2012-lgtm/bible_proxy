<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Разбор текста — Путь преодоления</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0f1117; --surface: #181c27; --surface2: #1e2333;
    --border: rgba(255,255,255,0.08); --border2: rgba(255,255,255,0.14);
    --text: #e8e6e0; --text2: #9b9890; --text3: #6b6965;
    --gold: #c9a96e; --gold2: #e8c98a; --teal: #4db896;
    --coral: #d4826a; --radius: 12px;
  }
  body { font-family: 'Manrope', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; padding: 2rem 1rem 4rem; }
  .container { max-width: 780px; margin: 0 auto; }
  header { margin-bottom: 2rem; display: flex; align-items: center; gap: 14px; }
  .logo-img { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .logo { font-family: 'Playfair Display', serif; font-size: 13px; letter-spacing: 0.15em; color: var(--gold); text-transform: uppercase; margin-bottom: 0.3rem; }
  h1 { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 0.3rem; }
  .subtitle { font-size: 12px; color: var(--text2); }
  .input-section { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem; }
  .input-row { margin-bottom: 1rem; }
  .input-row input { width: 100%; background: var(--surface2); border: 1px solid var(--border2); border-radius: 8px; padding: 12px 16px; font-size: 15px; font-family: 'Manrope', sans-serif; color: var(--text); outline: none; }
  .input-row input:focus { border-color: var(--gold); }
  .input-row input::placeholder { color: var(--text3); }
  .context-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem; }
  .ctx-btn { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 500; font-family: 'Manrope', sans-serif; cursor: pointer; border: 1px solid var(--border2); background: transparent; color: var(--text2); }
  .ctx-btn.active { background: var(--gold); color: var(--bg); border-color: var(--gold); }
  .analyze-btn { width: 100%; padding: 14px; background: var(--gold); color: var(--bg); border: none; border-radius: 8px; font-size: 15px; font-weight: 600; font-family: 'Manrope', sans-serif; cursor: pointer; }
  .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .quick-refs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .quick-ref { padding: 5px 12px; border-radius: 999px; font-size: 12px; border: 1px solid var(--border); background: var(--surface); color: var(--text2); cursor: pointer; font-family: 'Manrope', sans-serif; }
  .quick-ref:hover { border-color: var(--gold); color: var(--gold); }
  .result { display: none; }
  .result.visible { display: block; }
  .ref-header { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--gold); margin-bottom: 0.3rem; }
  .ref-step { font-size: 12px; color: var(--text3); margin-bottom: 1.5rem; }
  .verse-block { background: var(--surface); border-left: 3px solid var(--gold); border-radius: 0 var(--radius) var(--radius) 0; padding: 1.2rem 1.4rem; margin-bottom: 1.5rem; }
  .verse-text { font-family: 'Playfair Display', serif; font-size: 17px; font-style: italic; color: var(--text); line-height: 1.7; margin-bottom: 0.5rem; }
  .verse-ref { font-size: 12px; color: var(--gold); }
  .blocks { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
  .block { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .block-head { display: flex; align-items: center; gap: 12px; padding: 1rem 1.2rem; cursor: pointer; user-select: none; }
  .block-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .bi-psych { background: rgba(77,184,150,0.15); }
  .bi-hist { background: rgba(139,125,216,0.15); }
  .bi-theo { background: rgba(201,169,110,0.15); }
  .bi-group { background: rgba(212,130,106,0.15); }
  .block-label { font-size: 13px; font-weight: 600; color: var(--text); }
  .block-sub { font-size: 12px; color: var(--text3); }
  .block-arrow { margin-left: auto; font-size: 12px; color: var(--text3); transition: transform 0.2s; }
  .block-arrow.open { transform: rotate(180deg); }
  .block-body { display: none; padding: 0 1.2rem 1.2rem; border-top: 1px solid var(--border); }
  .block-body.open { display: block; }
  .block-content { font-size: 14px; color: var(--text); line-height: 1.85; padding-top: 1rem; white-space: pre-wrap; }
  .questions-block { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.2rem 1.4rem; margin-bottom: 1.5rem; }
  .q-title { font-size: 12px; font-weight: 600; color: var(--gold); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.8rem; }
  .q-list { display: flex; flex-direction: column; gap: 8px; }
  .q-item { border-radius: 8px; overflow: hidden; border: 1px solid var(--border); }
  .q-question { padding: 10px 14px; background: var(--surface2); font-size: 13px; color: var(--text2); line-height: 1.6; cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .q-arrow { font-size: 11px; color: var(--gold); flex-shrink: 0; margin-top: 2px; transition: transform 0.2s; }
  .q-arrow.open { transform: rotate(180deg); }
  .q-answer { display: none; padding: 12px 14px; background: rgba(201,169,110,0.06); border-top: 1px solid var(--border); font-size: 13px; color: var(--text); line-height: 1.8; white-space: pre-wrap; }
  .q-answer.open { display: block; }
  .q-loading { display: none; padding: 10px 14px; font-size: 12px; color: var(--text3); border-top: 1px solid var(--border); }
  .q-loading.visible { display: block; }
  .loading { display: none; text-align: center; padding: 3rem 0; color: var(--text2); font-size: 14px; }
  .loading.visible { display: block; }
  .spinner { width: 32px; height: 32px; border: 2px solid var(--border2); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .error { display: none; background: rgba(212,130,106,0.1); border: 1px solid rgba(212,130,106,0.3); border-radius: var(--radius); padding: 1rem 1.2rem; font-size: 14px; color: var(--coral); margin-bottom: 1rem; }
  .error.visible { display: block; }
</style>
</head>
<body>
<div class="container">
  <header>
    <img class="logo-img" src="https://timokha2012-lgtm.github.io/bible_study/logo.jpg" alt="" onerror="this.style.display='none'">
    <div>
      <div class="logo">Путь преодоления · Д.В.П.</div>
      <h1>Разбор библейского текста</h1>
      <p class="subtitle">Психология · Богословие · Культурно-исторический контекст · Применение в группе</p>
    </div>
  </header>

  <div class="input-section">
    <div class="input-row">
      <input type="text" id="ref-input" placeholder="Текст или ссылка — например: Ин 15:15 или Лк 15:11-32" />
    </div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:8px;">Контекст использования:</div>
    <div class="context-row">
      <button class="ctx-btn active" data-ctx="group">Групповое собрание</button>
      <button class="ctx-btn" data-ctx="individual">Индивидуальная работа</button>
      <button class="ctx-btn" data-ctx="sermon">Проповедь</button>
      <button class="ctx-btn" data-ctx="step1">Шаг 1</button>
      <button class="ctx-btn" data-ctx="step2">Шаг 2</button>
      <button class="ctx-btn" data-ctx="step4">Шаг 4</button>
      <button class="ctx-btn" data-ctx="step5">Шаг 5</button>
      <button class="ctx-btn" data-ctx="step6">Шаг 6</button>
    </div>
    <button class="analyze-btn" id="analyze-btn" onclick="analyze()">Разобрать текст</button>
  </div>

  <div style="font-size:12px;color:var(--text3);margin-bottom:8px;">Быстрый выбор из программы:</div>
  <div class="quick-refs">
    <span class="quick-ref" onclick="setRef('Ин 15:15')">Ин 15:15</span>
    <span class="quick-ref" onclick="setRef('3 Цар 19:1-8')">3 Цар 19:1-8</span>
    <span class="quick-ref" onclick="setRef('Лк 15:11-32')">Лк 15:11-32</span>
    <span class="quick-ref" onclick="setRef('Лк 9:23')">Лк 9:23</span>
    <span class="quick-ref" onclick="setRef('Иак 1:22-25')">Иак 1:22-25</span>
    <span class="quick-ref" onclick="setRef('Рим 7:15-25')">Рим 7:15-25</span>
    <span class="quick-ref" onclick="setRef('Пс 22')">Пс 22</span>
    <span class="quick-ref" onclick="setRef('Ин 8:1-11')">Ин 8:1-11</span>
    <span class="quick-ref" onclick="setRef('Мф 11:28-30')">Мф 11:28-30</span>
  </div>

  <div class="error" id="error"></div>
  <div class="loading" id="loading"><div class="spinner"></div>Анализирую текст...</div>

  <div class="result" id="result">
    <div class="ref-header" id="res-ref"></div>
    <div class="ref-step" id="res-step"></div>
    <div class="verse-block">
      <div class="verse-text" id="res-verse"></div>
      <div class="verse-ref" id="res-verse-ref"></div>
    </div>
    <div class="blocks">
      <div class="block">
        <div class="block-head" onclick="toggleBlock(this)">
          <div class="block-icon bi-hist">🏺</div>
          <div><div class="block-label">Культурно-исторический контекст</div><div class="block-sub">Факты которые меняют смысл</div></div>
          <div class="block-arrow">▾</div>
        </div>
        <div class="block-body"><div class="block-content" id="res-hist"></div></div>
      </div>
      <div class="block">
        <div class="block-head" onclick="toggleBlock(this)">
          <div class="block-icon bi-psych">🧠</div>
          <div><div class="block-label">Психологический слой</div><div class="block-sub">Механизмы, динамика, параллели</div></div>
          <div class="block-arrow">▾</div>
        </div>
        <div class="block-body"><div class="block-content" id="res-psych"></div></div>
      </div>
      <div class="block">
        <div class="block-head" onclick="toggleBlock(this)">
          <div class="block-icon bi-theo">✝</div>
          <div><div class="block-label">Богословский смысл</div><div class="block-sub">Что это значит для живого человека</div></div>
          <div class="block-arrow">▾</div>
        </div>
        <div class="block-body"><div class="block-content" id="res-theo"></div></div>
      </div>
      <div class="block">
        <div class="block-head" onclick="toggleBlock(this)">
          <div class="block-icon bi-group">👥</div>
          <div><div class="block-label">Применение в группе</div><div class="block-sub">Конкретно — как использовать на собрании</div></div>
          <div class="block-arrow">▾</div>
        </div>
        <div class="block-body"><div class="block-content" id="res-group"></div></div>
      </div>
    </div>
    <div class="questions-block">
      <div class="q-title">Вопросы для группы — нажми для мини-проповеди ведущего</div>
      <div class="q-list" id="res-questions"></div>
    </div>
  </div>
</div>

<script>
const PROXY = 'https://bibleproxy-production.up.railway.app';
let selectedCtx = 'group';
let currentRef = '';

document.querySelectorAll('.ctx-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ctx-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedCtx = btn.dataset.ctx;
  });
});

document.getElementById('ref-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') analyze();
});

function setRef(ref) {
  document.getElementById('ref-input').value = ref;
  analyze();
}

function toggleBlock(head) {
  const body = head.nextElementSibling;
  const arrow = head.querySelector('.block-arrow');
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

async function callAPI(content, maxTokens) {
  const response = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content }]
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'HTTP ' + response.status);
  return data.content.map(i => i.text || '').join('').trim();
}

async function toggleQuestion(item, question) {
  const answer = item.querySelector('.q-answer');
  const loading = item.querySelector('.q-loading');
  const arrow = item.querySelector('.q-arrow');

  if (answer.classList.contains('open')) {
    answer.classList.remove('open');
    arrow.classList.remove('open');
    return;
  }
  if (answer.textContent.trim()) {
    answer.classList.add('open');
    arrow.classList.add('open');
    return;
  }

  loading.classList.add('visible');
  arrow.classList.add('open');
  try {
    const text = await callAPI(`Ты — ведущий реабилитационной группы, дьякон-психолог. Текст: «${currentRef}». Вопрос: «${question}». Дай мини-проповедь для ведущего — 4-6 предложений живым языком: что главное, как направить разговор, какой момент не упустить.`, 600);
    answer.textContent = text;
    answer.classList.add('open');
  } catch(e) {
    answer.textContent = 'Ошибка: ' + e.message;
    answer.classList.add('open');
  } finally {
    loading.classList.remove('visible');
  }
}

const ctxLabels = {
  group: 'Групповое собрание',
  individual: 'Индивидуальная работа',
  sermon: 'Проповедь',
  step1: 'Шаг 1 — Возвращение к дружбе',
  step2: 'Шаг 2 — Тело и стабилизация',
  step4: 'Шаг 4 — Образ Бога',
  step5: 'Шаг 5 — Инвентаризация',
  step6: 'Шаг 6 — Решение и ответственность'
};

async function analyze() {
  const ref = document.getElementById('ref-input').value.trim();
  if (!ref) return;

  currentRef = ref;
  const btn = document.getElementById('analyze-btn');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const error = document.getElementById('error');

  btn.disabled = true;
  loading.classList.add('visible');
  result.classList.remove('visible');
  error.classList.remove('visible');

  const ctxLabel = ctxLabels[selectedCtx] || selectedCtx;

  try {
    const text = await callAPI(`Разбери библейский текст «${ref}» для реабилитационной группы зависимых. Контекст: ${ctxLabel}. Ответь ТОЛЬКО валидным JSON без markdown: {"reference":"ссылка","verse":"цитата на русском","historical":"культурно-исторический контекст 150 слов живым языком","psychological":"психологический слой механизмы связь с зависимостью 150 слов","theological":"богословский смысл для зависимого человека 100 слов","application":"применение в группе конкретно 100 слов","questions":["вопрос 1","вопрос 2","вопрос 3","вопрос 4","вопрос 5"]}`, 3000);

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Попробуй ещё раз');
    const parsed = JSON.parse(match[0]);

    currentRef = parsed.reference || ref;
    document.getElementById('res-ref').textContent = parsed.reference || ref;
    document.getElementById('res-step').textContent = ctxLabel;
    document.getElementById('res-verse').textContent = parsed.verse || '';
    document.getElementById('res-verse-ref').textContent = parsed.reference || ref;
    document.getElementById('res-hist').textContent = parsed.historical || '';
    document.getElementById('res-psych').textContent = parsed.psychological || '';
    document.getElementById('res-theo').textContent = parsed.theological || '';
    document.getElementById('res-group').textContent = parsed.application || '';

    const qList = document.getElementById('res-questions');
    qList.innerHTML = '';
    (parsed.questions || []).forEach(q => {
      const item = document.createElement('div');
      item.className = 'q-item';
      const qEl = document.createElement('div');
      qEl.className = 'q-question';
      qEl.innerHTML = '<span>' + q + '</span><span class="q-arrow">▾</span>';
      qEl.addEventListener('click', () => toggleQuestion(item, q));
      const loadEl = document.createElement('div');
      loadEl.className = 'q-loading';
      loadEl.textContent = '✍️ Готовлю подсказку...';
      const ansEl = document.createElement('div');
      ansEl.className = 'q-answer';
      item.appendChild(qEl);
      item.appendChild(loadEl);
      item.appendChild(ansEl);
      qList.appendChild(item);
    });

    document.querySelectorAll('.block-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.block-arrow').forEach(a => a.classList.remove('open'));
    const firstBody = document.querySelector('.block-body');
    const firstArrow = document.querySelector('.block-arrow');
    if (firstBody) firstBody.classList.add('open');
    if (firstArrow) firstArrow.classList.add('open');

    result.classList.add('visible');
  } catch (err) {
    error.textContent = 'Ошибка: ' + err.message;
    error.classList.add('visible');
  } finally {
    btn.disabled = false;
    loading.classList.remove('visible');
  }
}
</script>
</body>
</html>
