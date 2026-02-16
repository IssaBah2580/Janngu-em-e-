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
    const playKey = `${id}-${lang}${slow ? '-slow' : ''}`;
    setIsPlaying(playKey);
    await speakText(text, lang, slow);
    setIsPlaying(null);
  };

  const filteredProverbs = useMemo(() => {
    if (!searchQuery.trim()) return PROVERBS;
    const query = searchQuery.toLowerCase();
    return PROVERBS.filter(p => 
      p.pulaar.toLowerCase().includes(query) || 
      getActiveTranslation(p).toLowerCase().includes(query)
    );
  }, [searchQuery, languagePair]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl sticky top-0 z-30 border-b border-stone-100 dark:border-slate-900 transition-colors">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2.5 rounded-2xl brand-bg text-white shadow-lg active:scale-90 transition-all">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h2 className="text-xl font-black text-[#2d4156] dark:text-stone-100 heading-brand">{t.proverbs}</h2>
          </div>
          <button 
            onClick={() => setLearningMode(!learningMode)}
            className={`px-4 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 ${learningMode ? 'brand-bg text-white' : 'bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 text-stone-400'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${learningMode ? 'bg-white animate-pulse' : 'bg-stone-200 dark:bg-slate-700'}`}></div>
            {learningMode ? t.mode_learning : t.mode_reveal}
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="px-5 pb-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#2d4156] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un proverbe..."
              className="w-full bg-stone-100 dark:bg-slate-900 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:ring-2 focus:ring-[#2d4156]/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-stone-400 hover:text-stone-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {filteredProverbs.length > 0 ? (
          filteredProverbs.map((p, idx) => {
            const translation = getActiveTranslation(p);
            const langName = getLanguageName();
            const isFlipped = toggles[p.id];
            
            return (
              <div 
                key={p.id} 
                className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-stone-100 dark:border-slate-800 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative">
                  <div className="absolute -left-4 -top-4 text-6xl text-stone-50 dark:text-slate-800/50 font-black opacity-40">“</div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#2d4156] dark:text-stone-100 leading-tight heading-brand relative z-10">
                    {p.pulaar}
                  </h3>
                </div>
                
                <div className="h-px bg-stone-50 dark:bg-slate-800"></div>

                <div>
                  {!learningMode || isFlipped ? (
                    <div className="flex items-start justify-between gap-6 animate-in fade-in duration-500">
                      <p className="text-stone-400 dark:text-stone-500 text-sm sm:text-base italic font-bold leading-relaxed flex-1">
                        {translation}
                      </p>
                      <button 
                        disabled={!!isPlaying}
                        onClick={() => handlePlay(translation, p.id, langName)}
                        className={`p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 brand-text dark:text-stone-400 transition-all active:scale-90 shadow-sm border border-white dark:border-slate-700 ${isPlaying === `${p.id}-${langName}` ? 'ring-2 ring-[#2d4156]' : 'opacity-40 hover:opacity-100'}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => toggleTranslation(p.id)}
                      className="w-full py-4 px-6 rounded-2xl border-2 border-dashed border-stone-100 dark:border-slate-800 text-[10px] font-black brand-text dark:text-stone-600 uppercase tracking-[0.2em] hover:border-stone-200 dark:hover:border-slate-700 transition-colors"
                    >
                      {t.reveal_translation}
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    disabled={!!isPlaying}
                    onClick={() => handlePlay(p.pulaar, p.id, 'Pulaar')}
                    className={`brand-bg text-white p-5 rounded-3xl flex-1 flex items-center justify-center gap-3 shadow-xl shadow-[#2d4156]/10 active:scale-95 transition-all disabled:opacity-50 ${isPlaying === `${p.id}-Pulaar` ? 'ring-4 ring-[#2d4156]/20' : ''}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    <span className="font-black text-xs uppercase tracking-[0.2em]">{t.play}</span>
                  </button>
                  
                  <button 
                    disabled={!!isPlaying}
                    onClick={() => handlePlay(p.pulaar, p.id, 'Pulaar', true)} 
                    className={`bg-stone-50 dark:bg-slate-800 p-5 rounded-3xl brand-text dark:text-stone-300 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 border border-white dark:border-slate-700 ${isPlaying === `${p.id}-Pulaar-slow` ? 'ring-4 ring-stone-100 dark:ring-slate-700 opacity-100' : 'opacity-40 hover:opacity-100'}`}
                    title={t.slow}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center px-10 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-stone-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-3xl mb-6">🔍</div>
            <h3 className="text-xl font-black text-[#2d4156] dark:text-stone-100 mb-2 heading-brand">Aucun résultat</h3>
            <p className="text-stone-400 dark:text-stone-500 text-sm font-bold">Nous n'avons trouvé aucun proverbe correspondant à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProverbsScreen;