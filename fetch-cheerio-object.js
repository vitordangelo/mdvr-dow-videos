const fetchCheerioObject = require('fetch-cheerio-object');
const FormData = require('form-data');
const fs = require("fs");

var form = new FormData();

form.append('sdcard', '0');
form.append('date', '2019');
form.append('date', '3');
form.append('date', '20');
form.append('stime', '00');
form.append('stime', '00');
form.append('stime', '00');
form.append('etime', '23');
form.append('etime', '59');
form.append('etime', '59');
form.append('type', '1');
form.append('channel', '1');

const writeStream = fs.createWriteStream('link.txt');

async function crowler() {
  const videos = []
  try {
    const $ = await fetchCheerioObject('http://192.168.2.15/cgi-bin/VideoSearchOpr.cgi', 
      { method: 'POST', body: form })

      $('a').each( function () {
        var link = $(this).attr('href');
        videos.push(link)
      });

  } catch (error) {
    console.log(error)
  }
  videos.forEach(i => {
    writeStream.write(`http://192.168.2.15${i}\n`)
  })
}

crowler()