"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props { data: any; }
export function BestFriendExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [capsuleOpen, setCapsuleOpen] = useState(false);
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "Best Friend Forever" },
    { id: "fun", text: content.openingText || `Yo ${recipient.name}!` },
    { id: "met", text: content.metText || "Remember how we met?" },
    { id: "counter", text: content.counterText || "So many years of friendship!" },
    { id: "photos", text: content.photosText || "We've made some epic memories." },
    { id: "jokes", text: content.jokesText || "No one else gets our jokes." },
    { id: "understand", text: content.understandText || "We have our own language." },
    { id: "memories", text: content.memoriesText || "Best times of my life were with you." },
    { id: "why", text: content.whyText || "You're my person, always." },
    { id: "letter", text: content.letterText || "Thanks for being my best friend." },
    { id: "promise", text: content.promiseText || "Friends forever, no matter what." },
    { id: "capsule", text: content.finalMessage || "You're the best friend anyone could ask for." },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "capsule") setTimeout(() => setCapsuleOpen(true), 1000); } };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a1a] via-[#0a2e2e] to-[#051a1a] flex items-center justify-center relative overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute text-lg opacity-20" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ y: [0,-20,0], rotate: [0,360] }} transition={{ duration: 5+Math.random()*3, repeat: Infinity, delay: Math.random()*2 }}>⭐</motion.div>
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.15,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">👑</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Best Friend Forever</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} has something for you, {recipient.name}!</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25">Let's Go 🎉</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "capsule") return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a1a] via-[#0a2e30] to-[#051a1a] flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="relative mb-12">
          <motion.div animate={capsuleOpen ? { rotateY: 180 } : {}} transition={{ duration: 1.5 }} className="text-8xl inline-block">
            {capsuleOpen ? "📂" : "💊"}
          </motion.div>
          <AnimatePresence>
            {capsuleOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                className="mt-8 glass rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">🎞️</div>
                <p className="text-xl text-white/90">{content.finalMessage || "You're the best friend anyone could ask for."}</p>
                <p className="text-white/40 mt-4">— {sender.name}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {!capsuleOpen && <p className="text-white/40 text-sm">Tap to open the memory capsule</p>}
      </div>
      {!capsuleOpen && <div className="absolute inset-0 cursor-pointer" onClick={() => setCapsuleOpen(true)} />}
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#051a1a":"#0a2e2e"} 0%, #020f0f 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">From {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🎉":stage===2?"🤝":stage===3?"⏳":stage===4?"📸":stage===5?"😂":stage===6?"🤫":stage===7?"🌟":stage===8?"💖":stage===9?"💌":"🤝"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
