"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { wishTemplates, getFeaturedWishes, getPopularWishes } from "@/lib/templates/registry";
import { WishCard } from "@/components/wish/wish-card";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWishes = searchQuery
    ? wishTemplates.filter(
        (w) =>
          w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : wishTemplates;

  const featured = getFeaturedWishes();
  const popular = getPopularWishes();

  return (
    <div className="relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Over 15 beautiful wish experiences</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Create Beautiful Wishes{" "}
            <span className="text-gradient">For Every Special Moment</span>{" "}
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 inline text-red-500 fill-red-500 animate-pulse" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Create personalized interactive experiences for someone special. 
            Choose a beautiful template, customize every moment, and share a unique link 
            that feels like it was made just for them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/create">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto gap-2">
                <Sparkles className="w-4 h-4" />
                Create Wish
              </Button>
            </Link>
            <Link href="/#wishes">
              <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2">
                Explore Wishes
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search any wish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 rounded-2xl glass text-base placeholder:text-muted-foreground/60"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Wishes */}
      {!searchQuery && (
        <section className="relative px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold mb-2">Featured Wishes</h2>
              <p className="text-muted-foreground">Handpicked experiences for your most special moments</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((wish, index) => (
                <WishCard key={wish.id} wish={wish} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Wishes */}
      {!searchQuery && (
        <section className="relative px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold mb-2">Popular Wishes</h2>
              <p className="text-muted-foreground">Most loved by our community</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popular.map((wish, index) => (
                <WishCard key={wish.id} wish={wish} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Wishes */}
      <section id="wishes" className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-2">
              {searchQuery ? "Search Results" : "All Wishes"}
            </h2>
            <p className="text-muted-foreground">
              {searchQuery
                ? `Found ${filteredWishes.length} wish${filteredWishes.length !== 1 ? "es" : ""}`
                : "Browse all our beautiful wish experiences"}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWishes.map((wish, index) => (
              <WishCard key={wish.id} wish={wish} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
