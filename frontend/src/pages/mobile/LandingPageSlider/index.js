import React, { Component } from 'react';
import Slider from 'react-slick';
import 'Assets/styles/slick.css';
import './style.scss';
// import "Assets/styles/slick-theme.css";

import LandingPage from 'Pages/mobile/LandingPage';
import CollectivePage from 'Pages/mobile/CollectivePage';

class LandingPageSlider extends Component {
  slideToCollective = () => this.slider.slickNext();

  slideToHome = () => this.slider.slickPrev();

  render() {
    const settings = {
      vertical: true,
      slidesToScroll: 1,
      draggable: false,
      dots: false,
      infinite: false,
      swipe: false,
      swipeToSlide: false
    };
    return (
      <Slider {...settings} ref={slider => (this.slider = slider)}>
        <div className="slide">
          <LandingPage goCollective={this.slideToCollective} />
        </div>
        <div className="slide">
          <CollectivePage goHome={this.slideToHome} />
        </div>
      </Slider>
    );
  }
}

// const LandingPageSlider = props => {
//   const settings = {
//     vertical: true,
//     slidesToScroll: 1,
//     dots: false,
//     infinite: false,
//     swipeToSlide: false
//   }
//   return (
//     <Slider {...settings}>
//       <div className="slide">
//         <LandingPage />
//       </div>
//       <div className="slide">
//         <CollectivePage />
//       </div>
//     </Slider>
//   )
// }

export default LandingPageSlider;
