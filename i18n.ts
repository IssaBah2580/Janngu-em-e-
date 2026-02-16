import { LanguagePair } from './types.ts';

export type UIStrings = {
  home: string;
  lessons: string;
  settings: string;
  quiz: string;
  grammar: string;
  proverbs: string;
  welcome: string;
  subtitle: string;
  back: string;
  mode_reveal: string;
  mode_learning: string;
  play: string;
  slow: string;
  reveal_translation: string;
  vocabulary: string;
  dialogue: string;
  score: string;
  try_again: string;
  congrats: string;
  continue: string;
  language_pair: string;
  pulaar_wisdom: string;
  audio_lessons_desc: string;
  grammar_desc: string;
  quiz_desc: string;
  community: string;
  website: string;
  contact_wa: string;
  follow_us: string;
  offline_mode: string;
  offline_desc: string;
  internet_required: string;
  other_apps: string;
  dictionary: string;
  word_search: string;
  calendar: string;
  dark_mode: string;
  appearance: string;
  install_app: string;
  install_desc: string;
  install_btn: string;
  ios_install_hint: string;
  donation_title: string;
  donation_msg: string;
  donation_btn: string;
  close: string;
  about_app: string;
  app_desc_full: string;
  privacy_policy: string;
  version: string;
  teach_friend: string;
  teach_friend_desc: string;
};

const translations: Record<string, UIStrings> = {
  fr: {
    home: "Accueil",
    lessons: "Leçons",
    settings: "Options",
    quiz: "Quiz",
    grammar: "Grammaire",
    proverbs: "Proverbes",
    welcome: "Janngu Ɗemɗe",
    subtitle: "Apprenez les langues africaines avec des leçons interactives.",
    back: "Retour",
    mode_reveal: "Mode: Révéler",
    mode_learning: "Mode: Apprentissage",
    play: "Lire",
    slow: "Lent",
    reveal_translation: "Cliquez pour révéler la traduction",
    vocabulary: "Vocabulaire",
    dialogue: "Dialogue",
    score: "Votre Score",
    try_again: "Réessayer",
    congrats: "Bien joué !",
    continue: "Continuer",
    language_pair: "Paire de Langues",
    pulaar_wisdom: "Sagesse ancestrale de nos aînés.",
    audio_lessons_desc: "Dialogues et vocabulaire interactifs.",
    grammar_desc: "Maîtrisez les règles et la structure.",
    quiz_desc: "Testez vos connaissances et progressez.",
    community: "Communauté & Support",
    website: "Site Web Officiel",
    contact_wa: "Contact WhatsApp",
    follow_us: "Suivez-nous",
    offline_mode: "Mode Hors-ligne",
    offline_desc: "Leçons et quiz disponibles sans internet.",
    internet_required: "Internet requis pour l'audio (TTS).",
    other_apps: "Mes autres applications",
    dictionary: "Dictionnaire Pulaar",
    word_search: "Mots mêlés Pulaar",
    calendar: "Calendrier Pulaar",
    dark_mode: "Mode Nuit",
    appearance: "Apparence",
    install_app: "Installer l'application",
    install_desc: "Utilisez Janngu comme une application native sur votre écran d'accueil.",
    install_btn: "Installer maintenant",
    ios_install_hint: "Sur iOS : Appuyez sur Partager, puis 'Sur l'écran d'accueil'",
    donation_title: "Soutenez le Projet",
    donation_msg: "Janngu est en plein développement. Votre don, même modeste, nous aide à créer plus de contenu gratuit pour la culture Pulaar.",
    donation_btn: "Faire un don",
    close: "Fermer",
    about_app: "À propos de Janngu Ɗemɗe",
    app_desc_full: "Janngu Ɗemɗe est une plateforme moderne pour apprendre les langues africaines, commençant par le Pulaar, avec des leçons interactives, des proverbes et des quiz.",
    privacy_policy: "Politique de confidentialité",
    version: "Version",
    teach_friend: "Enseigner à un ami",
    teach_friend_desc: "Partagez la culture avec vos proches."
  },
  en: {
    home: "Home",
    lessons: "Lessons",
    settings: "Settings",
    quiz: "Quiz",
    grammar: "Grammar",
    proverbs: "Proverbs",
    welcome: "Janngu Ɗemɗe",
    subtitle: "Learn African languages with modern interactive lessons.",
    back: "Back",
    mode_reveal: "Mode: Reveal",
    mode_learning: "Mode: Learning",
    play: "Play",
    slow: "Slow",
    reveal_translation: "Click to reveal translation",
    vocabulary: "Vocabulary",
    dialogue: "Dialogue",
    score: "Your Score",
    try_again: "Try Again",
    congrats: "Well Done!",
    continue: "Continue",
    language_pair: "Language Pair",
    pulaar_wisdom: "Timeless wisdom from our elders.",
    audio_lessons_desc: "Interactive dialogues and vocabulary.",
    grammar_desc: "Master the rules and structure.",
    quiz_desc: "Test your knowledge and progress.",
    community: "Community & Support",
    website: "Official Website",
    contact_wa: "Contact on WhatsApp",
    follow_us: "Follow Us",
    offline_mode: "Offline Mode",
    offline_desc: "Lessons and quizzes available without internet.",
    internet_required: "Internet required for audio (TTS).",
    other_apps: "My other apps",
    dictionary: "Pulaar Dictionary",
    word_search: "Pulaar Word Search",
    calendar: "Pulaar Calendar",
    dark_mode: "Dark Mode",
    appearance: "Appearance",
    install_app: "Install App",
    install_desc: "Use Janngu like a native app on your home screen.",
    install_btn: "Install Now",
    ios_install_hint: "On iOS: Tap Share, then 'Add to Home Screen'",
    donation_title: "Support the Project",
    donation_msg: "Janngu is under active development. Your contribution helps us create more free content for Pulaar culture.",
    donation_btn: "Make a Donation",
    close: "Close",
    about_app: "About Janngu Ɗemɗe",
    app_desc_full: "Janngu Ɗemɗe is a modern platform for learning African languages, starting with Pulaar, featuring interactive lessons, proverbs, and quizzes.",
    privacy_policy: "Privacy Policy",
    version: "Version",
    teach_friend: "Teach a friend",
    teach_friend_desc: "Share the culture with your loved ones."
  },
  es: {
    home: "Inicio",
    lessons: "Lecciones",
    settings: "Ajustes",
    quiz: "Cuestionario",
    grammar: "Gramática",
    proverbs: "Proverbios",
    welcome: "Janngu Ɗemɗe",
    subtitle: "Aprende lenguas africanas con lecciones interactivas.",
    back: "Volver",
    mode_reveal: "Modo: Revelar",
    mode_learning: "Modo: Aprendizaje",
    play: "Reproducir",
    slow: "Lento",
    reveal_translation: "Haz clic para ver la traducción",
    vocabulary: "Vocabulario",
    dialogue: "Diálogo",
    score: "Tu Puntuación",
    try_again: "Reintentar",
    congrats: "¡Buen trabajo!",
    continue: "Continuar",
    language_pair: "Par de idiomas",
    pulaar_wisdom: "Sabiduría atemporal de nuestros mayores.",
    audio_lessons_desc: "Diálogos y vocabulario interactivos.",
    grammar_desc: "Domina las reglas y la estructura.",
    quiz_desc: "Pon a prueba tus conocimientos.",
    community: "Comunidad y Soporte",
    website: "Sitio Web Oficial",
    contact_wa: "Contacto por WhatsApp",
    follow_us: "Síguenos",
    offline_mode: "Modo sin conexión",
    offline_desc: "Lecciones y cuestionarios disponibles sin internet.",
    internet_required: "Internet requerido para audio (TTS).",
    other_apps: "Mis otras aplicaciones",
    dictionary: "Diccionario Pulaar",
    word_search: "Sopa de letras Pulaar",
    calendar: "Calendario Pulaar",
    dark_mode: "Modo Noche",
    appearance: "Apariencia",
    install_app: "Instalar aplicación",
    install_desc: "Usa Janngu como una app nativa en tu pantalla de inicio.",
    install_btn: "Instalar ahora",
    ios_install_hint: "En iOS: Toca Compartir, luego 'Añadir a pantalla de inicio'",
    donation_title: "Apoya el Proyecto",
    donation_msg: "Janngu está en pleno desarrollo. Tu donación nos ayuda a crear más contenido gratuito para la cultura Pulaar.",
    donation_btn: "Hacer una donación",
    close: "Cerrar",
    about_app: "Acerca de Janngu Ɗemɗe",
    app_desc_full: "Janngu Ɗemɗe es una plataforma moderna para aprender lenguas africanas, empezando por el Pulaar, con lecciones interactivas, proverbios y cuestionarios.",
    privacy_policy: "Política de privacidad",
    version: "Versión",
    teach_friend: "Enseñar a un amigo",
    teach_friend_desc: "Comparte la cultura con tus seres queridos."
  },
  ar: {
    home: "الرئيسية",
    lessons: "الدروس",
    settings: "الإعدادات",
    quiz: "اختبار",
    grammar: "القواعد",
    proverbs: "أمثال",
    welcome: "جانغو ديمدي",
    subtitle: "تعلم اللغات الأفريقية من خلال دروس تفاعلية حديثة.",
    back: "رجوع",
    mode_reveal: "وضع: الكشف",
    mode_learning: "وضع: التعلم",
    play: "تشغيل",
    slow: "بطيء",
    reveal_translation: "انقر لكشف الترجمة",
    vocabulary: "المفردات",
    dialogue: "حوار",
    score: "نتيجتك",
    try_again: "إعادة المحاولة",
    congrats: "أحسنت!",
    continue: "استمرار",
    language_pair: "زوج اللغات",
    pulaar_wisdom: "حكمة خالدة من أجدادنا.",
    audio_lessons_desc: "حوارات ومفردات تفاعلية.",
    grammar_desc: "أتقن القواعد والبنية.",
    quiz_desc: "اختبر معلوماتك وتقدمك.",
    community: "المجتمع والدعم",
    website: "الموقع الرسمي",
    contact_wa: "اتصال واتساب",
    follow_us: "تابعنا",
    offline_mode: "وضع عدم الاتصال",
    offline_desc: "الدروس والاختبارات متاحة بدون إنترنت.",
    internet_required: "الإنترنت مطلوب للصوت (TTS).",
    other_apps: "تطبيقاتي الأخرى",
    dictionary: "قاموس بولار",
    word_search: "كلمات متقاطعة بولار",
    calendar: "تقويم بولار",
    dark_mode: "الوضع الليلي",
    appearance: "المظهر",
    install_app: "تثبيت التطبيق",
    install_desc: "استخدم Janngu كتطبيق أصلي على شاشتك الرئيسية.",
    install_btn: "تثبيت الآن",
    ios_install_hint: "على iOS: اضغط على مشاركة، ثم 'إضافة إلى الشاشة الرئيسية'",
    donation_title: "ادعم المشروع",
    donation_msg: "جانغو قيد التطوير النشط. تساعدنا مساهمتك في إنشاء المزيد من المحتوى المجاني لثقافة البولار.",
    donation_btn: "تبرع الآن",
    close: "إغلاق",
    about_app: "حول جانغو ديمدي",
    app_desc_full: "جانغو ديمدي هي منصة حديثة لتعلم اللغات الأفريقية، بدءاً من لغة البولار، وتتميز بدروس تفاعلية وأمثال واختبارات.",
    privacy_policy: "سياسة الخصوصية",
    version: "الإصدار",
    teach_friend: "علم صديقاً",
    teach_friend_desc: "شارك الثقافة مع أحبائك."
  }
};

export const getI18n = (pair: LanguagePair): UIStrings => {
  if (pair === LanguagePair.PULAAR_ENGLISH || pair === LanguagePair.ENGLISH_FRENCH) {
     return translations.en;
  }
  if (pair === LanguagePair.PULAAR_SPANISH || pair === LanguagePair.FRENCH_SPANISH) {
     return translations.es;
  }
  if (pair === LanguagePair.PULAAR_ARABIC) {
     return translations.ar;
  }
  return translations.fr;
};