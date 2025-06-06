"use client";

import Link from 'next/link';
import { LayoutDashboard, Settings, LogOut, User, BarChart2, CreditCard, Users, ChevronRight, Eye, MousePointer, Target, Zap, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';
import { formatCurrency } from '@/lib/utils'; // Assuming you have a utility to format currency
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils'; // Assuming cn utility is here or imported elsewhere
import { BadgesAchievements } from '@/components/dashboard/badges-achievements';
import { SocialConnections } from "@/components/dashboard/social-connections";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion'; // Import motion

// Define types for fetched data (adjust based on your API responses)
interface DashboardStats {
  newUsersToday: number;
  totalUsers: number;
  transactionsToday: number;
  nonUsers: number;
  newUsersPercentageChange: number;
  totalUsersPercentageChange: number;
  transactionsPercentageChange: number;
  nonUsersPercentageChange: number;
}

interface MonthlyTransactionData {
  month: string;
  total: number;
}

interface RecentTransaction {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface ConnectionData {
  social: Array<{
    id: string;
    title: string;
    url: string;
    icon?: string;
  }>;
  websites: Array<{
    id: string;
    title: string;
    url: string;
    icon?: string;
  }>;
  total: number;
}

interface UserData {
  id: string;
  username: string;
  name?: string; // Display name
  isPremium: boolean; // Assuming your user API returns this
  customDomain?: string; // Assuming your user API returns this
  alias?: string; // Assuming your user API returns this for premium users
  // Add other user fields as needed
}

interface BadgesData {
  badges: any[]; // Replace with specific Badge type
  achievements: {
    totalViews: number;
    totalClicks: number;
    totalLinks: number;
    isVerified: boolean;
    isFeatured: boolean;
    daysActive: number;
  };
  isPremium: boolean;
  premiumExpiresAt: Date | null;
}


// Animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// This will be the main dashboard overview page
export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactionData, setTransactionData] = useState<MonthlyTransactionData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [badgesData, setBadgesData] = useState<BadgesData | null>(null); // Use the defined type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionData, setConnectionData] = useState<ConnectionData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); // Use the defined type for user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, transactionsRes, badgesRes, connectionsRes, userRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/transactions-overview'), // Assuming this exists or will be created
          fetch('/api/dashboard/badges'),
          fetch('/api/dashboard/connections'), // Assuming this exists or will be created
          fetch('/api/user') // Assuming an API route to get user data including premium status, alias, custom domain
        ]);

        if (!statsRes.ok) throw new Error(`Failed to fetch stats: ${statsRes.statusText}`);
        // Optional: Add similar checks for other endpoints if they are critical
        // if (!transactionsRes.ok) throw new Error(`Failed to fetch transactions: ${transactionsRes.statusText}`);
        if (!badgesRes.ok) throw new Error(`Failed to fetch badges: ${badgesRes.statusText}`);
        // if (!connectionsRes.ok) throw new Error(`Failed to fetch connections: ${connectionsRes.statusText}`);
        if (!userRes.ok) throw new Error(`Failed to fetch user data: ${userRes.statusText}`);


        const [stats, transactions, badges, connections, user] = await Promise.all([
          statsRes.json(),
          transactionsRes.json(),
          badgesRes.json(),
          connectionsRes.json(),
          userRes.json() // Fetching user data
        ]);

        setStats(stats);
        setTransactionData(transactions);
        setBadgesData(badges);
        setConnectionData(connections);
        setUserData(user); // Set user data
        setLoading(false);
      } catch (error: any) { // Catch error as any for now
        console.error('Error fetching dashboard data:', error);
        setError(`Failed to load dashboard data: ${error.message}`); // Display error message
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to format percentage change with sign and color
  const formatPercentageChange = (change: number | undefined) => {
    if (change === undefined) return '-'; // Handle undefined case
    const colorClass = change >= 0 ? 'text-green-500' : 'text-red-500';
    const sign = change > 0 ? '+' : '';
    return <span className={colorClass}>{`${sign}${change}%`}</span>;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-red-500 font-poppins items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins">
      {/* Assuming sidebar is handled in a layout file - main content area below */}
      {/* Add your sidebar component here if not using a layout file */}
      <main className="flex flex-1 flex-col p-8 md:p-10">

        {/* Dashboard Header */}
        <motion.div
          className="flex items-center justify-between space-y-2 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-400">Overview of your account and bio page performance.</p>
          </motion.div>
          {/* Optional: Add header actions like date picker or filter */}
        </motion.div>

        {/* Account Overview Section */}
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8" // Adjusted grid columns
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Username Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-[#181818] border-[#232323] rounded-lg h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Username</CardTitle> {/* Adjusted text color */}
                <User className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="flex flex-col h-full justify-between">
                <div>
                   <div className="text-2xl font-bold">{userData?.username || 'Loading...'}</div>
                   <p className="text-xs text-gray-400 mt-1">Change available in Settings</p>
                </div>
                 {/* Optional: Add an edit button here linking to settings */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Alias Card (Premium Feature) */}
          <motion.div variants={itemVariants}>
            <Card className={`bg-[#181818] border-[#232323] rounded-lg h-full ${!userData?.isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}> {/* Apply opacity if not premium */}
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Alias</CardTitle> {/* Adjusted text color */}
                 <Users className="h-4 w-4 text-gray-400" />
               </CardHeader>
               <CardContent className="flex flex-col h-full justify-between">
                 <div>
                   {/* Display user's alias if premium and set, otherwise "Unavailable" or a premium prompt */}
                   <div className="text-2xl font-bold">{userData?.isPremium && userData?.alias ? userData.alias : 'Unavailable'}</div>
                   <p className="text-xs text-gray-400 mt-1">
                     {userData?.isPremium ? 'Change available in Settings' : 'Upgrade to Premium to set alias'} {/* Dynamic text */}
                    </p>
                 </div>
                 {/* Optional: Link to premium upsell if not premium */}
                  {!userData?.isPremium && (
                     <Link href="/premium" passHref> {/* Link to your premium page */}
                       <span className="text-purple-500 hover:underline cursor-pointer text-sm">Learn More</span>
                     </Link>
                   )}
               </CardContent>
             </Card>
          </motion.div>

          {/* UID Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-[#181818] border-[#232323] rounded-lg h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">UID</CardTitle>
                <button
                  onClick={() => navigator.clipboard.writeText(userData?.id || '')}
                  title="Copy UID"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="flex flex-col h-full justify-between">
                <div>
                   <div className="text-2xl font-bold">{userData?.id || 'Loading...'}</div>
                   {/* This "Among the first 1%" text is likely static or based on internal ranking, keep as placeholder for now */}
                   <p className="text-xs text-gray-400 mt-1">Among the first 1%</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Views Card */}
           <motion.div variants={itemVariants}>
             <Card className="bg-[#181818] border-[#232323] rounded-lg h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Profile Views</CardTitle> {/* Adjusted text color */}
                <Eye className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="flex flex-col h-full justify-between">
                <div>
                   {/* Using totalViews from badgesData as profile views for now */}
                   {/* Ensure badgesData and achievements are not null before accessing */}
                   <div className="text-2xl font-bold">{badgesData?.achievements?.totalViews ?? 0}</div> {/* Use nullish coalescing */}
                   {/* This "+1 views since last 7 days" text is likely dynamic, keep as placeholder for now */}
                   <p className="text-xs text-gray-400 mt-1">+1 views since last 7 days</p>
                </div>
               </CardContent>
             </Card>
           </motion.div>
        </motion.div>

        {/* Account Statistics Section - Profile Completion */}
        <motion.div
           className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8" // Adjusted grid columns
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
           <motion.div variants={itemVariants}>
             <Card className="bg-[#181818] border-[#232323] rounded-lg h-full"> {/* Added h-full */}
               <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Account Statistics</CardTitle>
                  <CardDescription className="text-gray-400">Your progress towards a complete profile.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  {/* Profile Completion Bar - Placeholder */}
                 <div className="w-full bg-[#232323] rounded-full h-2.5">
                   {/* The width of this div should be dynamic based on completion percentage */}
                   <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '60%' }}></div> {/* Placeholder width */}
                 </div>
                 <p className="text-sm text-gray-400 text-right">60% completed</p> {/* Placeholder text */}

                 {/* Profile Completion Checklist/Actions */}
                 <div className="space-y-3">
                   {/* Each of these should ideally be dynamic based on user data */}
                   <div className="flex items-center justify-between cursor-pointer hover:bg-[#232323] p-2 rounded-md transition-colors duration-200"> {/* Added hover effect */}
                      <div className="flex items-center gap-3">
                         {/* Icon based on completion status - Placeholder. Use a checkmark or similar for completed */}
                         <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><ChevronRight size={16} /></div> {/* Placeholder icon */}
                         <span className="text-white">Upload An Avatar</span>
                       </div>
                      <ChevronRight size={16} className="text-gray-400" />
                   </div>
                    {/* Repeat for other completion items */}
                    <div className="flex items-center justify-between cursor-pointer hover:bg-[#232323] p-2 rounded-md transition-colors duration-200"> {/* Added hover effect */}
                      <div className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><ChevronRight size={16} /></div> {/* Placeholder icon */}
                         <span className="text-white">Add A Description</span>
                       </div>
                      <ChevronRight size={16} className="text-gray-400" />
                   </div>
                   <div className="flex items-center justify-between cursor-pointer hover:bg-[#232323] p-2 rounded-md transition-colors duration-200"> {/* Added hover effect */}
                      <div className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-white"><ChevronRight size={16} /></div> {/* Placeholder icon */}
                         <span className="text-gray-400">Link Discord Account</span>
                       </div>
                       <ChevronRight size={16} className="text-gray-400" />
                   </div>
                   <div className="flex items-center justify-between cursor-pointer hover:bg-[#232323] p-2 rounded-md transition-colors duration-200"> {/* Added hover effect */}
                      <div className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><ChevronRight size={16} /></div> {/* Placeholder icon */}
                         <span className="text-white">Add Socials</span>
                       </div>
                       <ChevronRight size={16} className="text-gray-400" />
                   </div>
                    <div className="flex items-center justify-between cursor-pointer hover:bg-[#232323] p-2 rounded-md transition-colors duration-200"> {/* Added hover effect */}
                      <div className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-white"><ChevronRight size={16} /></div> {/* Placeholder icon */}
                         <span className="text-gray-400">Enable 2FA</span>
                       </div>
                       <ChevronRight size={16} className="text-gray-400" />
                   </div>
                 </div>
               </CardContent>
             </Card>
           </motion.div>

            {/* Manage Your Account Section */}
           <motion.div variants={itemVariants}>
              <Card className="bg-[#181818] border-[#232323] rounded-lg h-full"> {/* Added h-full */}
                 <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Manage your account</CardTitle>
                    <CardDescription className="text-gray-400">Change your email, username and more.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {/* Navigation Links for Account Settings */}
                   <Link href="/dashboard/settings" passHref>
                      <motion.div
                         className="flex items-center justify-between bg-[#232323] p-3 rounded-md cursor-pointer hover:bg-[#282828] transition-colors duration-200"
                         whileHover={{ x: 5 }} // Simple hover animation
                      >
                         <div className="flex items-center gap-3">
                           <User size={20} className="text-gray-400" />
                           <span className="text-white font-poppins">Account Settings</span>
                         </div>
                         <ChevronRight size={20} className="text-gray-400" />
                      </motion.div>
                   </Link>
                   {/* Placeholder for other management options like billing */}
                    <motion.div // Example: Link to Payment Settings
                         className="flex items-center justify-between bg-[#232323] p-3 rounded-md cursor-pointer hover:bg-[#282828] transition-colors duration-200"
                         whileHover={{ x: 5 }} // Simple hover animation
                      >
                         <div className="flex items-center gap-3">
                           <CreditCard size={20} className="text-gray-400" />
                           <span className="text-white font-poppins">Payment Settings</span> {/* Adjusted text color */}
                         </div>
                         <ChevronRight size={20} className="text-gray-400" />
                      </motion.div>
                 </CardContent>
              </Card>
           </motion.div>
        </motion.div>

        {/* Account Analytics Section - Placeholder for Graph and Devices */}
        <motion.div
           className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8" // Adjusted grid columns
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
           <motion.div variants={itemVariants} className="lg:col-span-2"> {/* Allow graph to span two columns on large screens */}
             <Card className="bg-[#181818] border-[#232323] rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Account Analytics</CardTitle>
                  <CardDescription className="text-gray-400">Detailed insights into your bio page performance.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-8">
                 {/* Placeholder for Analytics Graph */}
                 {/* You would integrate a charting library like Recharts here */}
                 <div className="h-64 w-full bg-[#232323] rounded-md flex items-center justify-center text-gray-400">
                    Analytics Graph Placeholder
                 </div>

                 {/* Placeholder for Visitor Devices/Geography etc. */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-[#232323] p-4 rounded-md">
                     <h3 className="text-lg font-semibold text-white mb-2">Visitor Devices (Last 7 Days)</h3>
                     {/* Display device data here */}
                     <p className="text-gray-400">Device data will appear here...</p>
                   </div>
                    <div className="bg-[#232323] p-4 rounded-md">
                     <h3 className="text-lg font-semibold text-white mb-2">Top Referrers (Last 7 Days)</h3>
                      {/* Display referrer data here */}
                     <p className="text-gray-400">Referrer data will appear here...</p>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </motion.div>
        </motion.div>


        {/* Badges & Achievements Section (Keeping existing structure) */}
        {badgesData && (
          <motion.div variants={itemVariants} className="mb-8">
            <BadgesAchievements
              badges={badgesData.badges}
              achievements={badgesData.achievements}
              isPremium={badgesData.isPremium}
              premiumExpiresAt={badgesData.premiumExpiresAt}
            />
          </motion.div>
        )}

        {/* Social Connections Section (Keeping existing structure) */}
        {connectionData && (
          <motion.div variants={itemVariants} className="mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Social Connections</h2>
            <SocialConnections
              social={connectionData.social}
              websites={connectionData.websites}
              total={connectionData.total}
            />
          </motion.div>
        )}

        {/* Transaction Overview and Recent Transactions Section (Keeping existing structure) */}
        {/* You might want to move this to a separate /dashboard/finance page or integrate */}
        {/* it differently depending on your final dashboard layout. */}
        {/* Keeping the existing structure for now. */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-8">
          {/* Monthly Revenue Chart */}
          {transactionData && transactionData.length > 0 && (
             <motion.div variants={itemVariants}>
              <Card className="bg-[#181818] border-[#232323] rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Monthly Revenue</CardTitle>
                  <CardDescription className="text-gray-400">Overview of your revenue over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={transactionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#232323" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value}`} />
                        <Tooltip cursor={{ fill: '#232323' }} contentStyle={{ backgroundColor: '#181818', border: '1px solid #232323', borderRadius: '8px' }} itemStyle={{ color: '#ffffff' }} labelStyle={{ color: '#9ca3af' }}/>
                        <Bar dataKey="total" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
             </motion.div>
          )}

          {/* Recent Transactions */}
          {recentTransactions && recentTransactions.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="bg-[#181818] border-[#232323] rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-gray-400">Your last 5 transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} className="text-gray-400"/>
                          <div>
                            <p className="text-white font-medium">{formatCurrency(transaction.amount)}</p>
                            <p className="text-sm text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${transaction.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>\
                          {transaction.status}
                        </span>
                      </div>
                    ))}\
                  </div>
                </CardContent>\
              </Card>\
            </motion.div>\
          )}\
        </div>\

      </main>
      {/* Assuming footer is in a layout file or separate component */}
      {/* <Footer /> */}
    </div>
  );
}

const features = [
  {
    name: 'Beautiful Themes',
    description: 'Choose from multiple modern themes and layouts to match your style.',
    icon: 'Layout',
  },
  {
    name: 'Custom Domains',
    description: 'Connect your own domain or use our href.lol subdomain.',
    icon: 'Globe',
  },
  {
    name: 'Analytics',
    description: 'Track your profile views and link clicks with detailed analytics.',
    icon: 'BarChart2',
  },
  {
    name: 'Badge System',
    description: 'Show off your achievements with custom badges on your profile.',
    icon: 'Badge',
  },
  {
    name: 'Mobile First',
    description: 'Your bio page looks great on any device, from mobile to desktop.',
    icon: 'Smartphone',
  },
  {
    name: 'AI Powered',
    description: 'Let AI help you create the perfect bio page with our smart generator.',
    icon: 'Bot',
  },
];

// Example data for BioCards (Static for showcase)


// Placeholder for BioCard component - replace with actual import if available
// If BioCard component needs data passed, define interfaces here.

// Example usage within the component render:
// <BioCard userData={exampleUserData} />

// Example User Data Structure (adjust based on your BioCard component props)
// interface UserData {
//   name: string;
//   username: string;
//   title: string;
//   avatar: string;
//   stats: { views: number; links: number; badges: number; featured: boolean };
//   socials: { platform: string; link: string }[];
//   music?: { type: string; title: string; artist: string };
//   lastSaid?: { text: string; by: string; on: string; duration: string };
//   linkPreview?: { title: string; url: string };
// }