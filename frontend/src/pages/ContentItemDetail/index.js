import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Page from 'Components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { Breadcrumb } from 'Components/Breadcrumb';
import LanguageToggle from 'Components/LanguageToggle';
import './style.scss';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function FormattedMessageFixed(props) {
  return <FormattedMessage {...props} />;
}

export default class ContentItemDetail extends Component {
  renderBreadcrumb() {
    const { slug } = this.props;
    const titles = {
      faq: 'FAQ'
    };
    const currPath = window.location.pathname;
    const parentUrl = curr =>
      curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

    const breadcrumbLinks = [
      {
        url: parentUrl(currPath),
        content: (
          <FormattedMessage id='common.link.home' defaultMessage='Home' />
        )
      },
      {
        url: currPath,
        content: (
          <FormattedMessageFixed
            id={`common.link.${slug}`}
            defaultMessage={titles[slug] || slug.capitalize()}
          />
        )
      }
    ];

    return <Breadcrumb items={breadcrumbLinks} className='column is-full' />;
  }

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
            buttonText={language === 'es' ? 'Empezar' : 'Start'}
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

    var classes = `container page-${slug}`;

    return (
      <>
        <Helmet>
          <style>{`body { background: ${background} !important; }`}</style>
          {Parser(decode(helmet))}
        </Helmet>
        <Page childClass={classes}>
          <div className={'columns is-multiline is-centered'}>
            {this.renderBreadcrumb()}
            <h1 className='column is-full page-heading title'>{title}</h1>
            {pageContent}
          </div>
        </Page>
      </>
    );
  }
}
