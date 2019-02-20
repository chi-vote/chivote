import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LanguageToggle } from 'Components/common';
import './styles.scss';

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

class Breadcrumb extends Component {
  constructor(props) {
    super(props);

    let links = {
      '/': <FormattedMessage id='common.link.home' defaultMessage='Home' />,
      '/races/': (
        <FormattedMessage
          id='common.link.all-races'
          defaultMessage='All races'
        />
      )
    };

    var activePath;

    if (typeof window !== `undefined`) {
      activePath = props.activePath
        ? props.activePath
        : window.location.pathname;
    } else {
      activePath = props.activePath ? props.activePath : '';
    }

    if (props.activeLabel) {
      links[normalizePath(activePath)] = props.activeLabel;
    }

    this.state = {
      activePath,
      links
    };
  }

  getItems() {
    let isHome = false;
    let path = this.state.activePath;
    let paths = [path];

    const getLabel = path => this.state.links[normalizePath(path)];

    const parentUrl = curr =>
      curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

    /* create list of paths (current -> home) */
    while (!isHome) {
      path = parentUrl(path);
      paths.push(path);
      isHome = normalizePath(path) == '/';
    }

    /* maps paths to objects and reverse them (home -> current) */
    const items = paths
      .map(path => {
        return { url: path, content: getLabel(path) };
      })
      .reverse();

    return items;
  }

  render() {
    const extraClasses = this.props.className ? ' ' + this.props.className : '';

    return (
      <nav className={`breadcrumb${extraClasses}`} aria-label='breadcrumbs'>
        <ul>
          <RenderedLinks items={this.getItems()} />
          <LanguageToggle />
        </ul>
      </nav>
    );
  }
}

export default Breadcrumb;
