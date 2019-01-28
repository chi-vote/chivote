import React, { Component } from 'react';
import './style.scss';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import { hot } from 'react-hot-loader/root';

class Nav extends Component {
  render() {
    return (
      <>
        <nav class="navbar navbar--mobile">
          <a href="/">
            <img src={chivoteLogo} alt="" class="navbar__logo" />
          </a>
          <span class="is-size-7 has-text-white">
            Everything you need for Feb 26th
          </span>
          <a
            href="#offcanvas-menu"
            class="navbar-menu-trigger"
            id="menu-trigger"
          >
            <span class="icon is-medium">
              <i class="fas fa-2x fa-bars" />
            </span>
          </a>
        </nav>
        {/* <aside id="offcanvas-menu" class="mobile-menu">
          <li class="menu-item">
            <a href="{% url 'index' %}">Home</a>
          </li>
          <li class="menu-item">
            <a href="{% url 'race-list' %}">Races</a>
          </li>
          <li class="menu-item">
            <a href="{% url 'page-detail' 'faq' %}">FAQ</a>
          </li>
          <li class="menu-item">
            <a href="{% url 'page-detail' 'ask' %}">Ask</a>
          </li>
          <li class="menu-item">
            <a href="{% url 'page-detail' 'quiz' %}">Quiz</a>
          </li>
        </aside> */}
      </>
    );
  }
}

export default hot(Nav);
