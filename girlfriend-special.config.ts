// lib/wishes/templates/girlfriend-special.config.ts
// Second reference wish — proves the engine works for a different
// story/flow/signature-moment without touching WishRenderer.tsx.

import { WishTemplateConfig } from "../types";

export const girlfriendSpecialConfig: WishTemplateConfig = {
  slug: "girlfriend-special",
  backgroundTheme: "rose-aurora", // pink glow + hearts + petals
  music: { defaultTrackId: "soft-romantic-02", allowOff: true },

  moments: [
    {
      id: "opening",
      component: "GlowingHeartOpening",
      title: "Glowing Heart Opening",
      fields: [
        { id: "recipientName", label: "Her Name", type: "text", required: true },
        {
          id: "greeting",
          label: "Personal Greeting",
          type: "textarea",
          defaultValue: "Hey you, I made this just for you.",
        },
      ],
    },
    {
      id: "relationship-counter",
      component: "RelationshipCounter",
      title: "Relationship Counter",
      optional: true,
      requiresAnyOf: ["relationshipStartDate"],
      fields: [
        { id: "relationshipStartDate", label: "Relationship Start Date", type: "date" },
      ],
    },
    {
      id: "polaroid-memories",
      component: "MemoryGallery",
      title: "Polaroid Memories",
      optional: true,
      requiresAnyOf: ["photos"],
      fields: [{ id: "photos", label: "Memory Photos", type: "photoList", maxLength: 8 }],
    },
    {
      id: "reasons",
      component: "ReasonsMoment",
      title: "Things I Love About You",
      optional: true,
      requiresAnyOf: ["reasons"],
      fields: [
        {
          id: "reasons",
          label: "Reasons / Little Things You Do",
          type: "textarea",
          defaultValue: "My favourite thing about you...",
        },
      ],
    },
    {
      id: "secret-notes",
      component: "SecretNotesMoment",
      title: "Secret Notes",
      optional: true,
      requiresAnyOf: ["secretNote"],
      fields: [{ id: "secretNote", label: "A Secret Note", type: "textarea" }],
    },
    {
      id: "love-letter",
      component: "LetterEnvelope",
      title: "Wax-Sealed Love Letter",
      optional: true,
      requiresAnyOf: ["letterBody"],
      fields: [{ id: "letterBody", label: "Your Love Letter", type: "textarea", maxLength: 1500 }],
    },
    {
      id: "promises",
      component: "PromisesMoment",
      title: "Promises",
      optional: true,
      requiresAnyOf: ["promises"],
      fields: [{ id: "promises", label: "Promises to Her", type: "textarea" }],
    },
    {
      id: "future-dreams",
      component: "FutureDreamsMoment",
      title: "Future Dreams",
      optional: true,
      requiresAnyOf: ["futureDreams"],
      fields: [{ id: "futureDreams", label: "Our Future Together", type: "textarea" }],
    },
    {
      id: "final-surprise",
      component: "GlowingHeartFinale",
      title: "Final Surprise",
      fields: [
        {
          id: "finalMessage",
          label: "Final Message Inside the Heart",
          type: "textarea",
          defaultValue: "You are, and always will be, my favourite person.",
          required: true,
        },
      ],
    },
  ],

  demoData: {
    recipientName: "Riya",
    greeting: "Hey you, I made this just for you.",
    relationshipStartDate: "2024-02-14",
    reasons: "The way you laugh at your own jokes before finishing them.",
    secretNote: "I still get nervous before texting you, even now.",
    letterBody: "Every little moment with you feels like a page from my favourite story.",
    promises: "I promise to choose you, every single day.",
    futureDreams: "Traveling the world together, one city at a time.",
    finalMessage: "You are, and always will be, my favourite person.",
  },
};
