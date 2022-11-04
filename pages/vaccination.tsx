import React from "react";
import CustomCarousel from "../components/Carousel";
import Banner1 from "../assets/images/vaccine-banner.png";
import { BannerItemProps } from "../components/Carousel/CarouselItem";
import Button from "@mui/material/Button";

const bannersData: BannerItemProps[] = [
  {
    desktopImage: Banner1,
    mobileImage: Banner1,
    content: {
      title: `WE CARE BEACUSE
      YOU CARE YOUR PET`,
      buttonText: "BOOK NOW",
    },
    color: "dark",
    alignContent: "left",
    showContent: true,
    href: "/",
  },
];

const Vaccination = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 md:gap-y-12'>
      <CustomCarousel bannersData={bannersData} />
      <div className='py-6 w-full flex justify-center'>
        <Button
          variant='contained'
          className='rounded-xl py-3 px-10 bg-primary-dark text-white shadow-none  font-bold text-sm hover:bg-yellowNew'>
          BOOK VACCINATION
        </Button>
      </div>
      <div className='pb-24 text-start px-6 md:px-24'>
        <div className=' font-bold'>WHY VACCINATIONS</div>
        <div>
          Keeping your pet up-to-date on various vaccinations is an important
          part of preventative veterinary care. Many of these diseases pose
          serious health risks to your pet should he/she be exposed. Luckily, we
          can bring vaccines to you and keep your pet as comfortable as possible
          while they are administered.
        </div>
        <div className=' font-bold py-6'>
          Below is a list of common vaccinations for cats and dogs. Some of
          these are recommended for every patient, while others depend on your
          pet&apos;s lifestyle.
        </div>
        ‍<div className=' font-bold'>Common Vaccinations for Cats</div>
        <div>✅ Rabies</div>
        <div>
          ✅ Feline Distemper and respiratory combined vaccine (Rhinotracheitis,
          Calicivirus, Panleukopenia)
        </div>
        <div>✅ Feline leukemia</div>
        <div className=' font-bold pt-6'>Common Vaccinations for Dogs</div>
        <div>✅ Rabies</div>
        <div>✅ DHPP: Distemper, Adenovirus, Parainfluenza, Parvovirus</div>
        <div>✅ Bordetella (Kennel Cough)</div>
        <div>✅ Lyme</div>
        <div>✅ Leptospirosis</div>
      </div>
    </div>
  );
};

export default Vaccination;
