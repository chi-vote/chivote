import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { parseHtml } from 'Components/utils';
import { Helmet } from 'react-helmet';
import {
  Breadcrumb,
  FormattedMessageFixed,
  Page,
  PageHeading
} from 'Components/common';
import './style.scss';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class ContentItemDetail extends Component {
  render() {
    const { title, slug, content, helmet, background } = this.props;
    let pageContent = parseHtml(content); // fixing bad quotes that were breaking links

    if (slug == 'quiz' && typeof window !== `undefined`) {
      var { ReactTypeformEmbed } = require('react-typeform-embed');

      pageContent = (
        <div
          className='column is-full'
          style={{ height: '500px', position: 'relative' }}
        >
          <ReactTypeformEmbed
            buttonText={this.props.intl.locale === 'es' ? 'Empezar' : 'Start'}
            url={
              this.props.intl.locale === 'es'
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

    const titles = {
      faq: 'FAQ'
    };

    const activeLabel = (
      <FormattedMessageFixed
        id={`common.link.${slug}`}
        defaultMessage={titles[slug] || slug.capitalize()}
      />
    );

    return (
      <>
        <Helmet>
          <style>{`body { background: ${background} !important; }`}</style>
          {parseHtml(helmet)}
        </Helmet>
        <Page childClass={classes}>
          <div className='columns is-multiline is-centered'>
            <Breadcrumb className='column is-full' activeLabel={activeLabel} />
            <PageHeading className='column is-full' title={title} />
            {pageContent}
          </div>
        </Page>
      </>
    );
  }
}

export default injectIntl(ContentItemDetail);
