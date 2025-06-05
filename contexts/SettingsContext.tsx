// contexts/SettingsContext.tsx
import { createContext, useContext } from 'react';

// Define the type for the full website settings, matching settings.json structure
export type WebsiteSettings = {
  homepage: {
    background: {
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
    // Add other settings here as we expand customization
    typography?: any; // Placeholder for typography settings
    colors?: any; // Placeholder for color settings
  };
  // Add settings for other parts of the site if needed
};

// Define the shape of the context value
interface SettingsContextType {
  settings: WebsiteSettings | null;
  loading: boolean;
  error: Error | null;
  // Potentially add a function to update settings locally or trigger a re-fetch
  // updateSettings: (newSettings: WebsiteSettings) => void;
}

// Create the context with a default null value
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Custom hook to use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext; 