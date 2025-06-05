import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Bitcoin, CircleDollarSign } from "lucide-react";
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Placeholder for footer (can be a separate component later)
const Footer = () => (
  <footer className="border-t border-dark-300 bg-dark-200/50 backdrop-blur-sm py-12">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Logo Area */}
        <div className="flex items-center">
          {/* Placeholder for Logo */}
          <span className="text-2xl font-bold text-white font-poppins">href.lol</span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Abuse</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Privacy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Support</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Platform Guidelines</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-dark-300 pt-8 text-center">
        <p className="text-text-secondary text-sm font-sans">
          &copy; {new Date().getFullYear()} href.lol. All rights reserved. Est. 2025.
        </p>
      </div>
    </div>
  </footer>
);

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-[#232323] bg-[#0f0f0f] sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-poppins">href.lol</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Store</Link>
            <Link href="/discord" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Discord</Link>
            <Link href="/login" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Login</Link>
            <Link href="/register" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-0">
        <h1 className="text-5xl font-poppins font-bold text-white mb-10">Store</h1>
        <div className="mb-12 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Main Store</h2>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 0 24px #fff' }}
              className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center shadow-none border border-[#232323] w-full max-w-xs transition-all duration-200 group"
            >
              <CreditCard className="w-10 h-10 mb-3 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] group-hover:animate-pulse" strokeWidth={2.5} />
              <span className="text-lg font-poppins font-medium text-white mb-2">PayPal</span>
            </motion.div>
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Resellers</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 0 24px #fff' }}
              className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center shadow-none border border-[#232323] w-40 transition-all duration-200 group"
            >
              <CreditCard className="w-10 h-10 mb-3 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] group-hover:animate-pulse" strokeWidth={2.5} />
              <span className="text-lg font-poppins font-medium text-white mb-2">Card</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 0 24px #fbbf24' }}
              className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center shadow-none border border-[#232323] w-40 transition-all duration-200 group"
            >
              <Bitcoin className="w-10 h-10 mb-3 text-yellow-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)] group-hover:animate-pulse" strokeWidth={2.5} />
              <span className="text-lg font-poppins font-medium text-white mb-2">Crypto</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 0 24px #60a5fa' }}
              className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center shadow-none border border-[#232323] w-40 transition-all duration-200 group"
            >
              <CircleDollarSign className="w-10 h-10 mb-3 text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.7)] group-hover:animate-pulse" strokeWidth={2.5} />
              <span className="text-lg font-poppins font-medium text-white mb-2">Russian</span>
            </motion.div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
} 