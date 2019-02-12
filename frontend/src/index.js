import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import localeData from 'Public/locales/data.json';

addLocaleData([...en, ...es]);

const currPath = window.location.pathname;
let language = currPath.includes('/es/') ? 'es' : 'en';

/**
 * If Django hasn't injected these properties into the HTML
 * template that's loading this script then we're viewing it
 * via the create-react-app liveserver
 */
window.component = window.component || 'Homepage';
window.props = window.props || { env: 'create-react-app' };
window.reactRoot = window.reactRoot || document.getElementById('root');

ReactDOM.render(
  <IntlProvider locale={language} messages={localeData[language]}>
    <App {...window.props} component={window.component} />
  </IntlProvider>,
  window.reactRoot
);
