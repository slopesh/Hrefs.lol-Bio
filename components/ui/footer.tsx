import React from 'react';
import Logo from './href-logo';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-dark-200 bg-dark-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Logo variant="footer" brandName={siteConfig.name} />
            <p className="text-sm text-text-secondary text-center md:text-left max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.nav.footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-white text-sm font-poppins transition-colors duration-200">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Resources</h3>
            <ul className="space-y-2">
              {siteConfig.nav.footer.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-white text-sm font-poppins transition-colors duration-200">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Information</h3>
            <ul className="space-y-2">
              {siteConfig.nav.footer.information.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-white text-sm font-poppins transition-colors duration-200">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-200 text-center">
          <p className="text-text-secondary text-sm font-poppins">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 