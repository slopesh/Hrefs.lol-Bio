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

export default function ShowcasePage() {
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
            {/* Add Showcase link here later */}
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
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins mb-12">Featured href.lol Profiles</h1>

          {/* Showcase Section - Profiles will be loaded and animated here */}
          {/* This section will be controlled by the admin panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Profile Card 1 */}
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 text-text-DEFAULT font-sans">
              <p className="font-semibold">@username1</p>
              <p className="text-sm text-text-secondary mt-2">Short bio or description...</p>
               {/* Placeholder for profile image/preview */}
               <div className="mt-4 h-32 bg-dark-100 rounded"></div>
            </div>

            {/* Placeholder Profile Card 2 */}
             <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 text-text-DEFAULT font-sans">
              <p className="font-semibold">@username2</p>
              <p className="text-sm text-text-secondary mt-2">Short bio or description...</p>
               {/* Placeholder for profile image/preview */}
               <div className="mt-4 h-32 bg-dark-100 rounded"></div>
            </div>

            {/* Placeholder Profile Card 3 */}
             <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 text-text-DEFAULT font-sans">
              <p className="font-semibold">@username3</p>
              <p className="text-sm text-text-secondary mt-2">Short bio or description...</p>
               {/* Placeholder for profile image/preview */}
               <div className="mt-4 h-32 bg-dark-100 rounded"></div>
            </div>

            {/* Add more placeholder cards as needed */}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 