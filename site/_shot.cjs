// Visual-QA screenshot helper. Usage: node _shot.cjs
// Resolves puppeteer from "Website Design General/node_modules".
const path = require('path');
const puppeteer = require('puppeteer');

const fileUrl = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();

    // Full page at desktop width
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800)); // let fonts settle
    await page.screenshot({ path: path.resolve(__dirname, 'screenshots/full.png'), fullPage: true });

    // Mobile
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.resolve(__dirname, 'screenshots/mobile.png'), fullPage: true });

    console.log('Screenshots written to site/screenshots/');
  } finally {
    await browser.close();
  }
})();
