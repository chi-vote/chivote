import React from 'react';
import LanguageToggle from 'Components/LanguageToggle';

const Link = props => (
  <li>
    <a href={props.url}>{props.content}</a>
  </li>
);

const ActiveLink = props => (
  <li className='is-active'>
    <a href={props.url} aria-current='page'>
      {props.content}
    </a>
  </li>
);

const RenderedLinks = props =>
  props.items.map((item, idx) => {
    if (idx + 1 == props.items.length) {
      return <ActiveLink key={idx} {...item} />;
    } else {
      return <Link key={idx} {...item} />;
    }
  });

const Breadcrumb = props => {
  const extraClasses = props.className ? ' ' + props.className : '';

  return (
    <nav className={`breadcrumb${extraClasses}`} aria-label='breadcrumbs'>
      <ul>
        <RenderedLinks items={props.items} />
        <LanguageToggle />
      </ul>
    </nav>
  );
};

export { Breadcrumb };
