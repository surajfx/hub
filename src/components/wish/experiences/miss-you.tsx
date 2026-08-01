"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props { data: any; }
export function MissYouExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [hugged, setHugged] = useState(false);
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "I Miss You" },
    { id: "quiet", text: content.openingText || `Hey ${recipient.name}...` },
    { id: "message", text: content.messageText || "I miss you more than words can say." },
    { id: "time", text: content.timeText || "Every moment without you feels incomplete." },
    { id: "memories", text: content.memoriesText || "I keep replaying our memories in my mind." },
    { id: "missThings", text: content.missThingsText || "I miss your smile, your voice, your presence." },
    { id: "photos", text: content.photosText || "Looking at your photos is the closest I can get to you right now." },
    { id: "notes", text: content.notesText || "I've written you a thousand unsent messages." },
    { id: "letter", text: content.letterText || "Come back to me soon." },
    { id: "hug", text: content.finalMessage || "Sending you a virtual hug." },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "hug") setTimeout(() => setHugged(true), 500); } };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#151e2e] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute w-px h-8 bg-blue-400/10" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ y: [0,20,0], opacity: [0.1,0.3,0.1] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">☁️</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">I Miss You</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} is thinking of you, {recipient.name}.</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-500 to-blue-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/25">Open 💙</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "hug") return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#1a2030] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 px-6">
        <AnimatePresence>
          {hugged && (
            <motion.div initial={{ scale: 0, x: -100 }} animate={{ scale: 1, x: 0 }} transition={{ type: "spring", duration: 1.5 }}
              className="text-7xl mb-4 inline-block">🤗</motion.div>
          )}
        </AnimatePresence>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-white mb-4">{content.finalMessage || "Sending you a virtual hug."}</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white/50">Until I can hold you for real, {recipient.name}.</motion.p>
        <p className="text-white/30 mt-8">— {sender.name}</p>
      </motion.div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#0a0f1a":"#151e2e"} 0%, #050814 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">From {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🌧️":stage===2?"💭":stage===3?"⏳":stage===4?"📸":stage===5?"😢":stage===6?"🖼️":stage===7?"📝":"💌"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
