import React from "react";
import CarouselItem, { BannerItemProps } from "./CarouselItem";

import Slider from "react-slick";

export type BannerProps = {
  bannersData: BannerItemProps[];
};

const CustomCarousel: React.FC<BannerProps> = (props) => {
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
      {props.bannersData.map((banner, key) => (
        <CarouselItem {...banner} key={key} />
      ))}
    </Slider>
  );
};

export default CustomCarousel;
