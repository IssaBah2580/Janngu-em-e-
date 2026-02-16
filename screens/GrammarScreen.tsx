import React, { useState, useEffect, useMemo } from 'react';
import { UIStrings } from '../i18n.ts';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair, GrammarCategory } from '../types.ts';
import { GRAMMAR_COMPILATION, WORD_ORDER_CHALLENGES } from '../constants.tsx';

const GrammarScreen: React.FC<{ onBack: () => void; t: UIStrings; languagePair: LanguagePair }> = ({ onBack, t, languagePair }) => {
  const [activeTab, setActiveTab] = useState<string>('pronouns');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Challenge states (Global Tab)
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ message: string; type: 'success' | 'error' | 'hint' | null; errorIdx?: number }>({ message: '', type: null });

  // Sub-tab state for possessives
  const [possessiveSubTab, setPossessiveSubTab] = useState<'list' | 'practice' | 'order'>('list');

  // Flashcard states
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Order Challenge states (Specific for possessives)
  const [orderChallengeIdx, setOrderChallengeIdx] = useState(0);
  const [selectedOrderWords, setSelectedOrderWords] = useState<string[]>([]);
  const [availableOrderWords, setAvailableOrderWords] = useState<string[]>([]);
  const [orderFeedback, setOrderFeedback] = useState<{ type: 'success' | 'error' | null }>({ type: null });

  const currentChallenge = WORD_ORDER_CHALLENGES[challengeIdx];

  // Flashcard and Order Challenge items derived from possessives
  const derivedItems = useMemo(() => {
    const possessiveCat = GRAMMAR_COMPILATION.find(c => c.id === 'possessives');
    if (!possessiveCat) return [];
    
    const items: { front: string, back: string, pulaarParts: string[] }[] = [];
    possessiveCat.sections.forEach(sec => {
      sec.items.forEach(item => {
        if (item.example) {
          const match = item.example.match(/(.*)\s\((.*)\)/);
          if (match) {
            items.push({ 
              front: match[1], 
              back: match[2],
              pulaarParts: match[1].split(' ') 
            });
          }
        }
      });
    });
    return items;
  }, []);

  const currentOrderChallenge = derivedItems[orderChallengeIdx];

  useEffect(() => {
    if (activeTab === 'challenge') {
      setAvailableWords([...currentChallenge.words].sort(() => Math.random() - 0.5));
      setSelectedWords([]);
      setChallengeFeedback({ message: '', type: null });
    }
  }, [challengeIdx, activeTab, currentChallenge.words]);

  useEffect(() => {
    if (activeTab === 'possessives' && possessiveSubTab === 'order' && currentOrderChallenge) {
      setAvailableOrderWords([...currentOrderChallenge.pulaarParts].sort(() => Math.random() - 0.5));
      setSelectedOrderWords([]);
      setOrderFeedback({ type: null });
    }
  }, [orderChallengeIdx, activeTab, possessiveSubTab, currentOrderChallenge]);

  const getLanguageKey = () => (languagePair.includes('ENGLISH') ? 'en' : 'fr');
  const langKey = getLanguageKey();
  const activeCategory = GRAMMAR_COMPILATION.find(c => c.id === activeTab) || GRAMMAR_COMPILATION[0];

  const handleSpeak = async (text: string, lang: string = 'Pulaar', id: string = "", slow: boolean = false) => {
    if (!navigator.onLine) {
      alert(t.internet_required);
      return;
    }
    const playId = id || text;
    setIsPlaying(playId + '-' + lang);
    await speakText(text, lang, slow);
    setIsPlaying(null);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (fromAvailable) {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w, i) => i !== availableWords.indexOf(word)));
    } else {
      setAvailableWords([...availableWords, word]);
      const lastIdx = selectedWords.lastIndexOf(word);
      setSelectedWords(selectedWords.filter((_, i) => i !== lastIdx));
    }
    setChallengeFeedback({ message: '', type: null });
  };

  const handleOrderWordClick = (word: string, fromAvailable: boolean) => {
    if (orderFeedback.type === 'success') return;
    
    if (fromAvailable) {
      const newSelected = [...selectedOrderWords, word];
      setSelectedOrderWords(newSelected);
      setAvailableOrderWords(availableOrderWords.filter((w, i) => i !== availableOrderWords.indexOf(word)));
      
      // Auto-check if all words are picked
      if (newSelected.length === currentOrderChallenge.pulaarParts.length) {
        checkOrder(newSelected);
      }
    } else {
      setAvailableOrderWords([...availableOrderWords, word]);
      const lastIdx = selectedOrderWords.lastIndexOf(word);
      setSelectedOrderWords(selectedOrderWords.filter((_, i) => i !== lastIdx));
      setOrderFeedback({ type: null });
    }
  };

  const checkOrder = (currentSelection: string[]) => {
    const isCorrect = currentSelection.join(' ') === currentOrderChallenge.front;
    if (isCorrect) {
      setOrderFeedback({ type: 'success' });
      handleSpeak(currentOrderChallenge.front);
    } else {
      setOrderFeedback({ type: 'error' });
    }
  };

  const checkSentence = () => {
    const isCorrect = selectedWords.join(' ') === currentChallenge.pulaar;
    if (isCorrect) {
      setChallengeFeedback({ message: t.correct, type: 'success' });
      handleSpeak(currentChallenge.pulaar);
    } else {
      setChallengeFeedback({ message: t.wrong_order, type: 'error' });
    }
  };

  const nextOrderChallenge = () => {
    setOrderChallengeIdx(prev => (prev + 1) % derivedItems.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-slate-950 transition-colors">
      <header className="bg-white dark:bg-slate-900 px-6 pt-10 pb-4 flex flex-col gap-6 sticky top-0 z-40 border-b border-stone-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-stone-900 dark:text-white hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand leading-none">{t.grammar}</h2>
            <p className="text-[10px] font-black text-[#00a884] dark:text-emerald-500 uppercase tracking-widest mt-1">LOGIQUE & STRUCTURE</p>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {GRAMMAR_COMPILATION.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === cat.id 
                ? 'bg-[#00a884] text-white shadow-md' 
                : 'bg-stone-100 dark:bg-slate-800 text-stone-500'
              }`}
            >
              {cat.title[langKey]}
            </button>
          ))}
          <button 
            onClick={() => setActiveTab('challenge')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === 'challenge' 
              ? 'bg-amber-500 text-white shadow-md' 
              : 'bg-amber-50 dark:bg-amber-900/10 text-amber-600'
            }`}
          >
            🧩 Défi
          </button>
        </div>

        {activeTab === 'possessives' && (
          <div className="flex bg-stone-100 dark:bg-slate-800 p-1 rounded-2xl">
             <button 
              onClick={() => setPossessiveSubTab('list')}
              className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${possessiveSubTab === 'list' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}
             >
               {t.list_mode}
             </button>
             <button 
              onClick={() => setPossessiveSubTab('practice')}
              className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${possessiveSubTab === 'practice' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}
             >
               {t.practice_mode}
             </button>
             <button 
              onClick={() => setPossessiveSubTab('order')}
              className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${possessiveSubTab === 'order' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}
             >
               {t.order_challenge}
             </button>
          </div>
        )}
      </header>

      <div className="p-6 space-y-8 pb-32">
        {activeTab === 'challenge' ? (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-stone-100 dark:border-slate-800 shadow-sm text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Traduisez :</p>
               <h3 className="text-2xl font-black heading-brand text-stone-900 dark:text-white">"{currentChallenge.translation[langKey]}"</h3>
            </div>

            <div className={`min-h-[140px] p-8 bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed flex flex-wrap gap-3 items-center justify-center transition-colors ${challengeFeedback.type === 'error' ? 'border-rose-400' : 'border-stone-100 dark:border-slate-800'}`}>
              {selectedWords.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  onClick={() => handleWordClick(word, false)}
                  className="px-5 py-3.5 rounded-2xl bg-[#00a884] text-white font-black text-sm shadow-lg shadow-emerald-500/10"
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {availableWords.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  onClick={() => handleWordClick(word, true)}
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-stone-300 font-black text-sm"
                >
                  {word}
                </button>
              ))}
            </div>

            <button 
              onClick={checkSentence}
              disabled={selectedWords.length === 0}
              className="w-full bg-[#00a884] text-white py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/10 uppercase tracking-widest text-xs"
            >
              Vérifier
            </button>
          </div>
        ) : activeTab === 'possessives' && possessiveSubTab === 'order' ? (
          <div className="space-y-10 py-10 animate-in fade-in duration-500">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-stone-100 dark:border-slate-800 shadow-sm text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-2">TRADUISEZ</p>
               <h3 className="text-3xl font-black text-stone-900 dark:text-white heading-brand">"{currentOrderChallenge?.back}"</h3>
            </div>

            <div className={`min-h-[120px] p-8 rounded-[3rem] border-2 border-dashed flex flex-wrap gap-4 items-center justify-center transition-all ${
              orderFeedback.type === 'success' ? 'bg-emerald-50/50 border-emerald-400' : 
              orderFeedback.type === 'error' ? 'bg-rose-50/50 border-rose-400 animate-shake' : 
              'bg-white dark:bg-slate-900/50 border-stone-100 dark:border-slate-800'
            }`}>
              {selectedOrderWords.map((word, i) => (
                <button
                  key={`selected-${i}`}
                  onClick={() => handleOrderWordClick(word, false)}
                  className={`px-6 py-4 rounded-2xl font-black text-lg shadow-md transition-all ${
                    orderFeedback.type === 'success' ? 'bg-[#00a884] text-white' : 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-100 dark:border-slate-700'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {availableOrderWords.map((word, i) => (
                <button
                  key={`avail-${i}`}
                  onClick={() => handleOrderWordClick(word, true)}
                  className="px-8 py-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-stone-100 dark:border-slate-800 text-stone-900 dark:text-stone-300 font-black text-lg shadow-sm hover:border-[#00a884]/30 active:scale-95 transition-all"
                >
                  {word}
                </button>
              ))}
            </div>

            {orderFeedback.type === 'success' && (
              <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-500">
                <div className="p-6 bg-emerald-500 text-white rounded-[2rem] text-center font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20">
                  {t.correct}
                </div>
                <button 
                  onClick={nextOrderChallenge}
                  className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                >
                  {t.next}
                </button>
              </div>
            )}
            
            <p className="text-center text-[10px] font-black text-stone-300 uppercase tracking-widest pt-10">
              Conseil : En Pulaar, le possessif suit le nom.
            </p>
          </div>
        ) : activeTab === 'possessives' && possessiveSubTab === 'practice' ? (
          <div className="flex flex-col items-center gap-10 py-10">
            <div className="perspective-1000 w-full max-w-[340px] aspect-[4/5]">
               <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
               >
                 <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-stone-100 dark:border-slate-800 flex flex-col items-center justify-center p-12 backface-hidden">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 mb-10">PULAAR</span>
                    <h3 className="text-4xl font-black text-stone-900 dark:text-white heading-brand text-center leading-tight">{derivedItems[currentFlashcardIdx]?.front}</h3>
                    <div className="mt-12 w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-[#00a884]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-[#00a884] rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-12 backface-hidden rotate-y-180">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-10">{langKey.toUpperCase()}</span>
                    <h3 className="text-4xl font-black text-white heading-brand text-center leading-tight">{derivedItems[currentFlashcardIdx]?.back}</h3>
                 </div>
               </div>
            </div>

            <div className="flex items-center gap-6 w-full max-w-[340px]">
               <button onClick={() => { setIsFlipped(false); setCurrentFlashcardIdx(p => (p - 1 + derivedItems.length) % derivedItems.length); }} className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex items-center justify-center text-stone-400 active:scale-95 transition-all">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
               </button>
               <button onClick={() => setIsFlipped(!isFlipped)} className="flex-1 bg-[#00a884] text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">{t.flip}</button>
               <button onClick={() => { setIsFlipped(false); setCurrentFlashcardIdx(p => (p + 1) % derivedItems.length); }} className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex items-center justify-center text-stone-400 active:scale-95 transition-all">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
               </button>
            </div>
            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{currentFlashcardIdx + 1} / {derivedItems.length}</p>
          </div>
        ) : (
          <>
            <div className="bg-[#00a884] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
               <h3 className="text-3xl font-black heading-brand mb-1">{activeCategory.title[langKey]}</h3>
               <p className="opacity-60 font-black uppercase tracking-widest text-[10px]">{activeCategory.title.pulaar}</p>
            </div>

            {activeCategory.sections.map((section, sIdx) => {
              const sectionId = `${activeTab}-${sIdx}`;
              const isExpanded = expandedSections[sectionId];
              return (
                <div key={sIdx} className="bg-white dark:bg-slate-900 rounded-[3rem] border border-stone-100 dark:border-slate-800 shadow-sm overflow-hidden mb-4 transition-all">
                  <button onClick={() => toggleSection(sectionId)} className="w-full p-8 flex items-center justify-between">
                    <h4 className="text-lg font-black text-stone-900 dark:text-stone-100 heading-brand">{section.title[langKey]}</h4>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 text-stone-300 ${isExpanded ? 'rotate-180 text-[#00a884]' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  {isExpanded && (
                    <div className="px-8 pb-10 space-y-4 animate-in slide-in-from-top-4 duration-500">
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx} className="bg-stone-50 dark:bg-slate-800/30 p-6 rounded-[2rem] flex items-center justify-between group">
                          <div className="flex-1">
                            <p className="font-black text-lg text-stone-900 dark:text-stone-100 heading-brand">{item.pulaar}</p>
                            <p className="text-stone-400 text-sm font-bold italic">{item[langKey]}</p>
                          </div>
                          <button 
                            onClick={() => handleSpeak(item.pulaar, 'Pulaar', `gram-${sIdx}-${iIdx}`)} 
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isPlaying === `gram-${sIdx}-${iIdx}-Pulaar` ? 'bg-[#00a884] text-white' : 'bg-white dark:bg-slate-800 text-[#00a884]'}`}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default GrammarScreen;