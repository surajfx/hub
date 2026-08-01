"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props { data: any; }
export function SorryExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [healed, setHealed] = useState(false);
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "I'm Sorry" },
    { id: "quiet", text: content.openingText || `${recipient.name}...` },
    { id: "apology", text: content.apologyText || "I'm truly sorry for what I did." },
    { id: "regret", text: content.regretText || "I regret my actions deeply." },
    { id: "different", text: content.differentText || "I should have handled things differently." },
    { id: "memories", text: content.memoriesText || "The good times we've shared mean everything to me." },
    { id: "letter", text: content.letterText || "Please find it in your heart to forgive me." },
    { id: "better", text: content.betterText || "I promise to do better." },
    { id: "final", text: content.finalMessage || "I'm sorry, from the bottom of my heart." },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "final") setTimeout(() => setHealed(true), 1000); } };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f051a] via-[#1a0a2e] to-[#0f051a] flex items-center justify-center relative overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: "rgba(139,92,246,0.3)" }}
          animate={{ opacity: [0.2,0.5,0.2] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.05,1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">🥺</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">I'm Sorry</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} has something to say to you, {recipient.name}.</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-lg shadow-lg shadow-purple-500/25">Listen 💜</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "final") return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f051a] via-[#1a102e] to-[#0f051a] flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mb-8">
          <AnimatePresence>
            {!healed ? (
              <motion.div key="broken" initial={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} className="text-7xl">💔</motion.div>
            ) : (
              <motion.div key="healed" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 1 }}
                className="text-7xl">❤️‍🩹</motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-white mb-4">{content.finalMessage || "I'm sorry, from the bottom of my heart."}</motion.h2>
        <p className="text-white/40 mt-8">— {sender.name}</p>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#0f051a":"#1a0a2e"} 0%, #050510 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">From {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🌧️":stage===2?"😔":stage===3?"😞":stage===4?"🤔":stage===5?"📸":stage===6?"💌":stage===7?"🤝":"💜"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
