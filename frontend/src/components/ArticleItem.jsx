import React from 'react';
import Parser from 'html-react-parser';
import decode from 'decode-html';
import moment from 'moment-mini';

const ArticleItem = props => {
  const { fields } = props.data;

  return (
    <div className="list-item article-item">
      <div className="article-item__meta is-flex flex-space-between mb-1 is-fullwidth">
        <div>
          <span className="has-text-grey-lighter">
            {moment(fields.date).format('MMM D, YYYY')}
          </span>
          <time datetime={fields.date} className="is-hidden">{fields.date}</time>
        </div>
        <cite className="article-item__source is-lightblue-text has-text-right">
          {fields.source}
        </cite>
      </div>
      <a
        className="article-item__headline has-text-white mb-1"
        href={fields.link}
      >
        {fields.hed}
      </a>
      <p className="has-text-grey-lighter">
        {Parser(decode(fields.summary).replace(/<(?:.|\n)*?>/gm, ''))}
      </p>
    </div>
  );
};

export default ArticleItem;
