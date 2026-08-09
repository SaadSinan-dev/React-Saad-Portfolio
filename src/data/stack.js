/**
 * The technical index.
 *
 * Presented as a structured spec table rather than a wall of badges: groups are
 * the outline, items are the entries. `level` is one of the three keys in
 * LEVELS below and drives a three-segment indicator, not a coloured pill.
 */

export const LEVELS = {
  Expert: { en: 'Expert', ar: 'خبير', steps: 3 },
  Advanced: { en: 'Advanced', ar: 'متقدم', steps: 2 },
  Intermediate: { en: 'Intermediate', ar: 'متوسط', steps: 1 },
};

export const stackGroups = [
  {
    id: 'core',
    index: '01',
    titleEn: 'Core',
    titleAr: 'الأساس',
    items: [
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
    ],
  },
  {
    id: 'state',
    index: '02',
    titleEn: 'State Management',
    titleAr: 'إدارة الحالة',
    items: [
      {
        nameEn: 'Riverpod',
        nameAr: 'ريفربود',
        descEn: 'Compile-safe reactive state management',
        descAr: 'إدارة حالة تفاعلية وآمنة في وقت الترجمة',
        level: 'Intermediate',
      },
      {
        nameEn: 'Bloc / Cubit',
        nameAr: 'بلوك / كيوبت',
        descEn: 'Predictable state with event-driven architecture',
        descAr: 'حالة متوقعة مع معمارية مدفوعة بالأحداث',
        level: 'Expert',
      },
      {
        nameEn: 'Provider',
        nameAr: 'بروفايدر',
        descEn: 'Lightweight dependency injection and state',
        descAr: 'حقن تبعيات خفيف وإدارة حالة بسيطة',
        level: 'Advanced',
      },
    ],
  },
  {
    id: 'architecture',
    index: '03',
    titleEn: 'Architecture',
    titleAr: 'المعمارية',
    items: [
      {
        nameEn: 'Clean Architecture',
        nameAr: 'المعمارية النظيفة',
        descEn: 'Domain-driven layered structure',
        descAr: 'هيكل طبقي مدفوع بالنطاق',
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
    id: 'backend',
    index: '04',
    titleEn: 'Firebase',
    titleAr: 'فايربيز',
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
    id: 'networking',
    index: '05',
    titleEn: 'APIs & Networking',
    titleAr: 'الشبكات والـ APIs',
    items: [
      {
        nameEn: 'REST APIs',
        nameAr: 'واجهات REST',
        descEn: 'Dio, http and interceptor-based clients',
        descAr: 'Dio وhttp وعملاء مبنية على Interceptors',
        level: 'Expert',
      },
      {
        nameEn: 'JSON & Serialization',
        nameAr: 'JSON والتسلسل',
        descEn: 'json_serializable, freezed and data modeling',
        descAr: 'json_serializable وfreezed ونمذجة البيانات',
        level: 'Expert',
      },
    ],
  },
  {
    id: 'interface',
    index: '06',
    titleEn: 'Interface & Motion',
    titleAr: 'الواجهات والحركة',
    items: [
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
      {
        nameEn: 'Responsive Design',
        nameAr: 'التصميم المتجاوب',
        descEn: 'Adaptive layouts for all screen sizes',
        descAr: 'تخطيطات تكيفية لجميع أحجام الشاشات',
        level: 'Expert',
      },
    ],
  },
  {
    id: 'quality',
    index: '07',
    titleEn: 'Testing & Debugging',
    titleAr: 'الاختبار والتصحيح',
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
    ],
  },
  {
    id: 'delivery',
    index: '08',
    titleEn: 'Git & Delivery',
    titleAr: 'Git والنشر',
    items: [
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
];
