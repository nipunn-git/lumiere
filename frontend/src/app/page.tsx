'use client';

import { GLSLHills } from '@/components/ui/glsl-hills';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Stethoscope, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden rounded-[28px] border border-black/10 bg-white">
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-20"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-hospital-building-42547-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-[1]">
        <GLSLHills width="100vw" height="100vh" speed={0.25} />
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white/80 via-white/75 to-white"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-black/5 border border-black/15 backdrop-blur-sm">
              <p className="text-sm font-medium text-black flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Medical Intelligence Platform
              </p>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-semibold text-black leading-tight tracking-tight">
            <span>Lumiere</span>
            <br />
            <span className="text-4xl md:text-6xl text-neutral-700 font-light">
              Unified Patient Intelligence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Merge fragmented patient data into a trusted golden record. Built for
            hospitals and care teams that need clean, fast, and auditable intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/patients">
              <button className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 bg-black hover:bg-neutral-800">
                <span className="relative flex items-center gap-2 justify-center tracking-wide">
                  <Users size={20} />
                  Explore Patients
                </span>
              </button>
            </Link>

            <Link href="/golden-record">
              <button className="group px-8 py-4 rounded-xl font-semibold text-black border-2 border-black hover:bg-black/5 transition-all duration-300">
                <span className="flex items-center gap-2 justify-center">
                  <ShieldCheck size={20} />
                  Golden Record
                </span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            {[
              { icon: Users, label: 'Patients Unified', value: '50K+' },
              { icon: Sparkles, label: 'Matches Found', value: '12.5K' },
              { icon: Stethoscope, label: 'Query Speed', value: '<100ms' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white/85 border border-black/10 shadow-sm hover:shadow-lg backdrop-blur transition-all duration-300 hover:translate-y-[-4px]"
                >
                  <Icon className="w-8 h-8 text-black mb-3 transition-colors" />
                  <p className="text-black font-bold text-2xl">{stat.value}</p>
                  <p className="text-neutral-600 text-sm mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
