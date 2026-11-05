/* ==========================================================================
   SETĂRI ADDICTED2 — modifică doar blocul de mai jos
   --------------------------------------------------------------------------
   IP               adresa serverului (apare peste tot pe site și la copiere)
   VERSIONS         textul cu versiunile (RO / EN)
   DISCORD_GUILD_ID ID-ul serverului de Discord, între ghilimele, de ex.
                    '123456789012345678'. Lasă '' ca să nu arăți numărul de
                    membri online. Trebuie pornit „Server Widget” (vezi README).
   STATUS_API       de unde citim jucătorii online (gratuit, fără cont)
   Linkurile (Discord, Magazin, Instagram, TikTok) sunt scrise în index.html;
   caută adresa veche și înlocuiește-o.
   Anunțurile și echipa se editează în data/site.json.
   ========================================================================== */
const CONFIG = {
  IP: 'play.addicted2.ro',
  VERSIONS: { ro: 'Java 1.8 – latest', en: 'Java 1.8 – latest' },
  DISCORD_GUILD_ID: '',
  STATUS_API: 'https://api.mcsrvstat.us/3/',
  REFRESH_MS: 60000,
};
/* ========================================================================== */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const store = { get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } } };
document.documentElement.classList.add('js');

// RO is in the HTML; EN lives here. Keys = data-i18n / data-i18n-html / data-i18n-aria.
const EN = {
  skip: 'Skip to content', nav_modes: 'Modes', nav_join: 'How to join', nav_news: 'News', nav_team: 'Team', nav_comm: 'Community', nav_store: 'Store', menu: 'Menu',
  cta_copy: 'Copy IP', checking: 'Checking the server…',
  hero_lead: 'A Minecraft Java server for cracked and premium accounts. Join from any version, from 1.8 up to the newest.',
  modes_h: 'Game modes', modes_p: 'One server, four modes. Join on the same address and pick where you play from the lobby.',
  m_smp: 'Classic survival with other players: build your base, gather resources, trade and build with your friends.',
  m_op: 'Survival with faster progress and stronger gear. Less grinding, more action.',
  m_box: 'A PvP arena: mine, gear up and fight the others. Reflexes and strategy decide.',
  m_bw: 'Team game: protect your bed, collect resources and break the enemy beds. The last team standing wins.',
  join_h: 'How to join', s1: 'Open Minecraft Java, any version from 1.8 up, and go to Multiplayer.',
  s2: 'Press Add Server and type the address', s3: 'Select the server, press Join Server and pick your game mode.',
  s4: 'On a non-premium account, set a password with /register the first time you join, then log in with /login.',
  news_h: 'News', news_empty: 'News, events and server changes are posted on Discord first.', news_cta: 'Follow the news on Discord',
  team_h: 'Team', comm_h: 'Community',
  comm_story: '<b>Addicted2 Romania</b> is <mark class="hl-r">one server</mark> with four modes: SMP, Survival OP, Box PvP and BedWars. Join with a <mark class="hl-k">cracked or premium account</mark>, from <mark class="hl-g">Java 1.8</mark> up to the newest version, on the same address. The community lives on <a class="hl-r" href="https://discord.io/addicted2gaming" target="_blank" rel="noopener">Discord</a>: that is where news is posted, where you ask the staff for help and where you ask about the rules. Clips from the server go to <a class="hl-k" href="https://vm.tiktok.com/ZMLXfRoXy/" target="_blank" rel="noopener">TikTok</a>, photos and updates to <a class="hl-g" href="https://instagram.com/addicted2ro" target="_blank" rel="noopener">Instagram @addicted2ro</a>. To support the server, the official store is at <a class="hl-k" href="https://store.addicted2.ro" target="_blank" rel="noopener">store.addicted2.ro</a>. <a class="hl-end" href="https://discord.io/addicted2gaming" target="_blank" rel="noopener">See you on Discord.</a><span class="dc-line" hidden></span>',
  store_h: 'Support the server', store_p: 'The official Addicted2 store is at store.addicted2.ro. Payment and delivery happen there, not on this site.', store_cta: 'Open the store',
  final_h: 'See you in game', final_p: 'Copy the address, open Minecraft and connect directly. The lobby takes you to the mode you pick.',
  f_note: 'We are not affiliated with Mojang or Microsoft.',
};
const RO_JS = { copied: ip => `IP copiat: ${ip}`, copy_fail: ip => `Nu s-a putut copia. IP-ul este ${ip}`, online: (n, m) => `Online · ${n} / ${m} ${n === 1 ? 'jucător' : 'jucători'}`, offline: 'Server offline', unknown: 'Status indisponibil acum', dc: n => `${n} online pe Discord`, lang: ['EN', 'EN, switch to English', 'en'], menu: 'Meniu' };
const EN_JS = { copied: ip => `IP copied: ${ip}`, copy_fail: ip => `Copy failed. The IP is ${ip}`, online: (n, m) => `Online · ${n} / ${m} ${n === 1 ? 'player' : 'players'}`, offline: 'Server offline', unknown: 'Status unavailable right now', dc: n => `${n} online on Discord`, lang: ['RO', 'RO, schimbă în română', 'ro'], menu: 'Menu' };

let lang = 'ro';
try { if (localStorage.getItem('a2_lang') === 'en') lang = 'en'; } catch { /* stay on RO */ }
const T = () => (lang === 'en' ? EN_JS : RO_JS);

const txt = $$('[data-i18n]'), html = $$('[data-i18n-html]');
txt.forEach(n => { n.dataset.ro = n.textContent; });
html.forEach(n => { n.dataset.ro = n.innerHTML; });
function applyLang(first) {
  document.documentElement.lang = lang;
  txt.forEach(n => { n.textContent = lang === 'en' && EN[n.dataset.i18n] ? EN[n.dataset.i18n] : n.dataset.ro; });
  html.forEach(n => { n.innerHTML = lang === 'en' ? EN[n.dataset.i18nHtml] : n.dataset.ro; }); // our own strings only
  const [label, aria, l] = T().lang, b = $('#lang');
  b.textContent = label; b.setAttribute('aria-label', aria); b.lang = l;
  $('#burger').setAttribute('aria-label', T().menu);
  $('.brand').setAttribute('aria-label', lang === 'en' ? 'Addicted2 Romania, back to top' : 'Addicted2 Romania, începutul paginii');
  $$('[data-i18n=versions]').forEach(n => { n.textContent = CONFIG.VERSIONS[lang]; });
  if (!first) $$('[data-r]').forEach(n => n.classList.add('in')); // swapped nodes stay visible
  renderStatus(); renderDiscord(); renderData();
}
$('#lang').addEventListener('click', () => {
  lang = lang === 'en' ? 'ro' : 'en';
  try { localStorage.setItem('a2_lang', lang); } catch { /* not remembered */ }
  applyLang();
});

$$('[data-ip]').forEach(n => { n.textContent = CONFIG.IP; });
$('#year').textContent = new Date().getFullYear();

// burger
const nav = $('#nav'), burger = $('#burger');
const setNav = open => { nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); };
burger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); burger.focus(); } });

// copy IP + toast
let toastT;
function toast(msg) { const n = el('div', 'toast', msg); $('#toasts').replaceChildren(n); clearTimeout(toastT); toastT = setTimeout(() => n.remove(), 2600); }
async function copyIp() {
  try { await navigator.clipboard.writeText(CONFIG.IP); return true; } catch { /* http or old browser: fallback */ }
  const ta = el('textarea'); ta.value = CONFIG.IP; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
  document.body.append(ta); ta.select();
  let ok = false; try { ok = document.execCommand('copy'); } catch { /* ignore */ }
  ta.remove(); return ok;
}
document.addEventListener('click', async e => { if (e.target.closest('[data-copy]')) toast((await copyIp() ? T().copied : T().copy_fail)(CONFIG.IP)); });

// header takes the colour of the chapter under it
const hdr = $('#hdr'), themed = $$('[data-theme]'), hit = new Map();
const io = new IntersectionObserver(es => {
  es.forEach(e => hit.set(e.target, e.isIntersecting));
  const on = themed.filter(t => hit.get(t)).pop(); // deepest (band inside chapter) wins
  if (on) hdr.dataset.on = on.dataset.theme;
}, { rootMargin: '-32px 0px -100% 0px' });
themed.forEach(t => io.observe(t));

// entrances: each section's parts, staggered
const pend = new Set();
const show = n => { n.classList.add('in'); rio.unobserve(n); pend.delete(n); };
const rio = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting || e.boundingClientRect.top < 0) show(e.target);
}), { rootMargin: '0px 0px -8% 0px' });
// a fast fling or a menu jump can skip an element past the observer: reveal everything already above the fold bottom
let tk = 0;
addEventListener('scroll', () => {
  if (tk || !pend.size) return;
  tk = requestAnimationFrame(() => { tk = 0; pend.forEach(n => { if (n.getBoundingClientRect().top < innerHeight) show(n); }); });
}, { passive: true });
$$('section, .band, .field, footer').forEach(s => [...s.querySelectorAll(':scope [data-r]')].forEach((n, i) => { if (!n.style.getPropertyValue('--d')) n.style.setProperty('--d', `${Math.min(i, 4) * 80}ms`); }));
$$('[data-r]').forEach(n => { pend.add(n); rio.observe(n); });

// ---------- live: server status (mcsrvstat.us) ----------
let status = store.get('a2_status');
function renderStatus() {
  const dot = $('#srv-dot'), t = $('#srv-txt'), ver = $('#srv-ver'), pl = $('#mc-pl');
  if (!status) return;
  if (status.err) { dot.className = 'dot'; t.textContent = T().unknown; return; }
  dot.className = 'dot ' + (status.online ? 'on' : 'off');
  t.textContent = status.online ? T().online(status.n, status.m) : T().offline;
  ver.textContent = status.online && status.v ? status.v : CONFIG.VERSIONS[lang];
  pl.textContent = status.online ? `${status.n}/${status.m}` : '—';
}
async function loadStatus() {
  try {
    const r = await fetch(CONFIG.STATUS_API + encodeURIComponent(CONFIG.IP), { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    const j = await r.json();
    status = { online: !!j.online, n: j.players?.online ?? 0, m: j.players?.max ?? 0, v: typeof j.version === 'string' ? j.version.slice(0, 40) : '' };
    store.set('a2_status', status);
  } catch { if (!status || status.err) status = { err: 1 }; } // keep the last good value if we have one
  renderStatus();
}
let timer;
function schedule() { clearInterval(timer); if (!document.hidden) timer = setInterval(loadStatus, CONFIG.REFRESH_MS); }
document.addEventListener('visibilitychange', () => { if (!document.hidden) loadStatus(); schedule(); });

// ---------- live: Discord widget (only when DISCORD_GUILD_ID is set) ----------
let dc = store.get('a2_dc');
function renderDiscord() {
  if (!dc) return;
  $$('.dc-n').forEach(n => { n.textContent = `· ${dc}`; n.hidden = false; });
  $$('.dc-line').forEach(n => { n.textContent = T().dc(dc); n.hidden = false; });
}
async function loadDiscord() {
  if (!/^\d{15,22}$/.test(CONFIG.DISCORD_GUILD_ID)) return;
  try {
    const r = await fetch(`https://discord.com/api/guilds/${CONFIG.DISCORD_GUILD_ID}/widget.json`);
    if (!r.ok) throw new Error(r.status);
    const n = (await r.json()).presence_count;
    if (Number.isFinite(n)) { dc = n; store.set('a2_dc', dc); renderDiscord(); }
  } catch { /* widget off or blocked: just the button */ }
}

// ---------- data/site.json: announcements + team ----------
let data = null;
const pick = (o, k) => (lang === 'en' && o[k + '_en']) || o[k] || '';
const safeUrl = u => (typeof u === 'string' && /^https:\/\//.test(u) ? u : '');
const fmtDate = d => { const t = new Date(d + 'T12:00:00'); return isNaN(t) ? '' : t.toLocaleDateString(lang === 'en' ? 'en-GB' : 'ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }); };
function renderData() {
  if (!data) return;
  const ann = (Array.isArray(data.announcements) ? data.announcements : []).filter(a => a && a.title)
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))).slice(0, 6);
  const box = $('#news');
  box.hidden = !ann.length; $('#news-empty').hidden = !!ann.length;
  box.replaceChildren(...ann.map(a => {
    const url = safeUrl(a.link), card = el(url ? 'a' : 'article', 'ann');
    if (url) { card.href = url; card.target = '_blank'; card.rel = 'noopener'; }
    const d = fmtDate(a.date);
    if (d) { const t = el('time', '', d); t.dateTime = a.date; card.append(t); }
    card.append(el('h3', '', pick(a, 'title')));
    const body = pick(a, 'text'); if (body) card.append(el('p', '', body));
    return card;
  }));
  const staff = (Array.isArray(data.staff) ? data.staff : []).filter(s => s && /^[A-Za-z0-9_]{2,16}$/.test(s.name || ''));
  const on = staff.length > 0;
  $('#echipa').hidden = !on; $('#nav-team').hidden = !on; $$('[data-team-link]').forEach(a => { a.hidden = !on; });
  const ranks = [...new Set(staff.map(s => s.rank || 'Staff'))];
  $('#team').replaceChildren(...ranks.map(r => {
    const g = staff.filter(s => (s.rank || 'Staff') === r), sec = el('div', 'rank'), ul = el('ul', 'members');
    const c = g.find(s => /^#[0-9a-f]{6}$/i.test(s.color || ''))?.color; if (c) sec.style.setProperty('--rc', c);
    ul.setAttribute('role', 'list');
    for (const s of g) {
      const li = el('li', 'member'), img = el('img');
      Object.assign(img, { src: `https://mc-heads.net/head/${s.name}/64`, alt: '', width: 48, height: 48, loading: 'lazy', decoding: 'async' });
      img.addEventListener('error', () => img.remove(), { once: true });
      li.append(img, el('span', '', s.name)); ul.append(li);
    }
    sec.append(el('h3', '', r), ul);
    return sec;
  }));
}

applyLang(true);
renderStatus();
loadStatus(); schedule(); loadDiscord();
fetch('data/site.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(j => { data = j; renderData(); }).catch(() => { /* no json: empty states stay */ });
