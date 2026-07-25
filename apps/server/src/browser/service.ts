import { Browser, BrowserContext, Page, chromium } from 'playwright');
import { v4 as uuid } from 'uuid';

class BrowserService {
  private sessions = new Map();
  async createSession(url?: string) {
    const id = uuid();
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    if (url) await page.goto(url);
    this.sessions.set(id, { id, browser, page, currentUrl: url || 'about:blank' });
    return { id, sessionId: id, url: url || 'about:blank', status: 'ready' };
  }
  async navigate(id: string, url: string) {
    const sess = this.sessions.get(id);
    if (!sess) throw new Error('Session not found');
    await sess.page.goto(url);
    return { url: sess.page.url(), title: await sess.page.title() };
  }
  async screenshot(id: string) {
    const sess = this.sessions.get(id);
    if (!sess) throw new Error('Session not found');
    return sess.page.screenshot({ type: 'png' });
  }
  async extractText(id: string) {
    const sess = this.sessions.get(id);
    if (!sess) throw new Error('Session not found');
    return sess.page.evaluate('document.body.innerText');
  }
  async closeSession(id: string) {
    const sess = this.sessions.get(id);
    if (sess) { await sess.browser.close(); this.sessions.delete(id); }
  }
}
export const browserService = new BrowserService();