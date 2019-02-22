import React from 'react';

const CandidateItem = props => {
  const { data } = props;
  const isIncumbent = props.data.incumbent ? 'is-incumbent' : '';

  return (
    <dd
      className="media-item candidate-item on-hover"
      onClick={() => props.handleClick(props.data)}
    >
      <img src={data.br_thumb_url} alt="" className="media-item__img" />
      <div className={`candidate-item__meta ${isIncumbent}`}>
        <span className="is-size-5 media-item__title">
          {`${data.full_name}`}

          {props.data.incumbent && (
            <span className="has-text-white is-size-7 incumbent-tag">
              Incumbent
            </span>
          )}
        </span>
      </div>
    </dd>
  );
};

export default CandidateItem;
