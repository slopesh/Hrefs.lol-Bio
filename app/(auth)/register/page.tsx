import { Metadata } from 'next'
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Register - href.lol',
  description: 'Create your account on href.lol',
}

// Dynamically import the actual page content component
const RegisterPageContent = dynamic(() => import('./RegisterPageContent'), {
  ssr: false,
  loading: () => (
    // Optional: You can put a loading spinner or placeholder here
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white font-poppins items-center justify-center">
      Loading...
    </div>
  ),
});

// This is the main page component that renders the dynamically imported content
export default function RegisterPage() {
  return <RegisterPageContent />;
} 