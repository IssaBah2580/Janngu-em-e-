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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  const pairs = [
    { id: LanguagePair.PULAAR_FRENCH, label: "Pulaar ↔ Français" },
    { id: LanguagePair.PULAAR_ENGLISH, label: "Pulaar ↔ English" },
    { id: LanguagePair.PULAAR_SPANISH, label: "Pulaar ↔ Español" },
    { id: LanguagePair.PULAAR_ARABIC, label: "Pulaar ↔ العربية" },
    { id: LanguagePair.ENGLISH_FRENCH, label: "English ↔ Français" },
    { id: LanguagePair.FRENCH_SPANISH, label: "Français ↔ Español" },
  ];

  const otherApps = [
    { title: t.dictionary, url: "https://janngu-saggitorde.lovable.app", icon: "📚" },
    { title: t.word_search, url: "https://pulaar.lovable.app", icon: "🔍" },
    { title: t.calendar, url: "https://hitaande.lovable.app", icon: "📅" },
  ];

  const socialLinks = [
    { title: "Facebook", handle: "Janngu Ɗemɗe", url: "https://www.facebook.com/share/1BK1rdTPtf/", icon: <FacebookIcon />, color: "text-blue-600" },
    { title: "TikTok", handle: "@janngu2580", url: "https://www.tiktok.com/@janngu2580?_t=8rt2SalZZ4w&_r=1", icon: <TikTokIcon />, color: "text-stone-900 dark:text-white" },
    { title: "YouTube", handle: "@janngu2580", url: "https://youtube.com/@janngu2580?si=XJxD5_29q44xKZMw", icon: <YouTubeIcon />, color: "text-red-600" },
    { title: "WhatsApp", handle: "+223 94 65 01 12", url: "https://wa.me/22394650112", icon: <WhatsAppIcon />, color: "text-emerald-500" },
  ];

  return (
    <div className="p-6 pb-32 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-10 py-4">
        <button onClick={onBack} className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 text-stone-600 dark:text-stone-300 active:scale-95 transition-transform">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand">{t.settings}</h2>
      </header>

      {/* Connection Status Card */}
      <section className="mb-10">
        <div className={`p-6 rounded-[2.5rem] border-2 flex items-center justify-between transition-colors ${isOnline ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20' : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOnline ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
              {isOnline ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>}
            </div>
            <div>
              <p className="font-black text-sm text-stone-900 dark:text-stone-100">{isOnline ? 'Online' : 'Offline Mode'}</p>
              <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">{isOnline ? 'Full features active' : 'Cached content available'}</p>
            </div>
          </div>
          {!isOnline && <div className="text-[10px] font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Offline</div>}
        </div>
      </section>

      {/* Appearance Section */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-600 mb-4 px-2">{t.appearance}</h3>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="w-full p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-brand text-stone-100' : 'bg-amber-100 text-amber-600'}`}>
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </div>
            <p className="font-black text-stone-900 dark:text-stone-100">{t.dark_mode}</p>
          </div>
          <div className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-brand' : 'bg-stone-200'}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </button>
      </section>

      {/* Language Section */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-600 mb-4 px-2">{t.language_pair}</h3>
        <div className="grid gap-3">
          {pairs.map((pair) => (
            <button
              key={pair.id}
              onClick={() => onSelect(pair.id)}
              className={`w-full p-6 rounded-[2.5rem] text-left border-2 transition-all flex items-center justify-between ${
                selected === pair.id 
                ? 'bg-brand/5 border-brand dark:bg-brand/10 shadow-lg shadow-brand/5' 
                : 'bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800'
              }`}
            >
              <p className={`font-black ${selected === pair.id ? 'text-brand dark:text-white' : 'text-stone-900 dark:text-stone-300'}`}>{pair.label}</p>
              {selected === pair.id && <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg></div>}
            </button>
          ))}
        </div>
      </section>

      {/* About Janngu Ɗemɗe Section */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-600 mb-4 px-2">{t.about_app}</h3>
        <div className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
            {t.app_desc_full}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-t border-stone-50 dark:border-slate-800 pt-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{t.version}</span>
              <span className="text-xs font-black text-brand dark:text-stone-100">1.10.0</span>
            </div>
            <a 
              href="https://janngu.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 group-hover:text-brand transition-colors">{t.privacy_policy}</span>
              <div className="text-stone-300 group-hover:text-brand transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Official Website Card */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-600 mb-4 px-2">Janngu Online</h3>
        <a
          href="https://janngu.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-8 rounded-[3rem] brand-gradient text-white flex items-center justify-between shadow-xl shadow-brand/20 group overflow-hidden relative active:scale-95 transition-transform"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-black heading-brand leading-none mb-1">{t.website}</h4>
            <p className="text-[10px] font-bold opacity-60 tracking-[0.1em] uppercase">janngu.com</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </a>
      </section>

      {/* Social Media Section */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-600 mb-4 px-2">{t.follow_us}</h3>
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex flex-col items-center justify-center text-center transition-all hover:border-brand/30 hover:shadow-xl group active:scale-95"
            >
              <div className={`w-12 h-12 mb-3 rounded-2xl bg-stone-50 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform ${social.color}`}>
                {social.icon}
              </div>
              <p className="font-black text-[12px] text-stone-900 dark:text-stone-100">{social.title}</p>
              <p className="text-[8px] text-stone-400 dark:text-stone-600 font-black uppercase tracking-widest mt-1 opacity-60">{social.handle}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Other Apps Section */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-600 mb-4 px-2">{t.other_apps}</h3>
        <div className="grid gap-3">
          {otherApps.map((app, idx) => (
            <a
              key={idx}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex items-center justify-between transition-all hover:border-brand/30 group shadow-sm active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-slate-800 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                <div>
                  <p className="font-black text-stone-900 dark:text-stone-100">{app.title}</p>
                  <p className="text-[9px] text-stone-400 dark:text-stone-600 font-bold tracking-tight uppercase mt-1">{app.url.replace('https://', '')}</p>
                </div>
              </div>
              <div className="text-stone-300 dark:text-stone-700 group-hover:text-brand transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Installation */}
      {deferredPrompt && (
        <button onClick={handleInstallClick} className="w-full bg-brand text-white py-5 rounded-2xl font-black shadow-lg mb-10 heading-brand uppercase tracking-widest text-xs active:scale-95 transition-transform">Installer Janngu</button>
      )}

      <footer className="text-center opacity-40 py-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-600">Janngu Pulaar • Version 1.10.0</p>
      </footer>
    </div>
  );
};

const SunIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

const FacebookIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const YouTubeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const WhatsAppIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .004 5.407.001 12.045a11.865 11.865 0 001.591 5.976L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.639 0 12.046-5.407 12.049-12.045a11.811 11.811 0 00-3.515-8.517z"/></svg>;
const TikTokIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.509 4.29a4.83 4.83 0 0 1-3.7 4.24v11.47a4 4 0 1 1-4.53-3.96v3.52a.48.48 0 0 0 .48.48c.19 0 .37-.11.45-.28a1.12 1.12 0 0 0 .07-.39v-13a.48.48 0 0 0-.48-.48h-3.32a.48.48 0 0 0-.48.48v15.64a7.5 7.5 0 1 0 14.91-1.35v-8.66a8.21 8.21 0 0 0 3.65 1.58v-3.44a4.83 4.83 0 0 1-3.55-4.3z"/></svg>;

export default SettingsScreen;