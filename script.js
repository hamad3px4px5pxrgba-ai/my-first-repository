/**
 * VELO APEX 01 — RUN BEYOND THE GROUND
 * 3D Scroll Journey Engine & Dynamic Product System
 * =============================================================================
 */

(function () {
  "use strict";

  // Safe DOM selectors
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  // Math & smoothing primitives
  const cl = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const sm = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // DOM element references
  const story = $("#story");
  const wrap = $(".shoe-wrap");
  const shadow = $(".shadow");
  const bar = $("#bar");
  const cnt = $("#count");
  const heroShoe = $("#hero-shoe");
  const scrubEl = $("#scrub");
  const sw = $("#sw");

  // Fallback product catalog in case product-data.js is loaded standalone
  const products =
    typeof window.VELO_PRODUCTS !== "undefined" &&
    Array.isArray(window.VELO_PRODUCTS)
      ? window.VELO_PRODUCTS
      : [
          {
            id: "apex-01-ember",
            slug: "ember",
            name: "VELO Apex 01",
            edition: "Ember Edition",
            tagline: "Run beyond the ground.",
            heroSubtitle:
              "A carbon-plated trainer with a cloud-soft landing and a response that feels like the road is pushing back.",
            shoeIntro: "Engineered like a machine. Felt like air.",
            shoeDescription:
              "Apex 01 balances 238 grams of featherweight structure with a 38 mm stack of responsive foam, so every stride returns more than you give.",
            price: "$229",
            badge: "New · Apex 01 · Running",
            ghostText: "APEX",
            colors: {
              primary: "#ff5a2c",
              secondary: "#ffb36b",
              glow: "rgba(255, 90, 44, 0.45)",
            },
            image:
              "IMGS/pngtree-red-and-black-sports-shoes-png-image_16082181.png",
            amazonUrl:
              "https://www.amazon.com/s?k=carbon+plated+running+shoes+racing&tag=veloapex-20",
            specs: { weight: 238, energyReturn: 82, stackHeight: 38, drop: 6 },
          },
        ];

  let activeProduct = products[0];

  // Helper: SVG shoe placeholder if local PNG image file is missing
  function generateShoeSvg(color1, color2) {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" fill="none">
      <defs>
        <linearGradient id="upper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${encodeURIComponent(color1)}"/>
          <stop offset="100%" stop-color="#141824"/>
        </linearGradient>
        <linearGradient id="sole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="${encodeURIComponent(color2)}"/>
          <stop offset="100%" stop-color="#2a2e3f"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <!-- Sleek Dynamic 3D Runner Silhouette -->
      <path d="M120 340 C140 280, 240 210, 380 180 C480 160, 600 210, 720 270 C760 290, 810 320, 830 350 C800 375, 730 380, 640 375 C520 370, 410 372, 310 385 C230 395, 140 390, 110 370 Z" fill="url(%23upper)" filter="url(%23glow)"/>
      <path d="M110 370 C140 390, 230 395, 310 385 C410 372, 520 370, 640 375 C730 380, 800 375, 830 350 C845 375, 830 405, 760 415 C640 430, 480 435, 340 430 C220 425, 130 415, 100 390 Z" fill="url(%23sole)"/>
      <path d="M260 290 C340 280, 480 295, 620 340" stroke="${encodeURIComponent(color2)}" stroke-width="6" stroke-linecap="round"/>
      <path d="M300 240 C380 230, 520 260, 650 310" stroke="${encodeURIComponent(color1)}" stroke-width="4" stroke-dasharray="8 6" opacity="0.8"/>
    </svg>`;
  }

  // Graceful shoe image setter with fallback handling
  function setShoeImageSrc(imgEl, srcPath, fallbackColor1, fallbackColor2) {
    if (!imgEl) return;
    const testImg = new Image();
    testImg.onload = () => {
      imgEl.src = srcPath;
    };
    testImg.onerror = () => {
      // Use premium stylized vector runner if local asset is not available
      imgEl.src = generateShoeSvg(fallbackColor1, fallbackColor2);
    };
    testImg.src = srcPath;
  }

  // Split-text setup: wraps words in nested spans for buttery slide-up animations
  function setupSplitText(el) {
    if (!el || el._splitReady) return;
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w) => `<span class="w"><i>${w}</i></span>`)
      .join(" ");
    el._w = [...el.querySelectorAll("i")];
    el._splitReady = true;
  }

  // ===========================================================================
  // DYNAMIC PRODUCT SWITCHER & CROSS-PAGE SYNC
  // ===========================================================================
  function applyProduct(prod, triggerAnimation = true) {
    if (!prod) return;
    activeProduct = prod;

    // 1. Sync CSS custom properties for vibrant theme glow
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--ac", prod.colors.primary);
    rootStyle.setProperty("--ac2", prod.colors.secondary);
    if (prod.colors.glow) {
      rootStyle.setProperty("--ac-glow", prod.colors.glow);
    }

    // 2. Smoothly update hero shoe visual
    if (heroShoe) {
      if (triggerAnimation) {
        heroShoe.style.opacity = "0";
        setTimeout(() => {
          setShoeImageSrc(
            heroShoe,
            prod.image,
            prod.colors.primary,
            prod.colors.secondary,
          );
          heroShoe.style.opacity = "1";
        }, 220);
      } else {
        setShoeImageSrc(
          heroShoe,
          prod.image,
          prod.colors.primary,
          prod.colors.secondary,
        );
      }
    }

    // 3. Update background ghost text
    const ghost = $("#ghostTitle");
    if (ghost) {
      ghost.textContent = prod.ghostText || "APEX";
    }

    // 4. Update texts in hero and slide boxes
    const heroBadge = $("#heroBadge");
    if (heroBadge)
      heroBadge.textContent =
        prod.badge || `New · ${prod.name} · ${prod.edition}`;

    const heroTitle = $("#heroTitle");
    if (heroTitle && heroTitle.dataset.baseText !== prod.tagline) {
      heroTitle.textContent = prod.tagline;
      heroTitle._splitReady = false;
      setupSplitText(heroTitle);
    }

    const heroSub = $("#heroSubtitle");
    if (heroSub) heroSub.textContent = prod.heroSubtitle || prod.tagline;

    const shoeIntro = $("#shoeIntro");
    if (shoeIntro && shoeIntro.dataset.baseText !== prod.shoeIntro) {
      shoeIntro.textContent = prod.shoeIntro;
      shoeIntro._splitReady = false;
      setupSplitText(shoeIntro);
    }

    const shoeDesc = $("#shoeDesc");
    if (shoeDesc) shoeDesc.textContent = prod.shoeDescription;

    const shoePrice = $("#shoePrice");
    if (shoePrice) shoePrice.textContent = prod.price;

    const swPrice = $("#swPrice");
    if (swPrice) swPrice.textContent = `${prod.name} — ${prod.price}`;

    // Update Detail slide texts if present
    const detailLead = $("#detailLead");
    if (detailLead && prod.details?.lead)
      detailLead.textContent = prod.details.lead;

    const detailMetrics = $("#detailMetrics");
    if (detailMetrics && prod.details?.metrics)
      detailMetrics.textContent = prod.details.metrics;

    // Update specs & numbers in Performance slide
    if (prod.specs) {
      const swEl = $("#statWeight");
      const srEl = $("#statReturn");
      const ssEl = $("#statStack");
      const sdEl = $("#statDrop");

      if (swEl) {
        swEl.dataset.n = prod.specs.weight;
        swEl.textContent = prod.specs.weight;
      }
      if (srEl) {
        srEl.dataset.n = prod.specs.energyReturn;
        srEl.textContent = prod.specs.energyReturn;
      }
      if (ssEl) {
        ssEl.dataset.n = prod.specs.stackHeight;
        ssEl.textContent = prod.specs.stackHeight;
      }
      if (sdEl) {
        sdEl.dataset.n = prod.specs.drop;
        sdEl.textContent = prod.specs.drop;
      }
    }

    // Update Features slide cards if customized
    if (prod.features && Array.isArray(prod.features)) {
      prod.features.forEach((feat, idx) => {
        const titleEl = $(`#feat${idx + 1}Title`);
        const descEl = $(`#feat${idx + 1}Desc`);
        if (titleEl) titleEl.textContent = feat.title;
        if (descEl) descEl.textContent = feat.desc;
      });
    }

    // 5. Update ALL Buy Now buttons with current product Amazon URL
    const amazonLinks = [
      $("#navBuyBtn"),
      $("#menuBuyBtn"),
      $("#heroAmazonBtn"),
      $("#shoeBuyBtn"),
      $("#swBuyBtn"),
      $("#mag"),
    ];

    amazonLinks.forEach((btn) => {
      if (btn) {
        btn.href = prod.amazonUrl;
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
      }
    });

    const swBuyBtn = $("#swBuyBtn");
    if (swBuyBtn) swBuyBtn.innerHTML = `Buy on Amazon — ${prod.price} ↗`;

    const mag = $("#mag");
    if (mag) mag.innerHTML = `Order ${prod.edition} — ${prod.price} ↗`;

    // 6. Update Swatch selector active state
    $$("#sw button").forEach((btn, index) => {
      const matches =
        btn.dataset.productId === prod.id || index === products.indexOf(prod);
      btn.classList.toggle("on", matches);
    });

    // 7. Persist selection for cross-page persistence
    try {
      localStorage.setItem("velo_selected_product", prod.id);
      if (window.history && window.history.replaceState) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("product", prod.slug || prod.id);
        window.history.replaceState({}, "", currentUrl.toString());
      }
    } catch (e) {}
  }

  // Populate interactive swatch buttons dynamically from product catalog
  function buildColorSwatches() {
    if (!sw) return;
    sw.innerHTML = "";

    products.forEach((prod, index) => {
      const btn = document.createElement("button");
      btn.className = "glass" + (prod.id === activeProduct.id ? " on" : "");
      btn.dataset.productId = prod.id;
      btn.style.setProperty("--c", prod.colors.primary);
      btn.setAttribute("type", "button");
      btn.setAttribute("aria-label", `Select ${prod.edition}`);
      btn.innerHTML = `<i></i><span>${prod.edition.replace(" Edition", "")}</span>`;

      btn.onclick = () => {
        applyProduct(prod, true);
      };

      sw.appendChild(btn);
    });
  }

  // Read URL query parameter or localStorage to select product from another page
  function resolveInitialProduct() {
    if (typeof window.getSelectedProduct === "function") {
      return window.getSelectedProduct();
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const queryId =
        params.get("product") || params.get("id") || params.get("shoe");
      if (queryId) {
        const found = products.find(
          (p) =>
            p.id.toLowerCase() === queryId.toLowerCase() ||
            p.slug?.toLowerCase() === queryId.toLowerCase(),
        );
        if (found) return found;
      }
      const stored = localStorage.getItem("velo_selected_product");
      if (stored) {
        const found = products.find((p) => p.id === stored);
        if (found) return found;
      }
    } catch (e) {}
    return products[0];
  }

  // ===========================================================================
  // 3D KEYFRAME POSES (Interpolated across scroll progress [0.0 -> 1.0])
  // ===========================================================================
  // [progress, tx%, ty%, scale, rotateY deg, rotateZ deg]
  const KD = [
    [0.0, 16, 3, 1.0, -16, -7],
    [0.14, 16, 3, 1.0, -16, -7],
    [0.22, -20, 0, 1.05, 14, -4],
    [0.34, -20, 0, 1.05, 14, -4],
    [0.42, 18, -2, 1.0, -30, 3],
    [0.54, 18, -2, 1.0, -30, 3],
    [0.61, -34, 4, 1.95, -8, -2],
    [0.7, -34, 4, 1.95, -8, -2],
    [0.77, 0, -9, 0.88, 0, -14],
    [0.86, 0, -9, 0.88, 0, -14],
    [0.93, 0, -6, 1.15, 22, -3],
    [1.0, 0, -6, 1.15, 22, -3],
  ];

  // Mobile-specific 3D poses (closer, centered, optimized for vertical screens)
  const KM = [
    [0.0, 0, -16, 1.05, -14, -6],
    [0.14, 0, -16, 1.05, -14, -6],
    [0.22, 2, -19, 1.0, 12, -4],
    [0.34, 2, -19, 1.0, 12, -4],
    [0.42, -2, -21, 0.95, -24, 3],
    [0.54, -2, -21, 0.95, -24, 3],
    [0.61, -24, -16, 1.85, -8, -2],
    [0.7, -24, -16, 1.85, -8, -2],
    [0.77, 0, -25, 0.86, 0, -12],
    [0.86, 0, -25, 0.86, 0, -12],
    [0.93, 0, -19, 1.05, 18, -3],
    [1.0, 0, -19, 1.05, 18, -3],
  ];

  function interpolatePose(p, table) {
    let i = 0;
    while (i < table.length - 2 && p > table[i + 1][0]) {
      i++;
    }
    const a = table[i];
    const b = table[i + 1];
    const span = b[0] - a[0] || 0.0001;
    const t = sm(cl((p - a[0]) / span));
    return a.slice(1).map((val, idx) => lerp(val, b[idx + 1], t));
  }

  // ===========================================================================
  // SLIDE MANAGEMENT & SCROLL REVERSAL FIX
  // ===========================================================================
  const slideElements = $$(".slide");
  const slides = slideElements.map((s, index) => {
    const ch = $$("[data-r]", s);
    ch.forEach((c) => {
      if (c.classList.contains("split")) {
        setupSplitText(c);
      }
    });

    return {
      el: s,
      index,
      a: +s.dataset.in,
      o: +s.dataset.out,
      step: +(s.dataset.step || 0.015),
      ch,
      n: [...s.querySelectorAll("[data-n]")],
    };
  });

  // Background elements
  const blobs = $$(".blob");
  const ghost = $(".ghost");
  const rings = $$(".ring");
  const dots = [];

  // Generate atmospheric floating particles
  const dotContainer = $("#dots");
  const dotCount = innerWidth < 768 ? 12 : 24;
  if (dotContainer) {
    for (let i = 0; i < dotCount; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      d._x = Math.random();
      d._y = Math.random();
      d._s = 0.4 + Math.random() * 1.3;
      d.style.opacity = (0.15 + Math.random() * 0.45).toFixed(2);
      dotContainer.appendChild(d);
      dots.push(d);
    }
  }

  // About Section word-by-word scrub highlight
  let scrubWords = [];
  if (scrubEl) {
    const rawText = scrubEl.textContent.trim().split(/\s+/);
    scrubEl.innerHTML = rawText.map((w) => `<span>${w}</span>`).join(" ");
    scrubWords = [...scrubEl.children];
  }

  // Mouse tilt tracking
  let mouseX = 0,
    mouseY = 0;
  let targetMouseX = 0,
    targetMouseY = 0;

  window.addEventListener(
    "pointermove",
    (e) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true },
  );

  // Animation state
  let currentP = 0;
  let cachedWrapWidth = 0;
  const startTime = performance.now();

  // ===========================================================================
  // MAIN ANIMATION TICK LOOP (requestAnimationFrame)
  // ===========================================================================
  function tick(now) {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;
    const poseTable = isMobile ? KM : KD;

    // Calculate story progress [0.0 -> 1.0]
    const storyRect = story
      ? story.getBoundingClientRect()
      : { top: 0, height: viewportHeight };
    const scrollMax = storyRect.height - viewportHeight;
    const targetProgress = cl(-storyRect.top / Math.max(scrollMax, 1));

    // Smooth lerp damping with spring responsiveness
    currentP += (targetProgress - currentP) * (reduceMotion ? 1 : 0.09);
    if (Math.abs(targetProgress - currentP) < 0.00015)
      currentP = targetProgress;
    const p = currentP;

    // Smooth mouse tilt damping
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;
    const hx = isMobile ? 0 : mouseX;
    const hy = isMobile ? 0 : mouseY;

    // Cache shoe wrap dimensions
    if (!cachedWrapWidth || tick.lastW !== viewportWidth) {
      cachedWrapWidth = wrap ? wrap.offsetWidth : 400;
      tick.lastW = viewportWidth;
    }

    // 1. Interpolate 3D Shoe Pose
    const [txP, tyP, scale, ry, rz] = interpolatePose(p, poseTable);
    const tx = (txP * viewportWidth) / 100;
    const ty = (tyP * viewportHeight) / 100;

    if (wrap) {
      wrap.style.transform = `translate3d(calc(-50% + ${tx.toFixed(1)}px), calc(-50% + ${ty.toFixed(1)}px), 0) scale(${scale.toFixed(3)}) rotateX(${(-hy * 8).toFixed(1)}deg) rotateY(${(ry + hx * 12).toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg)`;
    }

    // 2. Realistic Contact Shadow
    if (shadow) {
      const shadowY = ty + cachedWrapWidth * 0.25 * scale;
      shadow.style.transform = `translate3d(calc(-50% + ${tx.toFixed(1)}px), calc(-50% + ${shadowY.toFixed(1)}px), 0) scaleX(${(scale * 0.95).toFixed(3)})`;
      const shadowOpacity =
        cl(0.85 - (tyP < -4 ? (-tyP - 4) * 0.06 : 0)) * (scale > 1.6 ? 0.2 : 1);
      shadow.style.opacity = shadowOpacity.toFixed(2);
    }

    // 3. Ambient Aura Blobs Parallax
    if (blobs.length >= 3) {
      blobs[0].style.transform = `translate3d(${(-p * viewportWidth * 0.25).toFixed(1)}px, ${(p * viewportHeight * 0.45).toFixed(1)}px, 0)`;
      blobs[1].style.transform = `translate3d(${(p * viewportWidth * 0.22).toFixed(1)}px, ${(-p * viewportHeight * 0.5).toFixed(1)}px, 0)`;
      blobs[2].style.transform = `translate3d(${(Math.sin(p * 6) * viewportWidth * 0.18).toFixed(1)}px, ${(p * viewportHeight * 0.25).toFixed(1)}px, 0) scale(${(1 + p * 0.8).toFixed(2)})`;
    }

    // 4. Ghost Background Typography Slide
    if (ghost) {
      ghost.style.transform = `translate3d(${((0.14 - p * 1.35) * viewportWidth * 0.85).toFixed(1)}px, -50%, 0)`;
    }

    // 5. Orbital Perspective Rings
    if (rings.length >= 2) {
      rings[0].style.transform = `scale(${(0.82 + p * 1.5).toFixed(2)}) rotate(${(p * 110).toFixed(1)}deg)`;
      rings[1].style.transform = `scale(${(1.38 - p * 0.65).toFixed(2)}) rotate(${(-p * 80).toFixed(1)}deg)`;
    }

    // 6. Floating Ambient Dots
    dots.forEach((d) => {
      const dotY =
        (((d._y * viewportHeight - p * d._s * viewportHeight * 1.4) %
          viewportHeight) +
          viewportHeight) %
        viewportHeight;
      d.style.transform = `translate3d(${(d._x * viewportWidth + hx * 25 * d._s).toFixed(1)}px, ${dotY.toFixed(1)}px, 0)`;
    });

    // =========================================================================
    // SLIDE REVERSIBILITY & VISIBILITY ENGINE (Fixes disappearing content!)
    // =========================================================================
    const introProgress = cl((now - startTime) / 1500);
    const fadeDistance = 0.055; // Smooth overlap fade window

    slides.forEach((S) => {
      let maxVisibility = 0;

      // Calculate slide fade-out at upper threshold
      const fadeOut = S.o >= 8 ? 0 : sm(cl((p - S.o) / fadeDistance));

      S.ch.forEach((c, idx) => {
        let fadeIn = 0;

        if (S.a < 0) {
          // Slide 0 (Hero): When at top (p <= S.o), fully visible once intro passes!
          const introFade = sm(cl(introProgress * 1.8 - 0.3 - idx * 0.12));
          const scrollFade = sm(cl((S.o - p + 0.02) / fadeDistance));
          fadeIn = p <= 0.02 ? introFade : Math.max(introFade, scrollFade);
        } else {
          // Slides 1 to 5: Fade in smoothly when p reaches slide start
          fadeIn = sm(cl((p - S.a - idx * S.step) / fadeDistance));
        }

        const visibility = fadeIn * (1 - fadeOut);
        maxVisibility = Math.max(maxVisibility, visibility);

        if (c._w && c._w.length > 0) {
          // Split-word line heading: words slide up with staggering
          const totalWords = c._w.length;
          c.style.opacity = visibility > 0.005 ? "1" : "0";
          c._w.forEach((w, wordIdx) => {
            const wordProgress = cl(
              visibility * (totalWords + 1.2) - wordIdx * 0.7,
            );
            const tyWord = (1 - wordProgress) * 115;
            w.style.transform = `translate3d(0, ${tyWord.toFixed(1)}%, 0)`;
            w.style.opacity = cl(wordProgress * 1.4).toFixed(2);
          });
        } else {
          // Standard elements: smooth translation and opacity
          c.style.opacity = visibility.toFixed(3);
          const tyElem = (1 - fadeIn) * 36;
          const txElem = -fadeOut * 28;
          c.style.transform = `translate3d(${txElem.toFixed(1)}px, ${tyElem.toFixed(1)}px, 0)`;
        }
      });

      // Keep slide fully accessible whenever visibility > threshold
      S.el.style.visibility = maxVisibility > 0.002 ? "visible" : "hidden";
      S.el.style.pointerEvents = maxVisibility > 0.3 ? "auto" : "none";

      // Live animated stats counter in Performance slide
      if (S.n.length > 0) {
        const countProgress = sm(cl((p - S.a - 0.015) / 0.07));
        S.n.forEach((n) => {
          const targetNum = +n.dataset.n || 0;
          n.textContent = Math.round(targetNum * countProgress);
        });
      }
    });

    // 7. Update Slide Counter (01 / 06) without flicker
    let activeIdx = 0;
    if (p < 0.14) activeIdx = 0;
    else if (p < 0.32) activeIdx = 1;
    else if (p < 0.53) activeIdx = 2;
    else if (p < 0.69) activeIdx = 3;
    else if (p < 0.86) activeIdx = 4;
    else activeIdx = 5;

    if (cnt) {
      cnt.textContent = `0${activeIdx + 1} / 06`;
    }

    // 8. Top Scroll Progress Bar
    if (bar) {
      const docHeight = document.documentElement.scrollHeight - viewportHeight;
      const totalScrollProgress = cl(window.scrollY / Math.max(docHeight, 1));
      bar.style.transform = `scaleX(${totalScrollProgress.toFixed(4)})`;
    }

    // =========================================================================
    // SCROLL REVEAL FOR ABOUT, JOURNAL, AND CTA (Never disappears on scroll up!)
    // =========================================================================
    $$("[data-v]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Once revealed, persist visibility so content never vanishes when scrolling back up!
      if (rect.top < viewportHeight * 0.94) {
        el._revealed = true;
      }

      if (el._revealed) {
        el.style.opacity = "1";
        el.style.transform = "none";
      } else {
        const v = sm(
          cl((viewportHeight * 0.95 - rect.top) / (viewportHeight * 0.25)),
        );
        el.style.opacity = v.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - v) * 45).toFixed(1)}px, 0) scale(${(0.96 + 0.04 * v).toFixed(3)})`;
      }
    });

    // Parallax elements
    $$("[data-par]").forEach((el) => {
      const parentRect = el.parentNode.getBoundingClientRect();
      const offset =
        (parentRect.top + parentRect.height / 2 - viewportHeight / 2) *
        +el.dataset.par *
        -1;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });

    // About scrub text word illumination
    if (scrubEl && scrubWords.length > 0) {
      const q = scrubEl.getBoundingClientRect();
      const pr = cl(
        (viewportHeight * 0.88 - q.top) /
          (viewportHeight * 0.5 + q.height * 0.35),
      );
      scrubWords.forEach((word, k) => {
        const wordLight = 0.2 + 0.8 * cl(pr * scrubWords.length * 1.12 - k);
        word.style.opacity = wordLight.toFixed(2);
      });
    }

    requestAnimationFrame(tick);
  }

  // Launch animation loop
  requestAnimationFrame(tick);

  // ===========================================================================
  // INTERACTIVE NAVIGATION & SMOOTH SCROLLING
  // ===========================================================================
  $$("[data-p]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (!story) return;
      const targetP = parseFloat(a.dataset.p || "0");
      const targetY =
        story.offsetTop + targetP * (story.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });
    });
  });

  // 3D Tilt Card Interaction for Journal Cards
  $$(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const tiltY = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const tiltX = -((e.clientY - r.top) / r.height - 0.5) * 12;
      card.style.setProperty("--ry", `${tiltY.toFixed(1)}deg`);
      card.style.setProperty("--rx", `${tiltX.toFixed(1)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  // Magnetic Button Effect on Bottom CTA Button (#mag)
  const magneticBtn = $("#mag");
  if (magneticBtn && magneticBtn.parentNode) {
    magneticBtn.parentNode.addEventListener("pointermove", (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const deltaX = (e.clientX - rect.left - rect.width / 2) * 0.22;
      const deltaY = (e.clientY - rect.top - rect.height / 2) * 0.32;
      magneticBtn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
    });

    magneticBtn.parentNode.addEventListener("pointerleave", () => {
      magneticBtn.style.transform = "translate3d(0, 0, 0)";
    });
  }

  // Custom User PNG File Upload
  const uploadInput = $("#up");
  if (uploadInput) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (heroShoe) {
          heroShoe.src = reader.result;
        }
        $$("img[data-i]").forEach((im) => {
          im.src = reader.result;
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // ===========================================================================
  // MOBILE MENU CONTROLLER
  // ===========================================================================
  (function initMobileMenu() {
    const btn = $("#menuBtn");
    const menu = $("#menu");
    if (!btn || !menu) return;

    const toggleMenu = (open) => {
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu(!menu.classList.contains("open"));
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        toggleMenu(false);
      }
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== btn) {
        toggleMenu(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggleMenu(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        toggleMenu(false);
      }
    });
  })();

  // ===========================================================================
  // INITIALIZATION
  // ===========================================================================
  const initialProduct = resolveInitialProduct();
  buildColorSwatches();
  applyProduct(initialProduct, false);

  // Check if URL specified scrolling to a specific section (e.g. ?product=glacier&scroll=product)
  const urlParams = new URLSearchParams(window.location.search);
  const scrollTarget = urlParams.get("scroll");
  if (scrollTarget) {
    setTimeout(() => {
      if (scrollTarget === "product" || scrollTarget === "features") {
        const targetP = scrollTarget === "product" ? 0.22 : 0.42;
        if (story) {
          const targetY =
            story.offsetTop +
            targetP * (story.offsetHeight - window.innerHeight);
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }, 400);
  }
})();
/* all website cursor  */
/* =============================================================================
   VELO — 3D ORANGE GRADIENT ARROW CURSOR + SMALL FIREBALL TRAIL  (v3)
   Appended after your existing script. Self-contained: it creates its own
   elements, so no HTML changes are needed and no existing code is touched.
   ============================================================================= */
(function () {
  "use strict";

  // Mouse / trackpad only. Touch devices keep normal behaviour.
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!finePointer.matches) return;

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------------------------
  // Elements
  // ---------------------------------------------------------------------------
  const canvas = document.createElement("canvas");
  canvas.className = "velo-fire-canvas";
  canvas.setAttribute("aria-hidden", "true");

  const dot = document.createElement("div");
  dot.className = "velo-cursor";
  dot.setAttribute("aria-hidden", "true");
  // Classic arrow shape, 3D bevel: light facet + dark facet + specular edge
  dot.innerHTML =
    '<svg class="velo-cursor-arrow" width="18" height="27" viewBox="0 0 14 21" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    "<defs>" +
    '<linearGradient id="vcGL" x1="0" y1="0" x2="0.9" y2="1">' +
    '<stop offset="0" stop-color="#fff2b0"/>' +
    '<stop offset="0.25" stop-color="#ffd24a"/>' +
    '<stop offset="0.55" stop-color="#f59a24"/>' +
    '<stop offset="0.8" stop-color="#ff6a1a"/>' +
    '<stop offset="1" stop-color="#d2460a"/>' +
    "</linearGradient>" +
    '<linearGradient id="vcGR" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#ffb02e"/>' +
    '<stop offset="0.45" stop-color="#ff7a1a"/>' +
    '<stop offset="0.8" stop-color="#ee5a12"/>' +
    '<stop offset="1" stop-color="#d24a0c"/>' +
    "</linearGradient>" +
    "</defs>" +
    '<path d="M0 0 L0 17 L4 13.2 L7 20 L9.6 18.9 L6.7 12.3 L12 12.3 Z" ' +
    'fill="url(#vcGR)"/>' +
    '<path d="M0.4 0.9 L0.4 15.6 L4 12.4 L5.9 7.4 Z" fill="url(#vcGL)"/>' +
    '<path d="M4.4 13.6 L7.1 19.2 L8.9 18.4 L6.3 12.9 Z" fill="url(#vcGL)" opacity="0.55"/>' +
    '<path d="M0.7 1.8 L0.7 13.5" stroke="#fffbe8" stroke-width="0.55" ' +
    'stroke-linecap="round" opacity="0.85"/>' +
    "</svg>";

  document.body.appendChild(canvas);
  document.body.appendChild(dot);
  const ctx = reduce ? null : canvas.getContext("2d");

  const INTERACTIVE =
    'a, button, input, textarea, select, label, summary, [role="button"], ' +
    '[role="menuitem"], [data-p], .card, .stat, .glass, .sw button';

  // Flame origin: underneath the arrow body (relative to the tip)
  const OX = 5,
    OY = 11;

  // ---------------------------------------------------------------------------
  // Canvas sizing (capped DPR keeps it lightweight)
  // ---------------------------------------------------------------------------
  let cw = 0,
    ch = 0,
    dpr = 1;
  function resizeCanvas() {
    if (!ctx) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = canvas.clientWidth || window.innerWidth;
    ch = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  // ---------------------------------------------------------------------------
  // Pre-rendered flame sprites (white-gold -> gold -> orange -> deep orange)
  // ---------------------------------------------------------------------------
  const STOPS = [
    [0.0, [255, 246, 200]],
    [0.25, [255, 210, 74]],
    [0.5, [255, 154, 31]],
    [0.75, [255, 90, 26]],
    [1.0, [176, 42, 8]],
  ];
  function colorAt(t) {
    for (let i = 0; i < STOPS.length - 1; i++) {
      const a = STOPS[i],
        b = STOPS[i + 1];
      if (t <= b[0]) {
        const k = (t - a[0]) / (b[0] - a[0] || 1);
        return a[1].map((v, j) => Math.round(v + (b[1][j] - v) * k));
      }
    }
    return STOPS[STOPS.length - 1][1];
  }
  const SPRITE_N = 16;
  const sprites = [];
  if (ctx) {
    for (let i = 0; i < SPRITE_N; i++) {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      const [r, gg, b] = colorAt(i / (SPRITE_N - 1));
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${r},${gg},${b},1)`);
      grad.addColorStop(0.4, `rgba(${r},${gg},${b},0.5)`);
      grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      sprites.push(c);
    }
  }

  // ---------------------------------------------------------------------------
  // Particles: small flames + tiny sparks, all short-lived
  // ---------------------------------------------------------------------------
  const MAX_PARTS = 700;
  const parts = [];
  const rnd = (a, b) => a + Math.random() * (b - a);

  // core = small hot yellow-white centre; otherwise larger orange outer flame
  function spawnFlame(x, y, ux, uy, scale, core) {
    parts.push({
      k: 0,
      h: core ? 1 : 0,
      x: x + rnd(-1.6, 1.6),
      y: y + rnd(-1.6, 1.6),
      vx: -ux * rnd(0.2, 0.9) + rnd(-0.25, 0.25),
      vy: -uy * rnd(0.2, 0.9) + rnd(-0.95, -0.2), // flame licks upward
      life: core ? rnd(160, 290) : rnd(240, 440),
      age: 0,
      r: (core ? rnd(2, 3.6) : rnd(3.6, 6.6)) * scale,
    });
  }

  function spawnSpark(x, y, ux, uy) {
    parts.push({
      k: 1,
      s: Math.random() < 0.5 ? 1 : 3, // gold or orange glow
      ph: Math.random() * 6.28,
      x: x + rnd(-2.5, 2.5),
      y: y + rnd(-2.5, 2.5),
      vx: rnd(-1.5, 1.5) - ux * rnd(0.5, 1.6),
      vy: rnd(-1.9, 0.3) - uy * rnd(0.5, 1.6),
      life: rnd(300, 650),
      age: 0,
      r: rnd(0.8, 1.8),
    });
  }

  // ---------------------------------------------------------------------------
  // Pointer tracking: arrow + fire are updated inside the event = no delay
  // ---------------------------------------------------------------------------
  let mx = -100,
    my = -100;
  let lx = null,
    ly = null; // last event position for trail spawning
  let visible = false;
  let dirty = false;
  let lastIdle = 0;

  function show() {
    if (visible) return;
    visible = true;
    dot.classList.add("show");
  }
  function hide() {
    visible = false;
    lx = ly = null;
    dot.classList.remove("show");
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (!visible) show();

      if (ctx) {
        if (lx === null) {
          lx = mx;
          ly = my;
        }
        const dx = mx - lx,
          dy = my - ly;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.5 && parts.length < MAX_PARTS) {
          const ux = dx / dist,
            uy = dy / dist;
          const steps = Math.min(Math.ceil(dist / 4), 16);
          for (let i = 1; i <= steps; i++) {
            if (parts.length >= MAX_PARTS) break;
            const k = i / steps;
            const sx = lx + dx * k + OX,
              sy = ly + dy * k + OY;
            spawnFlame(sx, sy, ux, uy, 1, false);
            spawnFlame(sx, sy, ux, uy, 1, true);
            if (Math.random() < 0.7) spawnSpark(sx, sy, ux, uy);
            if (Math.random() < 0.25) spawnSpark(sx, sy, ux, uy);
          }
        }
        lx = mx;
        ly = my;
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "pointerover",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const t = e.target;
      const hit = t && t.closest ? t.closest(INTERACTIVE) : null;
      root.classList.toggle("velo-cursor-hover", !!hit);
    },
    { passive: true },
  );

  window.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      root.classList.add("velo-cursor-down");
    },
    { passive: true },
  );
  window.addEventListener(
    "pointerup",
    () => root.classList.remove("velo-cursor-down"),
    { passive: true },
  );
  window.addEventListener("blur", () => {
    root.classList.remove("velo-cursor-down");
  });

  document.addEventListener("mouseleave", hide);
  document.addEventListener("mouseenter", (e) => {
    mx = e.clientX;
    my = e.clientY;
    lx = ly = null;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    show();
  });

  // ---------------------------------------------------------------------------
  // Render loop (draw only; no work when nothing is burning)
  // ---------------------------------------------------------------------------
  let lastT = performance.now();

  function loop(now) {
    const dt = Math.min(now - lastT, 50);
    lastT = now;
    const f = dt / 16.667;

    if (ctx) {
      // Small idle flame flickering under the arrow
      if (visible && now - lastIdle > 35 && parts.length < MAX_PARTS) {
        lastIdle = now;
        spawnFlame(mx + OX, my + OY, 0, 0, 0.85, false);
        spawnFlame(mx + OX, my + OY, 0, 0, 0.85, true);
        if (Math.random() < 0.3) spawnSpark(mx + OX, my + OY, 0, 0);
      }

      if (parts.length) {
        ctx.clearRect(0, 0, cw, ch);
        ctx.globalCompositeOperation = "lighter";
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          p.age += dt;
          if (p.age >= p.life) {
            parts[i] = parts[parts.length - 1];
            parts.pop();
            continue;
          }
          const t = p.age / p.life;
          p.x += p.vx * f;
          p.y += p.vy * f;

          if (p.k === 0) {
            const idx = Math.min(
              SPRITE_N - 1,
              Math.floor(t * (SPRITE_N - 1) * (p.h ? 0.7 : 1)),
            );
            const size = p.r * 2 * (1.15 - t * 0.7);
            ctx.globalAlpha = (1 - t) * (1 - t) * (p.h ? 1 : 0.85);
            ctx.drawImage(
              sprites[idx],
              p.x - size / 2,
              p.y - size / 2,
              size,
              size,
            );
          } else {
            p.vy += 0.05 * f;
            const a = (1 - t) * (0.75 + 0.25 * Math.sin(p.age * 0.06 + p.ph));
            const glow = p.r * 5;
            ctx.globalAlpha = a * 0.8;
            ctx.drawImage(
              sprites[p.s],
              p.x - glow / 2,
              p.y - glow / 2,
              glow,
              glow,
            );
            ctx.globalAlpha = a;
            ctx.fillStyle = "#fff1b8";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 0.5, 0, 6.2832);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        dirty = true;
      } else if (dirty) {
        ctx.clearRect(0, 0, cw, ch);
        dirty = false;
      }
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Activate: hide the native cursor only now that the custom one is running
  root.classList.add("velo-cursor-on");

  // If the device becomes touch-only, restore the native cursor
  const onChange = () => {
    if (!finePointer.matches) {
      root.classList.remove("velo-cursor-on", "velo-cursor-hover");
      hide();
    } else {
      root.classList.add("velo-cursor-on");
    }
  };
  if (finePointer.addEventListener)
    finePointer.addEventListener("change", onChange);
})();
