import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import 'whatwg-fetch'

export default class WardLookup extends Component {
  state = {
    streetNo: '',
    streetDirection: '',
    streetAddr: '',
    streetNames: [],
    addresses: [],
    wardFound: null
  }

  getData = () => {
    fetch(`/static/output/${this.state.streetNo}.json`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        addresses: res
      })
      this.filterDirection()
    })
  }

  // flattenAddrs = (data) => {
  //   return Object.keys(data).reduce((acc, key) => {
  //     acc.push({
  //       addr: key,
  //       ward: data[key].ward
  //     })
  //   }, [])
  // }

  filterDirection = () => {
    console.log(this.state.addresses);

    const filtered = Object.keys(this.state.addresses).filter(item => {
      console.log(`${this.state.streetNo} ${this.state.streetDirection}`);

      return item.includes(`${this.state.streetNo} ${this.state.streetDirection}`)
    })

    this.setState({
      streetNames: filtered
    })

  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleACInput = (e, value) => {
    this.setState({
      streetAddr: value
    })
  }

  displayWard = (val) => {

    this.setState({
      wardFound: this.state.addresses[e.target.value].ward
    })
  }

  render() {
    return (
      <div className="ward-lookup is-fullwidth">
        <span className="is-lightblue-text is-size-5 mb-1">Ward Lookup</span>
        <div className="columns">
          <div className="column is-half">
          <div className="field is-grouped is-grouped-multiline">
          <div className="control is-expanded">
            <input
              type="number"
              className="input is-rounded is-lsb has-text-centered"
              placeholder="Enter the street number"
              name="streetNo"
              tabIndex="1"
              onInput={this.handleInput}
              onBlur={this.getData}
              onKeyDown={(e) => [32,13,9].indexOf(e.keyCode) > -1 ? this.getData() : false}/>
              </div>
              {/* <div className="control">
                <button
                  className="button is-rounded"
                  onClick={this.getData}>Submit</button>
              </div> */}
              {
                // Boolean(Object.keys(this.state.addresses).length) &&
                <div className={`control is-expanded ${Boolean(Object.keys(this.state.addresses).length) ? '' : 'is-invisible'}`}>
                  <Autocomplete
                    name="streetAddr"
                    getItemValue={item => item}
                    renderInput={(props) => <input
                      className="input is-rounded is-lsb" {...props}
                      placeholder="Start typing your address"
                      tabIndex="2"/>}
                    renderItem={(item) => <li className="list-item address-choice is-lsb is-lightblue-text">{item}</li>}
                    shouldItemRender={(addr, value) => addr.toLowerCase().includes(value.toLowerCase())}
                    onSelect={(val) => this.setState({
                      streetAddr: val,
                      wardFound: this.state.addresses[val].ward
                    })}
                    items={Object.keys(this.state.addresses)}
                    value={this.state.streetAddr}
                    onChange={this.handleACInput}/>
                </div>
              }
            </div>
          </div>
          <div className="column is-half">
            {
              this.state.wardFound &&
              <div className="list-item is-fullwidth">
                <span className="has-text-white is-size-5">
                  {`This address belongs to Ward`}
                  <span className="is-lightblue-text ward-num">{`${this.state.wardFound}`}</span>
                </span>
              </div>
            }
          </div>
        </div>
        {/* <div className="field">
          {
            Boolean(this.state.streetNames.length) &&
            <div className="control is-expanded">
              <div className="select is-fullwidth is-rounded">
                <select className="is-lsb" onChange={this.displayWard}>
                  {
                    this.state.streetNames.map(item => {
                      // console.log(item.match(/[^`${this.state.streetNo} ${this.state.streetDirection}`]/));
                      return (
                        <option value={item}>
                          {item}
                        </option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          }
        </div> */}
      </div>
    )
  }
}
