import React from 'react';
import { Nav, Footer, PageHeading } from 'Components/common';
import cn from 'classnames';
import styles from './Page.module.scss';

const Page = props => {
  const { heading } = props;
  return (
    <>
      <Nav />
      <section
        className={cn('section container', props.sectionClass, styles.section)}
        id='page'
      >
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
