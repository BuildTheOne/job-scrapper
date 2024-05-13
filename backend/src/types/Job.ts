import { Source } from '@prisma/client';

export interface JobInterface {
  title: string;
  publicationDate: Date;
  location: string;
  company: string;
  url: string;
  source: Source;
}
