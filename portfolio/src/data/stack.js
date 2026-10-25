/**
 * Curated technical capability data for the Stack section.
 *
 * Web entries are limited to technologies and engineering patterns evidenced by
 * this portfolio's source or the existing project records. Mobile entries keep
 * the original skill set intact, but separate the strongest capabilities from
 * supporting skills so the section communicates hierarchy instead of volume.
 */

export const LEVELS = {
  Expert: { en: 'Expert', ar: 'خبير' },
  Advanced: { en: 'Advanced', ar: 'متقدم' },
  Intermediate: { en: 'Intermediate', ar: 'متوسط' },
};

export const STACK_TABS = [
  { id: 'web', labelEn: 'Web', labelAr: 'ويب' },
  { id: 'mobile', labelEn: 'Mobile', labelAr: 'موبايل' },
];

export const stackCategories = {
  web: {
    titleEn: 'Full-stack web development',
    titleAr: 'تطوير ويب متكامل وتجارب تفاعلية',
    descriptionEn:
      'Modern interface engineering, backend services, APIs, database security, and purposeful motion — limited to capabilities demonstrated in the portfolio and project work.',
    descriptionAr:
      'هندسة واجهات حديثة وخدمات خلفية وواجهات API وأمان قواعد البيانات وحركة هادفة — ضمن القدرات المثبتة في البورتفوليو والمشاريع.',
    core: [
      {
        nameEn: 'React',
        nameAr: 'React',
        descEn: 'Component-driven interfaces with local state, reusable UI, and accessible interaction patterns',
        descAr: 'واجهات مبنية على المكونات مع حالة محلية وعناصر قابلة لإعادة الاستخدام وأنماط تفاعل متاحة للجميع',
      },
      {
        nameEn: 'JavaScript',
        nameAr: 'JavaScript',
        descEn: 'Application logic, interaction behavior, data transformation, and browser-side engineering',
        descAr: 'منطق التطبيقات وسلوك التفاعل وتحويل البيانات وهندسة الواجهة داخل المتصفح',
      },
      {
        nameEn: 'Tailwind CSS',
        nameAr: 'Tailwind CSS',
        descEn: 'Responsive, token-led interface implementation with consistent spacing and state styling',
        descAr: 'تنفيذ واجهات متجاوبة مبنية على رموز تصميم مع اتساق في المسافات وحالات التفاعل',
      },
      {
        nameEn: 'Framer Motion',
        nameAr: 'Framer Motion',
        descEn: 'Scroll, presence, reveal, and interaction motion with reduced-motion support',
        descAr: 'حركة للتمرير والظهور والانتقالات والتفاعل مع دعم تقليل الحركة',
      },
      {
        nameEn: 'Supabase / PostgreSQL',
        nameAr: 'Supabase / PostgreSQL',
        descEn: 'SQL-backed application data, realtime behavior, and security-conscious backend design',
        descAr: 'بيانات تطبيقات مبنية على SQL وتحديثات لحظية وتصميم خلفي يراعي الأمان',
      },
      {
        nameEn: 'REST APIs',
        nameAr: 'واجهات REST',
        descEn: 'Structured service integration, request flows, data modeling, and external API consumption',
        descAr: 'تكامل منظم مع الخدمات وتدفقات الطلبات ونمذجة البيانات واستهلاك الواجهات الخارجية',
      },
    ],
    groups: [
      {
        id: 'web-frontend',
        index: '01',
        titleEn: 'Frontend Engineering',
        titleAr: 'هندسة الواجهات',
        items: [
          {
            nameEn: 'Component Architecture',
            nameAr: 'معمارية المكونات',
            descEn: 'Small reusable components with clear ownership, composition, and local concerns',
            descAr: 'مكونات صغيرة قابلة لإعادة الاستخدام بملكية واضحة وتركيب منظم ومسؤوليات محلية',
          },
          {
            nameEn: 'Responsive UI',
            nameAr: 'واجهات متجاوبة',
            descEn: 'Layouts that adapt intentionally across desktop, tablet, and mobile breakpoints',
            descAr: 'تخطيطات تتكيّف بشكل مقصود بين سطح المكتب والتابلت والموبايل',
          },
          {
            nameEn: 'Accessibility',
            nameAr: 'إتاحة الاستخدام',
            descEn: 'Semantic controls, keyboard flows, focus treatment, ARIA, and reduced-motion behavior',
            descAr: 'عناصر دلالية وتنقل بلوحة المفاتيح وحالات تركيز وARIA ودعم تقليل الحركة',
          },
        ],
      },
      {
        id: 'web-backend',
        index: '02',
        titleEn: 'Backend Systems',
        titleAr: 'الأنظمة الخلفية',
        items: [
          {
            nameEn: 'Row-Level Security & Realtime',
            nameAr: 'أمان الصفوف والتحديث اللحظي',
            descEn: 'Database-level access rules and realtime state synchronized with application flows',
            descAr: 'قواعد وصول على مستوى قاعدة البيانات وحالة لحظية متزامنة مع تدفقات التطبيق',
          },
          {
            nameEn: 'Deno Edge Functions',
            nameAr: 'Deno Edge Functions',
            descEn: 'Server-side business logic placed behind application boundaries where client trust is insufficient',
            descAr: 'منطق أعمال على الخادم خلف حدود التطبيق عندما لا يكون الاعتماد على العميل كافيًا',
          },
        ],
      },
      {
        id: 'web-motion',
        index: '03',
        titleEn: 'Creative Interaction',
        titleAr: 'التفاعل الإبداعي',
        items: [
          {
            nameEn: 'Scroll-driven Motion',
            nameAr: 'حركة مرتبطة بالتمرير',
            descEn: 'Controlled scroll progress, parallax depth, and viewport-based content reveals',
            descAr: 'تحكم في تقدم التمرير وعمق Parallax وإظهار المحتوى وفق مساحة العرض',
          },
          {
            nameEn: 'Interaction Systems',
            nameAr: 'أنظمة التفاعل',
            descEn: 'Purposeful hover, cursor, magnetic, and presence feedback built from composable primitives',
            descAr: 'تفاعلات هادفة للمؤشر والتحويم والجذب والظهور مبنية من وحدات قابلة للتركيب',
          },
        ],
      },
      {
        id: 'web-tooling',
        index: '04',
        titleEn: 'Engineering & Delivery',
        titleAr: 'الهندسة والتسليم',
        items: [
          {
            nameEn: 'Vite',
            nameAr: 'Vite',
            descEn: 'Lean frontend build tooling for local development and production bundles',
            descAr: 'أدوات بناء خفيفة لتطوير الواجهة محليًا وتجهيز حزم الإنتاج',
          },
          {
            nameEn: 'Git & GitHub',
            nameAr: 'Git وGitHub',
            descEn: 'Versioned delivery, source control, repository workflows, and public project maintenance',
            descAr: 'إدارة الإصدارات والتحكم بالمصدر وسير عمل المستودعات وصيانة المشاريع العامة',
          },
        ],
      },
    ],
  },

  mobile: {
    titleEn: 'Mobile engineering',
    titleAr: 'هندسة تطبيقات الموبايل',
    descriptionEn:
      'Flutter-first product engineering with structured state, layered architecture, API integration, responsive interfaces, testing, and delivery practices.',
    descriptionAr:
      'هندسة منتجات تعتمد Flutter مع إدارة حالة منظمة ومعمارية طبقية وتكامل APIs وواجهات متجاوبة واختبارات وممارسات تسليم.',
    core: [
      {
        nameEn: 'Flutter',
        nameAr: 'فلاتر',
        descEn: 'Cross-platform UI toolkit for mobile, web and desktop',
        descAr: 'إطار عمل متعدد المنصات للموبايل والويب وسطح المكتب',
        level: 'Expert',
      },
      {
        nameEn: 'Dart',
        nameAr: 'دارت',
        descEn: 'Type-safe, modern language powering Flutter',
        descAr: 'لغة حديثة وآمنة تشغّل Flutter',
        level: 'Expert',
      },
      {
        nameEn: 'Bloc / Cubit',
        nameAr: 'بلوك / كيوبت',
        descEn: 'Predictable state with event-driven architecture',
        descAr: 'حالة متوقعة مع معمارية مدفوعة بالأحداث',
        level: 'Expert',
      },
      {
        nameEn: 'Clean Architecture',
        nameAr: 'المعمارية النظيفة',
        descEn: 'Domain-driven layered structure',
        descAr: 'هيكل طبقي مدفوع بالنطاق',
        level: 'Advanced',
      },
      {
        nameEn: 'REST APIs',
        nameAr: 'واجهات REST',
        descEn: 'Dio, http and interceptor-based clients',
        descAr: 'Dio وhttp وعملاء مبنية على Interceptors',
        level: 'Expert',
      },
      {
        nameEn: 'Responsive Design',
        nameAr: 'التصميم المتجاوب',
        descEn: 'Adaptive layouts for all screen sizes',
        descAr: 'تخطيطات تكيفية لجميع أحجام الشاشات',
        level: 'Expert',
      },
    ],
    groups: [
      {
        id: 'mobile-state',
        index: '01',
        titleEn: 'State & Architecture',
        titleAr: 'الحالة والمعمارية',
        items: [
          {
            nameEn: 'Riverpod',
            nameAr: 'ريفربود',
            descEn: 'Compile-safe reactive state management',
            descAr: 'إدارة حالة تفاعلية وآمنة في وقت الترجمة',
            level: 'Intermediate',
          },
          {
            nameEn: 'Provider',
            nameAr: 'بروفايدر',
            descEn: 'Lightweight dependency injection and state',
            descAr: 'حقن تبعيات خفيف وإدارة حالة بسيطة',
            level: 'Advanced',
          },
          {
            nameEn: 'MVVM Pattern',
            nameAr: 'نمط MVVM',
            descEn: 'Model-View-ViewModel separation of concerns',
            descAr: 'فصل المسؤوليات بين النموذج والعرض وViewModel',
            level: 'Advanced',
          },
        ],
      },
      {
        id: 'mobile-backend',
        index: '02',
        titleEn: 'Backend Services',
        titleAr: 'الخدمات الخلفية',
        items: [
          {
            nameEn: 'Authentication',
            nameAr: 'المصادقة',
            descEn: 'Email, Google, phone and social sign-in',
            descAr: 'تسجيل دخول بالإيميل وGoogle والهاتف والشبكات الاجتماعية',
            level: 'Expert',
          },
          {
            nameEn: 'Firestore',
            nameAr: 'فايرستور',
            descEn: 'Real-time NoSQL cloud database',
            descAr: 'قاعدة بيانات سحابية NoSQL في الوقت الفعلي',
            level: 'Expert',
          },
          {
            nameEn: 'Cloud Storage',
            nameAr: 'التخزين السحابي',
            descEn: 'Scalable media and file storage',
            descAr: 'تخزين ملفات ووسائط قابل للتوسع',
            level: 'Advanced',
          },
        ],
      },
      {
        id: 'mobile-interface',
        index: '03',
        titleEn: 'Data & Interface',
        titleAr: 'البيانات والواجهات',
        items: [
          {
            nameEn: 'JSON & Serialization',
            nameAr: 'JSON والتسلسل',
            descEn: 'json_serializable, freezed and data modeling',
            descAr: 'json_serializable وfreezed ونمذجة البيانات',
            level: 'Expert',
          },
          {
            nameEn: 'Custom Widgets',
            nameAr: 'ويدجتس مخصصة',
            descEn: 'Pixel-perfect custom UI components',
            descAr: 'مكونات واجهة مخصصة بدقة بكسل',
            level: 'Expert',
          },
          {
            nameEn: 'Animations',
            nameAr: 'الأنيميشن',
            descEn: 'Implicit, explicit and Rive animations',
            descAr: 'أنيميشن ضمني وصريح وRive',
            level: 'Advanced',
          },
        ],
      },
      {
        id: 'mobile-quality',
        index: '04',
        titleEn: 'Quality & Delivery',
        titleAr: 'الجودة والتسليم',
        items: [
          {
            nameEn: 'Unit Testing',
            nameAr: 'اختبار الوحدات',
            descEn: 'flutter_test, mockito and coverage reports',
            descAr: 'flutter_test وmockito وتقارير التغطية',
            level: 'Intermediate',
          },
          {
            nameEn: 'Flutter DevTools',
            nameAr: 'أدوات المطور',
            descEn: 'Performance profiling and widget inspection',
            descAr: 'تحليل الأداء وفحص الـ widgets',
            level: 'Advanced',
          },
          {
            nameEn: 'Git & GitHub',
            nameAr: 'Git وGitHub',
            descEn: 'Branching, pull requests and collaborative workflows',
            descAr: 'التفريع وطلبات السحب وسير العمل التعاوني',
            level: 'Expert',
          },
          {
            nameEn: 'CI/CD & Deployment',
            nameAr: 'النشر التلقائي',
            descEn: 'GitHub Actions, Fastlane and app store delivery',
            descAr: 'GitHub Actions وFastlane ورفع المتاجر',
            level: 'Intermediate',
          },
        ],
      },
    ],
  },
};
