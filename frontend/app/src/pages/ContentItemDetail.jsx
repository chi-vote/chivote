import React, { Component } from 'react';
import Page from '../components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ReactTypeformEmbed } from 'react-typeform-embed';

export default class ContentItemDetail extends Component {
  render() {
    const { title, slug, content, helmet, background } = this.props;
    let pageContent = Parser(decode(content));

    if (slug == 'quiz') {
      pageContent = (
        <div style={{ height: '500px' }}>
          <ReactTypeformEmbed url="https://starlyn.typeform.com/to/WdZTNE" />
        </div>
      );
    }

    if (slug == 'faq') {
      require('../assets/styles/PageFaq.css');
    }

    return (
      <Page className={`page-${slug}`}>
        <div className="container">
          <div className="col-12">
            <div className="row">
              <Helmet>
                <style>{`body { background: ${background} !important; } * { color: white !important; font-family: 'League Spartan Bold', sans-serif; }`}</style>
                {Parser(decode(helmet))}
              </Helmet>
              {/* <h1 className="page-heading title">{title}</h1> */}
              {pageContent}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
