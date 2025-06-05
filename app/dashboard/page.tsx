'use client';

import Link from 'next/link';
import { LayoutDashboard, Settings, LogOut, User, BarChart2, CreditCard, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils'; // Assuming you have a utility to format currency
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils'; // Assuming cn utility is here or imported elsewhere
import { BadgesAchievements } from '@/components/dashboard/badges-achievements';
import { SocialConnections } from "@/components/dashboard/social-connections";

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
  volume: number;
}

interface RecentTransaction {
  id: string;
  userName: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  userInitial: string;
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

// This will be the main dashboard overview page
export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactionData, setTransactionData] = useState<MonthlyTransactionData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [badgesData, setBadgesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionData, setConnectionData] = useState<ConnectionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, transactionsRes, badgesRes, connectionsRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/transactions-overview'),
          fetch('/api/dashboard/badges'),
          fetch('/api/dashboard/connections')
        ]);

        if (!statsRes.ok || !transactionsRes.ok || !badgesRes.ok || !connectionsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [stats, transactions, badges, connections] = await Promise.all([
          statsRes.json(),
          transactionsRes.json(),
          badgesRes.json(),
          connectionsRes.json()
        ]);

        setStats(stats);
        setTransactionData(transactions);
        setBadgesData(badges);
        setConnectionData(connections);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to format percentage change with sign and color
  const formatPercentageChange = (change: number) => {
    const colorClass = change >= 0 ? 'text-green-500' : 'text-red-500';
    const sign = change > 0 ? '+' : '';
    return <span className={colorClass}>{`${sign}${change}%`}</span>;
  };

   // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-[#181818] text-white text-sm rounded-md border border-[#232323] shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          <p>{`Volume: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };


  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-red-500">Error: {error}</div>;
  }

  // Render dashboard only if stats are available (transactionData and recentTransactions might be empty)
  if (!stats) {
      return null; // Or a fallback UI
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins">
      {/* Assuming sidebar is handled in a layout file - main content area below */}
      <main className="flex flex-1 flex-col p-8 md:p-10">

        {/* Dashboard Header */}
        <div className="flex items-center justify-between space-y-2 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-400">Overview of your platform statistics and performance.</p>
          </div>
          {/* Optional: Add header actions like date picker or filter */}
        </div>

        {/* Stats Cards Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* New Users Card */}
          <Card className="bg-[#181818] border-[#232323] rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
              <User className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newUsersToday}</div>
              <p className="text-xs text-gray-400">{formatPercentageChange(stats.newUsersPercentageChange)} from yesterday</p>
            </CardContent>
          </Card>

          {/* Total Users Card */}
           <Card className="bg-[#181818] border-[#232323] rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-400">{formatPercentageChange(stats.totalUsersPercentageChange)} from last week</p>
            </CardContent>
          </Card>

          {/* Transactions Today Card */}
           <Card className="bg-[#181818] border-[#232323] rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.transactionsToday)}</div>
              <p className="text-xs text-gray-400">{formatPercentageChange(stats.transactionsPercentageChange)} from yesterday</p>
            </CardContent>
          </Card>

          {/* Non-Users Card */}
           <Card className="bg-[#181818] border-[#232323] rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Non-Users</CardTitle>
              <User className="h-4 w-4 text-gray-400" /> {/* Using User icon as a placeholder */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.nonUsers}</div>
              <p className="text-xs text-gray-400">{formatPercentageChange(stats.nonUsersPercentageChange)} from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges & Achievements Section */}
        {badgesData && (
          <div className="mb-8">
            <BadgesAchievements
              badges={badgesData.badges}
              achievements={badgesData.achievements}
              isPremium={badgesData.isPremium}
              premiumExpiresAt={badgesData.premiumExpiresAt}
            />
          </div>
        )}

        {/* Social Connections Section */}
        {connectionData && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Social Connections</h2>
            <SocialConnections
              social={connectionData.social}
              websites={connectionData.websites}
              total={connectionData.total}
            />
          </div>
        )}

        {/* Transaction Overview and Recent Transactions Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Transaction Overview Chart */}
          <Card className="col-span-2 bg-[#181818] border-[#232323] rounded-lg">
            <CardHeader>
              <CardTitle>Transaction Overview</CardTitle>
              <CardDescription>Transaction volume over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-60">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transactionData} margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#232323" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" tickFormatter={(value) => formatCurrency(value, '', 'en-US')} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#232323' }} />
                            <Bar dataKey="volume" fill="#38bdf8" />
                        </BarChart>
                     </ResponsiveContainer>
                </div>
            </CardContent>
          </Card>

          {/* Recent Transactions List */}
          <Card className="col-span-1 bg-[#181818] border-[#232323] rounded-lg">
             <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest transactions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                    {recentTransactions.length > 0 ? (
                        recentTransactions.map(transaction => (
                            <div key={transaction.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-md bg-[#232323]">
                                         <div className="w-6 h-6 flex items-center justify-center text-white text-sm font-semibold">{transaction.userInitial}</div>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{transaction.userName}</p>
                                        <p className="text-sm text-gray-400">{transaction.date}</p>
                                    </div>
                                </div>
                                <div className={cn("flex items-center gap-1 text-sm font-semibold", transaction.type === 'credit' ? 'text-green-500' : 'text-red-500')}>
                                    <span>{formatCurrency(transaction.amount)}</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        ))
                    ) : (
                         <div className="h-full flex items-center justify-center text-gray-400">
                            No recent transactions.
                        </div>
                    )}
                 </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 