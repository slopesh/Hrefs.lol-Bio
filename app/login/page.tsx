'use client';

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Footer from '@/components/ui/footer';

// Logo component
const HrefLogo = () => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-link w-12 h-12 text-white mb-4"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.7" />
    </svg>
  </motion.div>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Handle login logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async op
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-[#181818] border-[#232323] rounded-2xl p-6">
            <CardHeader className="items-center text-center pb-6">
              <HrefLogo />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Log In to Your Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                  >
                    <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-400">
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="grid gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-3">
                  <Label htmlFor="identifier" className="text-white/80">Username or Email</Label>
                  <Input 
                    id="identifier" 
                    type="text" 
                    placeholder="Enter username or email" 
                    required 
                    className={cn(
                      "bg-[#232323] border-[#232323] text-white",
                      "placeholder:text-white/50 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="password" className="text-white/80">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter password" 
                    required 
                    className={cn(
                      "bg-[#232323] border-[#232323] text-white",
                      "placeholder:text-white/50 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className={cn(
                    "w-full bg-white text-black hover:bg-white/90",
                    "transition-all duration-300",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Logging In...
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center text-sm mt-4">
              <Link href="/register" className="text-white/60 hover:text-white transition-colors duration-200">
                Don't have an account? Register
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}