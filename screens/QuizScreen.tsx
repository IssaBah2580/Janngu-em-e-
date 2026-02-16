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
      const prompt = `You are a Pulaar language tutor. 
      Question: "${currentContent.question}"
      Correct Answer: "${correctChoice}"
      User's Wrong Choice: "${userChoice}"
      
      Task: Briefly explain why "${userChoice}" is incorrect in this context and provide a subtle linguistic hint to help them find the correct answer next time. Do not just repeat the correct answer. Keep it under 60 words. Speak in ${languagePair.includes('ENGLISH') ? 'English' : 'French'}.`;

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
    
    const isCorrect = index === rawQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // Fetch AI feedback for incorrect answers
      fetchSmartFeedback(currentContent.options[index], currentContent.options[rawQuestion.correctAnswerIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setShowFeedback(false);
      setAiFeedback(null);
      setIsLoadingAi(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setShowFeedback(false);
    setAiFeedback(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center animate-in zoom-in duration-700">
        <div className="w-32 h-32 brand-gradient rounded-full flex items-center justify-center text-white mb-8 shadow-2xl">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        </div>
        <h2 className="text-3xl font-black mb-2 text-stone-900 dark:text-white heading-brand">{t.congrats}</h2>
        <p className="text-stone-500 dark:text-stone-400 font-bold text-center mb-8 uppercase tracking-widest text-xs">Score: {score} / {QUIZ_QUESTIONS.length}</p>
        <button onClick={restartQuiz} className="w-full bg-brand text-white py-5 rounded-2xl font-black shadow-lg mb-3 heading-brand uppercase tracking-widest text-xs">Recommencer</button>
        <button onClick={onBack} className="w-full bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 py-5 rounded-2xl font-black text-xs uppercase tracking-widest">Retour</button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full flex flex-col bg-stone-50 dark:bg-slate-950">
      <header className="flex items-center justify-between gap-6 mb-10 pt-4">
        <button onClick={onBack} className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 text-brand dark:text-stone-300">
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div className="flex-1 h-2.5 bg-stone-100 dark:bg-slate-900 rounded-full overflow-hidden border border-stone-200/50 dark:border-slate-800">
          <div className="h-full bg-brand transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[10px] font-black text-stone-500 dark:text-stone-500 uppercase tracking-widest">{currentIndex + 1}/{QUIZ_QUESTIONS.length}</span>
      </header>

      <div className="flex-1 pb-24">
        <h3 className="text-3xl font-black text-stone-900 dark:text-white leading-tight heading-brand mb-10 animate-in slide-in-from-left-4">
          {currentContent.question}
        </h3>

        <div className="space-y-4">
          {currentContent.options.map((option, i) => {
            const isCorrect = i === rawQuestion.correctAnswerIndex;
            const isSelected = selectedOptionIndex === i;
            let btnClass = "bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800 text-stone-900 dark:text-stone-100 shadow-sm";
            
            if (showFeedback) {
              if (isCorrect) {
                btnClass = "bg-emerald-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-[1.02]";
              } else if (isSelected) {
                btnClass = "bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-500/20";
              } else {
                btnClass = "bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800 text-stone-300 dark:text-stone-700 opacity-50";
              }
            }

            return (
              <button
                key={i}
                disabled={selectedOptionIndex !== null}
                onClick={() => handleOptionSelect(i)}
                className={`w-full p-6 rounded-[2.5rem] border-2 text-left font-black text-lg transition-all active:scale-[0.98] ${btnClass}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showFeedback && isCorrect && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="animate-in zoom-in"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Standard Feedback */}
            <div className={`p-8 rounded-[3rem] border-2 ${selectedOptionIndex === rawQuestion.correctAnswerIndex ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20 text-rose-800 dark:text-rose-400'}`}>
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">{selectedOptionIndex === rawQuestion.correctAnswerIndex ? '✨' : '⚠️'}</div>
                <p className="text-sm font-bold leading-relaxed italic">“{currentContent.explanation}”</p>
              </div>
            </div>

            {/* Smart AI Tutor Insights */}
            {(isLoadingAi || aiFeedback) && selectedOptionIndex !== rawQuestion.correctAnswerIndex && (
              <div className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-brand/20 dark:border-slate-800 shadow-xl shadow-brand/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                </div>
                
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-brand dark:text-stone-500 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
                  Conseil du Tuteur AI
                </h4>

                {isLoadingAi ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-stone-100 dark:bg-slate-800 rounded-full w-full"></div>
                    <div className="h-4 bg-stone-100 dark:bg-slate-800 rounded-full w-[90%]"></div>
                    <div className="h-4 bg-stone-100 dark:bg-slate-800 rounded-full w-[40%]"></div>
                  </div>
                ) : (
                  <p className="text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed animate-in fade-in duration-1000">
                    {aiFeedback}
                  </p>
                )}
              </div>
            )}

            <button 
              onClick={handleNext} 
              className="w-full p-6 rounded-[2rem] font-black bg-brand text-white shadow-xl shadow-brand/20 heading-brand uppercase tracking-widest text-xs active:scale-95 transition-all"
            >
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Question Suivante' : 'Voir le Résultat'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;