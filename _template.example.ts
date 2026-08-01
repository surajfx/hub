// lib/wishes/templates/_template.example.ts
// COPY this file to create a new wish, e.g. birthday-surprise.config.ts
// Steps:
//   1. Copy this file, rename to templates/<slug>.config.ts
//   2. Set slug + backgroundTheme
//   3. List moments in order (use the checklist from registry.ts for that wish)
//   4. For each moment, list only the fields that appear in that moment
//   5. Fill demoData with one realistic value per field id
//   6. In registry.ts, flip that wish's `enabled` to true
//   7. Register any new component name used below inside
//      components/wish-engine/moments/index.ts

import { WishTemplateConfig } from "../types";

export const exampleConfig: WishTemplateConfig = {
  slug: "proposal", // <- change to the real slug
  backgroundTheme: "change-me",
  music: { allowOff: true },

  moments: [
    {
      id: "opening",
      component: "OpeningMoment", // reuse existing generic moments where possible
      title: "Opening",
      fields: [
        { id: "recipientName", label: "Recipient Name", type: "text", required: true },
        { id: "openingMessage", label: "Opening Message", type: "textarea" },
      ],
    },
    // ...add more moments here, following the wish's checklist in registry.ts
    {
      id: "final",
      component: "FinalMoment",
      title: "Final Message",
      fields: [{ id: "finalMessage", label: "Final Message", type: "textarea", required: true }],
    },
  ],

  demoData: {
    recipientName: "Demo Name",
    openingMessage: "Demo opening message goes here.",
    finalMessage: "Demo final message goes here.",
  },
};
