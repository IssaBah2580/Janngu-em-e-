
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
      ar: "الصحة هي أصل الثروة" 
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
        title: { en: "Personal Pronouns (Subject)", fr: "Pronoms Personnels (Sujet)" },
        items: [
          { pulaar: "Mi / Miin", en: "I", fr: "Je / Moi" },
          { pulaar: "A / Aan", en: "You (singular)", fr: "Tu / Toi" },
          { pulaar: "O / Kanko", en: "He-She / Him-Her", fr: "Il-Elle / Lui-Elle" },
          { pulaar: "En / Enen", en: "We (inclusive)", fr: "Nous (inclusif)" },
          { pulaar: "Min / Minen", en: "We (exclusive)", fr: "Nous (exclusif)" },
          { pulaar: "On / Onon", en: "You (plural)", fr: "Vous" },
          { pulaar: "Ɓe / Kambe", en: "They / Them", fr: "Ils-Elles / Eux-Elles" },
        ]
      },
      {
        title: { en: "Reflexive Pronouns", fr: "Pronoms Réflexifs" },
        items: [
          { pulaar: "miin hoore am", en: "Myself", fr: "Moi-même" },
          { pulaar: "aan hoore maa", en: "Yourself", fr: "Toi-même" },
          { pulaar: "kanko hoore makko", en: "Himself / Herself", fr: "Lui-même / Elle-même" },
        ]
      }
    ]
  },
  {
    id: 'possessives',
    title: { en: "Possessive Adjectives", fr: "Adjectifs Possessifs", pulaar: "Sifaa jeyirɗo" },
    sections: [
      {
        title: { en: "Singular Possessives", fr: "Possessifs Singuliers" },
        items: [
          { pulaar: "... am", en: "My", fr: "Mon / Ma / Mes", example: "Deftere am (Mon livre)" },
          { pulaar: "... maa", en: "Your (sing.)", fr: "Ton / Ta / Tes", example: "Baaba maa (Ton père)" },
          { pulaar: "... makko", en: "His / Her", fr: "Son / Sa / Ses", example: "Neene makko (Sa mère)" },
        ]
      },
      {
        title: { en: "Plural Possessives", fr: "Possessifs Pluriels" },
        items: [
          { pulaar: "... men", en: "Our (excl.)", fr: "Notre / Nos (excl.)", example: "Galle men (Notre maison)" },
          { pulaar: "... en / meen", en: "Our (incl.)", fr: "Notre / Nos (incl.)", example: "Wuro en (Notre village)" },
          { pulaar: "... mon", en: "Your (plur.)", fr: "Votre / Vos", example: "Sakiike mon (Votre parent)" },
          { pulaar: "... maɓɓe", en: "Their", fr: "Leur / Leurs", example: "Nagge maɓɓe (Leur vache)" },
        ]
      }
    ]
  },
  {
    id: 'verbs',
    title: { en: "Essential Verbs", fr: "Verbes Essentiels", pulaar: "Gollal" },
    sections: [
      {
        title: { en: "To Be (Won'de)", fr: "Être (Won'de)" },
        items: [
          { pulaar: "Mi woni", en: "I am", fr: "Je suis" },
          { pulaar: "A woni", en: "You are", fr: "Tu es" },
          { pulaar: "O woni", en: "He/She is", fr: "Il/Elle est" },
        ]
      },
      {
        title: { en: "To Have (Dañde / woodi)", fr: "Avoir (Dañde / woodi)" },
        items: [
          { pulaar: "Mi woodi", en: "I have", fr: "J'ai" },
          { pulaar: "Mi dañii", en: "I got/have", fr: "J'ai obtenu" },
        ]
      }
    ]
  }
];

export const WORD_ORDER_CHALLENGES = [
  { pulaar: "Mi arii hannde", words: ["arii", "hannde", "Mi"], translation: { fr: "Je suis venu aujourd'hui", en: "I came today" } },
  { pulaar: "Nagge ngee ena selli", words: ["selli", "ena", "ngee", "Nagge"], translation: { fr: "Cette vache est en bonne santé", en: "This cow is healthy" } },
  { pulaar: "Deftere am ena mawniri", words: ["am", "mawniri", "ena", "Deftere"], translation: { fr: "Mon livre est grand", en: "My book is big" } },
  { pulaar: "O yidi kosam", words: ["kosam", "yidi", "O"], translation: { fr: "Il veut du lait", en: "He wants milk" } }
];

export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: "Salminaangu",
    subtitle: "Salutations",
    vocabulary: [
      { pulaar: "Jam waali", translations: { fr: "Bonjour (matin)", en: "Good morning", es: "Buenos días", ar: "صباح الخير" } },
      { pulaar: "Jam ñalli", translations: { fr: "Bon après-midi", en: "Good afternoon", es: "Buenas tardes", ar: "طاب يومك" } },
      { pulaar: "Jam hiiri", translations: { fr: "Bonsoir", en: "Good evening", es: "Buenas noches", ar: "مساء الخير" } },
      { pulaar: "Mbaalen he jam", translations: { fr: "Bonne nuit (dormons en paix)", en: "Good night", es: "Buenas noches", ar: "تصبح على خير" } }
    ],
    dialogues: [
      { speaker: "Issa", pulaar: "Jam waali Muusaa", translations: { fr: "Bonjour Moussa", en: "Good morning Moussa", es: "Buenos días Moussa", ar: "صباح الخير موسى" } },
      { speaker: "Moussa", pulaar: "Jam waali Issa, no mbaddi?", translations: { fr: "Bonjour Issa, comment vas-tu ?", en: "Good morning Issa, how are you?", es: "Buenos días Issa, ¿cómo estás?", ar: "صباح الخير عيسى، كيف حالك؟" } }
    ]
  },
  {
    id: 'l2',
    title: "Limmol",
    subtitle: "Les Nombres",
    vocabulary: [
      { pulaar: "Goo", translations: { fr: "Un", en: "One", es: "Uno", ar: "واحد" } },
      { pulaar: "Ɗiɗi", translations: { fr: "Deux", en: "Two", es: "Dos", ar: "اثنان" } },
      { pulaar: "Tati", translations: { fr: "Trois", en: "Three", es: "Tres", ar: "ثلاثة" } },
      { pulaar: "Nay", translations: { fr: "Quatre", en: "Four", es: "Cuatro", ar: "أربعة" } },
      { pulaar: "Joy", translations: { fr: "Cinq", en: "Five", es: "Cinco", ar: "خمسة" } }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', translations: { fr: { question: "Comment dit-on 'Bonjour' (le matin) ?", options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"], explanation: "'Jam waali' est utilisé le matin." }, en: { question: "How do you say 'Good morning'?", options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"], explanation: "'Jam waali' is used in the morning." }, es: { question: "¿Cómo se dice 'Buenos días'?", options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"], explanation: "'Jam waali' se usa por la mañana." }, ar: { question: "كيف تقول 'صباح الخير'؟", options: ["Jam waali", "Jam ñalli", "Jam hiiri", "Mbaalen he jam"], explanation: "تُستخدم 'Jam waali' في الصباح." } }, correctAnswerIndex: 0 },
  { id: 'q2', translations: { fr: { question: "Comment dit-on 'Bon après-midi' ?", options: ["Jam waali", "Jam ñalli", "A arii", "Tana alaa"], explanation: "'Jam ñalli' s'utilise entre midi et le soir." }, en: { question: "How do you say 'Good afternoon'?", options: ["Jam waali", "Jam ñalli", "A arii", "Tana alaa"], explanation: "'Jam ñalli' is used between noon and evening." }, es: { question: "¿Cómo se dice 'Buenas tardes'?", options: ["Jam waali", "Jam ñalli", "A arii", "Tana alaa"], explanation: "'Jam ñalli' se usa entre el mediodía y la noche." }, ar: { question: "كيف تقول 'طاب يومك'؟", options: ["Jam waali", "Jam ñalli", "A arii", "Tana alaa"], explanation: "تُستخدم 'Jam ñalli' بين الظهر والمساء." } }, correctAnswerIndex: 1 },
  { id: 'q3', translations: { fr: { question: "Que signifie 'No mbaddi?'", options: ["Où vas-tu ?", "Comment allez-vous ?", "Quel âge as-tu ?", "C'est quoi ?"], explanation: "C'est la question standard pour demander des nouvelles." }, en: { question: "What does 'No mbaddi?' mean?", options: ["Where are you going?", "How are you?", "How old are you?", "What is it?"], explanation: "It is the standard question to ask how someone is doing." }, es: { question: "¿Qué significa 'No mbaddi?'", options: ["¿A dónde vas?", "¿Cómo estás?", "¿Qué edad tienes?", "¿Qué es?"], explanation: "Es la pregunta estándar para preguntar cómo está alguien." }, ar: { question: "ماذا تعني 'No mbaddi?'؟", options: ["أين تذهب؟", "كيف حالك؟", "كم عمرك؟", "ما هذا؟"], explanation: "هذا هو السؤال المعتاد للسؤال عن الحال." } }, correctAnswerIndex: 1 },
  { id: 'q4', translations: { fr: { question: "Comment dit-on 'Merci' ?", options: ["Nalle he jam", "Jaaraama", "A arii", "Mbaalen"], explanation: "'Jaaraama' exprime la gratitude." }, en: { question: "How do you say 'Thank you'?", options: ["Nalle he jam", "Jaaraama", "A arii", "Mbaalen"], explanation: "'Jaaraama' expresses gratitude." }, es: { question: "¿Cómo se dice 'Gracias'?", options: ["Nalle he jam", "Jaaraama", "A arii", "Mbaalen"], explanation: "'Jaaraama' expresa gratitud." }, ar: { question: "كيف تقول 'شكراً'؟", options: ["Nalle he jam", "Jaaraama", "A arii", "Mbaalen"], explanation: "'Jaaraama' تعبر عن الامتنان." } }, correctAnswerIndex: 1 },
  { id: 'q5', translations: { fr: { question: "Quel est le chiffre '1' ?", options: ["Ɗiɗi", "Tati", "Goo", "Nay"], explanation: "'Goo' est le premier chiffre." }, en: { question: "Which number is '1'?", options: ["Ɗiɗi", "Tati", "Goo", "Nay"], explanation: "'Goo' is the first number." }, es: { question: "¿Qué número es el '1'?", options: ["Ɗiɗi", "Tati", "Goo", "Nay"], explanation: "'Goo' es el primer número." }, ar: { question: "ما هو الرقم '1'؟", options: ["Ɗiɗi", "Tati", "Goo", "Nay"], explanation: "'Goo' هو الرقم الأول." } }, correctAnswerIndex: 2 },
  { id: 'q6', translations: { fr: { question: "Quel est le chiffre '2' ?", options: ["Goo", "Ɗiɗi", "Joy", "Jeego"], explanation: "'Ɗiɗi' signifie deux." }, en: { question: "Which number is '2'?", options: ["Goo", "Ɗiɗi", "Joy", "Jeego"], explanation: "'Ɗiɗi' means two." }, es: { question: "¿Qué número es el '2'?", options: ["Goo", "Ɗiɗi", "Joy", "Jeego"], explanation: "'Ɗiɗi' significa dos." }, ar: { question: "ما هو الرقم '2'؟", options: ["Goo", "Ɗiɗi", "Joy", "Jeego"], explanation: "'Ɗiɗi' تعني اثنين." } }, correctAnswerIndex: 1 },
  { id: 'q7', translations: { fr: { question: "Quel est le chiffre '5' ?", options: ["Nay", "Joy", "Jeego", "Goo"], explanation: "'Joy' représente le chiffre cinq." }, en: { question: "Which number is '5'?", options: ["Nay", "Joy", "Jeego", "Goo"], explanation: "'Joy' represents the number five." }, es: { question: "¿Qué número es el '5'?", options: ["Nay", "Joy", "Jeego", "Goo"], explanation: "'Joy' representa el número cinco." }, ar: { question: "ما هو الرقم '5'؟", options: ["Nay", "Joy", "Jeego", "Goo"], explanation: "'Joy' تمثل الرقم خمسة." } }, correctAnswerIndex: 1 },
  { id: 'q8', translations: { fr: { question: "Comment dit-on 'Père' ?", options: ["Neene", "Baaba", "Mawɗo", "Bidɗo"], explanation: "'Baaba' désigne le père." }, en: { question: "How do you say 'Father'?", options: ["Neene", "Baaba", "Mawɗo", "Bidɗo"], explanation: "'Baaba' refers to the father." }, es: { question: "¿Cómo se dice 'Padre'?", options: ["Neene", "Baaba", "Mawɗo", "Bidɗo"], explanation: "'Baaba' se refiere al padre." }, ar: { question: "كيف تقول 'أب'؟", options: ["Neene", "Baaba", "Mawɗo", "Bidɗo"], explanation: "'Baaba' تعني الأب." } }, correctAnswerIndex: 1 },
  { id: 'q9', translations: { fr: { question: "Comment dit-on 'Mère' ?", options: ["Baaba", "Neene", "Sakiike", "Gorko"], explanation: "'Neene' (ou Yumma) désigne la mère." }, en: { question: "How do you say 'Mother'?", options: ["Baaba", "Neene", "Sakiike", "Gorko"], explanation: "'Neene' (or Yumma) refers to the mother." }, es: { question: "¿Cómo se dice 'Madre'?", options: ["Baaba", "Neene", "Sakiike", "Gorko"], explanation: "'Neene' (o Yumma) se refiere a la madre." }, ar: { question: "كيف تقول 'أُم'؟", options: ["Baaba", "Neene", "Sakiike", "Gorko"], explanation: "'Neene' (أو Yumma) تعني الأم." } }, correctAnswerIndex: 1 },
  { id: 'q10', translations: { fr: { question: "Que signifie 'Ndiyam' ?", options: ["Le lait", "L'eau", "Le pain", "Le feu"], explanation: "'Ndiyam' est l'élément vital, l'eau." }, en: { question: "What does 'Ndiyam' mean?", options: ["Milk", "Water", "Bread", "Fire"], explanation: "'Ndiyam' is the vital element, water." }, es: { question: "¿Qué significa 'Ndiyam'?", options: ["Leche", "Agua", "Pan", "Fuego"], explanation: "'Ndiyam' es el elemento vital, el agua." }, ar: { question: "ماذا تعني 'Ndiyam'؟", options: ["الحليب", "الماء", "الخبز", "النار"], explanation: "'Ndiyam' هي العنصر الحيوي، الماء." } }, correctAnswerIndex: 1 },
  { id: 'q11', translations: { fr: { question: "Comment dit-on 'Le lait' ?", options: ["Ndiyam", "Kosam", "Ñaamdu", "Luumo"], explanation: "'Kosam' est très important dans la culture Peule." }, en: { question: "How do you say 'Milk'?", options: ["Ndiyam", "Kosam", "Ñaamdu", "Luumo"], explanation: "'Kosam' is very important in Fulani culture." }, es: { question: "¿Cómo se dice 'Leche'?", options: ["Ndiyam", "Kosam", "Ñaamdu", "Luumo"], explanation: "'Kosam' es muy importante en la cultura Peul." }, ar: { question: "كيف تقول 'حليب'؟", options: ["Ndiyam", "Kosam", "Ñaamdu", "Luumo"], explanation: "'Kosam' مهم جداً في ثقافة الفولاني." } }, correctAnswerIndex: 1 },
  { id: 'q12', translations: { fr: { question: "Que signifie 'Nagge' ?", options: ["Le mouton", "La vache", "Le cheval", "Le chien"], explanation: "'Nagge' est l'animal central de la vie pastoral." }, en: { question: "What does 'Nagge' mean?", options: ["Sheep", "Cow", "Horse", "Dog"], explanation: "'Nagge' is the central animal of pastoral life." }, es: { question: "¿Qué significa 'Nagge'?", options: ["Oveja", "Vaca", "Caballo", "Perro"], explanation: "'Nagge' es el animal central de la vida pastoral." }, ar: { question: "ماذا تعني 'Nagge'؟", options: ["خروف", "بقرة", "حصان", "كلب"], explanation: "'Nagge' هي الحيوان المركزي في الحياة الرعوية." } }, correctAnswerIndex: 1 },
  { id: 'q13', translations: { fr: { question: "Comment dit-on 'Manger' ?", options: ["Yarude", "Ñaamde", "Ɗaanade", "Yaltude"], explanation: "'Ñaamde' est le verbe manger." }, en: { question: "How do you say 'To eat'?", options: ["Yarude", "Ñaamde", "Ɗaanade", "Yaltude"], explanation: "'Ñaamde' is the verb to eat." }, es: { question: "¿Cómo se dice 'Comer'?", options: ["Yarude", "Ñaamde", "Ɗaanade", "Yaltude"], explanation: "'Ñaamde' es le verbo comer." }, ar: { question: "كيف تقول 'يأكل'؟", options: ["Yarude", "Ñaamde", "Ɗaanade", "Yaltude"], explanation: "'Ñaamde' هو فعل الأكل." } }, correctAnswerIndex: 1 },
  { id: 'q14', translations: { fr: { question: "Comment dit-on 'Boire' ?", options: ["Ñaamde", "Yarude", "Winnude", "Janngude"], explanation: "'Yarude' est le verbe boire." }, en: { question: "How do you say 'To drink'?", options: ["Ñaamde", "Yarude", "Winnude", "Janngude"], explanation: "'Yarude' is the verb to drink." }, es: { question: "¿Cómo se dice 'Beber'?", options: ["Ñaamde", "Yarude", "Winnude", "Janngude"], explanation: "'Yarude' es el verbo beber." }, ar: { question: "كيف تقول 'يشرب'؟", options: ["Ñaamde", "Yarude", "Winnude", "Janngude"], explanation: "'Yarude' هو فعل الشرب." } }, correctAnswerIndex: 1 },
  { id: 'q15', translations: { fr: { question: "Que signifie 'Luumo' ?", options: ["L'école", "Le marché", "La maison", "Le champ"], explanation: "'Luumo' est le lieu d'échange, le marché." }, en: { question: "What does 'Luumo' mean?", options: ["School", "Market", "House", "Field"], explanation: "'Luumo' is the place of exchange, the market." }, es: { question: "¿Qué significa 'Luumo'?", options: ["Escuela", "Mercado", "Casa", "Campo"], explanation: "'Luumo' es el lugar de intercambio, el mercado." }, ar: { question: "ماذا تعني 'Luumo'؟", options: ["المدرسة", "السوق", "البيت", "الحقل"], explanation: "'Luumo' هو مكان التبادل، السوق." } }, correctAnswerIndex: 1 },
  { id: 'q16', translations: { fr: { question: "Comment dit-on 'Grand' ?", options: ["Famnude", "Mawnude", "Sellude", "Woɗɗude"], explanation: "'Mawnude' signifie être grand ou grandir." }, en: { question: "How do you say 'Big'?", options: ["Famnude", "Mawnude", "Sellude", "Woɗɗude"], explanation: "'Mawnude' means to be big or to grow." }, es: { question: "¿Cómo se dice 'Grande'?", options: ["Famnude", "Mawnude", "Sellude", "Woɗɗude"], explanation: "'Mawnude' significa ser grande o crecer." }, ar: { question: "كيف تقول 'كبير'؟", options: ["Famnude", "Mawnude", "Sellude", "Woɗɗude"], explanation: "'Mawnude' تعني أن يكون كبيراً أو ينمو." } }, correctAnswerIndex: 1 },
  { id: 'q17', translations: { fr: { question: "Que signifie 'Hannde' ?", options: ["Demain", "Aujourd'hui", "Hier", "Bientôt"], explanation: "'Hannde' signifie aujourd'hui." }, en: { question: "What does 'Hannde' mean?", options: ["Tomorrow", "Today", "Yesterday", "Soon"], explanation: "'Hannde' means today." }, es: { question: "¿Qué significa 'Hannde'?", options: ["Mañana", "Hoy", "Ayer", "Pronto"], explanation: "'Hannde' significa hoy." }, ar: { question: "ماذا تعني 'Hannde'؟", options: ["غداً", "اليوم", "أمس", "قريباً"], explanation: "'Hannde' تعني اليوم." } }, correctAnswerIndex: 1 },
  { id: 'q18', translations: { fr: { question: "Comment dit-on 'Demain' ?", options: ["Hannde", "Janngo", "Hanki", "Ñannde goɗɗe"], explanation: "'Janngo' se réfère au futur proche, demain." }, en: { question: "How do you say 'Tomorrow'?", options: ["Hannde", "Janngo", "Hanki", "Ñannde goɗɗe"], explanation: "'Janngo' refers to the near future, tomorrow." }, es: { question: "¿Cómo se dice 'Mañana'?", options: ["Hannde", "Janngo", "Hanki", "Ñannde goɗɗe"], explanation: "'Janngo' se refiere al futuro cercano, mañana." }, ar: { question: "كيف تقول 'غداً'؟", options: ["Hannde", "Janngo", "Hanki", "Ñannde goɗɗe"], explanation: "'Janngo' تشير إلى المستقبل القريب، غداً." } }, correctAnswerIndex: 1 },
  { id: 'q19', translations: { fr: { question: "Que signifie 'Naange' ?", options: ["La lune", "Le soleil", "L'étoile", "Le ciel"], explanation: "'Naange' est le soleil." }, en: { question: "What does 'Naange' mean?", options: ["Moon", "Sun", "Star", "Sky"], explanation: "'Naange' is the sun." }, es: { question: "¿Qué significa 'Naange'?", options: ["Luna", "Sol", "Estrella", "Cielo"], explanation: "'Naange' es le sol." }, ar: { question: "ماذا تعني 'Naange'؟", options: ["القمر", "الشمس", "النجمة", "السماء"], explanation: "'Naange' هي الشمس." } }, correctAnswerIndex: 1 },
  { id: 'q20', translations: { fr: { question: "Comment dit-on 'La lune' ?", options: ["Naange", "Lewru", "Hoodere", "Asama"], explanation: "'Lewru' désigne la lune et aussi le mois." }, en: { question: "How do you say 'The moon'?", options: ["Naange", "Lewru", "Hoodere", "Asama"], explanation: "'Lewru' refers to the moon and also the month." }, es: { question: "¿Cómo se dice 'La luna'?", options: ["Naange", "Lewru", "Hoodere", "Asama"], explanation: "'Lewru' se refiere a la luna y también al mes." }, ar: { question: "كيف تقول 'القمر'؟", options: ["Naange", "Lewru", "Hoodere", "Asama"], explanation: "'Lewru' تشير إلى القمر وأيضاً الشهر." } }, correctAnswerIndex: 1 },
  { id: 'q21', translations: { fr: { question: "Que signifie 'A arii' ?", options: ["Tu pars", "Tu es venu", "Tu manges", "Tu dors"], explanation: "C'est une salutation commune : 'tu es arrivé/venu'." }, en: { question: "What does 'A arii' mean?", options: ["You are leaving", "You have come", "You are eating", "You are sleeping"], explanation: "It's a common greeting: 'you have arrived/come'." }, es: { question: "¿Qué significa 'A arii'?", options: ["Te vas", "Has venido", "Estás comiendo", "Estás durmiendo"], explanation: "Es un saludo común: 'has llegado/venido'." }, ar: { question: "ماذا تعني 'A arii'؟", options: ["أنت تغادر", "لقد أتيت", "أنت تأكل", "أنت تنام"], explanation: "هذا ترحيب شائع: 'لقد وصلت/أتيت'." } }, correctAnswerIndex: 1 },
  { id: 'q22', translations: { fr: { question: "Comment dit-on 'L'école' ?", options: ["Luumo", "Duɗal", "Suudu", "Galle"], explanation: "'Duɗal' est l'endroit où l'on apprend." }, en: { question: "How do you say 'School'?", options: ["Luumo", "Duɗal", "Suudu", "Galle"], explanation: "'Duɗal' is where one learns." }, es: { question: "¿Cómo se dice 'Escuela'?", options: ["Luumo", "Duɗal", "Suudu", "Galle"], explanation: "'Duɗal' es el lugar donde se aprende." }, ar: { question: "كيف تقول 'المدرسة'؟", options: ["Luumo", "Duɗal", "Suudu", "Galle"], explanation: "'Duɗal' هو المكان الذي يتعلم فيه المرء." } }, correctAnswerIndex: 1 },
  { id: 'q23', translations: { fr: { question: "Que signifie 'Suudu' ?", options: ["La route", "La chambre/maison", "Le village", "La ville"], explanation: "'Suudu' désigne souvent la case ou la chambre." }, en: { question: "What does 'Suudu' mean?", options: ["Road", "Room/House", "Village", "City"], explanation: "'Suudu' often refers to a hut or room." }, es: { question: "¿Qué significa 'Suudu'?", options: ["Camino", "Habitación/Casa", "Pueblo", "Ciudad"], explanation: "'Suudu' a menudo se refiere a una choza o habitación." }, ar: { question: "ماذا تعني 'Suudu'؟", options: ["الطريق", "الغرفة/البيت", "القرية", "المدينة"], explanation: "'Suudu' غالباً ما تشير إلى الكوخ أو الغرفة." } }, correctAnswerIndex: 1 },
  { id: 'q24', translations: { fr: { question: "Comment dit-on 'Petit' ?", options: ["Mawnude", "Fanɗude", "Woɗɗude", "Yaawude"], explanation: "'Fanɗude' est le contraire de mawnude (grand)." }, en: { question: "How do you say 'Small'?", options: ["Mawnude", "Fanɗude", "Woɗɗude", "Yaawude"], explanation: "'Fanɗude' is the opposite of mawnude (big)." }, es: { question: "¿Cómo se dice 'Pequeño'?", options: ["Mawnude", "Fanɗude", "Woɗɗude", "Yaawude"], explanation: "'Fanɗude' es lo opuesto a mawnude (grande)." }, ar: { question: "كيف تقول 'صغير'؟", options: ["Mawnude", "Fanɗude", "Woɗɗude", "Yaawude"], explanation: "'Fanɗude' هي عكس mawnude (كبير)." } }, correctAnswerIndex: 1 },
  { id: 'q25', translations: { fr: { question: "Que signifie 'Laawol' ?", options: ["Le village", "Le chemin/route", "La forêt", "La mer"], explanation: "'Laawol' est le chemin que l'on suit." }, en: { question: "What does 'Laawol' mean?", options: ["Village", "Path/Road", "Forest", "Sea"], explanation: "'Laawol' is the path one follows." }, es: { question: "¿Qué significa 'Laawol'?", options: ["Pueblo", "Camino/Ruta", "Bosque", "Mar"], explanation: "'Laawol' es el camino que uno sigue." }, ar: { question: "ماذا تعني 'Laawol'؟", options: ["القرية", "المسار/الطريق", "الغابة", "البحر"], explanation: "'Laawol' هي المسار الذي يتبعه المرء." } }, correctAnswerIndex: 1 },
  { id: 'q26', translations: { fr: { question: "Comment dit-on 'S'il vous plaît' ?", options: ["Jaaraama", "Mbelu", "Sabali", "Hii-hii"], explanation: "Bien que variable selon les régions, 'Sabali' (emprunt) ou des formes de politesse sont utilisées." }, en: { question: "How do you say 'Please'?", options: ["Jaaraama", "Mbelu", "Sabali", "Hii-hii"], explanation: "Though it varies by region, 'Sabali' or other polite forms are used." }, es: { question: "¿Cómo se dice 'Por favor'?", options: ["Jaaraama", "Mbelu", "Sabali", "Hii-hii"], explanation: "Aunque varía según la región, se utiliza 'Sabali' u otras formas educadas." }, ar: { question: "كيف تقول 'من فضلك'؟", options: ["Jaaraama", "Mbelu", "Sabali", "Hii-hii"], explanation: "رغم أنها تختلف حسب المنطقة، تُستخدم 'Sabali' أو أشكال مهذبة أخرى." } }, correctAnswerIndex: 2 },
  { id: 'q27', translations: { fr: { question: "Que signifie 'Deftere' ?", options: ["Le stylo", "Le livre", "Le cahier", "La table"], explanation: "'Deftere' est le livre de savoir." }, en: { question: "What does 'Deftere' mean?", options: ["Pen", "Book", "Notebook", "Table"], explanation: "'Deftere' is the book of knowledge." }, es: { question: "¿Qué significa 'Deftere'?", options: ["Bolígrafo", "Libro", "Cuaderno", "Mesa"], explanation: "'Deftere' es el libro del saber." }, ar: { question: "ماذا تعني 'Deftere'؟", options: ["القلم", "الكتاب", "الدفتر", "الطاولة"], explanation: "'Deftere' هي كتاب المعرفة." } }, correctAnswerIndex: 1 },
  { id: 'q28', translations: { fr: { question: "Comment dit-on 'Au revoir' ?", options: ["Jam waali", "Njaalen he jam", "A arii", "Tana alaa"], explanation: "'Njaalen he jam' signifie 'allons en paix'." }, en: { question: "How do you say 'Goodbye'?", options: ["Jam waali", "Njaalen he jam", "A arii", "Tana alaa"], explanation: "'Njaalen he jam' means 'let's go in peace'." }, es: { question: "¿Cómo se dice 'Adiós'?", options: ["Jam waali", "Njaalen he jam", "A arii", "Tana alaa"], explanation: "'Njaalen he jam' significa 'vayamos en paz'." }, ar: { question: "كيف تقول 'وداعاً'؟", options: ["Jam waali", "Njaalen he jam", "A arii", "Tana alaa"], explanation: "'Njaalen he jam' تعني 'لنذهب بسلام'." } }, correctAnswerIndex: 1 },
  { id: 'q29', translations: { fr: { question: "Que signifie 'Bidɗo' ?", options: ["L'adulte", "L'enfant", "Le sage", "L'étranger"], explanation: "'Bidɗo' signifie l'enfant ou le rejeton." }, en: { question: "What does 'Bidɗo' mean?", options: ["Adult", "Child", "Sage", "Stranger"], explanation: "'Bidɗo' means child or offspring." }, es: { question: "¿Qué significa 'Bidɗo'?", options: ["Adulto", "Niño", "Sabio", "Extranjero"], explanation: "'Bidɗo' significa niño o descendencia." }, ar: { question: "ماذا تعني 'Bidɗo'؟", options: ["البالغ", "الطفل", "الحكيم", "الغريب"], explanation: "'Bidɗo' تعني الطفل أو النسل." } }, correctAnswerIndex: 1 },
  { id: 'q30', translations: { fr: { question: "Comment dit-on 'Le village' ?", options: ["Wuro", "Galle", "Luumo", "Asama"], explanation: "'Wuro' (ou Saare) désigne le village ou le foyer." }, en: { question: "How do you say 'The village'?", options: ["Wuro", "Galle", "Luumo", "Asama"], explanation: "'Wuro' (or Saare) refers to the village or home." }, es: { question: "¿Cómo se dice 'El pueblo'?", options: ["Wuro", "Galle", "Luumo", "Asama"], explanation: "'Wuro' (o Saare) se refiere al pueblo o al hogar." }, ar: { question: "كيف تقول 'القرية'؟", options: ["Wuro", "Galle", "Luumo", "Asama"], explanation: "'Wuro' (أو Saare) تشير إلى القرية أو المنزل." } }, correctAnswerIndex: 0 }
];
