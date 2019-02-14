import React from 'react';
import { Nav, Footer } from 'Components/common';
import './styles.scss';

const Page = props => {
  return (
    <>
      <Nav />
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
      <Footer />
    </>
  );
};

export default Page;
