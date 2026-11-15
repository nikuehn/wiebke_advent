// Sanfter Schneefall. Wird bei "Bewegung reduzieren" im System nicht gestartet.
(function () {
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.id = "snow";
  c.setAttribute("aria-hidden", "true");
  document.body.prepend(c);
  const ctx = c.getContext("2d");
  let w, h, flakes = [];

  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    const count = Math.min(120, Math.round(w * h / 12000));
    while (flakes.length < count) flakes.push(make(true));
    flakes.length = count;
  }
  function make(anywhere) {
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -10,
      r: 1.2 + Math.random() * 3,
      v: 0.4 + Math.random() * 1.1,
      s: Math.random() * Math.PI * 2,
      d: 0.3 + Math.random() * 0.6
    };
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,.85)";
    for (const f of flakes) {
      f.y += f.v;
      f.s += 0.01;
      f.x += Math.sin(f.s) * f.d;
      if (f.y > h + 10) Object.assign(f, make(false), { x: Math.random() * w });
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener("resize", resize);
  resize();
  tick();
})();
