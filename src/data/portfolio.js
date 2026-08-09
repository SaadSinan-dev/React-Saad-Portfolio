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
  email: 'saadsenanbusiness@gmail.com',
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
  index: '02',
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
  index: '03',
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
  index: '04',
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
