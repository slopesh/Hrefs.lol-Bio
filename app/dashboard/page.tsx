'use client';

import Link from 'next/link';
import { User, BarChart2, Palette, Link2, Image, Gem, LayoutDashboard, Settings, LogOut, Github, Twitter, Youtube, Linkedin, Instagram, Twitch, Facebook, Globe, Star, Crown, ShieldCheck, Wrench, Award, UserCheck, Rocket, Zap, Medal, KeyRound, UserPlus, UserCog, User2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectionModal } from '@/components/ui/connection-modal';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const sidebarLinks = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Analytics', icon: BarChart2, href: '/dashboard/analytics' },
  { name: 'Customize', icon: Palette, href: '/dashboard/customize' },
  { name: 'Links', icon: Link2, href: '/dashboard/links' },
  { name: 'Media', icon: Image, href: '/dashboard/media' },
  { name: 'Premium', icon: Gem, href: '/dashboard/premium' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

const connections = [
  { name: 'GitHub', icon: Github, color: 'text-white', bg: 'bg-[#232323]' },
  { name: 'Twitter', icon: Twitter, color: 'text-blue-400', bg: 'bg-[#232323]' },
  { name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-[#232323]' },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', bg: 'bg-[#232323]' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-[#232323]' },
  { name: 'Discord', icon: Globe, color: 'text-indigo-400', bg: 'bg-[#232323]' },
  { name: 'Twitch', icon: Twitch, color: 'text-purple-500', bg: 'bg-[#232323]' },
  { name: 'Facebook', icon: Facebook, color: 'text-blue-500', bg: 'bg-[#232323]' },
  { name: 'Website', icon: Globe, color: 'text-gray-300', bg: 'bg-[#232323]' },
];

const badges = [
  { name: 'VIP', icon: Star, color: 'text-yellow-400', bg: 'bg-[#232323]', desc: 'VIP User' },
  { name: 'Premium', icon: Gem, color: 'text-pink-400', bg: 'bg-[#232323]', desc: 'Premium Member' },
  { name: 'Owner', icon: Crown, color: 'text-yellow-500', bg: 'bg-[#232323]', desc: 'Owner of the platform' },
  { name: 'Staff', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-[#232323]', desc: 'Staff Member' },
  { name: 'Developer', icon: Wrench, color: 'text-green-400', bg: 'bg-[#232323]', desc: 'Platform Developer' },
  { name: 'OG', icon: Award, color: 'text-orange-400', bg: 'bg-[#232323]', desc: 'Original Member' },
  { name: 'Verified', icon: CheckCircle2, color: 'text-blue-400', bg: 'bg-[#232323]', desc: 'Verified User' },
  { name: 'Influencer', icon: UserCheck, color: 'text-purple-400', bg: 'bg-[#232323]', desc: 'Influencer' },
  { name: 'Rocket', icon: Rocket, color: 'text-pink-400', bg: 'bg-[#232323]', desc: 'Growth Hacker' },
  { name: 'Zap', icon: Zap, color: 'text-yellow-300', bg: 'bg-[#232323]', desc: 'Power User' },
  { name: 'Medalist', icon: Medal, color: 'text-orange-300', bg: 'bg-[#232323]', desc: 'Top Performer' },
  { name: 'Key', icon: KeyRound, color: 'text-gray-400', bg: 'bg-[#232323]', desc: 'Security Expert' },
  { name: 'Early', icon: UserPlus, color: 'text-green-300', bg: 'bg-[#232323]', desc: 'Early Adopter' },
  { name: 'Customizer', icon: Palette, color: 'text-pink-300', bg: 'bg-[#232323]', desc: 'Theme Customizer' },
  { name: 'Admin', icon: UserCog, color: 'text-red-400', bg: 'bg-[#232323]', desc: 'Admin' },
];

// Add type for social
type SocialType = typeof connections[number];

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<SocialType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOpenModal = (social: SocialType) => {
    setSelectedSocial(social);
    setModalOpen(true);
  };

  const handleAddConnection = async (data: { mode: 'link' | 'text'; value: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success!',
        description: `Added ${selectedSocial?.name} connection successfully.`,
        className: 'bg-green-500 text-white',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add connection. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
        >
          Social Connections
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(255,255,255,0.1)',
              }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group bg-[#181818] rounded-2xl p-6 border border-[#232323]",
                "hover:border-white/20 transition-all duration-300 cursor-pointer",
                "backdrop-blur-sm"
              )}
              onClick={() => handleOpenModal(social)}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300",
                    "bg-gradient-to-br from-[#232323] to-[#181818]"
                  )}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 3,
                    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
                  }}
                >
                  <social.icon 
                    className={cn(
                      `w-8 h-8 ${social.color}`,
                      "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
                      "transition-all duration-300"
                    )} 
                    strokeWidth={2.5} 
                  />
                </motion.div>
                <div>
                  <motion.span 
                    className="text-xl font-semibold block"
                    initial={{ color: 'rgba(255,255,255,0.7)' }}
                    whileHover={{ 
                      color: 'rgba(255,255,255,1)',
                      textShadow: '0 0 8px rgba(255,255,255,0.3)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.name}
                  </motion.span>
                  <motion.p 
                    className="text-sm mt-1"
                    initial={{ color: 'rgba(255,255,255,0.5)' }}
                    whileHover={{ color: 'rgba(255,255,255,0.8)' }}
                    transition={{ duration: 0.2 }}
                  >
                    Add your {social.name} profile
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedSocial && (
          <ConnectionModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            social={selectedSocial}
            onAdd={handleAddConnection}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 