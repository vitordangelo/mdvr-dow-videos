const fetchCheerioObject = require("fetch-cheerio-object");
const FormData = require("form-data");
const fs = require("fs");

var form = new FormData();

form.append("sdcard", "0");
form.append("date", "2019");
form.append("date", "11");
form.append("date", "14");
form.append("stime", "00");
form.append("stime", "00");
form.append("stime", "00");
form.append("etime", "23");
form.append("etime", "59");
form.append("etime", "59");
form.append("type", "1");
form.append("channel", "1");
form.append("select_type", "0");
form.append("Save", "Search");

const writeStream = fs.createWriteStream("link.txt");

async function crowler() {
  const videos = [];
  try {
    const $ = await fetchCheerioObject(
      "http://192.168.2.133/cgi-bin/VideoSearchOpr.cgi",
      { method: "POST", body: form }
    );

    $("li").each(function() {
      const link = $("li").text();
      const linkArray = link.split("     ");
      const nameVideo = linkArray[1];
      videos.push(nameVideo);
    });
  } catch (error) {
    console.log(error);
  }
  videos.forEach(i => {
    writeStream.write(`http://192.168.2.133/sd1/2019-11-14/${i}\n`);
  });
}

crowler();
