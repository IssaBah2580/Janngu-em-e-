import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UIStrings } from '../i18n.ts';
import { LanguagePair } from '../types.ts';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface TutorScreenProps {
  t: UIStrings;
  languagePair: LanguagePair;
}

const TutorScreen: React.FC<TutorScreenProps> = ({ t, languagePair }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t.ai_tutor_intro }]);
    }
  }, [t.ai_tutor_intro]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `You are 'Balla', a helpful Pulaar language tutor for the Janngu Ɗemɗe app. You are an expert in Pulaar (Fula) grammar, vocabulary, and culture. Answer questions clearly and concisely. If a user asks in French, English, Spanish, or Arabic, respond in that language but include Pulaar examples where relevant. Encourage the user to practice. Current language preference: ${languagePair}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMessage }] }
        ] as any,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const modelText = response.text || "Pardon, je n'ai pas compris.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("AI Tutor Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oups, il y a eu une erreur de connexion." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 px-6 pt-12 pb-6 flex items-center gap-4 border-b border-stone-100 dark:border-slate-800">
        <div className="w-12 h-12 bg-[#00a884] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/20">
          🤖
        </div>
        <div>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 heading-brand leading-none">{t.ai_tutor}</h3>
          <p className="text-[10px] font-black text-[#00a884] uppercase tracking-widest mt-1">Balla • Expert Pulaar</p>
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-medium shadow-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-[#00a884] text-white rounded-tr-lg' 
              : 'bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-100 border border-stone-100 dark:border-slate-800 rounded-tl-lg'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 bg-stone-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-sm shadow-sm">🤖</div>
            <div className="bg-white dark:bg-slate-900 p-4 px-6 rounded-[2rem] rounded-tl-lg border border-stone-100 dark:border-slate-800 shadow-sm flex items-center gap-1.5 h-12">
              <div className="w-1.5 h-1.5 bg-[#00a884] rounded-full animate-typing-dot"></div>
              <div className="w-1.5 h-1.5 bg-[#00a884] rounded-full animate-typing-dot [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-[#00a884] rounded-full animate-typing-dot [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="p-6 bg-white dark:bg-slate-900 border-t border-stone-100 dark:border-slate-800 pb-10">
        <div className="flex gap-3">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.type_question}
            className="flex-1 bg-stone-100 dark:bg-slate-950 border-none rounded-2xl py-4 px-6 text-sm font-bold placeholder:text-stone-400 focus:ring-2 focus:ring-[#00a884]/20 transition-all text-stone-900 dark:text-stone-100"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-[#00a884] text-white p-4 rounded-2xl shadow-lg shadow-emerald-500/10 active:scale-90 transition-all disabled:opacity-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TutorScreen;