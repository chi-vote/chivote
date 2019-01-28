import React from 'react';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import './style.scss';

const Page = props => {
  return (
    <>
      <Nav />
      <section className="section">
        <div {...props}>
          {props.heading && (
            <h1 className="page-heading title is-3">{props.heading}</h1>
          )}
          {props.children}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
