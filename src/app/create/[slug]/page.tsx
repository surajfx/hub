"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTemplateBySlug } from "@/lib/templates/registry";
import { cloudinaryConfig } from "@/lib/cloudinary/config";
import { generateUniqueId } from "@/lib/utils";
import { db } from "@/lib/firebase/config";
import { doc, setDoc } from "firebase/firestore";

// ALL template customization schemas
const customizationSchemas: Record<string, { steps: { id: string; title: string; fields: { id: string; type: string; label: string; placeholder?: string; required?: boolean; rows?: number }[] }[] }> = {
  proposal: {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", placeholder: "Enter your name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", placeholder: "Enter their name", required: true },
        { id: "recipientNickname", type: "text", label: "Their Nickname (optional)", placeholder: "Honey, Baby, etc." },
      ]},
      { id: "opening", title: "Opening Message", fields: [
        { id: "openingText", type: "textarea", label: "Opening Message", placeholder: "There's something I've wanted to tell you...", required: true, rows: 3 },
        { id: "feelingsText", type: "textarea", label: "How You Feel", placeholder: "You became someone very special to me...", required: true, rows: 4 },
      ]},
      { id: "memories", title: "Memories & Photos", fields: [
        { id: "memoriesText", type: "textarea", label: "Your Memories Together", placeholder: "Remember when we first met...", rows: 4 },
        { id: "reasonsText", type: "textarea", label: "Reasons You Love Them", placeholder: "My favourite thing about you...", rows: 4 },
      ]},
      { id: "letter", title: "Personal Letter", fields: [
        { id: "letterText", type: "textarea", label: "Your Letter", placeholder: "Write your heart out...", required: true, rows: 8 },
      ]},
      { id: "future", title: "Future & Question", fields: [
        { id: "futureText", type: "textarea", label: "Future Thoughts", placeholder: "I can't wait to spend my future with you...", rows: 4 },
        { id: "finalQuestion", type: "text", label: "Your Proposal Question", placeholder: "Will You Be Mine? ❤️", required: true },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "No matter what you choose, I love you...", rows: 3 },
      ]},
    ],
  },
  "girlfriend-special": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Her Name", required: true },
        { id: "recipientNickname", type: "text", label: "Her Nickname", placeholder: "Babe, Baby, etc." },
      ]},
      { id: "greeting", title: "Greeting", fields: [
        { id: "greetingText", type: "textarea", label: "Personal Greeting", placeholder: "Hey beautiful...", required: true, rows: 3 },
        { id: "counterText", type: "textarea", label: "Relationship Counter (optional)", placeholder: "Every day with you is a gift...", rows: 2 },
      ]},
      { id: "memories", title: "Memories", fields: [
        { id: "memoriesText", type: "textarea", label: "Your Memories", placeholder: "Our favorite moments...", rows: 4 },
        { id: "reasonsText", type: "textarea", label: "Reasons You Love Her", placeholder: "I love your smile, your kindness...", rows: 4 },
        { id: "littleThingsText", type: "textarea", label: "Little Things You Love", placeholder: "The way you laugh...", rows: 3 },
      ]},
      { id: "letter", title: "Love Letter", fields: [
        { id: "letterText", type: "textarea", label: "Your Letter", placeholder: "My love...", required: true, rows: 8 },
      ]},
      { id: "final", title: "Promises & Final Message", fields: [
        { id: "promisesText", type: "textarea", label: "Your Promises", placeholder: "I promise to always...", rows: 3 },
        { id: "futureText", type: "textarea", label: "Future Dreams", placeholder: "I can't wait to...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "You are my everything...", rows: 3 },
      ]},
    ],
  },
  "boyfriend-special": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "His Name", required: true },
      ]},
      { id: "opening", title: "Opening", fields: [
        { id: "openingText", type: "textarea", label: "Personal Message", placeholder: "Hey handsome...", required: true, rows: 3 },
        { id: "thingsText", type: "textarea", label: "Things You Never Say Enough", placeholder: "There are things I never say enough...", rows: 4 },
      ]},
      { id: "memories", title: "Memories & Admiration", fields: [
        { id: "memoriesText", type: "textarea", label: "Favorite Memories", placeholder: "Every adventure with you...", rows: 4 },
        { id: "admireText", type: "textarea", label: "What You Admire About Him", placeholder: "I admire your strength...", rows: 4 },
        { id: "jokeText", type: "textarea", label: "Inside Joke / Cute Moment", placeholder: "Remember when...", rows: 3 },
      ]},
      { id: "letter", title: "Letter & Thanks", fields: [
        { id: "letterText", type: "textarea", label: "Private Letter", placeholder: "My favorite person...", required: true, rows: 8 },
        { id: "thanksText", type: "textarea", label: "Thank You For...", placeholder: "Thank you for loving me...", rows: 3 },
      ]},
      { id: "final", title: "Future & Final", fields: [
        { id: "futureText", type: "textarea", label: "Future Plans", placeholder: "I look forward to...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Appreciation", placeholder: "You are my person...", rows: 3 },
      ]},
    ],
  },
  "long-distance-love": {
    steps: [
      { id: "names", title: "Names & Locations", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
        { id: "locationsText", type: "text", label: "Your Locations", placeholder: "New York ❤️ Los Angeles" },
      ]},
      { id: "connection", title: "Connection & Counter", fields: [
        { id: "counterText", type: "textarea", label: "Relationship Counter / Time Apart", placeholder: "Every day apart makes our reunion sweeter...", rows: 3 },
        { id: "memoriesText", type: "textarea", label: "Memories", placeholder: "Our last walk on the beach...", rows: 4 },
      ]},
      { id: "miss", title: "Things You Miss", fields: [
        { id: "missText", type: "textarea", label: "Things You Miss About Them", placeholder: "I miss your voice, your laugh...", required: true, rows: 4 },
      ]},
      { id: "letter", title: "Letter & Countdown", fields: [
        { id: "letterText", type: "textarea", label: "Private Letter", placeholder: "Distance means so little...", required: true, rows: 8 },
        { id: "countdownText", type: "textarea", label: "Next Meeting Countdown", placeholder: "Only 14 more days...", rows: 2 },
      ]},
      { id: "final", title: "Future & Final", fields: [
        { id: "plansText", type: "textarea", label: "Things You'll Do Together", placeholder: "First thing I'm doing is...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "We are always connected...", rows: 3 },
      ]},
    ],
  },
  anniversary: {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "opening", title: "Anniversary Opening", fields: [
        { id: "openingText", type: "textarea", label: "Anniversary Greeting", placeholder: "Happy Anniversary, my love!", required: true, rows: 3 },
        { id: "togetherText", type: "textarea", label: "Together For...", placeholder: "3 incredible years together...", rows: 2 },
      ]},
      { id: "journey", title: "Journey & Timeline", fields: [
        { id: "startedText", type: "textarea", label: "How It Started", placeholder: "From that awkward first date...", rows: 3 },
        { id: "timelineText", type: "textarea", label: "Relationship Timeline", placeholder: "First date → First trip → Today...", rows: 3 },
        { id: "memoriesText", type: "textarea", label: "Important Memories", placeholder: "Our trip to Paris...", rows: 4 },
      ]},
      { id: "milestones", title: "Milestones & Letter", fields: [
        { id: "milestonesText", type: "textarea", label: "Milestones", placeholder: "Surviving long distance...", rows: 3 },
        { id: "thenNowText", type: "textarea", label: "Then vs Now", placeholder: "Then: nervous and shy. Now: completely in love.", rows: 3 },
        { id: "letterText", type: "textarea", label: "Love Letter", placeholder: "My beautiful...", required: true, rows: 8 },
      ]},
      { id: "final", title: "Final Anniversary Moment", fields: [
        { id: "stillLoveText", type: "textarea", label: "What You Still Love", placeholder: "I fall more in love with you...", rows: 3 },
        { id: "futureText", type: "textarea", label: "Future Together", placeholder: "Here's to forever together...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "Our love story is my favorite...", rows: 3 },
      ]},
    ],
  },
  "love-letter": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "letter", title: "Your Letter", fields: [
        { id: "mainMessage", type: "textarea", label: "Your Love Letter", placeholder: "My dearest...", required: true, rows: 12 },
      ]},
      { id: "final", title: "P.S. & Final", fields: [
        { id: "finalMessage", type: "textarea", label: "P.S. Secret Message", placeholder: "P.S. You are my always...", rows: 3 },
      ]},
    ],
  },
  "love-confession": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "buildup", title: "Build Up", fields: [
        { id: "questionText", type: "text", label: "Opening Question", placeholder: "Can I tell you something?" },
        { id: "messageText", type: "textarea", label: "Personal Message", placeholder: "I've been wanting to say this...", rows: 4 },
        { id: "cluesText", type: "textarea", label: "Small Clues", placeholder: "You might have noticed...", rows: 3 },
      ]},
      { id: "feelings", title: "Your Feelings", fields: [
        { id: "likeText", type: "textarea", label: "Things You Like About Them", placeholder: "I like everything about you...", rows: 4 },
        { id: "memoriesText", type: "textarea", label: "Memories", placeholder: "Every moment with you...", rows: 4 },
        { id: "hiddenText", type: "textarea", label: "Hidden Feelings", placeholder: "I've been hiding my feelings...", rows: 3 },
        { id: "buildupText", type: "textarea", label: "Emotional Build-Up", placeholder: "My heart races every time...", rows: 3 },
      ]},
      { id: "confession", title: "The Confession", fields: [
        { id: "confessionText", type: "text", label: "Your Confession", placeholder: "I LOVE YOU", required: true },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "You mean everything to me...", rows: 3 },
      ]},
    ],
  },
  "miss-you": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "opening", title: "Opening", fields: [
        { id: "openingText", type: "textarea", label: "Opening Message", placeholder: "Hey...", required: true, rows: 3 },
        { id: "messageText", type: "textarea", label: "I Miss You Message", placeholder: "I miss you more than words can say...", required: true, rows: 4 },
        { id: "timeText", type: "textarea", label: "Time/Distance Apart", placeholder: "It's been 3 weeks...", rows: 2 },
      ]},
      { id: "memories", title: "Memories & Missed Things", fields: [
        { id: "memoriesText", type: "textarea", label: "Memory Window", placeholder: "I keep replaying our memories...", rows: 4 },
        { id: "missThingsText", type: "textarea", label: "Things You Miss", placeholder: "I miss your smile, your voice...", rows: 4 },
        { id: "photosText", type: "textarea", label: "Photos/Memories", placeholder: "Looking at your photos...", rows: 3 },
        { id: "notesText", type: "textarea", label: "Unsent Notes", placeholder: "I've written you a thousand messages...", rows: 3 },
      ]},
      { id: "letter", title: "Letter & Final", fields: [
        { id: "letterText", type: "textarea", label: "Personal Letter", placeholder: "Come back to me soon...", required: true, rows: 8 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "Sending you a virtual hug...", rows: 3 },
      ]},
    ],
  },
  sorry: {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "apology", title: "Your Apology", fields: [
        { id: "openingText", type: "textarea", label: "Quiet Opening", placeholder: "Hey...", rows: 2 },
        { id: "apologyText", type: "textarea", label: "Personal Apology", placeholder: "I'm truly sorry for what I did...", required: true, rows: 4 },
        { id: "regretText", type: "textarea", label: "What You Regret", placeholder: "I regret my actions deeply...", rows: 3 },
        { id: "differentText", type: "textarea", label: "What You Should Have Done", placeholder: "I should have handled things differently...", rows: 3 },
      ]},
      { id: "memories", title: "Good Memories & Letter", fields: [
        { id: "memoriesText", type: "textarea", label: "Good Memories", placeholder: "The good times we've shared...", rows: 4 },
        { id: "letterText", type: "textarea", label: "Apology Letter", placeholder: "My dear... I'm so sorry.", required: true, rows: 8 },
      ]},
      { id: "final", title: "Final", fields: [
        { id: "betterText", type: "textarea", label: "What You'll Do Better", placeholder: "I promise to do better...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "I'm sorry, from the bottom of my heart...", rows: 3 },
      ]},
    ],
  },
  "birthday-surprise": {
    steps: [
      { id: "names", title: "Birthday Person", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Birthday Person's Name", required: true },
        { id: "birthdayDate", type: "text", label: "Birthday Date", placeholder: "January 1, 2024" },
      ]},
      { id: "greeting", title: "Birthday Greeting", fields: [
        { id: "greetingText", type: "textarea", label: "Birthday Greeting", placeholder: "Happy Birthday to the most amazing person...", required: true, rows: 4 },
      ]},
      { id: "memories", title: "Memories", fields: [
        { id: "memoriesText", type: "textarea", label: "Special Memories", placeholder: "Some of my favorite moments with you...", rows: 4 },
        { id: "amazingText", type: "textarea", label: "Things That Make Them Amazing", placeholder: "You are kind, funny, brilliant...", rows: 4 },
      ]},
      { id: "letter", title: "Birthday Letter", fields: [
        { id: "letterText", type: "textarea", label: "Your Birthday Letter", placeholder: "On your special day...", required: true, rows: 8 },
      ]},
      { id: "wish", title: "Make A Wish", fields: [
        { id: "wishText", type: "text", label: "Make A Wish Message", placeholder: "Make A Wish ✨", required: true },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "I hope all your dreams come true...", rows: 3 },
      ]},
    ],
  },
  congratulations: {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "achievement", title: "Achievement", fields: [
        { id: "achievementText", type: "textarea", label: "Achievement Reveal", placeholder: "You did it! You graduated!", required: true, rows: 3 },
        { id: "journeyText", type: "textarea", label: "Their Journey", placeholder: "Look how far you've come...", rows: 4 },
      ]},
      { id: "memories", title: "Memories & Pride", fields: [
        { id: "memoriesText", type: "textarea", label: "Memories/Photos", placeholder: "Your journey has been incredible...", rows: 4 },
        { id: "proudText", type: "textarea", label: "Proud Messages", placeholder: "I am so proud of you...", rows: 4 },
        { id: "badgeText", type: "textarea", label: "Achievement Message", placeholder: "You deserve every bit of this...", rows: 3 },
      ]},
      { id: "letter", title: "Letter & Final", fields: [
        { id: "letterText", type: "textarea", label: "Personal Letter", placeholder: "Your hard work has paid off...", required: true, rows: 8 },
        { id: "finalMessage", type: "textarea", label: "Final Celebration Message", placeholder: "You are incredible!", rows: 3 },
      ]},
    ],
  },
  "best-friend-special": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Your Best Friend's Name", required: true },
      ]},
      { id: "fun", title: "Fun Opening", fields: [
        { id: "openingText", type: "textarea", label: "Fun Opening", placeholder: "Yo!", required: true, rows: 3 },
        { id: "metText", type: "textarea", label: "How You Met", placeholder: "Remember when we met...", rows: 3 },
        { id: "counterText", type: "textarea", label: "Friendship Counter", placeholder: "So many years of friendship!", rows: 2 },
      ]},
      { id: "memories", title: "Memories & Jokes", fields: [
        { id: "photosText", type: "textarea", label: "Funny Photos/Memories", placeholder: "We've made some epic memories...", rows: 4 },
        { id: "jokesText", type: "textarea", label: "Inside Jokes", placeholder: "No one else gets our jokes...", rows: 3 },
        { id: "understandText", type: "textarea", label: "Things Only You Understand", placeholder: "We have our own language...", rows: 3 },
      ]},
      { id: "letter", title: "Letter & Promise", fields: [
        { id: "memoriesText", type: "textarea", label: "Best Memories", placeholder: "Best times of my life...", rows: 4 },
        { id: "whyText", type: "textarea", label: "Why They're Your Best Friend", placeholder: "You're my person...", rows: 3 },
        { id: "letterText", type: "textarea", label: "Personal Letter", placeholder: "Thanks for being my best friend...", required: true, rows: 8 },
      ]},
      { id: "final", title: "Final Surprise", fields: [
        { id: "promiseText", type: "textarea", label: "Friendship Promise", placeholder: "Friends forever...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "You're the best friend...", rows: 3 },
      ]},
    ],
  },
  "countdown-until-we-meet": {
    steps: [
      { id: "names", title: "Names & Locations", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
        { id: "locationsText", type: "text", label: "Locations", placeholder: "London ❤️ Tokyo" },
      ]},
      { id: "date", title: "Meeting Date", fields: [
        { id: "meetingDate", type: "text", label: "Meeting Date", placeholder: "2024-12-25", required: true },
        { id: "dateText", type: "textarea", label: "Date Message", placeholder: "The big day is coming!", rows: 2 },
      ]},
      { id: "memories", title: "Memories & Plans", fields: [
        { id: "memoriesText", type: "textarea", label: "Memories", placeholder: "Our video calls...", rows: 4 },
        { id: "plansText", type: "textarea", label: "Things You'll Do First", placeholder: "First: hug for 10 minutes...", rows: 4 },
      ]},
      { id: "final", title: "Final", fields: [
        { id: "noteText", type: "textarea", label: "Personal Note", placeholder: "See you soon...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "Can't wait to see you!", rows: 3 },
      ]},
    ],
  },
  "good-morning": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "morning", title: "Morning Message", fields: [
        { id: "sunriseText", type: "textarea", label: "Sunrise Message", placeholder: "The sun is rising...", rows: 3 },
        { id: "greetingText", type: "textarea", label: "Morning Greeting", placeholder: "Good Morning!", required: true, rows: 3 },
        { id: "messageText", type: "textarea", label: "Personal Message", placeholder: "I hope your day is wonderful...", rows: 4 },
      ]},
      { id: "reminders", title: "Reminders & Final", fields: [
        { id: "photoText", type: "textarea", label: "Photo/Memory (optional)", placeholder: "Thinking of you...", rows: 3 },
        { id: "reminderText", type: "textarea", label: "Today's Reminder", placeholder: "Don't forget how amazing you are...", rows: 3 },
        { id: "positiveText", type: "textarea", label: "Positive Message", placeholder: "Today is going to be great!", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Morning Card", placeholder: "Have a beautiful day!", rows: 3 },
      ]},
    ],
  },
  "good-night": {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "night", title: "Night Message", fields: [
        { id: "beforeText", type: "textarea", label: "Before You Sleep", placeholder: "Before you close your eyes...", rows: 3 },
        { id: "noteText", type: "textarea", label: "Personal Note", placeholder: "I hope you had a wonderful day...", rows: 4 },
        { id: "photoText", type: "textarea", label: "Photo/Memory (optional)", placeholder: "Thinking of you...", rows: 3 },
      ]},
      { id: "final", title: "Calming & Final", fields: [
        { id: "calmText", type: "textarea", label: "Calming Message", placeholder: "Take a deep breath...", rows: 3 },
        { id: "finalMessage", type: "textarea", label: "Final Message", placeholder: "Sleep tight, my love...", rows: 3 },
      ]},
    ],
  },
};

export default function CustomizePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const template = getTemplateBySlug(slug);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<{ url: string; publicId: string }[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const schema = customizationSchemas[slug] || {
    steps: [
      { id: "names", title: "Names", fields: [
        { id: "senderName", type: "text", label: "Your Name", required: true },
        { id: "recipientName", type: "text", label: "Their Name", required: true },
      ]},
      { id: "message", title: "Your Message", fields: [
        { id: "mainMessage", type: "textarea", label: "Your Message", required: true, rows: 6 },
      ]},
      { id: "final", title: "Final Touch", fields: [
        { id: "finalMessage", type: "textarea", label: "Final Message", rows: 3 },
      ]},
    ],
  };

  const steps = schema.steps;
  const totalSteps = steps.length;

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", cloudinaryConfig.uploadPreset);
    formDataCloud.append("cloud_name", cloudinaryConfig.cloudName);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formDataCloud,
      });
      const data = await res.json();
      setPhotos((prev) => [...prev, { url: data.secure_url, publicId: data.public_id }]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Photo upload failed. Please try again.");
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const wishId = generateUniqueId();
    const wishData = {
      id: wishId,
      templateId: slug,
      recipient: {
        name: formData.recipientName || "Someone Special",
        nickname: formData.recipientNickname || "",
      },
      sender: {
        name: formData.senderName || "Someone",
      },
      content: formData,
      media: photos,
      settings: { music: "romantic", theme: "default" },
      status: "published" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, "wishes", wishId), wishData);
      router.push(`/share/${wishId}`);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save wish. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!template) return <div className="min-h-screen flex items-center justify-center">Template not found</div>;

  if (isPreview) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
          <Button variant="glass" onClick={() => setIsPreview(false)} className="gap-2 text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Button>
          <Button variant="gradient" onClick={handleSave} disabled={isSaving} className="gap-2">
            <Sparkles className="w-4 h-4" />
            {isSaving ? "Creating..." : "Create My Wish ❤️"}
          </Button>
        </div>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{template.emoji}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Preview Mode</h2>
            <p className="text-white/50">This shows how your {template.title} will look.</p>
            <div className="mt-8 p-4 rounded-xl glass text-left max-w-md mx-auto overflow-auto max-h-64">
              <pre className="text-xs text-white/70">{JSON.stringify({ ...formData, photos: photos.length + " photos" }, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-24">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="text-2xl">{template.emoji}</span>
            <span>Create {template.title}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Customize Your Wish</h1>
          <p className="text-muted-foreground">Step {currentStep + 1} of {totalSteps}</p>
        </div>

        <div className="flex gap-2 mb-8">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              idx <= currentStep ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-white/10"
            }`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h2>
            <div className="space-y-6">
              {steps[currentStep].fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea value={formData[field.id] || ""} onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder} rows={field.rows || 4} className="glass bg-white/5" />
                  ) : (
                    <Input type={field.type} value={formData[field.id] || ""} onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder} className="glass bg-white/5 h-12" />
                  )}
                </div>
              ))}

              {steps[currentStep].id === "memories" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Photos</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img src={photo.url} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removePhoto(idx)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                      <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Add Photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 p-4 glass-strong border-t border-white/10">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <Button variant="ghost" onClick={() => setCurrentStep((p) => Math.max(0, p - 1))} disabled={currentStep === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <div className="flex gap-2">
              <Button variant="glass" onClick={() => setIsPreview(true)} className="gap-2">
                <Eye className="w-4 h-4" /> Preview
              </Button>
              {currentStep < totalSteps - 1 ? (
                <Button variant="gradient" onClick={() => setCurrentStep((p) => Math.min(totalSteps - 1, p + 1))} className="gap-2">
                  Save & Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="gradient" onClick={() => setIsPreview(true)} className="gap-2">
                  <Sparkles className="w-4 h-4" /> Preview & Create
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
