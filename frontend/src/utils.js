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

function parseHtml(html, patterns = [[/"'|'"/g, '"']]) {
  let preppedHtml = html;

  patterns.forEach(pattern => {
    const [target, replacement] = pattern;
    preppedHtml = preppedHtml.replace(target, replacement);
  });

  return Parser(decode(preppedHtml));
}

export { parseHtml, slugify };
