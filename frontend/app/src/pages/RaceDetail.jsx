import React, { Component } from 'react'
import Page from '../components/Page'
import List from '../components/List'
import CandidateItem from '../components/CandidateItem'

export default class RaceDetail extends Component {

  componentDidMount() {
    console.log(JSON.parse(this.props.candidates))
  }

  render() {
    const { data, candidates } = this.props
    const parsedData = JSON.parse(data.statements)
    console.log(parsedData);

    return (
      <div className="container">
        <Page
          className="page page--detail page--inner"
          heading={`Race for ${JSON.parse(data.office).office}`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi quisquam asperiores, cum at voluptatem rem. Minus repudiandae sunt nemo?</p>
          <section id="the-candidates">
            <h2 className="page-heading title is-5">The Candidates</h2>
            <List className="candidates-list">
              {
                JSON.parse(candidates).map(item => (
                  <CandidateItem
                    key={item.pk}
                    id={item.pk}
                    name={item.fields.name}
                  />
                ))
              }
            </List>
          </section>
        </Page>
      </div>
    )
  }
}
