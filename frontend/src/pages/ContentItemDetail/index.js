import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Page from 'Components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import LanguageToggle from 'Components/LanguageToggle';
import './style.scss';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function FormattedMessageFixed(props) {
  return <FormattedMessage {...props} />;
}

export default class ContentItemDetail extends Component {
  render() {
    const { title, slug, content, helmet, background } = this.props;
    let pageContent = Parser(decode(content.replace(/"'|'"/g, '"'))); // fixing bad quotes that were breaking links

    if (slug == 'quiz') {
      const currPath = window.location.pathname;
      let language = currPath.includes('/es/') ? 'es' : 'en';
      console.log(language);

      pageContent = (
        <div
          className='column is-full'
          style={{ height: '500px', position: 'relative' }}
        >
          <ReactTypeformEmbed
            url={
              language === 'es'
                ? 'https://starlyn.typeform.com/to/UFJDYa'
                : 'https://starlyn.typeform.com/to/WdZTNE'
            }
            style={{ height: '500px' }}
          />
        </div>
      );
    }

    if (slug == 'faq') {
      require('./PageFaq.scss');
    }

    const titles = {
      faq: 'FAQ'
    };

    const breadcrumb = (function() {
      const currPath = window.location.pathname;
      const parentUrl = curr =>
        curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

      return (
        <nav className='column breadcrumb is-full' aria-label='breadcrumbs'>
          <ul>
            <li>
              <a href={parentUrl(currPath)}>
                <FormattedMessage id='common.link.home' defaultMessage='Home' />
              </a>
            </li>
            <li className='is-active'>
              <a href={currPath} aria-current='page'>
                <FormattedMessageFixed
                  id={`common.link.${slug}`}
                  defaultMessage={titles[slug] || slug.capitalize()}
                />
              </a>
            </li>
            <LanguageToggle />
          </ul>
        </nav>
      );
    })();

    var classes = `container page-${slug}`;

    return (
      <>
        <Helmet>
          <style>{`body { background: ${background} !important; }`}</style>
          {Parser(decode(helmet))}
        </Helmet>
        <Page childClass={classes}>
          <div className={'columns is-multiline is-centered'}>
            {breadcrumb}
            <h1 className='column is-full page-heading title'>{title}</h1>
            {pageContent}
          </div>
        </Page>
      </>
    );
  }
}
