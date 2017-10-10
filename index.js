#!/usr/bin/env node
/**
 * Created by Vincent on 2017/8/17.
 */
const pdf = require('./lib/pdf');
const program = require('commander');
const version = require("./package.json").version;

console.log('pdfmd@', version);

program
  .version('0.1.0')
  .allowUnknownOption()
  .option('-i, --inputDir [value]', 'markdown 目录')
  .option('-o, --outputDir [value]', '输出目录')
  // .command('convert [filePath]', 'convert .md to .pdf')
  .parse(process.argv);

(async() => {
  await pdf(program.inputDir, program.outputDir || program.inputDir);
  await process.exit();
})();