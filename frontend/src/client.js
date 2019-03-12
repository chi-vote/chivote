import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppClient';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import localeData from 'Public/locales/data.json';

addLocaleData([...en, ...es]);

const currPath = window.location.pathname;
let locale = currPath.includes('/es/') ? 'es' : 'en';

/**
 * If Django hasn't injected these properties into the HTML
 * template that's loading this script then we're viewing it
 * via the create-react-app liveserver
 */
window.component = window.component || 'Homepage';
window.props = window.props || {};
window.reactRoot = window.reactRoot || document.getElementById('root');

const main = () => {
  // Load custom tracking code lazily, so it's non-blocking
  import(/* webpackChunkName: "analytics" */ './analytics.js').then(analytics =>
    analytics.init()
  );

  // Conditionally load moment-locale-es
  locale == 'es' &&
    import(/* webpackChunkName: "moment-es" */ 'moment/locale/es.js');

  // Initiate all other code paths here...
  ReactDOM.render(
    <IntlProvider locale={locale} messages={localeData[locale]}>
      <App {...window.props} component={window.component} />
    </IntlProvider>,
    window.reactRoot
  );
};

main();
