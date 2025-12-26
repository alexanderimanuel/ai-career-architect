const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = process.env.PREVIEW_URL || 'http://localhost:5174/';
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const sizes = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  const dir = path.resolve(__dirname, '../screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const s of sizes) {
    console.log(`Capturing ${s.name} ${s.width}x${s.height}`);
    await page.setViewportSize({ width: s.width, height: s.height });
    await page.goto(url, { waitUntil: 'networkidle' });
    // give some time for animations to settle (and for any lazy-loaded assets)
    await page.waitForTimeout(800);
    const out = path.join(dir, `${s.name}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`Saved ${out}`);
  }

  await browser.close();
})();