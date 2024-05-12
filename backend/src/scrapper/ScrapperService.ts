import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
class ScrapperService {
  @Cron('0 0 1 * * *')
  async activate() {
    await this.scrapJobData();
  }

  async scrapJobData() {
    console.log('job scrapper start');
  }
}

export default ScrapperService;
