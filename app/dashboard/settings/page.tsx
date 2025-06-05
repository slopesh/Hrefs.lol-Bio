import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function UserSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins overflow-hidden">
      {/* Navigation - Consider a dashboard specific nav later */}
      <nav className="border-b border-[#232323] bg-[#0f0f0f] sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-poppins">href.lol</Link>
          </div>
          {/* Add dashboard specific links here later */}
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
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-4xl font-poppins font-bold tracking-tight text-white sm:text-5xl mb-12 text-center">User Settings</h1>
          <div className="space-y-8">
            {/* Profile Settings Section */}
            <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">Profile Settings</CardTitle>
                <CardDescription className="font-poppins text-gray-400">Manage your public profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username" className="font-poppins text-white">Username</Label>
                  <Input id="username" placeholder="Your username" className="bg-[#232323] border-none text-white rounded-xl font-poppins" />
                </div>
                 <div>
                  <Label htmlFor="bio" className="font-poppins text-white">Bio</Label>
                  <textarea id="bio" rows={4} placeholder="Tell us about yourself" className="flex w-full rounded-xl border-none bg-[#232323] text-white px-3 py-2 text-sm placeholder:text-gray-400 font-poppins focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50"></textarea>
                </div>
              </CardContent>
            </Card>
            {/* Appearance Settings Section */}
            <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">Appearance Settings</CardTitle>
                <CardDescription className="font-poppins text-gray-400">Customize the look of your bio page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 font-poppins">Appearance settings will go here...</p>
              </CardContent>
            </Card>
            {/* Links Settings Section */}
            <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">Links</CardTitle>
                <CardDescription className="font-poppins text-gray-400">Add, edit, and organize your links.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 font-poppins">Link management interface will go here...</p>
              </CardContent>
            </Card>
             {/* Account Settings Section */}
            <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">Account Settings</CardTitle>
                <CardDescription className="font-poppins text-gray-400">Manage your account details and security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 font-poppins">Account settings will go here...</p>
              </CardContent>
            </Card>
             {/* Payment Settings Section */}
            <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">Payment Settings</CardTitle>
                <CardDescription className="font-poppins text-gray-400">View your payment history and manage methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 font-poppins">Payment settings will go here...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
} 