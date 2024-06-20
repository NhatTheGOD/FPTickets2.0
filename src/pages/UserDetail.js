// Import các thư viện cần thiết
import React from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';

const CarouselF = () => {
  // Tùy chọn cho Flickity
  const flickityOptions = {
    initialIndex: 4,
    autoPlay: 1500,
    wrapAround: true,
  };

  return (
    <Flickity
    className={'carousel'} // default ''
    elementType={'div'} // default 'div'
    options={flickityOptions} // takes flickity options {}
    disableImagesLoaded={false} // default false
    reloadOnUpdate // default false
    static // default false
  >
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
    <img src="/images/movies/dora.png"/>
  </Flickity>
  );
};

export default CarouselF;
