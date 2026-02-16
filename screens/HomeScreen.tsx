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
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 group">
    <div className="absolute inset-0 brand-gradient rounded-[2.5rem] shadow-2xl shadow-brand/40 flex items-center justify-center border-[6px] border-white/20 dark:border-white/10 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
      <span className="text-white font-black text-4xl sm:text-5xl tracking-tighter heading-brand drop-shadow-2xl">J</span>
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
      case LanguagePair.PULAAR_FRENCH:
      default: return p.translations.fr;
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Janngu Ɗemɗe',
      text: t.teach_friend_desc,
      url: 'https://janngu.com'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Navigate to settings where socials are listed
        onNavigate(Screen.SETTINGS);
      }
    } catch (err) {
      console.log('Share failed', err);
      onNavigate(Screen.SETTINGS);
    }
  };

  return (
    <div className="px-6 py-10 flex flex-col min-h-full">
      <header className="mb-14 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-6 duration-1000">
        <Logo />
        <h1 className="text-4xl sm:text-5xl font-black text-stone-950 dark:text-white mb-3 tracking-tight heading-brand leading-none">
          {t.welcome}
        </h1>
        <p className="text-stone-700 dark:text-stone-400 font-bold max-w-[300px] text-sm sm:text-base opacity-90 leading-relaxed">
          {t.subtitle}
        </p>
      </header>

      {/* Daily Proverb Section */}
      <section className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        <div className="bg-amber-100/40 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-900/30 p-8 sm:p-10 rounded-[3rem] relative overflow-hidden group shadow-md shadow-amber-900/5 transition-all duration-500">
          <div className="flex items-center gap-3 mb-5">
             <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></div>
             <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em]">Sagesse du jour</p>
          </div>
          
          <p className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-50 leading-tight mb-4 heading-brand">
            “{dailyProverb.pulaar}”
          </p>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="h-1 w-8 bg-amber-300 dark:bg-amber-900/50 rounded-full"></div>
            <p className="text-sm text-stone-800 dark:text-stone-400 font-bold italic">
              {getActiveTranslation(dailyProverb)}
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
        <ModuleCard 
          title={t.proverbs} 
          description={t.pulaar_wisdom}
          icon="📜"
          onClick={() => onNavigate(Screen.PROVERBS)}
          delay="0"
          accentColor="text-orange-600"
        />
        <ModuleCard 
          title={t.lessons} 
          description={t.audio_lessons_desc}
          icon="🎧"
          onClick={() => onNavigate(Screen.LESSONS)}
          delay="100"
          accentColor="text-blue-600"
        />
        <ModuleCard 
          title={t.grammar} 
          description={t.grammar_desc}
          icon="📘"
          onClick={() => onNavigate(Screen.GRAMMAR)}
          delay="200"
          accentColor="text-emerald-600"
        />
        <ModuleCard 
          title={t.quiz} 
          description={t.quiz_desc}
          icon="🧠"
          onClick={() => onNavigate(Screen.QUIZ)}
          delay="300"
          accentColor="text-rose-600"
        />
        
        {/* Teach a Friend Card - Promoted Visual Style */}
        <div className="sm:col-span-2">
          <ModuleCard 
            title={t.teach_friend} 
            description={t.teach_friend_desc}
            icon="🤝"
            onClick={handleShare}
            delay="400"
            accentColor="text-brand"
            isWide={true}
          />
        </div>
      </div>

      <footer className="mt-20 text-center pb-12 animate-in fade-in duration-1000 delay-700">
        <div className="inline-flex items-center gap-2 mb-4 opacity-30">
          <div className="w-10 h-[2px] bg-brand dark:bg-stone-500 rounded-full"></div>
          <div className="w-2 h-2 bg-brand dark:bg-stone-500 rounded-full"></div>
          <div className="w-10 h-[2px] bg-brand dark:bg-stone-500 rounded-full"></div>
        </div>
        <p className="text-stone-500 dark:text-stone-600 text-[10px] font-black uppercase tracking-[0.4em]">
          Made with Love in Mali • 2026
        </p>
      </footer>
    </div>
  );
};

const ModuleCard: React.FC<{ title: string; description: string; icon: string; onClick: () => void; delay: string; accentColor: string; isWide?: boolean }> = ({ title, description, icon, onClick, delay, accentColor, isWide }) => (
  <button 
    onClick={onClick}
    style={{ animationDelay: `${delay}ms` }}
    className={`bg-white dark:bg-slate-900 w-full p-6 sm:p-8 rounded-[2.5rem] text-left shadow-lg shadow-black/[0.03] border-2 border-stone-100 dark:border-slate-800 flex flex-col gap-6 group active:scale-[0.97] transition-all duration-300 hover:border-brand/30 dark:hover:border-slate-600 animate-in slide-in-from-bottom-6 duration-700 ${isWide ? 'sm:flex-row sm:items-center sm:gap-10' : ''}`}
  >
    <div className="flex items-center justify-between w-full sm:w-auto">
      <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-brand/10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 ${accentColor} sm:hidden`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-xl sm:text-2xl font-black text-stone-950 dark:text-stone-50 mb-1 heading-brand tracking-tight truncate">
        {title}
      </h3>
      <p className="text-[10px] sm:text-xs text-stone-700 dark:text-stone-400 font-bold uppercase tracking-widest line-clamp-2 leading-relaxed">
        {description}
      </p>
    </div>
    <div className={`hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 ${accentColor}`}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);

export default HomeScreen;