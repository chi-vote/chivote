import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { StanceItem } from '../items';

const _ = {
  find: require('lodash/find')
};

export default class StanceItems extends Component {
  render() {
    return (
      <Masonry
        className='columns is-multiline'
        ref={function(c) {
          this.masonry = this.masonry || c.masonry;
        }.bind(this)}
        options={{
          columnWidth: '.grid-sizer',
          itemSelector: '.grid-item',
          percentPosition: true
        }}
      >
        <div className='grid-sizer' />
        {this.props.stances.map(item => (
          <div className='grid-item' key={item.pk}>
            <StanceItem
              data={item.fields}
              candidate={_.find(this.props.candidates, c => {
                return c.id == item.fields.candidate;
              })}
              onChange={() => {
                this.masonry.layout();
              }}
            />
          </div>
        ))}
      </Masonry>
    );
  }
}
