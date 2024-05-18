"use server";

import { format } from "date-fns";
import { Job, JobSearchQuery } from "./types";

const searchJob = async (query: JobSearchQuery) => {
  "use server";

  const queryTitle = query.title ? `title=${query.title}` : "";
  const queryDate = query.publicationDate
    ? `publicationDate=${format(query.publicationDate, "yyyy-MM-dd")}`
    : "";
  const queryLocation = query.location ? `location=${query.location}` : "";
  const queryCompany = query.company ? `company=${query.company}` : "";

  const url = `http://localhost:3000/api/job?${queryTitle}&${queryDate}&${queryLocation}&${queryCompany}`;

  const req = await fetch(url);
  const res = await req.json();
  if (res.statusCode !== 200) {
    return [];
  }
  const jobData: Job[] = res.data;

  return jobData;
};

export default searchJob;
