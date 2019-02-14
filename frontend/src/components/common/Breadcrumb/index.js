import React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageToggle from 'Components/LanguageToggle';
import './styles.scss';

let links = {
  '/': <FormattedMessage id='common.link.home' defaultMessage='Home' />,
  '/races/': (
    <FormattedMessage id='common.link.all-races' defaultMessage='All races' />
  )
};

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

function normalizePath(path) {
  return path.replace('/es/', '/');
}

function parentUrl(curr) {
  return curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';
}

function getItems(currPath) {
  let isHome = false;
  let path = currPath;
  let paths = [path];
  let i = 0;

  while (!isHome && i < 5) {
    path = parentUrl(path);
    paths.push(path);
    isHome = normalizePath(path) == '/';
    i += 1;
  }

  const items = paths
    .map(path => {
      return { url: path, content: links[normalizePath(path)] };
    })
    .reverse();

  return items;
}

const Breadcrumb = props => {
  const activePath = props.activePath
    ? props.activePath
    : window.location.pathname;

  if (props.activeLabel) {
    links[normalizePath(activePath)] = props.activeLabel;
  }

  const extraClasses = props.className ? ' ' + props.className : '';

  return (
    <nav className={`breadcrumb${extraClasses}`} aria-label='breadcrumbs'>
      <ul>
        <RenderedLinks items={getItems(activePath)} />
        <LanguageToggle />
      </ul>
    </nav>
  );
};

export { Breadcrumb };
