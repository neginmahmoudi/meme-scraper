import * as cheerio from 'cheerio';
import * as fs from 'fs';
import fetch from 'node-fetch';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();
const $ = cheerio.load(body);
// create new directory
// directory path
const dir = './memes';
fs.mkdir(dir, (err) => {
  if (dir) return;
  if (err) {
    throw err;
  }
});

let div = $('section > div');
// recieve all parents of images
let src = [];
div.each(function () {
  //add this value to the array
  src.push($(this).find('img').attr('src'));
});

const sliced = src.slice(0, 10);

for (let i = 0; i < sliced.length; i++) {
  const fetchImage = await fetch(sliced[i]);
  const arrayBuffer = await fetchImage.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(`./memes/0${i + 1}.jpg`, buffer, function () {});
}
