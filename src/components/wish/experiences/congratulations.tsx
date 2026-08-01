"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props { data: any; }
export function CongratulationsExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [boxOpen, setBoxOpen] = useState(false);
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "Congratulations!" },
    { id: "reveal", text: content.achievementText || `${recipient.name}, you did it!` },
    { id: "journey", text: content.journeyText || "Look how far you've come." },
    { id: "memories", text: content.memoriesText || "Your journey has been incredible to witness." },
    { id: "proud", text: content.proudText || "I am so proud of you." },
    { id: "badge", text: content.badgeText || "You deserve every bit of this success." },
    { id: "letter", text: content.letterText || "Your hard work has paid off." },
    { id: "box", text: content.finalMessage || "You are incredible!" },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "box") setTimeout(() => setBoxOpen(true), 1000); } };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#1a1520] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: "rgba(251,191,36,0.4)" }}
          animate={{ opacity: [0.2,0.7,0.2], y: [0,-15,0] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ rotate: [0,10,-10,0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">🎓</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Congratulations!</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} is celebrating your achievement, {recipient.name}!</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-lg shadow-lg shadow-amber-500/25">Celebrate 🏆</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "box") return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#1a2020] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="relative mb-12">
          <motion.div animate={boxOpen ? { rotateX: -110 } : {}} transition={{ duration: 1.5 }} className="text-8xl inline-block">
            {boxOpen ? "🎁" : "🎀"}
          </motion.div>
          <AnimatePresence>
            {boxOpen && (
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.5 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                className="mt-8 glass rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-5xl mb-4">🏆</div>
                <p className="text-xl text-white/90">{content.finalMessage || "You are incredible!"}</p>
                <p className="text-white/40 mt-4">— {sender.name}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {!boxOpen && <p className="text-white/40 text-sm">Tap to open your achievement</p>}
      </div>
      {!boxOpen && <div className="absolute inset-0 cursor-pointer" onClick={() => setBoxOpen(true)} />}
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#0a0f1a":"#1a1520"} 0%, #05080f 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">From {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🎉":stage===2?"🛤️":stage===3?"📸":stage===4?"🌟":stage===5?"🏅":stage===6?"💌":"🎁"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
