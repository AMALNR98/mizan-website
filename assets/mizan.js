const header = document.querySelector(".site-header");
const mobileToggle = document.querySelector(".mobile-toggle");
const languageToggle = document.querySelector("[data-lang-toggle]");
const savedLanguage = localStorage.getItem("mizan-language") || "en";

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (mobileToggle && header) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".primary-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!header || !mobileToggle) return;
    header.classList.remove("is-open");
    mobileToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !header || !mobileToggle) return;
  header.classList.remove("is-open");
  mobileToggle.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    const expanded = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-question[aria-expanded='true']").forEach((openButton) => {
      if (openButton === button) return;
      openButton.setAttribute("aria-expanded", "false");
      const openPanel = document.getElementById(openButton.getAttribute("aria-controls"));
      if (openPanel) openPanel.hidden = true;
    });

    button.setAttribute("aria-expanded", String(!expanded));
    if (panel) panel.hidden = expanded;
  });
});

const translations = new Map([
  ["Skip to content", "انتقل إلى المحتوى"],
  ["Platform", "المنصة"],
  ["How it works", "كيف يعمل"],
  ["Use cases", "حالات الاستخدام"],
  ["Research and method", "البحث والمنهج"],
  ["About", "من نحن"],
  ["Discuss a pilot", "ناقش تجربة تطبيقية"],
  ["Discuss your AI use case", "ناقش حالة استخدام الذكاء الاصطناعي"],
  ["Send enquiry", "إرسال الاستفسار"],
  ["Home", "الرئيسية"],
  ["Supporting instruments", "الأدوات الداعمة"],
  ["Privacy", "الخصوصية"],
  ["Accessibility", "إتاحة الوصول"],
  ["Website terms", "شروط الموقع"],
  ["Contact", "تواصل معنا"],
  ["AI assurance for public institutions", "ضمان الذكاء الاصطناعي للمؤسسات العامة"],
  ["Clear, accountable decisions about AI use", "قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي"],
  ["MIZAN brings together evidence, expert review and human approval for a specific AI use. It records who approved it, what the AI may do, the conditions attached, and when the decision needs review.", "يساعد ميزان المؤسسات على اتخاذ قرارات موثقة بشأن استخدام الذكاء الاصطناعي، وتحديد المسؤول عن القرار وشروط الاستخدام وموعد مراجعته. وتبقى الموافقة والرقابة بيد الأشخاص المخولين داخل المؤسسة."],
  ["AI assurance means checking and documenting whether an AI use is fit for its purpose and its operating conditions.", "يعني ضمان الذكاء الاصطناعي التحقق من ملاءمة استخدامه للغرض المقصود وظروف التشغيل، وتوثيق ذلك."],
  ["See an example", "اطلع على مثال"],
  ["In development. Exploring a focused design-partner pilot.", "قيد التطوير. نستكشف تجربة تطبيقية مركزة مع شريك تصميم."],
  ["Illustrative concept using sample information. It does not represent a live deployment or final product interface.", "مثال تصوري يستخدم معلومات نموذجية. لا يمثل تطبيقاً قائماً أو واجهة نهائية للمنتج."],
  ["AI use", "استخدام الذكاء الاصطناعي"],
  ["Purpose", "الغرض"],
  ["Accountable owner", "المسؤول عن القرار"],
  ["Allowed", "المسموح"],
  ["Not allowed", "غير المسموح"],
  ["Evidence", "الأدلة"],
  ["Decision", "القرار"],
  ["Conditions", "الشروط"],
  ["Review date", "تاريخ المراجعة"],
  ["Authorised, with conditions", "مصرح به، مع شروط"],
  ["Define", "تحديد"],
  ["Assess", "تقييم"],
  ["Authorise", "تصريح"],
  ["Monitor", "مراقبة"],
  ["Reauthorise", "إعادة التصريح"],
  ["Name", "الاسم"],
  ["Organisation", "المؤسسة"],
  ["Work email", "البريد الإلكتروني للعمل"],
  ["What would you like to discuss?", "ما الذي ترغب في مناقشته؟"],
  ["Area of interest", "مجال الاهتمام"],
  ["Sector", "القطاع"],
  ["Pilot discussion", "مناقشة تجربة تطبيقية"],
  ["Platform walkthrough", "جولة في المنصة"],
  ["Delivery partnership", "شراكة تنفيذ"],
  ["Research collaboration", "تعاون بحثي"],
  ["Thank you. Your enquiry has been recorded for follow-up by the MIZAN team.", "شكراً لك. تم تسجيل استفسارك ليتابعه فريق ميزان."],
  ["Please complete the required fields.", "يرجى إكمال الحقول المطلوبة."],
  ["Please enter a valid work email.", "يرجى إدخال بريد إلكتروني صحيح للعمل."],
  ["MIZAN helps institutions connect AI evidence to accountable human decisions. Developed through the AI for Public Purpose Lab at Arrownex.", "يساعد ميزان المؤسسات على ربط أدلة الذكاء الاصطناعي بقرارات بشرية مسؤولة. يتم تطويره من خلال مختبر الذكاء الاصطناعي للغرض العام في Arrownex."]
]);

const translatedTitles = new Map([
  ["MIZAN | Clear, Accountable Decisions About AI Use", "ميزان | قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي"],
  ["Platform | MIZAN", "المنصة | ميزان"],
  ["How It Works | MIZAN", "كيف يعمل | ميزان"],
  ["Use Cases | MIZAN", "حالات الاستخدام | ميزان"],
  ["Research and Method | MIZAN", "البحث والمنهج | ميزان"],
  ["About | MIZAN", "من نحن | ميزان"],
  ["Contact | MIZAN", "تواصل معنا | ميزان"],
  ["Qudra | MIZAN", "قدرة | ميزان"],
  ["Mu'tamad | MIZAN", "معتمد | ميزان"],
  ["Isnad | MIZAN", "إسناد | ميزان"],
  ["Misbar | MIZAN", "مسبار | ميزان"]
]);

function translateTextNode(node) {
  const raw = node.nodeValue;
  const key = raw.replace(/\s+/g, " ").trim();
  if (!key || !translations.has(key)) return;
  const leading = raw.match(/^\s*/)?.[0] || "";
  const trailing = raw.match(/\s*$/)?.[0] || "";
  node.nodeValue = `${leading}${translations.get(key)}${trailing}`;
}

function translateSubtree(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || parent.matches("script, style, code")) continue;
    translateTextNode(node);
  }
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    localStorage.setItem("mizan-language", savedLanguage === "ar" ? "en" : "ar");
    window.location.reload();
  });
}

if (savedLanguage === "ar") {
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
  document.body.classList.add("is-arabic");
  document.title = translatedTitles.get(document.title) || document.title;
  if (languageToggle) {
    languageToggle.textContent = "English";
    languageToggle.setAttribute("aria-label", "Switch to English");
  }
  translateSubtree(document.body);
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = Array.from(contactForm.querySelectorAll("[required]"));
    let hasError = false;

    requiredFields.forEach((field) => {
      const error = contactForm.querySelector(`#${field.id}-error`);
      const empty = !field.value.trim();
      const invalidEmail = field.type === "email" && field.value && !field.validity.valid;
      const invalid = empty || invalidEmail;
      field.setAttribute("aria-invalid", String(invalid));
      if (error) {
        error.textContent = empty
          ? (savedLanguage === "ar" ? "هذا الحقل مطلوب." : "This field is required.")
          : invalidEmail
            ? (savedLanguage === "ar" ? "يرجى إدخال بريد إلكتروني صحيح للعمل." : "Please enter a valid work email.")
            : "";
      }
      if (invalid) hasError = true;
    });

    const note = contactForm.querySelector(".form-note");
    if (hasError) {
      if (note) note.textContent = savedLanguage === "ar" ? "يرجى إكمال الحقول المطلوبة." : "Please complete the required fields.";
      const firstInvalid = contactForm.querySelector("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    if (note) {
      note.textContent = savedLanguage === "ar"
        ? "شكراً لك. تم تسجيل استفسارك ليتابعه فريق ميزان."
        : "Thank you. Your enquiry has been recorded for follow-up by the MIZAN team.";
    }
    contactForm.reset();
    requiredFields.forEach((field) => field.setAttribute("aria-invalid", "false"));
  });
}
