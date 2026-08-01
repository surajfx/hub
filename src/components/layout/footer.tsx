"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gradient">WishVerse</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Create beautiful, personalized interactive experiences for every special moment. 
              Make someone feel truly special with a cinematic wish crafted just for them.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">All Wishes</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">Featured</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">Popular</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Create</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/create" className="hover:text-foreground transition-colors">Create a Wish</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">Templates</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          <p>Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> by WishVerse</p>
        </div>
      </div>
    </footer>
  );
}
