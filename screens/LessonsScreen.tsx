import React, { useState, useMemo } from 'react';
import { LESSONS } from '../constants.tsx';
import { speakText } from '../services/geminiService.ts';
import { VocabularyItem, LanguagePair, DialogueLine } from '../types.ts';
import { UIStrings } from '../i18n.ts';

const LessonsScreen: React.FC<{ onBack: () => void; languagePair: LanguagePair; t: UIStrings }> = ({ onBack, languagePair, t }) => {
  const [selectedLesson, setSelectedLesson] = useState(LESSONS[0]);
  const [activeMode, setActiveMode] = useState<'vocab' | 'dialogue'>('vocab');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const getLanguageName = () => {
    if (languagePair.includes('FRENCH')) return 'French';
    if (languagePair.includes('ENGLISH')) return 'English';
    if (languagePair.includes('SPANISH')) return 'Spanish';
    if (languagePair.includes('ARABIC')) return 'Arabic';
    return 'French';
  };

  const handleSpeak = async (text: string, lang: string = 'Pulaar', id: string = "", slow: boolean = false) => {
    if (!navigator.onLine) {
      alert(t.internet_required);
      return;
    }
    const playId = id || text;
    setIsPlaying(playId + '-' + lang + (slow ? '-slow' : ''));
    await speakText(text, lang, slow);
    setIsPlaying(null);
  };

  const getActiveTranslation = (item: any) => {
    if (!item.translations) return item.translation || "";
    switch (languagePair) {
      case LanguagePair.PULAAR_ENGLISH: return item.translations.en;
      case LanguagePair.PULAAR_SPANISH: return item.translations.es;
      case LanguagePair.PULAAR_ARABIC: return item.translations.ar;
      case LanguagePair.PULAAR_FRENCH:
      default: return item.translations.fr;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-slate-950 transition-colors">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-slate-900 px-6 pt-10 pb-4 flex flex-col gap-6 sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-stone-900 dark:text-white hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand leading-none">
              Leçons Audio
            </h2>
            <p className="text-[10px] font-black text-[#00a884] dark:text-emerald-500 uppercase tracking-widest mt-1">
              PULAAR LEARNING FLOW
            </p>
          </div>
        </div>

        {/* Lesson/Category Pills */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                selectedLesson.id === lesson.id
                  ? 'bg-[#00a884] text-white shadow-md'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400'
              }`}
            >
              {lesson.title}
            </button>
          ))}
          <button className="px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400">
            Yoga he konngudi
          </button>
        </div>
      </header>

      {/* Sub-navigation Tabs (Vocabulaire / Dialogue) */}
      <div className="flex items-center justify-around bg-white dark:bg-slate-900 border-t border-stone-100 dark:border-slate-800 px-4">
        <button 
          onClick={() => setActiveMode('vocab')}
          className={`flex-1 py-4 flex items-center justify-center gap-3 transition-all relative ${activeMode === 'vocab' ? 'text-[#00a884]' : 'text-stone-400'}`}
        >
          <div className={`p-2 rounded-xl ${activeMode === 'vocab' ? 'bg-[#00a884]/10 border border-[#00a884]/20' : ''}`}>
            <ListIcon />
          </div>
          <span className="text-[11px] font-black tracking-widest">VOCABULAIRE</span>
          {activeMode === 'vocab' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00a884] rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveMode('dialogue')}
          className={`flex-1 py-4 flex items-center justify-center gap-3 transition-all relative ${activeMode === 'dialogue' ? 'text-[#00a884]' : 'text-stone-400'}`}
        >
          <div className={`p-2 rounded-xl ${activeMode === 'dialogue' ? 'bg-[#00a884]/10 border border-[#00a884]/20' : ''}`}>
            <DialogueIcon />
          </div>
          <span className="text-[11px] font-black tracking-widest">DIALOGUE</span>
          {activeMode === 'dialogue' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00a884] rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 p-6 space-y-8 pb-32 overflow-y-auto custom-scrollbar">
        {/* Hero Interactive Card */}
        <div className="bg-[#00a884] p-10 rounded-[3rem] text-white shadow-2xl shadow-[#00a884]/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-4xl font-black heading-brand mb-2">{selectedLesson.title}</h3>
            <p className="text-lg font-bold opacity-90 mb-8">{selectedLesson.subtitle}</p>
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">MODULE INTERACTIF</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        </div>

        {activeMode === 'vocab' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                  <ListIcon />
                </div>
                <div>
                  <h4 className="text-xl font-black text-stone-900 dark:text-stone-100 leading-none">Vocabulaire</h4>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tight mt-1">Les mots essentiels</p>
                </div>
              </div>
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-sm border border-stone-100 dark:border-slate-800">
                <button className="p-2 rounded-xl bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white shadow-sm"><ListIcon /></button>
                <button className="p-2 rounded-xl text-stone-300 dark:text-stone-600"><GridIcon /></button>
              </div>
            </div>

            <div className="grid gap-4">
              {selectedLesson.vocabulary?.map((v, i) => {
                const translation = getActiveTranslation(v);
                const isItemPlaying = isPlaying?.includes(`vocab-${i}-Pulaar`);
                return (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] flex items-center justify-between border border-stone-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                    <div className="flex-1">
                      <p className="font-black text-xl text-stone-900 dark:text-stone-100 heading-brand mb-1">{v.pulaar}</p>
                      <p className="text-stone-400 dark:text-stone-500 text-sm font-bold">{translation}</p>
                    </div>
                    <button 
                      onClick={() => handleSpeak(v.pulaar, 'Pulaar', `vocab-${i}`)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isItemPlaying ? 'bg-[#00a884] text-white' : 'bg-[#f0f3f5] dark:bg-slate-800 text-[#00a884] dark:text-emerald-500'}`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            {selectedLesson.dialogues?.map((d, i) => {
              const translation = getActiveTranslation(d);
              const isIssa = d.speaker === 'Issa';
              return (
                <div key={i} className={`flex flex-col ${isIssa ? 'items-start' : 'items-end'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2.5rem] shadow-sm relative border-2 ${
                    isIssa 
                    ? 'bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800 rounded-tl-lg' 
                    : 'bg-[#00a884] text-white border-[#00a884] rounded-tr-lg'
                  }`}>
                    <div className="flex items-center justify-between gap-4 mb-2">
                       <p className={`font-black text-[10px] uppercase tracking-widest ${isIssa ? 'text-stone-400' : 'text-white/60'}`}>{d.speaker}</p>
                       <button 
                        onClick={() => handleSpeak(d.pulaar, 'Pulaar', `diag-${i}`)}
                        className={`p-2 rounded-xl transition-all ${isIssa ? 'bg-stone-50 dark:bg-slate-800 text-[#00a884]' : 'bg-white/20 text-white'}`}
                       >
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                       </button>
                    </div>
                    <p className="font-black text-xl mb-1">{d.pulaar}</p>
                    <p className={`text-xs font-bold italic ${isIssa ? 'text-stone-400' : 'text-white/70'}`}>{translation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ListIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="12" r="1"/><circle cx="3" cy="18" r="1"/></svg>;
const DialogueIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const GridIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;

export default LessonsScreen;