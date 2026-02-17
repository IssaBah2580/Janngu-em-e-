
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

  // Sub-tab states
  const [possessiveSubTab, setPossessiveSubTab] = useState<'list' | 'practice' | 'order'>('list');
  const [verbSubTab, setVerbSubTab] = useState<'list' | 'conjugation'>('list');

  // Flashcard states
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Order Challenge states (Specific for possessives)
  const [orderChallengeIdx, setOrderChallengeIdx] = useState(0);
  const [selectedOrderWords, setSelectedOrderWords] = useState<string[]>([]);
  const [availableOrderWords, setAvailableOrderWords] = useState<string[]>([]);
  const [orderFeedback, setOrderFeedback] = useState<{ type: 'success' | 'error' | null }>({ type: null });
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Verb Conjugation states
  const [verbChallengeIdx, setVerbChallengeIdx] = useState(0);
  const [selectedVerbOption, setSelectedVerbOption] = useState<number | null>(null);
  const [verbFeedback, setVerbFeedback] = useState<{ type: 'success' | 'error' | null }>({ type: null });

  const currentChallenge = WORD_ORDER_CHALLENGES[challengeIdx];

  // Derived content for challenges
  const possessiveItems = useMemo(() => {
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

  const verbConjugationChallenges = useMemo(() => {
    const verbCat = GRAMMAR_COMPILATION.find(c => c.id === 'verbs');
    if (!verbCat) return [];
    
    const challenges: { infinitive: string, pronoun: string, correct: string, options: string[], translation: string }[] = [];
    
    verbCat.sections.forEach(sec => {
      // Find infinitive hint from title
      const infinitiveMatch = sec.title.en.match(/\((.*)\)/);
      const infinitive = infinitiveMatch ? infinitiveMatch[1] : sec.title.en;

      sec.items.forEach(item => {
        // Simple heuristic to separate pronoun and verb form
        const parts = item.pulaar.split(' ');
        if (parts.length >= 2) {
          const pronoun = parts[0];
          const correctForm = parts[1];
          // Generate distractor options
          const distractors = ['woni', 'woodi', 'dañii', 'arii', 'yidi'].filter(d => d !== correctForm).sort(() => Math.random() - 0.5).slice(0, 2);
          const options = [correctForm, ...distractors].sort(() => Math.random() - 0.5);

          challenges.push({
            infinitive,
            pronoun,
            correct: correctForm,
            options,
            translation: (languagePair.includes('ENGLISH') ? item.en : item.fr)
          });
        }
      });
    });
    return challenges;
  }, [languagePair]);

  const currentOrderChallenge = possessiveItems[orderChallengeIdx];
  const currentVerbChallenge = verbConjugationChallenges[verbChallengeIdx];

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
    if (challengeFeedback.type === 'success') return;
    if (fromAvailable) {
      setSelectedWords([...selectedWords, word]);
      const index = availableWords.indexOf(word);
      if (index > -1) {
        const newAvailable = [...availableWords];
        newAvailable.splice(index, 1);
        setAvailableWords(newAvailable);
      }
    } else {
      setAvailableWords([...availableWords, word]);
      const lastIdx = selectedWords.lastIndexOf(word);
      setSelectedWords(selectedWords.filter((_, i) => i !== lastIdx));
      setChallengeFeedback({ message: '', type: null });
    }
  };

  // Drag and Drop Handlers
  const onDragStart = (word: string) => {
    if (orderFeedback.type === 'success') return;
    setDraggedWord(word);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const onDropToSlots = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (draggedWord) {
      handleOrderWordClick(draggedWord, true);
      setDraggedWord(null);
    }
  };

  const handleOrderWordClick = (word: string, fromAvailable: boolean) => {
    if (orderFeedback.type === 'success') return;
    if (fromAvailable) {
      const newSelected = [...selectedOrderWords, word];
      setSelectedOrderWords(newSelected);
      const index = availableOrderWords.indexOf(word);
      if (index > -1) {
        const newAvailable = [...availableOrderWords];
        newAvailable.splice(index, 1);
        setAvailableOrderWords(newAvailable);
      }
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

  const handleVerbOptionSelect = (idx: number) => {
    if (verbFeedback.type === 'success') return;
    setSelectedVerbOption(idx);
    const isCorrect = currentVerbChallenge.options[idx] === currentVerbChallenge.correct;
    if (isCorrect) {
      setVerbFeedback({ type: 'success' });
      handleSpeak(`${currentVerbChallenge.pronoun} ${currentVerbChallenge.correct}`);
    } else {
      setVerbFeedback({ type: 'error' });
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

  const nextVerbChallenge = () => {
    setVerbChallengeIdx(prev => (prev + 1) % verbConjugationChallenges.length);
    setSelectedVerbOption(null);
    setVerbFeedback({ type: null });
  };

  const nextOrderChallenge = () => {
    setOrderChallengeIdx(prev => (prev + 1) % possessiveItems.length);
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
             <button onClick={() => setPossessiveSubTab('list')} className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${possessiveSubTab === 'list' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}>{t.list_mode}</button>
             <button onClick={() => setPossessiveSubTab('practice')} className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${possessiveSubTab === 'practice' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}>{t.practice_mode}</button>
             <button onClick={() => setPossessiveSubTab('order')} className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${possessiveSubTab === 'order' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}>{t.order_challenge}</button>
          </div>
        )}

        {activeTab === 'verbs' && (
          <div className="flex bg-stone-100 dark:bg-slate-800 p-1 rounded-2xl">
             <button onClick={() => setVerbSubTab('list')} className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${verbSubTab === 'list' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}>{t.list_mode}</button>
             <button onClick={() => setVerbSubTab('conjugation')} className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${verbSubTab === 'conjugation' ? 'bg-white dark:bg-slate-700 text-[#00a884] shadow-sm' : 'text-stone-400'}`}>{t.conjugation}</button>
          </div>
        )}
      </header>

      <div className="p-6 space-y-8 pb-32 overflow-y-auto no-scrollbar">
        {activeTab === 'challenge' ? (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-stone-100 dark:border-slate-800 shadow-sm text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Traduisez :</p>
               <h3 className="text-2xl font-black heading-brand text-stone-900 dark:text-white">"{currentChallenge.translation[langKey]}"</h3>
            </div>

            <div className={`min-h-[140px] p-8 bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed flex flex-wrap gap-3 items-center justify-center transition-colors ${challengeFeedback.type === 'error' ? 'border-rose-400 animate-shake' : 'border-stone-100 dark:border-slate-800'}`}>
              {selectedWords.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  onClick={() => handleWordClick(word, false)}
                  className="px-5 py-3.5 rounded-2xl bg-[#00a884] text-white font-black text-sm shadow-lg shadow-emerald-500/10 active:scale-95 transition-transform"
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
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-stone-300 font-black text-sm active:scale-95 transition-transform shadow-sm"
                >
                  {word}
                </button>
              ))}
            </div>

            <button 
              onClick={checkSentence}
              disabled={selectedWords.length === 0}
              className="w-full bg-[#00a884] text-white py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/10 uppercase tracking-widest text-xs active:scale-95 transition-transform"
            >
              Vérifier
            </button>
          </div>
        ) : activeTab === 'verbs' && verbSubTab === 'conjugation' ? (
          <div className="space-y-10 py-10 animate-in fade-in duration-500">
             <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-stone-100 dark:border-slate-800 shadow-sm text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-2">CONJUGAISON</p>
               <h3 className="text-3xl font-black text-stone-900 dark:text-white heading-brand leading-tight">"{currentVerbChallenge?.translation}"</h3>
            </div>

            <div className="flex items-center justify-center gap-6">
               <div className="px-8 py-6 bg-stone-100 dark:bg-slate-800 rounded-3xl font-black text-2xl text-[#00a884]">
                 {currentVerbChallenge?.pronoun}
               </div>
               <div className="w-10 h-2 bg-stone-200 dark:bg-slate-700 rounded-full"></div>
               <div className={`w-40 h-20 rounded-3xl border-4 border-dashed flex items-center justify-center font-black text-2xl transition-all ${
                 verbFeedback.type === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-600' :
                 verbFeedback.type === 'error' ? 'bg-rose-50 border-rose-400 text-rose-600 animate-shake' :
                 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-stone-300'
               }`}>
                 {verbFeedback.type === 'success' ? currentVerbChallenge.correct : '?'}
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">{t.select_correct}</p>
               {currentVerbChallenge?.options.map((option, i) => (
                 <button
                   key={i}
                   onClick={() => handleVerbOptionSelect(i)}
                   className={`p-6 rounded-[2rem] font-black text-lg transition-all border-2 ${
                     selectedVerbOption === i 
                      ? (option === currentVerbChallenge.correct ? 'bg-[#00a884] border-[#00a884] text-white' : 'bg-rose-500 border-rose-500 text-white')
                      : 'bg-white dark:bg-slate-900 border-stone-100 dark:border-slate-800 text-stone-900 dark:text-stone-300 shadow-sm active:scale-95'
                   }`}
                 >
                   {option}
                 </button>
               ))}
            </div>

            {verbFeedback.type === 'success' && (
              <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-700">
                <button 
                  onClick={nextVerbChallenge}
                  className="w-full bg-stone-950 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl active:scale-95 transition-all transform"
                >
                  {t.next}
                </button>
              </div>
            )}
            
            <p className="text-center text-[10px] font-black text-stone-400 uppercase tracking-widest">
              Infinitif : <span className="text-[#00a884]">{currentVerbChallenge?.infinitive}</span>
            </p>
          </div>
        ) : activeTab === 'possessives' && possessiveSubTab === 'order' ? (
          <div className="space-y-10 py-10 animate-in fade-in duration-500">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-stone-100 dark:border-slate-800 shadow-sm text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-2">ORDRE ADJECTIF-NOM</p>
               <h3 className="text-3xl font-black text-stone-900 dark:text-white heading-brand leading-tight">"{currentOrderChallenge?.back}"</h3>
            </div>

            {/* Tactile Drop Zone */}
            <div 
              onDragOver={onDragOver} 
              onDragLeave={onDragLeave}
              onDrop={onDropToSlots} 
              className={`min-h-[160px] p-8 rounded-[3.5rem] border-4 border-dashed flex flex-wrap gap-6 items-center justify-center transition-all duration-300 ${
                isDraggingOver ? 'bg-[#00a884]/5 border-[#00a884] scale-[1.02]' : 
                orderFeedback.type === 'success' ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-900/10' : 
                orderFeedback.type === 'error' ? 'bg-rose-50 border-rose-400 dark:bg-rose-900/10 animate-shake' : 
                'bg-white dark:bg-slate-900/50 border-stone-200 dark:border-slate-800'
              }`}
            >
              {currentOrderChallenge?.pulaarParts.map((_, i) => (
                <div key={`slot-${i}`} className={`w-36 h-20 rounded-3xl flex items-center justify-center transition-all ${selectedOrderWords[i] ? 'bg-transparent' : 'bg-stone-50 dark:bg-slate-800/50 border-2 border-stone-100 dark:border-slate-700 border-dotted'}`}>
                  {selectedOrderWords[i] ? (
                    <button onClick={() => handleOrderWordClick(selectedOrderWords[i], false)} className={`w-full h-full rounded-3xl font-black text-xl shadow-xl transition-all transform hover:scale-105 active:scale-95 ${orderFeedback.type === 'success' ? 'bg-[#00a884] text-white' : 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white border border-stone-100 dark:border-slate-700'}`}>
                      {selectedOrderWords[i]}
                    </button>
                  ) : (
                    <span className="text-stone-300 dark:text-stone-700 text-[10px] font-black uppercase tracking-widest">{i + 1}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Draggable Words */}
            <div className="flex flex-wrap gap-6 justify-center">
              {availableOrderWords.map((word, i) => (
                <div
                  key={`avail-container-${i}`}
                  className="relative group"
                >
                  <button 
                    draggable 
                    onDragStart={() => onDragStart(word)} 
                    onClick={() => handleOrderWordClick(word, true)} 
                    className="px-10 py-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-stone-100 dark:border-slate-800 text-stone-900 dark:text-stone-300 font-black text-2xl shadow-lg hover:border-[#00a884]/40 hover:scale-105 active:scale-95 transition-all cursor-grab active:cursor-grabbing flex items-center gap-3"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-300 group-hover:text-[#00a884] transition-colors"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                    {word}
                  </button>
                </div>
              ))}
            </div>

            {orderFeedback.type === 'success' && (
              <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-700">
                <div className="p-8 bg-[#00a884] text-white rounded-[2.5rem] text-center font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                  {t.correct}
                </div>
                <button onClick={nextOrderChallenge} className="w-full bg-stone-950 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl active:scale-95 transition-all transform">
                  {t.next}
                </button>
              </div>
            )}
            
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-8 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/30">
              <p className="text-center text-[11px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest leading-relaxed">
                <span className="text-[#00a884]">LOGIQUE :</span> EN PULAAR, LE POSSESSIF (<span className="italic">jeyirɗo</span>) SE PLACE TOUJOURS APRÈS LE NOM.
              </p>
            </div>
          </div>
        ) : activeTab === 'possessives' && possessiveSubTab === 'practice' ? (
          <div className="flex flex-col items-center gap-10 py-10">
            <div className="perspective-1000 w-full max-w-[340px] aspect-[4/5]">
               <div onClick={() => setIsFlipped(!isFlipped)} className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
                 <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-stone-100 dark:border-slate-800 flex flex-col items-center justify-center p-12 backface-hidden"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 mb-10">PULAAR</span><h3 className="text-4xl font-black text-stone-900 dark:text-white heading-brand text-center leading-tight">{possessiveItems[currentFlashcardIdx]?.front}</h3><div className="mt-12 w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-[#00a884]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg></div></div>
                 <div className="absolute inset-0 bg-[#00a884] rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-12 backface-hidden rotate-y-180"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-10">{langKey.toUpperCase()}</span><h3 className="text-4xl font-black text-white heading-brand text-center leading-tight">{possessiveItems[currentFlashcardIdx]?.back}</h3></div>
               </div>
            </div>
            <div className="flex items-center gap-6 w-full max-w-[340px]">
               <button onClick={(e) => { e.stopPropagation(); setIsFlipped(false); setCurrentFlashcardIdx(p => (p - 1 + possessiveItems.length) % possessiveItems.length); }} className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex items-center justify-center text-stone-400 active:scale-95 transition-all shadow-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg></button>
               <button onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }} className="flex-1 bg-[#00a884] text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">{t.flip}</button>
               <button onClick={(e) => { e.stopPropagation(); setIsFlipped(false); setCurrentFlashcardIdx(p => (p + 1) % possessiveItems.length); }} className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 flex items-center justify-center text-stone-400 active:scale-95 transition-all shadow-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg></button>
            </div>
            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{currentFlashcardIdx + 1} / {possessiveItems.length}</p>
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
                  <button onClick={() => toggleSection(sectionId)} className="w-full p-8 flex items-center justify-between"><h4 className="text-lg font-black text-stone-900 dark:text-stone-100 heading-brand">{section.title[langKey]}</h4><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 text-stone-300 ${isExpanded ? 'rotate-180 text-[#00a884]' : ''}`}><path d="m6 9 6 6 6-6"/></svg></button>
                  {isExpanded && (
                    <div className="px-8 pb-10 space-y-4 animate-in slide-in-from-top-4 duration-500">
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx} className="bg-stone-50 dark:bg-slate-800/30 p-6 rounded-[2rem] flex items-center justify-between group">
                          <div className="flex-1"><p className="font-black text-lg text-stone-900 dark:text-stone-100 heading-brand">{item.pulaar}</p><p className="text-stone-400 text-sm font-bold italic">{item[langKey]}</p></div>
                          <button onClick={() => handleSpeak(item.pulaar, 'Pulaar', `gram-${sIdx}-${iIdx}`)} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isPlaying === `gram-${sIdx}-${iIdx}-Pulaar` ? 'bg-[#00a884] text-white' : 'bg-white dark:bg-slate-800 text-[#00a884]'}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg></button>
                        </div>
                      ))}

                      {/* Integrated Interactive Challenge Card for Possessives */}
                      {activeTab === 'possessives' && (
                        <div className="pt-6">
                           <button 
                            onClick={() => setPossessiveSubTab('order')}
                            className="w-full bg-stone-900 dark:bg-stone-100 p-8 rounded-[2.5rem] flex items-center justify-between group active:scale-[0.98] transition-all shadow-xl"
                           >
                             <div className="text-left">
                               <h5 className="text-white dark:text-stone-900 font-black heading-brand text-lg leading-none mb-1">Défi Interactif</h5>
                               <p className="text-stone-400 dark:text-stone-500 text-[10px] font-black uppercase tracking-widest">Maîtrisez l'ordre des mots</p>
                             </div>
                             <div className="w-12 h-12 rounded-2xl bg-[#00a884] flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">🧩</div>
                           </button>
                        </div>
                      )}
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
