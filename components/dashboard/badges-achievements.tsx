"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Crown, Target, Users, Eye, MousePointer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Achievements {
  totalViews: number;
  totalClicks: number;
  totalLinks: number;
  isVerified: boolean;
  isFeatured: boolean;
  daysActive: number;
}

interface BadgesAchievementsProps {
  badges: Badge[];
  achievements: Achievements;
  isPremium: boolean;
  premiumExpiresAt: Date | null;
}

const achievementIcons = {
  views: Eye,
  clicks: MousePointer,
  links: Target,
  verified: Star,
  featured: Crown,
  days: Trophy,
  premium: Zap
};

export function BadgesAchievements({ badges, achievements, isPremium, premiumExpiresAt }: BadgesAchievementsProps) {
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
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2"
    >
      {/* Badges Section */}
      <Card className="bg-[#181818] border-[#232323] rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                variants={itemVariants}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#232323]"
              >
                <div className={cn("p-2 rounded-md", badge.color)}>
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{badge.name}</p>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats & Premium Section */}
      <Card className="bg-[#181818] border-[#232323] rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Stats & Premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="p-3 rounded-lg bg-[#232323]">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-400">Total Views</span>
                </div>
                <p className="text-xl font-bold text-white">{achievements.totalViews}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-3 rounded-lg bg-[#232323]">
                <div className="flex items-center gap-2 mb-1">
                  <MousePointer className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-400">Total Clicks</span>
                </div>
                <p className="text-xl font-bold text-white">{achievements.totalClicks}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-3 rounded-lg bg-[#232323]">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-400">Active Links</span>
                </div>
                <p className="text-xl font-bold text-white">{achievements.totalLinks}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-3 rounded-lg bg-[#232323]">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-400">Days Active</span>
                </div>
                <p className="text-xl font-bold text-white">{achievements.daysActive}</p>
              </motion.div>
            </div>

            {/* Premium Status */}
            <motion.div variants={itemVariants} className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Premium Status</h3>
                  <p className="text-sm text-gray-400">
                    {isPremium 
                      ? `Active until ${premiumExpiresAt?.toLocaleDateString()}`
                      : 'Upgrade to unlock premium features'}
                  </p>
                </div>
                <Badge variant={isPremium ? "default" : "outline"} className={cn(
                  "text-sm",
                  isPremium ? "bg-blue-500 hover:bg-blue-600" : "border-blue-500 text-blue-500"
                )}>
                  {isPremium ? 'Premium' : 'Upgrade'}
                </Badge>
              </div>
            </motion.div>

            {/* Verification & Featured Status */}
            <div className="flex gap-4">
              <motion.div variants={itemVariants} className="flex-1 p-3 rounded-lg bg-[#232323]">
                <div className="flex items-center gap-2">
                  <Star className={cn("h-4 w-4", achievements.isVerified ? "text-yellow-500" : "text-gray-500")} />
                  <span className="text-sm text-gray-400">Verified</span>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex-1 p-3 rounded-lg bg-[#232323]">
                <div className="flex items-center gap-2">
                  <Crown className={cn("h-4 w-4", achievements.isFeatured ? "text-yellow-500" : "text-gray-500")} />
                  <span className="text-sm text-gray-400">Featured</span>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 