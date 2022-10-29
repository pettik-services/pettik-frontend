import { Carousel } from "antd";
import React from "react";
import CarouselItem from "./CarouselItem";
import Banner1 from "../../assets/images/banner-1.png";

const CustomCarousel: React.FC = () => (
  <Carousel pauseOnHover={true} dots={true} autoplay autoplaySpeed={4000}>
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
  </Carousel>
);

export default CustomCarousel;
