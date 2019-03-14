import React from 'react';
import { FormattedMessage } from 'react-intl';

const About = () => (
  <>
    <p>
      <FormattedMessage
        id='Results.About.text.1'
        defaultMessage='To win, candidates must receive more than 50 percent of the vote. If no candidate reaches that threshold, the top two candidates will advance to a run off on April 2.'
      />
    </p>
    <p>
      <FormattedMessage
        id='Results.About.text.2'
        defaultMessage='Percentages are based on the available ballots tallied by the Chicago Board of Elections. Percentages listed do not indicate a winner until all ballots are counted.'
      />
    </p>
    <p>
      <em>
        <FormattedMessage
          id='Results.About.text.3'
          defaultMessage='Source: Chicago Board of Elections. Results are unofficial until certified on March 13.'
        />
      </em>
    </p>
  </>
);

export default About;
