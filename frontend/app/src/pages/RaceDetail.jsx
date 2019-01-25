import React, { Component } from 'react'
import Page from '../components/Page'
import List from '../components/List'
import CandidateItem from '../components/CandidateItem'
import ArticleItem from '../components/ArticleItem'

export default class RaceDetail extends Component {

  componentDidMount() {
    console.log(JSON.parse(this.props.candidates))
  }

  render() {
    const { data, candidates } = this.props
    const parsedData = JSON.parse(data.statements)
    console.log(parsedData);
    console.log(JSON.parse(candidates))
    // console.log('articles', JSON.parse(data.articles))

    const articles = JSON.parse(data.articles).filter(item => {
      return item.fields.race.indexOf(JSON.parse(data.office).id) > -1
    }).map(item => <ArticleItem data={item} />)

    // console.log(articles);


    return (
      <div className="container">
        <Page
          className="page page--detail page--inner"
          heading={`Race for ${JSON.parse(data.office).office}`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi quisquam asperiores, cum at voluptatem rem. Minus repudiandae sunt nemo?</p>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <button className="button is-rounded">Candidates</button>
            </div>
            <div className="control is-expanded">
              <button className="button is-rounded">Articles</button>
            </div>
          </div>
          <section id="the-candidates">
            <h2 className="page-heading title is-5 is-hidden">Candidates</h2>
            <List className="candidates-list">
              {
                JSON.parse(candidates).map(item => (
                  <CandidateItem
                    key={item.pk}
                    id={item.pk}
                    data={item.fields}
                  />
                ))
              }
            </List>
          </section>
          <section id="the-newsfeed">
            <h2 className="page-heading title is-5 is-hidden">Articles</h2>
            {articles}
          </section>
        </Page>
      </div>
    )
  }
}
