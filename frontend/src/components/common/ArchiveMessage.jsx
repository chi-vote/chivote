import React from 'react';
import styles from './ArchiveMessage.module.scss';

const ArchiveMessage = ({ message }) => (
  <div className={styles.archiveMessage}>{message}</div>
);

export default ArchiveMessage;
