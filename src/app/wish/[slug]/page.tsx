"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Eye, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateBySlug } from "@/lib/templates/registry";

export default function WishDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Wish Not Found</h1>
          <p className="text-muted-foreground">This wish template does not exist.</p>
          <Button variant="gradient" className="mt-4" onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Cover */}
      <div
        className="relative h-[50vh] sm:h-[60vh] flex items-end overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${template.theme.background} 0%, ${template.theme.primary}20 50%, ${template.theme.background} 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + Math.random() * 8,
                height: 4 + Math.random() * 8,
                background: template.theme.accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: `${template.theme.primary}20`,
                color: template.theme.accent,
              }}
            >
              <span className="text-2xl">{template.emoji}</span>
              <span>{template.title}</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            {template.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            {template.description}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Experience Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Surprise Experience Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {template.experienceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl glass"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${template.theme.primary}30` }}
                >
                  <Check className="w-3 h-3" style={{ color: template.theme.accent }} />
                </div>
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href={`/create/${template.slug}`} className="flex-1">
            <Button
              variant="gradient"
              size="lg"
              className="w-full gap-2 h-14 text-lg"
            >
              <Heart className="w-5 h-5" />
              Create Your Wish
            </Button>
          </Link>
          <Link href={`/demo/${template.slug}`} className="flex-1">
            <Button
              variant="glass"
              size="lg"
              className="w-full gap-2 h-14 text-lg"
            >
              <Eye className="w-5 h-5" />
              Live Demo
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
