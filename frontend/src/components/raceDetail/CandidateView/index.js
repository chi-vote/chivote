import React, { Component, PureComponent } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
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
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchData(this.props.data.br_id);

    console.log(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.br_id !== prevProps.data.br_id) {
      this.setState({ isLoading: true });
      this.fetchData(this.props.data.br_id);
    }
  }

  fetchData(br_id) {
    var url = `${this.props.apiUrl}/candidate/${br_id}`;

    const headers = {
      'Content-Type': 'application/json'
    };

    fetch(url, { headers })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log(data);
        this.setState({ data, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { full_name } = this.props.data;
    const { data, isLoading, error } = this.state;
    const { photo_url, education, experience, endorsements, urls } = data;

    const myPlaceholder = (
      <>
        <RectShape
          color='lightgray'
          className='candidate-view__headshot'
          style={{ width: '100%', height: 270 }}
        />
        <RectShape
          className='control'
          color='lightgray'
          style={{ width: '33%', height: '2rem' }}
        />
        <TextBlock
          className='candidate-view__name title'
          color='lightgray'
          rows={2}
          lineSpacing='.3em'
        />
        <TextBlock rows={14} color='lightgray' />
      </>
    );

    if (error) {
      return <p className='candidate-view has-text-danger'>{error.message}</p>;
    }

    return (
      <div className={`candidate-view${isLoading ? ' is-loading' : ''}`}>
        <ReactPlaceholder
          showLoadingAnimation
          ready={!isLoading}
          customPlaceholder={myPlaceholder}
        >
          <img
            className='candidate-view__headshot'
            src={photo_url}
            alt={`Headshot of ${full_name}`}
          />
          <SocialIcons {...{ urls }} />
          <h2 className='candidate-view__name title'>{full_name}</h2>
          <Education {...{ education }} />
          <Experience {...{ experience }} />
          <Endorsements {...{ endorsements }} />
          <hr />
          <p className='candidate-view__footnote'>
            <FormattedHTMLMessage
              id='CandidateView.ballotReadyNote'
              defaultMessage="* Candidate data is compiled by <a class='has-text-grey-light has-text-weight-bold' href='https://www.ballotready.org/'>BallotReady</a>, based on the candidate's website."
            />
          </p>
        </ReactPlaceholder>
      </div>
    );
  }
}

export default CandidateView;
