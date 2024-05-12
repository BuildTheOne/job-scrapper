import { Module } from '@nestjs/common';
import JobRepository from '../../repositories/JobRepository';
import ScrapperController from './ScrapperController';
import ScrapperService from './ScrapperService';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, JobRepository],
  exports: [ScrapperModule],
})
class ScrapperModule {}

export default ScrapperModule;
