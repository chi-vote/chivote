import React, { Component } from 'react';
import Page from 'Components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import './style.scss';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default class ContentItemDetail extends Component {
  render() {
    const { title, slug, content, helmet, background } = this.props;
    let pageContent = Parser(decode(content));

    if (slug == 'quiz') {
      pageContent = (
        <div
          className="column is-full"
          style={{ height: '500px', position: 'relative' }}
        >
          <ReactTypeformEmbed
            url="https://starlyn.typeform.com/to/WdZTNE"
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

    const breadcrumb = (
      <nav class="column breadcrumb is-full" aria-label="breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li class="is-active">
            <a href="/races" aria-current="page">
              {titles[slug] || slug.capitalize()}
            </a>
          </li>
        </ul>
      </nav>
    );

    var classes = `container page-${slug}`;

    return (
      <>
        <Helmet>
          <style>{`body { background: ${background} !important; }`}</style>
          {Parser(decode(helmet))}
        </Helmet>
        <Page className={classes}>
          <div className={'columns is-multiline is-centered'}>
            {breadcrumb}
            <h1 className="column is-full page-heading title">{title}</h1>
            {pageContent}
          </div>
        </Page>
      </>
    );
  }
}
