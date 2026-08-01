"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
interface Props { data: any; }
export function CountdownExperience({ data }: Props) {
  const [stage, setStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);
  const { recipient, sender, content } = data;

  useEffect(() => {
    const meetingDate = content.meetingDate ? new Date(content.meetingDate) : new Date(Date.now() + 86400000 * 5);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = meetingDate.getTime() - now.getTime();
      if (diff <= 0) { setIsToday(true); clearInterval(interval); }
      else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [content.meetingDate]);

  const stages = [
    { id: "start", title: "Counting Down" },
    { id: "names", text: `${sender.name} ❤️ ${recipient.name}` },
    { id: "locations", text: content.locationsText || "Distance can't keep us apart for long." },
    { id: "date", text: content.dateText || "The big day is coming!" },
    { id: "countdown", text: "countdown" },
    { id: "until", text: content.untilText || "Until then, I'm holding on to our memories." },
    { id: "memories", text: content.memoriesText || "Every moment apart makes our reunion sweeter." },
    { id: "plans", text: content.plansText || "I have so many plans for when we meet!" },
    { id: "note", text: content.noteText || "See you soon, my love." },
    { id: "soon", text: content.finalMessage || "Can't wait to see you!" },
  ];

  const nextStage = () => { if (stage < stages.length - 1) setStage(s => s + 1); };

  if (stage === 0) return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a10] via-[#0a2e1a] to-[#051a10] flex items-center justify-center relative overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, background: "rgba(52,211,153,0.3)" }}
          animate={{ opacity: [0.2,0.6,0.2] }} transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: Math.random()*2 }} />
      ))}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
        <motion.div animate={{ scale: [1,1.1,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">📅</motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Counting Down</h1>
        <p className="text-white/60 text-lg mb-8">{sender.name} is counting the moments until you meet, {recipient.name}!</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStage}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg shadow-lg shadow-emerald-500/25">Start Countdown ⏳</motion.button>
      </motion.div>
    </div>
  );

  if (stages[stage].id === "countdown") {
    if (isToday) return (
      <div className="min-h-screen bg-gradient-to-b from-[#051a10] via-[#0a3e20] to-[#051a10] flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-center px-6">
          <motion.div animate={{ scale: [1,1.2,1] }} transition={{ duration: 1, repeat: Infinity }} className="text-8xl mb-6">🎉</motion.div>
          <h1 className="text-5xl font-bold text-white mb-4">TODAY'S THE DAY!</h1>
          <p className="text-xl text-white/80">{content.finalMessage || "Can't wait to see you!"}</p>
          <p className="text-white/40 mt-8">— {sender.name}</p>
        </motion.div>
      </div>
    );
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#051a10] via-[#0a2e1a] to-[#051a10] flex items-center justify-center px-6" onClick={nextStage}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
          <h2 className="text-2xl text-white/60 mb-8">Time Until We Meet</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl font-bold text-white">{String(item.value).padStart(2, "0")}</div>
                <div className="text-sm text-white/50 mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/30 text-sm">Tap anywhere to continue</p>
        </motion.div>
      </div>
    );
  }

  if (stages[stage].id === "soon") return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a10] via-[#0a3e20] to-[#051a10] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-6">
        <motion.div animate={{ scale: [1,1.2,1] }} transition={{ duration: 2, repeat: Infinity }} className="text-7xl mb-6">🤗</motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">{content.finalMessage || "Can't wait to see you!"}</h2>
        <p className="text-white/50">See you soon, {recipient.name}!</p>
        <p className="text-white/30 mt-8">— {sender.name}</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stage%2===0?"#051a10":"#0a2e1a"} 0%, #020f05 100%)` }} onClick={nextStage}>
      <motion.div key={stage} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl mb-6">
          {stage===1?"🗺️":stage===2?"📍":stage===3?"📅":stage===4?"⏳":stage===5?"💭":stage===6?"📸":stage===7?"📝":"💌"}
        </motion.div>
        <p className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed">{stages[stage].text}</p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-white/30 text-sm">Tap anywhere to continue</motion.p>
      </motion.div>
    </div>
  );
}
