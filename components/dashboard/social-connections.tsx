"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Plus, Globe, Twitter, Instagram, Linkedin, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

interface SocialConnectionsProps {
  social: Link[];
  websites: Link[];
  total: number;
}

const socialIcons: { [key: string]: any } = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  default: Globe
};

export function SocialConnections({ social, websites, total }: SocialConnectionsProps) {
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

  const getSocialIcon = (url: string) => {
    if (url.includes('twitter.com')) return socialIcons.twitter;
    if (url.includes('instagram.com')) return socialIcons.instagram;
    if (url.includes('linkedin.com')) return socialIcons.linkedin;
    if (url.includes('github.com')) return socialIcons.github;
    return socialIcons.default;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2"
    >
      {/* Social Media Connections */}
      <Card className="bg-[#181818] border-[#232323] rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Link2 className="h-5 w-5 text-blue-500" />
            Social Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {social.map((link) => {
              const Icon = getSocialIcon(link.url);
              return (
                <motion.div
                  key={link.id}
                  variants={itemVariants}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#232323]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-[#181818]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{link.title}</p>
                      <p className="text-xs text-gray-400">{link.url}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              );
            })}
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full border-[#232323] text-white hover:bg-[#232323] hover:border-white/20"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Social Connection
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Website Links */}
      <Card className="bg-[#181818] border-[#232323] rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-500" />
            Website Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {websites.map((link) => (
              <motion.div
                key={link.id}
                variants={itemVariants}
                className="flex items-center justify-between p-3 rounded-lg bg-[#232323]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#181818]">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{link.title}</p>
                    <p className="text-xs text-gray-400">{link.url}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full border-[#232323] text-white hover:bg-[#232323] hover:border-white/20"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Website Link
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 