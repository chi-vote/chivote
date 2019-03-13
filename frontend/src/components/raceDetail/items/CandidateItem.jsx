import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const CandidateItem = props => {
  const { data } = props;

  return (
    <dd
      className='media-item candidate-item on-hover'
      onClick={() => props.handleClick(data)}
      data-status={data.status}
    >
      <img src={data.br_thumb_url} alt='' className='media-item__img' />
      <div className='candidate-item__meta'>
        <span className='is-size-5 media-item__title'>
          {`${data.full_name}`}

          {(data.status == 'elected' || data.status == 'runoff') && (
            <span className={styles.statusTag}>{data.status}</span>
          )}

          {data.incumbent && (
            <span className={styles.incumbentTag}>Incumbent</span>
          )}
        </span>
      </div>
    </dd>
  );
};

export default CandidateItem;
