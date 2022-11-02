import React from "react";
import ServiceItem from "./ServiceItem";
import VaccinationImg from "../assets/images/pet-vaccination.png";
import TrainingImg from "../assets/images/pet-training.png";
import GroomingImg from "../assets/images/pet-grooming.png";

const serviceData = [
  {
    image: GroomingImg,
    backgroundColor: "bg-yellow",
    buttonText: "Click Here",
    content:
      "Personalized grooming packages can be enjoyed by your pets in the comforts of your own home. To help your pet look their best, set up a session.",
    href: "/grooming",
    title: "PET GROOMING",
  },
  {
    image: VaccinationImg,
    backgroundColor: "bg-primary-light",
    buttonText: "Click Here",
    content:
      "Pet vaccinations is one of the important thing that every owner should take care of. We provide all type of vaccinations for your pet on your doorstep.",
    href: "/vaccination",
    title: "PET VACCINATION",
  },
  {
    image: TrainingImg,
    backgroundColor: "bg-yellow",
    buttonText: "Click Here",
    content:
      "Dogs of different shapes, sizes, and ages can receive training. Choose from advanced obedience, behavioural, and agility instruction or basic training for beginners.",
    href: "/",
    title: "PET TRANINIG",
    disabled: true,
  },
];

const Services = () => {
  return (
    <div className='pt-12 pb-12 flex flex-col items-center w-full  justify-center px-4 md:px-[15%] text-center gap-y-6'>
      <div className='text-3xl font-bold text-black'>
        Our Affordable Door-Step Pet Care Services
      </div>
      <div className='text-md font-sans text-black'>
        We at Pettik are committed to providing your pets with the best quality
        of life and care. We ensure a safe, loving, fun and cage free
        environment for your pets. We have a team of highly qualified
        professionals who work in tandem to provide the best possible service
        for your pet. They are always on hand to help you with any queries or
        questions that you may have.
      </div>
      <div className='text-md font-sans text-black'>
        We provide boarding facilities for all kinds of animals including dogs,
        cats, rabbits, guinea pigs etc., so that you can enjoy your vacation
        without worrying about them. We also offer grooming services so that
        they can look their best before they go back home with you!
      </div>
      <div className='grid grid-cols-1 pt-6 md:grid-cols-3 items-center justify-center w-full gap-x-16 gap-y-8 px-4'>
        {serviceData.map((service, key) => (
          <ServiceItem {...service} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Services;
