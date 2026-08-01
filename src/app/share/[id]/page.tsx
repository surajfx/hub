"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Check, QrCode, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function SharePage() {
  const params = useParams();
  const wishId = params.id as string;
  const [copied, setCopied] = useState(false);
  const [wishData, setWishData] = useState<any>(null);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/w/${wishId}` : "";

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const snap = await getDoc(doc(db, "wishes", wishId));
        if (snap.exists()) setWishData(snap.data());
      } catch (e) { console.error(e); }
    };
    fetchWish();
  }, [wishId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `I made something special for you! 💖\n\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
          <Share2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Your Wish Is Ready ❤️</h1>
        <p className="text-muted-foreground mb-8">
          Share this unique link with {wishData?.recipient?.name || "someone special"}
        </p>

        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <input type="text" value={shareUrl} readOnly className="flex-1 bg-transparent text-sm truncate outline-none" />
            <Button variant="ghost" size="sm" onClick={handleCopy} className={copied ? "text-green-400" : ""}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" className="flex-1 gap-2" onClick={handleWhatsApp}>WhatsApp</Button>
            <Button variant="glass" className="flex-1 gap-2" onClick={handleCopy}>{copied ? "Copied!" : "Copy Link"}</Button>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 mb-6 inline-block">
          <QrCode className="w-32 h-32 text-muted-foreground" />
          <p className="text-xs text-muted-foreground mt-2">Scan to open</p>
        </div>

        <a href={`/w/${wishId}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ExternalLink className="w-4 h-4" /> Preview how it looks
        </a>
      </motion.div>
    </div>
  );
}
