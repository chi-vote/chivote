import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/max-scroll-tracker';
import 'autotrack/lib/plugins/page-visibility-tracker';
import 'autotrack/lib/plugins/url-change-tracker';

export const init = () => {
  // Initialize the command queue in case analytics.js hasn't load yet.
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

  const gtag =
    process.env.NODE_ENV === 'development'
      ? 'UA-132460152-2' // dev tag
      : 'UA-132460152-1'; // prod tag

  ga('create', gtag, 'auto');
  ga('set', 'transport', 'beacon');

  // require autotrack.js plugins
  ga('require', 'outboundLinkTracker');
  ga('require', 'maxScrollTracker');
  ga('require', 'pageVisibilityTracker', {
    sendInitialPageview: true,
    timeZone: 'America/Chicago'
  });
  ga('require', 'urlChangeTracker');

  // ga('send', 'pageview'); // commented out because we're handling this in pageVisibilityTracker
};
