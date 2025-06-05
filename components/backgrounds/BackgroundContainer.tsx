"use client";

import React from 'react';
// Import specific background components
import HalftoneWavesBackground from './HalftoneWavesBackground';
import ImageBackground from './ImageBackground';
import ColorBackground from './ColorBackground';
import SvgBackground from './SvgBackground';
// Import the useSettings hook from the context
import { useSettings } from '@/contexts/SettingsContext';

// Define a type for the settings, matching the JSON structure conceptualized earlier
type BackgroundSettings = {
  type: 'halftone-waves' | 'image' | 'color' | 'svg';
  halftoneWavesSettings?: {
    color1: string;
    color2: string;
    amplitude: number;
    frequency: number;
    speed: number;
  };
  imageSettings?: {
    url: string;
    size: string;
    position: string;
    repeat: string;
  };
  colorSettings?: {
    color: string;
    isGradient: boolean;
    gradient?: string; // e.g., 'linear-gradient(to right, #ffffff, #000000)'
  };
  svgSettings?: {
    code: string;
  };
};

// We'll need a way to get the settings. For now, let's use a placeholder.
// In a real app, this would come from a Context or fetched data.
const useWebsiteSettings = () => {
  // Placeholder settings - replace with actual data fetching/context
  // This example defaults to halftone-waves
  const settings: { homepage: { background: BackgroundSettings } } = {
    homepage: {
      background: {
        type: 'halftone-waves', // Change this to test other backgrounds: 'image', 'color', 'svg'
        halftoneWavesSettings: {
          color1: '#0A0A0A', // Dark background color
          color2: '#1a1a1a', // Slightly lighter wave color
          amplitude: 50,
          frequency: 10,
          speed: 1
        },
        // Example Image Settings (uncomment to test)
        // type: 'image',
        // imageSettings: {
        //   url: 'https://images.unsplash.com/photo-1608306448138-73e130b13420', // Replace with an actual image URL
        //   size: 'cover',
        //   position: 'center',
        //   repeat: 'no-repeat'
        // },
        // Example Color Settings (uncomment to test)
        // type: 'color',
        // colorSettings: {
        //    color: '#ff0000', // Solid red background
        //    isGradient: false
        // },
         // type: 'color',
         // colorSettings: {
         //    color: '', // Not used for gradient
         //    isGradient: true,
         //    gradient: 'linear-gradient(to right, #ff0000, #0000ff)' // Red to blue gradient
         // },
        // Example SVG Settings (uncomment to test)
        // type: 'svg',
        // svgSettings: {
        //   code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="yellow" /></svg>' // Simple yellow circle SVG
        // }
      }
      // Add placeholder data for other settings (typography, colors) here later
    }
  };
  return settings;
};

export default function BackgroundContainer() {
  // Consume settings from the global context
  const { settings, loading, error } = useSettings();

  // Render a loading state or nothing while settings are being fetched
  if (loading) {
    // You might want a minimal placeholder or nothing during loading
    return null; // Or <div className="absolute inset-0 z-[-1] bg-[#0f0f0f]"></div>;
  }

  // Render an error state if fetching failed
  if (error) {
    console.error("Error rendering background:", error);
    // You might want a fallback background or nothing on error
    return null; // Or a default background component
  }

  // If settings are loaded but homepage or background is missing, return null or a default
  if (!settings?.homepage?.background) {
      return null; // Or return a default background component if you have one
  }

  const backgroundSettings = settings.homepage.background;

  // Render the appropriate background component based on type
  const renderBackground = () => {
    switch (backgroundSettings.type) {
      case 'halftone-waves':
        if (backgroundSettings.halftoneWavesSettings) {
          return <HalftoneWavesBackground {...backgroundSettings.halftoneWavesSettings} />;
        }
        return null;
      case 'image':
        if (backgroundSettings.imageSettings) {
          return <ImageBackground {...backgroundSettings.imageSettings} />;
        }
        return null;
      case 'color':
        if (backgroundSettings.colorSettings) {
          return <ColorBackground {...backgroundSettings.colorSettings} />;
        }
        return null;
      case 'svg':
        if (backgroundSettings.svgSettings) {
          return <SvgBackground {...backgroundSettings.svgSettings} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 z-[-1]"> {/* Position behind content */}
      {renderBackground()}
    </div>
  );
} 