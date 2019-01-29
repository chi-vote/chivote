import React, { Component } from 'react';
import './style.scss';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import { hot } from 'react-hot-loader/root';
import { SiteMenu } from './SiteMenu';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/">
          <img src={chivoteLogo} alt="" className="navbar__logo" />
        </a>
        <span className="navbar__tagline has-text-white has-text-centered">
          Everything you need <br class="is-hidden-tablet" /> to vote on Feb
          26th
        </span>
        <SiteMenu right className="site-menu" />
      </nav>
    );
  }
}

export default hot(Nav);
