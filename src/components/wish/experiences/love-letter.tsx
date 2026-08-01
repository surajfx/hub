"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { data: any; }

export function LoveLetterExperience({ data }: Props) {
  const [sealed, setSealed] = useState(true);
  const [opened, setOpened] = useState(false);
  const [showPS, setShowPS] = useState(false);
  const { recipient, sender, content } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0505] via-[#2d1510] to-[#1a0505] flex items-center justify-center px-6 relative overflow-hidden">
      <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.1) 0%, transparent 50%)" }} />
      <AnimatePresence mode="wait">
        {sealed ? (
          <motion.div key="envelope" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-center z-10">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSealed(false)} className="cursor-pointer">
              <div className="relative w-64 h-44 sm:w-80 sm:h-56 mx-auto mb-8">
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(145deg, #8B4513, #654321)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} />
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl" style={{ background: "linear-gradient(180deg, #A0522D, #8B4513)", clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)" }} />
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, #dc2626, #991b1b)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                  <span className="text-2xl">💌</span>
                </motion.div>
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">A Letter For {recipient.name}</h2>
            <p className="text-white/50">Tap the envelope to open</p>
          </motion.div>
        ) : !opened ? (
          <motion.div key="opening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10" onClick={() => setOpened(true)}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 0.5 }} className="text-6xl mb-6">💌</motion.div>
            <p className="text-white/60">Breaking the seal...</p>
          </motion.div>
        ) : (
          <motion.div key="letter" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full z-10">
            <motion.div initial={{ rotateX: -20 }} animate={{ rotateX: 0 }} transition={{ duration: 1 }} className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
              style={{ background: "linear-gradient(180deg, #fef3c7, #fde68a)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")` }} />
              <div className="relative text-[#4a3728]">
                <div className="text-sm mb-6 opacity-60">My Dearest {recipient.name},</div>
                <p className="text-lg leading-relaxed whitespace-pre-line mb-8">{content.mainMessage || "Every day I find new reasons to love you. Your strength inspires me. Your kindness humbles me. Your love completes me."}</p>
                <div className="text-right opacity-60">Forever yours,<br />{sender.name}</div>
              </div>
            </motion.div>
            {!showPS ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 text-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowPS(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-colors">
                  <span className="text-xl">📩</span><span>There's something else...</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 glass rounded-2xl p-6 text-center">
                <div className="text-sm text-white/40 mb-2">P.S.</div>
                <p className="text-white/90 text-lg">{content.finalMessage || "You are my always."}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
