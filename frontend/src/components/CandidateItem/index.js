import React from 'react';
import './style.scss';

const CandidateItem = props => {
  const { data } = props;
  const isIncumbent = props.data.incumbent ? 'is-incumbent' : '';

  return (
    <dd
      className="candidate-item"
      onClick={() => props.handleClick(props.data)}
    >
      <img src={data.br_thumb_url} alt="" className="candidate-item__img" />
      <div className={`candidate-item__meta ${isIncumbent}`}>
        <span className="is-size-5 candidate-item__name">
          {`${data.full_name}`}
        </span>
        {props.data.incumbent && (
          <span className="has-text-white is-size-7 incumbent-tag">
            Incumbent
          </span>
        )}
      </div>
    </dd>
  );
};

export default CandidateItem;
