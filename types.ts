// lib/wishes/types.ts
// Shared contracts for every Wish in WishVerse.
// A "Wish" = registry metadata (this file's WishMeta) + a moment config
// (WishTemplateConfig) consumed by <WishRenderer />.

export type WishSlug =
  | "proposal"
  | "girlfriend-special"
  | "boyfriend-special"
  | "long-distance-love"
  | "anniversary"
  | "love-letter"
  | "love-confession"
  | "miss-you"
  | "sorry"
  | "birthday-surprise"
  | "congratulations"
  | "best-friend-special"
  | "countdown-until-we-meet"
  | "good-morning"
  | "good-night";

/** Shown on Home Page cards + All Wishes grid + Details Page header. */
export interface WishMeta {
  slug: WishSlug;
  title: string;
  emoji: string;
  shortDescription: string;
  coverImage: string; // path or Cloudinary URL for the details-page hero
  cardAccent: {
    // per-card visual identity (spec section: CARD DESIGN)
    gradientFrom: string;
    gradientTo: string;
    glowColor: string;
  };
  checklist: string[]; // "Surprise Experience Checklist" on Details Page
  isFeatured?: boolean;
  isPopular?: boolean;
  enabled: boolean; // false = registry entry exists but no config yet (safe not-found)
}

/** A single field the creator fills in during customization. */
export interface WishField {
  id: string; // maps to content key, e.g. "openingMessage"
  label: string; // shown above the input
  type: "text" | "textarea" | "date" | "photo" | "photoList";
  defaultValue?: string; // pre-filled premium default text (spec section 10)
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

/** One emotional beat in the experience (spec section 11: "every moment"). */
export interface WishMoment {
  id: string; // e.g. "opening", "memory-gallery", "letter", "signature", "final"
  component: string; // registered component name in components/wish-engine/moments
  title: string;
  optional?: boolean; // if creator skips required data, engine skips this moment
  fields: WishField[]; // customization fields belonging to this moment
  requiresAnyOf?: string[]; // field ids — if ALL empty, moment is auto-skipped
}

/** Full config for one wish template — consumed by <WishRenderer />. */
export interface WishTemplateConfig {
  slug: WishSlug;
  backgroundTheme: string; // key into a theme registry (colors/particles/music)
  music?: {
    defaultTrackId?: string;
    allowOff: boolean;
  };
  moments: WishMoment[];
  demoData: Record<string, string | string[]>; // field id -> demo value, per spec section 6
}

/** A creator-published wish instance stored in Firestore under wishes/{id}. */
export interface WishInstance {
  id: string;
  templateId: WishSlug;
  recipient: { name: string; nickname?: string };
  sender: { name: string };
  content: Record<string, string | string[]>; // field id -> creator value
  media: { url: string; publicId: string; caption?: string }[];
  settings: { music?: string; theme?: string };
  status: "draft" | "published";
  createdAt: number;
  updatedAt: number;
  viewCount?: number;
}
