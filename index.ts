// components/wish-engine/moments/index.ts
// Central lookup: every "component" string used in a wish config MUST be
// registered here. This is the only file you edit when a new moment type
// is needed — WishRenderer.tsx never changes.

import { ComponentType } from "react";
import { WishMoment } from "@/lib/wishes/types";

// --- Reuse your existing WishVerse components ---
import MemoryGallery from "./MemoryGallery"; // your existing MemoryGallery.tsx, adapted to this prop shape
import LetterEnvelope from "./LetterEnvelope"; // your existing LetterEnvelope.tsx, adapted
import RingBox from "./RingBox"; // your existing RingBox.tsx, adapted

// --- Generic moments (build these next — small, mostly text + optional photo) ---
import OpeningMoment from "./OpeningMoment";
import OurStoryMoment from "./OurStoryMoment";
import FinalQuestionMoment from "./FinalQuestionMoment";
import FinalMoment from "./FinalMoment";

// --- Girlfriend Special specific moments (build these next) ---
import GlowingHeartOpening from "./GlowingHeartOpening";
import RelationshipCounter from "./RelationshipCounter";
import ReasonsMoment from "./ReasonsMoment";
import SecretNotesMoment from "./SecretNotesMoment";
import PromisesMoment from "./PromisesMoment";
import FutureDreamsMoment from "./FutureDreamsMoment";
import GlowingHeartFinale from "./GlowingHeartFinale";

export interface MomentComponentProps {
  moment: WishMoment;
  data: Record<string, string | string[]>;
  mode: "demo" | "recipient" | "preview";
  onNext: () => void;
  onBack: () => void;
}

export const momentComponents: Record<string, ComponentType<MomentComponentProps>> = {
  OpeningMoment,
  OurStoryMoment,
  MemoryGallery,
  LetterEnvelope,
  RingBox,
  FinalQuestionMoment,
  FinalMoment,
  GlowingHeartOpening,
  RelationshipCounter,
  ReasonsMoment,
  SecretNotesMoment,
  PromisesMoment,
  FutureDreamsMoment,
  GlowingHeartFinale,
};
