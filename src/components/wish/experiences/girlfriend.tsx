"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: any; }

export function GirlfriendExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [heartGlow, setHeartGlow] = useState(false);
  const { recipient, sender, content } = data;

  const stages = [
    { id: "start", title: "For My Special Girl" },
    { id: "greeting", text: content.greetingText || `Hey ${recipient.name || "beautiful"},` },
    { id: "counter", text: content.counterText || "Every second with you is a blessing." },
    { id: "memories", text: content.memoriesText || "I cherish every moment we spend together." },
    { id: "reasons", text: content.reasonsText || "Your smile lights up my entire world." },
    { id: "littleThings", text: content.littleThingsText || "The way you laugh, the way you care... everything about you is perfect." },
    { id: "letter", text: content.letterText || "You are the best thing that ever happened to me." },
    { id: "promises", text: content.promisesText || "I promise to always stand by you." },
    { id: "future", text: content.futureText || "I can't wait to make more memories with you." },
    { id: "heart", text: content.finalMessage || `You are my everything, ${recipient.name}.` },
  ];

  const nextStage = () => {
    if (stage < stages.length - 1) {
      setStage(s => s + 1);
      if (stages[stage + 1].id === "heart") setHeartGlow(true);
    }
  };

  if (stage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0510] via-[#2d0a1a] to-[#1a0510] flex items-center justify-center relative overflow-hidden">
        {/* Floating hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.div key={i} className="absolute text-xl opacity-30"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
            animate={{ y: [0,-30,0], opacity: [0.2,0.5,0.2] }}
            transition={{ duration: 3+Math.random()*3, repeat: Infinity, delay: Math.random()*2 }}>💖</motion.div>
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ scale: [1,1.2,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">🌹</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">For My Special Girl</h1>
          <p className="text-white/60 text-lg mb-8">{sender.name} has something beautiful for you, {recipient.name}!</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-lg shadow-pink-500/25">Open Your Surprise 💖</motion.button>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "heart") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0510] via-[#2d0a20] to-[#1a0510] flex items-center justify-center relative overflow-hidden">
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ scale: [1,1.3,1], opacity: [0.3,0.6,0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)" }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-8xl mb-8">💖</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4">{content.finalMessage || `You are my everything, ${recipient.name}.`}</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white/50 mt-8">Forever yours, {sender.name}</motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#1a0510":"#2d0a1a"} 0%, #0f020a 100%)` }}
      onClick={nextStage}>
      {[...Array(8)].map((_,i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-pink-400/30"
          style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ opacity: [0.2,0.5,0.2] }}
          transition={{ duration: 3+Math.random()*2, repeat: Infinity }} />
      ))}
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">A letter from {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
            <div className="mt-6 text-right text-white/40">— {sender.name}</div>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"💝":stage===2?"⏰":stage===3?"📸":stage===4?"✨":stage===5?"🥰":stage===6?"💌":stage===7?"🤝":"🔮"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
