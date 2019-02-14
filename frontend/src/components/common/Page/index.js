import React from 'react';
import './styles.scss';

const Page = props => {
  return (
    <section className={`section ${props.sectionClass}`}>
      <div className={props.childClass}>
        {props.heading ? (
          <h1 className='page-heading title is-3'>{props.heading}</h1>
        ) : (
          ''
        )}
        {props.children}
      </div>
    </section>
  );
};

export default Page;
