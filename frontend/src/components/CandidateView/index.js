import React, { Component, PureComponent } from 'react';
import './style.scss';
import { Education, Experience, Endorsements } from './BrItems';
import { SocialIcons } from './SocialIcons';

import ReactPlaceholder from 'react-placeholder';
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';
import 'react-placeholder/lib/reactPlaceholder.css';

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
      },
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchData(this.props.data.br_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.br_id !== prevProps.data.br_id) {
      this.setState({ isLoading: true });
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
      })
      .then(() => {
        setTimeout(
          function() {
            this.setState({ isLoading: false });
          }.bind(this),
          750
        );
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
    const { isLoading } = this.state;

    const myPlaceholder = (
      <div className="my-awesome-placeholder">
        <RectShape
          color="lightgray"
          className="candidate-view__headshot"
          style={{ width: '100%', height: 270 }}
        />
        <RectShape
          className="control"
          color="lightgray"
          style={{ width: '33%', height: '2rem' }}
        />
        <TextBlock
          className="candidate-view__name title"
          color="lightgray"
          rows={2}
          lineSpacing=".3em"
          // style={{ width: '100%', height: '3rem' }}
        />
        <TextBlock rows={14} color="lightgray" />
      </div>
    );

    return (
      <div className={`candidate-view${isLoading ? ' is-loading' : ''}`}>
        <ReactPlaceholder
          showLoadingAnimation
          ready={!isLoading}
          customPlaceholder={myPlaceholder}
        >
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
        </ReactPlaceholder>
      </div>
    );
  }
}

export default CandidateView;
