import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const carouselContainerStyle = {
    maxWidth: '100%',
    maxHeight: '500px',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    maxHeight: '500px',
    objectFit: 'cover'
  };

  return (
    <Slider {...settings}>
      <div>
      <img src={require('../assets/img/doctor1.jpg')} style={imageStyle} alt="Image 1" />
    </div>
    <div>
      <img src={require('../assets/img/doctor2.jpg')} style={imageStyle} alt="Image 2" />
    </div>
    <div>
      <img src={require('../assets/img/doctor3.jpg')} style={imageStyle} alt="Image 3" />
    </div>
    </Slider>
  );
};

export default Carousel;
