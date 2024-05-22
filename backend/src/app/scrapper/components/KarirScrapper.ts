import { Injectable } from '@nestjs/common';
import { Source } from '@prisma/client';
import { Browser } from 'puppeteer-core';
import JobRepository from '../../../repositories/JobRepository';
import { keywords } from '../config/constant';
import { convertKarirDate } from '../utils/convertKarirDate';

@Injectable()
class KarirScrapper {
  karirUrl = `https://karir.com/search-lowongan?keyword=`;

  constructor(private jobRepository: JobRepository) {}

  async scrapeKarir(browser: Browser) {
    console.log('scrap job from karir.com started...');

    const jobBoxClass = '.jsx-4093401097.container';
    const jobCompanyDataClass = '.MuiTypography-root.MuiTypography-body1';

    for (const keyword of keywords) {
      const url = `${this.karirUrl}${keyword}`;
      try {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();

        await page.goto(url);

        await page.waitForSelector(jobBoxClass);
        const cards = await page.$$(jobBoxClass);

        for (const card of cards) {
          await card.waitForSelector(jobCompanyDataClass);
          const jobCompanyDataElement = await card.$$(jobCompanyDataClass);

          const jobTitle = (
            await jobCompanyDataElement[0].evaluate((el) => el.textContent)
          ).trim();

          const jobCompany = (
            await jobCompanyDataElement[1].evaluate((el) => el.textContent)
          ).trim();

          const jobLocation = (
            await jobCompanyDataElement[3].evaluate((el) => el.textContent)
          ).trim();

          const jobDate = (
            await jobCompanyDataElement[5].evaluate((el) => el.textContent)
          ).trim();
          const jobDateFormatted = convertKarirDate(jobDate);

          await card.waitForSelector('img');
          const jobImageElement = await card.$$('.jsx-4093401097');
          const jobImage = await jobImageElement[1].$eval('img', (el) =>
            el.getAttribute('src'),
          );

          await this.jobRepository.addJob({
            title: jobTitle,
            publicationDate: jobDateFormatted,
            location: jobLocation,
            company: jobCompany,
            url: jobImage,
            source: Source.KARIR,
          });
        }

        await page.close();
      } catch (error) {
        console.log('error', error);
      }
    }
    console.log('scrap job from karir.com finished...');
  }
}

export default KarirScrapper;
