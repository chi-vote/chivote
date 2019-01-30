import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export const SiteMenu = props => (
  <Menu {...props}>
    <a className="menu-item" href="/">
      <i className="fas fa-home" />
      Home
    </a>
    <a className="menu-item" href="/races/">
      <i className="fas fa-vote-yea" />
      Races
    </a>
    <a className="menu-item" href="/faq/">
      <i className="far fa-question-circle" />
      FAQ
    </a>
    <a className="menu-item" href="/ask/">
      <i className="far fa-comment-alt" />
      Ask
    </a>
    <a className="menu-item" href="/quiz">
      <i className="fas fa-gamepad" />
      Quiz
    </a>
  </Menu>
);
