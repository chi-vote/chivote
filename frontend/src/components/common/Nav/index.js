import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { SiteLogo } from 'Theme/images';
import SiteMenu from './SiteMenu';
import styles from './styles.module.scss';

class Nav extends Component {
  render() {
    const urlRoot = this.props.intl.locale == 'es' ? '/es/' : '/';

    return (
      <nav className={styles.root}>
        <a href={urlRoot} className={styles.logo}>
          <img src={SiteLogo} alt='' />
        </a>

        <div className={styles.tagline}>
          <FormattedMessage
            id='Nav.tagline'
            defaultMessage='Everything you need to vote on Feb. 26th'
          />
        </div>

        <div className={styles.menu}>
          <SiteMenu right />
        </div>
      </nav>
    );
  }
}

export default injectIntl(Nav);
