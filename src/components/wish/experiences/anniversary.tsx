"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props { data: any; }

export function AnniversaryExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);
  const { recipient, sender, content } = data;

  const stages = [
    { id: "start", title: "Happy Anniversary" },
    { id: "opening", text: content.openingText || `Happy Anniversary, ${recipient.name}!` },
    { id: "together", text: content.togetherText || "Another year of loving you." },
    { id: "started", text: content.startedText || "Look how far we've come together." },
    { id: "timeline", text: content.timelineText || "Our journey has been incredible." },
    { id: "memories", text: content.memoriesText || "So many beautiful memories." },
    { id: "milestones", text: content.milestonesText || "Every milestone with you is special." },
    { id: "thenNow", text: content.thenNowText || "Then and now, my love for you only grows." },
    { id: "letter", text: content.letterText || "You are my forever." },
    { id: "stillLove", text: content.stillLoveText || "I fall in love with you more every day." },
    { id: "future", text: content.futureText || "Here's to many more years together." },
    { id: "book", text: content.finalMessage || "Our love story is my favorite." },
  ];

  const nextStage = () => {
    if (stage < stages.length - 1) {
      setStage(s => s + 1);
      if (stages[stage + 1].id === "book") setTimeout(() => setBookOpen(true), 1000);
    }
  };

  if (stage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1005] via-[#2d1a05] to-[#1a1005] flex items-center justify-center relative overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 rounded-full"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: "rgba(251,191,36,0.3)" }}
            animate={{ opacity: [0.2,0.6,0.2], scale: [1,1.5,1] }}
            transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
          <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">❤️</motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Happy Anniversary</h1>
          <p className="text-white/60 text-lg mb-8">{sender.name} is celebrating your love, {recipient.name}.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-lg shadow-lg shadow-amber-500/25">Celebrate 🥂</motion.button>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "book") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1005] via-[#2d1a10] to-[#1a1005] flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="relative mb-12">
            <motion.div animate={bookOpen ? { rotateY: [0,-20,0] } : {}} transition={{ duration: 1.5 }}
              className="text-8xl inline-block">{bookOpen ? "📖" : "📕"}</motion.div>
            {bookOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mt-8 glass rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-3xl mb-4">💝</div>
                <p className="text-xl text-white/90">{content.finalMessage || "Our love story is my favorite."}</p>
                <p className="text-white/40 mt-4">— {sender.name}</p>
              </motion.div>
            )}
          </motion.div>
          {!bookOpen && <p className="text-white/40 text-sm">Tap to open the memory book</p>}
        </div>
        {!bookOpen && <div className="absolute inset-0 cursor-pointer" onClick={() => setBookOpen(true)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#1a1005":"#2d1a05"} 0%, #0f0802 100%)` }}
      onClick={nextStage}>
      {[...Array(10)].map((_,i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full"
          style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: "rgba(251,191,36,0.2)" }}
          animate={{ opacity: [0.2,0.5,0.2] }}
          transition={{ duration: 3+Math.random()*2, repeat: Infinity }} />
      ))}
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        {stages[stage].id === "letter" ? (
          <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }} className="glass rounded-2xl p-8 sm:p-12 text-left">
            <div className="text-sm text-white/40 mb-4">Anniversary Letter from {sender.name}</div>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{stages[stage].text}</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
              {stage===1?"🥂":stage===2?"⏳":stage===3?"💫":stage===4?"📍":stage===5?"📸":stage===6?"🏆":stage===7?"👫":stage===8?"💌":stage===9?"💖":"🔮"}
            </motion.div>
            <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
          </>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
