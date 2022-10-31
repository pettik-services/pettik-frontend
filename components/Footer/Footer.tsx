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
      {items.map((item, idx) => (
        <Link
          key={idx}
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
      <FooterItems title='Company' items={itemsData.company} />
      <FooterItems title='Account' items={itemsData.account} />

      <div className='flex flex-col items-center md:items-start gap-y-3'>
        <div className='font-bold text-lg'>Get in Touch</div>
        <a
          href='https://goo.gl/maps/ztDL3rjMPKZevm7Z6'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white font-regular hover:cursor-pointer hover:text-primary-dark text-md flex flex-row justify-start w-48 gap-2'>
          <span>
            <MdLocationOn size={24} />
          </span>
          <span>
            3rd Floor, T-04 Pettik, Sector 3 Noida, Uttar Pradesh - 201301
          </span>
        </a>
        <a
          href='tel:+918800273706'
          className='text-white font-regular hover:cursor-pointer hover:text-primary-dark text-md flex flex-row justify-start w-48 gap-2'>
          <span>
            <MdPhone size={24} />
          </span>
          <span>+91 8800273706</span>
        </a>
        <a
          href='mailto:pettik.services@gmail.com'
          className='text-white font-regular hover:cursor-pointer hover:text-primary-dark text-md flex flex-row justify-start w-48 gap-2'>
          <span>
            <MdMail size={24} />
          </span>
          <span>pettik.services@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
