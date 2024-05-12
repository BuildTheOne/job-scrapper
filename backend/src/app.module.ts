import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapperModule } from './scrapper/ScrapperModule';

@Module({
  imports: [ScheduleModule.forRoot(), ScrapperModule],
})
export class AppModule {}
