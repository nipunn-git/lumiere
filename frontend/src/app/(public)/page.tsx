'use client';

import { GLSLHills } from '@/components/ui/glsl-hills';
import Link from 'next/link';
import { Users, Sparkles, Stethoscope } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Home() {
  const popLayerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Background Component */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* True Black GLSL Background */}
        <div className="absolute inset-0 z-[1] opacity-60">
          <GLSLHills width="100vw" height="100vh" speed={0.15} />
        </div>
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white via-white/80 to-white"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 pt-32 pb-20 text-center max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={popLayerVariants}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-500 text-xs font-semibold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              Clinical Intelligence platform
            </div>

            <h1 className="text-7xl md:text-[120px] font-bold tracking-tightest leading-[0.9] text-black">
              Lumiere
              <span className="block text-3xl md:text-6xl font-light text-neutral-400 tracking-tight mt-4">
                Unified Patient Intelligence
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-neutral-500 font-medium leading-relaxed">
              Merge fragmented patient data into a trusted golden record. Built for
              hospitals and care teams that need clean, fast, and auditable intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/login">
                <button className="px-12 py-5 rounded-full bg-black text-white font-bold text-lg border border-transparent hover:bg-white hover:text-black hover:border-black hover:scale-[1.03] shadow hover:shadow-2xl active:scale-[0.98] transition-all duration-300">
                  Get Started
                </button>
              </Link>
              <a href="#contact">
                <button className="px-12 py-5 rounded-full bg-white text-black font-bold text-lg border border-neutral-200 hover:border-black hover:bg-neutral-50 hover:shadow-lg active:scale-[0.98] transition-all duration-300">
                  Contact Sales
                </button>
              </a>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={popLayerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 mt-40 w-full max-w-5xl mx-auto pt-20 border-t border-neutral-100/50"
          >
            {[
              { label: 'Patients Unified', value: '50K+', icon: Users },
              { label: 'Matches Found', value: '12.5K', icon: Sparkles },
              { label: 'Query Speed', value: '<100ms', icon: Stethoscope },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center space-y-4 group">
                <div className="p-3 rounded-2xl bg-neutral-50 text-neutral-400 group-hover:text-black group-hover:bg-neutral-100 transition-all duration-300">
                  <stat.icon size={24} />
                </div>
                <div className="space-y-1">
                  <span className="block text-4xl font-bold text-black tracking-tight">{stat.value}</span>
                  <span className="block text-neutral-400 text-sm font-semibold uppercase tracking-widest">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 bg-white overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-neutral-50 rounded-[40px] p-12 md:p-24 border border-neutral-100 relative group transition-shadow duration-500 hover:shadow-2xl">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-neutral-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none"></div>
              
              <div className="grid lg:grid-cols-2 gap-24 relative z-10">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-5xl font-bold text-black tracking-tighter">Let&apos;s talk about <br />your data.</h2>
                    <p className="text-neutral-500 text-xl font-medium leading-relaxed max-w-md">
                      Our team of clinical data experts is ready to help you unify your patient records.
                    </p>
                  </div>
                  
                  <div className="space-y-8 pt-4">
                    <div className="flex flex-col space-y-2">
                      <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Email us</span>
                      <motion.a 
                        whileHover={{ x: 5 }}
                        href="mailto:hello@lumiere.ai" 
                        className="text-2xl font-bold text-black inline-block transition-transform"
                      >
                        hello@lumiere.ai
                      </motion.a>
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-neutral-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-medium hover:border-neutral-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Email</label>
                      <input
                        type="email"
                        placeholder="john@hospital.com"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-neutral-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-medium hover:border-neutral-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Message</label>
                    <textarea
                      placeholder="Tell us about your project"
                      rows={5}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-neutral-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-medium resize-none hover:border-neutral-300"
                    />
                  </div>
                  <button type="button" className="w-full py-5 rounded-2xl bg-black text-white font-bold text-lg hover:bg-white hover:text-black hover:border-black border border-transparent hover:scale-[1.03] shadow hover:shadow-2xl transition-all duration-300 active:scale-[0.98]">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-neutral-50 relative z-10 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tightest">Lumiere</span>
              <span className="text-neutral-300 ml-2">© {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-10 text-sm font-semibold text-neutral-400 uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
