const kalibrrUrl = `https://www.kalibrr.com/home/te/programmer`;

const scrapperKalibrr = async () => {
  console.log(`Scraping job data from kalibrr.com...`);
  console.log(kalibrrUrl);

  const res = await fetch(kalibrrUrl);
  console.log(res);
};

export default scrapperKalibrr;
