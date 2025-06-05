"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import SettingsContext, { WebsiteSettings } from './SettingsContext';

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error(`Error fetching settings: ${response.statusText}`);
        }
        const data: WebsiteSettings = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to fetch website settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []); // Empty dependency array means this effect runs once on mount

  // The context value that will be provided
  const contextValue = {
    settings,
    loading,
    error,
    // Add an update function here later if needed for local state updates
    // updateSettings: (newSettings: WebsiteSettings) => setSettings(newSettings),
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider; 