import { siteConfig } from '../config/site';
import puppeteer from 'puppeteer';

interface BrowserTest {
  name: string;
  version: string;
  userAgent: string;
  features: {
    [key: string]: boolean;
  };
}

class BrowserCompatibilityChecker {
  private static instance: BrowserCompatibilityChecker;
  private testResults: Map<string, BrowserTest> = new Map();
  private isRunning: boolean = false;
  private checkInterval: NodeJS.Timeout | null = null;
  private browser: any = null;

  private constructor() {}

  static getInstance(): BrowserCompatibilityChecker {
    if (!BrowserCompatibilityChecker.instance) {
      BrowserCompatibilityChecker.instance = new BrowserCompatibilityChecker();
    }
    return BrowserCompatibilityChecker.instance;
  }

  async startChecking() {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      // Launch browser
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      // Initial check
      await this.checkCompatibility();

      // Set up periodic checking
      this.checkInterval = setInterval(async () => {
        await this.checkCompatibility();
      }, 1000 * 60 * 60); // Check every hour

      console.log('Browser compatibility checking started');
    } catch (error) {
      console.error('Failed to start browser compatibility checking:', error);
      this.isRunning = false;
      throw error;
    }
  }

  async stopChecking() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    this.isRunning = false;
    console.log('Browser compatibility checking stopped');
  }

  private async checkCompatibility() {
    try {
      const browsers = this.getTestBrowsers();
      const results = await Promise.all(
        browsers.map(browser => this.testBrowser(browser))
      );

      results.forEach(result => {
        this.testResults.set(`${result.name} ${result.version}`, result);
      });

      await this.generateReport();
    } catch (error) {
      console.error('Error during compatibility check:', error);
    }
  }

  private getTestBrowsers(): BrowserTest[] {
    return [
      {
        name: 'Chrome',
        version: 'latest',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        features: {},
      },
      {
        name: 'Firefox',
        version: 'latest',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
        features: {},
      },
      {
        name: 'Safari',
        version: 'latest',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15',
        features: {},
      },
      {
        name: 'Edge',
        version: 'latest',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
        features: {},
      },
    ];
  }

  private async testBrowser(browser: BrowserTest): Promise<BrowserTest> {
    try {
      const page = await this.browser.newPage();
      await page.setUserAgent(browser.userAgent);
      await page.goto(siteConfig.url, { waitUntil: 'networkidle0' });

      // Test features
      const features = await page.evaluate(() => {
        return {
          flexbox: 'flexBasis' in document.documentElement.style,
          grid: 'gridTemplateColumns' in document.documentElement.style,
          cssVariables: window.CSS && window.CSS.supports('--fake-var', '0'),
          fetch: 'fetch' in window,
          promises: 'Promise' in window,
          asyncAwait: (async () => {})() instanceof Promise,
          webp: (() => {
            const canvas = document.createElement('canvas');
            if (canvas.getContext && canvas.getContext('2d')) {
              return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            }
            return false;
          })(),
          webgl: (() => {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
              (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
          })(),
          serviceWorker: 'serviceWorker' in navigator,
          pushApi: 'PushManager' in window,
        };
      });

      browser.features = features;

      // Test site functionality
      await this.testSiteFunctionality(page, browser);

      await page.close();
      return browser;
    } catch (error) {
      console.error(`Error testing ${browser.name} ${browser.version}:`, error);
      throw error;
    }
  }

  private async testSiteFunctionality(page: any, browser: BrowserTest) {
    try {
      // Test navigation
      await page.click('a[href]');
      await page.waitForNavigation();

      // Test forms
      const formTest = await page.evaluate(() => {
        const form = document.createElement('form');
        return form instanceof HTMLFormElement;
      });

      // Test animations
      const animationTest = await page.evaluate(() => {
        return 'animationName' in document.documentElement.style;
      });

      // Test responsive design
      await page.setViewport({ width: 375, height: 667 });
      const mobileTest = await page.evaluate(() => {
        return window.innerWidth === 375;
      });

      browser.features = {
        ...browser.features,
        navigation: true,
        forms: formTest,
        animations: animationTest,
        responsive: mobileTest,
      };
    } catch (error) {
      console.error('Error testing site functionality:', error);
      browser.features = {
        ...browser.features,
        navigation: false,
        forms: false,
        animations: false,
        responsive: false,
      };
    }
  }

  private async generateReport() {
    const report = {
      timestamp: new Date(),
      totalBrowsers: this.testResults.size,
      compatibility: this.getCompatibilitySummary(),
      issues: this.identifyIssues(),
      recommendations: this.generateRecommendations(),
    };

    console.log('Browser Compatibility Report:', report);
    return report;
  }

  private getCompatibilitySummary() {
    const summary: { [key: string]: number } = {};
    this.testResults.forEach(result => {
      const supportedFeatures = Object.values(result.features).filter(Boolean).length;
      const totalFeatures = Object.keys(result.features).length;
      summary[`${result.name} ${result.version}`] = (supportedFeatures / totalFeatures) * 100;
    });
    return summary;
  }

  private identifyIssues() {
    const issues: string[] = [];

    this.testResults.forEach(result => {
      Object.entries(result.features).forEach(([feature, supported]) => {
        if (!supported) {
          issues.push(`${result.name} ${result.version}: ${feature} not supported`);
        }
      });
    });

    return issues;
  }

  private generateRecommendations() {
    const recommendations: string[] = [];
    const issues = this.identifyIssues();

    if (issues.length > 0) {
      recommendations.push('Implement fallbacks for unsupported features');
      recommendations.push('Add polyfills where necessary');
      recommendations.push('Consider progressive enhancement');
    }

    return recommendations;
  }
}

export const browserChecker = BrowserCompatibilityChecker.getInstance(); 