import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Start the current RETAIL source separately with VITE_E2E_BUILD=true.
// A fresh browser profile and blocked external traffic keep every fixture local.
const origin = process.env.PWAYMENT_ORIGIN ?? 'http://127.0.0.1:4191';
const output = path.resolve('design-experiments/eigen-projecten/sources/pwayment');
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage();
const captures = [];
try {
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1.5 });
  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = request.url();
    if (url.startsWith('http') && new URL(url).origin !== origin) request.abort();
    else request.continue();
  });
  await page.goto(`${origin}/app?e2e=1`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('[aria-label="Cijfer 1"]');
  for (const digit of '123456') await page.click(`[aria-label="Cijfer ${digit}"]`);
  await page.waitForSelector('.pos-product-stage', { timeout: 30000 });
  await page.evaluate(async () => {
    const { seedDemoRetailData } = await import('/src/utils/demoRetailData.ts');
    const { useCustomers } = await import('/src/store/useCustomers.ts');
    const { useAuth } = await import('/src/auth/useAuth.ts');
    await seedDemoRetailData();
    await useCustomers.getState().hydrate(true);
    useAuth.setState({ currentUserName: 'Demo', currentStoreName: 'PWAYMENT Demowinkel' });
  });
  const settle = async () => {
    await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
    await page.waitForFunction(() => !document.body.innerText.includes('Pagina laden…'));
  };
  const capture = async (name, title) => {
    await settle();
    // Let charts and ordinary interface transitions reach their final state.
    await new Promise(resolve => setTimeout(resolve, 800));
    await page.screenshot({ path: path.join(output, `${name}.png`) });
    const text = await page.evaluate(() => document.body.innerText);
    captures.push({ name, title, capturedAt: new Date().toISOString(), width: 2400, height: 1500, viewport: { width: 1600, height: 1000 }, fixture: 'Isolated local demo data; external HTTP requests blocked' });
    console.log(name, text.slice(0, 180).replaceAll('\n', ' / '));
  };
  await page.evaluate(async () => {
    const { useStore } = await import('/src/store/useStore.ts');
    const { useProducts } = await import('/src/store/useProducts.ts');
    const products = useProducts.getState().list.filter(product => product.stockQty > 0);
    products.slice(0, 3).forEach(product => useStore.getState().addOrderItem(product));
  });
  await page.click('[aria-label^="Winkelwagen openen"]');
  await capture('pwayment-kassa', 'Kassaverkoop');
  const view = async name => {
    await page.evaluate(async name => { const { useStore } = await import('/src/store/useStore.ts'); useStore.getState().setMainView(name); }, name);
    await settle();
  };
  await view('inventory');
  await page.waitForSelector('#inventory-search');
  await page.type('#inventory-search', 'Complete Street');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => [...document.querySelectorAll('.inventory-workspace__scan-panel button')].some(button => button.textContent.includes('Complete Street 8.0')));
  await page.evaluate(() => [...document.querySelectorAll('.inventory-workspace__scan-panel button')].find(button => button.textContent.includes('Complete Street 8.0'))?.click());
  await capture('pwayment-voorraad', 'Voorraadbeheer');
  await view('customers');
  await capture('pwayment-klanten', 'Klantbeheer');
  await view('insights');
  await page.waitForSelector('[aria-label="Inzichten navigatie"]');
  await page.evaluate(() => [...document.querySelectorAll('[aria-label="Inzichten navigatie"] button')].find(button => button.textContent.trim().startsWith('Prestaties'))?.click());
  await page.waitForFunction(() => new URLSearchParams(location.search).get('section') === 'performance');
  await capture('pwayment-inzichten', 'Verkoopinzichten');
  await view('integration-hub');
  await capture('pwayment-integraties', 'Integration Hub');
  await page.click('[aria-label="Profiel en instellingen"]');
  await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].find(button => button.textContent.includes('Modules & navigatie'))?.click());
  await page.waitForSelector('.settings-workspace');
  await capture('pwayment-instellingen', 'Modules en instellingen');
  await page.evaluate(() => [...document.querySelectorAll('.settings-workspace button')].find(button => button.textContent.trim() === 'Kassatoegang')?.click());
  await capture('pwayment-kassatoegang', 'Kassatoegang en rollen');
  await writeFile(path.join(output, 'captures.json'), JSON.stringify(captures, null, 2) + '\n');
} finally { await browser.close(); }
