import React from "react";
import Categories from "../components/Categories";
import CustomCarousel from "../components/Carousel";
import DownloadApp from "../components/DownloadApp";
import OfferBanner from "../components/OfferBanner";
import BlogHomePage from "../components/Blog/BlogHomePage";
import Banner1 from "../assets/images/banner-1.png";
import { BannerItemProps } from "../components/Carousel/CarouselItem";
import Services from "../components/Services";

const bannersData: BannerItemProps[] = [
  {
    desktopImage: Banner1,
    mobileImage: Banner1,
    key: 1,
    content: {
      buttonText: "Shop Now",
      description: "test desc",
      title: "welcome to pet shop",
    },
    color: "dark",
    alignContent: "right",
    showContent: false,
  },
];

const LandingPage = () => {
  return (
    <div className='h-full flex flex-col'>
      <CustomCarousel bannersData={bannersData} />
      <DownloadApp />
      <Services />
      <BlogHomePage />
    </div>
  );
};

export default LandingPage;
