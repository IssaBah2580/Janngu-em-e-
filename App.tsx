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
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('janngu_p_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('janngu_pulaar_lang', languagePair);
  }, [languagePair]);

  useEffect(() => {
    // Popup interval changed to 1 minute (60,000ms)
    const DONATION_INTERVAL = 60 * 1000; 
    const intervalId = setInterval(() => {
      setIsDonationModalOpen(true);
    }, DONATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const path = screen === Screen.HOME ? '/' : `#${screen.toLowerCase()}`;
    window.history.pushState(null, '', path);
  };

  const whatsappMessage = encodeURIComponent("Bonjour Janngu, je souhaite soutenir l'application Janngu Ɗemɗe.");
  const whatsappUrl = `https://wa.me/22394650112?text=${whatsappMessage}`;

  const renderScreen = () => {
    const commonProps = { onBack: () => navigateTo(Screen.HOME), t };
    switch (currentScreen) {
      case Screen.HOME: return <HomeScreen onNavigate={navigateTo} t={t} />;
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
      default: return <HomeScreen onNavigate={navigateTo} t={t} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-stone-50 dark:bg-slate-950 transition-colors duration-500 shadow-2xl flex flex-col relative overflow-x-hidden">
      <main className="flex-1 pb-28 overflow-y-auto custom-scrollbar">
        {renderScreen()}
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-0 right-0 max-w-md mx-auto px-6 z-50 pointer-events-none">
        <nav className="glass dark:bg-slate-900/80 pointer-events-auto border border-white/20 dark:border-slate-800 rounded-[2.5rem] px-4 py-3 flex justify-around items-center shadow-2xl shadow-black/10 transition-all duration-300">
          <NavButton active={currentScreen === Screen.HOME} onClick={() => navigateTo(Screen.HOME)} icon={<HomeIcon />} />
          <NavButton active={currentScreen === Screen.LESSONS} onClick={() => navigateTo(Screen.LESSONS)} icon={<BookOpenIcon />} />
          <NavButton active={currentScreen === Screen.QUIZ} onClick={() => navigateTo(Screen.QUIZ)} icon={<TrophyIcon />} />
          <NavButton active={currentScreen === Screen.SETTINGS} onClick={() => navigateTo(Screen.SETTINGS)} icon={<SettingsIcon />} />
        </nav>
      </div>

      {/* Donation Modal */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" onClick={() => setIsDonationModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-500 border border-stone-100 dark:border-slate-800">
            <div className="brand-gradient p-12 flex flex-col items-center text-center text-white relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center text-5xl mb-8 backdrop-blur-xl border border-white/20 shadow-inner animate-float">
                💝
              </div>
              <h3 className="text-3xl font-black heading-brand mb-4 leading-tight">{t.donation_title}</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed italic px-2">{t.donation_msg}</p>
            </div>
            <div className="p-10 flex flex-col gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDonationModalOpen(false)}
                className="w-full brand-gradient text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-[#2d4156]/30 active:scale-95 transition-all heading-brand tracking-wide"
              >
                {t.donation_btn}
              </a>
              <button 
                onClick={() => setIsDonationModalOpen(false)}
                className="w-full text-stone-400 dark:text-stone-600 py-2 font-black text-[10px] uppercase tracking-[0.3em] hover:opacity-70 transition-opacity"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${active ? 'bg-[#2d4156] text-white shadow-lg active-nav-glow' : 'text-stone-400 dark:text-stone-500 hover:text-[#2d4156] dark:hover:text-stone-300'}`}
  >
    <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
      {icon}
    </div>
    {active && (
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
    )}
  </button>
);

const HomeIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BookOpenIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const TrophyIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const SettingsIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;

export default App;