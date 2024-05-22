import { Injectable } from '@nestjs/common';
import { Source } from '@prisma/client';
import { Browser } from 'puppeteer-core';
import JobRepository from '../../../repositories/JobRepository';
import { keywords } from '../config/constant';

@Injectable()
class KarirScrapper {
  karirUrl = `https://karir.com/search-lowongan?keyword=`;

  constructor(private jobRepository: JobRepository) {}

  async scrapKarir(browser: Browser) {
    console.log('scrap job from karir.com started...');

    const jobBoxClass = '.jsx-4093401097';
    const jobTitleClass = 'css-au5tz6';
    const jobCompanyClass = 'css-rd4nzp';
    const jobLocationClass = 'css-xl10kd';
    const jobDateClass = 'css-1cyztla';
    const jobSource = Source.KARIR;

    keywords.forEach(async (k) => {
      const url = `${this.karirUrl}${k}`;
      try {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();
        await page.goto(url);

        const cards = await page.$$(jobBoxClass);
        cards.forEach(async (card) => {
          await card.waitForSelector(jobTitleClass);
          const jobTitle = await card.$(jobTitleClass);
          console.log(jobTitle);
        });

        await page.close();
      } catch (error) {
        console.log('error', error);
      }
    });

    // await this.jobRepository.addJob({
    //   title: `job ${this.randomString(4)}`,
    //   publicationDate: moment().toDate(),
    //   location: 'jkt',
    //   company: 'pt abc',
    //   url: this.randomString(),
    //   source: Source.KALIBRR,
    // });

    console.log('scrap job from karir.com finished...');
  }
}

export default KarirScrapper;
