import Link from 'next/link'
import { FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi'
import BioCard from './components/BioCard'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    // GSAP Animations

    // Hero Section Timeline
    const heroTimeline = gsap.timeline();

    heroTimeline.from(".hero-title", {
      y: 50, // Movement from 50px down
      opacity: 0,
      duration: 0.8,
      ease: "expo.out", // Ensure expo.out ease
    });

    heroTimeline.from(".username-claimer", {
      y: 30, // Adjusted movement for cohesion
      opacity: 0,
      duration: 0.8,
      delay: 0.2, // Adjusted delay
      ease: "expo.out", // Ensure expo.out ease
    }, "-=0.4"); // Start this animation 0.4 seconds before the end of the previous one

    // Bio Cards Animation
    gsap.from(".bio-card-example", {
      y: 80, // Movement from 80px down
      opacity: 0,
      duration: 1,
      ease: "expo.out", // Ensure expo.out ease
      stagger: 0.2, // Stagger effect
      scrollTrigger: {
        trigger: ".bio-card-example",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Featured User Cards Animation
    gsap.from(".featured-user-card", {
      y: 40, // Adjusted movement
      opacity: 0,
      duration: 0.7, // Slightly shorter duration
      ease: "expo.out", // Ensure expo.out ease
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".featured-users-section",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Learn More Arrow Animation
    gsap.to(".learn-more-arrow", {
      y: 5,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut", // Keep this ease for the pulsing effect
    });

    // Featured User Card Hover Animation
    gsap.utils.toArray<HTMLElement>(".featured-user-card").forEach(card => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.inOut",
        paused: true,
        onComplete: () => { gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.inOut" }); },
      });

      card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power1.inOut" }));
      card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.inOut" }));
    });

  }, []);

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

      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative isolate overflow-hidden py-14 border-b border-dark-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 rounded-xl border border-dark-300 p-6">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl hero-title font-poppins">
                Your Bio Link,
                <br />
                <span className="text-primary-400">Elevated</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-text-DEFAULT max-w-md mx-auto font-sans">
                Create a stunning bio page that stands out. Add your links, customize your style,
                and share your story with the world.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 username-claimer">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-text-secondary sm:text-sm font-sans">href.lol/</span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full rounded-md border border-dark-300 bg-dark-200 py-2 pl-[4.5rem] pr-3 text-text-DEFAULT placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 font-sans"
                    placeholder="username"
                  />
                </div>
                <button type="button" className="btn btn-primary bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded font-poppins">
                  Claim Your Link
                </button>
              </div>
            </div>
          </div>

          {/* Background gradient */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          {/* Background gradient */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
          </div>
        </div>

        {/* Featured Users Section */}
        <div className="relative overflow-hidden py-20 sm:py-28 bg-dark-100 border-b border-dark-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center rounded-xl border border-dark-300 p-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-12 font-poppins">
              What are you waiting for? Join the other <span className="text-primary-400">14,958</span> users.
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Placeholder for featured user cards - replace with actual data mapping */}
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @sheng
              </div>
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @jshy
              </div>
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @certii
              </div>
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @unslayy
              </div>
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @dma
              </div>
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @hoax
              </div>
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm border border-primary-400 featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer">
                @xootzie
              </div> {/* Example featured card highlight */}
              <div className="w-36 h-16 rounded-md bg-dark-200 flex items-center justify-center text-text-DEFAULT text-sm featured-user-card font-sans transition-transform duration-200 hover:scale-105 cursor-pointer border border-dark-300">
                @maybescripted
              </div>
              {/* Add more placeholders as needed */}
            </div>
          </div>
        </div>

        {/* Example Bios Section */}
        <div className="relative overflow-hidden py-20 sm:py-28 border-b border-dark-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 rounded-xl border border-dark-300 p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl mb-12 font-poppins">See what you can create on href.lol</h2>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                {/* Example bio card 1 */}
                <div className="bio-card-example">
                  <BioCard
                    username="Aiden"
                    avatarUrl="/images/aiden-avatar.png" // Replace with actual image path
                    description="Owner/Dev @ E-Z Services"
                    socialLinks={[
                      { icon: '👤', url: '#' },
                      { icon: '💎', url: '#' },
                      { icon: '🔗', url: '#' },
                      { icon: '🎮', url: '#' },
                      { icon: '📧', url: '#' },
                      { icon: '🤖', url: '#' },
                    ]}
                    musicPlayer={{
                      track: 'what was the last thing u said',
                      artist: 'aldn; glaive',
                      duration: '03:47',
                    }}
                    backgroundImage="/images/aiden-background.jpg" // Placeholder background image
                  />
                </div>
                {/* Example bio card 2 */}
                <div className="bio-card-example">
                  <BioCard
                    username="tsoxas"
                    avatarUrl="/images/tsoxas-avatar.png" // Replace with actual image path
                    description="Dev @ E-Z Services"
                    socialLinks={[
                      { icon: '</>', url: '#' },
                      { icon: '🎯', url: '#' },
                      { icon: '🌐', url: '#' },
                      { icon: '📧', url: '#' },
                      { icon: '🎮', url: '#' },
                      { icon: '🎧', url: '#' },
                      { icon: '💼', url: '#' },
                    ]}
                    musicPlayer={{
                      track: 'Jasiah - Shenanigans (feat. Yung Bans)',
                      artist: '',
                      duration: '02:18',
                    }}
                    backgroundImage="/images/tsoxas-background.jpg" // Placeholder background image
                  />
                </div>
              </div>
              <div className="mt-16 flex justify-center">
                <a href="#features" className="text-text-secondary text-sm font-semibold leading-6 hover:text-text-DEFAULT flex items-center transition-colors duration-200 font-sans">
                  Learn More
                  <span className="ml-2 text-xl learn-more-arrow">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 border-b border-dark-300">
          <div className="mx-auto max-w-2xl lg:text-center rounded-xl border border-dark-300 p-6">
            <h2 className="text-base font-semibold leading-7 text-primary-400 font-poppins">Everything you need</h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl font-poppins">
              Features that make your bio page shine
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col rounded-xl border border-dark-300 bg-dark-200 p-6 shadow-lg">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white font-poppins">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-DEFAULT font-sans">
                    <p className="flex-auto font-sans">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Footer */}
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
      </main>
    </div>
  )
}

const features = [
  {
    name: 'Beautiful Themes',
    description: 'Choose from multiple modern themes and layouts to match your style.',
  },
  {
    name: 'Custom Domains',
    description: 'Connect your own domain or use our href.lol subdomain.',
  },
  {
    name: 'Analytics',
    description: 'Track your profile views and link clicks with detailed analytics.',
  },
  {
    name: 'Badge System',
    description: 'Show off your achievements with custom badges on your profile.',
  },
  {
    name: 'Mobile First',
    description: 'Your bio page looks great on any device, from mobile to desktop.',
  },
  {
    name: 'AI Powered',
    description: 'Let AI help you create the perfect bio page with our smart generator.',
  },
]