import React from 'react';
import cn from 'classnames';

const PageHeading = ({ title, className }) => (
  <h1 className={cn('page-heading title', className)}>{title}</h1>
);

export default PageHeading;
