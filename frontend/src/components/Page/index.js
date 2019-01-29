import React from 'react';
import Nav, { SiteMenu } from 'Components/Nav';
import Footer from 'Components/Footer';
import './style.scss';

const Page = props => {
  return (
    <>
      <Nav />
      <section className={`section ${props.sectionClass}`}>
        <div {...props}>
          {props.heading ? (
            <h1 className="page-heading title is-3">{props.heading}</h1>
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
