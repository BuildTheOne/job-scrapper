const jobstreetUrl = `https://www.jobstreet.co.id/programmer-jobs`;

const scrapperJobstreet = async () => {
  console.log(`Scraping job data from jobstreet.co.id...`);
  console.log(jobstreetUrl);

  const res = await fetch(jobstreetUrl);
  console.log(res);
};

export default scrapperJobstreet;
