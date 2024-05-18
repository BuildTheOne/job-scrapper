export interface Job {
  title: string;
  publicationDate: Date;
  location: string;
  company: string;
  url: string;
  source: string;
}

export interface JobSearchQuery {
  title?: string;
  publicationDate?: Date;
  location?: string;
  company?: string;
}
