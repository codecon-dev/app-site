import puppeteerProd from 'puppeteer-core';
import puppeteerDev from 'puppeteer';

export default process.env.VERCEL_ENV === 'production' ? puppeteerProd : puppeteerDev;
