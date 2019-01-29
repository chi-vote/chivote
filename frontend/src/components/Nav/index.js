import React, { Component } from 'react';
import './style.scss';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import { hot } from 'react-hot-loader/root';
import { SiteMenu } from './SiteMenu';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          <img src={chivoteLogo} alt="" />
        </a>

        <span className="navbar__tagline is-size-7-touch is-size-4-desktop has-text-white has-text-centered">
          Everything you need to vote on Feb 26th
        </span>
        <SiteMenu right className="site-menu" />
      </nav>
    );
  }
}

export default hot(Nav);
