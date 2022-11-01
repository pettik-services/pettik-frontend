import Image, { StaticImageData } from "next/image";
import React from "react";
import PackageImage1 from "../assets/images/service-1.png";
import PackageImage2 from "../assets/images/service-2.png";
import PackageImage3 from "../assets/images/service-3.png";

const itemsData: ItemProps[] = [
  {
    image: PackageImage1,
    title: "Spa Bath",
    content: [
      "Bath With Shampoo & Conditioner",
      "Blow Dry",
      "Nail Clipping",
      "Ear Cleaning",
      "Eyes Cleaning",
      "Paw Massage",
      "Combing/Brushing",
    ],
    price: "₹999",
    duration: "150",
  },
  {
    image: PackageImage2,
    title: "Bath + Basic Grooming",
    content: [
      "Bath With Shampoo & Conditioner",
      "Blow Dry",
      "Face Haircutting",
      "Sanitary Trim",
      "Nail Clipping",
      "Ear Cleaning",
      "Eyes Cleaning",
      "Teeth Cleaning/Mouth Spray",
      "Paw Massage",
      "Combing/Brushing",
    ],
    price: "₹1199",
    duration: "200",
  },
  {
    image: PackageImage3,
    title: "Full Service",
    content: [
      "Bath With Shampoo & Conditioner",
      "Blow Dry",
      "Hair Styling",
      "De-Matting",
      "Tick Removal By hand",
      "Anti-Tick Treatment",
      "Eye Cleaning",
      "Ear Cleaning",
      "Body Massage",
      "Sanitary Clipping",
      "Nail Clipping",
      "Teeth Cleaning/Mouth Spray",
      "Paw Massage",
      "Combing/Brushing",
    ],
    price: "₹1499",
    duration: "250",
  },
];

type ItemProps = {
  image: string | StaticImageData;
  title: string;
  content: string[];
  price: string;
  duration: string;
};

const PackageItem: React.FC<ItemProps> = ({
  image,
  title,
  content,
  price,
  duration,
}) => {
  return (
    <div className='flex flex-col items-center p-6 relative rounded-xl bg-gradient-to-b from-yellow to-white h-full shadow-xl'>
      <Image src={image} alt={title} className='w-[120px] h-[120px] mb-4' />
      <div className='text-xl md:text-2xl font-nunito-black pb-4 text-center'>
        {title}
      </div>
      {content.map((service, idx) => (
        <div className='w-full text-start px-4' key={idx}>
          {service}
        </div>
      ))}
      <div className='mb-12'></div>
      <div className='flex flex-row absolute bottom-6 left-0 w-full font-nunito-black text-xl md:text-2xl'>
        <div className='w-1/2 flex  ml-6 justify-start'>{price}</div>
        <div className='w-1/2 flex justify-end mr-6'>{duration} Minutes</div>
      </div>
    </div>
  );
};

const Packages = () => {
  return (
    <div className='flex flex-col items-center justify-center px-10 gap-y-6 text-center py-6 mb-12 md:mb-24'>
      <div className='text-xl md:text-2xl font-bold text-black md:w-1/3 pb-6'>
        EXPLORE OR PACKAGES
      </div>
      <div className='w-full md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-12 items-center justify-center'>
        {itemsData.map((item, idx) => (
          <PackageItem {...item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Packages;
