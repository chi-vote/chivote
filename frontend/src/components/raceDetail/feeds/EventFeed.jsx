import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as pym from 'pym.js';

class EventFeed extends Component {
  componentDidMount() {
    const embedUrl = `https://embed.documenters.org/chivote-forums/${
      this.props.slug
    }.html`;
    if (this.props.slug) {
      var pymParent = new pym.Parent('the-events-embed', embedUrl);
    }
  }

  render() {
    return (
      <>
        <h2 className='is-hidden-tablet page-heading title is-4'>
          <FormattedMessage
            id='RaceDetail.EventFeed.heading'
            defaultMessage='Events'
          />
        </h2>
        <p id='the-events-embed'>
          <FormattedMessage
            id='RaceDetail.EventFeed.emptyMessage'
            defaultMessage='No event embed here yet.'
          />
        </p>
      </>
    );
  }
}

export default EventFeed;
