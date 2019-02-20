import React from 'react'

const FinanceFeed = (props) => {
  return (
    <div id="the-finances">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th><button className="button is-rounded col-sort">Candidate</button></th>
            <th><button className="button is-rounded col-sort">Cash on hand</button></th>
            <th><button className="button is-rounded col-sort">Total raised</button></th>
          </tr>
        </thead>
        <tbody>
        {
          props.candidates.map(data => (
            <tr>
              <td className="is-lightblue-text">{data.fields.full_name}</td>
              <td className="is-white-text">${data.fields.ri_cash_on_hand}</td>
              <td className="is-white-text">${data.fields.ri_funds_raised_this_cycle}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default FinanceFeed;