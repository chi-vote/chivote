import React, { Component } from 'react';
import PropTypes from 'prop-types';
import trimText from './trimText';

export default class ReadMoreReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      primaryText: '',
      secondaryText: ''
    };
  }

  componentDidMount() {
    let args = [
      this.props.text,
      this.props.min,
      this.props.ideal,
      this.props.max
    ];

    let textBreakdown = trimText(...args);
    this.setState({
      primaryText: textBreakdown[0],
      secondaryText: textBreakdown[1]
    });
  }

  setStatus() {
    let display = !this.state.displaySecondary;
    this.setState({ displaySecondary: display });
  }

  render() {
    let displayText;
    const extraClasses = this.props.className;

    if (!this.state.secondaryText) {
      displayText = (
        <p className={`${extraClasses} display-text-group`}>
          <span className="displayed-text">
            {`${this.state.primaryText} ${this.state.secondaryText}`}
          </span>
        </p>
      );
    } else if (this.state.displaySecondary) {
      displayText = (
        <p className={`${extraClasses} display-text-group`}>
          {/* <span className="displayed-text" onClick={this.setStatus.bind(this)}> */}
          {`${this.state.primaryText} ${this.state.secondaryText}`}
          {/* </span> */}
          <div className="read-more-button" onClick={this.setStatus.bind(this)}>
            read less
          </div>
        </p>
      );
    } else {
      displayText = (
        <p className={`${extraClasses} display-text-group`}>
          <span className="displayed-text">
            {`${this.state.primaryText}`}
            {` ... `}
            <span
              className="read-more-button"
              onClick={this.setStatus.bind(this)}
            >
              read more
            </span>
          </span>
        </p>
      );
    }

    return displayText;
  }
}

ReadMoreReact.propTypes = {
  text: PropTypes.string.isRequired,
  min: PropTypes.number,
  ideal: PropTypes.number,
  max: PropTypes.number
};
