import React from 'react';
import { Nav, Footer, PageHeading } from 'Components/common';
import cn from 'classnames';

const Page = props => {
  const { heading } = props;
  return (
    <>
      <Nav />
      <section className={cn('section', props.sectionClass)} id='page'>
        <div className={props.childClass}>
          <PageHeading className='column is-full' title={heading} />

          {props.children}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
