import React from 'react';
import moment from 'moment-mini';
import decode from 'decode-html';
import Parser from 'html-react-parser';

const StanceItem = props => {
  const { candidate } = props;
  const { date, link, source, statement_long, statement_short } = props.data;

  return (
    <div className="list-item article-item">
      <img
        src={candidate.br_thumb_url}
        alt=""
        className="candidate-item__img mb-1"
      />
      <span className="is-lightblue-text is-lbs is-size-4">
        {candidate.full_name}
      </span>
      <p>
        <strong className="has-text-white">{statement_short}</strong>
      </p>
      <a className="has-text-white" href={link}>
        <blockquote className="has-text-white is-futura mb-1">
          {Parser(decode(statement_long))}
        </blockquote>
      </a>
      <cite className="is-red-text has-text-right">
        {date && moment(date).format('MMM D, YYYY') + ' • '}
        {source}
      </cite>
    </div>
  );
};

export default StanceItem;
