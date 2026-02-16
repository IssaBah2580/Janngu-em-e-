import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../constants.tsx';
import { UIStrings } from '../i18n.ts';
import { LanguagePair } from '../types.ts';
import { GoogleGenAI } from "@google/genai";

interface QuizScreenProps {
  onBack: () => void;
  t: UIStrings;
  languagePair: LanguagePair;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onBack, t, languagePair }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const rawQuestion = QUIZ_QUESTIONS[currentIndex];
  
  const currentContent = useMemo(() => {
    const lang = languagePair.includes('FRENCH') ? 'fr' : 
                 languagePair.includes('ENGLISH') ? 'en' :
                 languagePair.includes('SPANISH') ? 'es' : 'ar';
    return rawQuestion.translations[lang as keyof typeof rawQuestion.translations];
  }, [rawQuestion, languagePair]);

  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const fetchSmartFeedback = async (userChoice: string, correctChoice: string) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return;

    setIsLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Tuteur Pulaar. Question: "${currentContent.question}", Correct: "${correctChoice}", Erreur: "${userChoice}". Expliquez l'erreur brièvement (< 50 mots) en ${languagePair.includes('ENGLISH') ? 'Anglais' : 'Français'}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiFeedback(response.text || null);
    } catch (error) {
      console.error("AI Feedback failed:", error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleOptionSelect = async (index: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(index);
    setShowFeedback(true);
    
    if (index === rawQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    } else {
      fetchSmartFeedback(currentContent.options[index], currentContent.options[rawQuestion.correctAnswerIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setShowFeedback(false);
      setAiFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="p-10 h-full flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-slate-950">
        <div className="w-28 h-28 bg-[#00a884] rounded-full flex items-center justify-center text-white mb-8 shadow-2xl">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        </div>
        <h2 className="text-3xl font-black mb-2 text-stone-900 dark:text-white heading-brand">{t.congrats}</h2>
        <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-10">Score Final: {score} / {QUIZ_QUESTIONS.length}</p>
        <button onClick={() => { setCurrentIndex(0); setScore(0); setIsFinished(false); setSelectedOptionIndex(null); }} className="w-full bg-[#00a884] text-white py-5 rounded-2xl font-black shadow-lg mb-4 uppercase tracking-widest text-xs">Recommencer</button>
        <button onClick={onBack} className="w-full text-stone-400 py-2 font-black text-xs uppercase tracking-widest">Retour Accueil</button>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col bg-[#f8f9fa] dark:bg-slate-950">
      <header className="flex items-center gap-6 mb-12 pt-4">
        <button onClick={onBack} className="text-stone-400">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex-1 h-2.5 bg-stone-100 dark:bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-[#00a884] transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest whitespace-nowrap">{currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <h3 className="text-2xl font-black text-stone-900 dark:text-white leading-tight heading-brand mb-10">
          {currentContent.question}
        </h3>

        <div className="space-y-4">
          {currentContent.options.map((option, i) => {
            const isCorrect = i === rawQuestion.correctAnswerIndex;
            const isSelected = selectedOptionIndex === i;
            let btnClass = "bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800 text-stone-900 dark:text-stone-100";
            
            if (showFeedback) {
              if (isCorrect) btnClass = "bg-[#00a884] border-[#00a884] text-white shadow-xl scale-[1.02]";
              else if (isSelected) btnClass = "bg-rose-500 border-rose-600 text-white shadow-lg";
              else btnClass = "bg-white dark:bg-slate-900 opacity-40 grayscale";
            }

            return (
              <button
                key={i}
                disabled={selectedOptionIndex !== null}
                onClick={() => handleOptionSelect(i)}
                className={`w-full p-8 rounded-[2.5rem] border-2 text-left font-black text-lg transition-all active:scale-[0.98] ${btnClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 space-y-4 animate-in slide-in-from-bottom-6 duration-500">
            <div className={`p-8 rounded-[3rem] border-2 shadow-sm ${selectedOptionIndex === rawQuestion.correctAnswerIndex ? 'bg-emerald-50/50 border-emerald-100 text-[#00a884]' : 'bg-rose-50/50 border-rose-100 text-rose-800'}`}>
              <p className="text-sm font-bold leading-relaxed">{currentContent.explanation}</p>
            </div>
            <button 
              onClick={handleNext} 
              className="w-full bg-[#00a884] text-white py-5 rounded-2xl font-black shadow-xl uppercase tracking-widest text-xs mt-4 active:scale-95 transition-all"
            >
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Suivant' : 'Terminer'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;