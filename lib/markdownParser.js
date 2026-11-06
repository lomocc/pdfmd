/**
 * Created by Vincent on 2017/10/9.
 */
const commonmark = require("commonmark");
const formatString = require("./formatString");
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();
const fs = require('fs-extra');
const path = require('path');

const templateDir = path.join(__dirname, '..', './template');

const markdown_html = fs.readFileSync(path.join(templateDir, 'index.html'), 'utf8');
const markdown_style = fs.readFileSync(path.join(templateDir, 'github-markdown.css'), 'utf8');

module.exports = function (data) {
  var markdown_body = `<article class="markdown-body">${writer.render(reader.parse(data))}</article>`; // content is a String
  let HTML = formatString(markdown_html, {
    markdown_style: markdown_style,
    markdown_body: markdown_body
  });
  return HTML;
};
