import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { SearchJobQuery } from 'src/app/api/JobQuery';
import BaseResponse from '../common/BaseResponse';
import prismaClient from '../config/prisma';
import { JobInterface } from '../types/Job';

@Injectable()
class JobRepository {
  async findAllJobs(query: SearchJobQuery) {
    try {
      return await prismaClient.job.findMany({
        where: {
          title: {
            contains: query.title,
            mode: 'insensitive',
          },
          publicationDate: {
            equals: query.publicationDate
              ? new Date(query.publicationDate)
              : undefined,
          },
          location: {
            contains: query.location,
            mode: 'insensitive',
          },
          company: {
            contains: query.company,
            mode: 'insensitive',
          },
        },
      });
    } catch (error) {
      console.log(error);
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

  async deleteJob(jobId: string) {
    try {
      return await prismaClient.job.delete({
        where: {
          jobId: jobId,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        BaseResponse.error<null>(HttpStatus.BAD_REQUEST, 'Error', null),
      );
    }
  }

  async deleteAllJob() {
    try {
      return await prismaClient.job.deleteMany({});
    } catch (error) {
      throw new BadRequestException(
        BaseResponse.error<null>(HttpStatus.BAD_REQUEST, 'Error', null),
      );
    }
  }
}

export default JobRepository;
