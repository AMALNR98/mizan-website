(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  const progress = document.createElement("div");
  progress.className = "site-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  const storyRail = document.querySelector(".story-rail");
  let scrollFrame = 0;

  const updateScrollEffects = () => {
    scrollFrame = 0;
    const scrollable = Math.max(root.scrollHeight - window.innerHeight, 1);
    root.style.setProperty("--page-progress", `${Math.min(100, (window.scrollY / scrollable) * 100)}%`);

    if (storyRail) {
      const rect = storyRail.getBoundingClientRect();
      const travel = Math.min(1, Math.max(0, (window.innerHeight * 0.78 - rect.top) / Math.max(rect.height, 1)));
      const amount = `${25 + travel * 75}%`;
      storyRail.style.setProperty("--story-progress", amount);
    }
  };

  const requestScrollUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(updateScrollEffects);
  };

  updateScrollEffects();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    }, { passive: true });

    document.querySelectorAll(".enterprise-module, .card, .industry-item, .product-frame").forEach((surface) => {
      surface.addEventListener("pointermove", (event) => {
        const rect = surface.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        surface.style.setProperty("--spot-x", `${x}px`);
        surface.style.setProperty("--spot-y", `${y}px`);

        if (!surface.classList.contains("product-frame")) {
          const rotateX = ((x / rect.width) - 0.5) * 2.4;
          const rotateY = ((y / rect.height) - 0.5) * -2.4;
          surface.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
          surface.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
        }
      });

      surface.addEventListener("pointerleave", () => {
        surface.style.setProperty("--tilt-x", "0deg");
        surface.style.setProperty("--tilt-y", "0deg");
      });
    });

    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--magnetic-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 5}px`);
        button.style.setProperty("--magnetic-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 4}px`);
      });
      button.addEventListener("pointerleave", () => {
        button.style.setProperty("--magnetic-x", "0px");
        button.style.setProperty("--magnetic-y", "0px");
      });
    });
  }

  const layerStack = document.querySelector(".layer-stack");
  const architectureLayers = [...document.querySelectorAll(".arch-layer")];
  architectureLayers.forEach((layer, index) => {
    const moveMarker = () => {
      if (!layerStack) return;
      layerStack.style.setProperty("--stack-point", `${8 + index * 27.5}%`);
    };
    layer.addEventListener("pointerenter", moveMarker);
    layer.addEventListener("focus", moveMarker);
    layer.addEventListener("click", moveMarker);
  });

  document.querySelectorAll(".graph-lines path").forEach((path) => path.setAttribute("pathLength", "1"));

  document.querySelectorAll(".enterprise-hero").forEach((hero) => {
    const system = document.createElement("div");
    system.className = "hero-system";
    system.setAttribute("aria-hidden", "true");
    system.innerHTML = '<span class="system-orbit orbit-outer"></span><span class="system-orbit orbit-inner"></span><span class="system-link link-a"></span><span class="system-link link-b"></span><span class="system-link link-c"></span><span class="system-node node-a"><i></i></span><span class="system-node node-b"><i></i></span><span class="system-node node-c"><i></i></span><span class="system-core"><i></i><b>M</b></span>';
    hero.append(system);
  });

  const homeSections = [
    ["problem", "Problem"],
    ["ecosystem", "Products"],
    ["platform", "Architecture"],
    ["record", "Authority"],
    ["expiry", "Lifecycle"],
    ["evidence", "Evidence"],
    ["product", "Platform"]
  ].map(([id, fallback]) => {
    const section = document.getElementById(id);
    if (!section) return null;
    const label = section.querySelector(".section-kicker")?.textContent.trim() || fallback;
    return { id, label, section };
  }).filter(Boolean);

  if (homeSections.length > 3) {
    const sectionNav = document.createElement("nav");
    sectionNav.className = "section-nav";
    sectionNav.setAttribute("aria-label", "Page sections");

    homeSections.forEach(({ id, label, section }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.target = id;
      button.setAttribute("aria-label", label);
      button.innerHTML = `<span>${label}</span>`;
      button.addEventListener("click", () => section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }));
      sectionNav.append(button);
    });
    document.body.append(sectionNav);

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionNav.querySelectorAll("button").forEach((button) => {
          button.classList.toggle("is-active", button.dataset.target === entry.target.id);
        });
      });
    }, { rootMargin: "-42% 0px -48%", threshold: 0 });

    homeSections.forEach(({ section }) => navObserver.observe(section));
  }
})();
