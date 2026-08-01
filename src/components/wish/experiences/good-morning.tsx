"use client";
import { useState } from "react";
import { motion } from "framer-motion";
interface Props { data: any; }
export function GoodMorningExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [sunRisen, setSunRisen] = useState(false);
  const { recipient, sender, content } = data;
  const stages = [
    { id: "start", title: "Good Morning" },
    { id: "preDawn", text: "The world is waking up..." },
    { id: "sunrise", text: content.sunriseText || "A new day begins." },
    { id: "name", text: `Good Morning, ${recipient.name}!` },
    { id: "greeting", text: content.greetingText || "Rise and shine!" },
    { id: "message", text: content.messageText || "I hope your day is as wonderful as you are." },
    { id: "photo", text: content.photoText || "Thinking of you this morning." },
    { id: "reminder", text: content.reminderText || "Don't forget how amazing you are." },
    { id: "positive", text: content.positiveText || "Today is going to be a great day!" },
    { id: "card", text: content.finalMessage || "Have a beautiful day!" },
  ];
  const nextStage = () => { if (stage < stages.length - 1) { setStage(s => s + 1); if (stages[stage + 1].id === "sunrise") setTimeout(() => setSunRisen(true), 500); } };
  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] via-[#1a2030] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white/20" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*50}%` }}
          animate={{ opacity: [0.2,0.5,0.2] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">🌙</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Good Morning</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} is sending you morning sunshine, {recipient.name}!</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg shadow-lg shadow-amber-500/25">Wake Up ☀️</motion.button>
      </motion.div>
    </div>
  );
  if (stages[stage].id === "sunrise" || (stage > 2 && !sunRisen)) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: sunRisen ? "linear-gradient(180deg, #fbbf24 0%, #f97316 50%, #1a1005 100%)" : "linear-gradient(180deg, #0a0f1a 0%, #1a2030 100%)" }}
        onClick={nextStage}>
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2"
          animate={sunRisen ? { y: -50, scale: 1.5 } : { y: 100, scale: 0.8 }}
          transition={{ duration: 3, ease: "easeInOut" }}>
          <div className="text-8xl">☀️</div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 px-6 mt-32">
          <p className="text-2xl text-white/90">{sunRisen ? "The sun is rising..." : "Dawn is breaking..."}</p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#fbbf24":"#f97316"} 0%, #1a1005 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
          {stage===3?"☀️":stage===4?"🌅":stage===5?"💭":stage===6?"🖼️":stage===7?"💡":stage===8?"✨":"💌"}
        </motion.div>
        <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
