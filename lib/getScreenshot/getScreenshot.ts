import chrome from 'chrome-aws-lambda';
import puppeteer from './puppeteer';

export default async function getScreenshot({ url = '', width = 2000, height = 1000 } = {}) {
  try {
    const options =
      process.env.VERCEL_ENV === 'development'
        ? {
            args: [],
            executablePath:
              process.platform === 'win32'
                ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                : process.platform === 'linux'
                ? '/usr/bin/google-chrome'
                : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          }
        : {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless
          };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:86.0) Gecko/20100101 Firefox/86.0'
    );
    await page.setViewport({ width, height });

    await page.goto(url, { waitUntil: 'networkidle0' });
    const screenshot = await page.screenshot({ type: 'png' });

    await browser.close();
    return screenshot;
  } catch (error) {
    console.error(error);
  }
}
