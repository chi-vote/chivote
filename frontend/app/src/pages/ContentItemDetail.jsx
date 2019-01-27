import React, { Component } from 'react';
import Page from '../components/Page';
import decode from 'decode-html';
import Parser from 'html-react-parser';

export default class ContentItemDetail extends Component {
  render() {
    const { title, content } = this.props;
    return (
      <Page>
        <style>{`body { background: #31313B !important; } * { color: white !important; }`}</style>
        <h1 className="page-heading title">{title}</h1>
        {Parser(decode(content))}
      </Page>
    );
  }
}
