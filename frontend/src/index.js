import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * If Django hasn't injected these properties into the HTML
 * template that's loading this script then we're viewing it
 * via the create-react-app liveserver
 */
window.component = window.component || 'Homepage';
window.props = window.props || { env: 'create-react-app' };
window.reactRoot = window.reactRoot || document.getElementById('root');

ReactDOM.render(
  <App {...window.props} component={window.component} />,
  window.reactRoot
);
