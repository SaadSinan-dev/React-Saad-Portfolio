// ─── Personal ─────────────────────────────────────────────────────────────────

export const personalInfo = {
  nameEn: 'Saad Sinan',
  nameAr: 'سعد سنان',
  titleEn: 'Flutter Developer',
  titleAr: 'مطور تطبيقات Flutter',
  roleEn: 'Software Engineering',
  roleAr: 'طالب هندسة برمجيات',
  taglineEn: 'Crafting Pixel-Perfect Mobile Experiences',
  taglineAr: 'صانع تجارب موبايل استثنائية',
  bioEn:
    'Dedicated Flutter developer and Software Engineering crafting elegant mobile experiences. Committed to writing clean, maintainable code and delivering seamless user interfaces.',
  bioAr:
    'مطور Flutter وطالب هندسة برمجيات، مكرس لبناء تجارب موبايل أنيقة. ألتزم بكتابة كود نظيف وقابل للصيانة مع تقديم واجهات مستخدم سلسة واحترافية.',
  email: 'saadsinanbusiness@gmail.com',
  whatsapp: '+963 980 562 304',
  github: 'https://github.com/SaadSinan-dev',
  linkedin: 'https://www.linkedin.com/in/saad-sinan-a34557374/',
  location: 'Damascus, Syria',
  locationAr: 'دمشق، سوريا',
  availableEn: 'Available for freelance',
  availableAr: 'متاح للعمل الحر',
};

/**
 * The facts panel in the hero — read as a spec plate, one line per row.
 * Every value here is stated elsewhere in this file; nothing is derived.
 */
export const heroFacts = [
  { keyEn: 'Role', keyAr: 'المجال', valueEn: 'Flutter Developer', valueAr: 'مطور Flutter' },
  {
    keyEn: 'Studying',
    keyAr: 'الدراسة',
    valueEn: 'Software Engineering',
    valueAr: 'هندسة برمجيات',
  },
  { keyEn: 'Based in', keyAr: 'المقر', valueEn: 'Damascus, Syria', valueAr: 'دمشق، سوريا' },
  { keyEn: 'Platform', keyAr: 'المنصات', valueEn: 'iOS · Android · Web', valueAr: 'iOS · Android · ويب' },
];

/**
 * Working principles shown in About. These are the developer's own statements,
 * carried over from the previous build unchanged.
 */
export const principles = [
  {
    en: 'Fast learner with a real project mindset',
    ar: 'متعلم سريع بعقلية مشاريع حقيقية',
  },
  {
    en: 'Modern UI/UX — pixel-perfect execution',
    ar: 'تركيز على واجهات حديثة وتصميم دقيق',
  },
  {
    en: 'Clean architecture & scalable code structure',
    ar: 'بنية برمجية نظيفة وهيكل كود قابل للتوسع',
  },
  {
    en: 'Firebase & REST API integration',
    ar: 'تكامل مع Firebase و REST APIs',
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
//
// `imageKeys` resolve to files in src/assets/projects/ through the registry in
// components/work/assets.js. `features` and `focus` are drawn from each
// project's own description — no metrics, outcomes or claims have been added.

export const projects = [
  {
  id: 1,
  index: '01',
  titleEn: 'Mashwarak',
  titleAr: 'مشوارك',

  descShortEn:
      'An Arabic-first ride-hailing platform for Syria: one Flutter binary containing both the rider and the driver application, backed by a Supabase/PostgreSQL schema that owns the trip lifecycle, the pricing and the commission split instead of trusting the client with them.',

  descShortAr:
      'منصة عربية لحجز الرحلات مصممة لسوريا: تطبيق Flutter واحد يضم تجربتي الراكب والسائق، تعتمد على قاعدة بيانات Supabase/PostgreSQL تتولى دورة حياة الرحلة والتسعير واحتساب العمولة داخل الخادم بدلاً من ترك ذلك للتطبيق.',

  descLongEn:
      'Mashwarak is a two-sided ride-hailing product: one Flutter binary containing a full rider application and a full driver application, with a Supabase/PostgreSQL backend where the trip state machine, the fare calculation, the commission split and the driver-eligibility rules are implemented in the database rather than in the client. The client has no write authority over trips at all. Every state transition goes through a SECURITY DEFINER RPC that takes a row lock, decides the outcome itself and returns a result code the app maps onto a typed enum, which is what makes a duplicate tap or a retry after a dropped response safe. I built both applications and the backend: 14 features on feature-first Clean Architecture with BLoC and get_it, 24 documented migrations, 103 Postgres functions and 63 RLS policies, live trip tracking over Supabase Realtime, PostGIS proximity matching, road routing through Google Routes API v2, push delivery through a Deno Edge Function and FCM, and an Arabic-template localisation layer with native RTL. The suite runs 1,293 passing unit and widget tests with zero analyzer issues.',

  descLongAr:
      'مشوارك منتج نقل ثنائي الجانب: تطبيق Flutter واحد يحتوي على تطبيق كامل للراكب وآخر كامل للسائق، مع خلفية Supabase/PostgreSQL يُنفَّذ داخلها مخطط حالات الرحلة وحساب الأجرة وتقسيم العمولة وشروط أهلية السائق، لا داخل التطبيق. لا يملك التطبيق أي صلاحية كتابة على جدول الرحلات، وكل انتقال حالة يمر عبر دالة SECURITY DEFINER تأخذ قفلاً على السطر وتقرر النتيجة بنفسها وتعيد رمز نتيجة يحوّله التطبيق إلى نوع محدد، وهو ما يجعل الضغط المزدوج أو إعادة المحاولة بعد انقطاع الاستجابة عملية آمنة. بنيتُ التطبيقين والخلفية معاً: 14 ميزة وفق Clean Architecture منظمة حسب الميزات مع BLoC وget_it، و24 ملف ترحيل موثقاً، و103 دوال في Postgres، و63 سياسة RLS، وتتبعاً حياً للرحلة عبر Supabase Realtime، ومطابقة قرب جغرافي عبر PostGIS، ورسم مسارات طرق عبر Google Routes API v2، وإشعارات عبر Edge Function بلغة Deno وFCM، وطبقة تعريب أساسها العربية مع دعم RTL أصيل. تعمل مجموعة الاختبارات بـ 1,293 اختباراً ناجحاً دون أي ملاحظة من محلل الشيفرة.',

  highlightsEn: [
    {
      title: 'The trip lifecycle belongs to the server',
      text: 'Signed-in clients hold SELECT on trips and nothing else. Every transition is a SECURITY DEFINER RPC that takes a row lock, decides the outcome and returns a machine-readable result code, and the state machine is written once in SQL and enforced by a guard trigger.',
    },
    {
      title: 'Concurrency treated as the default case',
      text: 'Two drivers accepting the same request are serialised by SELECT ... FOR UPDATE, and the RPC distinguishes ALREADY_YOURS from ALREADY_ACCEPTED. Idempotent codes are treated as success, so a double tap or a retry after a dropped response is safe. This replaced an implementation that inferred the outcome from an update row count, where zero rows had six possible causes.',
    },
    {
      title: 'Server-side pricing with immutable history',
      text: 'The rider app never sends a price. The backend computes the fare and snapshots the rate card onto the trip row, completion recomputes from that snapshot, and triggers make the completed financials and the commission split immutable, so a later price change cannot restate past trips.',
    },
    {
      title: 'Security where RLS structurally cannot reach',
      text: '63 RLS policies control row access, and trigger-based guards cover what policies cannot: verification status, wallet balance, rating and trip counts refuse client-side writes by testing current_user. Identity documents live in a private bucket under a per-profile path contract, with an insert trigger that verifies each referenced object exists and belongs to the applicant.',
    },
    {
      title: 'Realtime and location engineering',
      text: 'One Realtime subscription for the active trip and one keyed driver-location subscription, with a terminal trip surfaced exactly once. Driver positions come from a distance-filtered stream rate-limited to one write per 8 seconds, matching runs on PostGIS ST_DWithin, and road routes come from Google Routes API v2 behind a shared cache with a re-fetch threshold and a failure cooldown that draws nothing rather than a fabricated line.',
    },
    {
      title: 'Typed failures and Arabic-first localisation',
      text: 'Six failure families are enums mapped one to one from server result codes, and validators return typed errors, so no layer below presentation ever authors a sentence. Arabic is the ARB template rather than the translation, untranslated keys fail the build, and text direction is derived from the active locale.',
    },
    {
      title: 'Tested and analyzer-clean',
      text: '1,293 passing unit and widget tests across 66 files, zero flutter analyze issues, a contract test keeping the Dart enums in step with the SQL CHECK sets, and a written manual QA plan covering the race conditions and RLS negative cases that unit tests cannot reach.',
    },
  ],

  highlightsAr: [
    {
      title: 'دورة حياة الرحلة يملكها الخادم',
      text: 'لا يملك المستخدم المسجَّل سوى صلاحية القراءة على جدول الرحلات. كل انتقال حالة يتم عبر دالة SECURITY DEFINER تأخذ قفلاً على السطر وتقرر النتيجة وتعيد رمز نتيجة واضحاً، ومخطط الحالات مكتوب مرة واحدة في SQL ويفرضه مشغل حارس.',
    },
    {
      title: 'التزامن كحالة أساسية لا استثنائية',
      text: 'عند ضغط سائقَين على الطلب نفسه يفصل القفل SELECT ... FOR UPDATE بين الطلبين، وتميّز الدالة بين "الرحلة لك أصلاً" و"قبِلها سائق آخر". تُعامل الرموز المتكررة كنجاح، ما يجعل الضغط المزدوج أو إعادة المحاولة بعد انقطاع الاستجابة آمناً. وقد استبدل هذا تنفيذاً سابقاً كان يستنتج النتيجة من عدد الأسطر المعدّلة، حيث كان للصفر ستة أسباب محتملة.',
    },
    {
      title: 'تسعير من الخادم وسجل مالي غير قابل للتعديل',
      text: 'لا يرسل تطبيق الراكب أي سعر. يحسب الخادم الأجرة وينسخ بطاقة التعرفة السارية إلى سطر الرحلة، ويعاد الحساب عند الإنهاء من هذه النسخة، وتمنع المشغلات تعديل الأرقام المالية وحصة العمولة بعد الإتمام، فلا يستطيع تغيير سعر لاحق أن يعيد كتابة رحلات سابقة.',
    },
    {
      title: 'حماية في المواضع التي لا تصلها سياسات RLS',
      text: '63 سياسة RLS تضبط الوصول على مستوى الأسطر، ومشغلات مخصصة تغطي ما لا تستطيع السياسات تغطيته: حالة التوثيق ورصيد المحفظة والتقييم وعدد الرحلات ترفض أي كتابة من جهة التطبيق عبر فحص current_user. ووثائق الهوية محفوظة في حاوية خاصة ضمن مسار مرتبط بحساب صاحبها، مع مشغل إدخال يتحقق من وجود الملف فعلياً ومن عائديته لمقدّم الطلب.',
    },
    {
      title: 'هندسة البث الحي والموقع',
      text: 'اشتراك واحد بالبث الحي للرحلة النشطة واشتراك واحد لموقع السائق، مع إظهار الرحلة المنتهية مرة واحدة فقط. مواقع السائق تأتي من تدفق مقيّد بالمسافة ومحدود بكتابة واحدة كل 8 ثوانٍ، والمطابقة الجغرافية تتم عبر ST_DWithin في PostGIS، ومسارات الطرق من Google Routes API v2 خلف ذاكرة تخزين مشتركة مع حد لإعادة الطلب وفترة تهدئة عند الفشل لا يُرسم فيها أي خط بدلاً من رسم خط غير حقيقي.',
    },
    {
      title: 'أخطاء ذات أنواع محددة وتعريب من الأساس',
      text: 'ست عائلات من الأخطاء ممثلة بأنواع محددة ومطابقة واحدة لواحدة لرموز نتائج الخادم، والتحقق من النماذج يعيد أخطاء مصنفة، فلا تكتب أي طبقة تحت طبقة العرض جملة موجهة للمستخدم. العربية هي لغة المصدر في ملفات ARB وليست ترجمة، وأي مفتاح غير مترجم يوقف البناء، واتجاه الواجهة مشتق من اللغة الفعالة.',
    },
    {
      title: 'اختبارات ناجحة وتحليل بلا ملاحظات',
      text: '1,293 اختبار وحدة وواجهة ناجح في 66 ملفاً، وصفر ملاحظات من flutter analyze، واختبار تعاقد يبقي الأنواع في Dart متوافقة مع قيود CHECK في قاعدة البيانات، إضافة إلى خطة اختبار يدوية تغطي حالات التزامن واختبارات RLS السلبية التي لا تصلها اختبارات الوحدة.',
    },
  ],

  featuresEn: [
    'Rider and driver applications in one Flutter binary',
    'Phone and OTP authentication with canonical phone identity',
    'Trip state machine owned by the database',
    'Row-locked accept with idempotent result codes',
    'Server-quoted fares with snapshotted rate cards',
    'Commission split and driver wallet ledger',
    'Live trip tracking over Supabase Realtime',
    'Live driver marker and road routes on Google Maps',
    'PostGIS proximity matching for nearby requests',
    'Driver online status, service area and pickup radius',
    'Driver application with document upload and e-signature',
    'Signed PDF generation for driver applications',
    'Trip history, fare summary and driver rating',
    'Push notifications via FCM and a Deno Edge Function',
    'Row Level Security with trigger-based column guards',
    'Private document storage behind signed URLs',
    'Admin operations exposed as database RPCs',
    'Arabic-first localisation with locale-derived RTL',
    'Light and dark themes on a tokenized design system',
    'Android app shortcut and native floating bubble for drivers',
  ],

  featuresAr: [
    'تطبيقا الراكب والسائق ضمن تطبيق Flutter واحد',
    'مصادقة عبر رقم الهاتف ورمز تحقق مع توحيد صيغة الرقم',
    'مخطط حالات الرحلة تديره قاعدة البيانات',
    'قبول الرحلة بقفل على السطر مع رموز نتائج آمنة عند التكرار',
    'تسعير من الخادم مع نسخ التعرفة إلى سطر الرحلة',
    'احتساب العمولة ودفتر محفظة السائق',
    'تتبع حي للرحلة عبر Supabase Realtime',
    'مؤشر حي للسائق ومسار طريق على خرائط Google',
    'مطابقة الطلبات القريبة جغرافياً عبر PostGIS',
    'حالة اتصال السائق ونطاق الخدمة ونصف قطر الاستلام',
    'طلب انضمام السائق مع رفع الوثائق والتوقيع الإلكتروني',
    'توليد ملف PDF موقّع لطلب انضمام السائق',
    'سجل الرحلات وملخص الأجرة وتقييم السائق',
    'إشعارات فورية عبر FCM ودالة Edge بلغة Deno',
    'أمان على مستوى الأسطر مع حماية أعمدة عبر المشغلات',
    'تخزين خاص للوثائق عبر روابط موقّتة موقّعة',
    'عمليات الإدارة عبر دوال RPC في قاعدة البيانات',
    'تعريب أساسه العربية مع اتجاه واجهة مشتق من اللغة',
    'وضع فاتح وداكن ضمن نظام تصميم موحد',
    'اختصار تطبيق على أندرويد وفقاعة عائمة أصلية للسائق',
  ],

  focusEn:
      'Backend-owned business logic, distributed-systems safety, PostgreSQL security design, feature-first Clean Architecture with BLoC, realtime and location-heavy mobile UX, and Arabic-first internationalisation.',

  focusAr:
      'منطق أعمال يملكه الخادم، وأمان في مواجهة مشكلات التزامن، وتصميم أمني في PostgreSQL، وبنية Clean Architecture منظمة حسب الميزات مع BLoC، وواجهات تعتمد على البث الحي والموقع، وتعريب كامل من الأساس مع دعم RTL.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_bloc (BLoC + Cubit)',
    'Clean Architecture',
    'get_it',
    'go_router',
    'Supabase',
    'PostgreSQL 17',
    'PostGIS',
    'Supabase Realtime',
    'Row Level Security',
    'Deno Edge Functions',
    'Google Maps',
    'Google Routes API v2',
    'Firebase Cloud Messaging',
    'Kotlin (Android)',
  ],

  demoUrl: 'https://mashwarak.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/Mashwarak-Taxi',
  imageKeys: [
    'projectt11',
    'projectt22',
    'projectt25',
    'projectt27',
    'projectt28',
  ],
},
{
  id: 2,
  index: '02',
  titleEn: 'Damas Dashboard',
  titleAr: 'لوحة تحكم داماس',

  descShortEn:
      'A bilingual Flutter business-intelligence dashboard for tracking KPIs, revenue trends, and reports, built on Clean Architecture with Bloc.',

  descShortAr:
      'لوحة تحكم لإدارة الأعمال مبنية باستخدام Flutter بلغتين، لتتبع المؤشرات واتجاه الإيرادات والتقارير، مبنية على Clean Architecture باستخدام Bloc.',

  descLongEn:
      'Damas Dashboard is an admin console for monitoring commercial performance, presenting KPI cards with period-over-period comparisons, a revenue trend chart, a recent-activity feed, and a searchable, filterable report library with Arabic-aware search. It ships with a bundled JSON data source structured like an API response and reached only through repository interfaces, so a real backend can be added without changing domain or presentation code. The app is built with Clean Architecture in a feature-first layout, using Bloc (Cubit) for state management, get_it for dependency injection, and a token-driven design system, with full English/Arabic localisation and RTL support.',

  descLongAr:
      'داماس داشبورد هي لوحة تحكم إدارية لمتابعة أداء الأعمال، تعرض بطاقات مؤشرات أداء مع مقارنة الفترات، ورسمًا بيانيًا لاتجاه الإيرادات، وقائمة بالأنشطة الأخيرة، ومكتبة تقارير قابلة للبحث والتصفية والفرز مع دعم بحث يراعي خصائص اللغة العربية. يعتمد التطبيق على مصدر بيانات JSON مضمّن مصمم بشكل مشابه لاستجابة واجهة برمجية حقيقية، ويتم الوصول إليه فقط عبر واجهات المستودعات (Repositories)، بحيث يمكن ربط خادم حقيقي لاحقًا دون تعديل طبقتي Domain أو Presentation. بُني التطبيق باستخدام Clean Architecture بتنظيم Feature-First، مع Bloc (Cubit) لإدارة الحالة، وget_it لحقن التبعيات، ونظام تصميم قائم على الرموز، إلى جانب دعم كامل للغتين الإنجليزية والعربية مع التخطيط من اليمين إلى اليسار.',

  featuresEn: [
    'KPI cards with period-over-period comparison',
    'Revenue trend chart with tooltips',
    'Recent-activity feed',
    'Searchable, filterable and sortable report library',
    'Arabic-aware search normalisation',
    'Scheduled-report list',
    'Light and dark themes',
    'English/Arabic localisation with full RTL support',
    'Adaptive navigation (drawer on phones, rail on tablets)',
    'Loading, empty, no-matches and error states with retry',
  ],

  featuresAr: [
    'بطاقات مؤشرات أداء مع مقارنة الفترات',
    'رسم بياني لاتجاه الإيرادات مع تلميحات تفاعلية',
    'قائمة بالأنشطة الأخيرة',
    'مكتبة تقارير قابلة للبحث والتصفية والفرز',
    'بحث يراعي خصائص اللغة العربية',
    'قائمة بالتقارير المجدولة',
    'وضعان فاتح وداكن',
    'دعم كامل للغتين الإنجليزية والعربية مع التخطيط من اليمين لليسار',
    'تنقل متكيف (قائمة جانبية على الهواتف، شريط تنقل على الأجهزة اللوحية)',
    'حالات تحميل وفراغ وعدم تطابق وخطأ مع إمكانية إعادة المحاولة',
  ],

  focusEn:
      'Clean Architecture with a feature-first layout, dependency inversion enforced by architecture tests, Bloc (Cubit) state management, and a bilingual, RTL-ready design system.',

  focusAr:
      'بنية Clean Architecture بتنظيم Feature-First، مع فصل التبعيات يتم التحقق منه عبر اختبارات معمارية، وإدارة الحالة باستخدام Bloc (Cubit)، ونظام تصميم ثنائي اللغة يدعم التخطيط من اليمين لليسار.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_bloc (Cubit)',
    'go_router',
    'get_it',
    'shared_preferences',
    'flutter_localizations',
    'intl',
    'fl_chart',
    'equatable',
  ],

  demoUrl: 'https://damas-dashboard.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/DamasDashboard',
  imageKeys: [
    'project56',
    'project55',
    'project58',
    'project59',
  ],
},
{
  id: 3,
  index: '03',
  titleEn: 'Kairo',
  titleAr: 'كايرو',

  descShortEn:
      'A multi-platform Flutter task manager whose list, board, calendar and timeline views are four renderings of one query engine, running entirely on-device across six platform targets from a single codebase.',

  descShortAr:
      'تطبيق لإدارة المهام مبني بـ Flutter، يعرض العمل في أربعة أنماط (قائمة ولوحة وتقويم ومخطط زمني) تنبثق جميعها من محرك استعلام واحد، ويعمل بالكامل على الجهاز عبر ست منصات من قاعدة كود واحدة.',

  descLongEn:
      'Kairo organises work across projects with task dependencies, recurrence rules, a focus timer and a productivity dashboard. Filtering, sorting and grouping live in a single domain-layer query engine, so moving between the list, board, calendar and timeline views preserves the active query instead of resetting it. The domain layer is pure Dart that imports neither Flutter nor the data layer, features resolve repositories through eleven domain interfaces, and one composition root holds the only reference to a concrete implementation, so replacing local storage with HTTP is a data-layer change plus a single file. Persistence is split by data shape across Hive for the workspace documents, shared_preferences for settings and the platform keychain for the session token, with no backend and no HTTP client in the project.',

  descLongAr:
      'ينظّم Kairo العمل ضمن مشاريع، مع تبعيات بين المهام وقواعد للتكرار ومؤقّت تركيز ولوحة لقياس الإنتاجية. تعيش عمليات التصفية والفرز والتجميع في محرك استعلام واحد ضمن طبقة الـ Domain، لذا ينتقل المستخدم بين أنماط القائمة واللوحة والتقويم والمخطط الزمني مع بقاء الاستعلام النشط كما هو بدلاً من إعادة ضبطه. طبقة الـ Domain مكتوبة بلغة Dart خالصة لا تستورد Flutter ولا طبقة الـ Data، وتصل الميزات إلى المستودعات عبر إحدى عشرة واجهة معرّفة في الـ Domain، بينما تنفرد نقطة تركيب واحدة بمعرفة التنفيذ الفعلي، ما يجعل استبدال التخزين المحلي بـ HTTP تعديلاً في طبقة الـ Data وملفًا واحدًا فقط. ويُقسَّم التخزين بحسب طبيعة البيانات: Hive لوثائق مساحة العمل، وshared_preferences للإعدادات، وسلسلة مفاتيح النظام لرمز الجلسة، دون أي خادم أو عميل HTTP في المشروع.',

  featuresEn: [
    'List, Kanban board, calendar and timeline views sharing one filter, sort and grouping state',
    'Task dependencies with cycle detection and blocked-task resolution',
    'Recurring tasks with rule-based occurrence expansion',
    'Focus timer with session history',
    'Productivity dashboard with a derived score, metric tiles and sparklines',
    'Completion analytics over 7-, 30- and 90-day ranges',
    'Global search and a keyboard command palette',
    'Charts and the brand mark drawn with CustomPainter, without a charting dependency',
    'Per-breakpoint layouts: on a phone the month grid becomes priority dots with a separate agenda',
    'Light and dark themes, with reduce-motion honoured across every animation',
    'Runs on Android, web, Windows, macOS and Linux from one codebase; iOS is configured but not yet built',
  ],

  featuresAr: [
    'أربعة أنماط للعرض (قائمة ولوحة كانبان وتقويم ومخطط زمني) تتشارك حالة تصفية وفرز وتجميع واحدة',
    'تبعيات بين المهام مع كشف الحلقات الدائرية وتحديد المهام المحجوبة',
    'مهام متكررة مع توسيع المواعيد وفق قواعد التكرار',
    'مؤقّت تركيز مع سجل للجلسات',
    'لوحة إنتاجية تعرض درجة محسوبة وبطاقات مؤشرات ورسومًا مصغّرة',
    'تحليلات إنجاز على مدى 7 أو 30 أو 90 يومًا',
    'بحث شامل ولوحة أوامر تعمل بالكيبورد',
    'رسوم بيانية وشعار مرسومة بـ CustomPainter دون الاعتماد على مكتبة رسوم',
    'تخطيطات تتبدّل حسب نقاط الانكسار: على الهاتف تتحول شبكة الشهر إلى نقاط تدل على الأولوية مع جدول منفصل',
    'وضعان فاتح وداكن، مع احترام تفضيل تقليل الحركة في كل الرسوم المتحركة',
    'يعمل على أندرويد والويب وWindows وmacOS وLinux من قاعدة كود واحدة، وiOS مهيّأ لكن لم يُبنَ بعد',
  ],

  focusEn:
      'Layered architecture with the dependency direction asserted in the audit: the domain layer imports neither Flutter nor the data layer, and no feature imports data. Riverpod 3 across fourteen features with .select bounding rebuilds, go_router with a single redirect holding navigation authority, a sealed Failure hierarchy carried across layer boundaries as values, and 38 design tokens in a ThemeExtension. Layout correctness is enforced by tests: a matrix renders every route at nine device sizes in both themes and fails on any overflow, which took the app from 716 layout errors to zero.',

  focusAr:
      'بنية طبقية يُتحقَّق من اتجاه التبعيات فيها ضمن التدقيق: طبقة الـ Domain لا تستورد Flutter ولا طبقة الـ Data، ولا تستورد أي ميزة طبقةَ الـ Data. إدارة الحالة بـ Riverpod 3 عبر أربع عشرة ميزة مع الاعتماد على محدِّد select للحد من إعادة البناء، وgo_router مع إعادة توجيه واحدة تنفرد بصلاحية التنقل، وتسلسل Failure من نوع sealed يعبر حدود الطبقات كقيم، و38 رمزًا تصميميًا ضمن ThemeExtension. وصحّة التخطيط مضمونة باختبارات: مصفوفة تعرض كل مسار على تسعة أحجام أجهزة في الوضعين الفاتح والداكن وتفشل عند أي تجاوز، وقد أخذت التطبيق من 716 خطأ تخطيط إلى صفر.',

  stack: [
    'Flutter',
    'Dart',
    'Riverpod 3',
    'go_router',
    'Hive',
    'shared_preferences',
    'flutter_secure_storage',
    'flutter_test / integration_test',
  ],

  demoUrl: 'https://kario-taskapp.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/Kario-TaskApp',
  imageKeys: [
    'project78',
    'project77',
    'project799',
    'projectl78',
  ],
},
{
  id: 4,
  index: '04',
  titleEn: 'Hello Chat',
  titleAr: 'هيلو تشات',

  descShortEn:
      'A Flutter messaging client UI with conversations, threads, contacts and call history, built on Clean Architecture with a locally persisted, reactive data layer.',

  descShortAr:
      'واجهة تطبيق مراسلة مبنية باستخدام Flutter تتضمن المحادثات والخيوط وجهات الاتصال وسجل المكالمات، مبنية على Clean Architecture مع طبقة بيانات محلية تفاعلية.',

  descLongEn:
      'Hello Chat is a UI-and-architecture messaging project with no real chat server behind it: the data layer is a local, reactive, persisted store deliberately shaped like a remote one, so a real backend can later be added by changing only the data layer and its dependency registration. It covers a conversation list with pinning, muting, unread counts and archiving; message threads with day separators, quoted replies and simulated read receipts; a searchable contacts list; and call history. The app is built with Clean Architecture in a feature-first layout, using Bloc (Cubit) for state management, get_it for dependency injection and go_router for navigation, with English/Arabic localisation and full RTL support.',

  descLongAr:
      'هيلو تشات هو مشروع مراسلة يركّز على الواجهة والبنية المعمارية، بدون خادم محادثة حقيقي خلفه؛ حيث تعتمد طبقة البيانات على تخزين محلي تفاعلي ومستمر صُمم عمدًا ليحاكي سلوك خادم حقيقي، بحيث يمكن لاحقًا ربط خادم فعلي بتعديل طبقة البيانات وتسجيل التبعيات فقط. يغطي التطبيق قائمة محادثات مع التثبيت وكتم الإشعارات وعدّاد الرسائل غير المقروءة والأرشفة، وخيوط رسائل مع فواصل يومية وردود مقتبسة وإيصالات قراءة محاكاة، بالإضافة إلى قائمة جهات اتصال قابلة للبحث وسجل مكالمات. بُني التطبيق باستخدام Clean Architecture بتنظيم Feature-First، مع Bloc (Cubit) لإدارة الحالة، وget_it لحقن التبعيات، وgo_router للتنقل، إلى جانب دعم كامل للغتين الإنجليزية والعربية مع التخطيط من اليمين إلى اليسار.',

  featuresEn: [
    'Conversation list with pinning, muting, unread counts and archive with undo',
    'Full-text search across titles and message previews with filters and sorting',
    'Message threads with day separators, quoted replies and soft delete',
    'Simulated sent → delivered → read receipts',
    'Messages persist across app restarts',
    'Searchable, alphabetically sectioned contacts list',
    'Call history with an All/Missed filter',
    'Light and dark themes',
    'English/Arabic localisation with full RTL support',
    'Responsive layout with bottom navigation and a navigation rail on larger screens',
    'Loading, empty and typed error states with retry where applicable',
  ],

  featuresAr: [
    'قائمة محادثات مع التثبيت وكتم الإشعارات وعدّاد الرسائل غير المقروءة والأرشفة القابلة للتراجع عنها',
    'بحث نصي شامل في العناوين ومعاينات الرسائل مع خيارات تصفية وفرز',
    'خيوط رسائل مع فواصل يومية وردود مقتبسة وحذف ناعم',
    'إيصالات محاكاة لحالة الإرسال والتسليم والقراءة',
    'استمرارية حفظ الرسائل بعد إعادة تشغيل التطبيق',
    'قائمة جهات اتصال قابلة للبحث ومقسمة أبجديًا',
    'سجل مكالمات مع تصفية بين الكل والفائتة',
    'وضعان فاتح وداكن',
    'دعم كامل للغتين الإنجليزية والعربية مع التخطيط من اليمين لليسار',
    'تصميم متجاوب مع شريط تنقل سفلي وشريط تنقل جانبي على الشاشات الكبيرة',
    'حالات تحميل وفراغ وأخطاء مصنّفة مع إمكانية إعادة المحاولة عند الحاجة',
  ],

  focusEn:
      'Clean Architecture with a feature-first layout, dependency inversion between a domain-defined repository contract and its data implementation, Bloc (Cubit) state management, and a reactive local persistence layer designed to mirror a remote backend.',

  focusAr:
      'بنية Clean Architecture بتنظيم Feature-First، مع فصل التبعيات بين عقد المستودع المعرّف في طبقة Domain وتنفيذه في طبقة Data، وإدارة الحالة باستخدام Bloc (Cubit)، وطبقة تخزين محلية تفاعلية مصممة لمحاكاة سلوك خادم حقيقي.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_bloc (Cubit)',
    'get_it',
    'go_router',
    'shared_preferences',
    'equatable',
    'flutter_localizations',
  ],

  demoUrl: 'https://hello-chat-message.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/HelloChat',
  imageKeys: [
    'project66',
    'project67',
    'project699',
    'project69',
  ],
},

{
  id: 5,
  index: '05',
  titleEn: 'Damas Coffee',
  titleAr: 'القهوة الدمشقية',

  descShortEn:
      'A feature-based Flutter coffee ordering application for browsing coffee and coffee beans, exploring product details, managing a shopping cart, and discovering loyalty and coupon features.',

  descShortAr:
      'تطبيق Flutter مبني بنظام Feature-Based لطلب القهوة، يتيح تصفح القهوة وحبوب البن، استعراض تفاصيل المنتجات، إدارة سلة المشتريات، واستكشاف ميزات الولاء والقسائم.',

  descLongEn:
      'A Flutter coffee ordering application that simulates the core experience of a modern coffee shop. The app includes onboarding, authentication screens with form validation, coffee and coffee-bean browsing, product details, favorites, cart management with live quantity and price updates, checkout payment options, loyalty points, coupons, and a profile section. The home feature uses a layered data/domain/presentation structure with flutter_bloc, use cases, repositories, and dedicated skeleton loading states, while the remaining features currently use StatefulWidget and setState as part of an incremental architectural migration.',

  descLongAr:
      'تطبيق لطلب القهوة مبني باستخدام Flutter ويحاكي تجربة متجر قهوة حديث. يتضمن التطبيق واجهة Onboarding، وشاشات تسجيل الدخول وإنشاء الحساب مع التحقق من النماذج، وتصفح القهوة وحبوب البن، وتفاصيل المنتجات، والمفضلة، وإدارة سلة المشتريات مع تحديث الكميات والأسعار بشكل مباشر، وخيارات الدفع، ونقاط الولاء، والقسائم، والملف الشخصي. تعتمد ميزة الشاشة الرئيسية على بنية متعددة الطبقات تشمل Data وDomain وPresentation مع flutter_bloc وUse Cases وRepository ونظام تحميل هيكلي مخصص، بينما تعتمد بقية الميزات حالياً على StatefulWidget وsetState كجزء من عملية تطوير وانتقال معماري تدريجي.',

  featuresEn: [
    'Three-step onboarding flow',
    'Login and registration screens',
    'Form validation',
    'International phone number input',
    'Coffee and coffee-bean browsing',
    'Product category filters',
    'Promotional banner carousel',
    'Product detail screens',
    'Favorite products',
    'Shopping cart management',
    'Live quantity and subtotal updates',
    'Live cart total calculation',
    'Checkout payment method selection',
    'Loyalty points card',
    'Coupon and discount section',
    'Profile and account options',
    'Skeleton loading system',
    'Home feature powered by Bloc',
    'Repository and use-case layers',
    'Centralized named routing',
    'Custom design system and color tokens',
  ],

  featuresAr: [
    'واجهة Onboarding من ثلاث مراحل',
    'شاشات تسجيل الدخول وإنشاء الحساب',
    'التحقق من صحة النماذج',
    'اختيار رقم الهاتف مع رمز الدولة',
    'تصفح القهوة وحبوب البن',
    'فلاتر تصنيفات المنتجات',
    'شريط عروض ترويجي متحرك',
    'صفحات تفاصيل المنتجات',
    'إضافة المنتجات إلى المفضلة',
    'إدارة سلة المشتريات',
    'تحديث الكميات والإجماليات بشكل مباشر',
    'حساب إجمالي السلة بشكل مباشر',
    'اختيار طريقة الدفع',
    'بطاقة نقاط الولاء',
    'قسم القسائم والخصومات',
    'الملف الشخصي وخيارات الحساب',
    'نظام تحميل هيكلي مخصص',
    'إدارة ميزة Home باستخدام Bloc',
    'طبقات Repository وUse Cases',
    'نظام تنقل مركزي باستخدام Named Routes',
    'نظام تصميم وألوان مخصص',
  ],

  focusEn:
      'Feature-based architecture, incremental migration toward layered architecture, Bloc-driven home state management, reusable UI components, interactive shopping flows, and custom skeleton loading.',

  focusAr:
      'بنية Feature-Based، انتقال معماري تدريجي نحو البنية متعددة الطبقات، إدارة حالة الشاشة الرئيسية باستخدام Bloc، مكونات واجهة قابلة لإعادة الاستخدام، تفاعلات تسوق عملية، ونظام تحميل هيكلي مخصص.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_bloc',
    'country_picker',
    'Flutter gen-l10n',
  ],

  demoUrl: 'https://damascoffeee.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/DamasCoffee',
  imageKeys: [
    'project4',
    'project5',
    'project2',
    'project3',
  ],
},


];
