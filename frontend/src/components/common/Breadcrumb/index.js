import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LanguageToggle } from 'Components/common';
import { withAppContext } from 'Root/app-context';
import './styles.scss';

const Link = props => (
  <li>
    <a href={props.url}>{props.content}</a>
  </li>
);

const ActiveLink = props => (
  <li className='is-active'>
    <a href={props.url} aria-current='page' tabIndex='-1'>
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
      ),
      '/results/': (
        <FormattedMessage
          id='common.link.results'
          defaultMessage='Live results'
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
      links[this.normalizePath(activePath)] = props.activeLabel;
    }

    this.state = {
      activePath,
      links
    };
  }

  normalizePath(path) {
    return path.replace(this.props.context.rootPath, '/');
  }

  getItems() {
    let path = this.state.activePath;
    let isHome = this.normalizePath(path) == '/';
    let paths = [path];

    const getLabel = path => this.state.links[this.normalizePath(path)];

    const parentUrl = curr =>
      curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

    /* create list of paths (current -> home) */
    while (!isHome) {
      path = parentUrl(path);
      paths.push(path);
      isHome = this.normalizePath(path) == '/';
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
          {!this.props.hideToggle && <LanguageToggle />}
        </ul>
      </nav>
    );
  }
}

export default withAppContext(Breadcrumb);
