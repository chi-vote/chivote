import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { hot } from 'react-hot-loader/root';
import MailchimpEmbed from './MailchimpEmbed';
import './style.scss';

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
        <section
          className='section section--bottom mc-embed sign-up'
          id='sign-up'
        >
          <div className='section__heading'>
            <FormattedMessage
              id='Footer.sign-up.heading'
              defaultMessage='Sign up'
            />
          </div>
          <MailchimpEmbed />
        </section>
        <section className='section section--bottom contact-us' id='contact-us'>
          <div className='section__heading'>
            <FormattedMessage
              id='Footer.contact-us.heading'
              defaultMessage='Contact us'
            />
          </div>
          <p className='is-lsb is-size-5 has-text-centered'>
            <FormattedMessage
              id='Footer.contact-us.text.1'
              defaultMessage='Got questions? Need help? Did we miss something?'
            />
          </p>
          <p className='is-lsb is-size-5 has-text-centered'>
            <FormattedHTMLMessage
              id='Footer.contact-us.text.2'
              defaultMessage="Email us at <a href='mailto:info@chi.vote'>info@chi.vote</a>."
            />
          </p>
        </section>
        <footer className='section section--bottom footer' id='about-us'>
          <div className='container'>
            <div className='section__heading'>
              <FormattedMessage
                id='Footer.about-us.heading'
                defaultMessage='About Chi.vote'
              />
            </div>
            <p>
              <FormattedMessage
                id='Footer.about-us.text.1'
                defaultMessage='The Chi.vote website is the core product of the Chi.vote Collective, a new group of nonpartisan media and civic organizations that believe in fostering a safer, more prosperous and more equitable and connected Chicago by creating content and tools of the highest quality and accessibility around city elections. The founding partners of the Collective are the Better Government Association, Block Club Chicago, The Chicago Reporter, The Daily Line and The Triibe.'
              />
            </p>
            <div className='collective-logos'>
              <a href='https://bettergov.org'>
                <img
                  src={LogoBGA}
                  alt='Better Government Association'
                  className='collective-logo'
                />
              </a>
              <a href='https://blockclubchicago.org/'>
                <img
                  src={LogoBCC}
                  alt='Block Club Chicago'
                  className='collective-logo'
                />
              </a>
              <a href='https://www.chicagoreporter.com/'>
                <img
                  src={LogoTCR}
                  alt='The Chicago Reporter'
                  className='collective-logo'
                />
              </a>
              <a href='http://thedailyline.net/'>
                <img
                  src={LogoTDL}
                  alt='The Daily Line'
                  className='collective-logo'
                />
              </a>
              <a href='https://thetriibe.com/'>
                <img
                  src={LogoTriibe}
                  alt='The TRiiBE'
                  className='collective-logo'
                />
              </a>
            </div>
            <p className='mt-1'>
              <FormattedMessage
                id='Footer.about-us.text.2'
                defaultMessage='The Collective is to proud to welcome and acknowledge a new group of contributors to our effort as Outreach &amp; Information Partners: Chalkbeat Chicago, City Bureau, Reform Illinois, South Side Weekly, and Univision.'
              />
            </p>
            <div className='collective-logos'>
              <a href='https://chalkbeat.org/'>
                <img
                  src={LogoChalkB}
                  alt='Chalkbeat'
                  className='collective-logo'
                />
              </a>
              <a href='https://www.citybureau.org/'>
                <img
                  src={LogoCityB}
                  alt='City Bureau'
                  className='collective-logo'
                />
              </a>
              <a href='https://www.reformforillinois.org/'>
                <img
                  src={LogoRFI}
                  alt='Reform for Illinois'
                  className='collective-logo'
                />
              </a>
              <a href='https://southsideweekly.com/'>
                <img
                  src={LogoSSW}
                  alt='South Side Weekly'
                  className='collective-logo'
                />
              </a>
              <a href='https://www.univision.com/chicago/wgbo'>
                <img
                  src={LogoUnivision}
                  alt='Univision Chicago'
                  className='collective-logo'
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
