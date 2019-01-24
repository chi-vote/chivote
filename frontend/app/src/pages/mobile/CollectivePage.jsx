import React from "react";
import Page from "../../components/Page";
import chivoteLogo from '../../assets/images/chivote-logo-7x.png';
import bccLogo from '../../assets/images/BCC-logo-white.png';
import bgaLogo from '../../assets/images/BGA-logo-white.png';
import reporterLogo from '../../assets/images/chicago_reporter.png';
import tdlLogo from '../../assets/images/TDL-logo-white.png';
import triibeLogo from '../../assets/images/Triibe - transparent white logo.png';

const CollectivePage = props => {
  return (
    <Page className="page page--collective">
      <button
        className="button is-outlined"
        onClick={props.goHome}>
        Go back
      </button>
      <img src={chivoteLogo} alt="Chi.Vote logo" className="mb-1"/>
      <p>
        The Chi.vote website is the core product of the Chi.vote Collective, a
        new group of nonpartisan media and civic organizations that believe in
        fostering a safer, more prosperous and more equitable and connected
        Chicago by creating content and tools of the highest quality and
        accessibility around city elections. The founding partners of the
        Collective are the Better Government Association, Block Club Chicago,
        The Chicago Reporter, The Daily Line and The Triibe.
      </p>
      <div className="logos">
        <img src={bccLogo} alt="" className="collective-logo"/>
        <img src={bgaLogo} alt="" className="collective-logo"/>
        <img src={reporterLogo} alt="" className="collective-logo"/>
        <img src={tdlLogo} alt="" className="collective-logo"/>
        <img src={triibeLogo} alt="" className="collective-logo"/>
      </div>
    </Page>
  );
};

export default CollectivePage;
