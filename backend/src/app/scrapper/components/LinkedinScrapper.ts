import { Injectable } from '@nestjs/common';
import JobRepository from 'src/repositories/JobRepository';
import { linkedinUrl } from '../config/constant';

@Injectable()
class LinkedinScrapper {
  constructor(private jobRepository: JobRepository) {}

  async scrapLinkedin() {
    linkedinUrl;
  }
}

export default LinkedinScrapper;
