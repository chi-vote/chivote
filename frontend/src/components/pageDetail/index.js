import React, { Component } from 'react';
import { parseHtml } from 'Components/utils';
import { Helmet } from 'react-helmet';
import {
  Breadcrumb,
  FormattedMessageFixed,
  Page,
  PageHeading
} from 'Components/common';
import { withAppContext } from 'Root/app-context';
import * as typeformEmbed from '@typeform/embed';
import cn from 'classnames';
import styles from './styles.module.scss';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class MyTypeformEmbed extends Component {
  constructor(props) {
    super(props);
    this.el = null;
  }

  componentDidMount() {
    if (this.el) {
      typeformEmbed.makeWidget(
        this.el,
        this.props.context.rootPath.includes('/es/')
          ? 'https://starlyn.typeform.com/to/UFJDYa'
          : 'https://starlyn.typeform.com/to/WdZTNE',
        {
          buttonText: this.props.context.rootPath.includes('/es/')
            ? 'Empezar'
            : 'Start'
        }
      );
    }
  }

  render() {
    return (
      <div
        ref={el => (this.el = el)}
        className='column is-full'
        style={{ height: '500px', position: 'relative' }}
      />
    );
  }
}

class ContentItemDetail extends Component {
  render() {
    const { title, slug, content, helmet, background } = this.props;
    let pageContent = parseHtml(content); // fixing bad quotes that were breaking links

    if (slug == 'quiz' && typeof window !== `undefined`) {
      pageContent = <MyTypeformEmbed {...this.props} />;
    }

    if (slug == 'faq') {
      require('./PageFaq.scss');
    }

    var classes = cn('container', styles[`page${slug.capitalize()}`]);

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
            <Breadcrumb
              className={cn('column is-full', styles.breadcrumb)}
              activeLabel={activeLabel}
            />
            <PageHeading className='column is-full' title={title} />
            {pageContent}
          </div>
        </Page>
      </>
    );
  }
}

export default withAppContext(ContentItemDetail);
