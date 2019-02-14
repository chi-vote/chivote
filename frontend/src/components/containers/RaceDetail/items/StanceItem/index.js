import React from 'react';
import moment from 'moment-mini';
import decode from 'decode-html';
import Parser from 'html-react-parser';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';

import './styles.scss';

const StanceItem = props => {
  const { candidate } = props;
  const { date, link, source, stance_long, stance_short } = props.data;

  return (
    <Accordion
      onChange={() => {
        props.onChange();
      }}
    >
      <AccordionItem className='accordion__item list-item article-item stance__item'>
        <AccordionItemTitle className='accordion__title row u-position-relative'>
          <div className='media-item__meta'>
            {date && (
              <time dateTime={date}>{moment(date).format('MMM D, YYYY')}</time>
            )}
            <cite className='media-item__source'>
              <a href={link}>{source}</a>
            </cite>
          </div>
          <div className='media'>
            <figure className='media-left image is-64x64'>
              <img
                src={candidate.br_thumb_url}
                alt={`Thumbnail image of ${candidate.full_name}`}
                className='media-item__img'
              />
            </figure>
            <div className='media-content'>
              <div className='media-item__title'>{candidate.full_name}</div>
              <div className='media-item__dek'>{stance_short}</div>
            </div>
            <div className='media-right'>
              <div className='accordion__arrow' role='presentation' />
            </div>
          </div>
        </AccordionItemTitle>
        <AccordionItemBody className='accordion__body row'>
          <div className='media-item__summary'>
            {Parser(decode(stance_long.replace(/"'|'"/g, '"')))}
            {/* fixing bad quotes that were breaking links */}
          </div>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
};

export default StanceItem;
