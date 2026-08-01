"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { wishTemplates } from "@/lib/templates/registry";
import { WishCard } from "@/components/wish/wish-card";

export default function CreatePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWishes = searchQuery
    ? wishTemplates.filter(
        (w) =>
          w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : wishTemplates;

  return (
    <div className="min-h-screen">
      <div className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Choose Your Experience</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              All Wishes
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Select the perfect wish experience for your special moment
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search wishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 rounded-2xl glass text-base"
              />
            </div>
          </motion.div>

          {/* Wish Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWishes.map((wish, index) => (
              <WishCard key={wish.id} wish={wish} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
