import { Source } from '@prisma/client';

export interface JobRequest {
  title: string;
  publicationDate: Date;
  location: string;
  company: string;
  url: string;
  source: Source;
}
