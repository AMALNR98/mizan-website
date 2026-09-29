(() => {
  const stage = document.querySelector(".ecosystem-orbit");
  if (!stage) return;

  const section = stage.closest("#ecosystem");
  const nodes = [...stage.querySelectorAll(".orbit-node")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileLayout = window.matchMedia("(max-width: 760px)");
  const finePointer = window.matchMedia("(pointer: fine)");

  const ORBIT_CONFIG = {
    qudra: { family: "outer", phase: 225, duration: 68, modulation: 0.08 },
    isnad: { family: "outer", phase: 45, duration: 68, modulation: 0.08 },
    mutamad: { family: "inner", phase: 315, duration: 68, modulation: -0.08 },
    misbar: { family: "inner", phase: 135, duration: 68, modulation: -0.08 }
  };

  const states = new Map(nodes.map((node) => {
    const config = ORBIT_CONFIG[node.dataset.node];
    return [node, {
      ...config,
      angle: config.phase * Math.PI / 180,
      speed: 1,
      targetSpeed: 1
    }];
  }));

  const particles = ["gold", "blue"].map((tone) => {
    const particle = document.createElement("span");
    particle.className = `orbit-particle particle-${tone}`;
    particle.setAttribute("aria-hidden", "true");
    stage.append(particle);
    return particle;
  });

  let geometry = null;
  let frame = 0;
  let lastTime = 0;
  let particleTime = 0;
  let inView = false;
  let entered = false;
  let entranceTimer = 0;

  const measure = () => {
    const rect = stage.getBoundingClientRect();
    const nodeSize = nodes[0]?.getBoundingClientRect().width || 160;
    const availableX = Math.max((rect.width - nodeSize) / 2, 1);
    const availableY = Math.max((rect.height - nodeSize) / 2, 1);

    geometry = {
      outer: { rx: availableX * 0.97, ry: availableY * 0.97 },
      inner: { rx: availableX * 0.84, ry: availableY * 0.94 }
    };

    stage.style.setProperty("--outer-orbit-width", `${geometry.outer.rx * 2}px`);
    stage.style.setProperty("--outer-orbit-height", `${geometry.outer.ry * 2}px`);
    stage.style.setProperty("--inner-orbit-width", `${geometry.inner.rx * 2}px`);
    stage.style.setProperty("--inner-orbit-height", `${geometry.inner.ry * 2}px`);
  };

  const pointOnOrbit = (angle, family) => ({
    x: Math.cos(angle) * geometry[family].rx,
    y: Math.sin(angle) * geometry[family].ry
  });

  const positionElement = (element, point) => {
    element.style.setProperty("--orbit-x", `${point.x.toFixed(2)}px`);
    element.style.setProperty("--orbit-y", `${point.y.toFixed(2)}px`);
  };

  const render = () => {
    if (!geometry) measure();
    states.forEach((state, node) => positionElement(node, pointOnOrbit(state.angle, state.family)));

    const outerParticle = pointOnOrbit(particleTime * Math.PI * 2 / 64 + 3.45, "outer");
    const innerParticle = pointOnOrbit(-particleTime * Math.PI * 2 / 49 + 5.1, "inner");
    positionElement(particles[0], outerParticle);
    positionElement(particles[1], innerParticle);
  };

  const canAnimate = () => !reduceMotion.matches && !mobileLayout.matches && !document.hidden;

  const tick = (time) => {
    frame = 0;
    if (!inView || !canAnimate()) {
      lastTime = 0;
      return;
    }

    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    particleTime += delta;

    states.forEach((state) => {
      const smoothing = 1 - Math.exp(-delta / 0.32);
      state.speed += (state.targetSpeed - state.speed) * smoothing;
      const rateVariation = 1 + state.modulation * Math.sin(particleTime * Math.PI * 2 / 52);
      state.angle += (Math.PI * 2 / state.duration) * rateVariation * delta * state.speed;
    });

    render();
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!frame && inView && canAnimate()) frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  };

  const setFocus = (node, focused) => {
    const state = states.get(node);
    if (!state) return;
    states.forEach((orbitState) => { orbitState.targetSpeed = focused ? 0 : 1; });
    node.classList.toggle("is-focused", focused);
    stage.classList.toggle("has-focus", focused);
  };

  nodes.forEach((node) => {
    node.addEventListener("pointerenter", () => setFocus(node, true));
    node.addEventListener("pointerleave", () => setFocus(node, false));
    node.addEventListener("focus", () => setFocus(node, true));
    node.addEventListener("blur", () => setFocus(node, false));
  });

  if (finePointer.matches && !reduceMotion.matches) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      stage.style.setProperty("--orbit-parallax-x", `${(x * 5).toFixed(2)}px`);
      stage.style.setProperty("--orbit-parallax-y", `${(y * 4).toFixed(2)}px`);
      stage.style.setProperty("--glow-x", `${(-x * 2).toFixed(2)}px`);
      stage.style.setProperty("--glow-y", `${(-y * 2).toFixed(2)}px`);
      section?.style.setProperty("--grid-x", `${(x * 3).toFixed(2)}px`);
      section?.style.setProperty("--grid-y", `${(y * 2).toFixed(2)}px`);
    });

    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--orbit-parallax-x", "0px");
      stage.style.setProperty("--orbit-parallax-y", "0px");
      stage.style.setProperty("--glow-x", "0px");
      stage.style.setProperty("--glow-y", "0px");
      section?.style.setProperty("--grid-x", "0px");
      section?.style.setProperty("--grid-y", "0px");
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      inView = entry.isIntersecting;
      if (inView && !entered) {
        entered = true;
        stage.classList.add("orbit-entered");
        section?.classList.add("ecosystem-motion-entered");
        entranceTimer = window.setTimeout(start, reduceMotion.matches ? 0 : 1750);
      } else if (inView) {
        start();
      } else {
        stop();
      }
    });
  }, { threshold: 0.18 });

  const updateLayout = () => {
    measure();
    render();
    if (canAnimate()) start();
    else stop();
  };

  stage.classList.add("orbit-enhanced");
  section?.classList.add("ecosystem-motion-ready");
  updateLayout();
  observer.observe(stage);
  window.addEventListener("resize", updateLayout, { passive: true });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

  window.addEventListener("pagehide", () => {
    stop();
    window.clearTimeout(entranceTimer);
    observer.disconnect();
  }, { once: true });
})();
