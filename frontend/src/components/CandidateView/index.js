import React from 'react';
import './style.scss';
import { Education, Experience, Endorsements } from './BrItems';
import { SocialIcons } from './SocialIcons';

const CandidateView = props => {
  return (
    <div className="candidate-view">
      <img
        className="candidate-view__headshot mb-1"
        src={props.data.br_photo_url}
        alt={`Headshot of ${props.data.full_name}`}
      />
      <SocialIcons {...props} />
      <h1 className="title is-size-3 has-text-white mt-1 mb-1">
        {props.data.full_name}
      </h1>
      <Education {...props} />
      <Experience {...props} />
      <Endorsements {...props} />
      <hr />
      <p class="has-text-grey-light is-size-6">
        * Candidate data is compiled by{' '}
        <a
          class="has-text-grey-light has-text-weight-bold"
          href="https://ballotready.org/"
        >
          BallotReady
        </a>
        , based on the candidate's website.
      </p>
    </div>
  );
};

export default CandidateView;
