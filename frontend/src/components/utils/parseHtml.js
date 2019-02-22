import decode from 'decode-html';
import Parser from 'html-react-parser';

export default function parseHtml(html, patterns = [[/"'|'"/g, '"']]) {
  let preppedHtml = html;

  patterns.forEach(pattern => {
    const [target, replacement] = pattern;
    preppedHtml = preppedHtml.replace(target, replacement);
  });

  return Parser(decode(preppedHtml));
}
