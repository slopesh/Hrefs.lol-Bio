"use client";

import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import BioCard from './components/BioCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import {
  Layout,
  Globe,
  BarChart2,
  Badge,
  Smartphone,
  Bot,
  LucideIcon,
  ArrowRight,
  ChevronRight,
  Star,
  Zap
} from 'lucide-react';
import './globals.css'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import BackgroundContainer from '../components/backgrounds/BackgroundContainer'

// Mapping of icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  Layout: Layout,
  Globe: Globe,
  BarChart2: BarChart2,
  Badge: Badge,
  Smartphone: Smartphone,
  Bot: Bot,
};

// Dynamically import LocomotiveScroll with no SSR
const LocomotiveScroll = dynamic(() => import('locomotive-scroll'), {
  ssr: false
});

interface FeaturedUser {
  id: string;
  username: string;
  avatar: string | null;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [featuredUsers, setFeaturedUsers] = useState<FeaturedUser[]>([]);
  const scrollRef = useRef(null);
  const featuredUsersContainerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };

  const bioCardVariants = {
    hidden: { opacity: 0, rotate: -5, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      rotate: i === 0 ? -5 : 5, // Slightly rotate cards
      y: 0,
      transition: {
        delay: 0.8 + i * 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  const featuredUserItemVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (scrollRef.current && targetId) {
      (scrollRef.current as any).scrollTo(`#${targetId}`, { duration: 1000, easing: [0.76, 0, 0.24, 1] });
    } else {
      const targetElement = document.getElementById(targetId as string);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    
    // Fetch featured users
    const fetchFeaturedUsers = async () => {
      try {
        const res = await fetch('/api/featured-users');
        if (!res.ok) {
          throw new Error(`Error fetching featured users: ${res.statusText}`);
        }
        const data = await res.json();
        setFeaturedUsers(data);
      } catch (error) {
        console.error('Failed to fetch featured users:', error);
      }
    };

    fetchFeaturedUsers();

    if (typeof window !== 'undefined') {
      // Import CSS and initialize LocomotiveScroll
      const initScroll = async () => {
        try {
          await import('locomotive-scroll/dist/locomotive-scroll.css');
          const { default: LocomotiveScroll } = await import('locomotive-scroll');
          
          const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]') as HTMLElement,
            smooth: true,
            lerp: 0.08,
          });
          scrollRef.current = scroll;

          return () => {
            scroll.destroy();
            scrollRef.current = null;
          };
        } catch (error) {
          console.error('Failed to load LocomotiveScroll:', error);
        }
      };

      initScroll();
    }
  }, []);

  const bioCardData = [
    {
      name: 'Aiden',
      username: 'aiden',
      title: 'Owner/Dev @ E-Z Services',
      avatar: '/avatars/aiden.png', // Replace with actual avatar path
      stats: { views: 1234, links: 5, badges: 3, featured: true },
      socials: [ { platform: 'github', link: '#' }, { platform: 'twitter', link: '#' } ], // Replace with actual data
      music: { type: 'spotify', title: 'Playing Lunar Client', artist: '@skrrrtt' }, // Example music data
      lastSaid: { text: 'what was the last thing u said', by: 'aldn; glaive', on: 'greenhouse', duration: '03:47' }, // Example text data
    },
    {
      name: 'tsoxas',
      username: 'tsoxas',
      title: 'Dev @ E-Z Services',
      avatar: '/avatars/tsoxas.png', // Replace with actual avatar path
      stats: { views: 6014, links: 8, badges: 5, featured: false },
      socials: [ { platform: 'github', link: '#' }, { platform: 'discord', link: '#' } ], // Replace with actual data
      linkPreview: { title: 'Discord.js v14 Bot Base', url: 'https://github.com/tsoxas/base' }, // Example link preview
      music: { type: 'spotify', title: 'Shenanigans', artist: 'Jasiah (feat. Yung Bans)' }, // Example music data
    } 
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins" data-scroll-container>
      <BackgroundContainer />

      {/* Navigation */}
      <nav className="border-b border-[#232323] bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-poppins hover:text-white/80 transition-colors">href.lol</Link>
          </div>
          <div className="flex items-center space-x-6">
            {['Store', 'Discord', 'Login', 'Register'].map((item, i) => (
              <motion.div
                key={item}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className="text-hover-animate font-poppins font-semibold relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-screen-2xl mx-auto text-center py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl font-bold mb-6 text-gradient-hover relative"
            >
              Your Bio Link,
              <br />
              <span className="text-gradient-hover inline-block relative">
                Your Style
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto text-hover-animate leading-relaxed"
            >
              Create a stunning bio link page that matches your unique style.
              Perfect for creators, influencers, and anyone who wants to stand out.
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <motion.div variants={itemVariants}>
                <Button
                  className="bg-white text-black hover:bg-white/90 transition-all duration-300 scale-hover group"
                  size="lg"
                >
                  Get Started 
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  className="border-[#232323] text-white hover:border-white/20 transition-all duration-300 scale-hover group"
                  size="lg"
                >
                  <Link href="#features" onClick={handleSmoothScroll} className="flex items-center justify-center">
                    Learn More 
                    <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* BioCard Examples */}
          <div className="relative w-full flex justify-center items-center min-h-[600px]">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {bioCardData.map((card, i) => (
                <motion.div
                  key={card.username}
                  custom={i}
                  variants={bioCardVariants}
                  whileHover="hover"
                  className="transform-gpu"
                >
                  <BioCard {...card} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Bios Section (Dynamic from API) */}
      <section className="py-20 bg-[#0f0f0f]"> {/* Adjusted padding and background */}
        <div className="max-w-screen-2xl mx-auto overflow-hidden"> {/* Added overflow hidden */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gradient-hover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            What are you waiting for? Join the other <span className="text-blue-500">14,976</span> users.
          </motion.h2>
          
          {/* Featured Users Horizontal Scroll */}
          <motion.div 
            ref={featuredUsersContainerRef}
            className="flex space-x-6 py-4 no-scrollbar cursor-grab active:cursor-grabbing" /* Added cursor styles */
            whileTap={{ cursor: 'grabbing' }}
          >
            {isClient && featuredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                className="flex-shrink-0 w-48 bg-[#181818] rounded-xl border border-[#232323] flex flex-col items-center justify-center text-gray-400 p-4 shadow-lg" /* Adjusted width, background, border, padding, and added shadow */
                variants={featuredUserItemVariants} /* Applied variants for animations */
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.5 }} // Trigger animation when in view
              >
                <Link href={`/${user.username}`} className="flex flex-col items-center justify-center">
                  <img 
                    src={user.avatar || '/avatars/default-avatar.png'} // Use default avatar if none exists
                    alt={`${user.username}'s avatar`} 
                    className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-white/20" /* Adjusted size, margin, and added border */
                  />
                  <span className="text-white text-base font-semibold">@{user.username}</span> {/* Adjusted font size */}
                </Link>
              </motion.div>
            ))}
            {/* Optional: Add duplicates of featured users for continuous loop effect if needed */}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <motion.div
        id="features"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.name}
            variants={itemVariants}
            custom={i}
            className="p-6 rounded-2xl bg-[#181818] border border-[#232323] border-hover scale-hover"
          >
            {isClient && iconMap[feature.icon] && React.createElement(iconMap[feature.icon], { className: "h-8 w-8 text-white mb-4" })}
            <h3 className="text-xl font-semibold mb-2 text-gradient-hover">{feature.name}</h3>
            <p className="text-gray-400 text-hover-animate">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="border-t border-[#232323] py-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 href.lol. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-hover-animate text-sm">Privacy</Link>
              <Link href="/terms" className="text-hover-animate text-sm">Terms</Link>
              <Link href="/contact" className="text-hover-animate text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

const features = [
  {
    name: 'Beautiful Themes',
    description: 'Choose from multiple modern themes and layouts to match your style.',
    icon: 'Layout',
  },
  {
    name: 'Custom Domains',
    description: 'Connect your own domain or use our href.lol subdomain.',
    icon: 'Globe',
  },
  {
    name: 'Analytics',
    description: 'Track your profile views and link clicks with detailed analytics.',
    icon: 'BarChart2',
  },
  {
    name: 'Badge System',
    description: 'Show off your achievements with custom badges on your profile.',
    icon: 'Badge',
  },
  {
    name: 'Mobile First',
    description: 'Your bio page looks great on any device, from mobile to desktop.',
    icon: 'Smartphone',
  },
  {
    name: 'AI Powered',
    description: 'Let AI help you create the perfect bio page with our smart generator.',
    icon: 'Bot',
  },
];

// Example data for BioCards (Static for showcase)


// Placeholder for BioCard component - replace with actual import if available
// If BioCard component needs data passed, define interfaces here.

// Example usage within the component render:
// <BioCard userData={exampleUserData} />

// Example User Data Structure (adjust based on your BioCard component props)
// interface UserData {
//   name: string;
//   username: string;
//   title: string;
//   avatar: string;
//   stats: { views: number; links: number; badges: number; featured: boolean };
//   socials: { platform: string; link: string }[];
//   music?: { type: string; title: string; artist: string };
//   lastSaid?: { text: string; by: string; on: string; duration: string };
//   linkPreview?: { title: string; url: string };
// }