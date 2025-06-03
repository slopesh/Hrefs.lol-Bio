// Configuration settings for the application
export const config = {
  // Database
  database: {
    url: 'postgresql://postgres:postgres@localhost:5432/bio_tool?schema=public',
  },
  
  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET || 'your_nextauth_secret_here',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  
  // Cryptomus Payment Settings
  cryptomus: {
    merchantId: process.env.CRYPTOMUS_MERCHANT_ID || 'your_merchant_id_here',
    apiKey: process.env.CRYPTOMUS_API_KEY || 'your_api_key_here',
    projectId: process.env.CRYPTOMUS_PROJECT_ID || 'your_project_id_here',
  },
  
  // Other settings
  app: {
    name: 'Your App Name',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  }
} as const;

// Type for the config object
export type Config = typeof config; 