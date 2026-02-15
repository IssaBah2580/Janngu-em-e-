import React, { useState, useEffect, useMemo } from 'react';
import { UIStrings } from '../i18n.ts';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair } from '../types.ts';

interface PracticeItem {
  noun: string;
  possessive: string;
  translation: string;
}

const PRACTICE_ITEMS: PracticeItem[] = [
  { noun: "Deftere", possessive: "Am", translation: "Mon livre / My book" },
  { noun: "Galle", possessive: "Maa", translation: "Ta maison / Your house" },
  { noun: "Suudu", possessive: "Makko", translation: "Sa chambre / His-Her room" },
  { noun: "Puccu", possessive: "Mon", translation: "Votre cheval / Your horse" },
  { noun: "Kosam", possessive: "Amen", translation: "Notre lait / Our milk" },
  { noun: "Baaba", possessive: "Maɓɓe", translation: "Leur père / Their father" },
];

const GrammarScreen: React.FC<{ onBack: () => void; t: UIStrings; languagePair: LanguagePair }> = ({ onBack, t, languagePair }) => {
  const [practiceMode, setPracticeMode] = useState<'interactive' | 'flashcards'>('interactive');
  const [level, setLevel] = useState(0);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentItem = PRACTICE_ITEMS[level % PRACTICE_ITEMS.length];

  const getLanguageName = () => {
    if (languagePair.includes('FRENCH')) return 'French';
    if (languagePair.includes('ENGLISH')) return 'English';
    if (languagePair.includes('SPANISH')) return 'Spanish';
    if (languagePair.includes('ARABIC')) return 'Arabic';
    return 'French';
  };

  const handleSpeak = async (text: string, lang: string = 'Pulaar', slow: boolean = false) => {
    if (!navigator.onLine) {
      alert(t.internet_required);
      return;
    }
    setIsSpeaking(true);
    await speakText(text, lang, slow);
    setIsSpeaking(false);
  };

  // Setup level when level or currentItem changes
  useEffect(() => {
    const shuffled = [currentItem.noun, currentItem.possessive].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setUserOrder([]);
    setFeedback(null);
  }, [level, currentItem]);

  const handleSelectOption = (word: string) => {
    if (feedback === 'correct' || userOrder.length >= 2) return;
    
    const newOrder = [...userOrder, word];
    setUserOrder(newOrder);
    setOptions(prev => prev.filter(o => o !== word));

    if (newOrder.length === 2) {
      if (newOrder[0] === currentItem.noun && newOrder[1] === currentItem.possessive) {
        setFeedback('correct');
        handleSpeak(`${currentItem.noun} ${currentItem.possessive}`, 'Pulaar');
      } else {
        setFeedback('wrong');
        setTimeout(() => {
          // Put back words and reshuffle
          setOptions([currentItem.noun, currentItem.possessive].sort(() => Math.random() - 0.5));
          setUserOrder([]);
          setFeedback(null);
        }, 1000);
      }
    }
  };

  const handleRemoveFromOrder = (word: string) => {
    if (feedback === 'correct') return;
    setUserOrder(prev => prev.filter(w => w !== word));
    setOptions(prev => [...prev, word]);
    setFeedback(null);
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
  };

  const currentLangName = getLanguageName();

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-8 sticky top-0 bg-stone-50 py-4 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-2xl brand-bg text-white shadow-lg active:scale-90 transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-xl font-black text-[#2d4156] heading-brand">{t.grammar}</h2>
        </div>
        
        <div className="flex bg-stone-100 p-1 rounded-2xl shadow-inner">
          <button 
            onClick={() => setPracticeMode('interactive')} 
            className={`p-2 rounded-xl transition-all ${practiceMode === 'interactive' ? 'bg-white shadow-md brand-text' : 'text-stone-300'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
          </button>
          <button 
            onClick={() => setPracticeMode('flashcards')} 
            className={`p-2 rounded-xl transition-all ${practiceMode === 'flashcards' ? 'bg-white shadow-md brand-text' : 'text-stone-300'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </button>
        </div>
      </header>

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500 pb-24">
        
        {practiceMode === 'interactive' ? (
          <section className="bg-white p-8 rounded-[3rem] shadow-sm border border-stone-100 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 brand-bg rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#2d4156] heading-brand">Sifaa jeyirɗo</h3>
                <p className="text-stone-300 text-[10px] font-black uppercase tracking-[0.2em]">Grammar Workshop</p>
              </div>
            </div>

            <div className="text-center mb-10">
               <h4 className="text-stone-400 font-bold italic text-sm leading-relaxed px-4">
                 "Composez la phrase : placez le NOM avant le POSSESSIF."
               </h4>
            </div>

            <div className="space-y-12">
              {/* Output Areas */}
              <div className={`flex justify-center gap-4 h-24 transition-transform ${feedback === 'wrong' ? 'shake' : ''}`}>
                {[0, 1].map((idx) => (
                  <div 
                    key={idx}
                    onClick={() => userOrder[idx] && handleRemoveFromOrder(userOrder[idx])}
                    className={`w-36 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center relative cursor-pointer ${
                      userOrder[idx] 
                        ? feedback === 'correct' 
                          ? 'brand-bg border-[#2d4156] text-white shadow-xl shadow-[#2d4156]/20' 
                          : 'bg-stone-50 border-stone-100 shadow-sm'
                        : 'bg-stone-50/50 border-stone-100 border-dashed'
                    }`}
                  >
                    {userOrder[idx] ? (
                      <span className="font-black text-xl heading-brand animate-in zoom-in duration-200">
                        {userOrder[idx]}
                      </span>
                    ) : (
                      <span className="text-[10px] font-black text-stone-200 uppercase tracking-widest">
                        {idx === 0 ? "1." : "2."}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Word Bank */}
              <div className="flex justify-center gap-4 flex-wrap min-h-[70px] bg-stone-50/50 p-6 rounded-[2rem] border border-dashed border-stone-200">
                {options.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(word)}
                    className="px-8 py-4 bg-white border-2 border-stone-100 rounded-2xl font-black text-[#2d4156] shadow-sm active:scale-90 transition-all hover:border-[#2d4156] hover:shadow-md"
                  >
                    {word}
                  </button>
                ))}
                {options.length === 0 && userOrder.length < 2 && (
                   <p className="text-stone-300 font-black text-[10px] uppercase tracking-widest self-center">Fait !</p>
                )}
              </div>

              {/* Feedback */}
              <div className="h-16 flex flex-col items-center justify-center">
                {feedback === 'correct' && (
                  <div className="animate-in zoom-in duration-500 text-center">
                    <p className="brand-text font-black text-xs uppercase tracking-[0.3em] mb-2">✨ Excellent !</p>
                    <div className="flex items-center justify-center gap-3 bg-stone-50 px-6 py-2 rounded-full border border-stone-100 shadow-sm">
                      <p className="text-stone-600 font-bold text-sm italic">{currentItem.translation}</p>
                    </div>
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="text-center animate-in shake duration-400">
                    <p className="text-rose-500 font-black text-xs uppercase tracking-[0.3em]">Ordre incorrect</p>
                  </div>
                )}
              </div>

              {feedback === 'correct' && (
                <button 
                  onClick={nextLevel}
                  className="w-full brand-bg text-white p-5 rounded-2xl font-black shadow-2xl shadow-[#2d4156]/40 active:scale-95 transition-all heading-brand flex items-center justify-center gap-3"
                >
                  CONTINUER
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              )}
            </div>
          </section>
        ) : (
          <GrammarFlashcardCarousel 
            items={PRACTICE_ITEMS} 
            onSpeak={handleSpeak} 
            currentLang={currentLangName} 
          />
        )}

        {/* Pronunciation Section */}
        <section className="bg-white p-8 rounded-[3rem] shadow-sm border border-stone-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 brand-bg rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2V15H6L11 19V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#2d4156] heading-brand">Pekka</h3>
              <p className="text-stone-300 text-[10px] font-black uppercase tracking-[0.2em]">Prononciation</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] brand-text opacity-40 mb-4">Les Implosives</h4>
              <p className="text-sm text-stone-400 mb-6 font-medium leading-relaxed">Ces sons sont caractéristiques du Pulaar.</p>
              <div className="grid gap-3">
                <RuleItem character="ɓ" ipa="[ɓ]" description="Implosive bilabiale" example="ɓaleeri" exampleMeaning="noir" onSpeak={handleSpeak} lang={currentLangName} />
                <RuleItem character="ɗ" ipa="[ɗ]" description="Implosive alvéolaire" example="ɗemngal" exampleMeaning="langue" onSpeak={handleSpeak} lang={currentLangName} />
                <RuleItem character="ƴ" ipa="[ʔʲ]" description="Implosive palatale" example="ƴiiƴam" exampleMeaning="sang" onSpeak={handleSpeak} lang={currentLangName} />
              </div>
            </div>
          </div>
        </section>

        {/* Reference */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
             <span className="w-2 h-8 brand-bg rounded-full"></span>
             <h4 className="text-xl font-black text-[#2d4156] heading-brand">Adjectifs possessifs</h4>
          </div>
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-stone-100 grid grid-cols-2 gap-4">
             <PossessiveItem term="Am" translation="Mon / Ma" onSpeak={handleSpeak} lang={currentLangName} />
             <PossessiveItem term="Maa" translation="Ton / Ta" onSpeak={handleSpeak} lang={currentLangName} />
             <PossessiveItem term="Makko" translation="Son / Sa" onSpeak={handleSpeak} lang={currentLangName} />
             <PossessiveItem term="Amen" translation="Notre (Excl.)" onSpeak={handleSpeak} lang={currentLangName} />
             <PossessiveItem term="Men" translation="Notre (Incl.)" onSpeak={handleSpeak} lang={currentLangName} />
             <PossessiveItem term="Mon" translation="Votre" onSpeak={handleSpeak} lang={currentLangName} />
             <PossessiveItem term="Maɓɓe" translation="Leur" onSpeak={handleSpeak} lang={currentLangName} />
          </div>
        </section>
      </div>
    </div>
  );
};

const GrammarFlashcardCarousel: React.FC<{ 
  items: PracticeItem[]; 
  onSpeak: (text: string, lang?: string, slow?: boolean) => void;
  currentLang: string;
}> = ({ items, onSpeak, currentLang }) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const next = () => { setIsFlipped(false); setTimeout(() => setIndex((prev) => (prev + 1) % items.length), 100); };
  const prev = () => { setIsFlipped(false); setTimeout(() => setIndex((prev) => (prev - 1 + items.length) % items.length), 100); };

  const current = items[index];
  const pulaarPhrase = `${current.noun} ${current.possessive}`;

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="relative w-full aspect-[4/3] perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)} 
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] border border-stone-100 shadow-2xl flex flex-col items-center justify-center p-10 text-center">
            <span className="text-[10px] font-black brand-text opacity-40 uppercase tracking-[0.3em] mb-6">Pulaar</span>
            <div className="flex flex-col gap-2 mb-10">
              <h4 className="text-4xl font-black text-[#2d4156] heading-brand">{current.noun}</h4>
              <h4 className="text-5xl font-black brand-text heading-brand transform scale-110">{current.possessive}</h4>
            </div>
            <div className="flex gap-4">
              <button onClick={(e) => { e.stopPropagation(); onSpeak(pulaarPhrase, 'Pulaar'); }} className="w-16 h-16 brand-bg text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#2d4156]/20 active:scale-90 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></button>
              <button onClick={(e) => { e.stopPropagation(); onSpeak(pulaarPhrase, 'Pulaar', true); }} className="w-16 h-16 bg-stone-100 text-stone-400 rounded-2xl flex items-center justify-center active:scale-90 transition-transform"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></button>
            </div>
          </div>
          <div className="absolute inset-0 backface-hidden brand-gradient rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-10 text-center rotate-y-180 text-white">
            <span className="text-[10px] font-black text-white opacity-40 uppercase tracking-[0.3em] mb-6">Traduction</span>
            <h4 className="text-4xl font-black heading-brand leading-tight mb-10">{current.translation}</h4>
            <button onClick={(e) => { e.stopPropagation(); onSpeak(current.translation, currentLang); }} className="w-16 h-16 bg-white brand-text rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <button onClick={prev} className="w-16 h-16 bg-white rounded-full shadow-lg border border-stone-100 flex items-center justify-center text-stone-400 active:scale-90 transition-all"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
        <span className="text-stone-300 font-black tracking-widest text-xs uppercase">{index + 1} / {items.length}</span>
        <button onClick={next} className="w-16 h-16 bg-white rounded-full shadow-lg border border-stone-100 flex items-center justify-center text-stone-400 active:scale-90 transition-all"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>
  );
};

const RuleItem: React.FC<{ character: string; ipa: string; description: string; example: string; exampleMeaning: string; onSpeak: (t: string, l: string) => void; lang: string }> = ({ character, ipa, description, example, exampleMeaning, onSpeak, lang }) => (
  <div className="bg-stone-50 p-4 rounded-3xl flex items-center justify-between border border-stone-100 group">
    <div className="flex items-center gap-4">
      <button onClick={() => onSpeak(character, 'Pulaar')} className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center font-black text-2xl brand-text border border-stone-50 active:scale-90 transition-transform heading-brand">
        {character}
      </button>
      <div>
        <p className="text-xs font-black text-stone-800 uppercase tracking-wider">{description}</p>
        <p className="text-[10px] text-stone-400 font-mono font-bold">{ipa}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-black text-stone-600 heading-brand">{example}</p>
        <p className="text-[10px] text-stone-400 font-bold italic">{exampleMeaning}</p>
      </div>
      <button onClick={() => onSpeak(example, 'Pulaar')} className="p-1 rounded-md brand-text opacity-20 group-hover:opacity-100 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
      </button>
    </div>
  </div>
);

const PossessiveItem: React.FC<{ term: string; translation: string; onSpeak: (t: string, l: string) => void; lang: string }> = ({ term, translation, onSpeak, lang }) => (
  <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 flex flex-col items-center group hover:bg-white hover:shadow-md transition-all">
    <button onClick={() => onSpeak(term, 'Pulaar')} className="text-2xl font-black brand-text heading-brand group-hover:scale-110 transition-transform">
      {term}
    </button>
    <button onClick={() => onSpeak(translation, lang)} className="mt-2 text-[10px] uppercase font-black tracking-widest text-stone-400 opacity-60 group-hover:opacity-100">
      {translation}
    </button>
  </div>
);

export default GrammarScreen;