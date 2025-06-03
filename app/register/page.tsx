import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

export default function RegisterPage() {
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
        <Card className="w-full max-w-md border border-dark-300 bg-dark-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white font-poppins">Register an account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-text-DEFAULT font-poppins font-medium">Username</Label>
              <Input id="username" type="text" className="font-sans" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-text-DEFAULT font-poppins font-medium">Password</Label>
              <Input id="password" type="password" className="font-sans" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-text-DEFAULT font-poppins font-medium">Email</Label>
              <Input id="email" type="email" className="font-sans" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="invite" className="text-text-DEFAULT font-poppins font-medium">Invite Code</Label>
                <Link href="#" className="text-primary-400 text-sm font-poppins font-semibold hover:underline">What's this?</Link>
              </div>
              <Input id="invite" type="text" className="font-sans" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="form-checkbox text-primary-600" /> {/* Using basic input for now, replace with ShadCN Checkbox if needed */}
              <label
                htmlFor="terms"
                className="text-sm font-sans leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-DEFAULT"
              >
                I have read and agree to the <Link href="#" className="text-primary-400 font-poppins font-semibold hover:underline">TOS</Link>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
             <button type="button" className="w-full btn btn-primary bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded font-poppins"> {/* Using basic button for now, replace with ShadCN Button if needed */}
               Register
             </button>
             <p className="text-center text-sm text-text-DEFAULT font-sans">
               Already have an account? <Link href="/login" className="text-primary-400 font-poppins font-semibold hover:underline">Login</Link>
             </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 