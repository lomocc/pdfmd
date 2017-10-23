const markdownParser = require('./markdownParser');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const glob = require("glob");

module.exports = async function (input, output, debug) {
  const inputDir = path.dirname(path.resolve(input));
  const outputDir = path.dirname(path.resolve(output));
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let files;
  if(/\.md$/.test(input)){
    files = [path.relative(inputDir, path.resolve(input))];
  }else{
    files = await glob.sync("**/*.md", {cwd: inputDir});
  }
  for(let fileName of files){
    let source = fs.readFileSync(path.join(inputDir, fileName), 'utf8');
    if(source.charCodeAt(0) == 0xFEFF || source.charCodeAt(0) == 0xEFBBBF){
      source = source.slice(1);
    }
    const innerHTML = await markdownParser(source);
    await page.setContent(innerHTML);
    if(debug){
      fs.writeFileSync(path.join(outputDir, fileName.replace(/\.md$/, '.html')), innerHTML);
    }
    // await page.emulateMedia('screen');
    const filePath = path.join(outputDir, fileName.replace(/\.md$/, '.pdf'));
    await fs.ensureDirSync(path.dirname(filePath));
    await page.pdf({path: filePath});
  }
  await browser.close();
};
