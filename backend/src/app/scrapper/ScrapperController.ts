import { Controller, Get } from '@nestjs/common';
import ScrapperService from './ScrapperService';

@Controller('')
class ScrapperController {
  constructor(private scrapperService: ScrapperService) {}

  @Get('scrap-job')
  scrapJobData() {
    return this.scrapperService.activateScrapper();
  }
}

export default ScrapperController;
