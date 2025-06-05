import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// Assume you have a logo component or SVG here
const HrefLogo = () => (
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
);

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle registration logic here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async op
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white font-poppins p-4">
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
              Create Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-white/80">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter username" 
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
               <div className="grid gap-3">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter email" 
                  required 
                  className={cn(
                    "bg-[#232323] border-[#232323] text-white",
                    "placeholder:text-white/50 focus:border-white/20",
                    "transition-all duration-300"
                  )}
                />
              </div>
               <div className="grid gap-3">
                <Label htmlFor="bio-url" className="text-white/80">Bio URL</Label>
                <div className={cn(
                  "flex rounded-xl overflow-hidden",
                  "bg-[#232323] border border-[#232323] focus-within:border-white/20",
                  "transition-all duration-300"
                )}>
                   <span className="px-4 py-3 text-white/60 font-medium">e-z.bio/</span>
                   <Input 
                    id="bio-url" 
                    type="text" 
                    placeholder="yourprofile" 
                    required 
                    className={cn(
                      "flex-1 bg-transparent border-none text-white",
                      "placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}
                   />
                </div>
              </div>
               <div className="grid gap-3">
                <Label htmlFor="invite-code" className="text-white/80 flex items-center justify-between">
                  Invite Code
                   <Link href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium">What's this?</Link>
                 </Label>
                <Input 
                  id="invite-code" 
                  type="text" 
                  placeholder="Optional invite code" 
                   className={cn(
                    "bg-[#232323] border-[#232323] text-white",
                    "placeholder:text-white/50 focus:border-white/20",
                    "transition-all duration-300"
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required className="border-[#232323] data-[state=checked]:bg-white data-[state=checked]:text-black" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-white/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the{' '}
                  <Link href="#" className="underline text-white/80 hover:text-white transition-colors duration-200">Terms of Service</Link>
                </label>
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
                    Registering...
                  </div>
                ) : (
                  'Register'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-sm mt-4">
            <Link href="/login" className="text-white/60 hover:text-white transition-colors duration-200">
              Already have an account? Login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}