import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment-mini';

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
        <h2 className='is-hidden-tablet page-heading title is-4'>
          <FormattedMessage
            id='RaceDetail.FinanceFeed.heading'
            defaultMessage='Finances'
          />
        </h2>
        <div className='table-container'>
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
                    <FormattedMessage
                      id='RaceDetail.FinanceFeed.th.candidate'
                      defaultMessage='Candidate'
                    />
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
                    <FormattedMessage
                      id='RaceDetail.FinanceFeed.th.cashOnHand'
                      defaultMessage='Cash on hand'
                    />
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
                    <FormattedMessage
                      id='RaceDetail.FinanceFeed.th.totalRaised'
                      defaultMessage='Total raised'
                    />
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
        </div>
        <p className='has-text-grey-light'>
          <FormattedHTMLMessage
            id='RaceDetail.FinanceFeed.footnote'
            defaultMessage="<u><strong>Notes:</strong></u> 'Total raised' represents a committee's total available funds to spend
            this quarter. While committees are able to spend money continuously,
            they are only required to report spending figures once every three
            months. As soon as spending figures are available, they are reflected
            in the 'Cash on hand' amount for each candidate."
          />
        </p>
        <p className='has-text-grey-light'>
          <FormattedHTMLMessage
            id='RaceDetail.FinanceFeed.updated'
            defaultMessage='<u><strong>Last updated:</strong></u> {date}'
            values={{
              date: moment(
                this.props.candidates[0].fields.ri_last_updated
              ).format('MMM D, YYYY')
            }}
          />
        </p>
        <p className='has-text-right is-uppercase is-lsb'>
          <FormattedMessage
            id='RaceDetail.FinanceFeed.credit'
            defaultMessage='Powered by Reform for Illinois'
          />
        </p>
      </section>
    );
  }
}

export default FinanceFeed;
