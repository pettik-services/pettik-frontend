import Image, { StaticImageData } from "next/image";
import React from "react";
import ServiceImage1 from "../assets/images/section1-image1.png";
import ServiceImage2 from "../assets/images/section1-image2.png";
import ServiceImage3 from "../assets/images/section1-image3.png";
import ServiceImage4 from "../assets/images/section1-image4.png";
import Button from "@mui/material/Button";

type ItemProps = {
  image: string | StaticImageData;
  title: string;
  content: string;
  index?: number;
};

const itemsData: ItemProps[] = [
  {
    image: ServiceImage1,
    title: "Breed Specific Haircut",
    content:
      "Pettik's experienced groomers suggest speciality trims for each breed.",
  },
  {
    image: ServiceImage2,
    title: "Grooming Experts",
    content:
      "Pettik certified and trained groomers for your little companions.",
  },
  {
    image: ServiceImage3,
    title: "Quality Products",
    content: "A wide variety of tested products to ensure the best care.",
  },
  {
    image: ServiceImage4,
    title: "High Convenience",
    content: "Curate a package of the services you need for your pet.",
  },
];

const ServiceItem: React.FC<ItemProps> = ({ image, title, content, index }) => {
  return (
    <div
      className="flex flex-col p-4 items-center justify-center gap-y-1 md:gap-y-3 text-center text-black"
      key={index}>
      <Image
        src={image}
        alt={title}
        className="w-[200px] h-[200px] md:w-[200px]"
      />
      <div className="font-bold text-md">{title}</div>
      <div className="text-sm">{content}</div>
    </div>
  );
};

const GroomingServices = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 gap-y-6 text-center py-6 md:py-12">
      <div className="text-xl md:text-2xl font-bold text-black md:w-1/3">
        Professional Grooming Services that put your pet&apos;s needs first
      </div>
      <div className="w-full md:w-[80%] flex flex-col md:flex-row md:gap-12">
        {itemsData.map((item, idx) => (
          <ServiceItem {...item} key={idx} index={idx} />
        ))}
      </div>
      <Button
        variant="contained"
        href="/grooming/book"
        className="rounded-xl py-3 px-10 bg-primary-dark text-white shadow-none  font-bold text-sm hover:bg-yellowNew">
        BOOK NOW
      </Button>
    </div>
  );
};

export default GroomingServices;
