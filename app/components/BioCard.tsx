import React from 'react';
import {
  User,
  Gem,
  Link,
  Gamepad2,
  Mail,
  Bot,
  Code,
  Crosshair,
  Globe,
  Headphones,
  Briefcase,
  LucideIcon
} from 'lucide-react';

interface BioCardProps {
  username: string;
  avatarUrl: string;
  description: string;
  socialLinks: { icon: string; url: string; }[];
  musicPlayer?: { track: string; artist: string; duration: string; };
  backgroundImage: string;
}

// Mapping of icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  user: User,
  gem: Gem,
  link: Link,
  gamepad2: Gamepad2,
  mail: Mail,
  bot: Bot,
  code: Code,
  crosshair: Crosshair,
  globe: Globe,
  headphones: Headphones,
  briefcase: Briefcase,
};

const BioCard: React.FC<BioCardProps> = ({
  username,
  avatarUrl,
  description,
  socialLinks,
  musicPlayer,
  backgroundImage,
}) => {
  return (
    <div className="relative w-72 h-96 rounded-xl shadow-lg overflow-hidden text-text-DEFAULT">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full p-6 bg-black bg-opacity-50">
        {/* Avatar and Username */}
        <div className="flex items-center mb-4">
          <img src={avatarUrl} alt={`${username}'s avatar`} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />
          <div>
            <h3 className="text-lg font-bold text-white font-poppins">{username}</h3>
            <p className="text-sm text-text-secondary font-sans">{description}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-4">
          {socialLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon];
            return (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-DEFAULT transition-colors duration-200">
                {IconComponent ? <IconComponent className="w-6 h-6" /> : link.icon}
              </a>
            );
          })}
        </div>

        {/* Music Player (optional) */}
        {musicPlayer && (
          <div className="mt-auto">
            <p className="text-sm font-semibold text-white font-poppins">Now Playing:</p>
            <p className="text-text-secondary text-sm font-sans">{musicPlayer.track} by {musicPlayer.artist}</p>
            {/* Add simple player controls here if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BioCard; 