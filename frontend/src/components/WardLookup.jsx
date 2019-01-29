import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import 'whatwg-fetch';

export default class WardLookup extends Component {
  state = {
    streetNo: '',
    streetAddr: '',
    streetNames: [],
    addresses: [],
    wardFound: null
  };

  getData = () => {
    fetch(`/static/output/${this.state.streetNo}.json`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(addresses => {
        this.setState({ addresses });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.streetNo !== prevState.streetNo) {
      // console.log(
      //   `prev streetNo: ${prevState.streetNo}; curr: ${this.state.streetNo}`
      // );
      this.getData();
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleACInput = (e, value) => {
    var streetNoStr = value.trim().split(' ')[0];
    var streetNo = parseInt(streetNoStr);

    this.setState({
      streetNo,
      streetAddr: value
    });
  };

  displayWard = val => {
    this.setState({
      wardFound: this.state.addresses[e.target.value].ward
    });
  };

  render() {
    return (
      <div className="ward-lookup is-fullwidth">
        <span className="is-lightblue-text is-size-5 mb-1">Ward Lookup</span>
        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <div className="control is-expanded">
                <Autocomplete
                  name="streetAddr"
                  getItemValue={item => item}
                  renderInput={props => (
                    <input
                      className="input is-rounded is-lsb"
                      {...props}
                      placeholder="Start typing your address"
                      tabIndex="2"
                    />
                  )}
                  renderItem={item => (
                    <li className="list-item address-choice is-lsb is-lightblue-text">
                      {item}
                    </li>
                  )}
                  shouldItemRender={(addr, value) =>
                    addr.toLowerCase().includes(value.toLowerCase())
                  }
                  onSelect={val =>
                    this.setState({
                      streetAddr: val,
                      wardFound: this.state.addresses[val].ward
                    })
                  }
                  items={Object.keys(this.state.addresses)}
                  value={this.state.streetAddr}
                  onChange={this.handleACInput}
                />
              </div>
            </div>
          </div>
          <div className="column is-half">
            {this.state.wardFound && (
              <div className="list-item is-fullwidth">
                <span className="has-text-white is-size-5">
                  {`This address belongs to Ward`}
                  <span className="is-lightblue-text ward-num">{`${
                    this.state.wardFound
                  }`}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
