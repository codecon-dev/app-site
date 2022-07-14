import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function getScreenshot({ url = '', width = 2000, height = 1000 } = {}) {
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

  console.log({ VERCEL_ENV: process.env.VERCEL_ENV, options });

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'networkidle0' });
  return await page.screenshot({ type: 'png' });
}
