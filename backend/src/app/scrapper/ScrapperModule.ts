import { Module } from '@nestjs/common';
import JobRepository from '../../repositories/JobRepository';
import ScrapperController from './ScrapperController';
import ScrapperService from './ScrapperService';
import JobstreetScrapper from './components/JobstreetScrapper';
import KalibrrScrapper from './components/KalibrrScrapper';
import KarirScrapper from './components/KarirScrapper';
import LinkedinScrapper from './components/LinkedinScrapper';

@Module({
  controllers: [ScrapperController],
  providers: [
    ScrapperService,
    JobRepository,
    KarirScrapper,
    KalibrrScrapper,
    JobstreetScrapper,
    LinkedinScrapper,
  ],
  exports: [ScrapperModule],
})
class ScrapperModule {}

export default ScrapperModule;
