import { Module } from '@nestjs/common';
import JobRepository from '../../repositories/JobRepository';
import JobController from './JobController';
import JobService from './JobService';

@Module({
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobModule],
})
class JobModule {}

export default JobModule;
