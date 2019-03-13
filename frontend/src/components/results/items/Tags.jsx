import React from 'react';
import styles from './Tags.module.scss';

const RunoffTag = ({ status }) => {
  if (status == 'Runoff') {
    return (
      <div className={styles.runoffTag}>
        <span className={styles.runoffTagInner}>Race goes to runoff</span>
      </div>
    );
  }

  return null;
};

const WinnerTag = ({ status }) => {
  let contents;

  switch (status) {
    case 'Incumbent won':
      contents = (
        <>
          <span className={styles.tagInnerOpen}>Incumbent</span> reelected
        </>
      );
      break;
    case 'Challenger won':
      contents = (
        <>
          <span className={styles.tagInnerClosed}>Challenger</span> elected
        </>
      );
      break;
    case 'New official':
      contents = <span className={styles.tagInnerClosed}>New official</span>;
      break;
    default:
      return null;
  }

  return <div className={styles.winnerTag}>{contents}</div>;
};

export { RunoffTag, WinnerTag };
