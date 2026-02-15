import React from 'react';
import { Screen } from '../types.ts';
import { UIStrings } from '../i18n.ts';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  t: UIStrings;
}

const Logo = () => (
  <div className="relative w-32 h-32 mb-10 group">
    <div className="absolute inset-0 brand-gradient rounded-[2.5rem] shadow-2xl shadow-[#2d4156]/40 flex items-center justify-center border-4 border-white/20 dark:border-white/5 overflow-hidden transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
      <span className="text-white font-black text-4xl tracking-tighter heading-brand drop-shadow-lg">J</span>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
    </div>
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#2d4156]/10 blur-xl rounded-full"></div>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, t }) => {
  return (
    <div className="p-8 pt-20 flex flex-col min-h-screen">
      <header className="mb-14 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <Logo />
        <h1 className="text-5xl font-black text-[#2d4156] dark:text-stone-100 mb-3 tracking-tight heading-brand leading-none">{t.welcome}</h1>
        <p className="text-stone-500 dark:text-stone-400 font-semibold max-w-[300px] leading-relaxed opacity-80">{t.subtitle}</p>
      </header>

      <div className="grid gap-6 flex-1 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
        <ModuleCard 
          title={t.proverbs} 
          description={t.pulaar_wisdom}
          icon="📜"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.PROVERBS)}
          delay="0"
        />
        <ModuleCard 
          title={t.lessons} 
          description={t.audio_lessons_desc}
          icon="🎧"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.LESSONS)}
          delay="100"
        />
        <ModuleCard 
          title={t.grammar} 
          description={t.grammar_desc}
          icon="📘"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.GRAMMAR)}
          delay="200"
        />
        <ModuleCard 
          title={t.quiz} 
          description={t.quiz_desc}
          icon="🧠"
          bg="bg-white dark:bg-slate-900"
          onClick={() => onNavigate(Screen.QUIZ)}
          delay="300"
        />
      </div>

      <footer className="mt-20 text-center pb-12 animate-in fade-in duration-1000 delay-500">
        <div className="w-16 h-1 bg-[#2d4156] mx-auto mb-6 opacity-10 rounded-full"></div>
        <p className="text-stone-400 dark:text-stone-600 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
          © 2026 {t.welcome}<br/>
          <span className="text-[#2d4156] dark:text-stone-500 opacity-60">Kayes Mali</span>
        </p>
      </footer>
    </div>
  );
};

const ModuleCard: React.FC<{ title: string; description: string; icon: string; bg: string; onClick: () => void; delay: string }> = ({ title, description, icon, bg, onClick, delay }) => (
  <button 
    onClick={onClick}
    style={{ animationDelay: `${delay}ms` }}
    className={`${bg} w-full p-6 rounded-[2.5rem] text-left shadow-sm border border-stone-100 dark:border-slate-800 flex items-center gap-6 group active:scale-[0.96] transition-all hover:border-[#2d4156]/30 dark:hover:border-stone-600 hover:shadow-xl hover:shadow-black/5 animate-in slide-in-from-bottom-4 duration-500`}
  >
    <div className="w-16 h-16 brand-gradient rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-[#2d4156]/20 transition-transform group-hover:scale-110 group-hover:rotate-3 shrink-0">
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <h3 className="text-2xl font-black text-[#2d4156] dark:text-stone-100 mb-1 heading-brand tracking-tight leading-none">{title}</h3>
      <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold leading-tight uppercase tracking-widest truncate">
        {description}
      </p>
    </div>
    <div className="text-stone-200 dark:text-stone-800 transition-colors group-hover:text-[#2d4156]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);

export default HomeScreen;