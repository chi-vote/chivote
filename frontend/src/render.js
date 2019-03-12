import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, addLocaleData } from 'react-intl';
import { AppContext } from './app-context';

const beautify_html = require('js-beautify').html;

import App from './AppServer';

export default function renderPage(page, props) {
  const Component = () => (
    <AppContext.Provider value='/2019-feb-26/'>
      <IntlProvider locale='en'>
        <App component={page} {...props} />
      </IntlProvider>
    </AppContext.Provider>
  );

  const html = ReactDOMServer.renderToString(<Component />);
  return beautify_html(html);
}
