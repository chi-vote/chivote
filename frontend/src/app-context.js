import React from 'react';

export const AppContext = React.createContext({ rootPath: '/' });

export function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AppContext.Consumer>
        {results => <Component {...props} context={results} />}
      </AppContext.Consumer>
    );
  };
}
