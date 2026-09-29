const header = document.querySelector(".site-header");
const mobileToggle = document.querySelector(".mobile-toggle");

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 72);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (mobileToggle && header) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const dropdownToggles = document.querySelectorAll(".nav-dropdown-toggle");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const item = toggle.closest(".has-dropdown");
    const nextState = !item.classList.contains("is-open");

    document.querySelectorAll(".has-dropdown.is-open").forEach((openItem) => {
      openItem.classList.remove("is-open");
      openItem.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });

    item.classList.toggle("is-open", nextState);
    toggle.setAttribute("aria-expanded", String(nextState));
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
    item.classList.remove("is-open");
    const toggle = item.querySelector(".nav-dropdown-toggle");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.focus();
  });
});

document.querySelectorAll(".primary-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!header || !mobileToggle) return;
    header.classList.remove("is-open");
    mobileToggle.setAttribute("aria-expanded", "false");
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 })
  : null;

document.querySelectorAll(".reveal").forEach((el) => {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add("is-visible");
});

const layerCopy = {
  mandate: {
    title: "Mandate and law",
    body: "Statute, standards, delegated instruments and public-purpose outcomes define what the institution is allowed to pursue."
  },
  mizan: {
    title: "Institutional authorisation",
    body: "MIZAN holds the authority envelope: mandate instrument, named holder, conditions, expiry and capability gate."
  },
  control: {
    title: "Agent control",
    body: "Runtime systems manage registry, identity, interception, approval routing and observability."
  },
  substrate: {
    title: "Substrate",
    body: "APIs, models, tools, logs and case-management systems provide telemetry, but they do not decide whether permission still holds."
  }
};

const layerTitle = document.querySelector("[data-layer-title]");
const layerBody = document.querySelector("[data-layer-body]");
document.querySelectorAll(".arch-layer").forEach((layer) => {
  const activate = () => {
    const key = layer.dataset.layer;
    if (!key || !layerCopy[key]) return;
    document.querySelectorAll(".arch-layer").forEach((item) => item.classList.remove("is-active"));
    layer.classList.add("is-active");
    if (layerTitle) layerTitle.textContent = layerCopy[key].title;
    if (layerBody) layerBody.textContent = layerCopy[key].body;
  };
  layer.addEventListener("pointerenter", activate);
  layer.addEventListener("focus", activate);
  layer.addEventListener("click", activate);
});

const lifeCopy = {
  authorised: {
    title: "Authorised",
    body: "A named decision holder accepts a bounded AI use case against a mandate, evidence set, conditions and review date.",
    meta: ["Authority envelope issued", "Named holder visible", "Expiry date set"]
  },
  evidence: {
    title: "Evidence ages",
    body: "MIZAN does not treat evidence as permanently valid. Age, provenance and owner remain visible to the assurance case.",
    meta: ["Validity window tracked", "Owner accountable", "Staleness visible"]
  },
  change: {
    title: "System changes",
    body: "A model, data source, workflow or operating condition changes. The question becomes whether the basis of acceptance still holds.",
    meta: ["Change event logged", "Claims affected", "Dependency highlighted"]
  },
  condition: {
    title: "Condition triggered",
    body: "A blocking issue cannot disappear inside an average. It is resolved, explicitly excepted, or it blocks authorisation.",
    meta: ["No composite score", "Blocking claim visible", "Remedy separated"]
  },
  review: {
    title: "Review required",
    body: "The responsible signatory and institutional owner can see why reassessment is required before the record becomes stale.",
    meta: ["Signatory alerted", "Evidence reviewed", "Decision prepared"]
  },
  decision: {
    title: "Re-authorise, condition or withdraw",
    body: "The outcome is a reconstructable institutional record, not a dashboard state that disappears after the next release.",
    meta: ["Decision dated", "Conditions recorded", "Audit trail retained"]
  }
};

const lifeTitle = document.querySelector("[data-life-title]");
const lifeBody = document.querySelector("[data-life-body]");
const lifeMeta = document.querySelector("[data-life-meta]");
document.querySelectorAll(".life-step").forEach((step) => {
  step.addEventListener("click", () => {
    const key = step.dataset.life;
    const copy = lifeCopy[key];
    if (!copy) return;
    document.querySelectorAll(".life-step").forEach((item) => item.classList.remove("is-active"));
    step.classList.add("is-active");
    if (lifeTitle) lifeTitle.textContent = copy.title;
    if (lifeBody) lifeBody.textContent = copy.body;
    if (lifeMeta) {
      lifeMeta.innerHTML = copy.meta.map((item, index) => `
        <div>
          <b>${String(index + 1).padStart(2, "0")}</b>
          <span>${item}</span>
        </div>
      `).join("");
    }
  });
});

const evidenceCopy = {
  claim: { title: "Claim", rows: {
    "Requirement": "Defined and version controlled",
    "Control owner": "Assigned",
    "Policy basis": "Linked",
    "Review state": "Active",
    "Validity rule": "Policy defined",
    "Dependencies": "Visible",
    "Change history": "Retained",
    "Current state": "Governed"
  }},
  evidence: { title: "Evidence", rows: {
    "Source": "Governed repository",
    "Provenance": "Verified",
    "Evidence owner": "Assigned",
    "Version": "Controlled",
    "Validity rule": "Monitored",
    "Review history": "Retained",
    "Dependencies": "Mapped",
    "Current state": "Current"
  }},
  review: { title: "Specialist review", rows: {
    "Review function": "Authorised",
    "Reviewer role": "Named",
    "Scope": "Defined",
    "Method": "Controlled",
    "Finding": "Recorded",
    "Conditions": "Attached",
    "Review history": "Retained",
    "Current state": "Complete"
  }},
  authority: { title: "Authority", rows: {
    "Mandate": "Linked",
    "Decision owner": "Named",
    "Delegation": "Verified",
    "Scope": "Bounded",
    "Conditions": "Visible",
    "Evidence basis": "Connected",
    "Review date": "Scheduled",
    "Current state": "Valid"
  }},
  decision: { title: "Decision", rows: {
    "Decision type": "Recorded",
    "Decision owner": "Named",
    "Evidence basis": "Traceable",
    "Conditions": "Attached",
    "Effective state": "Controlled",
    "Escalation route": "Defined",
    "Audit history": "Retained",
    "Current state": "Active"
  }},
  expiry: { title: "Validity", rows: {
    "Validity rule": "Policy defined",
    "Review owner": "Assigned",
    "Evidence status": "Monitored",
    "Change triggers": "Configured",
    "Notification": "Routed",
    "Decision options": "Defined",
    "Audit history": "Retained",
    "Current state": "Visible"
  }}
};

const evidenceTitle = document.querySelector("[data-evidence-title]");
const evidenceRows = document.querySelector("[data-evidence-rows]");
document.querySelectorAll(".evidence-node").forEach((node) => {
  node.addEventListener("click", () => {
    const key = node.dataset.evidence;
    const copy = evidenceCopy[key];
    if (!copy) return;
    document.querySelectorAll(".evidence-node").forEach((item) => item.classList.remove("is-active"));
    node.classList.add("is-active");
    if (evidenceTitle) evidenceTitle.textContent = copy.title;
    if (evidenceRows) {
      evidenceRows.innerHTML = Object.entries(copy.rows).map(([label, value]) => `
        <div>
          <b>${label}</b>
          <span>${value}</span>
        </div>
      `).join("");
    }
  });
});

const ecosystemCopy = {
  qudra: "Qudra establishes reusable institutional capability across mandate, readiness, ownership and governance operations.",
  mutamad: "Mu'tamad manages role qualification and professional accountability across the assurance system.",
  isnad: "Isnad maintains knowledge provenance, attestation and confidence in governed institutional sources.",
  misbar: "Misbar provides a controlled research environment for testing assumptions, failure modes and reversibility."
};

const orbitDetail = document.querySelector("[data-orbit-detail]");
document.querySelectorAll(".orbit-node").forEach((node) => {
  const activate = () => {
    const copy = ecosystemCopy[node.dataset.node];
    if (!copy) return;
    document.querySelectorAll(".orbit-node").forEach((item) => item.classList.remove("is-active"));
    node.classList.add("is-active");
    if (orbitDetail) orbitDetail.textContent = copy;
  };
  node.addEventListener("pointerenter", activate);
  node.addEventListener("focus", activate);
  node.addEventListener("click", activate);
});

document.querySelectorAll(".product-nav button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".product-nav button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = contactForm.querySelector(".form-note");
    if (note) {
      note.textContent = "Thank you. Your enquiry has been recorded for follow-up by the MIZAN team.";
    }
    contactForm.reset();
  });
}
