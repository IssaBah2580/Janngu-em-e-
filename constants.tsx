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
          { pulaar: "a wonii / laatiima", en: "Tu es", fr: "Tu es" },
          { pulaar: "o wonii / laatiima", en: "He is / She is", fr: "Il est / Elle est" },
          { pulaar: "ngel wonii", en: "It is", fr: "C'est / Il est" },
          { pulaar: "en ngonii", en: "We are", fr: "Nous sommes" },
          { pulaar: "on ngonii", en: "You are (pl.)", fr: "Vous êtes" },
          { pulaar: "ɓe ngonii", en: "They are", fr: "Ils/Elles ont" },
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
  },
  {
    id: 'q3',
    translations: {
      fr: {
        question: "Comment dit-on 'Bonsoir' (fin de journée) en Pulaar ?",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam hiiri' est la salutation du soir."
      },
      en: {
        question: "How do you say 'Good evening' in Pulaar?",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam hiiri' is the evening greeting."
      },
      es: {
        question: "¿Cómo se dice 'Buenas noches' (al llegar) en Pulaar?",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam hiiri' es el saludo de la tarde/noche."
      },
      ar: {
        question: "كيف تقول 'مساء الخير' في البولار؟",
        options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"],
        explanation: "'Jam hiiri' هي تحية المساء."
      }
    },
    correctAnswerIndex: 2
  },
  {
    id: 'q4',
    translations: {
      fr: {
        question: "Que signifie 'Mi dañii' ?",
        options: ["Je viens", "Je suis", "J'ai", "Je pars"],
        explanation: "Le verbe 'dañde' signifie obtenir ou avoir."
      },
      en: {
        question: "What does 'Mi dañii' mean?",
        options: ["I come", "I am", "I have", "I leave"],
        explanation: "The verb 'dañde' means to get or to have."
      },
      es: {
        question: "¿Qué significa 'Mi dañii'?",
        options: ["Vengo", "Soy", "Tengo", "Me voy"],
        explanation: "El verbo 'dañde' significa obtener o tener."
      },
      ar: {
        question: "ماذا يعني 'Mi dañii'؟",
        options: ["أنا آتي", "أنا أكون", "أنا أملك", "أنا أغادر"],
        explanation: "الفعل 'dañde' يعني الحصول على أو التملك."
      }
    },
    correctAnswerIndex: 2
  },
  {
    id: 'q5',
    translations: {
      fr: {
        question: "Quel pronom utilise-t-on pour 'Il' ou 'Elle' ?",
        options: ["mi", "a", "o", "en"],
        explanation: "'o' est le pronom personnel de la 3ème personne du singulier."
      },
      en: {
        question: "Which pronoun is used for 'He' or 'She'?",
        options: ["mi", "a", "o", "en"],
        explanation: "'o' is the personal pronoun for the 3rd person singular."
      },
      es: {
        question: "¿Qué pronombre se usa para 'Él' o 'Ella'?",
        options: ["mi", "a", "o", "en"],
        explanation: "'o' es el pronombre personal de la tercera persona del singular."
      },
      ar: {
        question: "أي ضمير يستخدم لـ 'هو' أو 'هي'؟",
        options: ["mi", "a", "o", "en"],
        explanation: "'o' هو الضمير الشخصي للغائب المفرد."
      }
    },
    correctAnswerIndex: 2
  },
  {
    id: 'q6',
    translations: {
      fr: {
        question: "Comment exprime-t-on la possession 'Mon/Ma/Mes' ?",
        options: ["makko", "am", "maa", "men"],
        explanation: "On ajoute 'am' après le nom pour indiquer la possession (ex: deftere am)."
      },
      en: {
        question: "How do you express possession for 'My'?",
        options: ["makko", "am", "maa", "men"],
        explanation: "You add 'am' after the noun to indicate possession (e.g., deftere am)."
      },
      es: {
        question: "¿Cómo se expresa la posesión 'Mi/Mis'?",
        options: ["makko", "am", "maa", "men"],
        explanation: "Se añade 'am' después del sustantivo para indicar posesión (ej: deftere am)."
      },
      ar: {
        question: "كيف تعبر عن الملكية لـ 'ياء المتكلم' (لي)؟",
        options: ["makko", "am", "maa", "men"],
        explanation: "نضيف 'am' بعد الاسم للدلالة على الملكية (مثال: deftere am)."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q7',
    translations: {
      fr: {
        question: "Que signifie le proverbe 'Mawɗo ko fawru ganndal' ?",
        options: ["Le savoir est une force", "Le vieux est le grenier du savoir", "La santé est une richesse", "La discipline est la porte"],
        explanation: "Mawɗo signifie vieux/aîné et fawru signifie grenier."
      },
      en: {
        question: "What does the proverb 'Mawɗo ko fawru ganndal' mean?",
        options: ["Knowledge is power", "An elder is the storehouse of knowledge", "Health is wealth", "Discipline is the door"],
        explanation: "Mawɗo means elder and fawru means storehouse/granary."
      },
      es: {
        question: "¿Qué significa el proverbio 'Mawɗo ko fawru ganndal'?",
        options: ["El conocimiento es poder", "El anciano es el granero del conocimiento", "La salud es riqueza", "La disciplina es la puerta"],
        explanation: "Mawɗo significa anciano/mayor y fawru significa granero."
      },
      ar: {
        question: "ماذا يعني المثل 'Mawɗo ko fawru ganndal'؟",
        options: ["المعرفة قوة", "الكبير هو مخزن المعرفة", "الصحة هي الثروة", "الانضباط هو الباب"],
        explanation: "Mawɗo تعني الكبير أو الشيخ، و fawru تعني المخزن أو المستودع."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q8',
    translations: {
      fr: {
        question: "Comment dit-on 'Merci' en Pulaar ?",
        options: ["A jaaraama", "Jam waali", "Mbaalen", "Mi arii"],
        explanation: "'A jaaraama' est l'expression courante pour remercier."
      },
      en: {
        question: "How do you say 'Thank you' in Pulaar?",
        options: ["A jaaraama", "Jam waali", "Mbaalen", "Mi arii"],
        explanation: "'A jaaraama' is the common expression for thanks."
      },
      es: {
        question: "¿Cómo se dice 'Gracias' en Pulaar?",
        options: ["A jaaraama", "Jam waali", "Mbaalen", "Mi arii"],
        explanation: "'A jaaraama' es la expresión común para dar las gracias."
      },
      ar: {
        question: "كيف تقول 'شكراً' بالبولار؟",
        options: ["A jaaraama", "Jam waali", "Mbaalen", "Mi arii"],
        explanation: "'A jaaraama' هو التعبير الشائع للشكر."
      }
    },
    correctAnswerIndex: 0
  },
  {
    id: 'q9',
    translations: {
      fr: {
        question: "Que signifie 'Hol no mbiyete-ɗaa ?'",
        options: ["Où es-tu ?", "Comment vas-tu ?", "Comment t'appelles-tu ?", "Qui es-tu ?"],
        explanation: "C'est la question standard pour demander le nom d'une personne."
      },
      en: {
        question: "What does 'Hol no mbiyete-ɗaa?' mean?",
        options: ["Where are you?", "How are you?", "What is your name?", "Who are you?"],
        explanation: "It is the standard question to ask someone's name."
      },
      es: {
        question: "¿Qué significa 'Hol no mbiyete-ɗaa?'?",
        options: ["¿Dónde estás?", "¿Cómo estás?", "¿Cómo te llamas?", "¿Quién eres?"],
        explanation: "Es la pregunta estándar para preguntar el nombre."
      },
      ar: {
        question: "ماذا يعني 'Hol no mbiyete-ɗaa'؟",
        options: ["أين أنت؟", "كيف حالك؟", "ما اسمك؟", "من أنت؟"],
        explanation: "إنه السؤال القياسي للسؤال عن الاسم."
      }
    },
    correctAnswerIndex: 2
  },
  {
    id: 'q10',
    translations: {
      fr: {
        question: "Quel mot signifie 'Mère' en Pulaar ?",
        options: ["Baaba", "Neene", "Kaaw", "Maama"],
        explanation: "'Neene' signifie mère, tandis que 'Baaba' signifie père."
      },
      en: {
        question: "Which word means 'Mother' in Pulaar?",
        options: ["Baaba", "Neene", "Kaaw", "Maama"],
        explanation: "'Neene' means mother, while 'Baaba' means father."
      },
      es: {
        question: "¿Qué palabra significa 'Madre' en Pulaar?",
        options: ["Baaba", "Neene", "Kaaw", "Maama"],
        explanation: "'Neene' significa madre, mientras que 'Baaba' significa padre."
      },
      ar: {
        question: "أي كلمة تعني 'أم' بالبولار؟",
        options: ["Baaba", "Neene", "Kaaw", "Maama"],
        explanation: "'Neene' تعني الأم، بينما 'Baaba' تعني الأب."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q11',
    translations: {
      fr: {
        question: "Comment dit-on 'Je vais' (partir) en Pulaar ?",
        options: ["Mi arii", "Mi yahii", "Mi wonii", "Mi dañii"],
        explanation: "Le verbe 'yahde' signifie partir ou aller."
      },
      en: {
        question: "How do you say 'I am going' in Pulaar?",
        options: ["Mi arii", "Mi yahii", "Mi wonii", "Mi dañii"],
        explanation: "The verb 'yahde' means to go or to leave."
      },
      es: {
        question: "¿Cómo se dice 'Me voy' en Pulaar?",
        options: ["Mi arii", "Mi yahii", "Mi wonii", "Mi dañii"],
        explanation: "El verbo 'yahde' significa irse o ir."
      },
      ar: {
        question: "كيف تقول 'أنا ذاهب' بالبولار؟",
        options: ["Mi arii", "Mi yahii", "Mi wonii", "Mi dañii"],
        explanation: "الفعل 'yahde' يعني الذهاب أو المغادرة."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q12',
    translations: {
      fr: {
        question: "Quel est le mot Pulaar pour le chiffre 'Un' ?",
        options: ["Didi", "Tati", "Go'o", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      },
      en: {
        question: "What is the Pulaar word for the number 'One'?",
        options: ["Didi", "Tati", "Go'o", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      },
      es: {
        question: "¿Cuál es la palabra Pulaar para el número 'Uno'?",
        options: ["Didi", "Tati", "Go'o", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      },
      ar: {
        question: "ما هي كلمة البولار للرقم 'واحد'؟",
        options: ["Didi", "Tati", "Go'o", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      }
    },
    correctAnswerIndex: 2
  },
  {
    id: 'q13',
    translations: {
      fr: {
        question: "Comment dit-on 'Père' en Pulaar ?",
        options: ["Neene", "Baaba", "Kaaw", "Maama"],
        explanation: "'Baaba' signifie père, tandis que 'Neene' signifie mère."
      },
      en: {
        question: "How do you say 'Father' in Pulaar?",
        options: ["Neene", "Baaba", "Kaaw", "Maama"],
        explanation: "'Baaba' means father, while 'Neene' means mother."
      },
      es: {
        question: "¿Cómo se dice 'Padre' en Pulaar?",
        options: ["Neene", "Baaba", "Kaaw", "Maama"],
        explanation: "'Baaba' significa padre, mientras que 'Neene' significa madre."
      },
      ar: {
        question: "كيف تقول 'أب' بالبولار؟",
        options: ["Neene", "Baaba", "Kaaw", "Maama"],
        explanation: "'Baaba' تعني الأب، بينما 'Neene' تعني الأم."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q14',
    translations: {
      fr: {
        question: "Quel est le mot Pulaar pour le chiffre 'Deux' ?",
        options: ["Go'o", "Didi", "Tati", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      },
      en: {
        question: "What is the Pulaar word for the number 'Two'?",
        options: ["Go'o", "Didi", "Tati", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      },
      es: {
        question: "¿Cuál es la palabra Pulaar para el número 'Dos'?",
        options: ["Go'o", "Didi", "Tati", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      },
      ar: {
        question: "ما هي كلمة البولار للرقم 'اثنان'؟",
        options: ["Go'o", "Didi", "Tati", "Nay"],
        explanation: "Go'o (1), Didi (2), Tati (3), Nay (4)."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q15',
    translations: {
      fr: {
        question: "Que signifie 'Deftere' ?",
        options: ["Maison", "Chaise", "Livre", "Stylo"],
        explanation: "'Deftere' est le mot Pulaar pour livre."
      },
      en: {
        question: "What does 'Deftere' mean?",
        options: ["House", "Chair", "Book", "Pen"],
        explanation: "'Deftere' is the Pulaar word for book."
      },
      es: {
        question: "¿Qué significa 'Deftere'?",
        options: ["Casa", "Silla", "Libro", "Bolígrafo"],
        explanation: "'Deftere' es la palabra Pulaar para libro."
      },
      ar: {
        question: "ماذا يعني 'Deftere'؟",
        options: ["منزل", "كرسي", "كتاب", "قلم"],
        explanation: "'Deftere' هي كلمة بولار تعني كتاب."
      }
    },
    correctAnswerIndex: 2
  },
  {
    id: 'q16',
    translations: {
      fr: {
        question: "Comment dit-on 'Eau' en Pulaar ?",
        options: ["Kadi", "Ndyam", "Haala", "Kosam"],
        explanation: "'Ndyam' signifie l'eau, 'Kosam' signifie le lait."
      },
      en: {
        question: "How do you say 'Water' in Pulaar?",
        options: ["Kadi", "Ndyam", "Haala", "Kosam"],
        explanation: "'Ndyam' means water, 'Kosam' means milk."
      },
      es: {
        question: "¿Cómo se dice 'Agua' en Pulaar?",
        options: ["Kadi", "Ndyam", "Haala", "Kosam"],
        explanation: "'Ndyam' significa agua, 'Kosam' significa leche."
      },
      ar: {
        question: "كيف تقول 'ماء' بالبولار؟",
        options: ["Kadi", "Ndyam", "Haala", "Kosam"],
        explanation: "'Ndyam' تعني الماء، و 'Kosam' تعني الحليب."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q17',
    translations: {
      fr: {
        question: "Que signifie 'Sehil' ?",
        options: ["Ennemi", "Ami", "Frère", "Sœur"],
        explanation: "'Sehil' désigne un ami ou un camarade."
      },
      en: {
        question: "What does 'Sehil' mean?",
        options: ["Enemy", "Friend", "Brother", "Sister"],
        explanation: "'Sehil' refers to a friend or a companion."
      },
      es: {
        question: "¿Qué significa 'Sehil'?",
        options: ["Enemigo", "Amigo", "Hermano", "Hermana"],
        explanation: "'Sehil' se refiere a un amigo o compañero."
      },
      ar: {
        question: "ماذا يعني 'Sehil'؟",
        options: ["عدو", "صديق", "أخ", "أخت"],
        explanation: "تشير كلمة 'Sehil' إلى الصديق أو الرفيق."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q18',
    translations: {
      fr: {
        question: "Comment dit-on 'Maison' en Pulaar ?",
        options: ["Suudu", "Kosam", "Lewru", "Naange"],
        explanation: "'Suudu' désigne une maison ou une chambre."
      },
      en: {
        question: "How do you say 'House' in Pulaar?",
        options: ["Suudu", "Kosam", "Lewru", "Naange"],
        explanation: "'Suudu' refers to a house or a room."
      },
      es: {
        question: "¿Cómo se dice 'Casa' en Pulaar?",
        options: ["Suudu", "Kosam", "Lewru", "Naange"],
        explanation: "'Suudu' se refiere a una casa o habitación."
      },
      ar: {
        question: "كيف تقول 'منزل' بالبولار؟",
        options: ["Suudu", "Kosam", "Lewru", "Naange"],
        explanation: "'Suudu' تشير إلى المنزل أو الغرفة."
      }
    },
    correctAnswerIndex: 0
  },
  {
    id: 'q19',
    translations: {
      fr: {
        question: "Quel mot signifie 'Soleil' ?",
        options: ["Lewru", "Naange", "Hoodere", "Asamaan"],
        explanation: "'Naange' est le mot pour le soleil."
      },
      en: {
        question: "Which word means 'Sun'?",
        options: ["Lewru", "Naange", "Hoodere", "Asamaan"],
        explanation: "'Naange' is the word for the sun."
      },
      es: {
        question: "¿Qué palabra significa 'Sol'?",
        options: ["Lewru", "Naange", "Hoodere", "Asamaan"],
        explanation: "'Naange' es la palabra para el sol."
      },
      ar: {
        question: "أي كلمة تعني 'شمس'؟",
        options: ["Lewru", "Naange", "Hoodere", "Asamaan"],
        explanation: "'Naange' هي كلمة الشمس."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q20',
    translations: {
      fr: {
        question: "Que signifie 'Lewru' ?",
        options: ["Le Soleil", "La Lune", "L'Étoile", "Le Ciel"],
        explanation: "'Lewru' signifie la lune (et aussi le mois)."
      },
      en: {
        question: "What does 'Lewru' mean?",
        options: ["The Sun", "The Moon", "The Star", "The Sky"],
        explanation: "'Lewru' means the moon (it also means month)."
      },
      es: {
        question: "¿Qué significa 'Lewru'?",
        options: ["El Sol", "La Luna", "La Estrella", "El Cielo"],
        explanation: "'Lewru' significa la luna (y también el mes)."
      },
      ar: {
        question: "ماذا تعني كلمة 'Lewru'؟",
        options: ["الشمس", "القمر", "النجمة", "السماء"],
        explanation: "'Lewru' تعني القمر (وتعني أيضاً الشهر)."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q21',
    translations: {
      fr: {
        question: "Comment dit-on 'Lait' en Pulaar ?",
        options: ["Ndyam", "Kosam", "Mbiu", "Kaaw"],
        explanation: "'Kosam' est le mot pour le lait."
      },
      en: {
        question: "How do you say 'Milk' in Pulaar?",
        options: ["Ndyam", "Kosam", "Mbiu", "Kaaw"],
        explanation: "'Kosam' is the word for milk."
      },
      es: {
        question: "¿Cómo se dice 'Leche' en Pulaar?",
        options: ["Ndyam", "Kosam", "Mbiu", "Kaaw"],
        explanation: "'Kosam' es la palabra para la leche."
      },
      ar: {
        question: "كيف تقول 'حليب' بالبولار؟",
        options: ["Ndyam", "Kosam", "Mbiu", "Kaaw"],
        explanation: "'Kosam' هي كلمة الحليب."
      }
    },
    correctAnswerIndex: 1
  },
  {
    id: 'q22',
    translations: {
      fr: {
        question: "Quel animal est appelé 'Nagge' ?",
        options: ["Vache", "Mouton", "Chèvre", "Cheval"],
        explanation: "'Nagge' signifie une vache."
      },
      en: {
        question: "Which animal is called 'Nagge'?",
        options: ["Cow", "Sheep", "Goat", "Horse"],
        explanation: "'Nagge' means a cow."
      },
      es: {
        question: "¿Qué animal se llama 'Nagge'?",
        options: ["Vaca", "Oveja", "Cabra", "Caballo"],
        explanation: "'Nagge' significa una vaca."
      },
      ar: {
        question: "أي حيوان يسمى 'Nagge'؟",
        options: ["بقرة", "خروف", "ماعز", "حصان"],
        explanation: "'Nagge' تعني البقرة."
      }
    },
    correctAnswerIndex: 0
  }
];