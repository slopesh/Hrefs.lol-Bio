import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { motion } from 'framer-motion';
import RegisterForm from './register-form'
import HrefLogo from '@/components/ui/href-logo';
import Footer from '@/components/ui/footer';

export const metadata: Metadata = {
  title: 'Register - href.lol',
  description: 'Create your account on href.lol',
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins overflow-hidden">
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

      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-0">
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
                Create your account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
            <CardFooter className="justify-center text-sm mt-4">
              <Link href="/login" className="text-white/60 hover:text-white transition-colors duration-200">
                Already have an account? Sign in
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 