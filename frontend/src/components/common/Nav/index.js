import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { SiteLogo } from 'Theme/images';
import SiteMenu from './SiteMenu';
import styles from './styles.module.scss';
import cn from 'classnames';

class Nav extends Component {
  render() {
    const urlRoot = this.props.intl.locale == 'es' ? '/es/' : '/';
    const classes = this.props.classes || {};

    return (
      <nav className={cn(styles.root, classes.nav)}>
        <a href={urlRoot} className={cn(styles.logo, classes.logo)}>
          <img src={SiteLogo} alt='' />
        </a>

        <div className={cn(styles.tagline, classes.tagline)}>
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
