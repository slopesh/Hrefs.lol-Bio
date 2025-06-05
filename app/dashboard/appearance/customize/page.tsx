import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have card components
import { ChevronRight } from 'lucide-react'; // Assuming lucide-react for icons

export default function CustomizeSitePage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Customize Website Appearance</h1>
      <p>This is where you will customize the look and feel of your website, including backgrounds, fonts, colors, and more.</p>
      <p className="mt-4">More customization options will be added here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Background Customization Card */}
        <Link href="/dashboard/appearance/customize/background">
          <Card className="bg-[#181818] border-[#232323] rounded-lg p-6 hover:border-white/20 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold text-white">Background</CardTitle>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Customize your homepage background.</p>
            </CardContent>
          </Card>
        </Link>

        {/* Add more customization categories here later */}
        {/*
        <Link href="/dashboard/appearance/customize/typography">
          <Card className="bg-[#181818] border-[#232323] rounded-lg p-6 hover:border-white/20 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold text-white">Typography</CardTitle>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Customize your website fonts.</p>
            </CardContent>
          </Card>
        </Link>
        */}
        {/* ... other categories like Colors, Layout, etc. */}

      </div>
    </div>
  );
} 