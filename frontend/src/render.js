import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, addLocaleData } from 'react-intl';
import { AppContext } from './app-context';

const beautify_html = require('js-beautify').html;

import App from './AppServer';

export default function renderPage(page, props) {
  const Component = () => (
    <AppContext.Provider
      value={{
        rootPath: '/archive/2019-feb-26/',
        // rootPath: '/',
        archived: 'True',
        // archive: 'False',
        archiveMessage: 'Archived: March 15, 2019'
        // archiveMessage: ''
      }}
    >
      <IntlProvider locale='en'>
        <App component={page} {...props} />
      </IntlProvider>
    </AppContext.Provider>
  );

  const html = ReactDOMServer.renderToString(<Component />);
  return beautify_html(html);
}
