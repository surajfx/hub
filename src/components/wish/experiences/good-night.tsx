"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props { data: any; }
export function GoodNightExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [starsConnected, setStarsConnected] = useState(false);
  const [stars, setStars] = useState(Array.from({ length: 12 }, (_, i) => ({ id: i, lit: false, x: 20 + (i % 4) * 20, y: 20 + Math.floor(i / 4) * 25 })));
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "Good Night" },
    { id: "sunset", text: "The sun is setting..." },
    { id: "night", text: "The stars are coming out..." },
    { id: "name", text: `Good Night, ${recipient.name}` },
    { id: "before", text: content.beforeText || "Before you sleep..." },
    { id: "note", text: content.noteText || "I hope you had a wonderful day." },
    { id: "photo", text: content.photoText || "Sweet dreams." },
    { id: "calm", text: content.calmText || "Take a deep breath and relax." },
    { id: "stars", text: content.finalMessage || "Sleep tight, my love." },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "stars") setTimeout(() => setStarsConnected(true), 500); } };
  const lightStar = (id: number) => {
    setStars(prev => prev.map(s => s.id === id ? { ...s, lit: true } : s));
  };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#050a1a] via-[#0a102e] to-[#050a1a] flex items-center justify-center relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*60}%` }}
          animate={{ opacity: [0.2,1,0.2] }} transition={{ duration: 2+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">🌙</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Good Night</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} is sending you sweet dreams, {recipient.name}.</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25">Good Night 🌟</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "stars") return (
    <div className="min-h-screen bg-gradient-to-b from-[#050a1a] via-[#0a1530] to-[#050a1a] flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <div className="relative w-64 h-48 mx-auto mb-8">
          {stars.map((star) => (
            <motion.button key={star.id} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
              onClick={() => lightStar(star.id)}
              className="absolute text-2xl transition-all duration-500"
              style={{ left: `${star.x}%`, top: `${star.y}%`, opacity: star.lit ? 1 : 0.3, filter: star.lit ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" : "none" }}>
              ⭐
            </motion.button>
          ))}
          {/* Constellation lines */}
          {starsConnected && stars.every(s => s.lit) && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path d="M 51 38 L 102 38 L 153 38 M 51 96 L 102 96 L 153 96 M 51 38 L 51 96 M 102 38 L 102 96 M 153 38 L 153 96" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
            </svg>
          )}
        </div>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-white mb-4">
          {stars.every(s => s.lit) ? content.finalMessage || "Sleep tight, my love." : "Light up the stars ✨"}
        </motion.h2>
        {stars.every(s => s.lit) && <p className="text-white/40">— {sender.name}</p>}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#050a1a":"#0a102e"} 0%, #020510 100%)` }} onClick={nextStage}>
      {[...Array(15)].map((_,i) => (
        <motion.div key={i} className="absolute w-px h-px rounded-full bg-white/30" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ opacity: [0.2,0.6,0.2] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity }} />
      ))}
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
          {stage===1?"🌅":stage===2?"🌃":stage===3?"🌙":stage===4?"💭":stage===5?"😊":stage===6?"🖼️":stage===7?"😌":"🌟"}
        </motion.div>
        <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
