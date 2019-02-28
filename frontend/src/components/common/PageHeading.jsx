import React, { Component } from 'react';
import { default as FormattedMessage } from './FormattedMessageFixed';
import cn from 'classnames';

class PageHeading extends Component {
  Formatted = ({ title, id, className, values }) => (
    <FormattedMessage id={id} defaultMessage={title} values={values}>
      {txt => <PageHeading title={txt} className={className} />}
    </FormattedMessage>
  );

  render() {
    const { asFormatted } = this.props;

    if (asFormatted) {
      return <this.Formatted {...this.props} />;
    }

    const { title, className } = this.props;
    return <h1 className={cn('page-heading title', className)}>{title}</h1>;
  }
}

export default PageHeading;
