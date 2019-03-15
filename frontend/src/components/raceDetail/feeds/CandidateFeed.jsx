import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CandidateItem } from '../items';

const CandidateFeed = props => {
  const { candidates, handleClick } = props;

  return (
    <>
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
      <ul className='candidates-list columns is-multiline is-0-mobile'>
        {candidates.map(item => (
          <div className='column is-4' key={item.id}>
            <CandidateItem
              handleClick={handleClick}
              data={{ ...item }}
              id={item.id}
            />
          </div>
        ))}
      </ul>
    </>
  );
};

export default CandidateFeed;
