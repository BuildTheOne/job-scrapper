import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';
import JobRepository from '../../repositories/JobRepository';
import JobstreetScrapper from './components/JobstreetScrapper';
import KalibrrScrapper from './components/KalibrrScrapper';
import KarirScrapper from './components/KarirScrapper';
import LinkedinScrapper from './components/LinkedinScrapper';
@Injectable()
class ScrapperService {
  constructor(
    private jobRepository: JobRepository,
    private karirScrapper: KarirScrapper,
    private kalibrrScrapper: KalibrrScrapper,
    private jobstreetScrapper: JobstreetScrapper,
    private linkedinScrapper: LinkedinScrapper,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async activateScrapper() {
    await this.scrapJobData();
  }

  async scrapJobData() {
    await this.jobRepository.deleteAllJob();

    console.log('job scrapper start\n---------------------------');

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROME_BIN,
      args: [
        `--no-sandbox`,
        `--disable-gpu`,
        `--disable-dev-shm-usage`,
        `--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36`,
        `--start-maximized`,
      ],
    });

    await this.kalibrrScrapper.scrapeKalibrr(browser);
    await this.jobstreetScrapper.scrapeJobstreet(browser);
    await this.linkedinScrapper.scrapeLinkedin(browser);
    await this.karirScrapper.scrapeKarir(browser);

    const jobs = await this.jobRepository.findAllJobs({});
    const seenUrls = new Set();
    jobs.forEach(async (job) => {
      if (seenUrls.has(job.url)) {
        return await this.jobRepository.deleteJob(job.jobId);
      }
      seenUrls.add(job.url);
    });

    console.log('---------------------------\njob scrapper finish');
  }
}

export default ScrapperService;
