import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { hot } from 'react-hot-loader/root';
import MailchimpEmbed from './MailchimpEmbed';
import { manifest } from './org-logos';
import styles from './styles.module.scss';

const SectionMailchimp = props => (
  <section className={`section mc-embed ${styles.signUp}`} id='sign-up'>
    <div className={styles.heading}>
      <FormattedMessage id='Footer.sign-up.heading' defaultMessage='Sign up' />
    </div>
    <MailchimpEmbed />
  </section>
);

const SectionEmail = props => (
  <section className={`section ${styles.contactUs}`} id='contact-us'>
    <div className={styles.heading}>
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
);

const SectionAbout = props => (
  <footer
    className={`section section--bottom footer ${styles.footer}`}
    id='about-us'
  >
    <div className='container'>
      <div className={styles.heading}>
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
      <div className={styles.logos}>
        {['BGA', 'BCC', 'TCR', 'TDL', 'Triibe'].map((org, idx) => (
          <a href={manifest[org].url} key={idx}>
            <img {...manifest[org].img} className={styles.logo} />
          </a>
        ))}
      </div>
      <p className='mt-1'>
        <FormattedMessage
          id='Footer.about-us.text.2'
          defaultMessage='The Collective is to proud to welcome and acknowledge a new group of contributors to our effort as Outreach &amp; Information Partners: Chalkbeat Chicago, City Bureau, Reform Illinois, South Side Weekly, and Univision.'
        />
      </p>
      <div className={styles.logos}>
        {['Chalkbeat', 'CityBureau', 'RFI', 'SSW', 'Univision'].map(
          (org, idx) => (
            <a href={manifest[org].url} key={idx}>
              <img {...manifest[org].img} className={styles.logo} />
            </a>
          )
        )}
      </div>
    </div>
  </footer>
);

class Footer extends Component {
  render() {
    return (
      <>
        <SectionMailchimp />
        <SectionEmail />
        <SectionAbout />
      </>
    );
  }
}

export default hot(Footer);
