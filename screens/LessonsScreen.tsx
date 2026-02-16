import React, { useState, useMemo } from 'react';
import { LESSONS } from '../constants.tsx';
import { speakText } from '../services/geminiService.ts';
import { VocabularyItem, LanguagePair, DialogueLine } from '../types.ts';
import { UIStrings } from '../i18n.ts';

const LessonsScreen: React.FC<{ onBack: () => void; languagePair: LanguagePair; t: UIStrings }> = ({ onBack, languagePair, t }) => {
  const [selectedLesson, setSelectedLesson] = useState(LESSONS[0]);
  const [vocabMode, setVocabMode] = useState<'list' | 'flashcards'>('list');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [vocabSearchQuery, setVocabSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    vocab: true,
    dialogues: true,
    conversations: false
  });
  
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

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVocab = useMemo(() => {
    const vocab = selectedLesson.vocabulary || [];
    if (!vocabSearchQuery.trim()) return vocab;
    const query = vocabSearchQuery.toLowerCase();
    return vocab.filter(v => 
      v.pulaar.toLowerCase().includes(query) || 
      getActiveTranslation(v).toLowerCase().includes(query)
    );
  }, [selectedLesson, vocabSearchQuery, languagePair]);

  return (
    <div className="flex flex-col min-h-full bg-stone-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl sticky top-0 z-30 border-b border-stone-100 dark:border-slate-800 shadow-xl shadow-black/5 transition-all">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="w-12 h-12 rounded-2xl brand-bg text-white shadow-xl shadow-[#2d4156]/30 active:scale-90 transition-all flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div>
              <h2 className="text-2xl font-black text-[#2d4156] dark:text-stone-100 heading-brand leading-none">{t.lessons}</h2>
              <p className="text-[9px] font-black brand-text dark:text-stone-500 opacity-60 uppercase tracking-[0.3em] mt-1.5">Janngu Ɗemɗe</p>
            </div>
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
          {LESSONS.map((lesson) => (
            <button 
              key={lesson.id} 
              onClick={() => { setSelectedLesson(lesson); setVocabSearchQuery(''); }}
              className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border-2 ${
                selectedLesson.id === lesson.id 
                ? 'brand-bg border-[#2d4156] text-white shadow-2xl shadow-[#2d4156]/30 scale-105' 
                : 'bg-stone-50 dark:bg-slate-800 border-stone-100 dark:border-slate-700 text-stone-400 dark:text-stone-500 hover:border-stone-200 dark:hover:border-slate-600'
              }`}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6 space-y-8 animate-in fade-in duration-700">
        <div className="brand-gradient p-12 sm:p-14 rounded-[3.5rem] text-white shadow-2xl shadow-[#2d4156]/30 dark:shadow-none mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-4">Module Actuel</span>
            <h3 className="text-4xl sm:text-5xl font-black mb-4 heading-brand tracking-tight drop-shadow-md leading-none">
              {selectedLesson.title}
            </h3>
            <div className="h-1 w-12 bg-white/30 rounded-full mb-4"></div>
            <p className="opacity-90 font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs">
              {selectedLesson.subtitle}
            </p>
          </div>
        </div>

        {selectedLesson.vocabulary && (
          <CollapsibleLessonSection 
            id="vocab"
            title={t.vocabulary} 
            icon="📖" 
            isOpen={expandedSections.vocab} 
            onToggle={toggleSection}
            action={
               <div className="flex bg-stone-100 dark:bg-slate-800 p-1 rounded-[1.25rem] border border-stone-200 dark:border-slate-700">
                <button onClick={(e) => { e.stopPropagation(); setVocabMode('list'); }} className={`p-2.5 rounded-xl transition-all ${vocabMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-md brand-text dark:text-stone-100 scale-110' : 'text-stone-400 dark:text-stone-600'}`}><ListIcon /></button>
                <button onClick={(e) => { e.stopPropagation(); setVocabMode('flashcards'); }} className={`p-2.5 rounded-xl transition-all ${vocabMode === 'flashcards' ? 'bg-white dark:bg-slate-700 shadow-md brand-text dark:text-stone-100 scale-110' : 'text-stone-400 dark:text-stone-600'}`}><FlashcardIcon /></button>
              </div>
            }
          >
            {vocabMode === 'list' ? (
              <div className="space-y-6 mt-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#2d4156] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  <input 
                    type="text"
                    value={vocabSearchQuery}
                    onChange={(e) => setVocabSearchQuery(e.target.value)}
                    placeholder="Chercher un mot..."
                    className="w-full bg-stone-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:ring-2 focus:ring-[#2d4156]/10 transition-all"
                  />
                </div>

                <div className="grid gap-5">
                  {filteredVocab.length > 0 ? (
                    filteredVocab.map((v, i) => {
                      const translation = getActiveTranslation(v);
                      const langName = getLanguageName();
                      return (
                        <div key={i} className="bg-white dark:bg-slate-800/40 p-6 rounded-[2rem] flex items-center justify-between border-2 border-stone-50 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                          <div className="flex-1">
                            <p className="font-black text-xl text-[#2d4156] dark:text-stone-100 heading-brand mb-1.5">{v.pulaar}</p>
                            <div className="flex items-center gap-3">
                              <p className="text-stone-400 dark:text-stone-500 text-[11px] font-black uppercase tracking-[0.1em] italic">{translation}</p>
                              <button 
                                disabled={isPlaying?.includes(`vocab-${i}-${langName}`)}
                                onClick={() => handleSpeak(translation, langName, `vocab-${i}`)}
                                className="p-2 rounded-xl bg-stone-50 dark:bg-slate-900 brand-text dark:text-stone-600 opacity-40 hover:opacity-100 transition-all disabled:opacity-50 border border-stone-100 dark:border-slate-800"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                              </button>
                            </div>
                          </div>
                          <button 
                            disabled={isPlaying?.includes(`vocab-${i}-Pulaar`)}
                            onClick={() => handleSpeak(v.pulaar, 'Pulaar', `vocab-${i}`)} 
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90 disabled:opacity-50 ${isPlaying?.includes(`vocab-${i}-Pulaar`) ? 'brand-bg text-white scale-110' : 'bg-stone-50 dark:bg-slate-900 brand-text dark:text-stone-400 border border-stone-100 dark:border-slate-800 hover:brand-bg hover:text-white dark:hover:bg-[#2d4156]'}`}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-10 text-center opacity-40 italic font-bold text-xs">Aucun mot trouvé.</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <FlashcardCarousel items={selectedLesson.vocabulary} onSpeak={handleSpeak} languagePair={languagePair} langName={getLanguageName()} t={t} isPlaying={isPlaying} />
              </div>
            )}
          </CollapsibleLessonSection>
        )}

        {selectedLesson.dialogues && (
          <CollapsibleLessonSection 
            id="dialogues"
            title={t.dialogue} 
            icon="💬" 
            isOpen={expandedSections.dialogues} 
            onToggle={toggleSection}
          >
            <div className="space-y-8 mt-6">
              {selectedLesson.dialogues.map((d, i) => {
                const translation = getActiveTranslation(d);
                const langName = getLanguageName();
                const isIssa = d.speaker === 'Issa';
                
                return (
                  <div key={i} className={`flex flex-col ${isIssa ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                    <div className={`max-w-[90%] p-6 rounded-[2.5rem] shadow-xl relative border-2 ${
                      isIssa 
                      ? 'bg-sky-50 dark:bg-slate-800 border-sky-100 dark:border-slate-700 rounded-tl-lg' 
                      : 'brand-bg text-white border-[#2d4156] rounded-tr-lg shadow-[#2d4156]/20'
                    }`}>
                      <div className="flex items-center justify-between gap-5 mb-4 border-b border-black/5 pb-2">
                        <p className={`font-black text-[10px] uppercase tracking-[0.3em] ${isIssa ? 'brand-text dark:text-stone-400' : 'text-white/60'}`}>{d.speaker}</p>
                        <div className="flex gap-2">
                          <button 
                            disabled={isPlaying?.includes(`dialog-trans-${i}-${langName}`)}
                            onClick={() => handleSpeak(translation, langName, `dialog-trans-${i}`)}
                            className={`p-2 rounded-xl transition-all ${isIssa ? 'bg-white/60 dark:bg-slate-700 text-stone-300 dark:text-stone-500' : 'bg-black/10 text-white/40'} hover:opacity-100 disabled:opacity-50`}
                            title={`Audio ${langName}`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 group/pulaar">
                        <p className="font-black text-2xl leading-tight heading-brand mb-3 flex-1">{d.pulaar}</p>
                        <button 
                          disabled={isPlaying?.includes(`dialog-repeat-${i}-Pulaar`)}
                          onClick={() => handleSpeak(d.pulaar, 'Pulaar', `dialog-repeat-${i}`)} 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-90 disabled:opacity-50 shrink-0 ${
                            isIssa 
                            ? (isPlaying?.includes(`dialog-repeat-${i}-Pulaar`) ? 'brand-bg text-white' : 'bg-white brand-text hover:bg-brand hover:text-white') 
                            : (isPlaying?.includes(`dialog-repeat-${i}-Pulaar`) ? 'bg-white brand-text' : 'bg-black/20 text-white hover:bg-white hover:text-[#2d4156]')
                          }`}
                          title="Répéter la phrase"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                            <path d="M21 3v5h-5"/>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                            <path d="M3 21v-5h5"/>
                          </svg>
                        </button>
                      </div>
                      
                      <p className={`text-xs font-bold italic leading-relaxed mt-1 ${isIssa ? 'text-stone-500 dark:text-stone-500' : 'text-white/70'}`}>{translation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleLessonSection>
        )}

        {selectedLesson.conversations && (
          <CollapsibleLessonSection 
            id="conversations"
            title="Pratique" 
            icon="🤝" 
            isOpen={expandedSections.conversations} 
            onToggle={toggleSection}
          >
             <div className="space-y-10 mt-6">
              {selectedLesson.conversations.map((conv, cIdx) => (
                <div key={cIdx} className="space-y-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[2px] brand-bg rounded-full opacity-30"></div>
                    <h5 className="font-black text-[11px] uppercase tracking-[0.4em] text-stone-500 dark:text-stone-400">{conv.category}</h5>
                  </div>
                  {conv.lines.map((line, lIdx) => {
                    const translation = getActiveTranslation(line);
                    const lineId = `conv-${cIdx}-${lIdx}`;
                    return (
                      <div key={lIdx} className="bg-white dark:bg-slate-800/50 p-7 rounded-[2.5rem] border-2 border-stone-50 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <p className="font-black text-xl text-[#2d4156] dark:text-stone-100 heading-brand mb-2">{line.pulaar}</p>
                            <p className="text-stone-400 dark:text-stone-500 text-xs font-bold italic">{translation}</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            <button 
                              disabled={isPlaying?.includes(`${lineId}-Pulaar`)}
                              onClick={() => handleSpeak(line.pulaar, 'Pulaar', lineId)}
                              className={`w-12 h-12 rounded-2xl shadow-xl active:scale-90 transition-all disabled:opacity-50 flex items-center justify-center ${isPlaying?.includes(`${lineId}-Pulaar`) ? 'brand-bg text-white scale-110' : 'bg-stone-50 dark:bg-slate-900 brand-text dark:text-stone-400 border border-stone-100 dark:border-slate-800'}`}
                            >
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CollapsibleLessonSection>
        )}
      </div>
    </div>
  );
};

const CollapsibleLessonSection: React.FC<{ 
  id: string; 
  title: string; 
  icon: string; 
  isOpen: boolean; 
  onToggle: (id: string) => void;
  children: React.ReactNode;
  action?: React.ReactNode;
}> = ({ id, title, icon, isOpen, onToggle, children, action }) => (
  <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] border-2 border-stone-50 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-500">
    <div 
      onClick={() => onToggle(id)}
      className="w-full p-8 flex items-center justify-between cursor-pointer group hover:bg-stone-50/50 dark:hover:bg-slate-800/30 transition-colors"
    >
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-all duration-500 ${isOpen ? 'brand-bg text-white scale-110 rotate-3' : 'bg-stone-50 dark:bg-slate-800 text-stone-400'}`}>
          {icon}
        </div>
        <div>
          <h4 className="text-2xl font-black text-[#2d4156] dark:text-stone-100 heading-brand leading-none tracking-tight">{title}</h4>
          <p className="text-[10px] font-black text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] mt-2">
            {isOpen ? 'Masquer' : 'Afficher'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        {action && action}
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-200 dark:text-stone-800 group-hover:text-[#2d4156] transition-colors"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
    {isOpen && (
      <div className="px-8 pb-10 animate-in slide-in-from-top-6 duration-500">
        <div className="h-[2px] bg-stone-50 dark:bg-slate-800/50 mb-8 rounded-full"></div>
        {children}
      </div>
    )}
  </section>
);

const FlashcardCarousel: React.FC<{ items: VocabularyItem[]; onSpeak: (text: string, lang?: string, id?: string, slow?: boolean) => void; languagePair: LanguagePair; langName: string; t: UIStrings; isPlaying: string | null }> = ({ items, onSpeak, languagePair, langName, t, isPlaying }) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const getActiveTranslation = (item: VocabularyItem) => {
    switch (languagePair) {
      case LanguagePair.PULAAR_ENGLISH: return item.translations.en;
      case LanguagePair.PULAAR_SPANISH: return item.translations.es;
      case LanguagePair.PULAAR_ARABIC: return item.translations.ar;
      case LanguagePair.PULAAR_FRENCH:
      default: return item.translations.fr;
    }
  };

  const next = () => { setIsFlipped(false); setTimeout(() => setIndex((prev) => (prev + 1) % items.length), 150); };
  const prev = () => { setIsFlipped(false); setTimeout(() => setIndex((prev) => (prev - 1 + items.length) % items.length), 150); };

  const current = items[index];
  const translation = getActiveTranslation(current);

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="relative w-full aspect-[4/3] perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)} 
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 rounded-[3.5rem] border-2 border-stone-50 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center p-10 text-center transition-all hover:border-[#2d4156]/20">
            <span className="text-[11px] font-black brand-text dark:text-stone-500 opacity-60 uppercase tracking-[0.4em] mb-6">Pulaar</span>
            <h4 className="text-4xl sm:text-5xl font-black text-[#2d4156] dark:text-stone-100 mb-10 heading-brand leading-none tracking-tight">{current.pulaar}</h4>
            <div className="flex gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); onSpeak(current.pulaar, 'Pulaar', `flash-${index}`); }} 
                className={`w-16 h-16 brand-bg text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#2d4156]/30 active:scale-90 transition-all ${isPlaying?.includes(`flash-${index}-Pulaar`) && !isPlaying?.includes('slow') ? 'scale-110 ring-[6px] ring-[#2d4156]/20' : ''}`}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onSpeak(current.pulaar, 'Pulaar', `flash-${index}`, true); }} 
                className={`w-16 h-16 bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-stone-400 rounded-2xl flex items-center justify-center active:scale-90 transition-all border border-stone-200 dark:border-slate-700 ${isPlaying?.includes(`flash-${index}-Pulaar-slow`) ? 'scale-110 ring-[6px] ring-stone-200 dark:ring-slate-700' : ''}`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </button>
            </div>
            <p className="mt-8 text-[9px] font-black text-stone-300 dark:text-stone-700 uppercase tracking-[0.3em]">{t.reveal_translation}</p>
          </div>

          <div className="absolute inset-0 backface-hidden brand-gradient rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-10 text-center rotate-y-180 text-white transition-all">
            <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em] mb-6">Traduction ({langName})</span>
            <h4 className="text-3xl sm:text-4xl font-black heading-brand leading-none tracking-tight mb-10 drop-shadow-lg">{translation}</h4>
            <button 
              onClick={(e) => { e.stopPropagation(); onSpeak(translation, langName, `flash-${index}`); }} 
              className={`w-16 h-16 bg-white brand-text rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 active:scale-90 transition-all ${isPlaying?.includes(`flash-${index}-${langName}`) ? 'scale-110 ring-[6px] ring-white/30' : ''}`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-sm space-y-6">
        <div className="w-full h-2 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-stone-200 dark:border-slate-700">
          <div 
            className="h-full brand-bg transition-all duration-700 ease-out shadow-[0_0_15px_rgba(45,65,86,0.3)]" 
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full px-4">
          <button onClick={prev} className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full shadow-lg border-2 border-stone-50 dark:border-slate-800 flex items-center justify-center text-stone-300 dark:text-stone-600 active:scale-90 transition-all hover:border-[#2d4156]/20"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
          <div className="flex flex-col items-center">
             <span className="text-[#2d4156] dark:text-stone-300 font-black tracking-[0.3em] text-[11px] uppercase">{index + 1} / {items.length}</span>
             <div className="w-4 h-[2px] brand-bg rounded-full mt-1 opacity-40"></div>
          </div>
          <button onClick={next} className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full shadow-lg border-2 border-stone-50 dark:border-slate-800 flex items-center justify-center text-stone-300 dark:text-stone-600 active:scale-90 transition-all hover:border-[#2d4156]/20"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6 6-6"/></svg></button>
        </div>
      </div>
    </div>
  );
};

const ListIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="12" r="1"/><circle cx="3" cy="18" r="1"/></svg>;
const FlashcardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;

export default LessonsScreen;