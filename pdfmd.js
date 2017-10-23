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
  .option('-i, --inputDir [value]', '.md 源文件目录')
  .option('-o, --outputDir [value]', '.pdf 输出目录')
  .option('-d, --debug', '是否输出 HTML 文件')
  .parse(process.argv);

(async() => {
  if(program.inputDir){
    await pdf(program.inputDir, program.outputDir || program.inputDir, program.debug);
    await process.exit();
  }
})();
