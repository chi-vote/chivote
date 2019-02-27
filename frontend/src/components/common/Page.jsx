import React from 'react';
import { Nav, Footer } from 'Components/common';
import cn from 'classnames';

const Page = props => {
  return (
    <>
      <Nav />
      <section className={cn('section', props.sectionClass)} id='page'>
        <div className={props.childClass}>
          {props.heading ? (
            <h1 className='page-heading title is-3'>{props.heading}</h1>
          ) : (
            ''
          )}
          {props.children}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
