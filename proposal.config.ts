// lib/wishes/templates/proposal.config.ts
// Maps your existing 7-chapter Proposal flow onto the shared engine shape.
// Component names below assume your existing MemoryGallery.tsx,
// LetterEnvelope.tsx and RingBox.tsx live in components/wish-engine/moments/.

import { WishTemplateConfig } from "../types";

export const proposalConfig: WishTemplateConfig = {
  slug: "proposal",
  backgroundTheme: "romantic-burgundy", // petals + candle glow + gold particles
  music: { defaultTrackId: "romantic-piano-01", allowOff: true },

  moments: [
    {
      id: "welcome",
      component: "OpeningMoment",
      title: "Welcome",
      fields: [
        {
          id: "recipientName",
          label: "Her/His Name",
          type: "text",
          required: true,
          placeholder: "e.g. Priya",
        },
        {
          id: "openingMessage",
          label: "Opening Message",
          type: "textarea",
          defaultValue: "There's something I've wanted to tell you...",
          maxLength: 200,
        },
      ],
    },
    {
      id: "our-story",
      component: "OurStoryMoment",
      title: "Our Story",
      optional: true,
      requiresAnyOf: ["howWeMet", "feelings"],
      fields: [
        {
          id: "howWeMet",
          label: "How We Met",
          type: "textarea",
          defaultValue: "You became someone very special to me.",
        },
        {
          id: "feelings",
          label: "How You Feel About Them",
          type: "textarea",
        },
      ],
    },
    {
      id: "memory-gallery",
      component: "MemoryGallery",
      title: "Memory Gallery",
      optional: true,
      requiresAnyOf: ["photos"],
      fields: [
        { id: "photos", label: "Memory Photos", type: "photoList", maxLength: 8 },
      ],
    },
    {
      id: "secret-letter",
      component: "LetterEnvelope",
      title: "Secret Letter",
      optional: true,
      requiresAnyOf: ["letterBody"],
      fields: [
        { id: "letterBody", label: "Your Private Letter", type: "textarea", maxLength: 1500 },
        { id: "letterSignature", label: "Sign the Letter As", type: "text" },
      ],
    },
    {
      id: "ring-ceremony",
      component: "RingBox",
      title: "Ring Ceremony",
      fields: [
        {
          id: "preReveaLMessage",
          label: "Message Just Before the Ring",
          type: "textarea",
          defaultValue: "My heart has never been more sure of anything.",
        },
      ],
    },
    {
      id: "final-proposal",
      component: "FinalQuestionMoment",
      title: "Final Proposal",
      fields: [
        {
          id: "finalQuestion",
          label: "Your Proposal Question",
          type: "text",
          defaultValue: "Will You Be Mine? ❤️",
          required: true,
          maxLength: 120,
        },
      ],
    },
    {
      id: "celebration",
      component: "FinalMoment",
      title: "Celebration",
      fields: [
        {
          id: "celebrationMessage",
          label: "Final Keepsake Message",
          type: "textarea",
          defaultValue: "This is only the beginning of our story.",
        },
      ],
    },
  ],

  demoData: {
    recipientName: "Ananya",
    openingMessage: "There's something I've wanted to tell you...",
    howWeMet: "We met on a rainy evening and everything changed.",
    feelings: "Every day with you feels like the best chapter of my life.",
    letterBody:
      "From the day we met, I knew my life would never be the same. You are my calm, my joy, my home.",
    letterSignature: "Yours, always",
    preReveaLMessage: "My heart has never been more sure of anything.",
    finalQuestion: "Will You Be Mine? ❤️",
    celebrationMessage: "This is only the beginning of our story.",
  },
};
