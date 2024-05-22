import { Injectable } from '@nestjs/common';
import { Source } from '@prisma/client';
import { Browser } from 'puppeteer-core';
import JobRepository from '../../../repositories/JobRepository';
import { keywords } from '../config/constant';
import { convertLinkedinDate } from '../utils/convertLinkedinDate';

@Injectable()
class LinkedinScrapper {
  linkedinUrl =
    'https://www.linkedin.com/jobs/search/?f_TPR=r5184000&geoId=102478259&keywords=';

  constructor(private jobRepository: JobRepository) {}

  async scrapeLinkedin(browser: Browser) {
    console.log('scrap job from linkedin.com started...');

    const jobBoxClass = '.job-search-card';
    const jobTitleClass = '.base-search-card__title';
    const jobUrlClass = '.base-card__full-link';
    const jobCompanyClass = '.base-search-card__subtitle';
    const jobLocationClass = '.job-search-card__location';
    const jobDateClass = '.job-search-card__listdate';

    keywords.forEach(async (k) => {
      const url = `${this.linkedinUrl}${k}&location=Indonesia&origin=JOB_SEARCH_PAGE_JOB_FILTER`;
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

          await card.waitForSelector(jobUrlClass);
          const jobUrlElement = await card.$(jobUrlClass);
          const jobUrl = (
            await jobUrlElement.evaluate((el) => el.getAttribute('href'))
          ).trim();

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
          const jobDateElement = await card.$(jobDateClass);
          const jobDate = await jobDateElement.evaluate((el) => el.textContent);
          const jobDateFormatted = convertLinkedinDate(jobDate.trim());

          await this.jobRepository.addJob({
            title: jobTitle,
            publicationDate: jobDateFormatted,
            location: jobLocation,
            company: jobCompany,
            url: jobUrl,
            source: Source.LINKEDIN,
          });
        }

        await page.close();
      } catch (error) {
        console.log('error', error);
      }
    });
  }
}

export default LinkedinScrapper;
