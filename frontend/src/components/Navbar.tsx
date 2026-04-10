'use client';

import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-20 backdrop-blur-md bg-white/80 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-black p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-black tracking-tightest">
            Lumiere
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-300 active:scale-95 shadow-sm">
              Login / Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
