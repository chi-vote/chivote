import React, { Component } from 'react'
import Page from '../components/Page'
import CandidateItem from '../components/CandidateItem'

export default class RaceDetail extends Component {
  render() {
    const { data, candidates } = this.props
    return (
      <div className="container">
        <Page
          heading={`Race for ${data.office}`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi quisquam asperiores, cum at voluptatem rem. Minus repudiandae sunt nemo?</p>
          <div className="candidates-list">
            <h6 className="page-heading title is-6">The Candidates</h6>
            {
              candidates.map(item => (
                <CandidateItem 
                  key={item.personId}
                  id={item.personId}
                  photo={item.photo}
                  name={item.full_name}
                />
              ))
            }
          </div>
        </Page>
      </div>
    )
  }
}