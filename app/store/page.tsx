import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Bitcoin, CircleDollarSign } from "lucide-react";

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
    <div className="flex min-h-screen flex-col bg-background text-text-DEFAULT font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-dark-300 bg-dark-200/50 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-white font-poppins">
              href.lol
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-text-DEFAULT hover:text-white transition-colors duration-200 font-sans">
              Store
            </Link>
            <Link href="/discord" className="text-text-DEFAULT hover:text-white transition-colors duration-200 font-sans">
              Discord
            </Link>
            <Link href="/login" className="text-text-DEFAULT hover:text-white transition-colors duration-200 font-sans">
              Login
            </Link>
            <Link href="/register" className="text-text-DEFAULT hover:text-white transition-colors duration-200 font-sans">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">Store</h1>

          {/* Main Store Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6 font-poppins">Main Store</h2>
            <div className="flex justify-center">
              {/* PayPal Placeholder */}
              <Card className="w-36 h-24 flex flex-col items-center justify-center text-text-DEFAULT text-sm border border-dark-300 cursor-pointer transition-colors hover:bg-dark-300 bg-dark-200">
                <CardContent className="flex flex-col items-center justify-center p-0">
                   {/* PayPal Icon Placeholder */}
                  <div className="text-3xl mb-2">🅿️</div>
                  <span>PayPal</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resellers Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6 font-poppins">Resellers</h2>
            <div className="flex justify-center gap-6">
              {/* Card Placeholder */}
              <Card className="w-36 h-24 flex flex-col items-center justify-center text-text-DEFAULT text-sm border border-dark-300 cursor-pointer transition-colors hover:bg-dark-300 bg-dark-200">
                 <CardContent className="flex flex-col items-center justify-center p-0">
                   <CreditCard className="text-3xl mb-2" />
                   <span>Card</span>
                 </CardContent>
              </Card>
              {/* Crypto Placeholder */}
              <Card className="w-36 h-24 flex flex-col items-center justify-center text-text-DEFAULT text-sm border border-dark-300 cursor-pointer transition-colors hover:bg-dark-300 bg-dark-200">
                 <CardContent className="flex flex-col items-center justify-center p-0">
                   <Bitcoin className="text-3xl mb-2" />
                   <span>Crypto</span>
                 </CardContent>
              </Card>
              {/* Russian Placeholder */}
              <Card className="w-36 h-24 flex flex-col items-center justify-center text-text-DEFAULT text-sm border border-dark-300 cursor-pointer transition-colors hover:bg-dark-300 bg-dark-200">
                 <CardContent className="flex flex-col items-center justify-center p-0">
                   <CircleDollarSign className="text-3xl mb-2" /> {/* Using a generic currency icon */}
                   <span>Russian</span>
                 </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 