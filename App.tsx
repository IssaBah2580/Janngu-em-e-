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
  } catch (e) {
    console.warn("Storage access failed:", e);
  }

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
    const saved = localStorage.getItem('janngu_pulaar_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch (e) {}
  return 'light';
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [languagePair, setLanguagePair] = useState<LanguagePair>(() => detectInitialLanguage());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => detectInitialTheme());

  const t = useMemo(() => getI18n(languagePair), [languagePair]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('janngu_pulaar_theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('janngu_pulaar_lang', languagePair);
    } catch (e) {
      console.warn("Could not save language preference:", e);
    }
  }, [languagePair]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentScreen(Screen.HOME);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
    if (screen === Screen.HOME) {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `#${screen.toLowerCase()}`);
    }
  };

  const renderScreen = () => {
    const commonProps = { onBack: () => navigateTo(Screen.HOME), t };
    
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen onNavigate={navigateTo} t={t} />;
      case Screen.PROVERBS:
        return <ProverbsScreen {...commonProps} languagePair={languagePair} />;
      case Screen.LESSONS:
        return <LessonsScreen {...commonProps} languagePair={languagePair} />;
      case Screen.GRAMMAR:
        return <GrammarScreen {...commonProps} languagePair={languagePair} />;
      case Screen.QUIZ:
        return <QuizScreen {...commonProps} languagePair={languagePair} />;
      case Screen.SETTINGS:
        return (
          <SettingsScreen 
            onBack={() => navigateTo(Screen.HOME)} 
            selected={languagePair} 
            onSelect={setLanguagePair} 
            t={t} 
            theme={theme}
            setTheme={setTheme}
          />
        );
      default:
        return <HomeScreen onNavigate={navigateTo} t={t} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-stone-50 dark:bg-slate-950 transition-colors duration-300 shadow-xl overflow-hidden flex flex-col relative">
      <main className="flex-1 pb-20 overflow-y-auto custom-scrollbar">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-slate-900 border-t border-stone-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] transition-colors">
        <NavButton 
          active={currentScreen === Screen.HOME} 
          onClick={() => navigateTo(Screen.HOME)}
          icon={<HomeIcon />}
          label={t.home}
        />
        <NavButton 
          active={currentScreen === Screen.LESSONS} 
          onClick={() => navigateTo(Screen.LESSONS)}
          icon={<BookOpenIcon />}
          label={t.lessons}
        />
        <NavButton 
          active={currentScreen === Screen.SETTINGS} 
          onClick={() => navigateTo(Screen.SETTINGS)}
          icon={<SettingsIcon />}
          label={t.settings}
        />
        <NavButton 
          active={currentScreen === Screen.QUIZ} 
          onClick={() => navigateTo(Screen.QUIZ)}
          icon={<TrophyIcon />}
          label={t.quiz}
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all flex-1 ${active ? 'text-[#2d4156] dark:text-stone-200' : 'text-stone-300 dark:text-stone-600'}`}
  >
    <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
  </button>
);

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const BookOpenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const SettingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

export default App;