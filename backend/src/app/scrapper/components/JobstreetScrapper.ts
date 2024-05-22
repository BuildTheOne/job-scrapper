import { Injectable } from '@nestjs/common';
import JobRepository from '../../../repositories/JobRepository';
import { jobstreetUrl } from '../config/constant';

@Injectable()
class JobstreetScrapper {
  constructor(private jobRepository: JobRepository) {}

  async scrapJobstreet() {
    jobstreetUrl;
  }
}

export default JobstreetScrapper;
