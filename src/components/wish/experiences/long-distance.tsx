"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props { data: any; }

export function LongDistanceExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [connected, setConnected] = useState(false);
  const { recipient, sender, content } = data;

  const stages = [
    { id: "start", title: "Across The Distance" },
    { id: "names", text: `${sender.name} ❤️ ${recipient.name}` },
    { id: "locations", text: content.locationsText || "Miles apart, but close at heart." },
    { id: "connection", text: "A connection that distance cannot break." },
    { id: "counter", text: content.counterText || "Every day apart makes our reunion sweeter." },
    { id: "memories", text: content.memoriesText || "I hold onto every memory we've made." },
    { id: "miss", text: content.missText || "I miss your voice, your laugh, your presence." },
    { id: "letter", text: content.letterText || "Distance means so little when someone means so much." },
    { id: "countdown", text: content.countdownText || "Counting down the days until I see you again." },
    { id: "plans", text: content.plansText || "I can't wait to hold you again." },
    { id: "connect", text: content.finalMessage || "We are always connected." },
  ];

  const nextStage = () => {
    if (stage < stages.length - 1) {
      setStage(s => s + 1);
      if (stages[stage + 1].id === "connect") setTimeout(() => setConnected(true), 1000);
    }
  };

  if (stage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0520] via-[#1a0a2e] to-[#0f0520] flex items-center justify-center relative overflow-hidden">
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
            animate={{ opacity: [0.2,1,0.2] }}
            transition={{ duration: 2+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">💞</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Across The Distance</h1>
          <p className="text-white/60 text-lg mb-8">{sender.name} is sending love across the miles to you, {recipient.name}.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/25">Feel The Connection 💫</motion.button>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "connect") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0520] via-[#1a0a30] to-[#0f0520] flex items-center justify-center relative overflow-hidden">
        {/* Two distant lights */}
        <motion.div className="absolute left-[20%] top-1/2 -translate-y-1/2"
          animate={connected ? { x: 150 } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}>
          <motion.div animate={{ scale: [1,1.3,1], opacity: [0.5,1,0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl">💜</motion.div>
        </motion.div>
        <motion.div className="absolute right-[20%] top-1/2 -translate-y-1/2"
          animate={connected ? { x: -150 } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}>
          <motion.div animate={{ scale: [1,1.3,1], opacity: [0.5,1,0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="text-5xl">💜</motion.div>
        </motion.div>

        {/* Connection line */}
        {connected && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 px-6 mt-32">
          <motion.div animate={{ scale: [1,1.2,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">
            {connected ? "💞" : "💫"}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">{content.finalMessage || "We are always connected."}</h2>
          <p className="text-white/50">No distance is too far for us, {recipient.name}.</p>
          <p className="text-white/30 mt-8">— {sender.name}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#0f0520":"#1a0a2e"} 0%, #050514 100%)` }}
      onClick={nextStage}>
      {[...Array(15)].map((_,i) => (
        <motion.div key={i} className="absolute w-px h-px rounded-full bg-purple-400/30"
          style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
          animate={{ opacity: [0.2,0.5,0.2] }}
          transition={{ duration: 3+Math.random()*2, repeat: Infinity }} />
      ))}
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">A letter from {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🗺️":stage===2?"📍":stage===3?"✨":stage===4?"⏳":stage===5?"📸":stage===6?"😢":stage===7?"💌":stage===8?"📅":"🤗"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
