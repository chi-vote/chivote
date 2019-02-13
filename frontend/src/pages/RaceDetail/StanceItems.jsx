import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import StanceItem from 'Components/StanceItem';

class StanceItems extends Component {
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
          <div className='grid-item'>
            <StanceItem
              data={item.fields}
              key={item.pk}
              candidate={
                _.find(this.props.candidates, c => {
                  return c.pk == item.fields.candidate;
                }).fields
              }
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

export default StanceItems;
