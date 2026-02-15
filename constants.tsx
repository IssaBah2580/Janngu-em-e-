
import { Proverb, Lesson, QuizQuestion } from './types.ts';

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
        options: ["La disciplina es clave", "La salud precede a la riqueza", "El anciano es sabio", "El conocimiento es poder"],
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
