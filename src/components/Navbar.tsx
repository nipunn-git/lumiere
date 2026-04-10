'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/matches', label: 'Matches', icon: Sparkles },
  { href: '/golden-record', label: 'Golden Record', icon: ShieldCheck },
  { href: '/query', label: 'Query', icon: Search },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 h-20 backdrop-blur-md bg-white/75 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-black p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-black tracking-tight">
            Lumiere
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-black text-white border border-black'
                      : 'text-neutral-600 hover:text-black hover:bg-black/5 border border-transparent'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider">
          hospital edition
        </div>
      </div>
    </nav>
  );
}
