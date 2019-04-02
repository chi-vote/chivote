import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const About = () => (
  <>
    <p>
      <FormattedMessage
        id='Results.About.text.2'
        defaultMessage='Percentages are based on the available ballots tallied by the Chicago Board of Elections. Percentages listed do not indicate a winner until all ballots are counted.'
      />
    </p>
    <p>
      <FormattedHTMLMessage
        id='Results.About.text.4'
        defaultMessage='Wondering where the rest of the races and candidates are? Most races were decided in the general election last February. <a href="https://chi.vote/archive/2019-feb-26/results/">You can find those results here.</a>'
      />
    </p>
    <p>
      <em>
        <FormattedMessage
          id='Results.About.text.3'
          defaultMessage='Source: Chicago Board of Elections. Results are unofficial until certified on April 18.'
        />
      </em>
    </p>
  </>
);

export default About;
