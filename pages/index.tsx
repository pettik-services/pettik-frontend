import React from "react";
import Categories from "../components/Categories";
import CustomCarousel from "../components/Carousel";
import DownloadApp from "../components/DownloadApp";
import OfferBanner from "../components/OfferBanner";
import BlogHomePage from "../components/Blog/BlogHomePage";

const LandingPage = () => {
  return (
    <div className='h-full flex flex-col'>
      <CustomCarousel />

      <DownloadApp />
      <OfferBanner />
      <div className='flex flex-col items-center justify-center py-8 gap-y-4'>
        <div className='font-bold text-3xl'>Explore Services</div>
        <Categories />
      </div>
      <BlogHomePage />
    </div>
  );
};

export default LandingPage;
