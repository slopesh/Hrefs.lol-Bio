"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, Send, ArrowUp, MoreHorizontal, ShoppingCart, FolderOpen, CreditCard, ChevronRight } from 'lucide-react'; // Importing icons from lucide-react as used elsewhere
import { cn } from '@/lib/utils'; // Assuming cn utility exists

// Placeholder data for accounts (matching structure from screenshot)
const accounts = [
  { name: 'Main Savings', description: 'Personal savings', balance: '$8,459.45', icon: <FolderOpen className="w-5 h-5 text-green-500" /> },
  { name: 'Checking Account', description: 'Daily expenses', balance: '$2,850.00', icon: <CreditCard className="w-5 h-5 text-blue-500" /> },
  { name: 'Investment Portfolio', description: 'Stock & ETFs', balance: '$15,230.80', icon: <ArrowUp className="w-5 h-5 text-purple-500 rotate-45" /> },
  { name: 'Credit Card', description: 'Pending charges', balance: '$1,200.00', icon: <CreditCard className="w-5 h-5 text-red-500" /> },
  { name: 'Savings Account', description: 'Emergency fund', balance: '$3,000.00', icon: <FolderOpen className="w-5 h-5 text-green-500" /> },
];

// Placeholder data for recent transactions (matching structure from screenshot)
const recentTransactions = [
  { description: 'Apple Store Purchase', time: 'Today, 2:45 PM', amount: '-$999.00', icon: <ShoppingCart className="w-5 h-5 text-gray-400" />, trend: 'up' }, // Assuming 'trend' indicates color
  { description: 'Salary Deposit', time: 'Today, 9:00 AM', amount: '$4,500.00', icon: <FolderOpen className="w-5 h-5 text-gray-400" />, trend: 'down' },
  { description: 'Netflix Subscription', time: 'Yesterday', amount: '-$15.99', icon: <CreditCard className="w-5 h-5 text-gray-400" />, trend: 'up' },
  { description: 'Apple Store Purchase', time: 'Today, 2:45 PM', amount: '-$999.00', icon: <ShoppingCart className="w-5 h-5 text-gray-400" />, trend: 'up' },
  { description: 'Supabase Subscription', time: 'Yesterday', amount: '-$15.99', icon: <FolderOpen className="w-5 h-5 text-gray-400" />, trend: 'up' },
  { description: 'Vercel Subscription', time: 'Yesterday', amount: '-$15.99', icon: <CreditCard className="w-5 h-5 text-gray-400" />, trend: 'up' },
];

export default function FinanceOverviewPage() {
  const totalBalance = accounts.reduce((sum, account) => sum + parseFloat(account.balance.replace(/[^0-9.-]+/g,"")), 0);

  return (
    <div className="p-8"> {/* Added padding for content */}
      <h1 className="text-3xl font-bold text-white mb-8">Finance Overview</h1> {/* Title for the page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Accounts Section */}
        <Card className="lg:col-span-2 bg-[#181818] border-[#232323] rounded-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-white">Accounts</CardTitle>
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Total Balance</p>
              <p className="text-3xl font-bold text-white">{totalBalance.toFixed(2)}</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase">Your Accounts</p>
              {accounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-[#232323]"> {/* Background for icon */}
                      {account.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{account.name}</p>
                      <p className="text-sm text-gray-400">{account.description}</p>
                    </div>
                  </div>
                  <p className="text-white font-semibold">{account.balance}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#232323]">
              <Button variant="outline" className="border-[#232323] text-white hover:bg-[#232323] hover:border-white/20"><Plus className="mr-2 h-4 w-4" /> Add</Button>
              <Button variant="outline" className="border-[#232323] text-white hover:bg-[#232323] hover:border-white/20"><Send className="mr-2 h-4 w-4" /> Send</Button>
              <Button variant="outline" className="border-[#232323] text-white hover:bg-[#232323] hover:border-white/20"><ArrowUp className="mr-2 h-4 w-4" /> Top-up</Button>
              <Button variant="outline" className="border-[#232323] text-white hover:bg-[#232323] hover:border-white/20"><MoreHorizontal className="mr-2 h-4 w-4" /> More</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Section */}
        <Card className="bg-[#181818] border-[#232323] rounded-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-white">Recent Transactions</CardTitle>
            <span className="text-sm text-gray-400">This Month</span> {/* Placeholder text */}
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-400">{recentTransactions.length} transactions</p>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-[#232323]"> {/* Background for icon */}
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-400">{transaction.time}</p>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-1 text-sm font-semibold", transaction.trend === 'up' ? 'text-red-500' : 'text-green-500')}> {/* Apply color based on trend */}
                    <span>{transaction.amount}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
             <div className="pt-4 border-t border-[#232323]">
                <Button variant="outline" className="w-full border-[#232323] text-white hover:bg-[#232323] hover:border-white/20">View All Transactions</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 