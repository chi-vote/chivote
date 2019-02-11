import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export const SiteMenu = props => {
  const currPath = window.location.pathname;
  const urlRoot = currPath.includes('/es/') ? '/es/' : '/';

  return (
    <Menu {...props}>
      <a className='menu-item' href={urlRoot}>
        <i className='fas fa-home' />
        Home
      </a>
      <a className='menu-item' href={urlRoot + 'races/'}>
        <i className='fas fa-vote-yea' />
        Races
      </a>
      <a className='menu-item' href={urlRoot + 'faq/'}>
        <i className='far fa-question-circle' />
        FAQ
      </a>
      <a className='menu-item' href={urlRoot + 'ask/'}>
        <i className='far fa-comment-alt' />
        Ask
      </a>
      <a className='menu-item' href={urlRoot + 'quiz/'}>
        <i className='fas fa-gamepad' />
        Quiz
      </a>
      <a className='menu-item' href={urlRoot + 'events/'}>
        <i className='fas fa-calendar' />
        Events
      </a>
      <hr />
      <div>
        <p className='has-text-weight-bold'>Contact us</p>
        <p>Got questions? Need help? Did we miss something?</p>
        <p>
          Email us at <a href='mailto:info@chi.vote'>info@chi.vote</a>.
        </p>
      </div>
    </Menu>
  );
};
