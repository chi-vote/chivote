import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, addLocaleData } from 'react-intl';

const beautify_html = require('js-beautify').html;

import App from './AppServer';

export default function renderPage(page, props) {
  const Component = () => (
    <IntlProvider locale='en'>
      <App component={page} {...props} />
    </IntlProvider>
  );

  const html = ReactDOMServer.renderToString(<Component />);
  return beautify_html(html);
}
