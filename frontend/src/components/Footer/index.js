import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import MailchimpEmbed from './MailchimpEmbed';
import './style.scss';

import LogoCollective from 'Assets/images/chivote-collective-logo-white.png';
import LogoBGA from 'Assets/images/BGA-logo-white.png';
import LogoBCC from 'Assets/images/BCC-logo-white.png';
import LogoTCR from 'Assets/images/chicago_reporter.png';
import LogoTDL from 'Assets/images/TDL-logo-white.png';
import LogoTriibe from 'Assets/images/Triibe - transparent white logo.png';
import LogoRFI from 'Assets/images/RFI-logo-white.png';
import LogoCityB from 'Assets/images/CB-logo-white.png';
import LogoChalkB from 'Assets/images/Chalkbeat-logo-white.png';
import LogoSSW from 'Assets/images/SSW-logo-white.png';
import LogoUnivision from 'Assets/images/white_univision.png';

class Footer extends Component {
  render() {
    return (
      <>
        <MailchimpEmbed />
        <footer className="footer">
          <div className="container">
            <div className="row">
              <img
                className="logo logo--chivote-coll"
                src={LogoCollective}
                alt="Chi.Vote Collective"
              />
              <p className="has-text-white">
                The Chi.vote website is the core product of the Chi.vote
                Collective, a new group of nonpartisan media and civic
                organizations that believe in fostering a safer, more prosperous
                and more equitable and connected Chicago by creating content and
                tools of the highest quality and accessibility around city
                elections. The founding partners of the Collective are the
                Better Government Association, Block Club Chicago, The Chicago
                Reporter, The Daily Line and The Triibe.
              </p>
            </div>
            <div className="row collective-logos">
              <a href="https://bettergov.org">
                <img
                  src={LogoBGA}
                  alt="Better Government Association"
                  className="collective-logo"
                />
              </a>
              <a href="https://blockclubchicago.org/">
                <img
                  src={LogoBCC}
                  alt="Block Club Chicago"
                  className="collective-logo"
                />
              </a>
              <a href="https://www.chicagoreporter.com/">
                <img
                  src={LogoTCR}
                  alt="The Chicago Reporter"
                  className="collective-logo"
                />
              </a>
              <a href="http://thedailyline.net/">
                <img
                  src={LogoTDL}
                  alt="The Daily Line"
                  className="collective-logo"
                />
              </a>
              <a href="https://thetriibe.com/">
                <img
                  src={LogoTriibe}
                  alt="The TRiiBE"
                  className="collective-logo"
                />
              </a>
            </div>
            <p className="has-text-white mt-1">
              The Collective is to proud to welcome and acknowledge a new group
              of contributors to our effort as Outreach &amp; Information
              Partners: Chalkbeat Chicago, City Bureau, Reform Illinois, South
              Side Weekly, and Univision.
            </p>
            <div className="row collective-logos">
              <a href="https://chalkbeat.org/">
                <img
                  src={LogoChalkB}
                  alt="Chalkbeat"
                  className="collective-logo"
                />
              </a>
              <a href="https://www.citybureau.org/">
                <img
                  src={LogoCityB}
                  alt="City Bureau"
                  className="collective-logo"
                />
              </a>
              <a href="https://www.reformforillinois.org/">
                <img
                  src={LogoRFI}
                  alt="Reform for Illinois"
                  className="collective-logo"
                />
              </a>
              <a href="https://southsideweekly.com/">
                <img
                  src={LogoSSW}
                  alt="South Side Weekly"
                  className="collective-logo"
                />
              </a>
              <a href="https://www.univision.com/chicago/wgbo">
                <img
                  src={LogoUnivision}
                  alt="Univision Chicago"
                  className="collective-logo"
                />
              </a>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default hot(Footer);
