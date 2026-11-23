// Renders the page from content.js. You shouldn't need to edit this file
// to change your content.
(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);

  // Small helper: el("div", {class: "x"}, child1, "text", ...)
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === "") continue;
      if (k === "class") node.className = v;
      else node.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  // Turns "[sim]x[/sim]" and "[lab]y[/lab]" into colored spans.
  function colorize(text) {
    const frag = document.createDocumentFragment();
    const re = /\[(sim|lab)\]([\s\S]*?)\[\/\1\]/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      frag.append(text.slice(last, m.index), el("span", { class: m[1] }, m[2]));
      last = re.lastIndex;
    }
    frag.append(text.slice(last));
    return frag;
  }

  const dots = (tags) => (tags || []).map((t) =>
    el("span", { class: "dot dot-" + t, title: t === "sim" ? "simulation" : "lab work" }));

  // ---------- header, hero, about ----------
  document.title = S.pageTitle || S.name;
  $("logo").textContent = S.initials;
  $("name").textContent = S.name;
  $("tagline").append(colorize(S.tagline));
  S.about.forEach((p) => $("aboutText").append(el("p", {}, colorize(p))));

  // ---------- labels: headings, buttons, menu ----------
  const L = S.labels || {};
  const setText = (id, text) => { if ($(id)) $(id).append(colorize(text || "")); };
  setText("kicker", L.kicker);
  setText("aboutTitle", L.aboutTitle);
  setText("workTitle", L.workTitle);
  setText("papersTitle", L.papersTitle);
  setText("journeyTitle", L.journeyTitle);
  setText("journeySubtitle", L.journeySubtitle);
  $("contactBtn").textContent = L.contactButton || "";

  const isExternal = (link) => /^https?:/.test(link || "");
  const NAMED = ["cyan", "magenta", "lime", "amber", "violet", "coral"];
  (L.heroButtons || []).forEach((b) => {
    const c = (b.color || "").trim();
    const colorVar = NAMED.includes(c) ? "var(--" + c + ")" : c;
    $("heroButtons").append(el("a", {
      href: b.link, class: "pill " + (c ? "pill-color" : "pill-ghost"),
      style: c ? "--c: " + colorVar : null,
      target: isExternal(b.link) ? "_blank" : null, rel: isExternal(b.link) ? "noopener" : null
    }, b.text));
  });
  (L.menu || []).forEach((m) => {
    $("menu").append(el("a", {
      href: m.link,
      target: isExternal(m.link) ? "_blank" : null, rel: isExternal(m.link) ? "noopener" : null
    }, m.text));
  });
  document.querySelectorAll(".legend").forEach((p) => {
    p.append(el("span", { class: "dot dot-sim" }), L.legendSim || "",
             el("span", { class: "dot dot-lab" }), L.legendLab || "");
  });

  // ---------- projects ----------
  S.projects.forEach((p) => {
    const sim = (p.sim || []).join(" · ");
    const lab = (p.lab || []).join(" · ");
    const tools = el("div", { class: "tools" },
      sim && el("span", { class: "sim" }, sim.toLowerCase()),
      sim && lab && el("span", { class: "sep" }, "/"),
      lab && el("span", { class: "lab" }, lab.toLowerCase()));
    const title = p.url ? el("a", { href: p.url, target: "_blank", rel: "noopener" }, p.title) : p.title;
    $("projects").append(el("article", { class: "project reveal" },
      el("h3", {}, title), tools,
      p.summary && el("p", {}, p.summary),
      p.image && el("img", { src: p.image, alt: p.title, loading: "lazy" })));
  });

  // ---------- papers ----------
  S.papers.forEach((p) => {
    const title = p.url
      ? el("a", { class: "paper-title", href: p.url, target: "_blank", rel: "noopener" }, p.title)
      : el("span", { class: "paper-title" }, p.title);
    $("paperList").append(el("div", { class: "paper reveal" }, title,
      el("p", { class: "paper-meta" },
        el("span", { class: "venue" }, p.venue), " · " + p.year,
        p.authors ? " · " + p.authors : "")));
  });
  if (S.links.scholar && L.papersMoreLink) {
    $("scholarMore").append(el("a", { href: S.links.scholar, target: "_blank", rel: "noopener" }, L.papersMoreLink));
  }

  // ---------- journey ----------
  const ICONS = {
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.6 1.6 0 0 0 5.9 21h12.2a1.6 1.6 0 0 0 1.4-2.5L14 9V3"/><path d="M7.5 15h9"/>',
    teach: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20l4-4 4 4M7 8h6M7 11h4"/>',
    school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>'
  };
  const icon = (name) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.5");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[name] || ICONS.flask;
    return s;
  };

  S.journey.forEach((g) => {
    const group = el("div", { class: "group c-" + (g.color || "lime") },
      el("div", { class: "group-head reveal" }, icon(g.icon), el("h3", { class: "group-label" }, g.group)));
    g.items.forEach((it) => {
      group.append(el("div", { class: "step reveal" },
        el("span", { class: "years" }, it.years),
        el("div", { class: "card" },
          el("div", { class: "card-title" }, it.title),
          el("div", { class: "card-org" }, it.org),
          it.tags && it.tags.length ? el("div", { class: "card-tags" }, dots(it.tags)) : null)));
    });
    $("timeline").append(group);
  });

  // ---------- footer ----------
  const SOCIAL = {
    linkedin: ["LinkedIn", '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/>'],
    scholar: ["Google Scholar", '<path d="M2 9l10-6 10 6-10 6z"/><path d="M7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"/>'],
    email: ["Email", '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'],
    cv: ["CV", '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>']
  };
  for (const [key, [label, path]] of Object.entries(SOCIAL)) {
    const v = S.links[key];
    if (!v) continue;
    const href = key === "email" ? "mailto:" + v : v;
    const a = el("a", { href, "aria-label": label, title: label, target: key === "email" ? null : "_blank", rel: "noopener" });
    a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
    $("socials").append(a);
  }
  $("contactBtn").href = "mailto:" + S.links.email;
  $("year").textContent = new Date().getFullYear();
  $("footName").textContent = S.name;

  // ---------- menu ----------
  const btn = $("menuBtn"), menu = $("menu");
  const setMenu = (open) => {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) setMenu(false);
  });

  // ---------- reveal on scroll ----------
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach((n) => n.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach((n) => io.observe(n));
  }

  // ---------- hero: simulated streamlines + measured tracer particles ----------
  const canvas = $("flow");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, lines = [], particles = [];

  // A smooth "flow" field: each streamline is a sum of two waves.
  const yAt = (ln, x, t) =>
    ln.y0 + ln.a1 * Math.sin(x * ln.k1 + ln.p1 + t * 0.00012) + ln.a2 * Math.sin(x * ln.k2 + ln.p2 - t * 0.00008);

  function setup() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(7, Math.round(H / 70));
    lines = Array.from({ length: n }, (_, i) => ({
      y0: (H / (n + 1)) * (i + 1),
      a1: 18 + Math.random() * 26, k1: 0.004 + Math.random() * 0.004, p1: Math.random() * 6,
      a2: 6 + Math.random() * 12, k2: 0.01 + Math.random() * 0.01, p2: Math.random() * 6,
      sim: i % 2 === 0
    }));
    const count = Math.round(W / 9);
    particles = Array.from({ length: count }, () => {
      const lab = lines.filter((l) => !l.sim);
      return { line: lab[Math.floor(Math.random() * lab.length)], x: Math.random() * W,
               v: 0.25 + Math.random() * 0.55, r: 1 + Math.random() * 1.4, off: (Math.random() - 0.5) * 10 };
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    // Simulated: continuous cyan streamlines
    ctx.lineWidth = 1;
    lines.forEach((ln) => {
      if (!ln.sim) return;
      ctx.strokeStyle = "rgba(34, 229, 255, 0.45)";
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) {
        const y = yAt(ln, x, t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    // Measured: magenta tracer particles riding the other streamlines
    ctx.fillStyle = "rgba(255, 43, 214, 0.85)";
    ctx.shadowColor = "rgba(255, 43, 214, 0.8)";
    ctx.shadowBlur = 6;
    particles.forEach((p) => {
      if (!reduce) { p.x += p.v; if (p.x > W + 5) p.x = -5; }
      ctx.beginPath();
      ctx.arc(p.x, yAt(p.line, p.x, t) + p.off, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  function loop(t) {
    if (visible) draw(t);
    requestAnimationFrame(loop);
  }

  setup();
  if (reduce) draw(0); else requestAnimationFrame(loop);
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { setup(); if (reduce) draw(0); }, 150); });
})();
