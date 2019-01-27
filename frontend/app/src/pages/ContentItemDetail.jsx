import React, { Component } from 'react';
import Page from '../components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';

export default class ContentItemDetail extends Component {
  render() {
    const { title, content, helmet } = this.props;
    console.log(decode(helmet));
    return (
      <Page>
        <Helmet>
          {Parser(decode(helmet))}
          <style>{`body { background: #31313B !important; } * { color: white !important; }`}</style>
        </Helmet>
        {/* <h1 className="page-heading title">{title}</h1> */}
        {Parser(decode(content))}
      </Page>
    );
  }
}
