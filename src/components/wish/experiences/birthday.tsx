"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: any; }

export function BirthdayExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [candlesLit, setCandlesLit] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [confettiModule, setConfettiModule] = useState<any>(null);
  const { recipient, sender, content } = data;

  // Dynamic import for canvas-confetti (SSR safe)
  useEffect(() => {
    import("canvas-confetti").then((mod) => setConfettiModule(mod));
  }, []);

  const stages = [
    { id: "start", title: "A Birthday Surprise" },
    { id: "greeting", text: content?.greetingText || `Happy Birthday, ${recipient?.name || "Friend"}!` },
    { id: "memories", text: content?.memoriesText || "Every moment with you is a gift." },
    { id: "amazing", text: content?.amazingText || "You are absolutely amazing." },
    { id: "letter", text: content?.letterText || "Wishing you the happiest birthday!" },
    { id: "cake", text: content?.wishText || "Make A Wish ✨" },
    { id: "celebration", text: content?.finalMessage || "May all your dreams come true!" },
  ];

  const nextStage = () => { if (stage < stages.length - 1) setStage((s) => s + 1); };

  const lightCandles = () => {
    setCandlesLit(true);
    setTimeout(() => setWishMade(true), 2000);
  };

  const triggerConfetti = () => {
    if (!confettiModule || typeof window === "undefined") return;
    const confetti = confettiModule.default || confettiModule;
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#fb923c", "#fbbf24", "#f472b6", "#60a5fa"];
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  useEffect(() => { if (wishMade) triggerConfetti(); }, [wishMade]);

  if (stage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0a05] via-[#2d1505] to-[#1a0a05] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-6">
          <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-6">🎁</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">A Birthday Surprise</h1>
          <p className="text-white/60 text-lg mb-8">{sender?.name || "Someone"} has a special birthday message for you, {recipient?.name || "Friend"}!</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-lg">Open Gift 🎀</motion.button>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "cake") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0502] to-[#1a0a05] flex items-center justify-center">
        <div className="text-center px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1 }} className="relative mb-12">
            <div className="text-8xl sm:text-9xl mb-8">🎂</div>
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
                  <div className="w-2 h-8 bg-yellow-100 rounded-sm mx-auto mb-1" />
                  <AnimatePresence>
                    {candlesLit && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-2xl">🔥</motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            {!candlesLit ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={lightCandles}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold text-lg">Light Candles 🕯️</motion.button>
            ) : !wishMade ? (
              <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-white/60">Make a wish...</motion.p>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className="text-3xl font-bold text-white mb-4">{content?.wishText || "Make A Wish ✨"}</h2>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg">Continue 🎉</motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  if (stages[stage].id === "celebration") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0a05] via-[#2d1520] to-[#1a0a05] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center px-6 z-10">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-7xl mb-6">🎉</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Happy Birthday!</h1>
          <p className="text-xl text-white/80 max-w-md mx-auto whitespace-pre-line">{content?.finalMessage || "May all your dreams come true!"}</p>
          <p className="mt-8 text-white/40">With love, {sender?.name || "Someone"}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: `linear-gradient(180deg, ${stage % 2 === 0 ? "#1a0a05" : "#2d1505"} 0%, #0f0502 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">Birthday Letter from {sender?.name || "Someone"}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage === 1 ? "🎈" : stage === 2 ? "📸" : stage === 3 ? "✨" : "💝"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
