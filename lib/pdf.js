const markdownParser = require('./markdownParser');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const glob = require("glob");

module.exports = async function (input, output) {
  const inputDir = path.resolve(input);
  const outputDir = path.resolve(output);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const files = await glob.sync("**/*.md", {cwd: inputDir});

  for(let fileName of files){
    const innerHTML = await markdownParser(fs.readFileSync(path.join(inputDir, fileName), 'utf8'));
    await page.setContent(innerHTML);
    // await page.emulateMedia('screen');
    const filePath = path.join(outputDir, fileName.replace(/\.md$/, '.pdf'));
    await fs.ensureDirSync(path.dirname(filePath));
    await page.pdf({path: filePath});
  }
  await browser.close();
};
