import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../constants.tsx';
import { UIStrings } from '../i18n.ts';
import { LanguagePair } from '../types.ts';
import { speakText } from '../services/geminiService.ts';

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
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const rawQuestion = QUIZ_QUESTIONS[currentIndex];
  
  const getLanguageName = () => {
    if (languagePair.includes('FRENCH')) return 'French';
    if (languagePair.includes('ENGLISH')) return 'English';
    if (languagePair.includes('SPANISH')) return 'Spanish';
    if (languagePair.includes('ARABIC')) return 'Arabic';
    return 'French';
  };

  const handleSpeak = async (text: string, lang: string = 'Pulaar') => {
    if (!navigator.onLine) {
      alert(t.internet_required);
      return;
    }
    setIsPlaying(text);
    await speakText(text, lang);
    setIsPlaying(null);
  };

  // Extract correct translation based on language pair
  const currentContent = useMemo(() => {
    const lang = languagePair.includes('FRENCH') ? 'fr' : 
                 languagePair.includes('ENGLISH') ? 'en' :
                 languagePair.includes('SPANISH') ? 'es' : 'ar';
    return rawQuestion.translations[lang as keyof typeof rawQuestion.translations];
  }, [rawQuestion, languagePair]);

  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(index);
    setShowFeedback(true);
    if (index === rawQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const currentLang = getLanguageName();

  if (isFinished) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center animate-in zoom-in duration-700">
        <div className="w-36 h-36 brand-bg rounded-full flex items-center justify-center text-white mb-10 shadow-2xl shadow-[#2d4156]/40 relative overflow-hidden">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
        </div>
        <h2 className="text-4xl font-black mb-2 brand-text heading-brand text-center">{t.congrats}</h2>
        <p className="text-stone-400 mb-12 font-bold uppercase tracking-widest text-[10px] text-center">Challenge Complete</p>
        
        <div className="bg-white p-10 rounded-[3rem] w-full text-center border border-stone-100 shadow-sm mb-10">
          <p className="text-stone-300 font-black uppercase tracking-[0.3em] text-[10px] mb-4">{t.score}</p>
          <div className="text-6xl font-black brand-text heading-brand">
            {score} <span className="text-2xl text-stone-200">/ {QUIZ_QUESTIONS.length}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={restartQuiz}
            className="w-full brand-bg text-white p-5 rounded-2xl font-black shadow-xl shadow-[#2d4156]/20 active:scale-95 transition-all heading-brand"
          >
            {t.try_again}
          </button>
          <button 
            onClick={onBack}
            className="w-full bg-stone-100 text-stone-400 p-5 rounded-2xl font-black active:scale-95 transition-all uppercase tracking-[0.2em] text-xs"
          >
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full flex flex-col">
      <header className="flex items-center justify-between gap-6 mb-10 pt-4">
        <button onClick={onBack} className="p-2.5 rounded-2xl brand-bg text-white shadow-lg active:scale-90 transition-all">
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div className="flex-1 px-4">
          <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full brand-bg transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-black brand-text opacity-40 uppercase tracking-widest">{currentIndex + 1}/{QUIZ_QUESTIONS.length}</span>
      </header>

      <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="flex items-start justify-between gap-6 mb-10">
          <h3 className="text-3xl font-black text-[#2d4156] leading-tight heading-brand">
            {currentContent.question}
          </h3>
          <button 
            onClick={() => handleSpeak(currentContent.question, currentLang)}
            className="w-14 h-14 rounded-2xl bg-white brand-text shadow-sm hover:shadow-md transition-all shrink-0 flex items-center justify-center active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>
        </div>

        <div className="space-y-4">
          {currentContent.options.map((option, i) => {
            const isCorrect = i === rawQuestion.correctAnswerIndex;
            const isSelected = selectedOptionIndex === i;
            
            let btnClass = "bg-white border-stone-100 text-[#2d4156] hover:border-[#2d4156]/30";
            if (showFeedback) {
              if (isCorrect) btnClass = "brand-bg border-[#2d4156] text-white shadow-xl shadow-[#2d4156]/20";
              else if (isSelected) btnClass = "bg-rose-500 border-rose-500 text-white shadow-xl shadow-rose-200";
            }

            return (
              <button
                key={i}
                disabled={selectedOptionIndex !== null}
                onClick={() => handleOptionSelect(i)}
                className={`w-full p-6 rounded-[2rem] border-2 text-left font-black text-xl transition-all active:scale-[0.98] heading-brand shadow-sm flex items-center justify-between gap-4 ${btnClass}`}
              >
                <div className="flex items-center gap-5">
                  <span className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-xs transition-colors ${showFeedback ? 'border-white/20' : 'border-stone-100 text-stone-300'}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </div>
                {showFeedback && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleSpeak(option, 'Pulaar'); }}
                    className={`p-2 rounded-xl transition-all ${isCorrect ? 'bg-white/10 text-white' : 'bg-black/10 text-white'}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                  </button>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`mt-10 p-8 rounded-[2.5rem] border-2 animate-in slide-in-from-bottom-8 duration-500 ${
            selectedOptionIndex === rawQuestion.correctAnswerIndex ? 'bg-emerald-50 border-emerald-100/50' : 'bg-rose-50 border-rose-100/50'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-stone-600 font-bold text-sm leading-relaxed italic">{currentContent.explanation}</p>
              <button 
                onClick={() => handleSpeak(currentContent.explanation, currentLang)}
                className="p-2.5 rounded-xl bg-white brand-text shadow-sm hover:opacity-70 shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              </button>
            </div>
            <button 
              onClick={handleNext}
              className={`mt-8 w-full p-5 rounded-2xl font-black text-white shadow-xl active:scale-95 transition-all heading-brand ${
                 selectedOptionIndex === rawQuestion.correctAnswerIndex ? 'brand-bg' : 'bg-rose-500'
              }`}
            >
              {t.continue}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;