import { Injectable } from '@nestjs/common';
import { Source } from '@prisma/client';
import { Browser } from 'puppeteer-core';
import JobRepository from 'src/repositories/JobRepository';
import { keywords } from '../config/constant';
import { convertKalibrrDate } from '../utils/convertKalibrrDate';

@Injectable()
class KalibrrScrapper {
  kalibrrUrl = `https://www.kalibrr.com/home/te/`;

  constructor(private jobRepository: JobRepository) {}

  async scrapeKalibrr(browser: Browser) {
    console.log('scrap job from kalibrr.com started...');

    const jobBoxClass = '.css-1otdiuc';
    const jobTitleClass = '.css-1gzvnis';
    const jobCompanyClass = '.k-text-subdued.k-font-bold';
    const jobLocationClass = '.k-text-gray-500.k-block.k-pointer-events-none';
    const jobDateClass = '.k-flex.k-gap-4.k-text-gray-300';

    keywords.forEach(async (k) => {
      const url = `${this.kalibrrUrl}${k}`;
      try {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();

        await page.goto(url);

        await page.waitForSelector(jobBoxClass);
        const cards = await page.$$(jobBoxClass);

        for (const card of cards) {
          await card.waitForSelector(jobTitleClass);

          const jobTitleElement = await card.$(jobTitleClass);
          const jobTitle = await jobTitleElement.evaluate(
            (el) => el.textContent,
          );

          const jobUrlElement = await jobTitleElement.$eval('a', (el) =>
            el.getAttribute('href'),
          );
          const jobUrl = `https://www.kalibrr.com${jobUrlElement}`;

          const jobCompanyElement = await card.$(jobCompanyClass);
          const jobCompany = await jobCompanyElement.evaluate(
            (el) => el.textContent,
          );

          const jobLocationElement = await card.$(jobLocationClass);
          const jobLocation = await jobLocationElement.evaluate(
            (el) => el.textContent,
          );
          const jobLocationClean = jobLocation
            .replace('Indonesia', '')
            .replace(',', '')
            .trim();

          const jobDateElement = await card.$$(jobDateClass);
          const jobDate = await jobDateElement[3].evaluate(
            (el) => el.textContent,
          );
          const jobDateFormatted = convertKalibrrDate(jobDate);

          await this.jobRepository.addJob({
            title: jobTitle,
            publicationDate: jobDateFormatted,
            location: jobLocationClean,
            company: jobCompany,
            url: jobUrl,
            source: Source.KALIBRR,
          });
        }

        await page.close();
      } catch (error) {
        console.log('error', error);
      }
    });
  }
}

export default KalibrrScrapper;
