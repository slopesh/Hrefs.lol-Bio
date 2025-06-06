import { siteConfig } from '../config/site';
import puppeteer, { HTTPRequest, HTTPResponse, Browser } from 'puppeteer';
import { runCrawl } from './crawler';

interface MonitoringResult {
  timestamp: Date;
  status: 'success' | 'error';
  metrics: {
    loadTime: number;
    performance: {
      firstContentfulPaint: number;
      largestContentfulPaint: number;
      timeToInteractive: number;
    };
    seo: {
      title: string;
      description: string;
      h1Count: number;
      imageCount: number;
      linkCount: number;
    };
  };
  errors: string[];
}

class SiteMonitor {
  private static instance: SiteMonitor;
  private isRunning: boolean = false;
  private checkInterval: NodeJS.Timeout | null = null;
  private browser: Browser | null = null;

  private constructor() {}

  static getInstance(): SiteMonitor {
    if (!SiteMonitor.instance) {
      SiteMonitor.instance = new SiteMonitor();
    }
    return SiteMonitor.instance;
  }

  async startMonitoring() {
    if (this.isRunning) {
      console.log('Monitoring is already running');
      return;
    }

    try {
      // Launch browser with proper error handling
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true
      });

      // Initial check
      const initialCheck = await this.checkSite();
      if (initialCheck.status === 'error') {
        throw new Error('Initial site check failed: ' + initialCheck.errors.join(', '));
      }

      // Set up periodic checking
      this.checkInterval = setInterval(async () => {
        try {
          await this.checkSite();
        } catch (error) {
          console.error('Error during periodic check:', error);
          // Don't stop monitoring on periodic check errors
        }
      }, 1000 * 60 * 60); // Check every hour

      this.isRunning = true;
      console.log('Site monitoring started successfully');
    } catch (error) {
      console.error('Failed to start site monitoring:', error);
      await this.cleanup();
      throw error;
    }
  }

  async stopMonitoring() {
    await this.cleanup();
    console.log('Site monitoring stopped');
  }

  private async cleanup() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
      }
      this.browser = null;
    }
    this.isRunning = false;
  }

  private async checkSite() {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();
    try {
      const startTime = Date.now();

      // Enable performance metrics
      await page.setRequestInterception(true);
      page.on('request', (request: HTTPRequest) => request.continue());

      // Navigate to site with timeout
      await page.goto(siteConfig.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 // 30 second timeout
      });

      // Get performance metrics
      const performance = await page.evaluate(() => {
        const perf = window.performance.getEntriesByType('paint');
        return {
          firstContentfulPaint: (perf.find(p => p.name === 'first-contentful-paint') || { startTime: 0 }).startTime,
          largestContentfulPaint: (perf.find(p => p.name === 'largest-contentful-paint') || { startTime: 0 }).startTime,
          timeToInteractive: window.performance.now(),
        };
      });

      // Get SEO metrics
      const seo = await page.evaluate(() => {
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          h1Count: document.querySelectorAll('h1').length,
          imageCount: document.querySelectorAll('img').length,
          linkCount: document.querySelectorAll('a').length,
        };
      });

      const result: MonitoringResult = {
        timestamp: new Date(),
        status: 'success',
        metrics: {
          loadTime: Date.now() - startTime,
          performance,
          seo,
        },
        errors: [],
      };

      // Check for common issues
      if (result.metrics.performance.firstContentfulPaint > 2000) {
        result.errors.push('First contentful paint is too slow');
      }
      if (result.metrics.seo.h1Count === 0) {
        result.errors.push('No H1 tags found');
      }
      if (result.metrics.seo.description.length < 50) {
        result.errors.push('Meta description is too short');
      }

      console.log('Site check completed:', result);
      return result;
    } catch (error: unknown) {
      console.error('Error checking site:', error);
      return {
        timestamp: new Date(),
        status: 'error',
        metrics: {
          loadTime: 0,
          performance: {
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            timeToInteractive: 0,
          },
          seo: {
            title: '',
            description: '',
            h1Count: 0,
            imageCount: 0,
            linkCount: 0,
          },
        },
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      };
    } finally {
      try {
        await page.close();
      } catch (error) {
        console.error('Error closing page:', error);
      }
    }
  }
}

export const siteMonitor = SiteMonitor.getInstance();

export async function startCrawl(url: string) {
  if (!url) {
    throw new Error('URL is required for crawling');
  }
  await runCrawl(url);
}

// Only start periodic crawling if we're in production
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    if (siteConfig.url) {
      runCrawl(siteConfig.url).catch(error => {
        console.error('Error during periodic crawl:', error);
      });
    }
  }, 1000 * 60 * 60); // Every hour
} 