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
  LucideIcon // Import LucideIcon type
} from 'lucide-react'; // Import Lucide icons

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
    <div className="flex min-h-screen flex-col bg-background text-text font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-white font-poppins">href.lol</Link>
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-text-secondary hover:text-white font-sans font-semibold">Store</Link>
            <Link href="/discord" className="text-text-secondary hover:text-white font-sans font-semibold">Discord</Link>
            <Link href="/login" className="text-text-secondary hover:text-white font-sans font-semibold">Login</Link>
            <Link href="/register" className="text-text-secondary hover:text-white font-sans font-semibold">Register</Link>
          </div>
        </div>
      </nav>

      <div data-scroll-container>
        {/* Hero Section */}
        <main className="flex-1">
          <motion.section
            className="py-16 border-b border-line"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <div className="mx-auto max-w-3xl text-center px-4">
              <h1 className="text-5xl sm:text-6xl font-poppins font-bold text-white mb-6">Your Bio Link,<br /><span className="text-white">Elevated</span></h1>
              <p className="mt-4 text-lg text-text-secondary font-sans max-w-xl mx-auto">Create a stunning bio page that stands out. Add your links, customize your style, and share your story with the world.</p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-text-secondary font-sans select-none">href.lol/</span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-64 sm:w-72 rounded-[12px] border border-border bg-background py-2 pl-[5.5rem] pr-3 text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-white font-sans text-base font-medium transition-colors duration-200 shadow-none"
                    placeholder="username"
                    autoComplete="off"
                    spellCheck={false}
                    style={{ fontWeight: 500, fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif' }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border border-white bg-black text-white font-semibold font-sans rounded-[12px] px-6 py-2 transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white text-base shadow-none"
                  style={{ fontWeight: 600 }}
                >
                  Claim Your Link
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Featured Users Section */}
          <motion.section
            className="py-16 border-b border-line"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <div className="mx-auto max-w-4xl text-center px-4">
              <h2 className="text-3xl sm:text-4xl font-poppins font-semibold text-white mb-10">What are you waiting for? Join the other 14,958 users.</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {["@sheng", "@jshy", "@certii", "@unslayy", "@dma", "@hoax", "@xootzie", "@maybescripted"].map((user, i) => (
                  <motion.div
                    key={user}
                    className="w-32 h-12 rounded-[12px] bg-background flex items-center justify-center text-text text-sm font-sans border border-border hover:scale-105 transition-transform duration-200 cursor-pointer select-none"
                    whileHover={{ scale: 1.05 }}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                  >
                    {user}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Example Bios Section */}
          <div className="py-16 border-b border-line">
            <div className="mx-auto max-w-5xl text-center px-4">
              <div className="mt-12 flex justify-center">
                <a href="#features-section" onClick={handleSmoothScroll} className="text-text-secondary text-lg font-semibold font-sans hover:text-white flex items-center transition-colors duration-200">
                  Learn More
                  <span className="ml-2 text-xl">↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <motion.section
            id="features-section"
            className="mx-auto max-w-7xl px-4 py-16 border-b border-line"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <div className="mx-auto max-w-2xl text-center rounded-xl border border-border p-6">
              <h2 className="text-base font-poppins font-semibold text-white">Everything you need</h2>
              <p className="mt-2 text-3xl sm:text-4xl font-poppins font-semibold text-white">Features that make your bio page shine</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, i) => {
                  const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                  return (
                    <motion.div
                      key={feature.name}
                      className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-none hover:scale-105 transition-transform duration-200"
                      whileHover={{ scale: 1.05 }}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeUp}
                    >
                      <dt className="flex items-center gap-x-3 text-lg font-poppins font-semibold text-white">
                        {IconComponent && <IconComponent className="h-6 w-6 flex-none text-white" aria-hidden="true" />}
                        {feature.name}
                      </dt>
                      <dd className="mt-4 flex-auto text-base text-text font-sans">
                        <p className="font-sans">{feature.description}</p>
                      </dd>
                    </motion.div>
                  );
                })}
              </dl>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="border-t border-line bg-background py-12">
            <div className="mx-auto max-w-7xl px-4">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <span className="text-2xl font-bold text-white font-poppins">href.lol</span>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-poppins font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">Abuse</a></li>
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">Privacy</a></li>
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">Support</a></li>
                    </ul>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-poppins font-semibold text-white mb-4">Information</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">Terms of Service</a></li>
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">Platform Guidelines</a></li>
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">Privacy Policy</a></li>
                      <li><a href="#" className="text-text-secondary hover:text-white text-sm font-sans font-semibold">FAQ</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-line pt-8 text-center">
                <p className="text-text-secondary text-sm font-sans font-semibold">&copy; {new Date().getFullYear()} href.lol. All rights reserved. Est. 2025.</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
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