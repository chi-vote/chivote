import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import Fuse from 'fuse.js';
import _ from 'lodash';
import 'whatwg-fetch';

var fuseOptions = {
  shouldSort: true,
  // includeScore: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['address']
};

export default class WardLookup extends Component {
  state = {
    streetNo: '',
    streetAddr: '',
    streetNames: [],
    addresses: [],
    wardFound: null,
    fuse: new Fuse([], fuseOptions)
  };

  getData = () => {
    fetch(`/static/output/${this.state.streetNo}.json`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(addresses => {
        var addressObjects = Object.entries(addresses).map(x => ({
          address: x[0],
          ...x[1]
        }));
        this.setState({ addresses: addressObjects });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.streetNo !== prevState.streetNo) {
      this.getData();
    }

    if (this.state.addresses !== prevState.addresses) {
      var list = this.state.addresses;
      var fuse = new Fuse(list, fuseOptions);
      this.setState({ fuse });
    }
  }

  handleACInput = (e, value) => {
    var streetNoStr = value.trim().split(' ')[0];
    var streetNo = parseInt(streetNoStr);

    this.setState({
      streetNo,
      streetAddr: value
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
                  getItemValue={item => item.address}
                  items={this.state.fuse.search(this.state.streetAddr)}
                  renderItem={(item, isHighlighted) => (
                    <div
                      style={{
                        background: isHighlighted ? 'lightgray' : 'white'
                      }}
                    >
                      {item.address}
                    </div>
                  )}
                  // renderItem={item => (
                  //   <li className="list-item address-choice is-lsb is-lightblue-text">
                  //     {item.address}
                  //   </li>
                  // )}
                  renderInput={props => (
                    <input
                      className="input is-rounded is-lsb"
                      {...props}
                      placeholder="Start typing your address"
                      tabIndex="2"
                    />
                  )}
                  onSelect={val =>
                    this.setState({
                      streetAddr: val,
                      wardFound: _.find(
                        this.state.addresses,
                        x => x.address === val
                      ).ward
                    })
                  }
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
