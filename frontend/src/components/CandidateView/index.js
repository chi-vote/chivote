import React, { Component, PureComponent } from 'react';
import './style.scss';
import { Education, Experience, Endorsements } from './BrItems';
import { SocialIcons } from './SocialIcons';

class CandidateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        photo_url: '',
        education: [],
        experience: [],
        endorsements: [],
        urls: []
      }
    };
  }

  componentDidMount() {
    this.fetchData(this.props.data.br_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.br_id !== prevProps.data.br_id) {
      this.fetchData(this.props.data.br_id);
    }
  }

  fetchData(br_id) {
    var url = `https://api.civicengine.com/candidate/${br_id}`;

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.props.apikey
    };

    fetch(url, { headers })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    const { full_name } = this.props.data;
    const {
      photo_url,
      education,
      experience,
      endorsements,
      urls
    } = this.state.data;

    return (
      <div className="candidate-view">
        <img
          className="candidate-view__headshot"
          src={photo_url}
          alt={`Headshot of ${full_name}`}
        />
        <SocialIcons {...{ urls }} />
        <h2 className="candidate-view__name title">{full_name}</h2>
        <Education {...{ education }} />
        <Experience {...{ experience }} />
        <Endorsements {...{ endorsements }} />
        <hr />
        <p className="candidate-view__footnote">
          * Candidate data is compiled by{' '}
          <a
            className="has-text-grey-light has-text-weight-bold"
            href="https://www.ballotready.org/"
          >
            BallotReady
          </a>
          , based on the candidate's website.
        </p>
      </div>
    );
  }
}

export default CandidateView;
