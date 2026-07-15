const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.pexels.com/video/1448735/');
  const videoSrc = await page.evaluate(() => {
    const source = document.querySelector('video source');
    return source ? source.src : null;
  });
  console.log('Video SRC:', videoSrc);
  await browser.close();
})();
