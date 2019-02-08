import decode from 'decode-html';
import Parser from 'html-react-parser';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function parseHtml(html) {
  return Parser(decode(html.replace(/"'|'"/g, '"')));
}

export { parseHtml, slugify };
