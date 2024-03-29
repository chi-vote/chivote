import React, { Component } from 'react';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';
import './FinanceFeed.scss';

var _ = {
  orderBy: require('lodash/orderBy')
};

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
    const target = e.target.closest('button');

    var shouldChangeOrder = this.state.sortBy == target.value;

    if (shouldChangeOrder) {
      if (target.dataset.order === 'desc') {
        target.dataset.order = 'asc';
      } else {
        target.dataset.order = 'desc';
      }
    }

    this.setState({
      sortBy: target.value,
      order: target.dataset.order,
      currentSort: target.dataset.name
    });
  };

  componentDidMount() {
    this.setState({
      sortBy: 'ri_funds_raised_this_cycle',
      order: 'desc',
      currentSort: 'total'
    });
  }

  render() {
    const sorted = _.orderBy(
      this.props.candidates,
      d => d[this.state.sortBy] || '',
      this.state.order
    );

    return (
      <>
        <h2 className='is-hidden-tablet page-heading title is-4'>
          <FormattedMessage
            id='RaceDetail.FinanceFeed.heading'
            defaultMessage='Finances'
          />
        </h2>
        <p className='has-text-grey-light'>
          <FormattedHTMLMessage
            id='RaceDetail.FinanceFeed.howto'
            defaultMessage="Click on a candidate's name to see full candidate committee information, as well as detailed donations and expenditures, at <a href='https://illinoissunshine.org'>illinoissunshine.org</a>."
          />
        </p>
        <div className='table-container'>
          <table
            className='table is-fullwidth'
            data-current-sort={this.state.currentSort}
          >
            <thead>
              <tr>
                <th>
                  <button
                    className='button is-text col-sort'
                    data-order='asc'
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
                {/* <th className='amt'>
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
                </th> */}
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
            <tbody>
              {sorted.map((data, idx) => (
                <tr key={idx}>
                  <td data-name='candidate'>
                    <a
                      href={`https://illinoissunshine.org/committees/${
                        data.isbe_id
                      }`}
                    >
                      {data.full_name}
                    </a>
                  </td>
                  {/* <td data-name='on-hand' className='amt'>
                    {formatNumber(data.ri_cash_on_hand)}
                  </td> */}
                  <td data-name='total' className='amt'>
                    {formatNumber(data.ri_funds_raised_this_cycle)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className='has-text-grey-light'>
          <FormattedHTMLMessage
            id='RaceDetail.FinanceFeed.footnote'
            defaultMessage="<u><strong>Note:</strong></u> 'Total raised' represents the amount of funds raised during this election cycle."
          />
        </p>
        <p className='has-text-grey-light'>
          <FormattedHTMLMessage
            id='RaceDetail.FinanceFeed.updated'
            defaultMessage='<u><strong>Last updated:</strong></u> {date}'
            values={{
              date: (() => {
                var last_updated_list = this.props.candidates
                  .map(c => c.ri_last_updated)
                  .filter(Boolean)
                  .map(d => moment(d));

                var last_updated = Math.max(...last_updated_list);

                return moment(last_updated)
                  .locale(this.props.intl.locale)
                  .format('ll');
              })()
            }}
          />
        </p>
        <p className='has-text-right is-uppercase is-lsb'>
          <FormattedHTMLMessage
            id='RaceDetail.FinanceFeed.credit'
            defaultMessage='Powered by <a href="https://www.reformforillinois.org">Reform for Illinois</a>'
          />
        </p>
      </>
    );
  }
}

export default injectIntl(FinanceFeed);
