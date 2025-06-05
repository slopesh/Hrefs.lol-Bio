import Link from 'next/link';
import React from 'react';

const Footer = () => (
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
);

export default Footer; 