import React, { useMemo } from 'react';
import { Screen, LanguagePair } from '../types.ts';
import { UIStrings } from '../i18n.ts';
import { PROVERBS } from '../constants.tsx';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  t: UIStrings;
  languagePair: LanguagePair;
}

const Logo = () => (
  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 group">
    <div className="absolute inset-0 bg-[#00a884] rounded-[2rem] shadow-2xl flex items-center justify-center border-4 border-white/20 transition-transform duration-500 group-hover:scale-110">
      <span className="text-white font-black text-4xl sm:text-5xl tracking-tighter heading-brand">J</span>
    </div>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, t, languagePair }) => {
  const dailyProverb = useMemo(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return PROVERBS[dayOfYear % PROVERBS.length];
  }, []);

  const getActiveTranslation = (p: typeof PROVERBS[0]) => {
    switch (languagePair) {
      case LanguagePair.PULAAR_ENGLISH: return p.translations.en;
      case LanguagePair.PULAAR_SPANISH: return p.translations.es;
      case LanguagePair.PULAAR_ARABIC: return p.translations.ar;
      default: return p.translations.fr;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] dark:bg-slate-950">
      <header className="px-6 pt-12 pb-8 flex flex-col items-center text-center">
        <Logo />
        <h1 className="text-4xl font-black text-stone-900 dark:text-white mb-2 tracking-tight heading-brand leading-none">
          {t.welcome}
        </h1>
        <p className="text-stone-400 dark:text-stone-500 font-bold text-sm uppercase tracking-widest opacity-80">
          JANNGU PULAAR FLOW
        </p>
      </header>

      <div className="px-6 space-y-6 pb-20">
        {/* Featured Hero Card - Salminaangu style */}
        <div className="bg-[#00a884] p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-3xl font-black heading-brand mb-2">Salminaangu</h3>
            <p className="text-lg font-bold opacity-90 mb-8">Salutations & Accueil</p>
            <button 
              onClick={() => onNavigate(Screen.LESSONS)}
              className="inline-flex items-center gap-2 bg-white/20 px-5 py-2.5 rounded-full border border-white/20 backdrop-blur-sm active:scale-95 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">MODULE INTERACTIF</span>
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        </div>

        {/* Proverb of the day */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-stone-100 dark:border-slate-800 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">📜</div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">SAGESSE ANCESTRALE</p>
           </div>
           <p className="text-xl font-black text-stone-900 dark:text-stone-50 leading-tight mb-2 heading-brand italic">
             “{dailyProverb.pulaar}”
           </p>
           <p className="text-sm text-stone-400 font-bold">{getActiveTranslation(dailyProverb)}</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-2 gap-4">
          <ModuleButton 
            onClick={() => onNavigate(Screen.PROVERBS)}
            title={t.proverbs}
            icon="📜"
            color="bg-orange-50 text-orange-600 dark:bg-orange-900/10"
          />
          <ModuleButton 
            onClick={() => onNavigate(Screen.LESSONS)}
            title={t.lessons}
            icon="🎧"
            color="bg-blue-50 text-blue-600 dark:bg-blue-900/10"
          />
          <ModuleButton 
            onClick={() => onNavigate(Screen.GRAMMAR)}
            title={t.grammar}
            icon="📘"
            color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/10"
          />
          <ModuleButton 
            onClick={() => onNavigate(Screen.QUIZ)}
            title={t.quiz}
            icon="🧠"
            color="bg-rose-50 text-rose-600 dark:bg-rose-900/10"
          />
        </div>

        {/* Extra Action */}
        <button 
          onClick={() => onNavigate(Screen.SETTINGS)}
          className="w-full bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-stone-100 dark:border-slate-800 flex items-center justify-between shadow-sm active:scale-[0.98] group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-slate-800 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">⚙️</div>
            <p className="font-black text-stone-900 dark:text-stone-100">{t.settings}</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-300"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

const ModuleButton = ({ onClick, title, icon, color }: { onClick: () => void, title: string, icon: string, color: string }) => (
  <button 
    onClick={onClick}
    className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-stone-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-4 transition-all active:scale-95 group"
  >
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform ${color}`}>
      {icon}
    </div>
    <p className="font-black text-stone-900 dark:text-stone-100 text-sm tracking-tight">{title}</p>
  </button>
);

export default HomeScreen;