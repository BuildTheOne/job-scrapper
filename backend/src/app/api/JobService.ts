import { HttpStatus, Injectable } from '@nestjs/common';
import BaseResponse from '../../common/BaseResponse';
import JobRepository from '../../repositories/JobRepository';

@Injectable()
class JobService {
  constructor(private jobRepository: JobRepository) {}

  async getAllJob() {
    const jobList = await this.jobRepository.findAllJobs();

    return BaseResponse.success(HttpStatus.OK, 'success', jobList);
  }
}

export default JobService;
