// ─── Personal ─────────────────────────────────────────────────────────────────

export const personalInfo = {
  nameEn: 'Saad Sinan',
  nameAr: 'سعد سنان',

  titleEn: 'Software Engineer — Web & Flutter',
  titleAr: 'مهندس برمجيات — تطوير الويب وFlutter',

  roleEn: 'Software Engineering Student',
  roleAr: 'طالب هندسة برمجيات',

  taglineEn: 'Web products, Flutter apps, and backend-integrated systems',
  taglineAr: 'منتجات ويب، تطبيقات Flutter، وأنظمة متكاملة مع الخلفية والبيانات',

  bioEn:
    'Software Engineering student building modern web products and cross-platform Flutter applications. My project work spans React interfaces, Flutter apps, Supabase/PostgreSQL backends, authentication, APIs, realtime data, database security, and automated testing. I focus on clear system boundaries, maintainable architecture, and responsive product experiences rather than treating frontend, backend, and product behavior as separate concerns.',

  bioAr:
    'طالب هندسة برمجيات أبني منتجات ويب حديثة وتطبيقات متعددة المنصات باستخدام Flutter. تغطي مشاريعي واجهات React، وتطبيقات Flutter، وخلفيات Supabase/PostgreSQL، والمصادقة، وواجهات API، والبيانات اللحظية، وأمان قواعد البيانات، والاختبارات الآلية. أركز على حدود واضحة بين الواجهة والمنطق والبيانات، وبنية قابلة للصيانة، وتجارب منتج متجاوبة بدلاً من التعامل مع كل طبقة بمعزل عن الأخرى.',

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
 */
export const heroFacts = [
  {
    keyEn: 'Role',
    keyAr: 'الدور',
    valueEn: 'Software Engineer',
    valueAr: 'مهندس برمجيات',
  },
  {
    keyEn: 'Focus',
    keyAr: 'التركيز',
    valueEn: 'Web · Flutter · Backend-integrated products',
    valueAr: 'Web · Flutter · منتجات متكاملة مع الخلفية',
  },
  {
    keyEn: 'Studying',
    keyAr: 'الدراسة',
    valueEn: 'Software Engineering',
    valueAr: 'هندسة برمجيات',
  },
  {
    keyEn: 'Based in',
    keyAr: 'المقر',
    valueEn: 'Damascus, Syria',
    valueAr: 'دمشق، سوريا',
  },
  {
    keyEn: 'Platforms',
    keyAr: 'المنصات',
    valueEn: 'Web · Android · iOS',
    valueAr: 'Web · Android · iOS',
  },
];

/**
 * Working principles shown in About.
 */
export const principles = [
  {
    en: 'Build the product boundary, not only the interface',
    ar: 'بناء حدود المنتج كاملة، لا الواجهة فقط',
  },
  {
    en: 'Keep business rules and security at the authoritative layer',
    ar: 'وضع منطق الأعمال والأمان في الطبقة صاحبة الصلاحية الفعلية',
  },
  {
    en: 'Choose architecture for maintainability, then test the boundaries',
    ar: 'اختيار البنية لسهولة الصيانة ثم اختبار حدودها بوضوح',
  },
  {
    en: 'Design responsive, localized experiences across web and mobile',
    ar: 'تصميم تجارب متجاوبة ومترجمة للويب والموبايل',
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
    category: 'mobile',
    index: '01',
    titleEn: 'Mashwarak',
    titleAr: 'مشوارك',

    descShortEn:
      'A two-sided Flutter ride-hailing product for Syria with rider and driver flows in one codebase and a Supabase/PostgreSQL backend that owns trip state, pricing, commissions, eligibility, realtime coordination, and security-sensitive writes.',

    descShortAr:
      'منتج نقل ثنائي الجانب مبني بـ Flutter للسوق السوري، يجمع تجربتي الراكب والسائق في قاعدة كود واحدة مع خلفية Supabase/PostgreSQL تتولى حالات الرحلة والتسعير والعمولات والأهلية والتنسيق اللحظي والعمليات الحساسة أمنياً.',

    descLongEn:
      'Mashwarak combines a rider application, a driver application, and the backend rules that coordinate both sides of a trip. The Flutter client cannot write directly to trip state; lifecycle transitions go through PostgreSQL SECURITY DEFINER RPCs that take row locks, return typed result codes, and make duplicate actions or retries safe. Pricing and commission logic are computed on the server, historical rate data is snapshotted onto trips, and RLS plus trigger-based guards protect data that should not be client-controlled. The product also uses Supabase Realtime for active-trip updates, PostGIS for proximity matching, Google Routes API v2 for road routing, FCM through a Deno Edge Function for push delivery, and Arabic-first localization with native RTL. The codebase is organized feature-first with Clean Architecture, BLoC and get_it, and the documented test suite contains 1,293 passing unit and widget tests with zero flutter analyze issues.',

    descLongAr:
      'يجمع مشوارك بين تطبيق للراكب وتطبيق للسائق والقواعد الخلفية التي تنسق الطرفين خلال دورة حياة الرحلة. لا يكتب تطبيق Flutter مباشرة في حالة الرحلة؛ فكل انتقال يمر عبر دوال SECURITY DEFINER في PostgreSQL تأخذ قفلاً على السطر وتعيد رموز نتائج محددة، ما يجعل الضغط المتكرر أو إعادة المحاولة بعد انقطاع الاستجابة آمناً. يُحسب التسعير والعمولة في الخادم، وتُحفظ نسخة من التعرفة مع الرحلة، بينما تضبط RLS والمشغلات البيانات التي لا ينبغي أن يتحكم بها العميل. يستخدم المنتج أيضاً Supabase Realtime لتحديثات الرحلة النشطة، وPostGIS للمطابقة الجغرافية، وGoogle Routes API v2 لمسارات الطرق، وFCM عبر Deno Edge Function للإشعارات، مع تعريب أساسه العربية ودعم RTL أصيل. الكود منظم حسب الميزات باستخدام Clean Architecture وBLoC وget_it، وتضم مجموعة الاختبارات الموثقة 1,293 اختبار وحدة وواجهة ناجحاً دون ملاحظات من flutter analyze.',

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
      'Server-owned business logic, PostgreSQL security, concurrency-safe trip workflows, realtime/location systems, and feature-first Flutter architecture.',

    focusAr:
      'منطق أعمال يملكه الخادم، وأمان PostgreSQL، وتدفقات رحلات آمنة أمام التزامن، وأنظمة لحظية معتمدة على الموقع، وبنية Flutter منظمة حسب الميزات.',

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
    imageKeys: ['projectt11', 'projectt22', 'projectt25', 'projectt27', 'projectt28'],
  },

  {
    id: 2,
    category: 'mobile',
    index: '02',
    titleEn: 'Damas Dashboard',
    titleAr: 'لوحة تحكم داماس',

    descShortEn:
      'A bilingual Flutter business-intelligence dashboard for KPI monitoring, revenue trends, activity tracking, and report discovery, structured so the current local data source can be replaced by a backend without changing domain or presentation code.',

    descShortAr:
      'لوحة ذكاء أعمال ثنائية اللغة مبنية بـ Flutter لمتابعة المؤشرات واتجاهات الإيرادات والأنشطة والتقارير، ومهيكلة بحيث يمكن استبدال مصدر البيانات المحلي بخلفية حقيقية دون تغيير طبقتي Domain أو Presentation.',

    descLongEn:
      'Damas Dashboard is an administrative analytics interface for monitoring commercial performance. It includes KPI cards with period comparisons, a revenue trend chart, recent activity, and a searchable, filterable report library with Arabic-aware search. The current data source is bundled JSON shaped like an API response, so this project demonstrates frontend architecture and backend-ready boundaries rather than a live server integration. Data access stays behind repository interfaces, allowing a future remote source to be introduced without rewriting domain or presentation logic. The application uses feature-first Clean Architecture, Bloc (Cubit), get_it, a token-based design system, English/Arabic localization, and RTL-aware responsive navigation.',

    descLongAr:
      'داماس داشبورد هي واجهة تحليلات إدارية لمتابعة أداء الأعمال. تتضمن بطاقات مؤشرات مع مقارنة الفترات، ورسم اتجاه الإيرادات، والأنشطة الأخيرة، ومكتبة تقارير قابلة للبحث والتصفية مع بحث يراعي خصائص العربية. مصدر البيانات الحالي هو JSON مضمّن ومصمم على شكل استجابة API، لذلك يوضح المشروع بنية واجهة جاهزة للربط بخادم أكثر مما يدّعي وجود تكامل خلفي فعلي. يبقى الوصول للبيانات خلف واجهات Repository، ما يسمح بإضافة مصدر بعيد لاحقاً دون إعادة كتابة طبقتي Domain أو Presentation. يستخدم التطبيق Clean Architecture منظمة حسب الميزات، وBloc (Cubit)، وget_it، ونظام تصميم قائم على الرموز، وتعريباً إنجليزياً/عربياً مع تنقل متجاوب يدعم RTL.',

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
      'Feature-first Clean Architecture, repository boundaries, Bloc state management, bilingual RTL UX, and backend-ready data access.',

    focusAr:
      'Clean Architecture منظمة حسب الميزات، وحدود واضحة للمستودعات، وإدارة حالة بـ Bloc، وتجربة ثنائية اللغة تدعم RTL، ووصول للبيانات جاهز للربط بخلفية.',

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
    imageKeys: ['project56', 'project55', 'project58', 'project59'],
  },

  {
    id: 3,
    category: 'mobile',
    index: '03',
    titleEn: 'Kairo',
    titleAr: 'كايرو',

    descShortEn:
      'A local-first, multi-platform Flutter task manager with list, board, calendar, and timeline views powered by one shared query model and a layered architecture designed to keep domain logic independent from storage and UI.',

    descShortAr:
      'مدير مهام متعدد المنصات يعمل محلياً باستخدام Flutter، ويقدم القائمة واللوحة والتقويم والمخطط الزمني فوق نموذج استعلام موحد وبنية طبقية تفصل منطق المجال عن التخزين والواجهة.',

    descLongEn:
      'Kairo is a local-first productivity application for organizing projects, task dependencies, recurrence, focus sessions, and completion analytics. Its list, Kanban board, calendar, and timeline views all consume the same filtering, sorting, and grouping model, so switching views does not reset the user’s active query. The domain layer is pure Dart and does not depend on Flutter or the data layer; features depend on domain-defined repository interfaces, with concrete implementations wired at a single composition root. Persistence is split by data shape across Hive, shared_preferences, and platform secure storage. There is deliberately no backend or HTTP client in the current project, so the engineering value is in the domain boundaries, state flow, local persistence, responsive layouts, and testable architecture rather than server integration.',

    descLongAr:
      'Kairo هو تطبيق إنتاجية يعمل محلياً لتنظيم المشاريع وتبعيات المهام والتكرار وجلسات التركيز وتحليلات الإنجاز. تعتمد طرق العرض الأربع — القائمة وكانبان والتقويم والمخطط الزمني — على نموذج واحد للتصفية والفرز والتجميع، لذلك لا يفقد المستخدم استعلامه عند الانتقال بينها. طبقة Domain مكتوبة بـ Dart خالصة ولا تعتمد على Flutter أو طبقة Data، وتعتمد الميزات على واجهات Repository معرفة داخل الـ Domain، بينما تُربط التنفيذات الفعلية في نقطة تركيب واحدة. يُقسَّم التخزين بحسب طبيعة البيانات بين Hive وshared_preferences والتخزين الآمن للنظام. لا يوجد Backend أو عميل HTTP في النسخة الحالية عمداً، لذا تتمثل القيمة الهندسية في حدود المجال وتدفق الحالة والتخزين المحلي والتخطيطات المتجاوبة والبنية القابلة للاختبار، لا في تكامل خادم غير موجود.',

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
      'Pure-Dart domain boundaries, Riverpod state management, local persistence, shared query logic, responsive multi-platform layouts, and architecture-level testing.',

    focusAr:
      'حدود Domain مكتوبة بـ Dart خالصة، وإدارة حالة بـ Riverpod، وتخزين محلي، ومنطق استعلام مشترك، وتخطيطات متجاوبة متعددة المنصات، واختبارات على مستوى البنية.',

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
    imageKeys: ['project78', 'project77', 'project799', 'projectl78'],
  },

  {
    id: 4,
    category: 'mobile',
    index: '04',
    titleEn: 'Hello Chat',
    titleAr: 'هيلو تشات',

    descShortEn:
      'A Flutter messaging-client architecture project with conversations, threads, contacts, and call history, backed by reactive local persistence designed around a repository boundary that can later be replaced by a remote data source.',

    descShortAr:
      'مشروع بنية لتطبيق مراسلة باستخدام Flutter يشمل المحادثات والخيوط وجهات الاتصال وسجل المكالمات، مع تخزين محلي تفاعلي خلف Repository يمكن استبداله لاحقاً بمصدر بيانات بعيد.',

    descLongEn:
      'Hello Chat focuses on messaging UX and application architecture rather than claiming a production chat backend. It includes conversation pinning, muting, unread counts and archiving; message threads with day separators, quoted replies and simulated delivery/read states; searchable contacts; and call history. Data is stored in a local reactive persistence layer intentionally hidden behind a domain repository contract, so replacing it with a real remote implementation would be a data-layer and dependency-registration change rather than a presentation rewrite. The project uses feature-first Clean Architecture, Bloc (Cubit), get_it, go_router, English/Arabic localization, and full RTL support. There is no live messaging server in the current implementation.',

    descLongAr:
      'يركز Hello Chat على تجربة المراسلة وبنية التطبيق بدلاً من الادعاء بوجود خادم دردشة إنتاجي. يتضمن تثبيت المحادثات وكتمها وعدّاد غير المقروء والأرشفة، وخيوط رسائل مع فواصل يومية وردود مقتبسة وحالات إرسال وتسليم وقراءة محاكاة، إضافة إلى البحث في جهات الاتصال وسجل المكالمات. تُخزن البيانات في طبقة محلية تفاعلية مخفية خلف عقد Repository في الـ Domain، بحيث يمكن استبدالها بتنفيذ بعيد حقيقي كتغيير في طبقة Data وتسجيل التبعيات بدلاً من إعادة كتابة الواجهة. يستخدم المشروع Clean Architecture منظمة حسب الميزات، وBloc (Cubit)، وget_it، وgo_router، وتعريباً إنجليزياً/عربياً مع دعم RTL كامل. لا يوجد خادم مراسلة حي في النسخة الحالية.',

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
      'Repository-driven Clean Architecture, reactive local persistence, Bloc state management, messaging UX, and bilingual RTL behavior.',

    focusAr:
      'Clean Architecture قائمة على Repository، وتخزين محلي تفاعلي، وإدارة حالة بـ Bloc، وتجربة مراسلة، ودعم ثنائي اللغة مع RTL.',

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
    imageKeys: ['project66', 'project67', 'project699', 'project69'],
  },

  {
    id: 5,
    category: 'mobile',
    index: '05',
    titleEn: 'Damas Coffee',
    titleAr: 'القهوة الدمشقية',

    descShortEn:
      'A Flutter coffee-commerce prototype covering product discovery, favorites, cart and checkout flows, loyalty and coupons, with a feature-based structure and an ongoing migration toward clearer layered architecture.',

    descShortAr:
      'نموذج تجارة للقهوة مبني بـ Flutter يغطي اكتشاف المنتجات والمفضلة والسلة والدفع والولاء والقسائم، ضمن بنية Feature-Based وانتقال تدريجي نحو طبقات أوضح.',

    descLongEn:
      'Damas Coffee is a Flutter commerce prototype that covers the main customer journey of a coffee shop: onboarding, authentication screens with validation, coffee and bean browsing, product details, favorites, cart quantity and price updates, checkout payment options, loyalty points, coupons, and profile settings. The project is intentionally mixed in architecture: the Home feature already uses data/domain/presentation layers with Bloc, use cases, repositories, and dedicated skeleton loading states, while other features still use StatefulWidget and setState. Presenting that boundary honestly makes the project useful evidence of an incremental refactor rather than implying that the entire codebase already follows one architecture.',

    descLongAr:
      'Damas Coffee هو نموذج تجارة مبني بـ Flutter يغطي رحلة العميل الأساسية في متجر قهوة: Onboarding، وشاشات مصادقة مع التحقق من النماذج، وتصفح القهوة وحبوب البن، وتفاصيل المنتجات، والمفضلة، وتحديث كميات وأسعار السلة، وخيارات الدفع، ونقاط الولاء، والقسائم، وإعدادات الحساب. البنية الحالية مختلطة بشكل مقصود وواضح: ميزة Home تستخدم طبقات Data/Domain/Presentation مع Bloc وUse Cases وRepositories وحالات تحميل هيكلية مخصصة، بينما ما زالت ميزات أخرى تعتمد على StatefulWidget وsetState. إبراز هذا الحد كما هو يجعل المشروع دليلاً على انتقال معماري تدريجي بدلاً من الإيحاء بأن قاعدة الكود كاملة تتبع بنية واحدة.',

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
      'Feature-based Flutter architecture, Bloc-driven state in the Home feature, reusable commerce UI, cart interactions, and an explicit incremental move toward layered architecture.',

    focusAr:
      'بنية Flutter منظمة حسب الميزات، وإدارة حالة بـ Bloc في ميزة Home، ومكونات تجارة قابلة لإعادة الاستخدام، وتفاعلات السلة، وانتقال تدريجي واضح نحو بنية متعددة الطبقات.',

    stack: ['Flutter', 'Dart', 'flutter_bloc', 'country_picker', 'Flutter gen-l10n'],

    demoUrl: 'https://damascoffeee.netlify.app/',
    codeUrl: 'https://github.com/SaadSinan-dev/DamasCoffee',
    imageKeys: ['project4', 'project5', 'project2', 'project3'],
  },
];
