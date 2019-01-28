import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SiteMenu.scss';

export const SiteMenu = props => (
  <Menu {...props}>
    <a className="menu-item" href="/">
      <i class="fas fa-home" />
      Home
    </a>
    <a className="menu-item" href="/races/">
      <i class="fas fa-vote-yea" />
      Races
    </a>
    <a className="menu-item" href="/faq/">
      <i class="far fa-question-circle" />
      FAQ
    </a>
    <a className="menu-item" href="/ask/">
      <i class="far fa-comment-alt" />
      Ask
    </a>
    <a className="menu-item" href="/quiz">
      <i class="fas fa-gamepad" />
      Quiz
    </a>
  </Menu>
);
