import { HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import BaseResponse from '../../common/BaseResponse';
import JobRepository from '../../repositories/JobRepository';
import { SearchJobQuery } from './JobQuery';

@Injectable()
class JobService {
  constructor(private jobRepository: JobRepository) {}

  async getAllJob(query: SearchJobQuery) {
    const jobList = await this.jobRepository.findAllJobs(query);

    return BaseResponse.success(HttpStatus.OK, 'success', jobList);
  }
}

export default JobService;
