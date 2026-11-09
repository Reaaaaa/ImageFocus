(() => {
  "use strict";

  // ── i18n ─────────────────────────────────────────────────────────────────────
  const lang = navigator.language.startsWith("de") ? "de" : "en";
  const i18n = {
    de: "Scrollen: Zoom · Ziehen: Verschieben · F: Vollbild · ESC / Doppelklick: Schließen",
    en: "Scroll: Zoom · Drag: Pan · F: Fullscreen · ESC / Double-click: Close"
  };

  // ── SVG icon descriptors ──────────────────────────────────────────────────────
  const NS = "http://www.w3.org/2000/svg";

  const ICON_FILL = [
    ["line",     { x1:"12", y1:"3",  x2:"12", y2:"21" }],
    ["line",     { x1:"3",  y1:"12", x2:"21", y2:"12" }],
    ["polyline", { points:"9 6 12 3 15 6" }],
    ["polyline", { points:"9 18 12 21 15 18" }],
    ["polyline", { points:"6 9 3 12 6 15" }],
    ["polyline", { points:"18 9 21 12 18 15" }]
  ];

  const ICON_SHRINK = [
    ["line",     { x1:"12", y1:"3",  x2:"12", y2:"21" }],
    ["line",     { x1:"3",  y1:"12", x2:"21", y2:"12" }],
    ["polyline", { points:"9 3 12 6 15 3" }],
    ["polyline", { points:"9 21 12 18 15 21" }],
    ["polyline", { points:"3 9 6 12 3 15" }],
    ["polyline", { points:"21 9 18 12 21 15" }]
  ];

  const ICON_DOWNLOAD = [
    ["line",     { x1:"12", y1:"3",  x2:"12", y2:"15" }],
    ["polyline", { points:"8 11 12 15 16 11" }],
    ["line",     { x1:"5",  y1:"19", x2:"19", y2:"19" }]
  ];

  const ICON_EXPAND = [
    ["polyline", { points:"15 3 21 3 21 9" }],
    ["polyline", { points:"9 21 3 21 3 15" }],
    ["line",     { x1:"21", y1:"3",  x2:"14", y2:"10" }],
    ["line",     { x1:"3",  y1:"21", x2:"10", y2:"14" }]
  ];

  const ICON_COMPRESS = [
    ["polyline", { points:"4 14 10 14 10 20" }],
    ["polyline", { points:"20 10 14 10 14 4" }],
    ["line",     { x1:"14", y1:"10", x2:"21", y2:"3" }],
    ["line",     { x1:"3",  y1:"21", x2:"10", y2:"14" }]
  ];

  function makeSvg(descriptor) {
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    for (const [tag, attrs] of descriptor) {
      const el = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      svg.appendChild(el);
    }
    return svg;
  }

  function setIcon(btn, descriptor) {
    btn.replaceChildren(makeSvg(descriptor));
  }

  // ── State ────────────────────────────────────────────────────────────────────
  let overlay     = null;
  let img         = null;
  let hint        = null;
  let controls    = null;
  let fillBtn     = null;
  let downloadBtn = null;
  let fsBtn       = null;
  let isFilled    = false;

  let scale     = 1;
  let minScale  = 1;
  const MAX_SCALE = 10;
  const ZOOM_FACTOR = 0.12;

  let translateX = 0;
  let translateY = 0;
  let isPanning  = false;
  let panStartX  = 0;
  let panStartY  = 0;
  let panOriginX = 0;
  let panOriginY = 0;

  // ── Open overlay ─────────────────────────────────────────────────────────────
  function openOverlay(sourceImg) {
    if (overlay) return;

    overlay = document.createElement("div");
    overlay.id = "imagefocus-overlay";

    img = document.createElement("img");
    img.src = sourceImg.src || sourceImg.currentSrc || sourceImg.getAttribute("src");
    img.draggable = false;
    img.alt = "";

    hint = document.createElement("div");
    hint.id = "imagefocus-hint";
    hint.textContent = i18n[lang];

    fillBtn = document.createElement("button");
    fillBtn.id = "imagefocus-fill-btn";
    fillBtn.title = lang === "de" ? "Fenster ausfüllen" : "Fill window";
    setIcon(fillBtn, ICON_FILL);
    fillBtn.addEventListener("click", toggleFillSize);

    downloadBtn = document.createElement("button");
    downloadBtn.id = "imagefocus-download-btn";
    downloadBtn.title = lang === "de" ? "Bild herunterladen" : "Download image";
    setIcon(downloadBtn, ICON_DOWNLOAD);
    downloadBtn.addEventListener("click", downloadImage);

    fsBtn = document.createElement("button");
    fsBtn.id = "imagefocus-fullscreen-btn";
    fsBtn.title = lang === "de" ? "Vollbild" : "Fullscreen";
    setIcon(fsBtn, ICON_EXPAND);
    fsBtn.addEventListener("click", toggleFullscreen);

    controls = document.createElement("div");
    controls.id = "imagefocus-controls";
    controls.appendChild(fillBtn);
    controls.appendChild(downloadBtn);
    controls.appendChild(fsBtn);

    overlay.appendChild(img);
    overlay.appendChild(hint);
    overlay.appendChild(controls);
    document.body.appendChild(overlay);

    scale = 1;
    translateX = 0;
    translateY = 0;
    isFilled = false;

    applyTransform();

    overlay.addEventListener("wheel",       onWheel,     { passive: false });
    overlay.addEventListener("mousedown",   onMouseDown);
    overlay.addEventListener("dblclick",    onDblClick);
    document.addEventListener("mousemove",  onMouseMove);
    document.addEventListener("mouseup",    onMouseUp);
    document.addEventListener("keydown",    onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
  }

  // ── Close overlay ────────────────────────────────────────────────────────────
  function closeOverlay() {
    if (!overlay) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => removeOverlay());
      return;
    }
    removeOverlay();
  }

  function removeOverlay() {
    if (!overlay) return;

    overlay.removeEventListener("wheel",      onWheel);
    overlay.removeEventListener("mousedown",  onMouseDown);
    overlay.removeEventListener("dblclick",   onDblClick);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup",   onMouseUp);
    document.removeEventListener("keydown",   onKeyDown);
    document.removeEventListener("fullscreenchange", onFullscreenChange);

    if (fillBtn)     fillBtn.removeEventListener("click", toggleFillSize);
    if (downloadBtn) downloadBtn.removeEventListener("click", downloadImage);
    if (fsBtn)       fsBtn.removeEventListener("click", toggleFullscreen);

    overlay.remove();
    overlay     = null;
    img         = null;
    hint        = null;
    controls    = null;
    fillBtn     = null;
    downloadBtn = null;
    fsBtn       = null;
    isFilled    = false;
    isPanning   = false;
  }

  // ── Download ─────────────────────────────────────────────────────────────────
  async function downloadImage() {
    if (!img) return;
    const src = img.src;
    const filename = src.split("/").pop().split("?")[0].split("#")[0] || "image";

    try {
      const res = await fetch(src, { credentials: "include" });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      const a = document.createElement("a");
      a.href = src;
      a.download = filename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // ── Fullscreen ───────────────────────────────────────────────────────────────
  function toggleFullscreen() {
    if (!overlay) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      overlay.requestFullscreen().catch(() => {});
    }
  }

  function onFullscreenChange() {
    if (!overlay || !fsBtn) return;

    if (document.fullscreenElement) {
      overlay.classList.add("fullscreen");
      setIcon(fsBtn, ICON_COMPRESS);
      fsBtn.title = lang === "de" ? "Vollbild beenden" : "Exit fullscreen";
    } else {
      overlay.classList.remove("fullscreen");
      setIcon(fsBtn, ICON_EXPAND);
      fsBtn.title = lang === "de" ? "Vollbild" : "Fullscreen";
    }

    resetView();
  }

  function resetView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    isFilled = false;
    if (fillBtn) {
      setIcon(fillBtn, ICON_FILL);
      fillBtn.title = lang === "de" ? "Fenster ausfüllen" : "Fill window";
    }
    applyTransform();
  }

  // ── Fill window (toggle) ─────────────────────────────────────────────────────
  function toggleFillSize() {
    if (isFilled) {
      resetView();
    } else {
      applyFillSize();
    }
  }

  function applyFillSize() {
    if (!img || !overlay) return;
    const baseW = img.offsetWidth;
    const baseH = img.offsetHeight;
    if (!baseW || !baseH) return;

    const padding = 10;
    const scaleW = (overlay.clientWidth  - padding) / baseW;
    const scaleH = (overlay.clientHeight - padding) / baseH;

    scale      = Math.min(MAX_SCALE, Math.min(scaleW, scaleH));
    translateX = 0;
    translateY = 0;
    isFilled   = true;

    if (fillBtn) {
      setIcon(fillBtn, ICON_SHRINK);
      fillBtn.title = lang === "de" ? "Zurück zur Übersicht" : "Reset to fit";
    }

    applyTransform();
  }

  // ── Transform ────────────────────────────────────────────────────────────────
  function applyTransform() {
    if (!img) return;
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  // ── Zoom ─────────────────────────────────────────────────────────────────────
  function zoomAt(clientX, clientY, delta) {
    const prevScale = scale;
    scale = Math.min(MAX_SCALE, Math.max(minScale, scale * (1 + delta)));

    const rect = overlay.getBoundingClientRect();
    const cx   = clientX - (rect.left + rect.width  / 2);
    const cy   = clientY - (rect.top  + rect.height / 2);

    translateX = cx - (scale / prevScale) * (cx - translateX);
    translateY = cy - (scale / prevScale) * (cy - translateY);

    if (scale <= minScale) {
      translateX = 0;
      translateY = 0;
      isFilled   = false;
      if (fillBtn) {
        setIcon(fillBtn, ICON_FILL);
        fillBtn.title = lang === "de" ? "Fenster ausfüllen" : "Fill window";
      }
    }

    applyTransform();
  }

  // ── Event Handlers ───────────────────────────────────────────────────────────
  function onWheel(e) {
    e.preventDefault();
    e.stopPropagation();
    const dir = e.deltaY < 0 ? 1 : -1;
    zoomAt(e.clientX, e.clientY, dir * ZOOM_FACTOR);
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    if (controls && controls.contains(e.target)) return;
    e.preventDefault();
    isPanning  = true;
    panStartX  = e.clientX;
    panStartY  = e.clientY;
    panOriginX = translateX;
    panOriginY = translateY;
    overlay.classList.add("grabbing");
  }

  function onMouseMove(e) {
    if (!isPanning) return;
    translateX = panOriginX + (e.clientX - panStartX);
    translateY = panOriginY + (e.clientY - panStartY);
    applyTransform();
  }

  function onMouseUp() {
    if (!isPanning) return;
    isPanning = false;
    overlay.classList.remove("grabbing");
  }

  function onDblClick(e) {
    if (controls && controls.contains(e.target)) return;
    closeOverlay();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        closeOverlay();
      }
    }
    if (e.key === "f" || e.key === "F") {
      toggleFullscreen();
    }
  }

  // ── Helper: find <img> from click target ─────────────────────────────────────
  function findImg(target) {
    if (target.tagName === "IMG") return target;
    const ancestor = target.closest("a, article, figure, div");
    if (ancestor) {
      const found = ancestor.querySelector("img");
      if (found) return found;
    }
    return null;
  }

  // ── Alt+Click → open overlay ─────────────────────────────────────────────────
  document.addEventListener("click", (e) => {
    if (!e.altKey) return;
    if (overlay) return;

    const imgEl = findImg(e.target);
    if (imgEl) {
      e.preventDefault();
      e.stopPropagation();
      openOverlay(imgEl);
    }
  }, true);

  // ── Doppelklick → open overlay (non-linked images only) ──────────────────────
  document.addEventListener("dblclick", (e) => {
    if (overlay) return;
    if (e.target.tagName !== "IMG") return;
    if (e.target.closest("a")) return;

    e.preventDefault();
    e.stopPropagation();
    openOverlay(e.target);
  }, true);

})();
