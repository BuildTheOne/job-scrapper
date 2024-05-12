import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Source } from '@prisma/client';
import * as moment from 'moment';
import JobRepository from 'src/repositories/JobRepository';

@Injectable()
class ScrapperService {
  constructor(private jobRepository: JobRepository) {}

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @Cron(CronExpression.EVERY_5_MINUTES)
  async activate() {
    await this.scrapJobData();
  }

  async scrapJobData() {
    console.log('job scrapper start');
    await this.jobRepository.addJob({
      title: `job ${this.randomString(4)}`,
      publicationDate: moment().toDate(),
      location: 'jkt',
      company: 'pt abc',
      url: this.randomString(),
      source: Source.KALIBRR,
    });
    console.log('job scrapper finish');
  }

  // FOR DEV PURPOSES - DONT FORGET TO DELETE
  randomString = (length: number = 10) => {
    const charList =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let counter = 0;
    while (counter < length) {
      result += charList.charAt(Math.floor(Math.random() * charList.length));
      counter += 1;
    }
    return result;
  };
}

export default ScrapperService;
