"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: any; }

export function BoyfriendExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [vaultOpen, setVaultOpen] = useState(false);
  const { recipient, sender, content } = data;

  const stages = [
    { id: "start", title: "For My Special Guy" },
    { id: "message", text: content.openingText || `Hey ${recipient.name},` },
    { id: "things", text: content.thingsText || "There are things I never say enough." },
    { id: "memories", text: content.memoriesText || "Every memory with you is precious." },
    { id: "admire", text: content.admireText || "I admire your strength, your kindness, your heart." },
    { id: "joke", text: content.jokeText || "You always know how to make me laugh." },
    { id: "letter", text: content.letterText || "You mean the world to me." },
    { id: "thanks", text: content.thanksText || "Thank you for being you." },
    { id: "future", text: content.futureText || "I look forward to every moment with you." },
    { id: "vault", text: content.finalMessage || "You are my person." },
  ];

  const nextStage = () => {
    if (stage < stages.length - 1) {
      setStage(s => s + 1);
      if (stages[stage + 1].id === "vault") setTimeout(() => setVaultOpen(true), 1000);
    }
  };

  if (stage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#1a1a2e] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-blue-400/30"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
            animate={{ opacity: [0.2,0.6,0.2], y: [0,-20,0] }}
            transition={{ duration: 4+Math.random()*3, repeat: Infinity, delay: Math.random()*2 }} />
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">🖤</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">For My Special Guy</h1>
          <p className="text-white/60 text-lg mb-8">{sender.name} has prepared something for you, {recipient.name}.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/25">Open 🖤</motion.button>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "vault") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#1a152e] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="relative mb-12 mx-auto">
            <motion.div animate={vaultOpen ? { rotateY: 180 } : {}} transition={{ duration: 1.5 }} className="text-8xl">
              {vaultOpen ? "🔓" : "🔒"}
            </motion.div>
            <AnimatePresence>
              {vaultOpen && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                  className="mt-8 glass rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-xl text-white/90">{content.finalMessage || "You are my person."}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {!vaultOpen && <p className="text-white/40 text-sm">Tap to unlock</p>}
          {vaultOpen && <p className="text-white/40 mt-8">From {sender.name}</p>}
        </div>
        {!vaultOpen && <div className="absolute inset-0 cursor-pointer" onClick={() => setVaultOpen(true)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#0a0f1a":"#1a152e"} 0%, #050a14 100%)` }}
      onClick={nextStage}>
      {[...Array(10)].map((_,i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-blue-400/20"
          style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ opacity: [0.2,0.4,0.2] }}
          transition={{ duration: 3+Math.random()*2, repeat: Infinity }} />
      ))}
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">From {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🎬":stage===2?"💭":stage===3?"📸":stage===4?"🌟":stage===5?"😂":stage===6?"💌":stage===7?"🙏":"🔮"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
