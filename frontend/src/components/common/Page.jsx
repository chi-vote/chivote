import React from 'react';
import { Nav, Footer, PageHeading } from 'Components/common';
import cn from 'classnames';
import styles from './Page.module.scss';

const ArchiveMessage = () => (
  <div className={cn('hero', styles.archiveMessage)}>
    <div className='hero-body'>Archived: Mar 13, 2019</div>
  </div>
);

const Page = props => {
  const { heading } = props;
  return (
    <>
      <ArchiveMessage />
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
