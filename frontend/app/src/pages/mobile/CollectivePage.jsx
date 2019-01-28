import React from "react";
import Page from "../../components/Page";
import collectiveLogo from '../../assets/images/chivote-collective-logo-white.png';
import bccLogo from '../../assets/images/BCC-logo-white.png';
import bgaLogo from '../../assets/images/BGA-logo-white.png';
import reporterLogo from '../../assets/images/chicago_reporter.png';
import tdlLogo from '../../assets/images/TDL-logo-white.png';
import triibeLogo from '../../assets/images/Triibe - transparent white logo.png';

const CollectivePage = props => {
  return (
    <Page className="page page--collective">
      <button
        className="button is-outlined is-rounded mb-1"
        onClick={props.goHome}>
        Go back
      </button>
      <img src={collectiveLogo} alt="Chi.Vote logo" className="mb-1"/>
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
        <a href="https://blockclubchicago.org/">
          <img src={bccLogo} alt="Link to Block Club Chi" className="collective-logo"/>
        </a>
        <a href="https://www.bettergov.org/">
          <img src={bgaLogo} alt="Link to Better Government Association" className="collective-logo"/>
        </a>
        <a href="https://www.chicagoreporter.com/">
          <img src={reporterLogo} alt="Link to The Chicago Reporter" className="collective-logo"/>
        </a>
        <a href="http://thedailyline.net/">
          <img src={tdlLogo} alt="Link to The Daily Line" className="collective-logo"/>
        </a>
        <a href="https://thetriibe.com">
          <img src={triibeLogo} alt="Link to The TRiiBE" className="collective-logo"/>
        </a>
      </div>
    </Page>
  );
};

export default CollectivePage;
