import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default function render() {
  const App = () => <div>Hello world</div>;
  const html = ReactDOMServer.renderToString(<App />);

  return html;
}
