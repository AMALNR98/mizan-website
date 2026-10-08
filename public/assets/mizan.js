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
  ["Home", "الرئيسية"],
  ["Platform", "المنصة"],
  ["How it works", "كيف يعمل"],
  ["Research and method", "البحث والمنهج"],
  ["About", "من نحن"],
  ["Contact", "تواصل معنا"],
  ["Supporting instruments", "الأدوات الداعمة"],
  ["Privacy", "الخصوصية"],
  ["Accessibility", "إتاحة الوصول"],
  ["Website terms", "شروط الموقع"],
  ["Explore MIZAN", "استكشف ميزان"],
  ["Discuss a pilot", "ناقش تجربة تطبيقية"],
  ["Discuss your requirements", "ناقش متطلباتك"],
  ["Discuss your AI use case", "ناقش حالة استخدام الذكاء الاصطناعي"],
  ["Clear, accountable decisions about AI use.", "قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي."],
  ["AI assurance for public institutions", "ضمان الذكاء الاصطناعي للمؤسسات العامة"],
  ["Clear, accountable decisions about AI use", "قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي"],
  ["MIZAN brings together evidence, expert review and human approval for a specific AI use. It records who approved it, what the AI may do, the conditions attached, and when the decision needs review.", "يساعد ميزان المؤسسات على جمع الأدلة ومراجعة الخبراء والموافقة البشرية لاستخدام محدد للذكاء الاصطناعي، مع توثيق المسؤول والشروط وموعد المراجعة."],
  ["AI assurance means checking and documenting whether an AI use is fit for its purpose and its operating conditions.", "يعني ضمان الذكاء الاصطناعي التحقق من ملاءمة استخدامه للغرض المقصود وظروف التشغيل، وتوثيق ذلك."],
  ["View the approval record", "عرض سجل الموافقة"],
  ["In development. Exploring a focused design-partner pilot.", "قيد التطوير. نستكشف تجربة تطبيقية مركزة مع شريك تصميم."],
  ["Illustrative concept using sample information. It does not represent a live deployment or final product interface.", "مثال تصوري يستخدم معلومات نموذجية. لا يمثل تطبيقاً قائماً أو واجهة نهائية للمنتج."],
  ["Approval record snapshot", "لمحة عن سجل الموافقة"],
  ["AI use", "استخدام الذكاء الاصطناعي"],
  ["Purpose", "الغرض"],
  ["Accountable owner", "المسؤول عن القرار"],
  ["Allowed", "المسموح"],
  ["Not allowed", "غير المسموح"],
  ["Evidence", "الأدلة"],
  ["Decision", "القرار"],
  ["Conditions", "الشروط"],
  ["Review date", "تاريخ المراجعة"],
  ["Resident service assistant (constructed)", "مساعد خدمة السكان (مثال مُنشأ)"],
  ["Explain published requirements and route complex cases to staff.", "شرح المتطلبات المنشورة وتوجيه الحالات المعقدة إلى الموظفين."],
  ["Service delivery director", "مدير تقديم الخدمة"],
  ["Authorised, with conditions", "مصرح به، مع شروط"],
  ["30 January 2027", "٣٠ يناير ٢٠٢٧"],
  ["30 January 2027.", "٣٠ يناير ٢٠٢٧."],
  ["Watch MIZAN", "شاهد ميزان"],
  ["A short introduction to accountable AI approval", "مقدمة قصيرة عن الموافقة المسؤولة على استخدام الذكاء الاصطناعي"],
  ["See how MIZAN frames evidence, authority and human responsibility around a specific AI use.", "تعرّف على كيفية ربط ميزان بين الأدلة والصلاحية والمسؤولية البشرية حول استخدام محدد للذكاء الاصطناعي."],
  ["Approval record", "سجل الموافقة"],
  ["What an accountable AI approval record contains", "ماذا يتضمن سجل موافقة مسؤول"],
  ["The approval record is the maintained artifact. It separates what the AI may do, what remains a human decision, which evidence was reviewed, and when the approval needs review.", "سجل الموافقة هو السجل المحفوظ، ويفصل ما يجوز للذكاء الاصطناعي فعله وما يبقى قراراً بشرياً والأدلة التي تمت مراجعتها وموعد المراجعة."],
  ["Resident service assistant approval", "موافقة مساعد خدمة السكان"],
  ["Resident-facing assistant for a public service.", "مساعد موجه للسكان لخدمة عامة."],
  ["Explain published requirements, help residents prepare information, and route complex cases.", "شرح المتطلبات المنشورة، ومساعدة السكان على إعداد المعلومات، وتوجيه الحالات المعقدة."],
  ["Service delivery director.", "مدير تقديم الخدمة."],
  ["Use approved guidance, draft explanations, route cases to staff.", "استخدام الإرشادات المعتمدة، وصياغة الشروحات، وتوجيه الحالات إلى الموظفين."],
  ["Make eligibility decisions, change records, or send final notices.", "اتخاذ قرارات الأهلية أو تغيير السجلات أو إرسال الإشعارات النهائية."],
  ["Service policy, privacy and security review, accessibility testing, answer-quality review.", "سياسة الخدمة، ومراجعة الخصوصية والأمن، واختبار الوصول، ومراجعة جودة الإجابات."],
  ["Staff review for ambiguous cases; complaint signals trigger review.", "يراجع الموظفون الحالات الملتبسة؛ وتطلق إشارات الشكاوى مراجعة."],
  ["Benefits", "الفوائد"],
  ["Why institutions use an approval record", "لماذا تستخدم المؤسسات سجل الموافقة"],
  ["Make responsibility clear.", "توضيح المسؤولية."],
  ["Name the person responsible for the approval and the people who review the evidence.", "تحديد الشخص المسؤول عن الموافقة والأشخاص الذين يراجعون الأدلة."],
  ["Keep the basis for approval together.", "جمع أساس الموافقة في مكان واحد."],
  ["Link the decision to the assessments, policies and conditions that support it.", "ربط القرار بالتقييمات والسياسات والشروط التي تدعمه."],
  ["Know when to review.", "معرفة متى تجب المراجعة."],
  ["Flag changes that may affect the approval and route them for human review.", "تمييز التغييرات التي قد تؤثر في الموافقة وإحالتها إلى مراجعة بشرية."],
  ["The problem", "المشكلة"],
  ["AI approval depends on more than a technical test", "تعتمد موافقة الذكاء الاصطناعي على أكثر من اختبار تقني"],
  ["Evidence spread across teams.", "الأدلة موزعة بين الفرق."],
  ["Unclear basis for approval.", "أساس غير واضح للموافقة."],
  ["Changes after launch.", "تغييرات بعد الإطلاق."],
  ["People and public purpose", "الأشخاص والغرض العام"],
  ["Keep people in control of consequential decisions", "إبقاء الأشخاص مسيطرين على القرارات ذات الأثر"],
  ["Credibility and development", "المصداقية والتطوير"],
  ["Applied research connected to practical delivery", "بحث تطبيقي متصل بالتنفيذ العملي"],
  ["MIZAN is being developed through Arrownex's AI for Public Purpose Lab in the UAE. The work combines institutional governance, privacy and public policy expertise with engineering and security delivery.", "يتم تطوير ميزان من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس في دولة الإمارات. يجمع العمل بين خبرات الحوكمة المؤسسية والخصوصية والسياسات العامة والتنفيذ الهندسي والأمني."],
  ["Delivery.", "التنفيذ."],
  ["Method.", "المنهج."],
  ["Doctoral research, individual affiliation.", "بحث دكتوراه، وانتماء فردي."],
  ["Build the first case around your institution", "ابنِ الحالة الأولى حول مؤسستك"],
  ["About", "من نحن"],
  ["Connecting AI delivery with institutional responsibility", "ربط تنفيذ الذكاء الاصطناعي بالمسؤولية المؤسسية"],
  ["People", "الأشخاص"],
  ["Named leadership behind MIZAN", "القيادة المسماة وراء ميزان"],
  ["Co-founder and institutional governance lead.", "شريك مؤسس وقائد الحوكمة المؤسسية."],
  ["Co-founder and Arrownex delivery lead.", "شريك مؤسس وقائد التنفيذ في أروِنكس."],
  ["Operating relationships", "العلاقات التشغيلية"],
  ["Arrownex, the Lab and institutional responsibility", "أروِنكس والمختبر والمسؤولية المؤسسية"],
  ["Supporting the people and evidence behind the decision", "دعم الأشخاص والأدلة خلف القرار"],
  ["Four instruments", "أربع أدوات"],
  ["Secondary tools, not a competing front door", "أدوات ثانوية وليست مدخلاً منافساً"],
  ["Institutional capability.", "القدرة المؤسسية."],
  ["Examines institutional capability for this specific use.", "تفحص القدرة المؤسسية لهذا الاستخدام المحدد."],
  ["Human competence.", "الكفاءة البشرية."],
  ["Defines and assesses the knowledge and skills required of named reviewers and supervisors.", "تحدد وتقيم المعرفة والمهارات المطلوبة من المراجعين والمشرفين المحددين بالاسم."],
  ["Evidence and knowledge provenance.", "مصدر الأدلة والمعرفة."],
  ["Records where knowledge and evidence came from, who reviewed it, and when it needs updating.", "يسجل مصدر المعرفة والأدلة، ومن راجعها، ومتى تحتاج إلى تحديث."],
  ["Controlled research.", "بحث منضبط."],
  ["Tests assumptions and failure scenarios before wider use.", "يختبر الافتراضات وسيناريوهات الإخفاق قبل الاستخدام الأوسع."],
  ["Explore capability", "استكشف القدرة"],
  ["Explore accountable roles", "استكشف الأدوار المسؤولة"],
  ["Explore evidence sources", "استكشف مصادر الأدلة"],
  ["Explore research testing", "استكشف الاختبار البحثي"],
  ["How MIZAN works", "كيف يعمل ميزان"],
  ["Six clear steps", "ست خطوات واضحة"],
  ["From definition to review", "من التعريف إلى المراجعة"],
  ["Define", "تحديد"],
  ["Assess", "تقييم"],
  ["Authorise", "تصريح"],
  ["Monitor", "مراقبة"],
  ["Reauthorise", "إعادة التصريح"],
  ["Set the AI use, decision boundary and responsible owner at a high level.", "تحديد استخدام الذكاء الاصطناعي وحدود القرار والمالك المسؤول على مستوى عالٍ."],
  ["Bring relevant existing evidence into view for the approval discussion.", "إظهار الأدلة القائمة ذات الصلة لمناقشة الموافقة."],
  ["Review whether the available evidence supports the proposed use.", "مراجعة ما إذا كانت الأدلة المتاحة تدعم الاستخدام المقترح."],
  ["Record the human decision, conditions and review date.", "تسجيل القرار البشري والشروط وتاريخ المراجعة."],
  ["Keep the approval visible as the use and operating context change.", "إبقاء الموافقة واضحة مع تغير الاستخدام وسياق التشغيل."],
  ["Material changes trigger a review before the approval is continued or changed.", "تطلق التغييرات الجوهرية مراجعة قبل استمرار الموافقة أو تغييرها."],
  ["Change", "تغيير"],
  ["If the AI use changes, review the approval", "إذا تغير استخدام الذكاء الاصطناعي، راجع الموافقة"],
  ["Material changes trigger a review before the AI use moves beyond its approved scope.", "تطلق التغييرات الجوهرية مراجعة قبل أن يتجاوز استخدام الذكاء الاصطناعي نطاقه المعتمد."],
  ["What can happen?", "ما الذي يمكن أن يحدث؟"],
  ["The approval can continue, be limited, be paused, or be stopped. MIZAN records the reason and review date in plain words.", "يمكن أن تستمر الموافقة أو تُقيد أو تُوقف مؤقتاً أو تُنهى. يسجل ميزان السبب وتاريخ المراجعة بعبارات واضحة."],
  ["Supporting instrument", "أداة داعمة"],
  ["Evidence and knowledge provenance", "مصدر الأدلة والمعرفة"],
  ["Strengthening one approval case at a time", "تقوية حالة موافقة واحدة في كل مرة"],
  ["Availability", "الإتاحة"],
  ["Availability and pilot scope should be agreed with the MIZAN team.", "يجب الاتفاق مع فريق ميزان على الإتاحة ونطاق التجربة التطبيقية."],
  ["Controlled research and testing", "بحث واختبار منضبطان"],
  ["Misbar tests assumptions and failure scenarios before wider use.", "يختبر مسبار الافتراضات وسيناريوهات الإخفاق قبل الاستخدام الأوسع."],
  ["Reviewer and supervisor competence", "كفاءة المراجعين والمشرفين"],
  ["Mu'tamad defines and assesses the knowledge and skills required of named reviewers and supervisors.", "يحدد معتمد المعرفة والمهارات المطلوبة من المراجعين والمشرفين المسمين ويقيّمها."],
  ["Role profiles, review responsibilities and current competence evidence remain connected to the approval record.", "تبقى ملفات الأدوار ومسؤوليات المراجعة وأدلة الكفاءة الحالية مرتبطة بسجل الموافقة."],
  ["One record for evidence, approval and review", "سجل واحد للأدلة والموافقة والمراجعة"],
  ["Approval record summary", "ملخص سجل الموافقة"],
  ["Approval record", "سجل الموافقة"],
  ["The maintained record keeps the AI use, accountable owner, decision, conditions and review date visible.", "يحافظ السجل على وضوح استخدام الذكاء الاصطناعي والمالك المسؤول والقرار والشروط وتاريخ المراجعة."],
  ["View the sample approval record", "عرض نموذج سجل الموافقة"],
  ["Core capabilities", "القدرات الأساسية"],
  ["What the platform helps you check and record", "ما تساعدك المنصة على فحصه وتسجيله"],
  ["Define the approval.", "تحديد الموافقة."],
  ["Connect the evidence.", "ربط الأدلة."],
  ["Record specialist review.", "تسجيل مراجعة المتخصصين."],
  ["Check organisational capability.", "فحص القدرة التنظيمية."],
  ["Review changes.", "مراجعة التغييرات."],
  ["Recover the history.", "استعادة السجل التاريخي."],
  ["Consider institutional capability for this specific use.", "النظر في القدرة المؤسسية لهذا الاستخدام المحدد."],
  ["Material changes trigger a review.", "تطلق التغييرات الجوهرية مراجعة."],
  ["Working with existing systems", "العمل مع الأنظمة القائمة"],
  ["Designed to use the evidence institutions already hold", "مصمم لاستخدام الأدلة التي تحتفظ بها المؤسسات بالفعل"],
  ["Deployment requirements should be agreed privately for each pilot.", "يجب الاتفاق على متطلبات النشر بشكل خاص لكل تجربة تطبيقية."],
  ["Positioning", "التموضع"],
  ["Governance tools ask whether the system is safe. MIZAN asks whether the institution is entitled to let it act.", "تسأل أدوات الحوكمة ما إذا كان النظام آمناً. ويسأل ميزان ما إذا كانت المؤسسة مخولة بأن تجعله يعمل."],
  ["Institutional capability", "القدرة المؤسسية"],
  ["Qudra examines institutional capability for this specific use.", "تفحص قدرة القدرة المؤسسية لهذا الاستخدام المحدد."],
  ["Institutional capability for this specific use is treated as part of one approval case.", "تُعامل القدرة المؤسسية لهذا الاستخدام المحدد كجزء من حالة موافقة واحدة."],
  ["Privacy notice", "إشعار الخصوصية"],
  ["Enquiries", "الاستفسارات"],
  ["For privacy questions, contact the team through the enquiry form.", "لأسئلة الخصوصية، تواصل مع الفريق من خلال نموذج الاستفسار."],
  ["Website terms", "شروط الموقع"],
  ["Use of content", "استخدام المحتوى"],
  ["Updated soon", "سيتم التحديث قريباً"],
  ["Name", "الاسم"],
  ["Organisation", "المؤسسة"],
  ["Work email", "البريد الإلكتروني للعمل"],
  ["Area of interest", "مجال الاهتمام"],
  ["Sector", "القطاع"],
  ["What would you like to discuss?", "ما الذي ترغب في مناقشته؟"],
  ["Send enquiry", "إرسال الاستفسار"],
  ["Pilot discussion", "مناقشة تجربة تطبيقية"],
  ["Platform walkthrough", "جولة في المنصة"],
  ["Delivery partnership", "شراكة تنفيذ"],
  ["Research collaboration", "تعاون بحثي"],
  ["Please complete the required fields.", "يرجى إكمال الحقول المطلوبة."],
  ["Please enter a valid work email.", "يرجى إدخال بريد إلكتروني صحيح للعمل."],
  ["Thank you. Your enquiry has been recorded for follow-up by the MIZAN team.", "شكراً لك. تم تسجيل استفسارك ليتابعه فريق ميزان."],
  ["We could not send your enquiry. Please try again.", "تعذر إرسال الاستفسار. يرجى المحاولة مرة أخرى."],
  ["FAQ", "الأسئلة الشائعة"],
  ["Quick answers before you get in touch", "إجابات سريعة قبل التواصل"],
  ["What does MIZAN do?", "ماذا يفعل ميزان؟"],
  ["MIZAN records the evidence, conditions, owner, approval decision and review date for a specific institutional AI use.", "يسجل ميزان الأدلة والشروط والمالك وقرار الموافقة وتاريخ المراجعة لاستخدام مؤسسي محدد للذكاء الاصطناعي."],
  ["Who makes the approval decision?", "من يتخذ قرار الموافقة؟"],
  ["The institution does. MIZAN is designed to make the decision basis clear and reviewable.", "المؤسسة هي التي تفعل ذلك. صُمم ميزان لجعل أساس القرار واضحاً وقابلاً للمراجعة."],
  ["Does MIZAN produce a score?", "هل ينتج ميزان درجة؟"],
  ["No. The decision is recorded in words, not a score.", "لا. يُسجل القرار بعبارات واضحة وليس كدرجة."],
  ["Can we use it today?", "هل يمكننا استخدامه اليوم؟"],
  ["MIZAN is in development and exploring focused design-partner pilots. A pilot would start with one clearly defined AI use.", "ميزان قيد التطوير ويستكشف تجارب تطبيقية مركزة مع شركاء تصميم. تبدأ التجربة باستخدام واحد محدد بوضوح للذكاء الاصطناعي."],
  ["Arrownex", "أروِنكس"],
  ["UCL IIPP", "معهد الابتكار والغرض العام في يو سي إل"],
  ["Tariq Makadi", "طارق مكادي"],
  ["Sujit Kumar", "سوجيت كومار"],
  ["Qudra", "قدرة"],
  ["Mu'tamad", "معتمد"],
  ["Isnad", "إسناد"],
  ["Misbar", "مسبار"],
  ["AI for Public Purpose Lab", "مختبر الذكاء الاصطناعي للغرض العام"]
]);

const translatedTitles = new Map([
  ["MIZAN | Clear, Accountable Decisions About AI Use", "ميزان | قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي"],
  ["Platform | MIZAN", "المنصة | ميزان"],
  ["How It Works | MIZAN", "كيف يعمل | ميزان"],
  ["Research and Method | MIZAN", "البحث والمنهج | ميزان"],
  ["About | MIZAN", "من نحن | ميزان"],
  ["Contact | MIZAN", "تواصل معنا | ميزان"],
  ["Supporting Instruments | MIZAN", "الأدوات الداعمة | ميزان"],
  ["Qudra | MIZAN", "قدرة | ميزان"],
  ["Mu'tamad | MIZAN", "معتمد | ميزان"],
  ["Isnad | MIZAN", "إسناد | ميزان"],
  ["Misbar | MIZAN", "مسبار | ميزان"],
  ["Accessibility | MIZAN", "إتاحة الوصول | ميزان"],
  ["Privacy | MIZAN", "الخصوصية | ميزان"],
  ["Website Terms | MIZAN", "شروط الموقع | ميزان"]
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
    languageToggle.textContent = "الإنجليزية";
    languageToggle.setAttribute("aria-label", "التبديل إلى الإنجليزية");
  }
  translateSubtree(document.body);
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
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

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = new FormData(contactForm);
    if (!formData.has("form-name")) formData.set("form-name", contactForm.getAttribute("name") || "mizan-enquiry");

    contactForm.classList.add("is-submitting");
    if (submitButton) submitButton.disabled = true;
    if (note) note.textContent = savedLanguage === "ar" ? "جارٍ إرسال الاستفسار..." : "Sending enquiry...";

    try {
      const response = await fetch(contactForm.getAttribute("action") || "/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);

      if (note) {
        note.textContent = savedLanguage === "ar"
          ? "شكراً لك. تم تسجيل استفسارك ليتابعه فريق ميزان."
          : "Thank you. Your enquiry has been recorded for follow-up by the MIZAN team.";
      }
      contactForm.reset();
      requiredFields.forEach((field) => field.setAttribute("aria-invalid", "false"));
    } catch (error) {
      console.error(error);
      if (note) {
        note.textContent = savedLanguage === "ar"
          ? "تعذر إرسال الاستفسار. يرجى المحاولة مرة أخرى."
          : "We could not send your enquiry. Please try again.";
      }
    } finally {
      contactForm.classList.remove("is-submitting");
      if (submitButton) submitButton.disabled = false;
    }
  });
}


(function initMizanMotionLayer() {
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  document.documentElement.classList.add("motion-ready");

  const revealTargets = document.querySelectorAll([
    ".section",
    ".record-card",
    ".card",
    ".note-card",
    ".handoff-box",
    ".instrument-card",
    ".person-card",
    ".sequence li",
    ".architecture-flow article"
  ].join(","));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  document.querySelectorAll(".card, .note-card, .record-card, .instrument-card, .handoff-box, .sequence li, .architecture-flow article").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  });
})();

/* MIZAN premium journey system: visual-only content-locked pass */
(function initMizanPremiumJourney() {
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const homeMain = document.querySelector("body main");
  const isHome = !!document.querySelector(".home-hero");
  if (!homeMain || !isHome) return;

  const sections = Array.from(homeMain.querySelectorAll("section"));
  sections.forEach((section) => {
    section.classList.add("story-section");
    if (!section.querySelector(":scope > .section-pulse")) {
      const pulse = document.createElement("span");
      pulse.className = "section-pulse";
      pulse.setAttribute("aria-hidden", "true");
      section.prepend(pulse);
    }
  });

  if (reducedMotion) return;

  let ticking = false;
  const updateProgress = () => {
    ticking = false;
    const vh = window.innerHeight || 1;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      section.style.setProperty("--section-progress", progress.toFixed(3));
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  const tiltTargets = document.querySelectorAll(".record-card, .card, .note-card, .handoff-box");
  tiltTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.classList.add("is-tilting");
      target.style.setProperty("--tilt-x", (x * 5).toFixed(2) + "deg");
      target.style.setProperty("--tilt-y", (y * -5).toFixed(2) + "deg");
    });
    target.addEventListener("pointerleave", () => {
      target.classList.remove("is-tilting");
      target.style.removeProperty("--tilt-x");
      target.style.removeProperty("--tilt-y");
    });
  });
})();

/* Hero command graph interactivity */
(function initHeroCommandGraphInteractivity() {
  const stage = document.querySelector(".command-graph-stage");
  if (!stage) return;
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pulseTimer;

  const setFromPoint = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    stage.style.setProperty("--hero-x", (x * 100).toFixed(2) + "%");
    stage.style.setProperty("--hero-y", (y * 100).toFixed(2) + "%");
    if (!reducedMotion && !window.matchMedia("(pointer: coarse)").matches) {
      stage.style.setProperty("--hero-depth-x", ((x - 0.5) * 22).toFixed(2) + "px");
      stage.style.setProperty("--hero-depth-y", ((y - 0.5) * 16).toFixed(2) + "px");
    }
  };

  stage.addEventListener("pointermove", (event) => {
    stage.classList.add("is-interacting");
    setFromPoint(event.clientX, event.clientY);
  });

  stage.addEventListener("pointerleave", () => {
    stage.classList.remove("is-interacting");
    stage.style.setProperty("--hero-depth-x", "0px");
    stage.style.setProperty("--hero-depth-y", "0px");
  });

  stage.addEventListener("pointerdown", (event) => {
    setFromPoint(event.clientX, event.clientY);
    stage.classList.remove("is-pulsing");
    window.requestAnimationFrame(() => stage.classList.add("is-pulsing"));
    clearTimeout(pulseTimer);
    pulseTimer = window.setTimeout(() => stage.classList.remove("is-pulsing"), 820);
  });
})();
