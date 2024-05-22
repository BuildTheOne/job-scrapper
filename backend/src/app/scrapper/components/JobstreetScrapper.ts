import { Injectable } from '@nestjs/common';
import { Source } from '@prisma/client';
import { Browser } from 'puppeteer-core';
import JobRepository from '../../../repositories/JobRepository';
import { keywords } from '../config/constant';
import { convertJobstreetDate } from '../utils/convertJobstreetDate';

@Injectable()
class JobstreetScrapper {
  jobstreetUrl = `https://www.jobstreet.co.id/`;

  constructor(private jobRepository: JobRepository) {}

  async scrapeJobstreet(browser: Browser) {
    console.log('scrap job from jobstreet.com started...');

    const jobBoxClass = 'article';
    const jobTitleClass = '.y735df0._1iz8dgs5g._1iz8dgs52';
    const jobCompanyClass =
      '.y735df0.y735dff.y735df0.y735dff._5nhsu10._5nhsu11';
    const jobLocationClass =
      '.y735df0._1iz8dgs4y._94v4w0._94v4w1._94v4w21._4rkdcp4._94v4w7';
    const jobDateClass =
      '.y735df0._1iz8dgs4y._94v4w0._94v4w1._94v4w22._4rkdcp4._94v4w7';

    keywords.forEach(async (k) => {
      const url = `${this.jobstreetUrl}${k}-jobs?sortmode=ListedDate`;
      try {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();

        await page.goto(url);

        await page.waitForSelector(jobBoxClass);
        const cards = await page.$$(jobBoxClass);

        for (const card of cards) {
          await card.waitForSelector(jobTitleClass);
          const jobTitleElement = await card.$(jobTitleClass);
          const jobTitle = (
            await jobTitleElement.evaluate((el) => el.textContent)
          ).trim();

          const jobUrlElement = await jobTitleElement.$eval('a', (el) =>
            el.getAttribute('href'),
          );
          const jobUrl = `https://www.jobstreet.co.id${jobUrlElement}`;

          await card.waitForSelector(jobCompanyClass);
          const jobCompanyElement = await card.$(jobCompanyClass);
          const jobCompany = (
            await jobCompanyElement.evaluate((el) => el.textContent)
          ).trim();

          await card.waitForSelector(jobLocationClass);
          const jobLocationElement = await card.$(jobLocationClass);
          const jobLocation = (
            await jobLocationElement.evaluate((el) => el.textContent)
          ).trim();

          await card.waitForSelector(jobDateClass);
          const jobDateElement = await card.$$(jobDateClass);
          const jobDate = await jobDateElement[1].evaluate(
            (el) => el.textContent,
          );
          const jobDateFormatted = convertJobstreetDate(jobDate);

          await this.jobRepository.addJob({
            title: jobTitle,
            publicationDate: jobDateFormatted,
            location: jobLocation,
            company: jobCompany,
            url: jobUrl,
            source: Source.JOBSTREET,
          });
        }

        await page.close();
      } catch (error) {
        console.log('error', error);
      }
    });
  }
}

export default JobstreetScrapper;
