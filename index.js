import * as fs from 'node:fs';
import * as cheerio from 'cheerio';
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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (dir) return;
  if (err) {
    throw err;
  }
});

const div = $('section > div');
// recieve all parents of images
const src = [];
div.each(function () {

  src.push($(this).find('img').attr('src'));
});

const sliced = src.slice(0, 10);

for (let i = 0; i < sliced.length; i++) {
  const fetchImage = await fetch(sliced[i]);
  const arrayBuffer = await fetchImage.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(`./memes/0${i + 1}.jpg`, buffer, function () {});
}
