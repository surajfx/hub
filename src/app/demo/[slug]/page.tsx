"use client";

import { useParams } from "next/navigation";
import { getTemplateBySlug } from "@/lib/templates/registry";
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

const demoData: Record<string, any> = {
  proposal: {
    recipient: { name: "Emma", nickname: "My Love" },
    sender: { name: "James" },
    content: {
      openingText: "There's something I've wanted to tell you for a very long time...",
      feelingsText: "From the moment I met you, everything changed. You became someone very special to me.",
      memoriesText: "Remember our first coffee date? You spilled your latte and laughed it off. I knew right then.",
      reasonsText: "I love your kindness, your laugh, the way you make every day brighter just by being in it.",
      letterText: "My dearest Emma,

I've written this letter a hundred times in my head. Every version started the same way — with how much you mean to me.

You are my best friend, my confidant, my favorite person. Life with you is an adventure I never want to end.

I love you more than words can express.",
      futureText: "I dream about our future home, our travels, growing old together. Every plan includes you.",
      finalQuestion: "Will You Marry Me? 💍",
      finalMessage: "Whatever you choose, know that loving you has been the greatest privilege of my life.",
    },
    media: [],
  },
  "girlfriend-special": {
    recipient: { name: "Sophia", nickname: "Babe" },
    sender: { name: "Daniel" },
    content: {
      greetingText: "Hey beautiful,",
      counterText: "Every day with you feels like a gift.",
      memoriesText: "From our first walk in the park to our late-night talks — every memory is precious.",
      reasonsText: "I love your smile, your kindness, your strength, and the way you love me.",
      littleThingsText: "The way you scrunch your nose when you laugh. The way you hold my hand. Everything.",
      letterText: "My love,

You are the most amazing person I know. Thank you for being mine.",
      promisesText: "I promise to always cherish you, support you, and love you unconditionally.",
      futureText: "I can't wait to build a future with you.",
      finalMessage: "You are my everything, Sophia. 💖",
    },
    media: [],
  },
  "boyfriend-special": {
    recipient: { name: "Michael" },
    sender: { name: "Olivia" },
    content: {
      openingText: "Hey handsome,",
      thingsText: "There are so many things I never say enough.",
      memoriesText: "Every adventure with you is my favorite memory.",
      admireText: "I admire your strength, your humor, and your beautiful heart.",
      jokeText: "Remember that terrible joke you told? I laughed for an hour.",
      letterText: "My favorite person,

You make my life better in every way. Thank you for being you.",
      thanksText: "Thank you for loving me, supporting me, and being my rock.",
      futureText: "I look forward to every moment ahead with you.",
      finalMessage: "You are my person, Michael. 🖤",
    },
    media: [],
  },
  "long-distance-love": {
    recipient: { name: "Ava" },
    sender: { name: "Noah" },
    content: {
      locationsText: "New York ❤️ Los Angeles — 2,789 miles apart.",
      counterText: "127 days together, and counting every moment until we meet again.",
      memoriesText: "Our last walk on the beach. Your hand in mine. The sunset we watched together.",
      missText: "I miss your voice, your laugh, your warmth beside me.",
      letterText: "My dearest Ava,

Distance is just a test to see how far love can travel. And my love for you knows no bounds.",
      countdownText: "Only 14 more days until I see you again!",
      plansText: "First thing I'm doing is hugging you and never letting go.",
      finalMessage: "We are always connected, no matter the distance. 💞",
    },
    media: [],
  },
  anniversary: {
    recipient: { name: "Isabella" },
    sender: { name: "William" },
    content: {
      openingText: "Happy Anniversary, my love!",
      togetherText: "3 incredible years together.",
      startedText: "From that awkward first date to this beautiful journey.",
      timelineText: "First date → First trip → Moving in → Today. What a ride!",
      memoriesText: "Our trip to Paris. Cooking disasters. Lazy Sundays. Every moment is gold.",
      milestonesText: "Surviving long distance. Meeting the parents. Our first apartment.",
      thenNowText: "Then: nervous and shy. Now: completely in love.",
      letterText: "My beautiful Isabella,

Three years ago, I found my person. Thank you for choosing me every day.",
      stillLoveText: "I fall more in love with you with every sunrise.",
      futureText: "Here's to forever together. I love you.",
      finalMessage: "Our love story is my favorite. ❤️",
    },
    media: [],
  },
  "love-letter": {
    recipient: { name: "Charlotte" },
    sender: { name: "Benjamin" },
    content: {
      mainMessage: "My dearest Charlotte,

Every day I find new reasons to love you. Your strength inspires me. Your kindness humbles me. Your love completes me.

You are my best friend, my partner, my home. I am endlessly grateful for you.

Forever yours,
Benjamin",
      finalMessage: "P.S. You are my always and my forever. 💌",
    },
    media: [],
  },
  "love-confession": {
    recipient: { name: "Mia" },
    sender: { name: "Lucas" },
    content: {
      questionText: "Can I tell you something?",
      messageText: "I've been wanting to say this for a while...",
      cluesText: "You might have noticed me acting a little different around you.",
      likeText: "I like everything about you. Your laugh, your eyes, your heart.",
      memoriesText: "Every moment with you is my favorite moment.",
      hiddenText: "I've been hiding these feelings, but I can't anymore.",
      buildupText: "My heart races every time I see you.",
      confessionText: "I LOVE YOU",
      finalMessage: "You mean everything to me, Mia. 💕",
    },
    media: [],
  },
  "miss-you": {
    recipient: { name: "Amelia" },
    sender: { name: "Ethan" },
    content: {
      openingText: "Hey Amelia...",
      messageText: "I miss you more than words can say.",
      timeText: "It's been 3 weeks, and every day feels incomplete without you.",
      memoriesText: "I keep replaying our last conversation in my head.",
      missThingsText: "I miss your smile, your voice, your presence in the room.",
      photosText: "I've looked at our photos a hundred times today.",
      notesText: "I've written you so many messages I never sent.",
      letterText: "Come back to me soon. The world is quieter without you.",
      finalMessage: "Sending you the biggest virtual hug. ☁️",
    },
    media: [],
  },
  sorry: {
    recipient: { name: "Harper" },
    sender: { name: "Alexander" },
    content: {
      openingText: "Harper...",
      apologyText: "I'm truly sorry for what I said. It was wrong, and I know it hurt you.",
      regretText: "I regret my words deeply. You didn't deserve that.",
      differentText: "I should have listened instead of reacting. I should have been kinder.",
      memoriesText: "The good times we've shared mean everything to me. I don't want to lose that.",
      letterText: "My dear Harper,

I messed up, and I'm so sorry. You mean the world to me, and I'll do whatever it takes to make this right.",
      betterText: "I promise to be more thoughtful, more patient, and more understanding.",
      finalMessage: "I'm sorry, from the bottom of my heart. 🥺",
    },
    media: [],
  },
  "birthday-surprise": {
    recipient: { name: "Sarah" },
    sender: { name: "Michael" },
    content: {
      greetingText: "Happy Birthday to the most incredible person I know!",
      memoriesText: "From our late-night talks to our spontaneous road trips — every moment with you is golden.",
      amazingText: "You are kind, brilliant, hilarious, and absolutely beautiful inside and out.",
      letterText: "Dear Sarah,

On your special day, I want you to know how deeply you are loved and appreciated.

You light up every room you enter. Never stop being your amazing self.

Happy Birthday! 🎂",
      wishText: "Make A Wish ✨",
      finalMessage: "May this year bring you everything your heart desires.",
    },
    media: [],
  },
  congratulations: {
    recipient: { name: "David" },
    sender: { name: "Emily" },
    content: {
      achievementText: "David, you did it! You graduated!",
      journeyText: "Late nights, early mornings, endless assignments — you conquered them all.",
      memoriesText: "I'll never forget celebrating your small wins along the way.",
      proudText: "I am so incredibly proud of you.",
      badgeText: "You earned every bit of this success.",
      letterText: "David,

Your hard work, dedication, and perseverance have paid off. This is just the beginning of an amazing journey.

Congratulations! 🎓",
      finalMessage: "You are incredible, David! 🏆",
    },
    media: [],
  },
  "best-friend-special": {
    recipient: { name: "Jessica" },
    sender: { name: "Ryan" },
    content: {
      openingText: "Yo Jessica!",
      metText: "Remember when we met in 3rd grade? You shared your lunch with me.",
      counterText: "15 years of friendship and counting!",
      photosText: "We've made some epic memories together.",
      jokesText: "No one else understands why 'pineapple' is so funny.",
      understandText: "We literally have our own language at this point.",
      memoriesText: "Road trips, bad decisions, and the best laughs of my life.",
      whyText: "You're my person. Always have been, always will be.",
      letterText: "Jess,

You're the best friend anyone could ask for. Thanks for putting up with me all these years.",
      promiseText: "Friends forever, no matter what life throws at us.",
      finalMessage: "You're my ride or die, Jessica. 👑",
    },
    media: [],
  },
  "countdown-until-we-meet": {
    recipient: { name: "Lily" },
    sender: { name: "Jack" },
    content: {
      locationsText: "London ❤️ Tokyo",
      dateText: "We're meeting on December 25th!",
      meetingDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      untilText: "Until then, I'm counting every second.",
      memoriesText: "Our video calls, our messages, our virtual movie nights.",
      plansText: "First: hug for 10 minutes straight. Then: explore the city together.",
      noteText: "See you soon, my love.",
      finalMessage: "Can't wait to see you, Lily! 📅",
    },
    media: [],
  },
  "good-morning": {
    recipient: { name: "Zoe" },
    sender: { name: "Max" },
    content: {
      sunriseText: "The sun is rising, and so is my love for you.",
      greetingText: "Rise and shine, beautiful!",
      messageText: "I hope your day is as wonderful as you are.",
      photoText: "Imagine me right there with you, bringing you coffee.",
      reminderText: "Don't forget: you are capable of amazing things.",
      positiveText: "Today is going to be a great day because YOU are in it.",
      finalMessage: "Have a beautiful day, Zoe! ☀️",
    },
    media: [],
  },
  "good-night": {
    recipient: { name: "Chloe" },
    sender: { name: "Leo" },
    content: {
      beforeText: "Before you close your eyes...",
      noteText: "I hope you had a wonderful day.",
      photoText: "I'm thinking of you as the stars come out.",
      calmText: "Take a deep breath. Let go of today's worries.",
      finalMessage: "Sleep tight, my love. Sweet dreams. 🌙",
    },
    media: [],
  },
};

export default function DemoPage() {
  const params = useParams();
  const slug = params.slug as string;
  const template = getTemplateBySlug(slug);

  if (!template) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Template not found</div>;

  const ExperienceComponent = experienceMap[slug];
  const data = demoData[slug];

  if (!ExperienceComponent || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Demo Coming Soon</h1>
          <p className="text-white/50">This experience is being polished with love.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed top-4 left-4 z-50">
        <div className="glass px-4 py-2 rounded-full text-xs font-medium text-white">
          🔴 Live Demo — {template.title}
        </div>
      </div>
      <ExperienceComponent data={{ ...data, templateId: slug, isDemo: true }} />
    </div>
  );
}
