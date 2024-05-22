import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-core';
import JobRepository from 'src/repositories/JobRepository';
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
      executablePath:
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      args: [
        `--no-sandbox`,
        `--disable-gpu`,
        `--disable-dev-shm-usage`,
        `--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36`,
        `--start-maximized`,
      ],
    });

    // await this.karirScrapper.scrapKarir(browser);
    await this.kalibrrScrapper.scrapeKalibrr(browser);
    // await this.jobstreetScrapper.scrapJobstreet();
    // await this.linkedinScrapper.scrapLinkedin();

    console.log('---------------------------\njob scrapper finish');
  }
}

export default ScrapperService;
