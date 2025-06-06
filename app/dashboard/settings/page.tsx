"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
// NOTE: Temporarily commented out due to import issues. Will use simple divs for messages.
// import { Alert, AlertDescription } from '@/components/ui/alert';


// Placeholder for footer (can be a separate component later) - Assuming it's in a layout or separate file
// const Footer = () => (
//   <footer className="border-t border-dark-300 bg-dark-200/50 backdrop-blur-sm py-12">
//     <div className="mx-auto max-w-7xl px-6 lg:px-8">
//       <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
//         {/* Logo Area */}
//         <div className="flex items-center">
//           {/* Placeholder for Logo */}
//           <span className="text-2xl font-bold text-white font-poppins">href.lol</span>
//         </div>

//         {/* Footer Links */}
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="text-center md:text-left">
//             <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Contact</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Abuse</a></li>
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Privacy</a></li>
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Support</a></li>
//             </ul>
//           </div>
//           <div className="text-center md:text-left">
//             <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Information</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Terms of Service</a></li>
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Platform Guidelines</a></li>
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">Privacy Policy</a></li>
//               <li><a href="#" className="text-text-secondary hover:text-text-DEFAULT text-sm font-sans transition-colors duration-200">FAQ</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="mt-8 border-t border-dark-300 pt-8 text-center">
//         <p className="text-text-secondary text-sm font-sans">
//           &copy; {new Date().getFullYear()} href.lol. All rights reserved. Est. 2025.
//         </p>
//       </div>
//     </div>
//   </footer>
// );

// Define interface for user settings data structure
interface UserSettings {
  id: string; // User ID
  username: string;
  name: string | null; // Display name
  bio: string | null; // Bio
  alias: string | null; // Premium feature
  customDomain: string | null; // Premium feature
  isPremium: boolean; // Premium status
  // Add other settings fields you might need here (e.g., email, 2FA status)
}

export default function UserSettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch user settings when the page loads or session changes
  useEffect(() => {
    const fetchSettings = async () => {
      // Ensure session, user, and user id are available before fetching
      if (!session?.user?.id) {
        setLoading(false);
        // Optionally redirect to login or show an unauthorized message
        return;
      }

      try {
        setLoading(true);
        setError(null); // Clear previous errors
        // Assuming an API route like /api/user/[id] that returns UserSettings structure
        const res = await fetch(`/api/user/${session.user.id}`);
        if (!res.ok) {
          throw new Error(`Error fetching settings: ${res.statusText}`);
        }
        const data: UserSettings = await res.json(); // Cast data to UserSettings type
        setSettings(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Failed to fetch user settings:', error);
        setError(`Failed to load settings: ${error.message}`);
        setLoading(false);
      }
    };

    if (session) {
      fetchSettings();
    } else {
       // Handle cases where session is not available, e.g., redirect to login
       setLoading(false);
       // router.push('/login'); // Example redirect if using Next.js router
    }
  }, [session]); // Re-run effect if session changes

  // Handle input changes and update state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings!, // Use non-null assertion since settings is checked in handleSaveSettings
      [name]: value
    }));
  };

  // Handle saving settings
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings || !session?.user?.id) return; // Prevent saving if settings or user ID are not available

    setSaving(true);
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success

    try {
      // Assuming an API endpoint like /api/user/[id] handles PUT or PATCH requests
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: 'PUT', // Or PATCH, depending on your API design
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings), // Send the updated settings object
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save settings');
      }

      setSuccess('Settings saved successfully!');
      // Optional: Refetch settings after successful save to ensure UI is fully updated
      // fetchSettings();

    } catch (error: any) {
      console.error('Error saving user settings:', error);
      setError(`Failed to save settings: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Display loading state
  if (loading) {
    return <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins items-center justify-center">Loading settings...</div>;
  }

  // Display error if settings could not be loaded
  if (error && !settings) { // Only show this error if loading failed and settings are null
     return <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-red-500 font-poppins items-center justify-center">Error: {error}</div>;
  }


  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins overflow-hidden">
      {/* Navigation - Assuming a consistent header/layout is handled elsewhere */}
      {/* Add your dashboard navigation/sidebar component here if not using a layout file */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-0">
        <div className="mx-auto w-full max-w-4xl">
          <motion.h1
            className="text-4xl font-poppins font-bold tracking-tight text-white sm:text-5xl mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            User Settings
            </motion.h1>
          <motion.form
            onSubmit={handleSaveSettings}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             <AnimatePresence>
              {/* Display error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-red-500/10 border-red-500/20 p-4 rounded-lg text-red-400">
                    {error}
                  </div>
                </motion.div>
              )}
              {/* Display success message */}
               {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-green-500/10 border-green-500/20 p-4 rounded-lg text-green-400">
                    {success}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Settings Section */}
            <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">Profile Settings</CardTitle>
                <CardDescription className="font-poppins text-gray-400">Manage your public profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username" className="font-poppins text-white">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Your username"
                    value={settings.username}
                    onChange={handleInputChange}
                    className="bg-[#232323] border-none text-white rounded-xl font-poppins focus:ring-2 focus:ring-white focus:outline-none"
                   />
                </div>
                 <div>
                  <Label htmlFor="name" className="font-poppins text-white">Display Name</Label>
                  <Input
                     id="name"
                     name="name"
                     placeholder="Your display name"
                     value={settings.name || ''} // Use empty string for null
                     onChange={handleInputChange}
                     className="bg-[#232323] border-none text-white rounded-xl font-poppins focus:ring-2 focus:ring-white focus:outline-none"
                   />
                </div>
                 <div>
                  <Label htmlFor="bio" className="font-poppins text-white">Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell us about yourself"
                    value={settings.bio || ''} // Use empty string for null
                    onChange={handleInputChange}
                    className="flex w-full rounded-xl border-none bg-[#232323] text-white px-3 py-2 text-sm placeholder:text-gray-400 font-poppins focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
              </CardContent>
            </Card>

            {/* Premium Settings Section (Conditionally Rendered) */}
             {settings.isPremium && (
               <Card className="bg-[#181818] border-[#232323] rounded-2xl">
                 <CardHeader>
                   <CardTitle className="font-poppins font-semibold text-white">Premium Settings</CardTitle>
                   <CardDescription className="font-poppins text-gray-400">Manage your premium features.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {/* Alias Input */}
                   <div>
                     <Label htmlFor="alias" className="font-poppins text-white">Alias</Label>
                     <Input
                       id="alias"
                       name="alias"
                       placeholder="Your custom alias"
                       value={settings.alias || ''}
                       onChange={handleInputChange}
                       className="bg-[#232323] border-none text-white rounded-xl font-poppins focus:ring-2 focus:ring-white focus:outline-none"
                     />
                   </div>
                   {/* Custom Domain Input */}
                   <div>
                     <Label htmlFor="customDomain" className="font-poppins text-white">Custom Domain</Label>
                     <Input
                       id="customDomain"
                       name="customDomain"
                       placeholder="yourdomain.com"
                       value={settings.customDomain || ''}
                       onChange={handleInputChange}
                       className="bg-[#232323] border-none text-white rounded-xl font-poppins focus:ring-2 focus:ring-white focus:outline-none"
                     />
                   </div>
                 </CardContent>
               </Card>
             )}

            {/* Other Settings Sections (Appearance, Links, Account, Payment) - Keep as placeholders for now */}
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
             {/* Account Settings Section (Remaining) */}
            {/* This card can contain other account-related settings not covered above, like email or password change */}
            {/* <Card className="bg-[#181818] border-[#232323] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-poppins font-semibold text-white">More Account Settings</CardTitle>
                <CardDescription className="font-poppins text-gray-400">Additional account management options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <p className="text-white/80 font-poppins">Other account settings will go here...</p>
              </CardContent>
            </Card> */}
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

            {/* Save Button */}
            <div className="flex justify-center">
              <Button type="submit" className="bg-white text-black hover:bg-white/90 transition-colors duration-200" disabled={saving}>
                 {saving ? (
                   <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                   </div>
                 ) : (
                   'Save Settings'
                 )}
               </Button>
            </div>
          </motion.form>
        </div>
      </main>
      {/* Footer - Assuming a consistent footer is handled elsewhere */}
      {/* <Footer /> */}
    </div>
  );
}