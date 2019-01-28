import React, { Component } from 'react';
import './style.scss';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import { hot } from 'react-hot-loader/root';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <img
                className="header__logo"
                src={chivoteLogo}
                alt="Chi.Vote logo"
              />
            </div>
            <div className="level-item">
              <h1 className="header__tagline">
                Everything you need to know to vote in Chicago on
                <em className="is-darkblue-text"> Tuesday, Feb. 26th</em>
              </h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button className="button is-rounded is-medium">
                What is this?
              </button>
            </div>
            <div className="level-item">
              <span className="icon is-large has-text-white">
                <i className="fa fa-bars fa-3x" />
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default hot(Header);
