import React from 'react';
import moment from 'moment-mini';
import { parseHtml } from 'Utils';

const ArticleItem = props => {
  const { fields } = props.data;
  const { date, source } = props.data.fields;

  return (
    <div className='list-item article-item'>
      <div className='media-item__meta'>
        {date && (
          <time dateTime={date} className='media-item__date'>
            {moment(date).format('MMM D, YYYY')}
          </time>
        )}
        <cite className='media-item__source'>{source}</cite>
      </div>
      <a className='media-item__title mb-1' href={fields.link}>
        {fields.hed}
      </a>
      <p className='media-item__summary'>
        {fields.summary &&
          parseHtml(fields.summary, [[/"'|'"/g, '"'], [/&lt;\/?p&gt;/gm, '']])}
      </p>
    </div>
  );
};

export default ArticleItem;
