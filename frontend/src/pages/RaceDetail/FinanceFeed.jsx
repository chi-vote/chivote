import React, { Component } from 'react';
import _ from 'lodash';

function formatNumber(num) {
  if (num != null && typeof num !== undefined) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } else {
    return <span className='is-centered'>N/A</span>;
  }
}

class FinanceFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: null,
      order: 'desc',
      currentSort: 'candidate'
    };
  }

  setOrder = e => {
    document
      .querySelector('.col-sort.is-selected')
      .classList.remove('is-selected');
    e.target.classList.add('is-selected');

    this.setState({
      sortBy: e.target.value,
      order: e.target.dataset.order,
      currentSort: e.target.dataset.name
    });

    if (e.target.dataset.order === 'desc') {
      e.target.dataset.order = 'asc';
    } else {
      e.target.dataset.order = 'desc';
    }
  };

  componentDidMount() {
    this.setState({
      sortBy: 'last_name',
      order: 'asc',
      currentSort: 'candidate'
    });
  }

  render() {
    const sorted = _.orderBy(
      this.props.candidates,
      d => d.fields[this.state.sortBy] || '',
      this.state.order
    );

    return (
      <section id='the-finances'>
        <table className='table is-fullwidth'>
          <thead>
            <tr>
              <th>
                <button
                  className='button is-text col-sort is-selected'
                  data-order='desc'
                  data-name='candidate'
                  value='last_name'
                  onClick={this.setOrder}
                >
                  Candidate
                </button>
              </th>
              <th className='amt'>
                <button
                  className='button is-text col-sort'
                  data-order='desc'
                  data-name='on-hand'
                  value='ri_cash_on_hand'
                  onClick={this.setOrder}
                >
                  Cash on hand
                </button>
              </th>
              <th className='amt'>
                <button
                  className='button is-text col-sort'
                  data-order='desc'
                  data-name='total'
                  value='ri_funds_raised_this_cycle'
                  onClick={this.setOrder}
                >
                  Total raised
                </button>
              </th>
            </tr>
          </thead>
          <tbody data-current-sort={this.state.currentSort}>
            {sorted.map(data => (
              <tr>
                <td data-name='candidate'>
                  <a
                    href={`https://illinoissunshine.org/committees/${
                      data.fields.isbe_id
                    }`}
                  >
                    {data.fields.full_name}
                  </a>
                </td>
                <td data-name='on-hand' className='amt'>
                  <span className='is-pulled-left'>{'$'}</span>
                  {formatNumber(data.fields.ri_cash_on_hand)}
                </td>
                <td data-name='total' className='amt'>
                  <span className='is-pulled-left'>{'$'}</span>
                  {formatNumber(data.fields.ri_funds_raised_this_cycle)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default FinanceFeed;
