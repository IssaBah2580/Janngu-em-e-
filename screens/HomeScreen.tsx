import React from 'react';
import { Screen } from '../types.ts';
import { UIStrings } from '../i18n.ts';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  t: UIStrings;
}

const Logo = () => (
  <div className="relative w-28 h-28 mb-8">
    <div className="absolute inset-0 bg-[#2d4156] dark:bg-slate-800 rounded-full shadow-[0_15px_30px_-10px_rgba(45,65,86,0.5)] flex items-center justify-center border-4 border-white/10 overflow-hidden transition-colors">
      <span className="text-white font-black text-3xl tracking-tighter transform scale-y-110 heading-brand">Janngu</span>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
    </div>
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-black/10 blur-lg rounded-full"></div>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, t }) => {
  return (
    <div className="p-6 pt-16 flex flex-col min-h-screen">
      <header className="mb-12 flex flex-col items-center text-center">
        <Logo />
        <h1 className="text-4xl font-black text-[#2d4156] dark:text-stone-100 mb-3 tracking-tight heading-brand">{t.welcome}</h1>
        <p className="text-stone-500 dark:text-stone-400 font-medium max-w-[280px] leading-relaxed">{t.subtitle}</p>
      </header>

      <div className="grid gap-6 flex-1">
        <ModuleCard 
          title={t.proverbs} 
          description={t.pulaar_wisdom}
          icon="📜"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.PROVERBS)}
        />
        <ModuleCard 
          title={t.lessons} 
          description={t.audio_lessons_desc}
          icon="🎧"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.LESSONS)}
        />
        <ModuleCard 
          title={t.grammar} 
          description={t.grammar_desc}
          icon="📘"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.GRAMMAR)}
        />
        <ModuleCard 
          title={t.quiz} 
          description={t.quiz_desc}
          icon="🧠"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.QUIZ)}
        />
      </div>

      <footer className="mt-16 text-center text-stone-300 dark:text-stone-700 text-[10px] font-black uppercase tracking-[0.2em] pb-12">
        <div className="w-12 h-1 brand-bg mx-auto mb-4 opacity-20 dark:opacity-40 rounded-full"></div>
        <p>© 2024 {t.welcome} • Sénégal</p>
      </footer>
    </div>
  );
};

const ModuleCard: React.FC<{ title: string; description: string; icon: string; bg: string; onClick: () => void }> = ({ title, description, icon, bg, onClick }) => (
  <button 
    onClick={onClick}
    className={`${bg} w-full p-6 rounded-[2.5rem] text-left shadow-[0_10px_20px_-5px_rgba(0,0,0,0.03)] active:scale-[0.97] transition-all hover:shadow-[0_15px_30px_-10px_rgba(45,65,86,0.1)] border border-stone-100 dark:border-slate-800 flex items-center gap-5 group`}
  >
    <div className="w-16 h-16 brand-bg rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-stone-200 dark:shadow-none transition-transform group-hover:scale-110">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-black text-[#2d4156] dark:text-stone-100 mb-1 heading-brand">{title}</h3>
      <p className="text-xs text-stone-400 dark:text-stone-500 font-bold leading-tight uppercase tracking-widest">{description.length > 25 ? description.substring(0, 25) + '...' : description}</p>
    </div>
    <div className="brand-text dark:text-stone-600 opacity-20">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);

export default HomeScreen;