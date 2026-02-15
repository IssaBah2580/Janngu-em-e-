import React, { useState, useRef } from 'react';
import { LESSONS } from '../constants.tsx';
import { speakText } from '../services/geminiService.ts';
import { VocabularyItem, LanguagePair } from '../types.ts';
import { UIStrings } from '../i18n.ts';

const LessonsScreen: React.FC<{ onBack: () => void; languagePair: LanguagePair; t: UIStrings }> = ({ onBack, languagePair, t }) => {
  const [selectedLesson, setSelectedLesson] = useState(LESSONS[0]);
  const [vocabMode, setVocabMode] = useState<'list' | 'flashcards'>('list');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  
  const sectionRefs = {
    vocabulary: useRef<HTMLElement>(null),
    dialogue: useRef<HTMLElement>(null),
  };

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
    <div className="flex flex-col h-full pb-20">
      <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-30 border-b border-stone-100 shadow-sm">
        <div className="p-5 flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 -ml-2 rounded-2xl brand-bg text-white shadow-lg active:scale-90 transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-[#2d4156] heading-brand">{t.lessons}</h2>
            <p className="text-[10px] font-black brand-text opacity-40 uppercase tracking-[0.2em]">Curriculum Pulaar</p>
          </div>
        </div>
        <div className="px-5 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {LESSONS.map((lesson) => (
            <button 
              key={lesson.id} 
              onClick={() => setSelectedLesson(lesson)}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all border-2 ${
                selectedLesson.id === lesson.id 
                ? 'brand-bg border-[#2d4156] text-white shadow-xl shadow-[#2d4156]/20' 
                : 'bg-stone-50 border-stone-100 text-stone-400 hover:border-stone-200'
              }`}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6 space-y-12 animate-in fade-in duration-500">
        <div className="brand-gradient p-10 rounded-[2.5rem] text-white shadow-2xl shadow-[#2d4156]/30 mb-4 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-2 heading-brand">{selectedLesson.title}</h3>
            <p className="opacity-60 font-bold uppercase tracking-widest text-[10px]">{selectedLesson.subtitle}</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        </div>

        {selectedLesson.vocabulary && (
          <section className="scroll-mt-40">
            <div className="flex items-center justify-between mb-8">
              <SectionHeader title={t.vocabulary} subtitle="Mots essentiels" icon="📖" />
              <div className="flex bg-stone-100 p-1.5 rounded-2xl">
                <button onClick={() => setVocabMode('list')} className={`p-2.5 rounded-xl transition-all ${vocabMode === 'list' ? 'bg-white shadow-md brand-text' : 'text-stone-400'}`}><ListIcon /></button>
                <button onClick={() => setVocabMode('flashcards')} className={`p-2.5 rounded-xl transition-all ${vocabMode === 'flashcards' ? 'bg-white shadow-md brand-text' : 'text-stone-400'}`}><FlashcardIcon /></button>
              </div>
            </div>
            
            {vocabMode === 'list' ? (
              <div className="grid gap-4">
                {selectedLesson.vocabulary.map((v, i) => {
                  const translation = getActiveTranslation(v);
                  const langName = getLanguageName();
                  return (
                    <div key={i} className="bg-white p-6 rounded-[2rem] flex items-center justify-between border border-stone-100 shadow-sm group hover:shadow-md transition-all">
                      <div className="flex-1">
                        <p className="font-black text-xl text-[#2d4156] heading-brand mb-1">{v.pulaar}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">{translation}</p>
                          <button 
                            disabled={isPlaying?.includes(`vocab-${i}-${langName}`)}
                            onClick={() => handleSpeak(translation, langName, `vocab-${i}`)}
                            className="p-1.5 rounded-lg brand-text opacity-30 hover:opacity-100 transition-all disabled:opacity-50"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                          </button>
                        </div>
                      </div>
                      <button 
                        disabled={isPlaying?.includes(`vocab-${i}-Pulaar`)}
                        onClick={() => handleSpeak(v.pulaar, 'Pulaar', `vocab-${i}`)} 
                        className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center brand-text hover:brand-bg hover:text-white transition-all shadow-sm active:scale-90 disabled:opacity-50"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <FlashcardCarousel items={selectedLesson.vocabulary} onSpeak={handleSpeak} languagePair={languagePair} langName={getLanguageName()} t={t} />
            )}
          </section>
        )}

        {selectedLesson.dialogues && (
          <section className="scroll-mt-40">
            <SectionHeader title={t.dialogue} subtitle="Apprentissage contextuel" icon="💬" />
            <div className="space-y-8 mt-10">
              {selectedLesson.dialogues.map((d, i) => {
                const translation = getActiveTranslation(d);
                const langName = getLanguageName();
                const isIssa = d.speaker === 'Issa';
                return (
                  <div key={i} className={`flex flex-col ${isIssa ? 'items-start' : 'items-end'}`}>
                    <div className={`max-w-[85%] p-7 rounded-[2.5rem] shadow-xl relative ${isIssa ? 'bg-white border-l-[6px] brand-border rounded-tl-lg' : 'brand-bg text-white rounded-tr-lg shadow-[#2d4156]/10'}`}>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <p className={`font-black text-[10px] uppercase tracking-[0.2em] ${isIssa ? 'brand-text opacity-40' : 'text-white opacity-60'}`}>{d.speaker}</p>
                        <div className="flex gap-2">
                          <button 
                            disabled={isPlaying?.includes(`dialog-${i}-${langName}`)}
                            onClick={() => handleSpeak(translation, langName, `dialog-${i}`)}
                            className={`p-2.5 rounded-xl transition-all ${isIssa ? 'bg-stone-50 text-stone-300' : 'bg-black/20 text-white/40'} hover:opacity-100 disabled:opacity-50`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                          </button>
                          <button 
                            disabled={isPlaying?.includes(`dialog-${i}-Pulaar`)}
                            onClick={() => handleSpeak(d.pulaar, 'Pulaar', `dialog-${i}`)} 
                            className={`p-2.5 rounded-xl transition-all ${isIssa ? 'brand-bg text-white' : 'bg-white text-[#2d4156]'} shadow-md active:scale-90 disabled:opacity-50`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                          </button>
                        </div>
                      </div>
                      <p className="font-black text-2xl leading-tight heading-brand mb-3">{d.pulaar}</p>
                      <p className={`text-xs font-bold italic leading-relaxed ${isIssa ? 'text-stone-400' : 'text-white/60'}`}>{translation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const FlashcardCarousel: React.FC<{ items: VocabularyItem[]; onSpeak: (text: string, lang?: string, id?: string, slow?: boolean) => void; languagePair: LanguagePair; langName: string; t: UIStrings }> = ({ items, onSpeak, languagePair, langName, t }) => {
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

  const next = () => { setIsFlipped(false); setTimeout(() => setIndex((prev) => (prev + 1) % items.length), 100); };
  const prev = () => { setIsFlipped(false); setTimeout(() => setIndex((prev) => (prev - 1 + items.length) % items.length), 100); };

  const current = items[index];
  const translation = getActiveTranslation(current);

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="relative w-full aspect-[4/3] perspective-1000">
        <div onClick={() => setIsFlipped(!isFlipped)} className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] border border-stone-100 shadow-2xl flex flex-col items-center justify-center p-10 text-center">
            <span className="text-[10px] font-black brand-text opacity-40 uppercase tracking-[0.3em] mb-6">Pulaar</span>
            <h4 className="text-5xl font-black text-[#2d4156] mb-10 heading-brand">{current.pulaar}</h4>
            <div className="flex gap-4">
              <button onClick={(e) => { e.stopPropagation(); onSpeak(current.pulaar, 'Pulaar', `flash-${index}`); }} className="w-16 h-16 brand-bg text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#2d4156]/20 active:scale-90 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></button>
              <button onClick={(e) => { e.stopPropagation(); onSpeak(current.pulaar, 'Pulaar', `flash-${index}`, true); }} className="w-16 h-16 bg-stone-100 text-stone-400 rounded-2xl flex items-center justify-center active:scale-90 transition-transform"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></button>
            </div>
          </div>
          <div className="absolute inset-0 backface-hidden brand-gradient rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-10 text-center rotate-y-180 text-white">
            <span className="text-[10px] font-black text-white opacity-40 uppercase tracking-[0.3em] mb-6">Translation ({langName})</span>
            <h4 className="text-4xl font-black heading-brand leading-tight mb-10">{translation}</h4>
            <button onClick={(e) => { e.stopPropagation(); onSpeak(translation, langName, `flash-${index}`); }} className="w-16 h-16 bg-white brand-text rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <button onClick={prev} className="w-16 h-16 bg-white rounded-full shadow-lg border border-stone-100 flex items-center justify-center text-stone-400 active:scale-90 transition-all"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
        <span className="text-stone-300 font-black tracking-widest text-xs uppercase">{index + 1} / {items.length}</span>
        <button onClick={next} className="w-16 h-16 bg-white rounded-full shadow-lg border border-stone-100 flex items-center justify-center text-stone-400 active:scale-90 transition-all"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
      <style>{`.perspective-1000{perspective:1000px}.transform-style-3d{transform-style:preserve-3d}.backface-hidden{backface-visibility:hidden}.rotate-y-180{transform:rotateY(180deg)}`}</style>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, icon }: any) => (
  <div className="flex items-center gap-5">
    <div className="w-14 h-14 brand-bg rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-stone-200 shrink-0">{icon}</div>
    <div>
      <h4 className="text-2xl font-black text-[#2d4156] heading-brand leading-none">{title}</h4>
      <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mt-1">{subtitle}</p>
    </div>
  </div>
);

const ListIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="12" r="1"/><circle cx="3" cy="18" r="1"/></svg>;
const FlashcardIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const MessageCircleIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;

export default LessonsScreen;