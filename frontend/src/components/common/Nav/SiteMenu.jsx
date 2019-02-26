import React from 'react';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { slide as Menu } from 'react-burger-menu';

function FormattedMessageFixed(props) {
  return <FormattedMessage {...props} />;
}

const SiteMenu = props => {
  const urlRoot = props.intl.locale === 'es' ? '/es/' : '/';

  const menuItems = [
    {
      href: urlRoot,
      iconClasses: 'fas fa-home',
      slug: 'home',
      label: 'Home'
    },
    // {
    //   href: urlRoot + 'results/',
    //   iconClasses: 'fas fa-chart-bar',
    //   slug: 'results',
    //   label: 'Results'
    // },
    // FEB26 uncomment this
    {
      href: urlRoot + 'races/',
      iconClasses: 'fas fa-vote-yea',
      slug: 'races',
      label: 'Races'
    },
    {
      href: urlRoot + 'faq/',
      iconClasses: 'far fa-question-circle',
      slug: 'faq',
      label: 'FAQ'
    },
    {
      href: urlRoot + 'ask/',
      iconClasses: 'far fa-comment-alt',
      slug: 'ask',
      label: 'Ask'
    },
    {
      href: urlRoot + 'quiz/',
      iconClasses: 'fas fa-gamepad',
      slug: 'quiz',
      label: 'Quiz'
    },
    {
      href: urlRoot + 'events/',
      iconClasses: 'fas fa-calendar',
      slug: 'events',
      label: 'Events'
    }
  ];

  const getMenuItems = () =>
    menuItems.map(item => (
      <a className='menu-item' href={item.href} key={item.slug}>
        <span className='icon'>
          <i className={item.iconClasses} />
        </span>
        <FormattedMessageFixed
          id={`common.link.${item.slug}`}
          defaultMessage={item.label}
        />
      </a>
    ));

  return (
    <Menu {...props}>
      {getMenuItems()}
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

export default injectIntl(SiteMenu);
