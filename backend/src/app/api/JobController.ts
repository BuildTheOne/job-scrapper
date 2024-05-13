import { Controller, Get } from '@nestjs/common';
import JobService from './JobService';

@Controller('api')
class JobController {
  constructor(private jobService: JobService) {}

  @Get('job')
  getJobListing() {
    return this.jobService.getAllJob();
  }
}

export default JobController;
