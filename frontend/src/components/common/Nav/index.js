import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { SiteLogo } from 'Theme/images';
import { hot } from 'react-hot-loader/root';
import SiteMenu from './SiteMenu';
import './style.scss';

class Nav extends Component {
  render() {
    const urlRoot = this.props.intl.locale == 'es' ? '/es/' : '/';

    return (
      <nav className='navbar'>
        <a href={urlRoot} className='navbar__logo'>
          <img src={SiteLogo} alt='' />
        </a>

        <div className='navbar__tagline'>
          <FormattedMessage
            id='Nav.tagline'
            defaultMessage='Everything you need to vote on Feb. 26th'
          />
        </div>

        <div className='navbar__menu'>
          <SiteMenu right />
        </div>
      </nav>
    );
  }
}

export default hot(injectIntl(Nav));
