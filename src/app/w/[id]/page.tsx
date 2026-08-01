"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ProposalExperience } from "@/components/wish/experiences/proposal";
import { BirthdayExperience } from "@/components/wish/experiences/birthday";
import { LoveLetterExperience } from "@/components/wish/experiences/love-letter";
import { GirlfriendExperience } from "@/components/wish/experiences/girlfriend";
import { BoyfriendExperience } from "@/components/wish/experiences/boyfriend";
import { LongDistanceExperience } from "@/components/wish/experiences/long-distance";
import { AnniversaryExperience } from "@/components/wish/experiences/anniversary";
import { LoveConfessionExperience } from "@/components/wish/experiences/love-confession";
import { MissYouExperience } from "@/components/wish/experiences/miss-you";
import { SorryExperience } from "@/components/wish/experiences/sorry";
import { CongratulationsExperience } from "@/components/wish/experiences/congratulations";
import { BestFriendExperience } from "@/components/wish/experiences/best-friend";
import { CountdownExperience } from "@/components/wish/experiences/countdown";
import { GoodMorningExperience } from "@/components/wish/experiences/good-morning";
import { GoodNightExperience } from "@/components/wish/experiences/good-night";

const experienceMap: Record<string, React.ComponentType<any>> = {
  proposal: ProposalExperience,
  "birthday-surprise": BirthdayExperience,
  "love-letter": LoveLetterExperience,
  "girlfriend-special": GirlfriendExperience,
  "boyfriend-special": BoyfriendExperience,
  "long-distance-love": LongDistanceExperience,
  anniversary: AnniversaryExperience,
  "love-confession": LoveConfessionExperience,
  "miss-you": MissYouExperience,
  sorry: SorryExperience,
  congratulations: CongratulationsExperience,
  "best-friend-special": BestFriendExperience,
  "countdown-until-we-meet": CountdownExperience,
  "good-morning": GoodMorningExperience,
  "good-night": GoodNightExperience,
};

export default function WishPage() {
  const params = useParams();
  const wishId = params.id as string;
  const [wish, setWish] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const snap = await getDoc(doc(db, "wishes", wishId));
        if (snap.exists()) setWish(snap.data());
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    fetchWish();
  }, [wishId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Wish Not Found</h1>
          <p className="text-white/50">This wish may have been removed or expired.</p>
        </div>
      </div>
    );
  }

  const ExperienceComponent = experienceMap[wish.templateId];

  if (!ExperienceComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Experience Coming Soon</h1>
          <p className="text-white/50">This wish template is being crafted with love.</p>
        </div>
      </div>
    );
  }

  return <ExperienceComponent data={wish} />;
}
