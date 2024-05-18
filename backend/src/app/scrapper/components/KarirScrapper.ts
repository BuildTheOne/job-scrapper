const karirUrl = `https://karir.com/search-lowongan?keyword=cyber security`;

const scrapperKarir = async () => {
  console.log(`Scraping job data from Karir.com...`);
  console.log(karirUrl);

  const res = await fetch(karirUrl);
  console.log(res);
};

export default scrapperKarir;
