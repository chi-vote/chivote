import React from 'react';
import questionsIcon from 'Assets/images/chivote-questions-icon.png';
import researchIcon from 'Assets/images/chivote-research-icon.png';
import readyIcon from 'Assets/images/chivote-ready-icon.png';

const LandingPage = props => {
  return (
    <div className="columns is-gapless">
      <div className="column is-4">
        <div className="voter-stage stage-questions has-text-centered">
          <img src={questionsIcon} alt="" className="voter-stage__image" />
          <p className="voter-stage__cta is-lsb is-size-3 is-red-text">
            Where do I start?
          </p>
          <div className="voter-stage__links">
            <ul>
              <li>
                <a href="faq" className="button is-large is-rounded">
                  Read through the FAQ
                </a>
              </li>
              <li>
                <a href="quiz" className="button is-large is-rounded">
                  Take the quiz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="column is-4">
        <div className="voter-stage stage-research has-text-centered">
          <img src={researchIcon} alt="" className="voter-stage__image" />
          <p className="voter-stage__cta is-lightblue-text is-lsb is-size-3">
            I'm ready to learn.
          </p>
          <div className="voter-stage__links">
            <ul>
              <li>
                <a href="races" className="button is-large is-rounded">
                  Explore the races
                </a>
              </li>
              <li>
                <a href="ask" className="button is-large is-rounded">
                  Ask us anything
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="column is-4">
        <div className="voter-stage stage-ready has-text-centered">
          <img src={readyIcon} alt="" className="voter-stage__image" />
          <p className="voter-stage__cta is-lsb is-size-3">
            I'm ready to vote!
          </p>
          <div className="voter-stage__links">
            <ul>
              <li>
                <a
                  href="https://chicagoelections.com/en/register-to-vote-change-of-address.html"
                  className="button is-large is-rounded"
                >
                  Make sure you're registered
                </a>
              </li>
              <li>
                <a
                  href="https://chicagoelections.com/en/your-voter-information.html"
                  className="button is-large is-rounded"
                >
                  Find your polling place
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
