"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: any; }

export function ProposalExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [ringOpen, setRingOpen] = useState(false);
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);
  const { recipient, sender, content } = data;

  const stages = [
    { id: "start", title: "A Special Moment" },
    { id: "opening", text: content?.openingText || "There's something I've wanted to tell you..." },
    { id: "feelings", text: content?.feelingsText || "You became someone very special to me." },
    { id: "memories", text: content?.memoriesText || "Every moment with you is precious." },
    { id: "reasons", text: content?.reasonsText || "You make my world complete." },
    { id: "letter", text: content?.letterText || "I love you more than words can say." },
    { id: "future", text: content?.futureText || "I can't wait to spend forever with you." },
    { id: "buildup", text: "There's one more thing..." },
    { id: "ring", text: content?.finalQuestion || "Will You Be Mine? ❤️" },
    { id: "celebration", text: content?.finalMessage || "You made me the happiest person alive." },
  ];

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 5, duration: 5 + Math.random() * 5,
    }));
    setPetals(newPetals);
  }, []);

  const nextStage = useCallback(() => {
    if (stage < stages.length - 1) {
      if (stages[stage + 1].id === "ring") setTimeout(() => setRingOpen(true), 1500);
      setStage((s) => s + 1);
    }
  }, [stage, stages.length]);

  const handleAnswer = (answer: "yes" | "no") => {
    setAnswered(answer);
    if (answer === "yes") setTimeout(() => nextStage(), 1000);
  };

  if (stage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0505] via-[#2d0a0a] to-[#1a0505] flex items-center justify-center relative overflow-hidden">
        {petals.map((petal) => (
          <motion.div key={petal.id} className="absolute w-3 h-3 rounded-full opacity-60"
            style={{ left: `${petal.left}%`, background: "linear-gradient(135deg, #dc2626, #991b1b)", top: -20 }}
            animate={{ y: ["0vh", "110vh"], x: [0, Math.sin(petal.id) * 50], rotate: [0, 360] }}
            transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" }} />
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">💍</motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">A Special Moment</h1>
          <p className="text-white/60 text-lg mb-8">{sender?.name || "Someone"} has prepared something beautiful for you, {recipient?.name || "Love"}</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold text-lg shadow-lg shadow-pink-500/25">Begin Experience ✨</motion.button>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "ring") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0202] via-[#1a0505] to-[#0f0202] flex items-center justify-center relative overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-yellow-400"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
        ))}
        <div className="text-center z-10 px-6">
          <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 1.5 }} className="relative mb-12 mx-auto">
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto relative">
              <motion.div className="absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(145deg, #1a1a2e, #0f0f1a)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }} />
              <motion.div initial={{ rotateX: 0 }} animate={ringOpen ? { rotateX: -110 } : { rotateX: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ transformOrigin: "top", transformStyle: "preserve-3d" }} className="absolute inset-0 rounded-3xl">
                <div className="w-full h-full rounded-3xl" style={{ background: "linear-gradient(145deg, #2a2a4e, #1a1a2e)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }} />
              </motion.div>
              <AnimatePresence>
                {ringOpen && (
                  <motion.div initial={{ y: 20, opacity: 0, scale: 0.5 }} animate={{ y: -40, opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1, type: "spring" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                      <div className="text-7xl sm:text-8xl filter drop-shadow-lg">💍</div>
                      <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)" }} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {ringOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 rounded-3xl"
                    style={{ boxShadow: "0 0 60px 20px rgba(251,191,36,0.2), inset 0 0 40px rgba(251,191,36,0.1)" }} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <AnimatePresence>
            {ringOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">{content?.finalQuestion || "Will You Be Mine? ❤️"}</h2>
                {!answered ? (
                  <div className="flex gap-4 justify-center">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer("yes")}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold text-lg shadow-lg shadow-pink-500/25">Yes! ❤️</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer("no")}
                      className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg">I Need Time</motion.button>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl font-bold text-pink-400">
                    {answered === "yes" ? "You said YES! 🎉" : "Take all the time you need 💙"}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {!ringOpen && <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/40 text-sm">Tap to open...</motion.p>}
        </div>
        {!ringOpen && <div className="absolute inset-0 cursor-pointer" onClick={() => setRingOpen(true)} />}
      </div>
    );
  }

  if (stages[stage].id === "celebration") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0505] via-[#2d0a1a] to-[#1a0505] flex items-center justify-center relative overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div key={i} className="absolute text-2xl" style={{ left: `${Math.random() * 100}%`, top: -50 }}
            animate={{ y: [0, 1000], x: [0, Math.sin(i) * 100], rotate: [0, 720] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}>
            {["🎉", "💖", "✨", "🌹", "💍"][i % 5]}
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }} className="text-7xl mb-6">🎉</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Celebration!</h1>
          <p className="text-xl text-white/80 max-w-md mx-auto whitespace-pre-line">{content?.finalMessage || "You made me the happiest person alive."}</p>
          <div className="mt-8 text-white/40 text-sm">From {sender?.name || "Someone"} with ❤️</div>
        </motion.div>
      </div>
    );
  }

  const currentStage = stages[stage];
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
      style={{ background: `linear-gradient(180deg, ${stage % 2 === 0 ? "#1a0505" : "#2d0a0a"} 0%, #0f0202 100%)` }} onClick={nextStage}>
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
      ))}
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8 }} className="max-w-2xl text-center z-10">
        {currentStage.id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} transition={{ duration: 1 }} className="glass rounded-2xl p-8 sm:p-12 text-left mb-8" style={{ transformStyle: "preserve-3d" }}>
            <div className="text-sm text-white/40 mb-4">A letter from {sender?.name || "Someone"}</div>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed whitespace-pre-line">{currentStage.text}</p>
            <div className="mt-6 text-right text-white/40">— {sender?.name || "Someone"}</div>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="text-4xl mb-6">
              {stage === 1 ? "🌹" : stage === 2 ? "💖" : stage === 3 ? "📸" : stage === 4 ? "✨" : stage === 5 ? "💌" : stage === 6 ? "🔮" : "💫"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{currentStage.text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
