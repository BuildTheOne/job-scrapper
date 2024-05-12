import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import BaseResponse from '../common/BaseResponse';
import { JobRequest } from '../components/Job/JobRequest';
import prismaClient from '../config/prisma';

@Injectable()
class JobRepository {
  async findAllRepository() {
    try {
      return await prismaClient.job.findMany({});
    } catch (error) {
      throw new BadRequestException(
        BaseResponse.error<null>(HttpStatus.BAD_REQUEST, 'Error', null),
      );
    }
  }

  async addJob(data: JobRequest) {
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
