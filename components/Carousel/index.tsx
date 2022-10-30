import React from "react";
import CarouselItem from "./CarouselItem";
import Banner1 from "../../assets/images/banner-1.png";

import Slider from "react-slick";

const CustomCarousel = () => {
  return (
    <Slider
      dots
      infinite
      autoplay
      autoplaySpeed={4000}
      draggable
      arrows={false}
      pauseOnHover
      className='z-0'>
      <CarouselItem
        desktopImage={Banner1}
        mobileImage={Banner1}
        key={1}
        content={{
          buttonText: "Shop Now",
          description: "test desc",
          title: "welcome to pet shop",
        }}
        color='dark'
        alignContent='right'
      />
      <CarouselItem
        desktopImage={Banner1}
        mobileImage={Banner1}
        key={2}
        content={{
          buttonText: "Shop Now",
          description: "test desc",
          title: "welcome to pet shop",
        }}
        color='dark'
        alignContent='right'
      />
      <CarouselItem
        desktopImage={Banner1}
        mobileImage={Banner1}
        key={3}
        content={{
          buttonText: "Shop Now",
          description: "test desc",
          title: "welcome to pet shop",
        }}
        color='dark'
        alignContent='center'
      />
      <CarouselItem
        desktopImage={Banner1}
        mobileImage={Banner1}
        key={4}
        content={{
          buttonText: "Shop Now",
          description: "test desc",
          title: "welcome to pet shop",
        }}
        color='light'
        alignContent='left'
      />
    </Slider>
  );
};

export default CustomCarousel;
