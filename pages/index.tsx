import React from "react";
import CustomCarousel from "../components/Carousel";
import DownloadApp from "../components/DownloadApp";
import BlogHomePage from "../components/Blog/BlogHomePage";
import Banner1 from "../assets/images/banner-1.png";
import { BannerItemProps } from "../components/Carousel/CarouselItem";
import Services from "../components/Services";

const bannersData: BannerItemProps[] = [
  {
    desktopImage: Banner1,
    mobileImage: Banner1,
    content: {
      buttonText: "SCHEDULE NOW",
      description:
        "Let us treat your pet like our family with best service and special package",
      title: "Your Pet is part of our family",
    },
    color: "dark",
    alignContent: "center",
    showContent: true,
    href: "/grooming/book",
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
