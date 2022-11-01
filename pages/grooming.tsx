import React from "react";
import CustomCarousel from "../components/Carousel";
import Banner1 from "../assets/images/grooming-banner.png";
import { BannerItemProps } from "../components/Carousel/CarouselItem";
import GroomingServices from "../components/GroomingServices";

const bannersData: BannerItemProps[] = [
  {
    desktopImage: Banner1,
    mobileImage: Banner1,
    content: {
      title: `WE ARE HERE TO CARE OF YOUR LOVE ONCE`,
    },
    color: "dark",
    alignContent: "center",
    showContent: true,
  },
];

const Grooming = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 md:gap-y-12'>
      <CustomCarousel bannersData={bannersData} />
      <GroomingServices />
    </div>
  );
};

export default Grooming;
