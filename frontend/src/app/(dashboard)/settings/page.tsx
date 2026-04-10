'use client';

import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Eye, 
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaved, setIsSaved] = useState(false);
  const [userProfile, setUserProfile] = useState({ fullName: '', role: '' });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const role = localStorage.getItem('role');
    if (savedProfile) {
      setUserProfile({ ...JSON.parse(savedProfile), role: role || 'clinician' });
    }
  }, []);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Privacy', icon: Eye },
    { name: 'System', icon: SettingsIcon },
  ];

  const visibleTabs = tabs;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-black tracking-tight">Settings</h1>
        <p className="text-neutral-500 font-medium">Manage your account preferences and global system configuration.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 border-r border-neutral-100 p-6 space-y-2 bg-neutral-50/30">
          {visibleTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-semibold text-sm ${
                activeTab === tab.name 
                ? 'bg-black text-white shadow-lg' 
                : 'text-neutral-500 hover:text-black hover:bg-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 relative">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 max-w-3xl"
          >
            {activeTab === 'Profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 pb-8 border-b border-neutral-100">
                  <div className="w-24 h-24 rounded-3xl bg-neutral-100 flex items-center justify-center text-3xl font-bold text-neutral-400 border border-neutral-200">
                    {userProfile.fullName ? userProfile.fullName[0] : 'U'}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-black tracking-tight">Profile Picture</h3>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-neutral-800 transition-colors">Change Photo</button>
                      <button className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-500 text-sm font-bold hover:bg-neutral-50 transition-colors">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={userProfile.fullName}
                      className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-black outline-none transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        defaultValue="user@lumiere.ai"
                        className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-black outline-none transition-all font-semibold"
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Role</label>
                    <input 
                      type="text" 
                      value={userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                      disabled
                      className="w-full px-5 py-3.5 rounded-xl bg-neutral-100 border border-transparent font-bold capitalize text-neutral-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-black text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="text-blue-400" />
                      <h4 className="font-bold underline underline-offset-4">Two-Factor Authentication</h4>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-1 rounded-full uppercase tracking-widest">Active</span>
                  </div>
                  <p className="text-neutral-400 text-sm">Add an extra layer of security to your clinical account.</p>
                </div>
              </div>
            )}

            {(activeTab === 'Notifications' || activeTab === 'Privacy' || activeTab === 'System') && (
               <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-50">
                  <SettingsIcon size={48} className="text-neutral-200" />
                  <p className="font-bold text-neutral-400 uppercase tracking-widest text-xs">{activeTab} settings coming soon</p>
               </div>
            )}

            <div className="pt-10 border-t border-neutral-100 flex items-center justify-between">
              <button 
                onClick={handleSave}
                className="px-8 py-4 rounded-2xl bg-black text-white font-bold tracking-wide hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className={cn("transition-all duration-300", isSaved ? "opacity-0 scale-90 translate-y-4" : "opacity-100")}>Save Changes</span>
                {isSaved && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 text-emerald-400 animate-in slide-in-from-bottom-4 duration-300">
                    <CheckCircle2 size={24} />
                    <span className="text-white">Profile Saved</span>
                  </div>
                )}
              </button>
              <button className="px-8 py-4 rounded-2xl border border-neutral-100 text-neutral-400 font-bold hover:border-black hover:text-black transition-all">Reset to Defaults</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
