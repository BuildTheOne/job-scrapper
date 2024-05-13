import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import BaseResponse from '../common/BaseResponse';
import { JobInterface } from '../components/Job/Job';
import prismaClient from '../config/prisma';

@Injectable()
class JobRepository {
  async findAllJobs() {
    try {
      return await prismaClient.job.findMany({});
    } catch (error) {
      throw new BadRequestException(
        BaseResponse.error<null>(HttpStatus.BAD_REQUEST, 'Error', null),
      );
    }
  }

  async addJob(data: JobInterface) {
    try {
      return await prismaClient.job.create({
        data: data,
      });
    } catch (error) {
      throw new BadRequestException(
        BaseResponse.error<null>(HttpStatus.BAD_REQUEST, 'Error', null),
      );
    }
  }
}

export default JobRepository;
