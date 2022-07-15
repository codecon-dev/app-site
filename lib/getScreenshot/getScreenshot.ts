import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';

export default async function getScreenshot({ url = '', width = 2000, height = 1000 } = {}) {
  let browser;

  async function getBrowserInstance() {
    const browserArgs = {
      args: chrome.args,
      headless: true,
      defaultViewport: {
        width,
        height
      },
      ignoreHTTPSErrors: true
    };

    const executablePath = await chrome.executablePath;

    // running locally
    if (!executablePath) return puppeteer.launch(browserArgs);

    return chrome.puppeteer.launch({
      ...browserArgs,
      executablePath
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

    return await page.screenshot({
      type: 'png'
    });
  } catch (error) {
    console.error(error);
  } finally {
    if (browser != null) {
      await browser.close();
    }
  }
}
