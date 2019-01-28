import React from 'react';
import './style.scss';

const Page = props => {
  return (
    <section {...props}>
      {props.heading && (
        <h1 className="page-heading title is-3">{props.heading}</h1>
      )}
      {props.children}
    </section>
  );
};

export default Page;
