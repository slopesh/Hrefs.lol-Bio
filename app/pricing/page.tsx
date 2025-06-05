import Link from 'next/link'

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

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-poppins">href.lol</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-text-secondary hover:text-white font-sans font-semibold">Store</Link>
            <Link href="/discord" className="text-text-secondary hover:text-white font-sans font-semibold">Discord</Link>
            <Link href="/login" className="text-text-secondary hover:text-white font-sans font-semibold">Login</Link>
            <Link href="/register" className="text-text-secondary hover:text-white font-sans font-semibold">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-poppins font-bold tracking-tight text-white sm:text-5xl mb-12">Simple, transparent pricing</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-dark-200 rounded-lg p-8 border border-dark-300">
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Free Tier</h2>
              <p className="text-text font-sans mb-4">Basic features</p>
              <ul className="text-text text-left mb-6 space-y-2 font-sans text-sm">
                <li>✓ Customizable bio page</li>
                <li>✓ Unlimited links</li>
                <li>✓ Basic analytics</li>
                <li>✓ Standard themes</li>
              </ul>
              <p className="text-3xl font-poppins font-bold text-white">$0</p>
              <p className="text-text-secondary text-sm font-sans mb-6">forever</p>
              <div className="mt-6">
                <Link href="/register" className="btn btn-secondary w-full text-text hover:text-white transition-colors duration-200 font-semibold font-poppins">Get Started</Link>
              </div>
            </div>
            {/* Premium Tier */}
            <div className="bg-dark-200 rounded-lg p-8 border border-dark-300">
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Premium</h2>
              <p className="text-text font-sans mb-4">Advanced features</p>
              <ul className="text-text text-left mb-6 space-y-2 font-sans text-sm">
                <li>✓ All Free tier features</li>
                <li>✓ Custom domain</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Premium themes</li>
                <li>✓ Priority support</li>
                <li>✓ No href.lol branding</li>
              </ul>
              <p className="text-3xl font-poppins font-bold text-white">$29.9</p>
              <p className="text-text-secondary text-sm font-sans mb-6">per month</p>
              <div className="mt-6">
                <button className="btn btn-primary w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold font-poppins">Upgrade to Premium</button>
              </div>
            </div>
            {/* Invite Code Tier */}
            <div className="bg-dark-200 rounded-lg p-8 border border-dark-300">
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Invite Code</h2>
              <p className="text-text font-sans mb-4">One-time purchase for lifetime access</p>
              <ul className="text-text text-left mb-6 space-y-2 font-sans text-sm">
                <li>✓ Lifetime access to basic features</li>
                <li>✓ Ability to upgrade to Premium</li>
                <li>✓ Early access to new features</li>
              </ul>
              <p className="text-3xl font-poppins font-bold text-white">$25</p>
              <p className="text-text-secondary text-sm font-sans mb-6">lifetime</p>
              <div className="mt-6">
                <Link href="/store" className="btn btn-primary w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold font-poppins">Purchase Invite Code</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
} 