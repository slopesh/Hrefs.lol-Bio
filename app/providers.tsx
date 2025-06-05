'use client';

import { SessionProvider } from 'next-auth/react';
import SettingsProvider from '@/contexts/SettingsProvider';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
      {/* <Toaster /> */}
    </SettingsProvider>
  );
} 