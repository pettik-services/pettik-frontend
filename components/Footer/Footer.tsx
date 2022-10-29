import Link from "next/link";
import React from "react";
import { MdLocationOn, MdMail, MdPhone } from "react-icons/md/index";
import { itemsData } from "./data";

type ItemProps = {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
};

const FooterItems: React.FC<ItemProps> = ({ title, items }) => {
  return (
    <div className='flex flex-col items-center md:items-start gap-y-3'>
      <div className='font-bold text-lg'>{title}</div>
      {items.map((item) => (
        <Link
          href={item.href}
          className='text-white font-regular hover:text-primary-dark text-md'>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-center md:items-start justify-around bg-dark-grey text-white py-12 px-8 relative'>
      <FooterItems title='Most Searched' items={itemsData.mostSearched} />
      <FooterItems title='Quick Links' items={itemsData.quickLinks} />
      <FooterItems title='Company' items={itemsData.company} />
      <FooterItems title='Product' items={itemsData.product} />
      <FooterItems title='Account' items={itemsData.account} />

      <div className='flex flex-col items-center md:items-start gap-y-3'>
        <div className='font-bold text-lg'>Get in Touch</div>
        <div className='text-white font-regular hover:text-primary-dark text-md flex flex-row justify-start w-48 gap-2'>
          <span>
            <MdLocationOn size={24} />
          </span>
          <span>
            3rd Floor, T-04 Pettik, Sector 3 Noida, Uttar Pradesh - 201301
          </span>
        </div>
        <div className='text-white font-regular hover:text-primary-dark text-md flex flex-row justify-start w-48 gap-2'>
          <span>
            <MdPhone size={24} />
          </span>
          <span>+91-997116196</span>
        </div>
        <div className='text-white font-regular hover:text-primary-dark text-md flex flex-row justify-start w-48 gap-2'>
          <span>
            <MdMail size={24} />
          </span>
          <span>pettik.services@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
