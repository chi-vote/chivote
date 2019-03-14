import React from 'react';
import { withAppContext } from 'Root/app-context';
import styles from './ArchiveMessage.module.scss';

const ArchiveMessage = ({ context }) => {
  if (context.archived == 'True') {
    return (
      <div className={styles.archiveMessage}>{context.archiveMessage}</div>
    );
  }

  return null;
};

export default withAppContext(ArchiveMessage);
