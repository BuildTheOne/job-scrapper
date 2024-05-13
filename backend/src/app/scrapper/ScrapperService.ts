import { Injectable } from '@nestjs/common';
import { Source } from '@prisma/client';
import moment from 'moment';
import JobRepository from '../../repositories/JobRepository';

@Injectable()
class ScrapperService {
  constructor(private jobRepository: JobRepository) {}

  async activateScrapper() {
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
