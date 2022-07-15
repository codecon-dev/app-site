import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';

export default async function getScreenshot({ url = '', width = 2000, height = 1000 } = {}) {
  let browser;

  async function getBrowserInstance() {
    const executablePath = await chrome.executablePath;

    if (!executablePath) {
      // running locally
      return puppeteer.launch({
        args: chrome.args,
        headless: true,
        defaultViewport: {
          width,
          height
        },
        ignoreHTTPSErrors: true
      });
    }

    return chrome.puppeteer.launch({
      args: chrome.args,
      defaultViewport: {
        width,
        height
      },
      executablePath,
      headless: chrome.headless,
      ignoreHTTPSErrors: true
    });
  }

  try {
    browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:86.0) Gecko/20100101 Firefox/86.0'
    );
    await page.setViewport({ width, height });

    await page.goto(url, { waitUntil: 'networkidle0' });

    const screenshot = await page.screenshot({
      type: 'png'
    });

    return screenshot;
  } catch (error) {
    console.error(error);
  } finally {
    if (browser != null) {
      await browser.close();
    }
  }
}
