import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import { hot } from 'react-hot-loader/root';
import { SiteMenu } from './SiteMenu';
import './style.scss';

class Nav extends Component {
  render() {
    const currPath = window.location.pathname;
    const urlRoot = currPath.includes('/es/') ? '/es/' : '/';

    return (
      <nav className='navbar'>
        <a href={urlRoot} className='navbar__logo'>
          <img src={chivoteLogo} alt='' />
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

export default hot(Nav);
