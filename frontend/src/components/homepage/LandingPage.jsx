import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { questionsIcon, researchIcon, readyIcon } from './icons';
import { LanguageToggle } from 'Components/common';
import { withAppContext } from 'Root/app-context';
import './LandingPage.scss';

const LandingPage = ({ context, intl }) => {
  let urlRoot = context.rootPath;

  return (
    <>
      <LanguageToggle />
      <div className='columns is-gapless'>
        <div className='column is-4'>
          <div className='voter-stage stage-questions has-text-centered'>
            <img src={questionsIcon} alt='' className='voter-stage__image' />
            <p className='voter-stage__cta is-lsb is-size-3 is-red-text'>
              <FormattedMessage
                id='Homepage.LandingPage.heading-1'
                defaultMessage='Where do I start?'
              />
            </p>
            <div className='voter-stage__links'>
              <ul>
                <li>
                  <a
                    href={urlRoot + 'faq/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-faq'
                      defaultMessage='Read through the FAQ'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={urlRoot + 'quiz/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-quiz'
                      defaultMessage='Take the quiz'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='column is-4'>
          <div className='voter-stage stage-research has-text-centered'>
            <img src={researchIcon} alt='' className='voter-stage__image' />
            <p className='voter-stage__cta is-lightblue-text is-lsb is-size-3'>
              <FormattedMessage
                id='Homepage.LandingPage.heading-2'
                defaultMessage="I'm ready to learn."
              />
            </p>
            <div className='voter-stage__links'>
              <ul>
                <li>
                  <a
                    href={urlRoot + 'races/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-races'
                      defaultMessage='Explore the races'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={urlRoot + 'ask/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-ask'
                      defaultMessage='Ask us anything'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='column is-4'>
          <div className='voter-stage stage-ready has-text-centered'>
            <img src={readyIcon} alt='' className='voter-stage__image' />
            <p className='voter-stage__cta is-lsb is-size-3'>
              <FormattedMessage
                id='Homepage.LandingPage.heading-3'
                defaultMessage="I'm ready to vote!"
              />
            </p>
            <div className='voter-stage__links'>
              <ul>
                <li>
                  <a
                    href={
                      intl.locale == 'es'
                        ? 'https://chicagoelections.com/sp/register-to-vote-change-of-address.html'
                        : 'https://chicagoelections.com/en/register-to-vote-change-of-address.html'
                    }
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-register'
                      defaultMessage='Get registered'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={
                      intl.locale == 'es'
                        ? 'https://chicagoelections.com/sp/your-voter-information.html'
                        : 'https://chicagoelections.com/en/your-voter-information.html'
                    }
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-polling'
                      defaultMessage='Find your polling place'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAppContext(injectIntl(LandingPage));
