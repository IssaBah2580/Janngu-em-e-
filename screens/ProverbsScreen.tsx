import React, { useState } from 'react';
import { PROVERBS } from '../constants.tsx';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair } from '../types.ts';
import { UIStrings } from '../i18n.ts';

const ProverbsScreen: React.FC<{ onBack: () => void; languagePair: LanguagePair; t: UIStrings }> = ({ onBack, languagePair, t }) => {
  const [learningMode, setLearningMode] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const toggleTranslation = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getLanguageName = () => {
    if (languagePair.includes('FRENCH')) return 'French';
    if (languagePair.includes('ENGLISH')) return 'English';
    if (languagePair.includes('SPANISH')) return 'Spanish';
    if (languagePair.includes('ARABIC')) return 'Arabic';
    return 'French';
  };

  const getActiveTranslation = (p: typeof PROVERBS[0]) => {
    switch (languagePair) {
      case LanguagePair.PULAAR_ENGLISH: return p.translations.en;
      case LanguagePair.PULAAR_SPANISH: return p.translations.es;
      case LanguagePair.PULAAR_ARABIC: return p.translations.ar;
      case LanguagePair.PULAAR_FRENCH:
      default: return p.translations.fr;
    }
  };

  const handlePlay = async (text: string, id: string, lang: string = 'Pulaar', slow: boolean = false) => {
    if (!navigator.onLine) {
      alert(t.internet_required);
      return;
    }
    setIsPlaying(id + '-' + lang + (slow ? '-slow' : ''));
    await speakText(text, lang, slow);
    setIsPlaying(null);
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 sticky top-0 bg-stone-50 py-4 z-10">
        <button onClick={onBack} className="p-2.5 rounded-2xl brand-bg text-white shadow-lg active:scale-90 transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-black text-[#2d4156] heading-brand">{t.proverbs}</h2>
        <button 
          onClick={() => setLearningMode(!learningMode)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${learningMode ? 'brand-bg text-white' : 'bg-white text-stone-400'}`}
        >
          {learningMode ? t.mode_learning : t.mode_reveal}
        </button>
      </header>

      <div className="space-y-6">
        {PROVERBS.map((p) => {
          const translation = getActiveTranslation(p);
          const langName = getLanguageName();
          
          return (
            <div key={p.id} className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-[#2d4156] leading-tight heading-brand">
                  {p.pulaar}
                </h3>
                
                {!learningMode || toggles[p.id] ? (
                  <div className="space-y-1 py-4 border-t border-stone-50 mt-2 flex items-start justify-between gap-4">
                    <p className="text-stone-400 text-sm italic font-bold">
                      {translation}
                    </p>
                    <button 
                      disabled={isPlaying === p.id + '-' + langName}
                      onClick={() => handlePlay(translation, p.id, langName)}
                      className="p-2 rounded-xl bg-stone-50 brand-text opacity-40 hover:opacity-100 active:scale-90 transition-all disabled:opacity-50"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleTranslation(p.id)}
                    className="mt-2 text-[10px] font-black brand-text opacity-60 uppercase tracking-[0.2em] text-left hover:opacity-100"
                  >
                    {t.reveal_translation}
                  </button>
                )}
              </div>

              <div className="flex gap-3 items-center">
                <button 
                  disabled={isPlaying?.includes(p.id + '-Pulaar')}
                  onClick={() => handlePlay(p.pulaar, p.id, 'Pulaar')}
                  className="brand-bg text-white p-5 rounded-[1.5rem] flex-1 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#2d4156]/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span className="font-black text-xs uppercase tracking-[0.2em]">{t.play}</span>
                </button>
                
                <button 
                  disabled={isPlaying?.includes(p.id + '-Pulaar')}
                  onClick={() => handlePlay(p.pulaar, p.id, 'Pulaar', true)} 
                  className="bg-stone-50 p-5 rounded-[1.5rem] brand-text opacity-30 hover:opacity-100 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  title={t.slow}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProverbsScreen;