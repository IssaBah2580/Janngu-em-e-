import { Proverb, Lesson, QuizQuestion, GrammarCategory } from './types.ts';

export const PROVERBS: Proverb[] = [
  {
    id: '1',
    pulaar: "Nehdi ko damal ganndal",
    translations: {
      fr: "La discipline est la porte du savoir",
      en: "Discipline is the door to knowledge",
      es: "La disciplina es la puerta del conocimiento",
      ar: "الانضباط هو باب المعرفة"
    }
  },
  {
    id: '2',
    pulaar: "Cellal ko afo ngalu",
    translations: {
      fr: "La santé est l’aînée de la fortune",
      en: "Health comes before wealth",
      es: "La salud es la primogénita de la fortuna",
      ar: "الصحة هي أقدم من الثروة"
    }
  },
  {
    id: '3',
    pulaar: "Mawɗo ko fawru ganndal",
    translations: {
      fr: "Le vieux est le grenier du savoir",
      en: "An elder is the storehouse of knowledge",
      es: "El anciano es el granero del conocimiento",
      ar: "الكبير هو مخزن المعرفة"
    }
  }
];

export const GRAMMAR_COMPILATION: GrammarCategory[] = [
  {
    id: 'pronouns',
    title: { en: "Pronouns", fr: "Pronoms", pulaar: "Lomto" },
    sections: [
      {
        title: { en: "Reflexive Pronouns (Lomto innitto)", fr: "Pronoms Réflexifs (Lomto innitto)" },
        items: [
          { pulaar: "miin hoore am", en: "Myself", fr: "Moi-même" },
          { pulaar: "aan hoore maa", en: "Yourself", fr: "Toi-même / Vous-même" },
          { pulaar: "kanko hoore makko", en: "Himself / Herself", fr: "Lui-même / Elle-même" },
          { pulaar: "kanngel hoore maggel", en: "Itself", fr: "Lui-même / Elle-même (objet)" },
          { pulaar: "kam hoore mum", en: "Oneself", fr: "Soi-même" },
          { pulaar: "enen e koye men", en: "Ourselves", fr: "Nous-mêmes" },
          { pulaar: "onon e koye mon", en: "Yourselves", fr: "Vous-mêmes" },
          { pulaar: "kambe e koye mabbe", en: "Themselves", fr: "Eux-mêmes / Elles-mêmes" },
        ]
      },
      {
        title: { en: "Personal Pronouns", fr: "Pronoms Personnels" },
        items: [
          { pulaar: "mi", en: "I", fr: "Je" },
          { pulaar: "am", en: "Me", fr: "Moi" },
          { pulaar: "en", en: "We", fr: "Nous" },
          { pulaar: "men / enen", en: "Us", fr: "Nous (objet)" },
          { pulaar: "aan", en: "You (sing.)", fr: "Tu" },
          { pulaar: "onon", en: "You (plur.)", fr: "Vous" },
          { pulaar: "o", en: "He / She", fr: "Il / Elle" },
          { pulaar: "makko", en: "Him / Her", fr: "Lui / Elle" },
          { pulaar: "dum / ngel", en: "It", fr: "Il / Elle (objet)" },
        ]
      },
      {
        title: { en: "Demonstrative Pronouns (Jooporde)", fr: "Pronoms Démonstratifs (Jooporde)" },
        items: [
          { pulaar: "oo / ndee / nduu / koo", en: "This", fr: "Ceci / Ce / Cette" },
          { pulaar: "ngela / oya / oon", en: "That", fr: "Cela / Ce / Cette" },
          { pulaar: "dee / dii", en: "These", fr: "Ceux-ci / Celles-ci" },
          { pulaar: "diin / diya / ɓeya", en: "Those", fr: "Ceux-là / Celles-là" },
          { pulaar: "moni", en: "Who", fr: "Qui" },
          { pulaar: "mo", en: "Whom", fr: "Qui (complément)" },
          { pulaar: "ngel / ngal / kol", en: "Which", fr: "Lequel / Laquelle" },
          { pulaar: "holi / hol", en: "What", fr: "Quoi / Que" },
        ]
      },
      {
        title: { en: "Possessive Adjectives (Sifaa jeyirɗo)", fr: "Adjectifs Possessifs (Sifaa jeyirɗo)" },
        items: [
          { pulaar: "am", en: "My", fr: "Mon / Ma / Mes", example: "deftere am" },
          { pulaar: "maa", en: "Your", fr: "Ton / Ta / Tes", example: "deftere maa" },
          { pulaar: "makko", en: "His / Her", fr: "Son / Sa / Ses", example: "deftere makko" },
          { pulaar: "maggel", en: "Its", fr: "Son / Sa / Ses", example: "laaci maggel" },
          { pulaar: "men", en: "Our", fr: "Notre / Nos", example: "deftere men" },
          { pulaar: "mon", en: "Your (plur.)", fr: "Votre / Vos", example: "deftere mon" },
          { pulaar: "mabbe", en: "Their", fr: "Leur / Leurs", example: "deftere mabbe" },
        ]
      }
    ]
  },
  {
    id: 'verbs',
    title: { en: "Essential Verbs", fr: "Verbes Essentiels", pulaar: "Gollal" },
    sections: [
      {
        title: { en: "To Have (Avoir / dañde)", fr: "Avoir (dañde)" },
        items: [
          { pulaar: "mi dañii", en: "I have", fr: "J'ai" },
          { pulaar: "a dañii", en: "You have", fr: "Tu as" },
          { pulaar: "o dañii", en: "He has / She has", fr: "Il a / Elle a" },
          { pulaar: "en ndañii", en: "We have", fr: "Nous avons" },
          { pulaar: "on ndañii", en: "You have (plur.)", fr: "Vous avez" },
          { pulaar: "ɓe ndañii", en: "They have", fr: "Ils/Elles ont" },
        ]
      },
      {
        title: { en: "To Come (Venir / arde)", fr: "Venir (arde)" },
        items: [
          { pulaar: "mi arii", en: "I come", fr: "Je viens" },
          { pulaar: "a arii", en: "You come", fr: "Tu viens" },
          { pulaar: "o arii", en: "He comes / She comes", fr: "Il vient / Elle vient" },
          { pulaar: "ngel arii", en: "It comes", fr: "Il/Elle vient" },
          { pulaar: "en ngarii", en: "We come", fr: "Nous venons" },
        ]
      },
      {
        title: { en: "To Be (Être / wonde / laataade)", fr: "Être (wonde / laataade)" },
        items: [
          { pulaar: "mi wonii / laatiima", en: "I am", fr: "Je suis" },
          { pulaar: "a wonii / laatiima", en: "You are", fr: "Tu es" },
          { pulaar: "o wonii / laatiima", en: "He is / She is", fr: "Il est / Elle est" },
          { pulaar: "ngel wonii", en: "It is", fr: "C'est / Il est" },
          { pulaar: "en ngonii", en: "We are", fr: "Nous sommes" },
          { pulaar: "on ngonii", en: "You are (pl.)", fr: "Vous êtes" },
          { pulaar: "ɓe ngonii", en: "They are", fr: "Ils/Elles sont" },
        ]
      }
    ]
  },
  {
    id: 'phrases',
    title: { en: "Key Phrases (Yeru)", fr: "Phrases Clés (Yeru)", pulaar: "Konngudi" },
    sections: [
      {
        title: { en: "Sentence Examples", fr: "Exemples de Phrases" },
        items: [
          { pulaar: "neddo kala ena foti taweede", en: "Everybody should be there", fr: "Tout le monde devrait être là" },
          { pulaar: "yoga e yimbe ina wonde laambe", en: "Some people want to be president", fr: "Certaines personnes veulent être président" },
        ]
      }
    ]
  }
];

export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: "Salminaangu",
    subtitle: "Salutations",
    vocabulary: [
      { 
        pulaar: "Jam waali", 
        translations: { 
          fr: "Bonjour", en: "Good morning", es: "Buenos días", ar: "صباح الخير" 
        } 
      },
      { 
        pulaar: "Jam ñalli", 
        translations: { 
          fr: "Bonsoir", en: "Good afternoon", es: "Buenas tardes", ar: "مساء الخير" 
        } 
      },
      { 
        pulaar: "Jam hiiri", 
        translations: { 
          fr: "Bonsoir (nuit)", en: "Good evening", es: "Buenas noches", ar: "مساء الخير (ليلاً)" 
        } 
      },
      { 
        pulaar: "Mbaalen he jam", 
        translations: { 
          fr: "Bonne nuit", en: "Good night", es: "Buenas noches", ar: "تصبح على خير" 
        } 
      }
    ],
    dialogues: [
      { 
        speaker: "Issa", 
        pulaar: "Jam waali Muusaa", 
        translations: { fr: "Bonjour Moussa", en: "Good morning Moussa", es: "Buenos días Moussa", ar: "صباح الخير موسى" } 
      },
      { 
        speaker: "Muusaa", 
        pulaar: "Aɗa selli?", 
        translations: { fr: "Tu vas bien ?", en: "Are you well?", es: "¿Estás bien?", ar: "هل أنت بخير؟" } 
      },
      { 
        speaker: "Issa", 
        pulaar: "Jam tan. Aan ne?", 
        translations: { fr: "Bien. Et toi ?", en: "Fine. And you?", es: "Bien. ¿Y tú?", ar: "بخير. وأنت؟" } 
      },
      { 
        speaker: "Muusaa", 
        pulaar: "Eɗen jetta Geno", 
        translations: { fr: "Dieu merci", en: "Thank God", es: "Gracias a Dios", ar: "الحمد لله" } 
      }
    ]
  },
  {
    id: 'l2',
    title: "Yoga he konngudi",
    subtitle: "Quelques phrases",
    vocabulary: [
      { 
        pulaar: "Hol no gorruda?", 
        translations: { fr: "Comment vas-tu ?", en: "How are you?", es: "¿Cómo estás?", ar: "كيف حالك؟" } 
      },
      { 
        pulaar: "Mido selli", 
        translations: { fr: "Je vais bien", en: "I am well", es: "Estoy bien", ar: "أنا بخير" } 
      },
      { 
        pulaar: "Hol to jahta?", 
        translations: { fr: "Où vas-tu ?", en: "Where are you going?", es: "¿A dónde vas?", ar: "إلى أين أنت ذاهب؟" } 
      }
    ],
    conversations: [
      {
        category: "Achat (Shopping)",
        lines: [
          { 
            speaker: "Issa", 
            pulaar: "Hol no foti de paɗe jarata?", 
            translations: { fr: "Combien coûtent ces chaussures ?", en: "How much are these shoes?", es: "¿Cuánto cuestan estos zapatos?", ar: "بكم هذا الحذاء؟" } 
          }
        ]
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    translations: {
      fr: {
        question: "Comment dit-on 'Bonjour' en Pulaar ?",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam waali' est utilisé le matin."
      },
      en: {
        question: "How do you say 'Good morning' in Pulaar?",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam waali' is used in the morning."
      },
      es: {
        question: "¿Cómo se dice 'Buenos días' en Pulaar?",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam waali' se usa por la mañana."
      },
      ar: {
        question: "كيف تقول 'صباح الخير' بالبولار؟",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "تُستخدم 'Jam waali' في الصباح."
      }
    },
    correctAnswerIndex: 0
  },
  {
    id: 'q2',
    translations: {
      fr: {
        question: "Que signifie 'Cellal ko afo ngalu' ?",
        options: ["La discipline est clé", "La santé précède la richesse", "L'aîné est sage", "Le savoir est une force"],
        explanation: "Cellal signifie santé, ngalu signifie richesse."
      },
      en: {
        question: "What does 'Cellal ko afo ngalu' mean?",
        options: ["Discipline is key", "Health comes before wealth", "The elder is wise", "Knowledge is power"],
        explanation: "Cellal means health, ngalu means wealth."
      },
      es: {
        question: "¿Qué significa 'Cellal ko afo ngalu'?",
        options: ["La disciplina es clave", "La salud precede a la richesse", "El anciano es sabio", "El conocimiento es poder"],
        explanation: "Cellal significa salud, ngalu significa riqueza."
      },
      ar: {
        question: "ماذا يعني 'Cellal ko afo ngalu'؟",
        options: ["الانضباط هو المفتاح", "الصحة قبل الثروة", "الكبير حكيم", "المعرفة قوة"],
        explanation: "Cellal تعني الصحة، و ngalu تعني الثروة."
      }
    },
    correctAnswerIndex: 1
  }
];