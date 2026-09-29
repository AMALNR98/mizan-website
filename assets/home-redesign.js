(() => {
  const page = document.querySelector(".home-publication");
  if (!page) return;

  page.classList.add("home-enhanced");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = [...document.querySelectorAll(".editorial-reveal")];

  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12%", threshold: .14 });

    reveals.forEach((element) => revealObserver.observe(element));
  }

  const productDescriptions = {
    mizan: "MIZAN governs authority as the central institutional assurance platform.",
    qudra: "Qudra establishes reusable institutional capability across mandate, readiness, ownership and governance operations.",
    mutamad: "Mu'tamad manages role qualification and professional accountability across the assurance system.",
    isnad: "Isnad maintains knowledge provenance, attestation and confidence in governed institutional sources.",
    misbar: "Misbar provides a controlled research environment for testing assumptions, failure modes and reversibility."
  };

  const constellation = document.querySelector("[data-product-constellation]");
  const productDescription = document.querySelector("[data-product-description]");
  const productNodes = [...document.querySelectorAll("[data-product]")];

  const setProduct = (key) => {
    if (!constellation || !productDescriptions[key]) return;
    constellation.dataset.activeProduct = key;
    productNodes.forEach((node) => node.classList.toggle("is-active", node.dataset.product === key));
    if (productDescription) productDescription.textContent = productDescriptions[key];
  };

  const resetProduct = () => {
    if (!constellation) return;
    delete constellation.dataset.activeProduct;
    productNodes.forEach((node) => node.classList.remove("is-active"));
    if (productDescription) productDescription.textContent = productDescriptions.mizan;
  };

  productNodes.forEach((node) => {
    node.addEventListener("pointerenter", () => setProduct(node.dataset.product));
    node.addEventListener("focus", () => setProduct(node.dataset.product));
  });
  constellation?.addEventListener("pointerleave", resetProduct);
  constellation?.addEventListener("focusout", (event) => {
    if (!constellation.contains(event.relatedTarget)) resetProduct();
  });

  const assuranceCopy = {
    purpose: ["Public purpose", "The outcome that justifies the use case and anchors institutional intent."],
    mandate: ["Mandate", "The legal, policy or delegated instrument that permits institutional action."],
    owner: ["Named owner", "The accountable person responsible for accepting and maintaining authority."],
    evidence: ["Evidence", "Material claims remain connected to owned, dated and reviewable artefacts."],
    capability: ["Capability", "Institutional readiness remains a live condition of permission."],
    usecase: ["AI use case", "The bounded machine-mediated function covered by the authority record."],
    conditions: ["Conditions", "Obligations and blocking issues remain visible throughout operation."],
    expiry: ["Expiry", "Permission returns for review, re-authorisation, conditioning or withdrawal."]
  };

  const assuranceNote = document.querySelector("[data-assurance-note]");
  const assuranceNodes = [...document.querySelectorAll("[data-assurance]")];

  const setAssurance = (node) => {
    const copy = assuranceCopy[node.dataset.assurance];
    if (!copy || !assuranceNote) return;
    assuranceNodes.forEach((item) => item.classList.toggle("is-active", item === node));
    const label = assuranceNote.querySelector("span");
    const body = assuranceNote.querySelector("p");
    if (label) label.textContent = copy[0];
    if (body) body.textContent = copy[1];
  };

  assuranceNodes.forEach((node) => {
    node.addEventListener("pointerenter", () => setAssurance(node));
    node.addEventListener("focus", () => setAssurance(node));
    node.addEventListener("click", () => setAssurance(node));
  });

  const timelineCopy = [
    ["Authorised", "A named decision holder accepts a bounded AI use case against a mandate, evidence set, conditions and review date."],
    ["Evidence ages", "Evidence is not permanently valid. Its age, provenance, owner and review window remain visible."],
    ["System changes", "A model, data source, workflow or operating condition changes and the acceptance basis is tested again."],
    ["Condition triggered", "A blocking issue is resolved, explicitly excepted or used to prevent continued authorisation."],
    ["Review required", "The accountable holder can re-authorise, add conditions or withdraw permission with a retained decision record."]
  ];

  const timeline = document.querySelector("[data-permission-timeline]");
  const timelineDetail = document.querySelector("[data-permission-detail]");
  const timelineButtons = [...document.querySelectorAll("[data-timeline-step]")];

  const setTimeline = (button) => {
    const index = Number(button.dataset.timelineStep);
    const copy = timelineCopy[index];
    if (!copy || !timeline) return;
    timeline.style.setProperty("--timeline-progress", String(index / Math.max(timelineButtons.length - 1, 1)));
    timelineButtons.forEach((item) => item.closest("li")?.classList.toggle("is-active", item === button));
    if (timelineDetail) {
      const label = timelineDetail.querySelector("span");
      const body = timelineDetail.querySelector("p");
      if (label) label.textContent = copy[0];
      if (body) body.textContent = copy[1];
    }
  };

  timelineButtons.forEach((button) => {
    button.addEventListener("pointerenter", () => setTimeline(button));
    button.addEventListener("focus", () => setTimeline(button));
    button.addEventListener("click", () => setTimeline(button));
  });
})();
