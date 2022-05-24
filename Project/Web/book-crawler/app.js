const axios = require("axios");
const iconv = require("iconv-lite");
const cheerio = require('cheerio');

axios({
  url: "http://www.yes24.com/24/Category/BestSeller",
  mothod: "GET",
  responseType: "arraybuffer",
})
  .then((response) => {
    const content = iconv.decode(response.data, 'EUC-KR').toString();

    const $ = cheerio.load(content);

    $("#bestList > ol > li").each((index,element) => {

        title =$(element).find("p:nth-child(3)>a").text();
        desc = $(element).find("p.copy>a").text();
        console.log(index+1 ,title, desc);

    });
    
  })
  .catch((error)=> {

    console.error(error);

  });
