import React from 'react';
import moment from 'moment-mini';

const Updated = ({ className, datetime }) => (
  <div className={className}>
    Last updated: {moment(datetime).format('lll')}
  </div>
);

export default Updated;
