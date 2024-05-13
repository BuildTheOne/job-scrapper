import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import JobModule from './app/api/JobModule';
import ScrapperModule from './app/scrapper/ScrapperModule';

@Module({
  imports: [ScheduleModule.forRoot(), ScrapperModule, JobModule],
})
export class AppModule {}
