import React, { Component } from 'react';
import _ from 'lodash';

class FinanceFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: null,
      order: 'desc',
      currentSort: 'candidate'
    }
  }

  setOrder = (e) => {
    document.querySelector('.col-sort.is-selected').classList.remove('is-selected');
    e.target.classList.add('is-selected');

    this.setState({
      sortBy: e.target.value,
      order: e.target.dataset.order
    });

    if(e.target.dataset.order === 'desc') {
      e.target.dataset.order = 'asc'
    } else {
      e.target.dataset.order = 'desc'
    }
  }

  render() {
    const sorted = _.orderBy(this.props.candidates, `fields.${this.state.sortBy}`, this.state.order);

    return (
      <div id="the-finances">
        <div className="columns is-gapless table-row is-mobile">
          <div className="column has-text-centered is-4">
            <button
              className="button is-rounded col-sort is-selected"
              data-order="desc"
              data-name="candidate"
              value="first_name"
              onClick={this.setOrder}>Candidate</button>
          </div>
          <div className="column has-text-centered is-4">
            <button
              className="button is-rounded col-sort"
              data-order="desc"
              data-name="on-hand"
              value="ri_cash_on_hand"
              onClick={this.setOrder}>Cash on hand</button>
          </div>
          <div className="column has-text-centered is-4">
            <button
              className="button is-rounded col-sort"
              data-order="desc"
              data-name="total"
              value="ri_funds_raised_this_cycle"
              onClick={this.setOrder}>Total raised</button>
          </div>
        </div>
        <div>
          {
            sorted.map(data => (
              <div className="columns is-gapless is-mobile table-row">
                <div className="column has-text-centered is-4 is-lightblue-text">{data.fields.full_name}</div>
                <div className="column has-text-centered is-4 is-white-text">${data.fields.ri_cash_on_hand}</div>
                <div className="column has-text-centered is-4 is-white-text">${data.fields.ri_funds_raised_this_cycle}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default FinanceFeed;