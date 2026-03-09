/**
 * RIPPLE FIELD — PURPOSE SECTION CANVAS ANIMATION (BACKUP)
 * =========================================================
 * Original animation from services-section-mockup.html (lines ~3165-3475)
 * Backed up on 2026-03-09 before replacing with "D → Logo Symbol" animation.
 *
 * Dependencies (defined earlier in the mockup's <script> block):
 *   const CYAN    = { r: 76,  g: 201, b: 208 };
 *   const TEAL    = { r: 59,  g: 191, b: 166 };
 *   const EMERALD = { r: 66,  g: 198, b: 139 };
 *   const WHITE   = { r: 255, g: 255, b: 255 };
 *   function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a})`; }
 *   function lerpColor(a, b, t) { ... }
 *
 * Canvas element: <canvas id="elixirCanvas">
 * Section: .purpose-section
 */

(function initRippleField() {
  const canvas = document.getElementById('elixirCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cx, cy, maxRadius;
  let animId = null;
  let frameCount = 0;
  let rippleId = 0;

  const seedColors = [CYAN, TEAL, EMERALD];

  // State
  let seeds = [];
  let ripples = [];
  let ambient = [];
  let originFlash = 0; // brightness spike when emitting ripple

  function generateSeeds() {
    seeds = [];
    const count = Math.max(12, Math.min(20, Math.floor(W * H / 5000)));
    const cols = 5, rows = 4;
    const cellW = W / cols, cellH = H / rows;

    // Fill grid cells, pick ~count cells randomly
    const cells = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        cells.push({ c, r });

    // Shuffle and pick
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    const used = cells.slice(0, count);

    used.forEach((cell, i) => {
      const jitterX = (Math.random() - 0.5) * cellW * 0.7;
      const jitterY = (Math.random() - 0.5) * cellH * 0.7;
      const x = (cell.c + 0.5) * cellW + jitterX;
      const y = (cell.r + 0.5) * cellH + jitterY;
      const distFromCenter = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      seeds.push({
        x, y,
        distFromCenter,
        baseSize: 1.2 + Math.random() * 1.3,
        baseAlpha: 0.06 + Math.random() * 0.04,
        currentAlpha: 0,
        currentSize: 0,
        bloomTimer: 0,
        color: seedColors[i % 3],
        phase: Math.random() * Math.PI * 2,
        lastRippleId: -1
      });
      seeds[seeds.length - 1].currentAlpha = seeds[seeds.length - 1].baseAlpha;
      seeds[seeds.length - 1].currentSize = seeds[seeds.length - 1].baseSize;
    });
  }

  function generateAmbient() {
    ambient = [];
    const count = Math.min(8, Math.floor(W * H / 12000));
    for (let i = 0; i < count; i++) {
      ambient.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1,
        size: 0.6 + Math.random() * 0.9, alpha: 0.03 + Math.random() * 0.04
      });
    }
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = parseInt(getComputedStyle(canvas).height) || 340;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2; cy = H / 2;
    maxRadius = Math.sqrt(W * W + H * H) / 2 + 20;
    generateSeeds();
    generateAmbient();
  }

  function spawnRipple() {
    rippleId++;
    ripples.push({ id: rippleId, radius: 0, alpha: 0.35 });
    originFlash = 1.0;
  }

  function getRippleColor(radius) {
    const pct = radius / maxRadius;
    if (pct < 0.3) return lerpColor(CYAN, TEAL, pct / 0.3);
    if (pct < 0.6) return lerpColor(TEAL, EMERALD, (pct - 0.3) / 0.3);
    return EMERALD;
  }

  function drawAmbient() {
    ambient.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(TEAL, p.alpha);
      ctx.fill();
    });
  }

  function drawRipples(t) {
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rip = ripples[i];
      const speed = Math.max(0.3, 0.6 - rip.radius * 0.0005);
      rip.radius += speed;
      rip.alpha = 0.35 * (1 - rip.radius / maxRadius);

      if (rip.radius > maxRadius) { ripples.splice(i, 1); continue; }
      if (rip.alpha <= 0) { ripples.splice(i, 1); continue; }

      const color = getRippleColor(rip.radius);
      const pts = 48;

      // Primary ring
      ctx.beginPath();
      for (let j = 0; j <= pts; j++) {
        const theta = (j / pts) * Math.PI * 2;
        const distort = 2.5 * Math.sin(theta * 4 + t * 0.5) + 1.5 * Math.sin(theta * 6 - t * 0.8);
        const r = rip.radius + distort;
        const px = cx + Math.cos(theta) * r;
        const py = cy + Math.sin(theta) * r;
        if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = rgba(color, rip.alpha);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Secondary ring (depth)
      ctx.beginPath();
      for (let j = 0; j <= pts; j++) {
        const theta = (j / pts) * Math.PI * 2;
        const distort = 2 * Math.sin(theta * 4 + t * 0.5 + 0.3) + 1.2 * Math.sin(theta * 6 - t * 0.8 + 0.5);
        const r = rip.radius + 4 + distort;
        const px = cx + Math.cos(theta) * r;
        const py = cy + Math.sin(theta) * r;
        if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = rgba(color, rip.alpha * 0.3);
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Check seed blooms
      seeds.forEach(seed => {
        if (seed.lastRippleId === rip.id) return;
        if (Math.abs(rip.radius - seed.distFromCenter) < 6) {
          seed.bloomTimer = 1.0;
          seed.lastRippleId = rip.id;
        }
      });
    }
  }

  function drawSeeds(t) {
    const glowR = Math.min(22, W * 0.045);

    seeds.forEach(seed => {
      // Gentle bob
      const bobX = Math.sin(t * 0.7 + seed.phase) * 1;
      const bobY = Math.cos(t * 0.6 + seed.phase + 1) * 0.8;
      const sx = seed.x + bobX;
      const sy = seed.y + bobY;

      // Bloom decay
      if (seed.bloomTimer > 0) {
        seed.bloomTimer = Math.max(0, seed.bloomTimer - 0.01);
      }

      // EQUITY: same peak intensity for all seeds, near or far
      const bt = seed.bloomTimer;
      const bloomAlpha = seed.baseAlpha + (0.65 - seed.baseAlpha) * bt;
      const bloomSize = seed.baseSize + 5 * bt;

      // Color transformation: shift toward white during bloom
      const bloomColor = bt > 0 ? lerpColor(seed.color, WHITE, bt * 0.5) : seed.color;

      // Outer glow halo (visible during bloom)
      if (bt > 0.15) {
        const g1 = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR * 1.5);
        g1.addColorStop(0, rgba(seed.color, 0.08 * bt));
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(sx, sy, glowR * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner glow burst (first 40% of bloom — brighter, tighter)
      if (bt > 0.6) {
        const burstIntensity = (bt - 0.6) / 0.4;
        const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        g2.addColorStop(0, rgba(WHITE, 0.2 * burstIntensity));
        g2.addColorStop(0.3, rgba(bloomColor, 0.25 * burstIntensity));
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Seed dot — color transforms during bloom
      ctx.beginPath();
      ctx.arc(sx, sy, bloomSize, 0, Math.PI * 2);
      ctx.fillStyle = rgba(bloomColor, bloomAlpha);
      ctx.fill();
    });
  }

  function drawOrigin(t) {
    const breathe = 1 + 0.15 * Math.sin(t * 1.2);
    const baseR = 6 * breathe;

    // Flash decay
    if (originFlash > 0) originFlash = Math.max(0, originFlash - 0.03);
    const flashBoost = originFlash * 0.2;

    // Outer atmospheric glow
    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
    g1.addColorStop(0, rgba(TEAL, 0.04 + flashBoost * 0.3));
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.fill();

    // Mid glow
    const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
    g2.addColorStop(0, rgba(CYAN, 0.12 + flashBoost));
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();

    // Core
    const g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR);
    g3.addColorStop(0, rgba(WHITE, 0.3 + flashBoost));
    g3.addColorStop(0.5, rgba(CYAN, 0.1 + flashBoost * 0.5));
    g3.addColorStop(1, 'transparent');
    ctx.fillStyle = g3;
    ctx.beginPath(); ctx.arc(cx, cy, baseR, 0, Math.PI * 2); ctx.fill();
  }

  function drawBrandText(t) {
    const textY = cy + 22;
    const pulse = 0.18 + 0.07 * Math.sin(t * 0.8);
    const fontSize = Math.max(11, Math.min(14, W * 0.028));

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Single line: "Digixr. Digital Elixir"
    ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    const brandText = 'Digixr.';
    const brandWidth = ctx.measureText(brandText).width;

    ctx.font = `italic 400 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    const meaningText = ' Digital Elixir';
    const meaningWidth = ctx.measureText(meaningText).width;

    const totalWidth = brandWidth + meaningWidth;
    const startX = cx - totalWidth / 2;

    // Brand name — bold, brighter
    ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = rgba(CYAN, pulse + 0.15);
    ctx.fillText(brandText, startX + brandWidth / 2, textY);

    // Meaning — italic, softer
    ctx.font = `italic 400 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = rgba(TEAL, pulse + 0.08);
    ctx.fillText(meaningText, startX + brandWidth + meaningWidth / 2, textY);

    ctx.restore();
  }

  function animate(time) {
    const t = time * 0.001;
    ctx.clearRect(0, 0, W, H);

    drawAmbient();
    drawRipples(t);
    drawSeeds(t);
    drawOrigin(t);
    drawBrandText(t);

    // Spawn ripple every ~3 seconds
    frameCount++;
    if (frameCount % 180 === 0) spawnRipple();

    animId = requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);

  // Start with one ripple already in progress
  spawnRipple();
  animId = requestAnimationFrame(animate);
})();
