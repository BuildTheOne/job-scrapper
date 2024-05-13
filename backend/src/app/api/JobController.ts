import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SearchJobQuery } from './JobQuery';
import JobService from './JobService';

@Controller('api')
class JobController {
  constructor(private jobService: JobService) {}

  @Get('job')
  @HttpCode(HttpStatus.OK)
  getJobListing(@Query() query: SearchJobQuery) {
    return this.jobService.getAllJob(query);
  }
}

export default JobController;
