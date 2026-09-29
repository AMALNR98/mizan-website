(() => {
  const section = document.querySelector(".authority-narrative");
  if (!section) return;

  const scenes = [...section.querySelectorAll(".authority-scene")];
  const path = section.querySelector(".narrative-thread-line");
  const glow = section.querySelector(".narrative-thread-glow");
  const signal = section.querySelector(".narrative-signal");
  const nodes = [...section.querySelectorAll(".narrative-node")];
  const progressDots = [...section.querySelectorAll(".authority-progress i")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 961px)");
  const centers = [0.06, 0.35, 0.63, 0.91];
  let frame = 0;
  let sectionTop = 0;
  let travel = 1;
  let pathLength = path?.getTotalLength() || 1;
  let desktopActive = false;
  let modeInitialized = false;
  let mobileObserver = null;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smooth = (start, end, value) => {
    const x = clamp((value - start) / Math.max(end - start, 0.001));
    return x * x * (3 - 2 * x);
  };
  const windowed = (enterStart, enterEnd, exitStart, exitEnd, value) =>
    smooth(enterStart, enterEnd, value) * (1 - smooth(exitStart, exitEnd, value));

  const measure = () => {
    if (!desktopActive) return;
    const rect = section.getBoundingClientRect();
    sectionTop = rect.top + window.scrollY;
    travel = Math.max(section.offsetHeight - window.innerHeight, 1);
    pathLength = path?.getTotalLength() || 1;
    requestUpdate();
  };

  const update = () => {
    frame = 0;
    if (!desktopActive) return;

    const progress = clamp((window.scrollY - sectionTop) / travel);
    const weights = [
      1 - smooth(0.17, 0.3, progress),
      windowed(0.17, 0.3, 0.42, 0.56, progress),
      windowed(0.43, 0.56, 0.69, 0.83, progress),
      smooth(0.7, 0.84, progress)
    ];

    let activeIndex = 0;
    let activeWeight = -1;
    scenes.forEach((scene, index) => {
      const weight = weights[index];
      const distance = clamp((centers[index] - progress) * 72, -26, 26);
      scene.style.setProperty("--scene-opacity", weight.toFixed(4));
      scene.style.setProperty("--scene-y", `${distance.toFixed(2)}px`);
      scene.style.setProperty("--scene-scale", (0.965 + weight * 0.035).toFixed(4));
      scene.style.setProperty("--line-y", `${(distance * 0.35).toFixed(2)}px`);
      scene.style.setProperty("--word-shift", `${((progress - centers[index]) * 34).toFixed(2)}px`);
      scene.style.zIndex = String(Math.round(weight * 10) + 2);
      if (weight > activeWeight) {
        activeWeight = weight;
        activeIndex = index;
      }
    });

    scenes.forEach((scene, index) => scene.classList.toggle("is-active", index === activeIndex));
    progressDots.forEach((dot, index) => dot.classList.toggle("is-active", index === activeIndex));

    const reveal = 0.13 + smooth(0.01, 0.94, progress) * 0.87;
    const offset = 1 - reveal;
    if (path) path.style.strokeDashoffset = offset.toFixed(4);
    if (glow) glow.style.strokeDashoffset = offset.toFixed(4);

    if (signal && path) {
      const point = path.getPointAtLength(pathLength * reveal);
      signal.style.transform = `translate3d(${point.x.toFixed(2)}px,${point.y.toFixed(2)}px,0)`;
      const signalOpacity = Math.max(
        windowed(0.18, 0.21, 0.29, 0.32, progress),
        windowed(0.43, 0.46, 0.55, 0.58, progress),
        windowed(0.7, 0.73, 0.88, 0.92, progress)
      );
      signal.style.opacity = signalOpacity.toFixed(3);
    }

    [0.18, 0.46, 0.73].forEach((threshold, index) => {
      const amount = smooth(threshold - 0.035, threshold + 0.035, progress);
      nodes[index]?.style.setProperty("--node-active", amount.toFixed(3));
    });

    section.style.setProperty("--authority-progress", progress.toFixed(4));
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const observeMobileScenes = () => {
    if (mobileObserver || reducedMotion.matches) return;
    section.classList.add("mobile-enhanced");
    mobileObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        mobileObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -14%", threshold: 0.18 });
    scenes.forEach((scene) => mobileObserver.observe(scene));
  };

  const clearInlineState = () => {
    scenes.forEach((scene) => {
      ["--scene-opacity", "--scene-y", "--scene-scale", "--line-y", "--word-shift", "z-index"].forEach((property) => scene.style.removeProperty(property));
      scene.classList.remove("is-active");
    });
    nodes.forEach((node) => node.style.removeProperty("--node-active"));
    path?.style.removeProperty("stroke-dashoffset");
    glow?.style.removeProperty("stroke-dashoffset");
    signal?.style.removeProperty("transform");
    signal?.style.removeProperty("opacity");
  };

  const setMode = () => {
    const shouldUseDesktop = desktop.matches && !reducedMotion.matches;
    if (modeInitialized && shouldUseDesktop === desktopActive) return;
    modeInitialized = true;
    desktopActive = shouldUseDesktop;
    section.classList.toggle("is-enhanced", desktopActive);
    section.classList.toggle("is-linear", !desktopActive);

    if (desktopActive) {
      mobileObserver?.disconnect();
      mobileObserver = null;
      section.classList.remove("mobile-enhanced");
      scenes.forEach((scene) => scene.classList.remove("is-visible"));
      measure();
    } else {
      clearInlineState();
      observeMobileScenes();
    }
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    setMode();
    measure();
  }, { passive: true });

  const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
  resizeObserver?.observe(section);

  setMode();
  if (desktopActive) measure();
  else if (reducedMotion.matches) scenes.forEach((scene) => scene.classList.add("is-visible"));
})();
