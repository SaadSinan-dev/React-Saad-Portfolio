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
  id: 5,
  index: '01',
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
  id: 6,
  index: '02',
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
  id: 7,
  index: '03',
  titleEn: 'My Tasks',
  titleAr: 'مهامي',

  descShortEn:
      'An offline-first Flutter task manager with search, filtering, sorting and completion analytics, running on mobile, web and desktop from one codebase.',

  descShortAr:
      'تطبيق لإدارة المهام مبني باستخدام Flutter يعمل بدون اتصال بالإنترنت، يتضمن البحث والتصفية والفرز وتحليلات الإنجاز، ويعمل على الهواتف والويب وسطح المكتب من قاعدة كود واحدة.',

  descLongEn:
      'My Tasks is an offline-first task manager with no backend, account or network dependency — every task lives on the device — running on Android, iOS, web, Windows, macOS and Linux from a single codebase. It lets users create, edit, search, filter and sort tasks, and provides an overview of progress due today, completion streaks and upcoming tasks, along with analytics on completions over 7- or 30-day windows and a breakdown by category. The app is built with Clean Architecture in a feature-first layout, using Bloc (Cubit) for state management, get_it for dependency injection and go_router for navigation, with English/Arabic localisation, full RTL support and adaptive layouts from phone to desktop.',

  descLongAr:
      'ماي تاسكس هو تطبيق لإدارة المهام يعمل بالكامل بدون اتصال بالإنترنت، دون الحاجة لحساب أو خادم — إذ تبقى جميع المهام مخزنة على الجهاز — ويعمل على أندرويد وiOS والويب وWindows وmacOS وLinux من قاعدة كود واحدة. يتيح التطبيق للمستخدم إنشاء المهام وتعديلها والبحث فيها وتصفيتها وفرزها، ويعرض نظرة عامة على التقدّم المطلوب إنجازه اليوم، وسلسلة أيام الإنجاز المتتالية، والمهام القادمة، بالإضافة إلى تحليلات لعدد المهام المنجزة خلال فترة 7 أو 30 يومًا مع تصنيف حسب الفئة. بُني التطبيق باستخدام Clean Architecture بتنظيم Feature-First، مع Bloc (Cubit) لإدارة الحالة، وget_it لحقن التبعيات، وgo_router للتنقل، إلى جانب دعم كامل للغتين الإنجليزية والعربية مع التخطيط من اليمين لليسار وتصميم متكيف من الهاتف إلى سطح المكتب.',

  featuresEn: [
    'Create, edit, view and delete tasks with priority, category and due date',
    'Complete/un-complete tracked as a timestamp',
    'Search across titles and notes',
    'Filter by all, active, completed or overdue',
    'Sort by newest, due date, priority or title',
    'Swipe to delete with confirmation and undo',
    'Progress overview for tasks due today, with live active/completed/overdue counts',
    'Completion streak tracking',
    'Completion analytics over 7- or 30-day windows, with a breakdown by category',
    'Light and dark themes',
    'English/Arabic localisation with full RTL support',
    'Adaptive navigation across phone, tablet and desktop',
    'Runs on Android, iOS, web, Windows, macOS and Linux from one codebase',
  ],

  featuresAr: [
    'إنشاء المهام وتعديلها وعرضها وحذفها مع تحديد الأولوية والفئة وتاريخ الاستحقاق',
    'تتبّع حالة الإنجاز عبر طابع زمني بدلاً من مؤشر بسيط',
    'بحث في عناوين المهام وملاحظاتها',
    'تصفية حسب الكل أو النشطة أو المكتملة أو المتأخرة',
    'فرز حسب الأحدث أو تاريخ الاستحقاق أو الأولوية أو العنوان',
    'حذف بالسحب مع تأكيد وإمكانية التراجع',
    'نظرة عامة على التقدم في مهام اليوم مع عدادات مباشرة للنشطة والمكتملة والمتأخرة',
    'تتبع سلسلة أيام الإنجاز المتتالية',
    'تحليلات إنجاز خلال فترة 7 أو 30 يومًا مع تصنيف حسب الفئة',
    'وضعان فاتح وداكن',
    'دعم كامل للغتين الإنجليزية والعربية مع التخطيط من اليمين لليسار',
    'تنقل متكيف بين الهاتف والجهاز اللوحي وسطح المكتب',
    'يعمل على أندرويد وiOS والويب وWindows وmacOS وLinux من قاعدة كود واحدة',
  ],

  focusEn:
      'Clean Architecture with a feature-first layout, dependency inversion between domain and data layers, Bloc (Cubit) state management, and an offline-first design with a fully bilingual, RTL-ready, adaptive UI.',

  focusAr:
      'بنية Clean Architecture بتنظيم Feature-First، مع فصل التبعيات بين طبقتي Domain وData، وإدارة الحالة باستخدام Bloc (Cubit)، وتصميم يعمل بالكامل بدون اتصال بالإنترنت مع واجهة ثنائية اللغة ومتكيفة تدعم التخطيط من اليمين لليسار.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_bloc (Cubit)',
    'get_it',
    'go_router',
    'shared_preferences',
    'flutter_localizations',
    'fl_chart',
    'equatable',
  ],

  demoUrl: 'https://mydaily-tasks.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/MyTasks',
  imageKeys: [
    'project78',
    'project77',
    'project799',
    'project789',
  ],
},
{
  id: 1,
  index: '04',
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
{
  id: 2,
  index: '05',
  titleEn: 'My Taxi',
  titleAr: 'التكسي السوري',

  descShortEn:
      'A production-oriented Flutter foundation for a ride-hailing application, focused on Clean Architecture, Cubit-based authentication, bilingual theming, and a reusable tokenized design system.',

  descShortAr:
      'أساس برمجي احترافي لتطبيق حجز سيارات مبني باستخدام Flutter، يركز على Clean Architecture، وإدارة حالة المصادقة باستخدام Cubit، ودعم العربية والإنجليزية، ونظام تصميم مخصص وقابل لإعادة الاستخدام.',

  descLongEn:
      'A scalable Flutter foundation for a ride-hailing application, built around feature-first Clean Architecture and Cubit-based state management. The project establishes a reusable design system with centralized colors, spacing, typography, light and dark themes, and locale-aware Arabic and English typography. It also includes a structured authentication flow, centralized routing, form validation setup, an animated navigation drawer, and reusable application-level components. The current repository focuses on the architectural foundation and authentication experience, while ride booking, maps, wallet, ride history, and other product features remain part of the planned build-out.',

  descLongAr:
      'أساس برمجي قابل للتوسع لتطبيق حجز سيارات مبني باستخدام Flutter، يعتمد على بنية Clean Architecture منظمة حسب الميزات وإدارة الحالة باستخدام Cubit. يتضمن المشروع نظام تصميم موحداً يحتوي على الألوان والمسافات والخطوط، مع دعم كامل للوضع الفاتح والداكن وتبديل الخطوط تلقائياً حسب اللغة العربية أو الإنجليزية. كما يتضمن نظام مصادقة منظم، وتنقلاً مركزياً بين الصفحات، وتجهيزاً للتحقق من النماذج، وقائمة جانبية متحركة، ومكونات مشتركة قابلة لإعادة الاستخدام. تركز النسخة الحالية على الأساس المعماري وتجربة المصادقة، بينما لا تزال ميزات حجز الرحلات والخرائط والمحفظة وسجل الرحلات وغيرها ضمن مراحل التطوير القادمة.',

  featuresEn: [
    'Clean Architecture foundation',
    'Feature-first project structure',
    'Cubit-based authentication',
    'Login and sign-up state management',
    'Async authentication states',
    'Light and dark theme support',
    'Runtime theme switching',
    'Centralized design tokens',
    'Custom color system',
    'Custom spacing system',
    'Custom typography system',
    'Arabic and English support',
    'Locale-aware font switching',
    'Centralized named routing',
    'Route-level BlocProvider integration',
    'Animated navigation drawer',
    'Staggered drawer animations',
    'Custom branded app bar',
    'Form validation setup',
    'Reusable shared components',
  ],

  featuresAr: [
    'أساس مبني وفق Clean Architecture',
    'بنية Feature-First منظمة',
    'إدارة المصادقة باستخدام Cubit',
    'إدارة حالات تسجيل الدخول وإنشاء الحساب',
    'التعامل مع حالات التحميل والنجاح والخطأ',
    'دعم الوضع الفاتح والداكن',
    'تبديل الثيم أثناء تشغيل التطبيق',
    'نظام تصميم مركزي',
    'نظام ألوان مخصص',
    'نظام مسافات موحد',
    'نظام خطوط مخصص',
    'دعم اللغتين العربية والإنجليزية',
    'تبديل الخط تلقائياً حسب اللغة',
    'نظام تنقل مركزي باستخدام Named Routes',
    'ربط BlocProvider مع الصفحات عند الحاجة',
    'قائمة جانبية متحركة',
    'أنيميشنات متسلسلة للقائمة الجانبية',
    'App Bar مخصص للهوية البصرية',
    'تجهيز نظام التحقق من النماذج',
    'مكونات مشتركة قابلة لإعادة الاستخدام',
  ],

  focusEn:
      'Architecture-first development, scalable Clean Architecture, Cubit-based state management, reusable design tokens, bilingual theming, and polished Flutter UI foundations.',

  focusAr:
      'تطوير يركز على البنية أولاً، Clean Architecture قابلة للتوسع، إدارة حالة باستخدام Cubit، نظام تصميم قابل لإعادة الاستخدام، دعم ثنائي اللغة، وأساس واجهة احترافي باستخدام Flutter.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_bloc',
    'Cubit',
    'Clean Architecture',
    'Material 3',
  ],

  demoUrl: 'https://syriataxi.netlify.app/',
  codeUrl: 'https://github.com/SaadSenan-dev/MyTaxi',
  imageKeys: [
    'projectt11',
    'projectt26',
    'projectt25',
    'projectt22',
  ],
},
{
  id: 3,
  index: '06',
  titleEn: 'My Doctor',
  titleAr: 'تطبيق لمركز طبي',

  descShortEn:
      'A clean, feature-driven Flutter healthcare application for discovering doctors, exploring their profiles, and starting the appointment booking journey. Built with a scalable feature-first architecture and a fully custom skeleton-loading system.',

  descShortAr:
      'تطبيق طبي أنيق ومبني باستخدام Flutter، يتيح للمستخدمين اكتشاف الأطباء واستعراض ملفاتهم والبدء برحلة حجز الموعد. يعتمد على بنية Feature-First قابلة للتوسع ونظام تحميل هيكلي مخصص بالكامل.',

  descLongEn:
      'A doctor discovery and appointment-booking UI built with Flutter, featuring a structured home dashboard, specialty filters, favourite and top-doctor sections, detailed doctor profiles, and a persistent booking call-to-action. The project focuses on clean architecture, responsive layouts, centralized routing, and a custom shimmer system built entirely with Flutter core animation APIs. Authentication, booking logic, and backend integration are intentionally scaffolded as future extensions rather than presented as completed functionality.',

  descLongAr:
      'واجهة تطبيق لاكتشاف الأطباء وبدء عملية حجز المواعيد مبنية باستخدام Flutter، وتتضمن لوحة رئيسية منظمة، وفلاتر للتخصصات، وأقساماً للأطباء المفضلين والأطباء المميزين، وصفحات تفصيلية للأطباء مع زر لبدء الحجز. يركز المشروع على البنية البرمجية المنظمة، والتصميم المتجاوب، ونظام التنقل المركزي، ونظام Shimmer مخصص مبني بالكامل باستخدام أدوات Flutter الأساسية للأنيميشن. تم تجهيز المصادقة ومنطق الحجز وربط الـBackend كأجزاء قابلة للتطوير مستقبلاً وليست وظائف مكتملة في النسخة الحالية.',

  featuresEn: [
    'Animated splash and onboarding flow',
    'Custom skeleton loading system',
    'Home dashboard',
    'Doctor search interface',
    'Specialty filter chips',
    'Favourite doctors grid',
    'Top doctors list',
    'Doctor profile and details',
    'Doctor ratings and specialty information',
    'Experience, patients and location statistics',
    'Doctor biography section',
    'Book appointment call-to-action',
    'Responsive layouts with ScreenUtil',
    'Custom shimmer animations',
    'Centralized named routing',
    'Safe route argument validation',
    'Custom application typography',
  ],

  featuresAr: [
    'شاشة بداية وواجهة ترحيبية متحركة',
    'نظام تحميل هيكلي Shimmer مخصص',
    'لوحة تحكم رئيسية',
    'واجهة للبحث عن الأطباء',
    'فلاتر حسب تخصص الطبيب',
    'شبكة للأطباء المفضلين',
    'قائمة بأفضل الأطباء',
    'صفحة تفاصيل الطبيب',
    'عرض تقييم الطبيب وتخصصه',
    'عرض سنوات الخبرة وعدد المرضى والموقع',
    'قسم السيرة الذاتية للطبيب',
    'زر بدء حجز الموعد',
    'واجهات متجاوبة باستخدام ScreenUtil',
    'أنيميشن Shimmer مخصص',
    'نظام تنقل مركزي باستخدام Named Routes',
    'التحقق الآمن من بيانات التنقل',
    'نظام Typography مخصص للتطبيق',
  ],

  focusEn:
      'Feature-first architecture, custom skeleton loading, responsive UI, defensive routing, reusable components, and a maintainable Flutter foundation designed for future backend and booking integration.',

  focusAr:
      'بنية Feature-First منظمة، نظام تحميل هيكلي مخصص، واجهة متجاوبة، نظام تنقل آمن، مكونات قابلة لإعادة الاستخدام، وأساس برمجي قابل للصيانة والتوسع مستقبلاً لربط الـBackend وتنفيذ نظام حجز المواعيد.',

  stack: [
    'Flutter',
    'Dart',
    'flutter_screenutil',
    'Custom Animations',
    'Navigator',
    'setState',
  ],

  demoUrl: 'https://mydoctor-sy.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/MyDoctor',
  imageKeys: [
    'project6',
    'project7',
    'project8',
    'project9',
    'project10',
  ],
},
{
  id: 4,
  index: '07',
  titleEn: 'Syrian Cart',
  titleAr: 'السلة السورية',

  descShortEn:
      'A polished Flutter e-commerce application UI featuring product discovery, categories, search, favorites, cart management, and a complete customer-focused shopping flow.',

  descShortAr:
      'واجهة تطبيق تجارة إلكترونية احترافية مبنية باستخدام Flutter، تتضمن استكشاف المنتجات، التصنيفات، البحث، المفضلة، إدارة السلة، وتجربة تسوق متكاملة للمستخدم.',

  descLongEn:
      'A production-oriented Flutter e-commerce front-end built with a feature-first architecture, custom design system, reusable UI components, and native Flutter animations. The app covers the customer journey from an animated splash screen and product discovery to product details, favorites, cart management, profile, and checkout. It uses Flutter core APIs for navigation, animations, and state management without relying on external UI or state-management packages.',

  descLongAr:
      'واجهة متجر إلكتروني متقدمة مبنية باستخدام Flutter، تعتمد على بنية Feature-First مع نظام تصميم مخصص ومكونات واجهة قابلة لإعادة الاستخدام وأنيميشنات مبنية باستخدام أدوات Flutter الأساسية. يغطي التطبيق رحلة المستخدم من شاشة البداية المتحركة واستكشاف المنتجات، إلى تفاصيل المنتج، المفضلة، إدارة السلة، الملف الشخصي، والدفع. يعتمد المشروع على إمكانيات Flutter الأصلية للتنقل والأنيميشن وإدارة الحالة دون الاعتماد على حزم خارجية للواجهات أو إدارة الحالة.',

  featuresEn: [
    'Animated splash screen',
    'Custom animated bottom navigation',
    'Product discovery and categories',
    'Product search interface',
    'Product details with hero transition',
    'Favorites management',
    'Cart management with quantity controls',
    'Live cart total calculation',
    'Product filtering and browsing',
    'Notification center',
    'Profile and account settings',
    'Guest user support',
    'Login and signup screens',
    'Checkout flow',
    'Custom page transitions',
    'Responsive product grid',
    'Reusable design system',
    'Lightweight native Flutter animations',
  ],

  featuresAr: [
    'شاشة بداية متحركة',
    'شريط تنقل سفلي مخصص ومتفاعل',
    'استكشاف المنتجات والتصنيفات',
    'واجهة بحث عن المنتجات',
    'صفحة تفاصيل المنتج مع انتقال Hero',
    'إدارة المنتجات المفضلة',
    'إدارة سلة المشتريات والتحكم بالكميات',
    'حساب إجمالي السلة بشكل مباشر',
    'تصفح واستكشاف المنتجات',
    'مركز إشعارات',
    'الملف الشخصي وإعدادات الحساب',
    'دعم المستخدم الضيف',
    'شاشات تسجيل الدخول وإنشاء الحساب',
    'واجهة الدفع',
    'انتقالات مخصصة بين الصفحات',
    'شبكة منتجات متجاوبة',
    'نظام تصميم مخصص وقابل لإعادة الاستخدام',
    'أنيميشنات خفيفة مبنية باستخدام Flutter',
  ],

  focusEn:
      'Clean feature-first architecture, reusable components, custom animations, responsive UI, and maintainable Flutter code without external UI or state-management packages.',

  focusAr:
      'بنية Feature-First منظمة، مكونات قابلة لإعادة الاستخدام، أنيميشنات مخصصة، واجهة متجاوبة، وكود Flutter قابل للصيانة دون الاعتماد على حزم خارجية للواجهات أو إدارة الحالة.',

  stack: [
    'Flutter',
    'Dart',
    'Native Flutter Animations',
    'Custom Routing',
  ],

  demoUrl: 'https://syrian-cart.netlify.app/',
  codeUrl: 'https://github.com/SaadSinan-dev/SyrianCart',
  imageKeys: [
    'project14',
    'project13',
    'project15',
  ],
},
];
