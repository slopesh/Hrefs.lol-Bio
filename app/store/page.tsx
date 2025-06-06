"use client";

import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Bitcoin, CircleDollarSign } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Footer from '@/components/ui/footer';

gsap.registerPlugin(ScrollTrigger);

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-[#232323] bg-[#0f0f0f] sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-poppins">href.lol</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Store</Link>
            <Link href="/discord" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Discord</Link>
            <Link href="/login" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Login</Link>
            <Link href="/register" className="text-gray-400 hover:text-white font-poppins font-semibold transition-colors">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl"
        >
          <h1 className="text-5xl font-poppins font-bold text-white mb-10">Store</h1>
          
          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#181818]">
              <TabsTrigger 
                value="main"
                className="data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Main Store
              </TabsTrigger>
              <TabsTrigger 
                value="invite"
                className="data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Invite Codes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="main">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-[#181818] border-[#232323] hover:border-white/20 transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-2xl font-poppins">Premium Plan</CardTitle>
                      <CardDescription className="text-gray-400">For power users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">$29.9</span>
                          <span className="text-gray-400 ml-2">/month</span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
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
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-[#181818] border-[#232323] hover:border-white/20 transition-all duration-200 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full">Popular</span>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl font-poppins">BIZ Plan</CardTitle>
                      <CardDescription className="text-gray-400">For businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">$99.9</span>
                          <span className="text-gray-400 ml-2">/month</span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
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
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-[#181818] border-[#232323] hover:border-white/20 transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-2xl font-poppins">Custom Plan</CardTitle>
                      <CardDescription className="text-gray-400">Tailored to your needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">Custom</span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Custom features
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Dedicated support
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            White-label solution
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Custom integration
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Contact Sales
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="invite">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-[#181818] border-[#232323] hover:border-white/20 transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-2xl font-poppins">Single Invite</CardTitle>
                      <CardDescription className="text-gray-400">One-time purchase</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">$25</span>
                          <span className="text-gray-400 ml-2">one-time</span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
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
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-[#181818] border-[#232323] hover:border-white/20 transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-2xl font-poppins">Bundle Pack</CardTitle>
                      <CardDescription className="text-gray-400">5 invite codes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">$100</span>
                          <span className="text-gray-400 ml-2">one-time</span>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            5 invite codes
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            20% discount
                          </li>
                          <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Share with friends
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 