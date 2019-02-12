import React from 'react';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import List from 'Components/List';
import CandidateItem from 'Components/CandidateItem';

const CandidateFeed = props => {
  const { candidates, handleClick } = props;

  return (
    <section id='the-candidates'>
      <h2 className='is-hidden-tablet page-heading title is-4'>
        <FormattedMessage
          id='RaceDetail.CandidateFeed.heading'
          defaultMessage='Candidates'
        />
      </h2>
      <p className='the-candidates__help-text'>
        <FormattedMessage
          id='RaceDetail.CandidateFeed.text'
          defaultMessage='Candidates appear in ballot order.'
        />
      </p>
      <List className='candidates-list columns is-multiline is-0-mobile'>
        {candidates.map(item => (
          <div className='column is-4' key={item.pk}>
            <CandidateItem
              id={item.pk}
              handleClick={handleClick}
              data={item.fields}
            />
          </div>
        ))}
      </List>
    </section>
  );
};

export default CandidateFeed;
