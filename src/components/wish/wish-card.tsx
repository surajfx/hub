"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { WishTemplate } from "@/types";

interface WishCardProps {
  wish: WishTemplate;
  index?: number;
}

export function WishCard({ wish, index = 0 }: WishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/wish/${wish.slug}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden rounded-2xl glass cursor-pointer h-full"
          style={{
            background: `linear-gradient(135deg, ${wish.theme.primary}15 0%, ${wish.theme.background}40 100%)`,
          }}
        >
          {/* Glow Effect */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
            style={{ background: wish.theme.primary }}
          />

          {/* Card Content */}
          <div className="relative p-6">
            {/* Emoji & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: `linear-gradient(135deg, ${wish.theme.primary}30, ${wish.theme.accent}20)`,
                }}
              >
                {wish.emoji}
              </div>
              {wish.isPopular && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-all">
              {wish.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {wish.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-1 text-sm font-medium" style={{ color: wish.theme.accent }}>
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `linear-gradient(90deg, ${wish.theme.primary}, ${wish.theme.accent})`,
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
