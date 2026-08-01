"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props { data: any; }
export function LoveConfessionExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [piecesJoined, setPiecesJoined] = useState(false);
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "Can I Tell You Something?" },
    { id: "question", text: content.questionText || "Can I tell you something?" },
    { id: "message", text: content.messageText || "I've been wanting to say this for a while..." },
    { id: "clues", text: content.cluesText || "You might have noticed some clues..." },
    { id: "like", text: content.likeText || "There are so many things I like about you." },
    { id: "memories", text: content.memoriesText || "Every moment with you feels special." },
    { id: "hidden", text: content.hiddenText || "I've been hiding my feelings..." },
    { id: "buildup", text: content.buildupText || "But I can't hide them anymore." },
    { id: "pieces", text: "pieces" },
    { id: "confession", text: content.confessionText || "I LOVE YOU" },
    { id: "final", text: content.finalMessage || "You mean everything to me." },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "pieces") setTimeout(() => setPiecesJoined(true), 1000); } };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0510] via-[#2d0a15] to-[#1a0510] flex items-center justify-center relative overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: "rgba(236,72,153,0.3)" }}
          animate={{ opacity: [0.2,0.5,0.2] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">💕</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Can I Tell You Something?</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} has something important to tell you, {recipient.name}.</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-lg shadow-lg shadow-pink-500/25">I'm Listening 💗</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "pieces") return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0510] via-[#2d0a20] to-[#1a0510] flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <div className="relative h-32 w-64 mx-auto mb-8">
          {["I", "❤️", "Y", "O", "U"].map((piece, i) => (
            <motion.div key={i} initial={{ x: (i - 2) * 100, opacity: 0, rotate: Math.random() * 30 - 15 }}
              animate={piecesJoined ? { x: 0, opacity: 1, rotate: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold"
              style={{ color: piecesJoined ? "#ec4899" : "rgba(255,255,255,0.3)" }}>
              {piece}
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {piecesJoined && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
              <h2 className="text-4xl font-bold text-pink-400 mb-4">{content.confessionText || "I LOVE YOU"}</h2>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-lg">Continue 💖</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        {!piecesJoined && <p className="text-white/40 text-sm">The pieces are coming together...</p>}
      </div>
    </div>
  );
  if (stages[stage].id === "final") return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0510] via-[#2d0a25] to-[#1a0510] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-6">
        <motion.div animate={{ scale: [1,1.2,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-6">💖</motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">{content.finalMessage || "You mean everything to me."}</h2>
        <p className="text-white/40">— {sender.name}</p>
      </motion.div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#1a0510":"#2d0a15"} 0%, #0f0208 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
          {stage===1?"🤔":stage===2?"💭":stage===3?"🔍":stage===4?"✨":stage===5?"📸":stage===6?"🙈":stage===7?"💓":"💘"}
        </motion.div>
        <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
