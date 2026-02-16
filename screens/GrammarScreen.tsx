import React, { useState, useEffect, useMemo } from 'react';
import { UIStrings } from '../i18n.ts';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair, GrammarCategory } from '../types.ts';
import { GRAMMAR_COMPILATION, WORD_ORDER_CHALLENGES } from '../constants.tsx';

const GrammarScreen: React.FC<{ onBack: () => void; t: UIStrings; languagePair: LanguagePair }> = ({ onBack, t, languagePair }) => {
  const [activeTab, setActiveTab] = useState<string>('pronouns');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Global Challenge states
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ message: string; type: 'success' | 'error' | 'hint' | null; errorIdx?: number }>({ message: '', type: null });

  // Possessive Challenge states
  const [isPossessivePractice, setIsPossessivePractice] = useState(false);
  const [possessiveIdx, setPossessiveIdx] = useState(0);
  const [pSelected, setPSelected] = useState<string[]>([]);
  const [pAvailable, setPAvailable] = useState<string[]>([]);
  const [pFeedback, setPFeedback] = useState<'success' | 'error' | null>(null);

  const currentChallenge = WORD_ORDER_CHALLENGES[challengeIdx];
  const correctWords = useMemo(() => currentChallenge.pulaar.split(' '), [currentChallenge]);

  // Extract possessive examples for the mini-game
  const possessiveExamples = useMemo(() => {
    const cat = GRAMMAR_COMPILATION.find(c => c.id === 'possessives');
    if (!cat) return [];
    const items = cat.sections.flatMap(s => s.items);
    return items.filter(item => item.example).map(item => {
      // Example format: "Deftere am (Mon livre)"
      const pulaarPart = item.example!.split('(')[0].trim();
      const words = pulaarPart.split(' ');
      return {
        full: pulaarPart,
        words: words,
        translation: item.example!.split('(')[1]?.replace(')', '').trim() || ""
      };
    });
  }, []);

  useEffect(() => {
    if (activeTab === 'challenge') {
      setAvailableWords([...currentChallenge.words].sort(() => Math.random() - 0.5));
      setSelectedWords([]);
      setChallengeFeedback({ message: '', type: null });
    }
  }, [challengeIdx, activeTab, currentChallenge.words]);

  useEffect(() => {
    if (isPossessivePractice && possessiveExamples.length > 0) {
      const current = possessiveExamples[possessiveIdx];
      setPAvailable([...current.words].sort(() => Math.random() - 0.5));
      setPSelected([]);
      setPFeedback(null);
    }
  }, [isPossessivePractice, possessiveIdx, possessiveExamples]);

  const getLanguageKey = () => {
    if (languagePair.includes('ENGLISH')) return 'en';
    return 'fr'; 
  };

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

  // Main Challenge Logic
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

  const checkSentence = () => {
    const isCorrect = selectedWords.join(' ') === currentChallenge.pulaar;
    if (isCorrect) {
      setChallengeFeedback({ message: "Excellent ! C'est la structure correcte.", type: 'success' });
      handleSpeak(currentChallenge.pulaar);
    } else {
      let mismatchIdx = -1;
      for (let i = 0; i < selectedWords.length; i++) {
        if (selectedWords[i] !== correctWords[i]) {
          mismatchIdx = i;
          break;
        }
      }
      if (mismatchIdx === 0) {
        setChallengeFeedback({ message: `Indice : La phrase commence souvent par "${correctWords[0]}".`, type: 'error', errorIdx: 0 });
      } else if (mismatchIdx !== -1) {
        setChallengeFeedback({ message: `Le mot "${selectedWords[mismatchIdx]}" est mal placé.`, type: 'error', errorIdx: mismatchIdx });
      } else if (selectedWords.length < correctWords.length) {
        setChallengeFeedback({ message: "La phrase est incomplète.", type: 'hint' });
      } else {
        setChallengeFeedback({ message: "L'ordre des mots est incorrect.", type: 'error' });
      }
    }
  };

  // Possessive Practice Logic
  const handlePossessiveWordClick = (word: string) => {
    if (pFeedback === 'success') return;
    
    const newSelected = [...pSelected, word];
    const newAvailable = pAvailable.filter((w, i) => i !== pAvailable.indexOf(word));
    
    setPSelected(newSelected);
    setPAvailable(newAvailable);
    setPFeedback(null);

    // Auto-check when all words are placed
    if (newAvailable.length === 0) {
      const current = possessiveExamples[possessiveIdx];
      if (newSelected.join(' ') === current.full) {
        setPFeedback('success');
        handleSpeak(current.full);
        setTimeout(() => {
          if (possessiveIdx < possessiveExamples.length - 1) {
            setPossessiveIdx(prev => prev + 1);
          } else {
            setIsPossessivePractice(false);
          }
        }, 1500);
      } else {
        setPFeedback('error');
        // Reset after a short delay for user to see the error
        setTimeout(() => {
          setPAvailable([...current.words].sort(() => Math.random() - 0.5));
          setPSelected([]);
          setPFeedback(null);
        }, 800);
      }
    }
  };

  const langKey = getLanguageKey();
  const activeCategory = GRAMMAR_COMPILATION.find(c => c.id === activeTab) || GRAMMAR_COMPILATION[0];

  return (
    <div className="flex flex-col min-h-full bg-stone-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl sticky top-0 z-30 border-b border-stone-100 dark:border-slate-800 transition-colors">
        <div className="p-5 flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-2xl bg-brand text-white shadow-lg active:scale-90 transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand leading-none">{t.grammar}</h2>
            <p className="text-[10px] font-black text-brand dark:text-stone-500 uppercase tracking-widest mt-1">Guide Pulaar</p>
          </div>
        </div>
        
        <div className="px-5 pb-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {GRAMMAR_COMPILATION.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => { setActiveTab(cat.id); setIsPossessivePractice(false); }}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all border-2 ${
                activeTab === cat.id 
                ? 'bg-brand border-brand text-white' 
                : 'bg-stone-50 dark:bg-slate-800 border-stone-100 dark:border-slate-700 text-stone-500 dark:text-stone-400'
              }`}
            >
              {cat.title[langKey]}
            </button>
          ))}
          <button 
            onClick={() => { setActiveTab('challenge'); setIsPossessivePractice(false); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all border-2 ${
              activeTab === 'challenge' 
              ? 'bg-amber-500 border-amber-600 text-white' 
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 text-amber-600 dark:text-amber-400'
            }`}
          >
            🧩 Challenge
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8 animate-in fade-in duration-700 pb-32">
        {activeTab === 'challenge' ? (
          <div className="space-y-8">
            <div className="bg-amber-50 dark:bg-amber-900/10 p-10 rounded-[3rem] border-2 border-amber-100 dark:border-amber-900/20 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-400 mb-4 block">Défi Structure</span>
              <h3 className="text-2xl font-black heading-brand text-stone-900 dark:text-stone-50 mb-3">"{currentChallenge.translation[langKey]}"</h3>
            </div>

            <div className={`min-h-[140px] p-8 bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed flex flex-wrap gap-3 items-center justify-center transition-colors ${challengeFeedback.type === 'error' ? 'border-rose-400 dark:border-rose-900/50' : 'border-stone-100 dark:border-slate-800'}`}>
              {selectedWords.length === 0 && <p className="text-stone-400 dark:text-stone-600 font-black uppercase text-[10px] tracking-widest text-center">Appuyez sur les mots ci-dessous</p>}
              {selectedWords.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  onClick={() => handleWordClick(word, false)}
                  className={`px-5 py-3.5 rounded-2xl font-black text-sm transition-all ${challengeFeedback.type === 'error' && i === challengeFeedback.errorIdx ? 'bg-rose-500 text-white shadow-lg animate-shake' : 'bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-stone-200'}`}
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
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-stone-50 dark:border-slate-800 text-stone-900 dark:text-stone-300 font-black text-sm active:scale-95 transition-all shadow-sm"
                >
                  {word}
                </button>
              ))}
            </div>

            {challengeFeedback.message && (
              <div className={`p-6 rounded-[2.5rem] border-2 animate-in slide-in-from-top-2 ${challengeFeedback.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20 text-amber-800 dark:text-amber-400'}`}>
                <p className="text-sm font-bold text-center">{challengeFeedback.message}</p>
              </div>
            )}

            <button 
              onClick={checkSentence}
              disabled={selectedWords.length === 0}
              className="w-full bg-brand text-white py-5 rounded-2xl font-black shadow-xl shadow-brand/20 active:scale-95 transition-all disabled:opacity-50 heading-brand uppercase tracking-widest text-[11px]"
            >
              Vérifier
            </button>
          </div>
        ) : (
          <>
            <div className="brand-gradient p-12 rounded-[3.5rem] text-white shadow-2xl shadow-brand/20 mb-6 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-4xl font-black mb-2 heading-brand">{activeCategory.title[langKey]}</h3>
                <p className="opacity-70 font-black uppercase tracking-[0.3em] text-[10px]">{activeCategory.title.pulaar}</p>
              </div>
              <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-700">📘</div>
            </div>

            {/* Special Possessive Challenge Entry */}
            {activeTab === 'possessives' && !isPossessivePractice && (
              <div className="bg-amber-100/50 dark:bg-amber-900/10 p-8 rounded-[3rem] border-2 border-amber-200 dark:border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 transition-all hover:bg-amber-100 dark:hover:bg-amber-900/20">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">🧩</div>
                   <div>
                     <h4 className="text-lg font-black text-amber-900 dark:text-amber-400 heading-brand leading-none">Défi des Possessifs</h4>
                     <p className="text-[10px] font-bold text-amber-700 dark:text-amber-500/70 uppercase tracking-widest mt-2">Pratiquez l'ordre Nom + Adjectif</p>
                   </div>
                </div>
                <button 
                  onClick={() => { setIsPossessivePractice(true); setPossessiveIdx(0); }}
                  className="px-8 py-4 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  Jouer
                </button>
              </div>
            )}

            {/* Possessive Practice View */}
            {activeTab === 'possessives' && isPossessivePractice && (
              <div className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between px-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Pratique Interactive</h4>
                  <button onClick={() => setIsPossessivePractice(false)} className="text-[10px] font-black uppercase tracking-widest text-rose-500">Quitter</button>
                </div>

                <div className={`p-10 bg-white dark:bg-slate-900 rounded-[3rem] border-2 shadow-sm text-center transition-all ${pFeedback === 'success' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' : pFeedback === 'error' ? 'border-rose-500 animate-shake' : 'border-stone-100 dark:border-slate-800'}`}>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em] mb-4">Traduisez :</p>
                  <h3 className="text-3xl font-black text-stone-900 dark:text-white heading-brand mb-8 italic">"{possessiveExamples[possessiveIdx].translation}"</h3>
                  
                  <div className="min-h-[80px] flex flex-wrap gap-4 justify-center items-center border-t border-stone-100 dark:border-slate-800 pt-8">
                    {pSelected.map((word, i) => (
                      <div key={i} className="px-6 py-4 bg-brand text-white rounded-2xl font-black text-lg shadow-xl shadow-brand/20 animate-in zoom-in">
                        {word}
                      </div>
                    ))}
                    {pSelected.length === 0 && <div className="h-14 w-32 border-2 border-dashed border-stone-200 dark:border-slate-800 rounded-2xl"></div>}
                  </div>
                </div>

                <div className="flex gap-4 justify-center py-4">
                  {pAvailable.map((word, i) => (
                    <button
                      key={`${word}-${i}`}
                      onClick={() => handlePossessiveWordClick(word)}
                      className="px-8 py-5 bg-white dark:bg-slate-900 border-2 border-stone-100 dark:border-slate-800 rounded-3xl font-black text-xl text-stone-900 dark:text-stone-100 shadow-md active:scale-95 transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {pFeedback === 'success' && (
                  <div className="text-center animate-in fade-in duration-500">
                    <span className="text-4xl">✨</span>
                    <p className="text-emerald-600 font-black mt-2 text-sm uppercase tracking-widest">Bravo !</p>
                  </div>
                )}
                
                <div className="flex justify-center pt-6">
                   <div className="flex gap-1.5">
                     {possessiveExamples.map((_, i) => (
                       <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === possessiveIdx ? 'w-8 bg-amber-500' : 'w-2 bg-stone-200 dark:bg-slate-800'}`}></div>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {!isPossessivePractice && activeCategory.sections.map((section, sIdx) => {
              const sectionId = `${activeTab}-${sIdx}`;
              const isExpanded = expandedSections[sectionId];
              return (
                <section key={sIdx} className="bg-white dark:bg-slate-900 rounded-[3rem] border border-stone-100 dark:border-slate-800 shadow-sm overflow-hidden mb-4 transition-all">
                  <button onClick={() => toggleSection(sectionId)} className="w-full p-8 flex items-center justify-between text-left group">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${isExpanded ? 'bg-brand text-white shadow-lg' : 'bg-stone-50 dark:bg-slate-800 text-stone-400 group-hover:bg-stone-100'}`}>
                        {activeTab === 'possessives' ? '👜' : activeTab === 'pronouns' ? '👤' : '⚡'}
                      </div>
                      <h4 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand">{section.title[langKey]}</h4>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 text-stone-300 ${isExpanded ? 'rotate-180 text-brand' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  {isExpanded && (
                    <div className="px-8 pb-10 space-y-4 animate-in slide-in-from-top-4 duration-500">
                      <div className="h-px bg-stone-50 dark:bg-slate-800/50 mb-6"></div>
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx} className="bg-stone-50/50 dark:bg-slate-800/30 p-6 rounded-[2rem] flex items-center justify-between border border-stone-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 transition-all">
                          <div className="flex-1">
                            <p className="font-black text-xl text-stone-900 dark:text-stone-100 heading-brand mb-1">{item.pulaar}</p>
                            <p className="text-stone-500 dark:text-stone-400 text-sm font-bold italic">{item[langKey]}</p>
                            {item.example && (
                              <p className="text-[10px] text-brand/60 dark:text-stone-500 font-bold uppercase mt-3 tracking-widest">{item.example}</p>
                            )}
                          </div>
                          <button 
                            onClick={() => handleSpeak(item.pulaar, 'Pulaar', `gram-${sIdx}-${iIdx}`)} 
                            className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center shadow-sm border border-stone-100 dark:border-slate-800 active:scale-90 ${isPlaying === `gram-${sIdx}-${iIdx}-Pulaar` ? 'bg-brand text-white' : 'bg-white dark:bg-slate-900 text-brand dark:text-stone-400'}`}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default GrammarScreen;