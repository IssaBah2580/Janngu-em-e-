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
    const DONATION_INTERVAL = 10 * 60 * 1000;
    const intervalId = setInterval(() => {
      setIsDonationModalOpen(true);
    }, DONATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/22394650112?text=${encodeURIComponent("Bonjour Janngu, je souhaite soutenir l'application Janngu Ɗemɗe.")}`;

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
    <div className="h-screen bg-[#f8f9fa] dark:bg-slate-950 flex flex-col items-center selection:bg-brand selection:text-white">
      <div className="w-full max-w-xl h-full flex flex-col relative sm:shadow-2xl dark:sm:shadow-none sm:border-x sm:border-stone-100 dark:sm:border-slate-800 transition-colors duration-500 overflow-hidden">
        
        <main className="flex-1 overflow-y-auto no-scrollbar custom-scrollbar">
          {renderScreen()}
        </main>

        {/* Navigation bar following screenshot style */}
        <div className="bg-white dark:bg-slate-900 border-t border-stone-100 dark:border-slate-800 px-6 py-2 flex justify-between items-center shadow-2xl z-50">
          <NavButton active={currentScreen === Screen.HOME} onClick={() => navigateTo(Screen.HOME)} icon={<HomeIcon />} label={t.home} />
          <NavButton active={currentScreen === Screen.LESSONS} onClick={() => navigateTo(Screen.LESSONS)} icon={<BookIcon />} label={t.lessons} />
          <NavButton active={currentScreen === Screen.GRAMMAR} onClick={() => navigateTo(Screen.GRAMMAR)} icon={<LayersIcon />} label={t.grammar} />
          <NavButton active={currentScreen === Screen.QUIZ} onClick={() => navigateTo(Screen.QUIZ)} icon={<TrophyIcon />} label={t.quiz} />
        </div>

        {isDonationModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={() => setIsDonationModalOpen(false)}></div>
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white dark:border-slate-800">
              <div className="bg-[#00a884] p-12 flex flex-col items-center text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mb-6 backdrop-blur-xl animate-float">💝</div>
                <h3 className="text-2xl font-black heading-brand mb-4">{t.donation_title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">{t.donation_msg}</p>
              </div>
              <div className="p-10 flex flex-col gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsDonationModalOpen(false)} className="w-full bg-[#00a884] text-white py-5 rounded-2xl font-black text-center shadow-xl heading-brand">
                  {t.donation_btn}
                </a>
                <button onClick={() => setIsDonationModalOpen(false)} className="w-full text-stone-400 py-2 font-black text-[10px] uppercase tracking-widest">
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
    className={`flex flex-col items-center gap-1 transition-all flex-1 py-2 ${active ? 'text-[#00a884]' : 'text-stone-400 dark:text-stone-600'}`}
  >
    <div className={`transition-all duration-300 ${active ? 'scale-110' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-tight">
      {label}
    </span>
  </button>
);

const HomeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BookIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const LayersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const TrophyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;

export default App;