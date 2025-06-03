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

export default function DiscordPage() {
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
      <main className="flex-1 py-12 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins mb-8">Join our Discord</h1>
          <p className="text-text-DEFAULT text-lg mb-8 font-sans">Connect with the community and get support.</p>
          {/* Placeholder for Discord Join Button/Link */}
          <a href="#" className="btn btn-primary bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg text-lg font-poppins transition-colors duration-200">
            Join Discord
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 