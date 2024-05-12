import { Module } from '@nestjs/common';
import JobRepository from '../../repositories/JobRepository';
import ScrapperService from './ScrapperService';

@Module({
  providers: [ScrapperService, JobRepository],
  exports: [ScrapperModule],
})
export class ScrapperModule {}
