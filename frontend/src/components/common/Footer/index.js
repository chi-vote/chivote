import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import MailchimpEmbed from './MailchimpEmbed';
import { manifest } from './org-logos';
import styles from './styles.module.scss';
import cn from 'classnames';
import { withAppContext } from 'Root/app-context';

class SectionResults extends Component {
  render() {
    return (
      <section
        className={cn('bottom-live-results', styles.liveResults)}
        id='live-results'
      >
        <div className={styles.heading}>
          <FormattedMessage
            id='Footer.live-results.heading'
            defaultMessage='Live results'
          />
        </div>
        <p className='is-lsb is-size-5 has-text-centered'>
          <FormattedMessage
            id='Footer.live-results.text.1'
            defaultMessage='Watch on Chi.vote as the votes are tallied.'
          />
        </p>
        <p className='is-lsb is-size-5 has-text-centered'>
          <a className='button' href={this.props.context.rootPath + 'results'}>
            <FormattedMessage
              id='Footer.live-results.text.2'
              defaultMessage='See results'
            />
          </a>
        </p>
      </section>
    );
  }
}

const MySectionResults = withAppContext(SectionResults);

const SectionMailchimp = () => (
  <section className={`mc-embed ${styles.signUp}`} id='sign-up'>
    <div className={styles.heading}>
      <FormattedMessage id='Footer.sign-up.heading' defaultMessage='Sign up' />
    </div>
    <MailchimpEmbed />
  </section>
);

const SectionEmail = () => (
  <section className={styles.contactUs} id='contact-us'>
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

const SectionAbout = () => (
  <footer className={`${styles.footer}`} id='about-us'>
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
        {/* <MySectionResults /> */}
        <SectionMailchimp key='sign-up' />
        <SectionEmail />
        <SectionAbout />
      </>
    );
  }
}

export default injectIntl(Footer);
