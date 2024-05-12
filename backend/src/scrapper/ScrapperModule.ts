import { Module } from '@nestjs/common';
import ScrapperService from './ScrapperService';

@Module({
  providers: [ScrapperService],
  exports: [ScrapperModule],
})
export class ScrapperModule {}
