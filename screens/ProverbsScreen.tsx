import React, { useState, useMemo } from 'react';
import { PROVERBS } from '../constants.tsx';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair } from '../types.ts';
import { UIStrings } from '../i18n.ts';

const ProverbsScreen: React.FC<{ onBack: () => void; languagePair: LanguagePair; t: UIStrings }> = ({ onBack, languagePair, t }) => {
  const [learningMode, setLearningMode] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const getActiveTranslation = (p: typeof PROVERBS[0]) => {
    switch (languagePair) {
      case LanguagePair.PULAAR_ENGLISH: return p.translations.en;
      case LanguagePair.PULAAR_SPANISH: return p.translations.es;
      case LanguagePair.PULAAR_ARABIC: return p.translations.ar;
      default: return p.translations.fr;
    }
  };

  const handlePlay = async (text: string, id: string, lang: string = 'Pulaar', slow: boolean = false) => {
    if (!navigator.onLine) {
      alert(t.internet_required);
      return;
    }
    const playKey = `${id}-${lang}${slow ? '-slow' : ''}`;
    setIsPlaying(playKey);
    await speakText(text, lang, slow);
    setIsPlaying(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 px-6 pt-10 pb-6 sticky top-0 z-40 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-stone-900 dark:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand leading-none">{t.proverbs}</h2>
            <p className="text-[10px] font-black text-[#00a884] uppercase tracking-widest mt-1">SAGESSE DU PEUPLE</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setLearningMode(false)}
            className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${!learningMode ? 'bg-[#00a884] text-white shadow-lg' : 'bg-stone-100 dark:bg-slate-800 text-stone-400'}`}
          >
            RÉVÉLER
          </button>
          <button 
            onClick={() => setLearningMode(true)}
            className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${learningMode ? 'bg-[#00a884] text-white shadow-lg' : 'bg-stone-100 dark:bg-slate-800 text-stone-400'}`}
          >
            APPRENDRE
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6 pb-32">
        {PROVERBS.map((p, idx) => {
          const translation = getActiveTranslation(p);
          const isFlipped = toggles[p.id];
          const isPlayingPulaar = isPlaying?.includes(`${p.id}-Pulaar`);

          return (
            <div key={p.id} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-stone-100 dark:border-slate-800 transition-all active:scale-[0.99]">
              <div className="flex items-start justify-between gap-6 mb-6">
                 <h3 className="text-2xl font-black text-stone-900 dark:text-stone-50 leading-tight heading-brand">“{p.pulaar}”</h3>
                 <button 
                  onClick={() => handlePlay(p.pulaar, p.id, 'Pulaar')}
                  className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${isPlayingPulaar ? 'bg-[#00a884] text-white' : 'bg-[#f0f3f5] dark:bg-slate-800 text-[#00a884]'}`}
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                 </button>
              </div>

              {(!learningMode || isFlipped) ? (
                <div className="pt-6 border-t border-stone-50 dark:border-slate-800 animate-in fade-in duration-500">
                  <p className="text-stone-400 font-bold italic">{translation}</p>
                </div>
              ) : (
                <button 
                  onClick={() => setToggles(prev => ({ ...prev, [p.id]: true }))}
                  className="w-full py-4 border-2 border-dashed border-stone-100 dark:border-slate-800 rounded-2xl text-[10px] font-black text-stone-300 uppercase tracking-widest"
                >
                  CLIQUEZ POUR RÉVÉLER
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProverbsScreen;