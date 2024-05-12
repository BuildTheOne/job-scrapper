import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import ScrapperModule from './app/scrapper/ScrapperModule';

@Module({
  imports: [ScheduleModule.forRoot(), ScrapperModule],
})
export class AppModule {}
