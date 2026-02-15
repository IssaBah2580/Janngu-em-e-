
export enum Screen {
  HOME = 'HOME',
  PROVERBS = 'PROVERBS',
  LESSONS = 'LESSONS',
  GRAMMAR = 'GRAMMAR',
  QUIZ = 'QUIZ',
  SETTINGS = 'SETTINGS'
}

export enum LanguagePair {
  PULAAR_FRENCH = 'PULAAR_FRENCH',
  PULAAR_ENGLISH = 'PULAAR_ENGLISH',
  PULAAR_SPANISH = 'PULAAR_SPANISH',
  PULAAR_ARABIC = 'PULAAR_ARABIC',
  ENGLISH_FRENCH = 'ENGLISH_FRENCH',
  FRENCH_SPANISH = 'FRENCH_SPANISH'
}

export interface Proverb {
  id: string;
  pulaar: string;
  translations: {
    fr: string;
    en: string;
    es: string;
    ar: string;
  };
}

export interface VocabularyItem {
  pulaar: string;
  translations: {
    fr: string;
    en: string;
    es: string;
    ar: string;
  };
  source?: string;
}

export interface DialogueLine {
  speaker: string;
  pulaar: string;
  translations: {
    fr: string;
    en: string;
    es: string;
    ar: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  vocabulary?: VocabularyItem[];
  dialogues?: DialogueLine[];
  conversations?: {
    category: string;
    lines: DialogueLine[];
  }[];
}

export interface QuizQuestion {
  id: string;
  translations: {
    fr: { question: string; options: string[]; explanation: string };
    en: { question: string; options: string[]; explanation: string };
    es: { question: string; options: string[]; explanation: string };
    ar: { question: string; options: string[]; explanation: string };
  };
  correctAnswerIndex: number;
}
