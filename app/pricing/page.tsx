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
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">Abuse</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">Privacy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">Support</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">Platform Guidelines</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-poppins transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-dark-300 pt-8 text-center">
        <p className="text-text-secondary text-sm font-poppins">
          &copy; {new Date().getFullYear()} href.lol. All rights reserved. Est. 2025.
        </p>
      </div>
    </div>
  </footer>
);

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins overflow-hidden">
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

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-poppins font-bold tracking-tight text-white sm:text-5xl mb-4">Simple, transparent pricing</h1>
            <p className="text-lg text-gray-400 font-poppins">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Tier */}
            <div className="bg-[#181818] rounded-2xl p-8 border border-[#232323] hover:border-white/20 transition-all duration-200">
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Free</h2>
              <p className="text-gray-400 font-poppins mb-4">Perfect for personal use</p>
              <ul className="text-gray-300 text-left mb-6 space-y-3 font-poppins text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Customizable bio page
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Unlimited links
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Standard themes
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-3xl font-poppins font-bold text-white">$0</p>
                <p className="text-gray-400 text-sm font-poppins mb-6">forever</p>
                <Link href="/register" className="block w-full py-3 px-4 text-center bg-[#232323] hover:bg-[#2a2a2a] text-white font-poppins font-semibold rounded-lg transition-colors duration-200">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="bg-[#181818] rounded-2xl p-8 border border-[#232323] hover:border-white/20 transition-all duration-200">
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Premium</h2>
              <p className="text-gray-400 font-poppins mb-4">For power users</p>
              <ul className="text-gray-300 text-left mb-6 space-y-3 font-poppins text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  All Free features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom domain
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Premium themes
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No href.lol branding
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-3xl font-poppins font-bold text-white">$29.9</p>
                <p className="text-gray-400 text-sm font-poppins mb-6">per month</p>
                <Link href="/store" className="block w-full py-3 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-poppins font-semibold rounded-lg transition-colors duration-200">
                  Upgrade to Premium
                </Link>
              </div>
            </div>

            {/* BIZ Tier */}
            <div className="bg-[#181818] rounded-2xl p-8 border border-[#232323] hover:border-white/20 transition-all duration-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white text-sm font-poppins px-4 py-1 rounded-full">Popular</span>
              </div>
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">BIZ</h2>
              <p className="text-gray-400 font-poppins mb-4">For businesses</p>
              <ul className="text-gray-300 text-left mb-6 space-y-3 font-poppins text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  All Premium features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multiple team members
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom branding
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  API access
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  White-label solution
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated support
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-3xl font-poppins font-bold text-white">$99.9</p>
                <p className="text-gray-400 text-sm font-poppins mb-6">per month</p>
                <Link href="/store" className="block w-full py-3 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-poppins font-semibold rounded-lg transition-colors duration-200">
                  Get BIZ Plan
                </Link>
              </div>
            </div>

            {/* Invite Code Tier */}
            <div className="bg-[#181818] rounded-2xl p-8 border border-[#232323] hover:border-white/20 transition-all duration-200">
              <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Invite Code</h2>
              <p className="text-gray-400 font-poppins mb-4">One-time purchase</p>
              <ul className="text-gray-300 text-left mb-6 space-y-3 font-poppins text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lifetime access
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Early access
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Upgrade option
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-3xl font-poppins font-bold text-white">$25</p>
                <p className="text-gray-400 text-sm font-poppins mb-6">lifetime</p>
                <Link href="/store" className="block w-full py-3 px-4 text-center bg-[#232323] hover:bg-[#2a2a2a] text-white font-poppins font-semibold rounded-lg transition-colors duration-200">
                  Purchase Code
                </Link>
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