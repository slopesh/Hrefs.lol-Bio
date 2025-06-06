import puppeteer, { Browser, Page } from 'puppeteer';
import Database from 'better-sqlite3';
import { URL } from 'url';

// --- Configurable parameters ---
const MAX_CONCURRENCY = 3;
const CRAWL_DELAY_MS = 1500;
const MAX_PAGES = 1000;
const USER_AGENT = 'Mozilla/5.0 (compatible; HrefBot/1.0; +https://href.lol/bot)';

// --- SQLite setup ---
const db = new Database('crawler.db');
db.exec(`
CREATE TABLE IF NOT EXISTS pages (
  url TEXT PRIMARY KEY,
  status INTEGER,
  title TEXT,
  description TEXT,
  h1_count INTEGER,
  image_count INTEGER,
  link_count INTEGER,
  first_contentful_paint REAL,
  largest_contentful_paint REAL,
  time_to_interactive REAL,
  html TEXT,
  crawled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  error TEXT
);
CREATE TABLE IF NOT EXISTS links (
  from_url TEXT,
  to_url TEXT,
  UNIQUE(from_url, to_url)
);
`);

// --- Crawler Core ---
export class AdvancedCrawler {
  private queue: Set<string> = new Set<string>();
  private seen: Set<string> = new Set<string>();
  private concurrency = 0;
  private browser: Browser | null = null;
  private running = false;
  private errors: Error[] = [];

  constructor(private startUrl: string) {
    if (!startUrl) {
      throw new Error('Start URL is required');
    }
    try {
      new URL(startUrl); // Validate URL format
    } catch (error: unknown) {
      throw new Error(`Invalid start URL: ${error instanceof Error ? error.message : String(error)}`);
    }
    this.queue.add(startUrl);
  }

  async start() {
    if (this.running) {
      throw new Error('Crawler is already running');
    }

    this.running = true;
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true
      });

      await this.crawlLoop();
    } catch (error) {
      this.errors.push(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      if (this.browser) {
        try {
          await this.browser.close();
        } catch (error) {
          console.error('Error closing browser:', error);
        }
      }
      this.running = false;
    }
  }

  private async crawlLoop() {
    while (this.queue.size > 0 && this.seen.size < MAX_PAGES && this.running) {
      if (this.concurrency < MAX_CONCURRENCY) {
        const url = this.queue.values().next().value;
        if (typeof url !== 'string' || !url) {
          this.queue.delete(url);
          continue;
        }
        const urlStr: string = url;
        this.queue.delete(urlStr);
        this.seen.add(urlStr);
        this.concurrency++;
        
        try {
          await this.crawlPage(urlStr);
        } catch (error) {
          console.error(`Error crawling ${urlStr}:`, error);
          this.errors.push(error instanceof Error ? error : new Error(String(error)));
        } finally {
          this.concurrency--;
        }
        
        await this.sleep(CRAWL_DELAY_MS);
      } else {
        await this.sleep(500);
      }
    }
    // Wait for all in-flight crawls to finish
    while (this.concurrency > 0) {
      await this.sleep(500);
    }
  }

  private async crawlPage(url: string) {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();
    try {
      await page.setUserAgent(USER_AGENT);
      await page.setDefaultNavigationTimeout(30000);
      await page.setDefaultTimeout(30000);

      const resp = await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      if (!resp) {
        throw new Error('Failed to get response from page');
      }

      const status = resp.status();
      const html = await page.content();

      // --- Extract SEO and performance metrics ---
      const [seo, perf] = await Promise.all([
        page.evaluate(() => ({
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          h1Count: document.querySelectorAll('h1').length,
          imageCount: document.querySelectorAll('img').length,
          linkCount: document.querySelectorAll('a').length,
        })),
        page.evaluate(() => {
          const perf = window.performance.getEntriesByType('paint');
          return {
            firstContentfulPaint: (perf.find(p => p.name === 'first-contentful-paint') || { startTime: 0 }).startTime,
            largestContentfulPaint: (perf.find(p => p.name === 'largest-contentful-paint') || { startTime: 0 }).startTime,
            timeToInteractive: window.performance.now(),
          };
        })
      ]);

      // --- Store in DB ---
      const stmt = db.prepare(`
        REPLACE INTO pages (
          url, status, title, description, h1_count, image_count, 
          link_count, first_contentful_paint, largest_contentful_paint, 
          time_to_interactive, html, error
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
      `);
      
      stmt.run(
        url, status, seo.title, seo.description, seo.h1Count, 
        seo.imageCount, seo.linkCount, perf.firstContentfulPaint, 
        perf.largestContentfulPaint, perf.timeToInteractive, html
      );

      // --- Extract and queue links ---
      const links: string[] = await page.evaluate(() => 
        Array.from(document.querySelectorAll('a[href]'))
          .map(a => (a as HTMLAnchorElement).href || '')
          .filter((href): href is string => href.length > 0)
      );

      const linkStmt = db.prepare(`
        INSERT OR IGNORE INTO links (from_url, to_url) 
        VALUES (?, ?)
      `);

      for (const link of links) {
        try {
          const normalized = this.normalizeUrl(link);
          if (normalized && !this.seen.has(normalized) && normalized.startsWith(this.startUrl)) {
            this.queue.add(normalized);
            linkStmt.run(url, normalized);
          }
        } catch (error) {
          console.error(`Error processing link ${link}:`, error);
        }
      }

      console.log(`[${status}] ${url} | Links: ${links.length}`);
    } catch (error) {
      // Store error in database
      db.prepare(`
        REPLACE INTO pages (url, error) 
        VALUES (?, ?)
      `).run(url, error instanceof Error ? error.message : String(error));
      
      throw error;
    } finally {
      try {
        await page.close();
      } catch (error) {
        console.error('Error closing page:', error);
      }
    }
  }

  private normalizeUrl(link: string): string {
    try {
      const url = new URL(link, this.startUrl);
      url.hash = '';
      url.search = '';
      return url.toString();
    } catch (error) {
      console.error(`Error normalizing URL ${link}:`, error);
      return '';
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getErrors(): Error[] {
    return [...this.errors];
  }
}

export async function runCrawl(startUrl: string) {
  if (!startUrl) {
    throw new Error('Start URL is required for crawling');
  }

  const crawler = new AdvancedCrawler(startUrl);
  try {
    await crawler.start();
  } catch (error) {
    console.error('Crawl failed:', error);
    throw error;
  }
  return crawler.getErrors();
}