import React, { Component } from 'react';
import './style.scss';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import { hot } from 'react-hot-loader/root';

class Nav extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar--mobile">
          <a href="/">
            <img src={chivoteLogo} alt="" className="navbar__logo" />
          </a>
          <span className="is-size-7 has-text-white">
            Everything you need for Feb 26th
          </span>
          <a
            href="#offcanvas-menu"
            className="navbar-menu-trigger"
            id="menu-trigger"
          >
            <span className="icon is-medium">
              <i className="fas fa-2x fa-bars" />
            </span>
          </a>
        </nav>
        {/* <aside id="offcanvas-menu" className="mobile-menu">
          <li className="menu-item">
            <a href="{% url 'index' %}">Home</a>
          </li>
          <li className="menu-item">
            <a href="{% url 'race-list' %}">Races</a>
          </li>
          <li className="menu-item">
            <a href="{% url 'page-detail' 'faq' %}">FAQ</a>
          </li>
          <li className="menu-item">
            <a href="{% url 'page-detail' 'ask' %}">Ask</a>
          </li>
          <li className="menu-item">
            <a href="{% url 'page-detail' 'quiz' %}">Quiz</a>
          </li>
        </aside> */}
      </>
    );
  }
}

export default hot(Nav);
