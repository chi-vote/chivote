import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { slide as Menu } from 'react-burger-menu';

export const SiteMenu = props => {
  const currPath = window.location.pathname;
  const urlRoot = currPath.includes('/es/') ? '/es/' : '/';

  return (
    <Menu {...props}>
      <a className='menu-item' href={urlRoot}>
        <span className='icon'>
          <i className='fas fa-home' />
        </span>
        <FormattedMessage id='common.link.home' defaultMessage='Home' />
      </a>
      <a className='menu-item' href={urlRoot + 'races/'}>
        <span className='icon'>
          <i className='fas fa-vote-yea' />
        </span>
        <FormattedMessage id='common.link.races' defaultMessage='Races' />
      </a>
      <a className='menu-item' href={urlRoot + 'faq/'}>
        <span className='icon'>
          <i className='far fa-question-circle' />
        </span>
        <FormattedMessage id='common.link.faq' defaultMessage='FAQ' />
      </a>
      <a className='menu-item' href={urlRoot + 'ask/'}>
        <span className='icon'>
          <i className='far fa-comment-alt' />
        </span>
        <FormattedMessage id='common.link.ask' defaultMessage='Ask' />
      </a>
      <a className='menu-item' href={urlRoot + 'quiz/'}>
        <span className='icon'>
          <i className='fas fa-gamepad' />
        </span>
        <FormattedMessage id='common.link.quiz' defaultMessage='Quiz' />
      </a>
      <a className='menu-item' href={urlRoot + 'events/'}>
        <span className='icon'>
          <i className='fas fa-calendar' />
        </span>
        <FormattedMessage id='common.link.events' defaultMessage='Events' />
      </a>
      <hr />
      <div>
        <p className='has-text-weight-bold'>
          <FormattedMessage
            id='SiteMenu.contact.1'
            defaultMessage='Contact us'
          />
        </p>
        <p>
          <FormattedMessage
            id='SiteMenu.contact.2'
            defaultMessage='Got questions? Need help? Did we miss something?'
          />
        </p>
        <p>
          <FormattedHTMLMessage
            id='SiteMenu.contact.3'
            defaultMessage='Email us at <a href="mailto:info@chi.vote">info@chi.vote</a>.'
          />
        </p>
      </div>
    </Menu>
  );
};
