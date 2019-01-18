import React, { Component } from 'react';
import '../assets/styles/Header.css';
import chivoteLogo from '../assets/images/chivote-logo-7x.png'
import { hot } from 'react-hot-loader/root';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <img className="header__logo" src={chivoteLogo} alt="Chi.Vote logo"/>
            </div>
            <div className="level-item">
              <span className="header__tagline">
                Everything you need to know to vote in Chicago on
                <span className="is-darkblue-text"> Tuesday, Feb. 26th</span>
              </span>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button className="button is-rounded is-medium">What is this?</button>
            </div>
            <div className="level-item">
              <span className="icon is-large has-text-white">
                <i className="fa fa-bars fa-3x"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default hot(Header)