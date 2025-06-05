"use client";

import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import BioCard from './components/BioCard'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
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

// Mapping of icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  Layout: Layout,
  Globe: Globe,
  BarChart2: BarChart2,
  Badge: Badge,
  Smartphone: Smartphone,
  Bot: Bot,
};

export default function Home() {
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
    const targetElement = document.getElementById(targetId as string);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Dynamically import LocomotiveScroll and its CSS only on the client
    const loadLocomotiveScroll = async () => {
      try {
        await import('locomotive-scroll/dist/locomotive-scroll.css');
        const { default: LocomotiveScroll } = await import('locomotive-scroll');
        
        const scroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]') as HTMLElement,
          smooth: true,
          lerp: 0.08,
        });

        return () => {
          scroll.destroy();
        };
      } catch (error) {
        console.error('Failed to load LocomotiveScroll:', error);
      }
    };

    loadLocomotiveScroll();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins">
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
        <div className="absolute inset-0 bg-[#0f0f0f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#232323] via-[#0f0f0f] to-[#0f0f0f] opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-gradient-hover">
              Your Bio Link,<br />
              <span className="text-gradient-hover">Your Style</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto text-hover-animate">
              Create a stunning bio link page that matches your unique style. 
              Perfect for creators, influencers, and anyone who wants to stand out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-6 rounded-2xl bg-[#181818] border border-[#232323] border-hover scale-hover">
              <Star className="h-8 w-8 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gradient-hover">Customizable</h3>
              <p className="text-gray-400 text-hover-animate">
                Make it yours with our powerful customization options
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#181818] border border-[#232323] border-hover scale-hover">
              <Zap className="h-8 w-8 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gradient-hover">Lightning Fast</h3>
              <p className="text-gray-400 text-hover-animate">
                Optimized for speed and performance
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#181818] border border-[#232323] border-hover scale-hover">
              <Star className="h-8 w-8 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gradient-hover">Analytics</h3>
              <p className="text-gray-400 text-hover-animate">
                Track your visitors and optimize your content
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#232323] py-8">
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
      </footer>
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