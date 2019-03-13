import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SiteLogo } from 'Theme/images';
import SiteMenu from './SiteMenu';
import { withAppContext } from 'Root/app-context';
import styles from './styles.module.scss';
import cn from 'classnames';

class Nav extends Component {
  render() {
    const urlRoot = this.props.context.rootPath;
    const classes = this.props.classes || {};

    return (
      <nav className={cn(styles.root, classes.nav)}>
        <a href={urlRoot} className={cn(styles.logo, classes.logo)}>
          <img src={SiteLogo} alt='' />
        </a>

        <div className={cn(styles.tagline, classes.tagline)}>
          <FormattedMessage
            id='Nav.tagline'
            defaultMessage='Everything you need to vote in Chicago elections'
          />
        </div>

        <div className={styles.menu}>
          <SiteMenu right />
        </div>
      </nav>
    );
  }
}

export default withAppContext(Nav);
