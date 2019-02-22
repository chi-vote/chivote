import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Autocomplete from 'react-autocomplete';
import Fuse from 'fuse.js';
import _ from 'lodash';
import 'whatwg-fetch';
import './style.scss';

var fuseOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['address']
};

class WardLookup extends Component {
  state = {
    streetNo: '',
    streetAddr: '',
    addresses: [],
    ward: null,
    precinct: null,
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
    if (this.state.streetNo && this.state.streetNo !== prevState.streetNo) {
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

  getItems = () => {
    const results = this.state.fuse.search(this.state.streetAddr);
    return results;
  };

  render() {
    return (
      <div className='ward-lookup list-item'>
        <div className='is-fullwidth'>
          <span className='ward-lookup__heading is-size-5 mb-1'>
            <FormattedMessage
              id='WardLookup.heading'
              defaultMessage="Don't know your ward? Enter your address below to find your information."
            />
          </span>
          <div className='field'>
            <div className='control is-expanded'>
              <Autocomplete
                getItemValue={item => item.address}
                items={this.getItems()}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? 'lightgray' : 'white',
                      cursor: isHighlighted ? 'pointer' : 'default'
                    }}
                    className='item'
                  >
                    {item.address}
                  </div>
                )}
                renderMenu={(items, value) => (
                  <div className='menu'>
                    {value === '' ? (
                      <div className='item'>
                        <FormattedMessage
                          id='WardLookup.help-text'
                          defaultMessage='Start typing your address, beginning with your street number.'
                        />
                      </div>
                    ) : this.state.loading ? (
                      <div className='item'>
                        <FormattedMessage
                          id='WardLookup.loading'
                          defaultMessage='Loading...'
                        />
                      </div>
                    ) : items.length === 0 ? (
                      <div className='item'>
                        <FormattedMessage
                          id='WardLookup.no-matches'
                          defaultMessage='No matches for {inputAddress}'
                          values={{
                            inputAddress: value
                          }}
                        />
                      </div>
                    ) : (
                      items
                    )}
                  </div>
                )}
                // renderItem={item => (
                //   <li className="list-item address-choice is-lsb is-lightblue-text">
                //     {item.address}
                //   </li>
                // )}
                renderInput={props => (
                  <span className='text-input-wrapper'>
                    <input
                      className='input is-lsb is-fullwidth'
                      {...props}
                      placeholder='121 N LaSalle St'
                      tabIndex='2'
                    />
                    {this.state.streetAddr.length > 0 ? (
                      <span
                        title='Clear'
                        onClick={() => {
                          this.setState({ streetAddr: '' });
                        }}
                        className='ward-lookup__clear'
                      >
                        &times;
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                )}
                onSelect={val => {
                  var addressObj = _.find(
                    this.state.addresses,
                    x => x.address === val
                  );

                  this.setState({
                    streetAddr: val,
                    ward: addressObj.ward,
                    precinct: addressObj.precinct
                  });
                }}
                wrapperStyle={{ display: 'block' }}
                value={this.state.streetAddr}
                onChange={this.handleACInput}
              />
            </div>
          </div>
          {_.find(
            this.state.addresses,
            x => x.address == this.state.streetAddr
          ) && (
            <p className='ward-lookup__message'>
              <FormattedHTMLMessage
                id='WardLookup.match'
                defaultMessage='This address is located in <strong>Ward {wardNumber}</strong>.'
                values={{
                  wardNumber: this.state.ward
                }}
              />
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default WardLookup;
