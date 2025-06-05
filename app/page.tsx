"use client";

import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import BioCard from './components/BioCard'
import { motion } from 'framer-motion'
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

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const scrollRef = useRef(null);

  // Scroll reveal variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
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

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins" data-scroll-container>
      <BackgroundContainer />

      {/* Navigation */}
      <nav className="border-b border-[#232323] bg-[#0f0f0f] sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-poppins">href.lol</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-hover-animate font-poppins font-semibold">Store</Link>
            <Link href="/discord" className="text-hover-animate font-poppins font-semibold">Discord</Link>
            <Link href="/login" className="text-hover-animate font-poppins font-semibold">Login</Link>
            <Link href="/register" className="text-hover-animate font-poppins font-semibold">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-6xl font-bold mb-6 text-gradient-hover"
            >
              Your Bio Link,<br />
              <span className="text-gradient-hover">Your Style</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto text-hover-animate"
            >
              Create a stunning bio link page that matches your unique style.
              Perfect for creators, influencers, and anyone who wants to stand out.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                className="bg-white text-black hover:bg-white/90 transition-all duration-300 scale-hover"
                size="lg"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-[#232323] hover:border-white/20 transition-all duration-300 scale-hover"
                size="lg"
              >
                <Link href="#features" onClick={handleSmoothScroll} className="flex items-center justify-center">
                 Learn More <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            id="features"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.name}
                variants={fadeUp}
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
        </div>
      </section>

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
]