import React, { useState, useEffect } from 'react';
import { UIStrings } from '../i18n.ts';
import { speakText } from '../services/geminiService.ts';
import { LanguagePair, GrammarCategory } from '../types.ts';
import { GRAMMAR_COMPILATION } from '../constants.tsx';

const GrammarScreen: React.FC<{ onBack: () => void; t: UIStrings; languagePair: LanguagePair }> = ({ onBack, t, languagePair }) => {
  const [activeTab, setActiveTab] = useState<string>('pronouns');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

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
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Collapse sections when changing main categories
  useEffect(() => {
    setExpandedSections({});
  }, [activeTab]);

  const langKey = getLanguageKey();
  const activeCategory = GRAMMAR_COMPILATION.find(c => c.id === activeTab) || GRAMMAR_COMPILATION[0];

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sticky top-0 z-30 border-b border-stone-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="p-5 flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 -ml-2 rounded-2xl brand-bg text-white shadow-lg active:scale-90 transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black text-[#2d4156] dark:text-stone-100 heading-brand">{t.grammar}</h2>
            <p className="text-[10px] font-black brand-text dark:text-stone-500 opacity-40 dark:opacity-60 uppercase tracking-[0.2em]">Compilation Grammaticale</p>
          </div>
        </div>
        
        <div className="px-5 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {GRAMMAR_COMPILATION.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all border-2 ${
                activeTab === cat.id 
                ? 'brand-bg border-[#2d4156] text-white shadow-xl shadow-[#2d4156]/20' 
                : 'bg-stone-50 dark:bg-slate-800 border-stone-100 dark:border-slate-700 text-stone-400 dark:text-stone-500 hover:border-stone-200 dark:hover:border-slate-600'
              }`}
            >
              {cat.title[langKey]}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-32">
        <div className="brand-gradient p-10 rounded-[2.5rem] text-white shadow-2xl shadow-[#2d4156]/30 dark:shadow-none mb-4 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-2 heading-brand">{activeCategory.title[langKey]}</h3>
            <p className="opacity-60 font-bold uppercase tracking-widest text-[10px]">{activeCategory.title.pulaar}</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        </div>

        {activeCategory.sections.map((section, sIdx) => {
          const sectionId = `${activeTab}-${sIdx}`;
          const isExpanded = expandedSections[sectionId];
          
          return (
            <section key={sIdx} className="scroll-mt-40 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-stone-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleSection(sectionId)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md transition-all ${isExpanded ? 'brand-bg text-white' : 'bg-stone-100 dark:bg-slate-800 text-stone-400'}`}>
                    🏷️
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#2d4156] dark:text-stone-100 heading-brand leading-none">{section.title[langKey]}</h4>
                    <p className="text-[9px] font-black text-stone-300 dark:text-stone-600 uppercase tracking-widest mt-1">
                      {isExpanded ? 'Masquer les détails' : 'Afficher les détails'}
                    </p>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 dark:text-stone-600"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="h-px bg-stone-50 dark:bg-slate-800 mb-6"></div>
                  <div className="grid gap-4">
                    {section.items.map((item, iIdx) => (
                      <div 
                        key={iIdx} 
                        className="bg-stone-50/50 dark:bg-slate-800/30 p-5 rounded-3xl flex flex-col gap-3 border border-stone-50 dark:border-slate-800/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-black text-xl text-[#2d4156] dark:text-stone-100 heading-brand mb-1">{item.pulaar}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <p className="text-stone-400 dark:text-stone-500 text-sm font-bold italic">{item[langKey]}</p>
                              {item.example && (
                                <span className="text-[10px] bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full font-black text-stone-300 dark:text-stone-600 uppercase tracking-tighter shadow-xs">
                                  Ex: {item.example}
                                </span>
                              )}
                              <button 
                                disabled={isPlaying === `trans-${sIdx}-${iIdx}`}
                                onClick={() => handleSpeak(item[langKey], langKey === 'fr' ? 'French' : 'English', `trans-${sIdx}-${iIdx}`)}
                                className="p-1.5 rounded-lg brand-text dark:text-stone-600 opacity-20 hover:opacity-100 transition-all disabled:opacity-50"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                              </button>
                            </div>
                          </div>
                          <button 
                            disabled={isPlaying === `pulaar-${sIdx}-${iIdx}`}
                            onClick={() => handleSpeak(item.pulaar, 'Pulaar', `pulaar-${sIdx}-${iIdx}`)} 
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-90 disabled:opacity-50 shrink-0 ${isPlaying === `pulaar-${sIdx}-${iIdx}` ? 'brand-bg text-white scale-110 ring-4 ring-[#2d4156]/20' : 'bg-white dark:bg-slate-900 brand-text dark:text-stone-300 hover:brand-bg hover:text-white dark:hover:bg-[#2d4156]'}`}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {/* Specialized Pulaar Linguistic Tips based on User Input */}
        <section className="bg-stone-100/50 dark:bg-slate-800/50 p-8 rounded-[3rem] border border-stone-200 dark:border-slate-700">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 brand-bg rounded-xl flex items-center justify-center text-white text-xl">💡</div>
              <h4 className="font-black brand-text dark:text-stone-300 heading-brand">Notes Grammaticales</h4>
           </div>
           <div className="space-y-4 text-sm text-stone-500 dark:text-stone-400 leading-relaxed italic">
             <p>• Pas de distinction masculin / féminin en Pulaar (Ex: 'O' = Il/Elle).</p>
             <p>• Le verbe ne change pas à la terminaison selon la personne.</p>
             <p>• Au pluriel, la première consonne du verbe peut changer (Alternance consonantique).</p>
             <p>• "Être" et "Avoir" ont des rôles plus stables qu'en français ou en anglais.</p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default GrammarScreen;