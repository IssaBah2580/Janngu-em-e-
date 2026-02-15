import React, { useEffect, useState } from 'react';
import { LanguagePair } from '../types.ts';
import { UIStrings } from '../i18n.ts';

interface SettingsScreenProps {
  onBack: () => void;
  selected: LanguagePair;
  onSelect: (pair: LanguagePair) => void;
  t: UIStrings;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, selected, onSelect, t, theme, setTheme }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect if already installed or standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    
    // Listen for install prompt (Chromium)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice && !isStandalone);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const pairs = [
    { id: LanguagePair.PULAAR_FRENCH, label: "Pulaar ↔ Français", sub: "Apprendre le Pulaar en Français" },
    { id: LanguagePair.PULAAR_ENGLISH, label: "Pulaar ↔ English", sub: "Learn Pulaar in English" },
    { id: LanguagePair.PULAAR_SPANISH, label: "Pulaar ↔ Español", sub: "Aprender Pulaar en Español" },
    { id: LanguagePair.PULAAR_ARABIC, label: "Pulaar ↔ العربية", sub: "تعلم البولار بالعربية" },
    { id: LanguagePair.ENGLISH_FRENCH, label: "English ↔ Français", sub: "Apprendre l'Anglais / Français" },
    { id: LanguagePair.FRENCH_SPANISH, label: "Français ↔ Español", sub: "Aprender Francés / Español" },
  ];

  const otherApps = [
    {
      label: t.dictionary,
      url: "https://janngu-saggitorde.lovable.app",
      icon: <BookIcon />,
      color: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
      desc: "Pulaar-Français-Anglais"
    },
    {
      label: t.word_search,
      url: "https://pulaar.lovable.app",
      icon: <GridIcon />,
      color: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
      desc: "Apprendre en s'amusant"
    },
    {
      label: t.calendar,
      url: "https://hitaande.lovable.app",
      icon: <CalendarIcon />,
      color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
      desc: "Hitaande Pulaar"
    }
  ];

  const socialLinks = [
    { 
      label: t.website, 
      url: "https://janngu.com", 
      icon: <GlobeIcon />, 
      color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
    },
    { 
      label: t.contact_wa, 
      url: "https://wa.me/22394650112", 
      icon: <WhatsAppIcon />, 
      color: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
    },
    { 
      label: "TikTok", 
      url: "https://www.tiktok.com/@janngu2580?_t=8rt2SalZZ4w&_r=1", 
      icon: <TikTokIcon />, 
      color: "bg-stone-50 dark:bg-stone-900 text-black dark:text-stone-100" 
    },
    { 
      label: "YouTube", 
      url: "https://youtube.com/@janngu2580?si=XJxD5_29q44xKZMw", 
      icon: <YouTubeIcon />, 
      color: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
    },
    { 
      label: "Facebook", 
      url: "https://www.facebook.com/share/1BK1rdTPtf/", 
      icon: <FacebookIcon />, 
      color: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
    },
  ];

  return (
    <div className="p-6 pb-32">
      <header className="flex items-center gap-4 mb-8 sticky top-0 bg-stone-50/90 dark:bg-slate-950/90 backdrop-blur-md py-4 z-10 transition-colors">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-stone-100 dark:border-slate-800 transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="dark:text-stone-300"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-black text-[#2d4156] dark:text-stone-100 heading-brand">{t.settings}</h2>
      </header>

      {/* PWA Installation */}
      {(deferredPrompt || isIOS) && (
        <section className="space-y-4 mb-10 animate-in zoom-in duration-300">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">{t.install_app}</h3>
          <div className="w-full p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl brand-bg flex items-center justify-center text-white shadow-lg shadow-[#2d4156]/20">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
               </div>
               <div>
                 <p className="font-black text-sm text-stone-800 dark:text-stone-200">{t.install_app}</p>
                 <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold">{t.install_desc}</p>
               </div>
             </div>
             
             {deferredPrompt ? (
               <button 
                 onClick={handleInstallClick}
                 className="w-full py-3 rounded-xl brand-bg text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-[#2d4156]/20 active:scale-95 transition-all"
               >
                 {t.install_btn}
               </button>
             ) : (
               <div className="bg-stone-50 dark:bg-slate-800/50 p-3 rounded-xl border border-stone-100 dark:border-slate-700">
                 <p className="text-[10px] text-[#2d4156] dark:text-stone-300 font-black text-center italic">{t.ios_install_hint}</p>
               </div>
             )}
          </div>
        </section>
      )}

      {/* Appearance Toggle */}
      <section className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">{t.appearance}</h3>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="w-full p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-indigo-950 text-indigo-300' : 'bg-amber-50 text-amber-600'}`}>
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </div>
            <p className="font-black text-sm text-stone-800 dark:text-stone-200">{t.dark_mode}</p>
          </div>
          <div className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-[#2d4156]' : 'bg-stone-200'}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </button>
      </section>

      {/* Language Selection */}
      <section className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">{t.language_pair}</h3>
        <div className="grid gap-3">
          {pairs.map((pair) => (
            <button
              key={pair.id}
              onClick={() => onSelect(pair.id)}
              className={`w-full p-5 rounded-[2rem] text-left border-2 transition-all flex items-center justify-between ${
                selected === pair.id 
                ? 'bg-white dark:bg-[#2d4156]/20 border-[#2d4156] dark:border-[#2d4156] shadow-md' 
                : 'bg-white dark:bg-slate-900 border-stone-50 dark:border-slate-800 hover:border-stone-200 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <p className={`font-black text-md ${selected === pair.id ? 'text-[#2d4156] dark:text-stone-100' : 'text-stone-800 dark:text-stone-300'}`}>
                  {pair.label}
                </p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mt-0.5">{pair.sub}</p>
              </div>
              {selected === pair.id && (
                <div className="w-6 h-6 brand-bg rounded-full flex items-center justify-center text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* My Other Apps */}
      <section className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">{t.other_apps}</h3>
        <div className="grid gap-3">
          {otherApps.map((app, idx) => (
            <a
              key={idx}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 shadow-sm flex items-center justify-between active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${app.color} group-hover:scale-110 transition-transform`}>
                  {app.icon}
                </div>
                <div>
                  <p className="font-black text-sm text-stone-800 dark:text-stone-200">{app.label}</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold tracking-tight">{app.desc}</p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 group-hover:text-[#2d4156] group-hover:translate-x-1 transition-all"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
          ))}
        </div>
      </section>

      {/* Community & Support */}
      <section className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 px-1">{t.community}</h3>
        <div className="grid gap-3">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-3xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 shadow-sm flex items-center justify-between active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${link.color}`}>
                  {link.icon}
                </div>
                <p className="font-black text-sm text-stone-700 dark:text-stone-300">{link.label}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-12 p-8 bg-stone-100/50 dark:bg-slate-900/50 rounded-[2.5rem] text-center border border-stone-100 dark:border-slate-800">
        <p className="text-sm font-black text-stone-800 dark:text-stone-200 tracking-tight heading-brand">{t.welcome}</p>
        <p className="text-[10px] text-stone-400 dark:text-stone-600 mt-1 font-bold uppercase tracking-[0.2em]">Version 1.7.0 • Kayes Mali</p>
        <div className="mt-6 flex justify-center opacity-30">
           <div className="w-12 h-1.5 brand-bg rounded-full"></div>
        </div>
      </footer>
    </div>
  );
};

// Icons
const BookIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const GridIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
const CalendarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const GlobeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const WhatsAppIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
const YouTubeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58Z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TikTokIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;
const SunIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

export default SettingsScreen;