import React, { Component } from 'react'
import Page from '../components/Page'

export default class CandidateDetail extends Component {
  render() {
    const { data } = this.props
    const parsedModelData = JSON.parse(data.modelData)[0]
    console.log(parsedModelData)
    const parsedContactData = JSON.parse(data.contactData)[0]
    console.log(parsedContactData)
    return (
      <Page>
        <h3 className="page-heading title is-3">{parsedModelData.fields.name}</h3>
        <p>{parsedContactData.fields.contact_value}</p>
      </Page>
    )
  }
}