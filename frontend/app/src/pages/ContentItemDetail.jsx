import React, { Component } from 'react';
import Page from '../components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ReactTypeformEmbed } from 'react-typeform-embed';

export default class ContentItemDetail extends Component {
  render() {
    const { title, slug, content, helmet } = this.props;
    let pageContent = Parser(decode(content));

    if (slug == 'quiz') {
      pageContent = (
        <div style={{ height: '500px' }}>
          <ReactTypeformEmbed url="https://starlyn.typeform.com/to/WdZTNE" />
        </div>
      );
    }
    return (
      <Page>
        <div className="container">
          <div className="col-12">
            <div className="row mt-5 mb-5">
              <Helmet>
                {Parser(decode(helmet))}
                <style>{`body { background: #31313B !important; } * { color: white !important; }`}</style>
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
