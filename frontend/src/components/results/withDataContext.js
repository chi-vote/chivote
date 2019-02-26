import React from 'react';
import { DataContext } from './appProvider';

export function withDataContext(Component) {
  return function WrapperComponent(props) {
    return (
      <DataContext.Consumer>
        {results => <Component {...props} context={results} />}
      </DataContext.Consumer>
    );
  };
}
