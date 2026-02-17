import React, { useState, useMemo } from 'react';
import { PROVERBS } from '../constants.tsx';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair } from '../types.ts';
import { UIStrings } from '../i18n.ts';

const ProverbsScreen: React.FC<{ onBack: () => void; languagePair: LanguagePair; t: UIStrings }> = ({ onBack, languagePair, t }) => {
  const [learningMode, setLearningMode] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProverbs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return PROVERBS;
    return PROVERBS.filter(p => {
      const pulaarMatch = p.pulaar.toLowerCase().includes(query);
      const translationMatch = getActiveTranslation(p).toLowerCase().includes(query);
      return pulaarMatch || translationMatch;
    });
  }, [searchQuery, languagePair]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 px-6 pt-10 pb-6 sticky top-0 z-40 flex flex-col gap-6 shadow-sm border-b border-stone-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-stone-900 dark:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand leading-none">{t.proverbs}</h2>
            <p className="text-[10px] font-black text-[#00a884] uppercase tracking-widest mt-1">SAGESSE DU PEUPLE</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search_placeholder}
            className="w-full bg-stone-100 dark:bg-slate-800 border-none rounded-2xl py-3 px-12 text-sm font-bold text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-[#00a884]/20 transition-all"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#00a884] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
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
        {filteredProverbs.length > 0 ? (
          filteredProverbs.map((p, idx) => {
            const translation = getActiveTranslation(p);
            const isFlipped = toggles[p.id];
            const isPlayingPulaar = isPlaying?.includes(`${p.id}-Pulaar`);

            return (
              <div key={p.id} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-stone-100 dark:border-slate-800 transition-all active:scale-[0.99] animate-in fade-in duration-300">
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
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-stone-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-4xl mb-6">🔍</div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white heading-brand">{t.no_results}</h3>
            <p className="text-sm text-stone-400 font-bold mt-2">Essayez d'autres mots-clés.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProverbsScreen;