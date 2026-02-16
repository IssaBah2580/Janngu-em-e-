import React, { useState, useEffect, useMemo } from 'react';
import { Screen, LanguagePair } from './types.ts';
import { getI18n } from './i18n.ts';
import HomeScreen from './screens/HomeScreen.tsx';
import ProverbsScreen from './screens/ProverbsScreen.tsx';
import LessonsScreen from './screens/LessonsScreen.tsx';
import GrammarScreen from './screens/GrammarScreen.tsx';
import QuizScreen from './screens/QuizScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';

const detectInitialLanguage = (): LanguagePair => {
  try {
    const saved = localStorage.getItem('janngu_pulaar_lang');
    if (saved && Object.values(LanguagePair).includes(saved as any)) {
      return saved as LanguagePair;
    }
  } catch (e) {}

  const sysLang = (navigator.language || 'fr').split('-')[0].toLowerCase();
  switch (sysLang) {
    case 'en': return LanguagePair.PULAAR_ENGLISH;
    case 'es': return LanguagePair.PULAAR_SPANISH;
    case 'ar': return LanguagePair.PULAAR_ARABIC;
    default: return LanguagePair.PULAAR_FRENCH;
  }
};

const detectInitialTheme = (): 'light' | 'dark' => {
  try {
    const saved = localStorage.getItem('janngu_p_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch (e) {}
  return 'light';
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [languagePair, setLanguagePair] = useState<LanguagePair>(() => detectInitialLanguage());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => detectInitialTheme());
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const t = useMemo(() => getI18n(languagePair), [languagePair]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('janngu_p_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('janngu_pulaar_lang', languagePair);
  }, [languagePair]);

  useEffect(() => {
    const DONATION_INTERVAL = 2 * 60 * 1000; // 2 minutes interval
    const intervalId = setInterval(() => {
      setIsDonationModalOpen(true);
    }, DONATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent("Bonjour Janngu, je souhaite soutenir l'application Janngu Ɗemɗe.");
  const whatsappUrl = `https://wa.me/22394650112?text=${whatsappMessage}`;

  const renderScreen = () => {
    const commonProps = { onBack: () => navigateTo(Screen.HOME), t };
    switch (currentScreen) {
      case Screen.HOME: return <HomeScreen onNavigate={navigateTo} t={t} languagePair={languagePair} />;
      case Screen.PROVERBS: return <ProverbsScreen {...commonProps} languagePair={languagePair} />;
      case Screen.LESSONS: return <LessonsScreen {...commonProps} languagePair={languagePair} />;
      case Screen.GRAMMAR: return <GrammarScreen {...commonProps} languagePair={languagePair} />;
      case Screen.QUIZ: return <QuizScreen {...commonProps} languagePair={languagePair} />;
      case Screen.SETTINGS: return (
        <SettingsScreen 
          onBack={() => navigateTo(Screen.HOME)} 
          selected={languagePair} 
          onSelect={setLanguagePair} 
          t={t} 
          theme={theme}
          setTheme={setTheme}
        />
      );
      default: return <HomeScreen onNavigate={navigateTo} t={t} languagePair={languagePair} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 flex flex-col items-center selection:bg-[#2d4156] selection:text-white overflow-x-hidden">
      <div className="w-full max-w-xl min-h-screen bg-white dark:bg-slate-900 sm:bg-stone-50 sm:dark:bg-slate-950 flex flex-col relative sm:shadow-[0_0_100px_rgba(0,0,0,0.05)] dark:sm:shadow-[0_0_100px_rgba(0,0,0,0.5)] sm:border-x sm:border-stone-200 dark:sm:border-slate-800 transition-colors duration-500">
        
        <main className="flex-1 pb-36 pt-[env(safe-area-inset-top,20px)] overflow-y-auto custom-scrollbar">
          {renderScreen()}
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center pb-[max(env(safe-area-inset-bottom),24px)] px-6">
          <nav className="glass dark:bg-slate-900/95 pointer-events-auto border border-stone-200/60 dark:border-slate-800/80 rounded-[2.5rem] px-4 py-3 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-full max-w-md transition-all duration-500">
            <NavButton active={currentScreen === Screen.HOME} onClick={() => navigateTo(Screen.HOME)} icon={<HomeIcon />} label={t.home} />
            <NavButton active={currentScreen === Screen.LESSONS} onClick={() => navigateTo(Screen.LESSONS)} icon={<BookOpenIcon />} label={t.lessons} />
            <NavButton active={currentScreen === Screen.QUIZ} onClick={() => navigateTo(Screen.QUIZ)} icon={<TrophyIcon />} label={t.quiz} />
            <NavButton active={currentScreen === Screen.SETTINGS} onClick={() => navigateTo(Screen.SETTINGS)} icon={<SettingsIcon />} label={t.settings} />
          </nav>
        </div>

        {isDonationModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={() => setIsDonationModalOpen(false)}></div>
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 duration-500 border border-white dark:border-slate-800">
              <div className="brand-gradient p-12 flex flex-col items-center text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center text-5xl mb-8 backdrop-blur-xl border border-white/20 shadow-inner animate-float">
                  💝
                </div>
                <h3 className="text-3xl font-black heading-brand mb-4 leading-none tracking-tight">{t.donation_title}</h3>
                <p className="text-sm font-medium opacity-90 leading-relaxed px-2">{t.donation_msg}</p>
              </div>
              <div className="p-10 flex flex-col gap-4 bg-white dark:bg-slate-900">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsDonationModalOpen(false)}
                  className="w-full brand-gradient text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-[#2d4156]/30 active:scale-95 transition-all heading-brand"
                >
                  {t.donation_btn}
                </a>
                <button 
                  onClick={() => setIsDonationModalOpen(false)}
                  className="w-full text-stone-600 dark:text-stone-400 py-2 font-black text-[10px] uppercase tracking-[0.3em] hover:opacity-100 transition-opacity"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group p-2 min-w-[64px] ${active ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
  >
    <div className={`p-2.5 rounded-2xl transition-all duration-500 ${active ? 'bg-[#2d4156] text-white shadow-xl active-nav-glow scale-110' : 'text-stone-800 dark:text-stone-400'}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${active ? 'text-[#2d4156] dark:text-white opacity-100' : 'opacity-0'}`}>
      {label}
    </span>
  </button>
);

const HomeIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BookOpenIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const TrophyIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const SettingsIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1-2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;

export default App;