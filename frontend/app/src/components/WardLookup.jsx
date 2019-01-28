import React, { Component } from 'react';
import 'whatwg-fetch'

export default class WardLookup extends Component {
  state = {
    streetNo: '',
    streetDirection: '',
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

  displayWard = (e) => {
    this.setState({
      wardFound: this.state.addresses[e.target.value].ward
    })
  }

  render() {
    return (
      <div className="ward-lookup is-fullwidth">
        <label htmlFor="" className="label is-size-7 is-lightblue-text mb-1">Enter street number and direction</label>
        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <input
              type="number"
              className="input is-rounded is-lsb has-text-centered"
              placeholder="Street number"
              name="streetNo"
              onInput={this.handleInput}/>
          </div>
          <div className="control is-expanded">
            <div className="select is-fullwidth is-rounded">
              <select className="is-lsb" onChange={this.handleInput} name="streetDirection">
                <option value="N">N</option>
                <option value="S">S</option>
                <option value="W">W</option>
                <option value="E">E</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button
              className="button is-rounded"
              onClick={this.getData}>Submit</button>
          </div>
        </div>
        <div className="field">
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
        </div>
        {
          this.state.wardFound &&
          <div className="list-item is-fullwidth">
            <span className="has-text-white">
              {`That address belongs to Ward`}
              <span className="is-lightblue-text ward-num">{`${this.state.wardFound}`}</span>
            </span>
          </div>
        }
      </div>
    )
  }
}
