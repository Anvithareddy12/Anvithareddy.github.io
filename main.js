// main.js — loader, cursor, nav, neural network, typing, reveals, GSAP, counters

// ── LOADER ──────────────────────────────────────────────────────────────────
(function () {
  var MSGS = ['Initialising neural pathways…','Loading 1800 particles…','Warming up LLM twin…','Compiling animations…','Almost sentient…'];
  var bar = document.getElementById('ld-bar');
  var msgEl = document.getElementById('ld-msg');
  var loader = document.getElementById('loader');
  var pct = 0, mi = 0;
  var iv = setInterval(function () {
    pct = Math.min(pct + Math.random() * 15 + 5, 93);
    if (bar) bar.style.width = pct + '%';
    if (msgEl && mi < MSGS.length) msgEl.textContent = MSGS[mi++];
  }, 300);
  window.addEventListener('load', function () {
    clearInterval(iv);
    if (bar) bar.style.width = '100%';
    setTimeout(function () {
      if (loader) { loader.style.opacity = '0'; loader.style.pointerEvents = 'none'; }
      setTimeout(function () { if (loader) loader.style.display = 'none'; }, 650);
    }, 300);
  });
}());

// ── CURSOR ───────────────────────────────────────────────────────────────────
(function () {
  var dot = document.getElementById('cursor');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function track() { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(track); }());
  var hov = document.querySelectorAll('a,button,.proj-card,.exp-card,.skill-card,.sugg,.edu-card');
  hov.forEach(function (el) {
    el.addEventListener('mouseenter', function () { dot.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', function () { dot.classList.remove('big'); ring.classList.remove('big'); });
  });
}());

// ── NAV ───────────────────────────────────────────────────────────────────────
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 50); });
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
  var aiBtn = document.getElementById('nav-ai-btn');
  if (aiBtn) aiBtn.addEventListener('click', function () { openChat(); });
}());

// ── MOBILE NAV ───────────────────────────────────────────────────────────────
(function () {
  var hamburger = document.getElementById('nav-hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var overlay   = document.getElementById('mobile-nav-overlay');
  var closeBtn  = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    mobileNav && mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
  if (overlay)  overlay.addEventListener('click',   closeMobileNav);
  if (mobileNav) mobileNav.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', closeMobileNav);
  });
  var mobileAiBtn = document.getElementById('mobile-ai-btn');
  if (mobileAiBtn) mobileAiBtn.addEventListener('click', function () {
    closeMobileNav();
    if (typeof openChat === 'function') openChat();
  });
}());

// ── SCROLL TO TOP ─────────────────────────────────────────────────────────────
(function () {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('vis', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());

// ── NEURAL NETWORK CANVAS BACKGROUND ─────────────────────────────────────────
function initNeuralNetwork() {
  var canvas = document.getElementById('net-canvas');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create nodes
  var TOTAL = window.innerWidth < 768 ? 45 : 90;
  var nodes = [];
  for (var i = 0; i < TOTAL; i++) {
    nodes.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.8 + 0.8
    });
  }

  var MAX_DIST = 150;
  // Colour palette: mostly cyan, some violet
  var COLORS = ['rgba(0,212,255,', 'rgba(124,92,252,', 'rgba(54,245,192,'];

  function draw() {
    if (document.hidden) { requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          var alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.strokeStyle = 'rgba(0,212,255,' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var col = COLORS[i % COLORS.length];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = col + '0.55)';
      ctx.fill();

      // Move
      n.x += n.vx;
      n.y += n.vy;

      // Wrap edges (seamless)
      if (n.x < -10) n.x = canvas.width + 10;
      if (n.x > canvas.width + 10) n.x = -10;
      if (n.y < -10) n.y = canvas.height + 10;
      if (n.y > canvas.height + 10) n.y = -10;
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ── TYPING ANIMATION ──────────────────────────────────────────────────────────
function initTyping() {
  var el = document.getElementById('typing-text');
  if (!el) return;
  var phrases = ['AI / ML Engineer', 'LLM Systems Builder', 'RAG Pipeline Architect', 'Text-to-SQL Specialist'];
  var pi = 0, ci = 0, deleting = false;
  function tick() {
    var ph = phrases[pi];
    if (!deleting) {
      el.textContent = ph.slice(0, ++ci);
      if (ci === ph.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = ph.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 44 : 78);
  }
  setTimeout(tick, 2000);
}

// ── SCROLL REVEAL (IntersectionObserver) — only for .rv elements ──────────────
// NOTE: exp-cards and proj-cards do NOT have .rv class — GSAP handles them.
function initReveal() {
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('vis'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('vis'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { obs.observe(el); });
}

// ── COUNTER ANIMATION ─────────────────────────────────────────────────────────
function initCounters() {
  var els = document.querySelectorAll('.c-num[data-target]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      obs.unobserve(en.target);
      var el = en.target;
      var target = parseInt(el.getAttribute('data-target'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var startTime = null;
      var dur = 1800;
      function step(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach(function (el) { obs.observe(el); });
}

// ── GSAP HERO ENTRANCE + EXP/PROJ SCROLL ──────────────────────────────────────
// Hero elements have NO opacity:0 in CSS. GSAP from() animates them FROM 0 TO visible.
// Exp/proj cards also have NO .rv class — GSAP handles them exclusively.
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('vis'); });
    return;
  }
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  var tl = gsap.timeline({ delay: 0.2 });
  tl.from('#h-badge',  { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' })
    .from('#h-label',  { opacity: 0, y: 18, duration: 0.45, ease: 'power2.out' }, '-=0.2')
    .from('#h-title',  { opacity: 0, y: 26, duration: 0.55, ease: 'power2.out' }, '-=0.25')
    .from('#h-sub',    { opacity: 0, y: 14, duration: 0.4,  ease: 'power2.out' }, '-=0.3')
    .from('#h-typing', { opacity: 0, y: 10, duration: 0.35, ease: 'power2.out' }, '-=0.2')
    .from('#h-desc',   { opacity: 0, y: 14, duration: 0.4,  ease: 'power2.out' }, '-=0.2')
    .from('#h-btns',   { opacity: 0, y: 14, duration: 0.4,  ease: 'power2.out' }, '-=0.2')
    .from('#h-right',  { opacity: 0, scale: 0.84, duration: 0.9, ease: 'back.out(1.3)' }, '-=0.65');

  if (typeof ScrollTrigger === 'undefined') return;

  // Exp cards — no .rv, start naturally visible, GSAP animates in
  gsap.utils.toArray('.exp-card').forEach(function (card, i) {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0,
      y: 40,
      duration: 0.65,
      ease: 'power2.out',
      delay: i * 0.1
    });
  });

  // Proj cards — no .rv, start naturally visible, GSAP animates in
  gsap.utils.toArray('.proj-card').forEach(function (card, i) {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 0,
      scale: 0.94,
      y: 20,
      duration: 0.55,
      ease: 'back.out(1.2)',
      delay: i * 0.08
    });
  });
}

// ── ARCHITECTURE TOGGLE ───────────────────────────────────────────────────────
function toggleArch(btn) {
  var card = btn.closest ? btn.closest('.exp-card') : btn.parentElement;
  if (!card) return;
  var diag = card.querySelector('.arch-diagram');
  if (!diag) return;
  var open = diag.style.display === 'block';
  diag.style.display = open ? 'none' : 'block';
  btn.textContent = open ? 'View Architecture ▾' : 'Hide Architecture ▴';
}

// ── PROJ CARD RADIAL GLOW ─────────────────────────────────────────────────────
function initProjGlow() {
  document.querySelectorAll('.proj-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    });
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function initAll() {
  initNeuralNetwork();
  initReveal();
  initCounters();
  initTyping();
  initProjGlow();
  initGSAP();
  if (typeof initSphere === 'function') initSphere();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
