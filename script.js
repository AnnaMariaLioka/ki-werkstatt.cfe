(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* ---- DE/EN: Deutscher Text steht im HTML, englischer in data-en ---- */
  const items = $$('[data-en]');
  items.forEach((el) => (el.dataset.de = el.innerHTML));
  const titles = { de: document.title, en: 'AI Workshop – Center for Entrepreneurship, Reutlingen University' };
  /*const ph = { de: ['Dein Name', 'Deine E-Mail'], en: ['Your name', 'Your email'] };*/

  function setLang(l) {
    document.documentElement.lang = l;
    items.forEach((el) => (el.innerHTML = el.dataset[l]));
    document.title = titles[l];
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.l === l));
    /*const f = $('#cf');
    f.n.placeholder = ph[l][0];
    f.e.placeholder = ph[l][1];**/
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.l)));
  let start = 'de';
  try { start = new URLSearchParams(location.search).get('lang') || localStorage.getItem('lang') || 'de'; } catch (e) {}
  setLang(start === 'en' ? 'en' : 'de'); // Deutsch standardmäßig aktiv

  /* ---- Mobile-Navigation ---- */
  const nav = $('#nav'), burger = $('#burger');
  burger.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
  });
  $$('#links a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  /* ---- Scroll-Reveal (IntersectionObserver, nur transform/opacity) ---- */
  const rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    rv.forEach((el) => io.observe(el));
  } else rv.forEach((el) => el.classList.add('in'));

  /* ---- Lichtreflex auf Cards folgt Finger/Maus ---- */
  document.addEventListener('pointermove', (e) => {
    const c = e.target.closest && e.target.closest('.card');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  }, { passive: true });

})();
