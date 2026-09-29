(() => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const art = hero.querySelector(".pictorial-map");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine) and (min-width: 761px)");
  hero.classList.add("hero-motion-ready");
  const layers = art ? [...art.querySelectorAll(".visual-layer")] : [];
  const signalMotion = art?.querySelector(".thread-signal animateMotion");
  let entered = false;
  let frame = 0;
  let bounds = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let tracking = false;

  const enter = () => {
    if (entered) return;
    entered = true;
    hero.classList.add("hero-initialized");
    window.setTimeout(() => signalMotion?.beginElement(), 720);
    window.setTimeout(() => hero.classList.add("hero-online"), 2450);
  };

  if (reducedMotion.matches) {
    hero.classList.add("hero-initialized", "hero-online");
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      enter();
      observer.disconnect();
    }, { threshold: 0.18 });
    observer.observe(hero);
  } else {
    enter();
  }

  const render = () => {
    frame = 0;
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    art.style.setProperty("--parallax-x", `${(currentX * 2).toFixed(2)}px`);
    art.style.setProperty("--parallax-y", `${(currentY * 2).toFixed(2)}px`);
    layers.forEach((layer, index) => {
      const depth = 2.5 + index;
      layer.style.setProperty("--layer-x", `${(currentX * depth).toFixed(2)}px`);
      layer.style.setProperty("--layer-y", `${(currentY * depth * 0.7).toFixed(2)}px`);
    });

    if (tracking || Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      frame = requestAnimationFrame(render);
    }
  };

  const requestRender = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  const onPointerEnter = () => {
    if (!finePointer.matches || reducedMotion.matches) return;
    bounds = art.getBoundingClientRect();
    tracking = true;
  };

  const onPointerMove = (event) => {
    if (!tracking || !bounds) return;
    targetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    targetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    requestRender();
  };

  const onPointerLeave = () => {
    tracking = false;
    bounds = null;
    targetX = 0;
    targetY = 0;
    requestRender();
  };

  if (art) {
    art.addEventListener("pointerenter", onPointerEnter, { passive: true });
    art.addEventListener("pointermove", onPointerMove, { passive: true });
    art.addEventListener("pointerleave", onPointerLeave, { passive: true });
  }
})();
