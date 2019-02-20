import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, addLocaleData } from 'react-intl';

import { Nav, Footer } from './components/common';

import App from './AppServer';

export default function render() {
  const Component = () => (
    <IntlProvider locale='en'>
      <App component='homepage' />
    </IntlProvider>
  );

  const html = ReactDOMServer.renderToString(<Component />);
  return html;
}
