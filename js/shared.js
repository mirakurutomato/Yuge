(function () {
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const palette = ['#ffd1dc', '#ffe8a8', '#cde7ff', '#d8f8e8', '#f6d9ff', '#ffd8b8'];
    const rand = (a, b) => Math.random() * (b - a) + a;
    let parts = [];
    function makeParts() {
      parts = [];
      const area = W * H;
      const n = Math.max(18, Math.floor(area / 160000));
      for (let i = 0; i < n; i++) {
        parts.push({ x: rand(0, W), y: rand(0, H), r: rand(1.4, 4.2), vx: rand(-0.2, 0.2), vy: rand(-0.1, 0.1), color: palette[Math.floor(rand(0, palette.length))], alpha: rand(0.12, 0.6), phase: rand(0, Math.PI * 2) });
      }
    }
    function hexToRgba(hex, a) {
      const c = hex.replace('#', ''); const r = parseInt(c.substring(0, 2), 16); const g = parseInt(c.substring(2, 4), 16); const b = parseInt(c.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    let last = performance.now();
    function anim(now) {
      const dt = (now - last) * 0.06; last = now;
      ctx.clearRect(0, 0, W, H);
      const gg = ctx.createLinearGradient(0, 0, 0, H);
      gg.addColorStop(0, 'rgba(255,255,255,0.0)'); gg.addColorStop(1, 'rgba(6,40,80,0.02)');
      ctx.fillStyle = gg; ctx.fillRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx * dt + Math.sin((now * 0.001) + p.phase) * 0.02;
        p.y += p.vy * dt + Math.cos((now * 0.0012) + p.phase) * 0.02;
        if (p.x < -60) p.x = W + 60; if (p.x > W + 60) p.x = -60; if (p.y < -60) p.y = H + 60; if (p.y > H + 60) p.y = -60;
        const rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        rg.addColorStop(0, hexToRgba(p.color, p.alpha)); rg.addColorStop(1, hexToRgba('#ffffff', 0));
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = hexToRgba(p.color, Math.min(1, p.alpha + 0.12)); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(anim);
    }
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; makeParts(); });
    makeParts(); requestAnimationFrame(anim);
  }

  window.buildPosterCarousel = function (posterImages, trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = '';
    posterImages.forEach(src => {
      const w = document.createElement('div'); w.className = 'poster-item';
      const img = document.createElement('img'); img.decoding = 'async'; img.src = src; img.alt = 'poster';
      w.appendChild(img); track.appendChild(w);
    });
    posterImages.forEach(src => {
      const w = document.createElement('div'); w.className = 'poster-item';
      const img = document.createElement('img'); img.decoding = 'async'; img.src = src; img.alt = 'poster';
      w.appendChild(img); track.appendChild(w);
    });
    requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth;
      const pxPerSec = 36;
      const durationSec = (totalWidth / 2) / pxPerSec;
      track.style.animationDuration = `${Math.max(12, Math.round(durationSec))}s`;
    });
    const slider = track.closest('.poster-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
      slider.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
      let t = null;
      slider.addEventListener('touchstart', () => { track.style.animationPlayState = 'paused'; if (t) { clearTimeout(t); t = null; } }, { passive: true });
      slider.addEventListener('touchmove', () => { track.style.animationPlayState = 'paused'; }, { passive: true });
      slider.addEventListener('touchend', () => { if (t) clearTimeout(t); t = setTimeout(() => { track.style.animationPlayState = 'running'; t = null; }, 600); }, { passive: true });
    }
  };

  (function navToggle() {
    const btn = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', (e) => {
      links.classList.toggle('show');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
    document.addEventListener('click', (e) => {
      if (!links.classList.contains('show')) return;
      const container = links.closest('.header-inner');
      if (container && !container.contains(e.target)) links.classList.remove('show');
    });
  })();

  window.renderSchedule = function (events, rootId) {
    const root = document.getElementById(rootId);
    if (!root) return;
    root.innerHTML = '';
    events.forEach(ev => {
      const card = document.createElement('article'); card.className = 'event-card';
      card.innerHTML = `<h3>${escapeHtml(ev.title)}</h3>
        <div class="event-meta"><strong>いつ:</strong> ${escapeHtml(ev.date)} ${escapeHtml(ev.time)}</div>
        <div class="event-meta"><strong>どこで:</strong> ${escapeHtml(ev.place)}</div>
        <div class="event-desc">${escapeHtml(ev.desc)}</div>`;
      root.appendChild(card);
    });
  };
  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

})();
