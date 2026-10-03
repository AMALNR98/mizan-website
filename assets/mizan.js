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
  ["MIZAN helps institutions connect AI evidence to accountable human decisions. Developed through the AI for Public Purpose Lab at أروِنكس.", "يساعد ميزان المؤسسات على ربط أدلة الذكاء الاصطناعي بقرارات بشرية مسؤولة. يتم تطويره من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس."]
]);


const arabicExtraPairs = [
  [
    "Connecting AI delivery with institutional responsibility",
    "ربط تنفيذ الذكاء الاصطناعي بالمسؤولية المؤسسية"
  ],
  [
    "MIZAN is being developed through أروِنكس's AI for Public Purpose Lab in the UAE. The Lab brings applied research and institutional assurance into practical AI delivery for government and regulated organisations.",
    "يتم تطوير ميزان من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس في دولة الإمارات. يجمع المختبر بين البحث التطبيقي والضمان المؤسسي وبين التنفيذ العملي للذكاء الاصطناعي للحكومة والجهات المنظمة."
  ],
  [
    "People",
    "الأشخاص"
  ],
  [
    "Named leadership behind MIZAN",
    "القيادة المسماة وراء ميزان"
  ],
  [
    "Co-founder and institutional governance lead.",
    "شريك مؤسس وقائد الحوكمة المؤسسية."
  ],
  [
    "Brings experience in privacy, AI governance and digital public infrastructure to MIZAN's design. As a doctoral researcher at يو سي إل's Institute for Innovation and Public Purpose, he researches the relationship between digital infrastructure, institutions and legitimacy.",
    "يجلب خبرة في الخصوصية وحوكمة الذكاء الاصطناعي والبنية التحتية الرقمية العامة إلى تصميم ميزان. وبصفته باحث دكتوراه في معهد الابتكار والغرض العام في يو سي إل، يبحث العلاقة بين البنية التحتية الرقمية والمؤسسات والمشروعية."
  ],
  [
    "Co-founder and أروِنكس delivery lead.",
    "شريك مؤسس وقائد التنفيذ في أروِنكس."
  ],
  [
    "Leads أروِنكس's technology delivery, partnerships and customer relationships, connecting the venture to engineering and operational capability.",
    "يقود تنفيذ التقنية والشراكات وعلاقات العملاء في أروِنكس، ويربط المشروع بالقدرة الهندسية والتشغيلية."
  ],
  [
    "Operating relationships",
    "العلاقات التشغيلية"
  ],
  [
    "أروِنكس, the Lab and institutional responsibility",
    "أروِنكس والمختبر والمسؤولية المؤسسية"
  ],
  [
    "أروِنكس provides the operating and delivery platform. The AI for Public Purpose Lab develops and tests the methods and product proposition. The institution using MIZAN keeps responsibility for its AI approval decisions.",
    "توفر أروِنكس منصة التشغيل والتنفيذ. ويطور مختبر الذكاء الاصطناعي للغرض العام المنهجيات وطرح المنتج ويختبرهما. وتبقى المؤسسة التي تستخدم ميزان مسؤولة عن قرارات الموافقة على استخدام الذكاء الاصطناعي."
  ],
  [
    "Any IIPI relationship statement should be confirmed before stronger public wording is used. No endorsement, backing or institutional partnership is implied here.",
    "يجب تأكيد أي صياغة تتعلق بعلاقة معهد الابتكار والغرض العام قبل استخدام صياغة عامة أقوى. ولا يُفهم من ذلك وجود تأييد أو دعم أو شراكة مؤسسية."
  ],
  [
    "Explore MIZAN",
    "استكشف ميزان"
  ],
  [
    "Clear, accountable decisions about AI use.",
    "قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي."
  ],
  [
    "MIZAN aims for clear structure, keyboard-operable controls, readable text and responsive layouts across the public website.",
    "يهدف موقع ميزان إلى بنية واضحة، وعناصر تحكم تعمل بلوحة المفاتيح، ونص مقروء، وتخطيطات متجاوبة عبر الموقع العام."
  ],
  [
    "Current approach",
    "النهج الحالي"
  ],
  [
    "The site uses semantic headings, text-based example records, labelled form controls, accessible FAQ buttons and visible focus states. If you find an accessibility issue, contact the team through the enquiry form.",
    "يستخدم الموقع عناوين دلالية، وسجلات أمثلة نصية، وحقول نماذج معنونة، وأزرار أسئلة شائعة قابلة للوصول، وحالات تركيز مرئية. إذا وجدت مشكلة في إمكانية الوصول، فتواصل مع الفريق من خلال نموذج الاستفسار."
  ],
  [
    "Moved",
    "تم النقل"
  ],
  [
    "Authority assurance has moved.",
    "تم نقل محتوى ضمان الصلاحية."
  ],
  [
    "Evidence and method has moved.",
    "تم نقل محتوى الأدلة والمنهج."
  ],
  [
    "Use cases has moved.",
    "تم نقل محتوى حالات الاستخدام."
  ],
  [
    "This content is now part of the updated MIZAN site structure.",
    "أصبح هذا المحتوى الآن جزءاً من هيكل موقع ميزان المحدث."
  ],
  [
    "Continue",
    "متابعة"
  ],
  [
    "Tell us what you are considering, who would use it, and what decisions it may support. We can discuss the evidence, responsibilities and scope of a focused pilot.",
    "أخبرنا بما تفكر فيه، ومن سيستخدمه، وما القرارات التي قد يدعمها. يمكننا مناقشة الأدلة والمسؤوليات ونطاق تجربة تطبيقية مركزة."
  ],
  [
    "We will use these details to respond to your enquiry. Please do not include sensitive personal data or confidential case information. Read our",
    "سنستخدم هذه التفاصيل للرد على استفسارك. يرجى عدم تضمين بيانات شخصية حساسة أو معلومات حالة سرية. اقرأ"
  ],
  [
    "privacy notice",
    "إشعار الخصوصية"
  ],
  [
    "Pilot discussion",
    "مناقشة تجربة تطبيقية"
  ],
  [
    "Platform walkthrough",
    "جولة في المنصة"
  ],
  [
    "Delivery partnership",
    "شراكة تنفيذ"
  ],
  [
    "Research collaboration",
    "تعاون بحثي"
  ],
  [
    "Supporting the people and evidence behind the decision",
    "دعم الأشخاص والأدلة خلف القرار"
  ],
  [
    "MIZAN's wider research and development programme includes four supporting instruments. Their role is to strengthen an approval case for a specific AI use. Availability and pilot scope should be agreed with the team.",
    "يتضمن برنامج البحث والتطوير الأوسع في ميزان أربع أدوات داعمة. يتمثل دورها في تقوية حالة الموافقة لاستخدام محدد للذكاء الاصطناعي. ويجب الاتفاق مع الفريق على الإتاحة ونطاق التجربة التطبيقية."
  ],
  [
    "Four instruments",
    "أربع أدوات"
  ],
  [
    "Secondary tools, not a competing front door",
    "أدوات ثانوية وليست مدخلاً منافساً"
  ],
  [
    "Institutional capability.",
    "القدرة المؤسسية."
  ],
  [
    "Examines whether the organisation has the mandate, people, processes and supervision needed for this AI use.",
    "تفحص ما إذا كانت المؤسسة تملك التفويض والأشخاص والعمليات والإشراف اللازم لهذا الاستخدام للذكاء الاصطناعي."
  ],
  [
    "Explore capability",
    "استكشف القدرة"
  ],
  [
    "Human competence.",
    "الكفاءة البشرية."
  ],
  [
    "Defines and assesses the knowledge and skills required of named reviewers and supervisors.",
    "تحدد وتقيم المعرفة والمهارات المطلوبة من المراجعين والمشرفين المحددين بالاسم."
  ],
  [
    "Explore accountable roles",
    "استكشف الأدوار المسؤولة"
  ],
  [
    "Evidence and knowledge provenance.",
    "مصدر الأدلة والمعرفة."
  ],
  [
    "Records where knowledge and evidence came from, who reviewed it, and when it needs updating.",
    "يسجل مصدر المعرفة والأدلة، ومن راجعها، ومتى تحتاج إلى تحديث."
  ],
  [
    "Explore evidence sources",
    "استكشف مصادر الأدلة"
  ],
  [
    "Controlled research.",
    "بحث منضبط."
  ],
  [
    "Tests assumptions, boundaries and failure scenarios in a defined environment before wider use.",
    "يختبر الافتراضات والحدود وسيناريوهات الإخفاق في بيئة محددة قبل الاستخدام الأوسع."
  ],
  [
    "Explore research testing",
    "استكشف الاختبار البحثي"
  ],
  [
    "From evidence to accountable authorisation",
    "من الأدلة إلى تصريح مسؤول"
  ],
  [
    "The same six steps appear across the site: Define, Evidence, Assess, Authorise, Monitor and Reauthorise. The example below follows a student support assistant (constructed).",
    "تظهر الخطوات الست نفسها في جميع صفحات الموقع: تحديد، أدلة، تقييم، تصريح، مراقبة، وإعادة تصريح. ويتبع المثال أدناه مساعد دعم الطلاب (مثال مُنشأ)."
  ],
  [
    "Six-step workflow",
    "سير عمل من ست خطوات"
  ],
  [
    "The human decision point stays visible",
    "تبقى نقطة القرار البشري واضحة"
  ],
  [
    "Step 1",
    "الخطوة ١"
  ],
  [
    "Step 2",
    "الخطوة ٢"
  ],
  [
    "Step 3",
    "الخطوة ٣"
  ],
  [
    "Step 4",
    "الخطوة ٤"
  ],
  [
    "Step 5",
    "الخطوة ٥"
  ],
  [
    "Step 6",
    "الخطوة ٦"
  ],
  [
    "What you bring:",
    "ما تقدمه:"
  ],
  [
    "Who is involved:",
    "من يشارك:"
  ],
  [
    "What MIZAN produces:",
    "ما ينتجه ميزان:"
  ],
  [
    "Purpose, owner, permitted actions and limits.",
    "الغرض والمالك والإجراءات المسموحة والحدود."
  ],
  [
    "Service owner and governance lead.",
    "مالك الخدمة وقائد الحوكمة."
  ],
  [
    "A bounded use case and draft approval scope.",
    "حالة استخدام محددة النطاق ومسودة نطاق الموافقة."
  ],
  [
    "Policies, privacy review, security review, accessibility testing and source list.",
    "السياسات ومراجعة الخصوصية ومراجعة الأمن واختبار الوصول وقائمة المصادر."
  ],
  [
    "Evidence owners and specialist teams.",
    "مالكو الأدلة والفرق المتخصصة."
  ],
  [
    "A connected evidence set with source and review status.",
    "مجموعة أدلة مترابطة مع المصدر وحالة المراجعة."
  ],
  [
    "The connected evidence set and identified gaps.",
    "مجموعة الأدلة المترابطة والفجوات المحددة."
  ],
  [
    "Relevant specialists and accountable reviewers.",
    "المتخصصون المعنيون والمراجعون المسؤولون."
  ],
  [
    "Findings, unresolved gaps and required conditions.",
    "النتائج والفجوات غير المحسومة والشروط المطلوبة."
  ],
  [
    "Specialist findings and proposed conditions.",
    "نتائج المتخصصين والشروط المقترحة."
  ],
  [
    "An authorised institutional decision owner.",
    "مالك قرار مؤسسي مخول."
  ],
  [
    "A worded decision, reasons, conditions and review date.",
    "قرار مصاغ بالكلمات مع الأسباب والشروط وتاريخ المراجعة."
  ],
  [
    "Agreed signals such as source changes, incidents and complaints.",
    "إشارات متفق عليها مثل تغير المصادر والحوادث والشكاوى."
  ],
  [
    "Operational owner with escalation routes.",
    "مالك تشغيلي مع مسارات تصعيد."
  ],
  [
    "Signals attached to the relevant part of the approval.",
    "إشارات مرتبطة بالجزء المعني من الموافقة."
  ],
  [
    "Affected evidence and change history.",
    "الأدلة المتأثرة وسجل التغيير."
  ],
  [
    "Decision owner with relevant reviewers.",
    "مالك القرار مع المراجعين المعنيين."
  ],
  [
    "Running example",
    "مثال تطبيقي"
  ],
  [
    "Student support assistant (constructed)",
    "مساعد دعم الطلاب (مثال مُنشأ)"
  ],
  [
    "The assistant answers routine student questions using approved institutional information. Staff handle ambiguous questions and consequential decisions. The approval record defines the assistant's boundaries, evidence and review triggers.",
    "يجيب المساعد عن أسئلة الطلاب الروتينية باستخدام معلومات مؤسسية معتمدة. ويتولى الموظفون الأسئلة الملتبسة والقرارات ذات الأثر. ويحدد سجل الموافقة حدود المساعد والأدلة ومحفزات المراجعة."
  ],
  [
    "Illustrative concept using sample information. It does not represent a live deployment.",
    "مثال تصوري يستخدم معلومات نموذجية. لا يمثل تطبيقاً قائماً."
  ],
  [
    "Student support assistant for routine questions.",
    "مساعد دعم الطلاب للأسئلة الروتينية."
  ],
  [
    "Answer questions using approved institutional information.",
    "الإجابة عن الأسئلة باستخدام معلومات مؤسسية معتمدة."
  ],
  [
    "Student services lead.",
    "قائد خدمات الطلاب."
  ],
  [
    "Use approved sources and draft support responses.",
    "استخدام المصادر المعتمدة وصياغة ردود الدعم."
  ],
  [
    "Decide eligibility, discipline, progression or access to services.",
    "تحديد الأهلية أو الإجراءات التأديبية أو التقدم أو الوصول إلى الخدمات."
  ],
  [
    "Source accuracy, student data protections, accessibility, staff readiness.",
    "دقة المصادر، وحماية بيانات الطلاب، وإمكانية الوصول، وجاهزية الموظفين."
  ],
  [
    "Escalate ambiguous questions and consequential decisions to staff.",
    "تصعيد الأسئلة الملتبسة والقرارات ذات الأثر إلى الموظفين."
  ],
  [
    "30 January 2027.",
    "٣٠ يناير ٢٠٢٧."
  ],
  [
    "30 January 2027",
    "٣٠ يناير ٢٠٢٧"
  ],
  [
    "Material change",
    "تغيير جوهري"
  ],
  [
    "When the use changes, the permission comes back for review",
    "عندما يتغير الاستخدام تعود الصلاحية للمراجعة"
  ],
  [
    "If the assistant is proposed to start making eligibility decisions, the original guidance-only approval must be reassessed. The affected evidence, human decision boundary and accountable owner return to review before any new approval is recorded.",
    "إذا اقتُرح أن يبدأ المساعد في اتخاذ قرارات الأهلية، فيجب إعادة تقييم الموافقة الأصلية المحدودة بالإرشاد فقط. وتعود الأدلة المتأثرة وحدود القرار البشري والمالك المسؤول إلى المراجعة قبل تسجيل أي موافقة جديدة."
  ],
  [
    "Possible outcomes",
    "النتائج الممكنة"
  ],
  [
    "Continue, restrict, suspend or withdraw the approval.",
    "الاستمرار أو التقييد أو التعليق أو سحب الموافقة."
  ],
  [
    "Continue, restrict, suspend or withdraw the approval. The outcome is recorded in words with the reason and review date, not as a score.",
    "الاستمرار أو التقييد أو التعليق أو سحب الموافقة. تُسجل النتيجة بالكلمات مع السبب وتاريخ المراجعة، وليس كدرجة رقمية."
  ],
  [
    "Example approval record",
    "مثال لسجل الموافقة"
  ],
  [
    "Resident service assistant (constructed)",
    "مساعد خدمة السكان (مثال مُنشأ)"
  ],
  [
    "Explain published requirements and route complex cases to staff.",
    "شرح المتطلبات المنشورة وتوجيه الحالات المعقدة إلى الموظفين."
  ],
  [
    "Service delivery director",
    "مدير تقديم الخدمة"
  ],
  [
    "Example record",
    "مثال سجل"
  ],
  [
    "What an accountable AI approval can look like",
    "كيف يمكن أن تبدو موافقة مسؤولة على استخدام الذكاء الاصطناعي"
  ],
  [
    "The decision state is word-based, not a score. The example separates what the AI may do, what remains a human decision, which evidence was reviewed, and when the approval needs review.",
    "حالة القرار مصاغة بالكلمات وليست درجة. ويفصل المثال بين ما يجوز للذكاء الاصطناعي فعله، وما يبقى قراراً بشرياً، وما الأدلة التي روجعت، ومتى تحتاج الموافقة إلى مراجعة."
  ],
  [
    "Resident-facing assistant for a public service.",
    "مساعد موجه للسكان لخدمة عامة."
  ],
  [
    "Explain published requirements, help residents prepare information, and route complex cases.",
    "شرح المتطلبات المنشورة، ومساعدة السكان على إعداد المعلومات، وتوجيه الحالات المعقدة."
  ],
  [
    "Service delivery director.",
    "مدير تقديم الخدمة."
  ],
  [
    "Use approved guidance, draft explanations, route cases to staff.",
    "استخدام الإرشادات المعتمدة، وصياغة الشروحات، وتوجيه الحالات إلى الموظفين."
  ],
  [
    "Make eligibility decisions, change records, or send final notices.",
    "اتخاذ قرارات الأهلية أو تغيير السجلات أو إرسال الإشعارات النهائية."
  ],
  [
    "Service policy, privacy and security review, accessibility testing, answer-quality review.",
    "سياسة الخدمة، ومراجعة الخصوصية والأمن، واختبار الوصول، ومراجعة جودة الإجابات."
  ],
  [
    "Staff review for ambiguous cases; complaint signals trigger review.",
    "يراجع الموظفون الحالات الملتبسة؛ وتطلق إشارات الشكاوى مراجعة."
  ],
  [
    "Benefits",
    "الفوائد"
  ],
  [
    "Why institutions use an approval record",
    "لماذا تستخدم المؤسسات سجل الموافقة"
  ],
  [
    "Make responsibility clear.",
    "توضيح المسؤولية."
  ],
  [
    "Name the person responsible for the approval and the people who review the evidence.",
    "تحديد الشخص المسؤول عن الموافقة والأشخاص الذين يراجعون الأدلة."
  ],
  [
    "Keep the basis for approval together.",
    "جمع أساس الموافقة في مكان واحد."
  ],
  [
    "Link the decision to the assessments, policies and conditions that support it.",
    "ربط القرار بالتقييمات والسياسات والشروط التي تدعمه."
  ],
  [
    "Know when to review.",
    "معرفة متى تجب المراجعة."
  ],
  [
    "Flag changes that may affect the approval and route them for human review.",
    "تمييز التغييرات التي قد تؤثر في الموافقة وتوجيهها إلى مراجعة بشرية."
  ],
  [
    "The problem",
    "المشكلة"
  ],
  [
    "AI approval depends on more than a technical test",
    "تعتمد موافقة الذكاء الاصطناعي على أكثر من اختبار تقني"
  ],
  [
    "An AI system may perform well while important questions remain unanswered: who can approve its use, can the organisation supervise it, what must stay a human decision, and what happens if the system or its purpose changes.",
    "قد يعمل نظام الذكاء الاصطناعي جيداً بينما تبقى أسئلة مهمة بلا إجابة: من يستطيع الموافقة على استخدامه؟ هل تستطيع المؤسسة الإشراف عليه؟ ما الذي يجب أن يبقى قراراً بشرياً؟ وماذا يحدث إذا تغير النظام أو غرضه؟"
  ],
  [
    "Evidence spread across teams.",
    "الأدلة موزعة بين الفرق."
  ],
  [
    "Policies, tests and reviews often sit in different documents and systems.",
    "غالباً ما توجد السياسات والاختبارات والمراجعات في مستندات وأنظمة مختلفة."
  ],
  [
    "Unclear basis for approval.",
    "أساس غير واضح للموافقة."
  ],
  [
    "A decision may be recorded without a clear link to its evidence, limits and owner.",
    "قد يُسجل القرار من دون رابط واضح بأدلته وحدوده ومالكه."
  ],
  [
    "Changes after launch.",
    "تغييرات بعد الإطلاق."
  ],
  [
    "A new model, policy, permission or incident may require the original decision to be reviewed.",
    "قد يتطلب نموذج جديد أو سياسة جديدة أو صلاحية جديدة أو حادث مراجعة القرار الأصلي."
  ],
  [
    "From evidence to a decision people can stand behind",
    "من الأدلة إلى قرار يمكن للناس الوقوف خلفه"
  ],
  [
    "MIZAN is designed to reuse your existing governance work and connect it to a maintained decision record. The institution keeps responsibility for the approval.",
    "صُمم ميزان لإعادة استخدام عمل الحوكمة القائم وربطه بسجل قرار محفوظ. وتبقى المؤسسة مسؤولة عن الموافقة."
  ],
  [
    "Set the purpose, responsible owner, permitted actions and limits.",
    "تحديد الغرض والمالك المسؤول والإجراءات المسموحة والحدود."
  ],
  [
    "Bring together existing policies, assessments, technical tests and operational information.",
    "جمع السياسات والتقييمات والاختبارات التقنية والمعلومات التشغيلية القائمة."
  ],
  [
    "Ask relevant specialists to review the evidence and identify gaps or conditions.",
    "طلب مراجعة الأدلة من المتخصصين المعنيين وتحديد الفجوات أو الشروط."
  ],
  [
    "An authorised person records the reasons, conditions and review date.",
    "يسجل شخص مخول الأسباب والشروط وتاريخ المراجعة."
  ],
  [
    "Track agreed changes and signals that could affect the basis for approval.",
    "تتبع التغييرات والإشارات المتفق عليها التي قد تؤثر في أساس الموافقة."
  ],
  [
    "Decide whether to continue, restrict, suspend or withdraw the approval.",
    "تحديد ما إذا كانت الموافقة ستستمر أو تُقيد أو تُعلق أو تُسحب."
  ],
  [
    "See the full workflow",
    "اطلع على سير العمل الكامل"
  ],
  [
    "Where MIZAN sits",
    "موقع ميزان"
  ],
  [
    "Not another AI governance dashboard",
    "ليس لوحة حوكمة ذكاء اصطناعي أخرى"
  ],
  [
    "AI governance platforms check whether an AI system is tested, monitored and under policy control. MIZAN answers a narrower, later question: given that evidence, is this institution currently entitled and able to let this specific AI act on its behalf, and for how long. MIZAN sits after AI governance, not instead of it.",
    "تتحقق منصات حوكمة الذكاء الاصطناعي مما إذا كان النظام مختبراً ومراقباً وخاضعاً للسياسات. أما ميزان فيجيب عن سؤال أضيق ولاحق: بناء على تلك الأدلة، هل يحق لهذه المؤسسة حالياً، وهل تستطيع، أن تسمح لهذا الاستخدام المحدد للذكاء الاصطناعي بالعمل نيابة عنها، وإلى متى؟ يأتي ميزان بعد الحوكمة ولا يحل محلها."
  ],
  [
    "AI governance and assurance tools",
    "أدوات حوكمة وضمان الذكاء الاصطناعي"
  ],
  [
    "Is the system safe, tested and monitored?",
    "هل النظام آمن ومختبر ومراقب؟"
  ],
  [
    "Is the institution entitled to let it act, right now?",
    "هل يحق للمؤسسة أن تسمح له بالعمل الآن؟"
  ],
  [
    "See how MIZAN relates to existing tools",
    "اطلع على علاقة ميزان بالأدوات القائمة"
  ],
  [
    "People and public purpose",
    "الأشخاص والغرض العام"
  ],
  [
    "Keep people in control of consequential decisions",
    "إبقاء الأشخاص مسيطرين على القرارات ذات الأثر"
  ],
  [
    "Public service AI should stay understandable, accessible and open to challenge. The approval record should define when staff must intervene, what decisions remain with people, and how concerns reach the responsible team.",
    "يجب أن يبقى الذكاء الاصطناعي في الخدمات العامة مفهوماً ومتاحاً وقابلاً للاعتراض. وينبغي أن يحدد سجل الموافقة متى يجب أن يتدخل الموظفون، وما القرارات التي تبقى بيد الأشخاص، وكيف تصل المخاوف إلى الفريق المسؤول."
  ],
  [
    "A material change is a change that could affect the basis for approval, such as a model update, a permission change, or a rise in complaints.",
    "التغيير الجوهري هو تغيير قد يؤثر في أساس الموافقة، مثل تحديث النموذج أو تغيير الصلاحيات أو ارتفاع الشكاوى."
  ],
  [
    "Start with one clearly defined AI use",
    "ابدأ باستخدام واحد محدد بوضوح للذكاء الاصطناعي"
  ],
  [
    "Government services.",
    "الخدمات الحكومية."
  ],
  [
    "Define how a service assistant may explain guidance, support staff and route complex cases, while keeping final decisions with authorised officers.",
    "حدد كيف يمكن لمساعد الخدمة أن يشرح الإرشادات ويدعم الموظفين ويوجه الحالات المعقدة، مع إبقاء القرارات النهائية لدى الموظفين المخولين."
  ],
  [
    "Explain published guidance.",
    "شرح الإرشادات المنشورة."
  ],
  [
    "Make eligibility decisions.",
    "اتخاذ قرارات الأهلية."
  ],
  [
    "Education.",
    "التعليم."
  ],
  [
    "Set clear boundaries for a student support assistant, including approved sources, escalation to staff and decisions it cannot make.",
    "ضع حدوداً واضحة لمساعد دعم الطلاب، بما في ذلك المصادر المعتمدة والتصعيد إلى الموظفين والقرارات التي لا يستطيع اتخاذها."
  ],
  [
    "Answer routine questions.",
    "الإجابة عن الأسئلة الروتينية."
  ],
  [
    "Make consequential decisions.",
    "اتخاذ قرارات ذات أثر."
  ],
  [
    "Explore use cases",
    "استكشف حالات الاستخدام"
  ],
  [
    "Credibility and development",
    "المصداقية والتطوير"
  ],
  [
    "Applied research connected to practical delivery",
    "بحث تطبيقي متصل بالتنفيذ العملي"
  ],
  [
    "MIZAN is being developed through أروِنكس's AI for Public Purpose Lab in the UAE. The work combines institutional governance, privacy and public policy expertise with engineering and security delivery.",
    "يتم تطوير ميزان من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس في دولة الإمارات. يجمع العمل بين خبرات الحوكمة المؤسسية والخصوصية والسياسات العامة وبين التنفيذ الهندسي والأمني."
  ],
  [
    "The methodology draws on public sector guidance and research on accountability, institutional capability and AI assurance. Pilot work will test whether the approach produces clearer decisions, reuses existing evidence and identifies when review is needed.",
    "تستند المنهجية إلى إرشادات القطاع العام وأبحاث المساءلة والقدرة المؤسسية وضمان الذكاء الاصطناعي. وستختبر التجارب التطبيقية ما إذا كان النهج ينتج قرارات أوضح، ويعيد استخدام الأدلة القائمة، ويحدد متى تكون المراجعة مطلوبة."
  ],
  [
    "Delivery.",
    "التنفيذ."
  ],
  [
    "Method.",
    "المنهج."
  ],
  [
    "Doctoral research, individual affiliation.",
    "بحث دكتوراه، وانتماء فردي."
  ],
  [
    "Build the first case around your institution",
    "ابنِ الحالة الأولى حول مؤسستك"
  ],
  [
    "Start with one AI use, one accountable owner and an agreed operating environment. Together, we can map the evidence, define the conditions for approval and agree how the pilot's value will be measured.",
    "ابدأ باستخدام واحد للذكاء الاصطناعي ومالك مسؤول واحد وبيئة تشغيل متفق عليها. يمكننا معاً رسم خريطة الأدلة، وتحديد شروط الموافقة، والاتفاق على كيفية قياس قيمة التجربة التطبيقية."
  ],
  [
    "What we would agree: scope and responsibilities; evidence and review requirements; pilot deliverables and acceptance criteria.",
    "ما سنتفق عليه: النطاق والمسؤوليات؛ ومتطلبات الأدلة والمراجعة؛ ومخرجات التجربة ومعايير القبول."
  ],
  [
    "Quick answers before you read further",
    "إجابات سريعة قبل أن تتابع القراءة"
  ],
  [
    "What does MIZAN do?",
    "ماذا يفعل ميزان؟"
  ],
  [
    "MIZAN records the evidence, conditions, owner, approval decision and review date for a specific institutional AI use.",
    "يسجل ميزان الأدلة والشروط والمالك وقرار الموافقة وتاريخ المراجعة لاستخدام مؤسسي محدد للذكاء الاصطناعي."
  ],
  [
    "Who makes the approval decision?",
    "من يتخذ قرار الموافقة؟"
  ],
  [
    "The institution does. MIZAN is designed to make the decision basis clear and reviewable; it does not grant legal or statutory authority.",
    "المؤسسة هي التي تفعل ذلك. صُمم ميزان لجعل أساس القرار واضحاً وقابلاً للمراجعة؛ ولا يمنح صلاحية قانونية أو نظامية."
  ],
  [
    "Does it replace our existing assessments?",
    "هل يحل محل تقييماتنا القائمة؟"
  ],
  [
    "No. MIZAN is designed to reuse evidence from existing risk, privacy, security and AI evaluation work.",
    "لا. صُمم ميزان لإعادة استخدام الأدلة من أعمال المخاطر والخصوصية والأمن وتقييم الذكاء الاصطناعي القائمة."
  ],
  [
    "Is this only for AI agents?",
    "هل هذا مخصص لوكلاء الذكاء الاصطناعي فقط؟"
  ],
  [
    "No. The method is useful wherever an institution needs a clear approval basis, bounded permissions, human supervision and review.",
    "لا. المنهج مفيد أينما احتاجت المؤسسة إلى أساس واضح للموافقة، وصلاحيات محددة، وإشراف بشري، ومراجعة."
  ],
  [
    "Can we use it today?",
    "هل يمكننا استخدامه اليوم؟"
  ],
  [
    "MIZAN is in development and exploring focused design-partner pilots. A pilot would start with one clearly defined AI use.",
    "ميزان قيد التطوير ويستكشف تجارب تطبيقية مركزة مع شركاء تصميم. تبدأ التجربة باستخدام واحد محدد بوضوح للذكاء الاصطناعي."
  ],
  [
    "How would a pilot begin?",
    "كيف تبدأ التجربة التطبيقية؟"
  ],
  [
    "We would agree the scope, responsible owner, evidence to review, conditions to test, and how value will be measured.",
    "سنتفق على النطاق والمالك المسؤول والأدلة المطلوب مراجعتها والشروط المطلوب اختبارها وكيفية قياس القيمة."
  ],
  [
    "Evidence and knowledge provenance",
    "مصدر الأدلة والمعرفة"
  ],
  [
    "Isnad records where knowledge and evidence came from, who reviewed it, and when it needs updating.",
    "يسجل إسناد مصدر المعرفة والأدلة، ومن راجعها، ومتى تحتاج إلى تحديث."
  ],
  [
    "Strengthening one approval case at a time",
    "تقوية حالة موافقة واحدة في كل مرة"
  ],
  [
    "Source, owner, review history and update needs remain visible so the decision basis can be reconstructed.",
    "يبقى المصدر والمالك وسجل المراجعة واحتياجات التحديث واضحة بحيث يمكن إعادة بناء أساس القرار."
  ],
  [
    "Availability",
    "الإتاحة"
  ],
  [
    "Availability and pilot scope should be agreed with the MIZAN team. This page does not state or imply formal credential, customer deployment or software-granted approval.",
    "يجب الاتفاق مع فريق ميزان على الإتاحة ونطاق التجربة التطبيقية. لا تنص هذه الصفحة ولا توحي بوجود اعتماد رسمي أو نشر لدى عميل أو موافقة يمنحها البرنامج."
  ],
  [
    "Controlled research and testing",
    "بحث واختبار منضبطان"
  ],
  [
    "Misbar tests assumptions, boundaries and failure scenarios in a defined environment before wider use.",
    "يختبر مسبار الافتراضات والحدود وسيناريوهات الإخفاق في بيئة محددة قبل الاستخدام الأوسع."
  ],
  [
    "Research questions, stop conditions and transfer into governed knowledge are defined before findings affect practice.",
    "تُحدد أسئلة البحث وشروط الإيقاف ونقل النتائج إلى معرفة محكومة قبل أن تؤثر النتائج في الممارسة."
  ],
  [
    "Reviewer and supervisor competence",
    "كفاءة المراجعين والمشرفين"
  ],
  [
    "معتمد defines and assesses the knowledge and skills required of named reviewers and supervisors. It is not described as issuing credentials unless a defined public scheme exists.",
    "يحدد معتمد ويقيم المعرفة والمهارات المطلوبة من المراجعين والمشرفين المحددين بالاسم. ولا يوصف بأنه يصدر اعتمادات ما لم توجد منظومة عامة محددة."
  ],
  [
    "Role profiles, review responsibilities and current competence evidence remain connected to the approval record.",
    "تبقى ملفات الأدوار ومسؤوليات المراجعة وأدلة الكفاءة الحالية مرتبطة بسجل الموافقة."
  ],
  [
    "One record for evidence, approval and review",
    "سجل واحد للأدلة والموافقة والمراجعة"
  ],
  [
    "MIZAN is being developed to help institutions connect an AI use to the evidence, people and conditions that support its approval. The record is designed to stay reviewable as the system and its operating environment change.",
    "يتم تطوير ميزان لمساعدة المؤسسات على ربط استخدام الذكاء الاصطناعي بالأدلة والأشخاص والشروط التي تدعم الموافقة عليه. وصُمم السجل ليبقى قابلاً للمراجعة مع تغير النظام وبيئة تشغيله."
  ],
  [
    "Discuss your requirements",
    "ناقش متطلباتك"
  ],
  [
    "See the example workflow",
    "اطلع على مثال سير العمل"
  ],
  [
    "Resident-facing service assistant.",
    "مساعد خدمة موجه للسكان."
  ],
  [
    "Explain guidance, prepare drafts, route cases.",
    "شرح الإرشادات وإعداد المسودات وتوجيه الحالات."
  ],
  [
    "Make eligibility decisions or change official records.",
    "اتخاذ قرارات الأهلية أو تغيير السجلات الرسمية."
  ],
  [
    "Service policy, privacy and security review, accessibility testing, answer quality.",
    "سياسة الخدمة، ومراجعة الخصوصية والأمن، واختبار الوصول، وجودة الإجابات."
  ],
  [
    "Staff review ambiguous cases; complaints trigger review.",
    "يراجع الموظفون الحالات الملتبسة؛ وتطلق الشكاوى المراجعة."
  ],
  [
    "Core capabilities",
    "القدرات الأساسية"
  ],
  [
    "What the platform helps you check and record",
    "ما تساعدك المنصة على فحصه وتسجيله"
  ],
  [
    "Define the approval.",
    "تحديد الموافقة."
  ],
  [
    "Record the purpose, responsible owner, permitted actions, limits and review date.",
    "تسجيل الغرض والمالك المسؤول والإجراءات المسموحة والحدود وتاريخ المراجعة."
  ],
  [
    "Connect the evidence.",
    "ربط الأدلة."
  ],
  [
    "Link policies, assessments and technical reports to the question each item supports.",
    "ربط السياسات والتقييمات والتقارير التقنية بالسؤال الذي يدعمه كل عنصر."
  ],
  [
    "Record specialist review.",
    "تسجيل مراجعة المتخصصين."
  ],
  [
    "Keep specialist findings, unresolved gaps and required conditions visible to the decision owner.",
    "إبقاء نتائج المتخصصين والفجوات غير المحسومة والشروط المطلوبة واضحة لمالك القرار."
  ],
  [
    "Check organisational capability.",
    "فحص القدرة التنظيمية."
  ],
  [
    "Assess mandate, people, processes, data controls, supervision, transparency, contestability and monitoring for this use.",
    "تقييم التفويض والأشخاص والعمليات وضوابط البيانات والإشراف والشفافية وقابلية الاعتراض والمراقبة لهذا الاستخدام."
  ],
  [
    "Review changes.",
    "مراجعة التغييرات."
  ],
  [
    "Connect agreed change signals to the parts of the approval that need reassessment.",
    "ربط إشارات التغيير المتفق عليها بأجزاء الموافقة التي تحتاج إلى إعادة تقييم."
  ],
  [
    "Recover the history.",
    "استعادة السجل التاريخي."
  ],
  [
    "Show what was known, what was reviewed, who decided, and the conditions attached.",
    "إظهار ما كان معروفاً، وما تمت مراجعته، ومن اتخذ القرار، وما الشروط المرتبطة به."
  ],
  [
    "Working with existing systems",
    "العمل مع الأنظمة القائمة"
  ],
  [
    "Designed to use the evidence institutions already hold",
    "مصمم لاستخدام الأدلة التي تحتفظ بها المؤسسات بالفعل"
  ],
  [
    "MIZAN is designed to use evidence from existing risk, privacy, security and AI evaluation processes. Integration and deployment requirements should be agreed for each pilot, including identity, permissions, hosting, data access and change monitoring.",
    "صُمم ميزان لاستخدام الأدلة من عمليات المخاطر والخصوصية والأمن وتقييم الذكاء الاصطناعي القائمة. ويجب الاتفاق على متطلبات التكامل والنشر لكل تجربة تطبيقية، بما في ذلك الهوية والصلاحيات والاستضافة والوصول إلى البيانات ومراقبة التغيير."
  ],
  [
    "Available now",
    "متاح الآن"
  ],
  [
    "Structured approval record",
    "سجل موافقة منظم"
  ],
  [
    "Manual evidence mapping and review fields for focused pilot use.",
    "رسم يدوي لخريطة الأدلة وحقول مراجعة لاستخدامها في تجربة تطبيقية مركزة."
  ],
  [
    "In development",
    "قيد التطوير"
  ],
  [
    "Evidence import workflow",
    "سير عمل استيراد الأدلة"
  ],
  [
    "Connector requirements to be agreed during pilot scoping.",
    "يتم الاتفاق على متطلبات الموصلات أثناء تحديد نطاق التجربة."
  ],
  [
    "Planned",
    "مخطط"
  ],
  [
    "Change monitoring signals",
    "إشارات مراقبة التغيير"
  ],
  [
    "Signal design depends on deployed systems and permissions.",
    "يعتمد تصميم الإشارات على الأنظمة والصلاحيات المنشورة."
  ],
  [
    "Identity and permissions",
    "الهوية والصلاحيات"
  ],
  [
    "Deployment-specific integration, not presented as live today.",
    "تكامل خاص بالنشر، ولا يُعرض على أنه متاح اليوم."
  ],
  [
    "AI governance relationship",
    "العلاقة مع حوكمة الذكاء الاصطناعي"
  ],
  [
    "A different question from the AI governance layer",
    "سؤال مختلف عن طبقة حوكمة الذكاء الاصطناعي"
  ],
  [
    "AI governance platforms such as كريدو إيه آي and آي بي إم واتسونكس للحوكمة are built to answer whether an AI system is tested, monitored and compliant, and both describe themselves that way. MIZAN does not compete with that layer. It starts from its output and asks whether the institution is currently entitled to rely on it for one specific use.",
    "تُبنى منصات حوكمة الذكاء الاصطناعي مثل كريدو إيه آي و آي بي إم واتسونكس للحوكمة للإجابة عما إذا كان نظام الذكاء الاصطناعي مختبراً ومراقباً ومتوافقاً، وكلاهما يصف نفسه بهذه الطريقة. لا ينافس ميزان تلك الطبقة، بل يبدأ من مخرجاتها ويسأل هل يحق للمؤسسة حالياً الاعتماد عليها لاستخدام محدد واحد."
  ],
  [
    "What they say about themselves",
    "ما يقولونه عن أنفسهم"
  ],
  [
    "What they track",
    "ما يتتبعونه"
  ],
  [
    "The question they answer",
    "السؤال الذي يجيبون عنه"
  ],
  [
    "The AI system, agent, model and vendor",
    "نظام الذكاء الاصطناعي والوكيل والنموذج والمورد"
  ],
  [
    "Is this AI trustworthy and under policy control?",
    "هل هذا الذكاء الاصطناعي موثوق وخاضع للسياسات؟"
  ],
  [
    "The AI use case, across its lifecycle",
    "حالة استخدام الذكاء الاصطناعي عبر دورة حياتها"
  ],
  [
    "Is this AI documented, monitored and compliant?",
    "هل هذا الذكاء الاصطناعي موثق ومراقب ومتوافق؟"
  ],
  [
    "The institution's permission to use it, for this specific case",
    "إذن المؤسسة لاستخدامه في هذه الحالة المحددة"
  ],
  [
    "Is this institution entitled, right now, to let this AI act?",
    "هل يحق لهذه المؤسسة الآن أن تسمح لهذا الذكاء الاصطناعي بالعمل؟"
  ],
  [
    "Quoted from each platform's own public homepage or product page, fetched 30 September 2026. Shown for factual comparison only, not as a ranking. MIZAN is designed to complement AI governance and assurance tools, not replace them.",
    "مقتبس من الصفحة العامة أو صفحة المنتج الخاصة بكل منصة، وتم الاطلاع عليه في ٣٠ سبتمبر ٢٠٢٦. يعرض للمقارنة الواقعية فقط وليس كترتيب. صُمم ميزان ليكمل أدوات حوكمة وضمان الذكاء الاصطناعي، لا ليحل محلها."
  ],
  [
    "How the record is assembled",
    "كيف يُجمع السجل"
  ],
  [
    "Evidence and approval flow into one maintained record",
    "تتدفق الأدلة والموافقة إلى سجل واحد محفوظ"
  ],
  [
    "Policy",
    "السياسة"
  ],
  [
    "Applicable rules, public purpose and operating constraints.",
    "القواعد المطبقة والغرض العام والقيود التشغيلية."
  ],
  [
    "Capability",
    "القدرة"
  ],
  [
    "Institutional readiness, people, supervision and escalation.",
    "الجاهزية المؤسسية والأشخاص والإشراف والتصعيد."
  ],
  [
    "System assurance",
    "ضمان النظام"
  ],
  [
    "Tests, privacy, security and operational evidence.",
    "الاختبارات والخصوصية والأمن والأدلة التشغيلية."
  ],
  [
    "Authorisation",
    "التصريح"
  ],
  [
    "Named decision, conditions and review date.",
    "قرار مسمى وشروط وتاريخ مراجعة."
  ],
  [
    "Privacy notice",
    "إشعار الخصوصية"
  ],
  [
    "We use enquiry details to respond to messages sent through this website. Please do not include sensitive personal data or confidential case information in the form.",
    "نستخدم تفاصيل الاستفسار للرد على الرسائل المرسلة عبر هذا الموقع. يرجى عدم تضمين بيانات شخصية حساسة أو معلومات حالة سرية في النموذج."
  ],
  [
    "Enquiries",
    "الاستفسارات"
  ],
  [
    "If you contact MIZAN, the information you provide may be reviewed by the أروِنكس team so they can respond. Formal pilot or customer terms should be agreed separately before confidential information is shared.",
    "إذا تواصلت مع ميزان، فقد يراجع فريق أروِنكس المعلومات التي تقدمها حتى يتمكن من الرد. يجب الاتفاق بشكل منفصل على شروط التجربة الرسمية أو شروط العميل قبل مشاركة أي معلومات سرية."
  ],
  [
    "For privacy questions, contact the team through the enquiry form.",
    "لأسئلة الخصوصية، تواصل مع الفريق من خلال نموذج الاستفسار."
  ],
  [
    "A practical method for evidence-backed AI decisions",
    "منهج عملي لقرارات ذكاء اصطناعي مدعومة بالأدلة"
  ],
  [
    "Our research asks how institutions can connect AI evidence to a clear human decision, sustain supervision, and recognise when an approval needs review. The method is being developed and tested against specific institutional use cases.",
    "يسأل بحثنا كيف يمكن للمؤسسات ربط أدلة الذكاء الاصطناعي بقرار بشري واضح، والحفاظ على الإشراف، ومعرفة متى تحتاج الموافقة إلى مراجعة. يتم تطوير المنهج واختباره على حالات استخدام مؤسسية محددة."
  ],
  [
    "Initial notes",
    "ملاحظات أولية"
  ],
  [
    "Three method notes for early readers",
    "ثلاث ملاحظات منهجية للقراء الأوائل"
  ],
  [
    "What an AI approval record should contain",
    "ماذا يجب أن يتضمن سجل موافقة الذكاء الاصطناعي"
  ],
  [
    "Author: MIZAN research team. Date: 1 October 2026. Distinguishes proposed record fields from findings still being tested.",
    "المؤلف: فريق بحث ميزان. التاريخ: ١ أكتوبر ٢٠٢٦. يميز بين حقول السجل المقترحة والنتائج التي لا تزال قيد الاختبار."
  ],
  [
    "When an approval needs review",
    "متى تحتاج الموافقة إلى مراجعة"
  ],
  [
    "Author: MIZAN research team. Date: 1 October 2026. Sets out change triggers such as new permissions, model changes and complaints.",
    "المؤلف: فريق بحث ميزان. التاريخ: ١ أكتوبر ٢٠٢٦. يحدد محفزات التغيير مثل الصلاحيات الجديدة وتغييرات النموذج والشكاوى."
  ],
  [
    "How to test institutional capability for one AI use",
    "كيفية اختبار القدرة المؤسسية لاستخدام واحد للذكاء الاصطناعي"
  ],
  [
    "Author: MIZAN research team. Date: 1 October 2026. Frames capability as use-specific evidence, not a maturity score.",
    "المؤلف: فريق بحث ميزان. التاريخ: ١ أكتوبر ٢٠٢٦. يؤطر القدرة كأدلة خاصة بالاستخدام، لا كدرجة نضج."
  ],
  [
    "What the evidence says",
    "ماذا تقول الأدلة"
  ],
  [
    "Public guidance converges on named accountability, bounded permissions and review",
    "تتقارب الإرشادات العامة حول المساءلة المسماة والصلاحيات المحددة والمراجعة"
  ],
  [
    "Public bodies researching AI governance, among them the World Bank, the OECD, the UK government and Canada's federal AI guidance, converge on the same requirements: named accountability, bounded permissions, ongoing monitoring, and the ability to pause or withdraw an AI use. MIZAN's method is designed around that convergence.",
    "تتقارب الجهات العامة التي تبحث حوكمة الذكاء الاصطناعي، ومنها البنك الدولي ومنظمة التعاون الاقتصادي والتنمية والحكومة البريطانية والإرشادات الفيدرالية الكندية للذكاء الاصطناعي، حول المتطلبات نفسها: مساءلة مسماة، وصلاحيات محددة، ومراقبة مستمرة، والقدرة على إيقاف أو سحب استخدام الذكاء الاصطناعي. صُمم منهج ميزان حول هذا التقارب."
  ],
  [
    "Cited for context only; no endorsement, certification or formal partnership is implied.",
    "يُستشهد به للسياق فقط؛ ولا يعني ذلك تأييداً أو اعتماداً أو شراكة رسمية."
  ],
  [
    "A manually maintained, reverse-chronological editorial log of developments in institutional and agentic AI assurance. This is not a live feed and no endorsement is implied.",
    "سجل تحريري يُحدث يدوياً وبترتيب زمني عكسي لتطورات ضمان الذكاء الاصطناعي المؤسسي والوكيل. ليس بثاً مباشراً ولا يعني أي تأييد."
  ],
  [
    "OECD, Governing with Agentic AI in Government",
    "منظمة التعاون الاقتصادي والتنمية، الحوكمة باستخدام الذكاء الاصطناعي الوكيل في الحكومة"
  ],
  [
    "Argues that governance cannot rely only on broad principles or after-the-fact review alone, and documents real public-sector approaches to authorising agentic AI.",
    "يرى أن الحوكمة لا يمكن أن تعتمد فقط على مبادئ عامة أو مراجعة لاحقة، ويوثق مناهج حقيقية في القطاع العام لتصريح الذكاء الاصطناعي الوكيل."
  ],
  [
    "What it means for MIZAN:",
    "ما يعنيه ذلك لميزان:"
  ],
  [
    "Supports continuous, built-in authorisation rather than a one-off sign-off.",
    "يدعم التصريح المستمر المدمج بدلاً من توقيع موافقة لمرة واحدة."
  ],
  [
    "Primary source",
    "المصدر الأساسي"
  ],
  [
    "Canada, Guide on the Use of Agentic Artificial Intelligence",
    "كندا، دليل استخدام الذكاء الاصطناعي الوكيل"
  ],
  [
    "Requires bounded autonomy, designated accountable owners, logging and recoverability, and names automation drift as a risk to monitor.",
    "يتطلب استقلالية محددة، ومالكين مسؤولين محددين، وتسجيل الأحداث، وقابلية الاسترداد، ويسمي انحراف الأتمتة خطراً يجب مراقبته."
  ],
  [
    "Close correspondence to MIZAN's boundary and named-holder design.",
    "تطابق قريب مع تصميم الحدود والمسؤول المسمى في ميزان."
  ],
  [
    "UK, Digital Assurance Playbook and Algorithmic Transparency Recording Standard",
    "المملكة المتحدة، دليل الضمان الرقمي ومعيار تسجيل الشفافية الخوارزمية"
  ],
  [
    "Moves departmental digital and AI assurance toward owned, published records.",
    "ينقل الضمان الرقمي وضمان الذكاء الاصطناعي في الجهات الحكومية نحو سجلات مملوكة ومنشورة."
  ],
  [
    "MIZAN is designed to reuse سجلات الشفافية الخوارزمية-style records as evidence, not duplicate them.",
    "صُمم ميزان لإعادة استخدام سجلات على نمط سجلات الشفافية الخوارزمية كأدلة، لا لتكرارها."
  ],
  [
    "Digital Assurance Playbook",
    "دليل الضمان الرقمي"
  ],
  [
    "سجلات الشفافية الخوارزمية guidance",
    "إرشادات سجلات الشفافية الخوارزمية"
  ],
  [
    "الجمعية البريطانية للحاسوب-led AI assurance consortium",
    "اتحاد ضمان الذكاء الاصطناعي بقيادة الجمعية البريطانية للحاسوب"
  ],
  [
    "A UK government-convened programme on professional competence, ethics and information access for AI assurance.",
    "برنامج دعت إليه حكومة المملكة المتحدة حول الكفاءة المهنية والأخلاقيات والوصول إلى المعلومات لضمان الذكاء الاصطناعي."
  ],
  [
    "Relevant to معتمد's question of reviewer and supervisor competence.",
    "مرتبط بسؤال معتمد حول كفاءة المراجعين والمشرفين."
  ],
  [
    "المختبر الفيزيائي الوطني, Call for Evidence on AI testing, evaluation and assurance",
    "المختبر الفيزيائي الوطني، دعوة لتقديم الأدلة حول اختبار الذكاء الاصطناعي وتقييمه وضمانه"
  ],
  [
    "A measurement-focused programme for AI testing, evaluation and assurance in the UK.",
    "برنامج يركز على القياس لاختبار الذكاء الاصطناعي وتقييمه وضمانه في المملكة المتحدة."
  ],
  [
    "Relevant to evidence quality, not to institutional authorisation directly.",
    "مرتبط بجودة الأدلة، وليس بالتصريح المؤسسي مباشرة."
  ],
  [
    "Research attribution",
    "نسبة البحث"
  ],
  [
    "Research context is not product endorsement",
    "السياق البحثي ليس تأييداً للمنتج"
  ],
  [
    "The founder's يو سي إل research can inform the product thesis. Public guidance from the World Bank, OECD, UK and Canada can inform requirements. Neither constitutes product endorsement. الجمعية البريطانية للحاسوب and المختبر الفيزيائي الوطني pathways need precise, dated descriptions of their actual status before use.",
    "يمكن لأبحاث المؤسس في يو سي إل أن تسهم في أطروحة المنتج. ويمكن للإرشادات العامة من البنك الدولي ومنظمة التعاون الاقتصادي والتنمية والمملكة المتحدة وكندا أن تسهم في المتطلبات. ولا يشكل أي منهما تأييداً للمنتج. وتحتاج مسارات الجمعية البريطانية للحاسوب والمختبر الفيزيائي الوطني إلى أوصاف دقيقة ومؤرخة لحالتها الفعلية قبل استخدامها."
  ],
  [
    "This website explains a product and method currently in development. Illustrative examples are not live deployments, legal advice or final product interfaces.",
    "يشرح هذا الموقع منتجاً ومنهجاً قيد التطوير حالياً. والأمثلة التوضيحية ليست تطبيقات حية ولا مشورة قانونية ولا واجهات نهائية للمنتج."
  ],
  [
    "Use of content",
    "استخدام المحتوى"
  ],
  [
    "Public pages are provided for general information and discussion. Formal pilot scope, responsibilities, confidentiality and data handling should be agreed in writing before work begins.",
    "تُقدم الصفحات العامة للمعلومات العامة والنقاش. ويجب الاتفاق كتابة على نطاق التجربة الرسمية والمسؤوليات والسرية ومعالجة البيانات قبل بدء العمل."
  ],
  [
    "AI assurance where responsibility matters",
    "ضمان الذكاء الاصطناعي حيث تكون المسؤولية مهمة"
  ],
  [
    "MIZAN is designed for institutions that need a clear basis for AI approval, human supervision and review. Our initial focus is public services and education, with potential applications across regulated sectors.",
    "صُمم ميزان للمؤسسات التي تحتاج إلى أساس واضح للموافقة على الذكاء الاصطناعي، وإشراف بشري، ومراجعة. ينصب تركيزنا الأولي على الخدمات العامة والتعليم، مع تطبيقات محتملة عبر القطاعات المنظمة."
  ],
  [
    "Government and public services",
    "الحكومة والخدمات العامة"
  ],
  [
    "Resident-facing service assistant",
    "مساعد خدمة موجه للسكان"
  ],
  [
    "The assistant explains published requirements and routes cases to staff. The institution defines its permitted actions, information sources and escalation rules. Final eligibility decisions remain with authorised officers.",
    "يشرح المساعد المتطلبات المنشورة ويوجه الحالات إلى الموظفين. وتحدد المؤسسة إجراءاته المسموحة ومصادر المعلومات وقواعد التصعيد. وتبقى قرارات الأهلية النهائية لدى الموظفين المخولين."
  ],
  [
    "Evidence to consider: service policy, privacy and security review, accessibility testing, answer quality, supervision and complaints handling.",
    "أدلة يجب النظر فيها: سياسة الخدمة، ومراجعة الخصوصية والأمن، واختبار الوصول، وجودة الإجابات، والإشراف، ومعالجة الشكاوى."
  ],
  [
    "Student support assistant",
    "مساعد دعم الطلاب"
  ],
  [
    "The assistant answers routine questions using approved institutional information. Staff handle ambiguous questions and consequential decisions. The institution records what the assistant may do and when review is needed.",
    "يجيب المساعد عن الأسئلة الروتينية باستخدام معلومات مؤسسية معتمدة. ويتولى الموظفون الأسئلة الملتبسة والقرارات ذات الأثر. وتوثق المؤسسة ما يجوز للمساعد فعله ومتى تكون المراجعة مطلوبة."
  ],
  [
    "Evidence to consider: source accuracy, student data protections, accessibility, staff readiness and escalation arrangements.",
    "أدلة يجب النظر فيها: دقة المصادر، وحماية بيانات الطلاب، وإمكانية الوصول، وجاهزية الموظفين، وترتيبات التصعيد."
  ],
  [
    "Potential wider applications",
    "تطبيقات أوسع محتملة"
  ],
  [
    "Illustrative applications beyond the initial focus",
    "تطبيقات توضيحية خارج نطاق التركيز الأولي"
  ],
  [
    "Regulated services.",
    "الخدمات المنظمة."
  ],
  [
    "Document support and internal assistants with defined access, review and approval responsibilities.",
    "دعم المستندات والمساعدون الداخليون مع وصول محدد ومسؤوليات مراجعة وموافقة واضحة."
  ],
  [
    "Health and social systems.",
    "الأنظمة الصحية والاجتماعية."
  ],
  [
    "Administrative support with clear data limits and escalation. Clinical use requires additional specialist assurance.",
    "دعم إداري مع حدود بيانات وتصعيد واضحين. ويتطلب الاستخدام السريري ضماناً متخصصاً إضافياً."
  ],
  [
    "Critical infrastructure.",
    "البنية التحتية الحيوية."
  ],
  [
    "Operational support with defined safety boundaries and human intervention.",
    "دعم تشغيلي مع حدود سلامة وتدخل بشري محددين."
  ],
  [
    "Vendors and integrators.",
    "الموردون والمتكاملون."
  ],
  [
    "Organise evidence for an institution's review of a proposed AI use.",
    "تنظيم الأدلة لمراجعة المؤسسة لاستخدام مقترح للذكاء الاصطناعي."
  ],
  [
    "These are illustrative applications, not customer case studies or live deployments.",
    "هذه تطبيقات توضيحية وليست دراسات حالة لعملاء أو تطبيقات حية."
  ],
  [
    "Discuss a use case",
    "ناقش حالة استخدام"
  ],
  [
    "Institutional capability",
    "القدرة المؤسسية"
  ],
  [
    "Qudra examines whether the organisation has the mandate, people, processes and supervision needed for this AI use.",
    "تفحص قدرة ما إذا كانت المؤسسة تملك التفويض والأشخاص والعمليات والإشراف اللازم لهذا الاستخدام للذكاء الاصطناعي."
  ],
  [
    "Mandate, people, process, data controls, supervision, transparency, contestability and monitoring are treated as evidence for one approval case.",
    "يُعامل التفويض والأشخاص والعمليات وضوابط البيانات والإشراف والشفافية وقابلية الاعتراض والمراقبة كأدلة لحالة موافقة واحدة."
  ],
  [
    "Name",
    "الاسم"
  ],
  [
    "Organisation",
    "المؤسسة"
  ],
  [
    "Work email",
    "البريد الإلكتروني للعمل"
  ],
  [
    "Area of interest",
    "مجال الاهتمام"
  ],
  [
    "Sector",
    "القطاع"
  ],
  [
    "What would you like to discuss?",
    "ما الذي ترغب في مناقشته؟"
  ],
  [
    "Send enquiry",
    "إرسال الاستفسار"
  ],
  [
    "FAQ",
    "الأسئلة الشائعة"
  ],
  [
    "P",
    "١"
  ],
  [
    "D",
    "٢"
  ],
  [
    "C",
    "٣"
  ]
];
arabicExtraPairs.forEach(([key, value]) => translations.set(key, value));

[
  ["Tariq Makadi", "طارق مكادي"],
  ["Sujit Kumar", "سوجيت كومار"],
  ["Qudra", "قدرة"],
  ["معتمد", "معتمد"],
  ["Isnad", "إسناد"],
  ["Misbar", "مسبار"],
  ["يو سي إل IIPP", "معهد الابتكار والغرض العام في يو سي إل"],
  ["آي بي إم واتسونكس للحوكمة", "آي بي إم واتسونكس للحوكمة"]
].forEach(([key, value]) => translations.set(key, value));


[
  ["AI for Public Purpose Lab", "مختبر الذكاء الاصطناعي للغرض العام"],
  ["Education", "التعليم"],
  ["Supporting instrument", "أداة داعمة"],
  ["Assurance Watch", "مرصد الضمان"],
  ["25 Sep 2026", "25 سبتمبر 2026"],
  ["15 Sep 2026", "15 سبتمبر 2026"],
  ["1 Apr 2026", "1 أبريل 2026"],
  ["1 Sep 2026", "1 سبتمبر 2026"],
  ["\"AI Governance, Built for the Agentic Era\" and \"Measurable Trust for Every AI System\"", "\"حوكمة الذكاء الاصطناعي لعصر الوكلاء\" و\"ثقة قابلة للقياس لكل نظام ذكاء اصطناعي\""],
  ["\"Govern smarter. Scale faster.\" and \"Continuous accountability\"", "\"حوكمة أذكى وتوسع أسرع\" و\"مساءلة مستمرة\""],
  ["\"Clear, accountable decisions about AI use\"", "\"قرارات واضحة وخاضعة للمساءلة بشأن استخدام الذكاء الاصطناعي\""],
  ["MIZAN helps institutions connect AI evidence to accountable human decisions. It is being developed by the AI for Public Purpose Lab at أروِنكس.", "يساعد ميزان المؤسسات على ربط أدلة الذكاء الاصطناعي بقرارات بشرية مسؤولة. يتم تطويره من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس."],
  ["AI governance platforms such as كريدو إيه آي and آي بي إم واتسونكس للحوكمة are built to answer whether an AI system is tested, monitored and compliant, and both describe themselves in those terms. MIZAN does not compete with that layer. It starts from those outputs and asks whether the institution is currently authorised to rely on them for one defined use.", "تُبنى منصات حوكمة الذكاء الاصطناعي مثل كريدو إيه آي و آي بي إم واتسونكس للحوكمة للإجابة عما إذا كان نظام الذكاء الاصطناعي مختبراً ومراقباً ومتوافقاً، وكلاهما يصف نفسه بهذه الطريقة. لا ينافس ميزان تلك الطبقة، بل يبدأ من مخرجاتها ويسأل هل يحق للمؤسسة حالياً الاعتماد عليها لاستخدام محدد واحد."],
  ["Co-founder and implementation lead at أروِنكس.", "شريك مؤسس وقائد التنفيذ في أروِنكس."],
  ["Any wording about the IIPI relationship should be confirmed before using stronger public phrasing. This does not imply endorsement, sponsorship or institutional partnership.", "يجب تأكيد أي صياغة تتعلق بعلاقة معهد الابتكار والغرض العام قبل استخدام صياغة عامة أقوى. ولا يُفهم من ذلك وجود تأييد أو دعم أو شراكة مؤسسية."]
].forEach(([key, value]) => translations.set(key, value));




[
  ["MIZAN helps institutions connect AI evidence to accountable human decisions. Developed through the AI for Public Purpose Lab at Arrownex.", "يساعد ميزان المؤسسات على ربط أدلة الذكاء الاصطناعي بقرارات بشرية مسؤولة. يتم تطويره من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس."],
  ["MIZAN helps institutions connect AI evidence to accountable human decisions. It is being developed by the AI for Public Purpose Lab at Arrownex.", "يساعد ميزان المؤسسات على ربط أدلة الذكاء الاصطناعي بقرارات بشرية مسؤولة. يتم تطويره من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس."],
  ["MIZAN is being developed through Arrownex's AI for Public Purpose Lab in the UAE. The Lab brings applied research and institutional assurance into practical AI delivery for government and regulated organisations.", "يتم تطوير ميزان من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس في دولة الإمارات. يجمع المختبر بين البحث التطبيقي والضمان المؤسسي والتنفيذ العملي للذكاء الاصطناعي للحكومة والجهات المنظمة."],
  ["A practical method for evidence-backed AI decisions", "منهج عملي لقرارات الذكاء الاصطناعي المدعومة بالأدلة"],
  ["Our research asks how institutions can connect AI evidence to a clear human decision, sustain supervision, and recognise when an approval needs review. The method is being developed and tested against specific institutional use cases.", "يسأل بحثنا كيف يمكن للمؤسسات ربط أدلة الذكاء الاصطناعي بقرار بشري واضح، والحفاظ على الإشراف، ومعرفة متى تحتاج الموافقة إلى مراجعة. ويتم تطوير المنهج واختباره على حالات استخدام مؤسسية محددة."],
  ["Connecting AI delivery with institutional responsibility", "ربط تنفيذ الذكاء الاصطناعي بالمسؤولية المؤسسية"],
  ["Named leadership behind MIZAN", "القيادة المسماة وراء ميزان"],
  ["People", "الأشخاص"],
  ["Initial notes", "ملاحظات أولية"],
  ["Three method notes for early readers", "ثلاث ملاحظات منهجية للقراء الأوائل"],
  ["Tariq Makadi", "طارق مكادي"],
  ["Sujit Kumar", "سوجيت كومار"]
].forEach(([key, value]) => translations.set(key, value));



[
  ["MIZAN is being developed through Arrownex's AI for Public Purpose Lab in the UAE. The work combines institutional governance, privacy and public policy expertise with engineering and security delivery.", 'يتم تطوير ميزان من خلال مختبر الذكاء الاصطناعي للغرض العام في أروِنكس في دولة الإمارات. يجمع العمل بين خبرة الحوكمة المؤسسية والخصوصية والسياسة العامة والتنفيذ الهندسي والأمني.'],
  ['Arrownex', 'أروِنكس'],
  ['UCL IIPP', 'معهد الابتكار والغرض العام في يو سي إل'],
  ['AI governance platforms such as Credo AI and IBM watsonx.governance are built to answer whether an AI system is tested, monitored and compliant, and both describe themselves that way. MIZAN does not compete with that layer. It starts from its output and asks whether the institution is currently entitled to rely on it for one specific use.', 'تُبنى منصات حوكمة الذكاء الاصطناعي مثل كريدو إيه آي وآي بي إم واتسونكس للحوكمة للإجابة عما إذا كان نظام الذكاء الاصطناعي مختبراً ومراقباً ومتوافقاً، وكلاهما يصف نفسه بهذه الطريقة. لا ينافس ميزان تلك الطبقة، بل يبدأ من مخرجاتها ويسأل هل يحق للمؤسسة حالياً الاعتماد عليها لاستخدام محدد واحد.'],
  ['MIZAN is designed to reuse ATRS-style records as evidence, not duplicate them.', 'صُمم ميزان لإعادة استخدام سجلات على نمط سجلات الشفافية الخوارزمية كأدلة، لا لتكرارها.'],
  ['ATRS guidance', 'إرشادات سجلات الشفافية الخوارزمية'],
  ['BCS-led AI assurance consortium', 'اتحاد ضمان الذكاء الاصطناعي بقيادة الجمعية البريطانية للحاسوب'],
  ["Relevant to Mu'tamad's question of reviewer and supervisor competence.", 'مرتبط بسؤال معتمد حول كفاءة المراجعين والمشرفين.'],
  ['NPL, Call for Evidence on AI testing, evaluation and assurance', 'المختبر الفيزيائي الوطني: دعوة لتقديم الأدلة حول اختبار الذكاء الاصطناعي وتقييمه وضمانه'],
  ["The founder's UCL research can inform the product thesis. Public guidance from the World Bank, OECD, UK and Canada can inform requirements. Neither constitutes product endorsement. BCS and NPL pathways need precise, dated descriptions of their actual status before use.", 'يمكن لأبحاث المؤسس في يو سي إل أن تسهم في أطروحة المنتج. ويمكن للإرشادات العامة من البنك الدولي ومنظمة التعاون الاقتصادي والتنمية والمملكة المتحدة وكندا أن تسهم في المتطلبات. ولا يشكل أي منهما تأييداً للمنتج. وتحتاج مسارات الجمعية البريطانية للحاسوب والمختبر الفيزيائي الوطني إلى أوصاف دقيقة ومؤرخة لحالتها الفعلية قبل استخدامها.'],
  ["Brings experience in privacy, AI governance and digital public infrastructure to MIZAN's design. As a doctoral researcher at UCL's Institute for Innovation and Public Purpose, he researches the relationship between digital infrastructure, institutions and legitimacy.", 'يجلب خبرة في الخصوصية وحوكمة الذكاء الاصطناعي والبنية التحتية الرقمية العامة إلى تصميم ميزان. وبصفته باحث دكتوراه في معهد الابتكار والغرض العام في يو سي إل، يبحث العلاقة بين البنية التحتية الرقمية والمؤسسات والمشروعية.'],
  ['Co-founder and Arrownex delivery lead.', 'شريك مؤسس وقائد التنفيذ في أروِنكس.'],
  ["Leads Arrownex's technology delivery, partnerships and customer relationships, connecting the venture to engineering and operational capability.", 'يقود تنفيذ التقنية والشراكات وعلاقات العملاء في أروِنكس، ويربط المشروع بالقدرة الهندسية والتشغيلية.'],
  ['Arrownex, the Lab and institutional responsibility', 'أروِنكس والمختبر والمسؤولية المؤسسية'],
  ['Arrownex provides the operating and delivery platform. The AI for Public Purpose Lab develops and tests the methods and product proposition. The institution using MIZAN keeps responsibility for its AI approval decisions.', 'توفر أروِنكس منصة التشغيل والتنفيذ. ويطور مختبر الذكاء الاصطناعي للغرض العام المنهجيات وطرح المنتج ويختبرهما. وتبقى المؤسسة التي تستخدم ميزان مسؤولة عن قرارات الموافقة على استخدام الذكاء الاصطناعي.'],
  ["Mu'tamad", 'معتمد'],
  ["Mu'tamad defines and assesses the knowledge and skills required of named reviewers and supervisors. It is not described as issuing credentials unless a defined public scheme exists.", 'يحدد معتمد المعرفة والمهارات المطلوبة من المراجعين والمشرفين المسمين ويقيّمها. ولا يوصف بأنه يصدر اعتمادات ما لم يوجد نظام عام محدد.'],
  ['If you contact MIZAN, the information you provide may be reviewed by the Arrownex team so they can respond. Formal pilot or customer terms should be agreed separately before confidential information is shared.', 'إذا تواصلت مع ميزان، فقد يراجع فريق أروِنكس المعلومات التي تقدمها حتى يتمكن من الرد. يجب الاتفاق بشكل منفصل على شروط التجربة الرسمية أو شروط العميل قبل مشاركة أي معلومات سرية.']
].forEach(([key, value]) => translations.set(key, value));



[
  ["Credo AI", "كريدو إيه آي"],
  ["IBM watsonx.governance", "آي بي إم واتسونكس للحوكمة"]
].forEach(([key, value]) => translations.set(key, value));

const translatedTitles = new Map([
  ["MIZAN | Clear, Accountable Decisions About AI Use", "ميزان | قرارات واضحة ومسؤولة لاستخدام الذكاء الاصطناعي"],
  ["Platform | MIZAN", "المنصة | ميزان"],
  ["How It Works | MIZAN", "كيف يعمل | ميزان"],
  ["Use Cases | MIZAN", "حالات الاستخدام | ميزان"],
  ["Research and Method | MIZAN", "البحث والمنهج | ميزان"],
  ["About | MIZAN", "من نحن | ميزان"],
  ["Contact | MIZAN", "تواصل معنا | ميزان"],
  ["Qudra | MIZAN", "قدرة | ميزان"],
  ["معتمد | MIZAN", "معتمد | ميزان"],
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
    ".workflow li",
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

  document.querySelectorAll(".card, .note-card, .record-card, .instrument-card, .handoff-box, .workflow li, .architecture-flow article").forEach((card) => {
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
