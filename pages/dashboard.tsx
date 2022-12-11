import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import withAuth from "../components/Auth/AuthHOC";
import ProfileDetailsImg from "../assets/images/profile-details.png";
import OrderDetailsImg from "../assets/images/order-details.png";

const DashboardNew = () => {
  return (
    <div className='md:min-h-screen py-24 px-6 w-full'>
      <div className='flex flex-col md:flex-row gap-x-12 gap-y-8 justify-center'>
        <DetailsCard
          img={ProfileDetailsImg}
          content='Click here to view your profile details'
          href='dashboard/pet-details'
          title='Profile Details'
        />
        <DetailsCard
          img={OrderDetailsImg}
          content='Click here to view your order details'
          href='dashboard/order-details'
          title='Order Details'
        />
      </div>
    </div>
  );
};

export default withAuth(DashboardNew);

type DetailsProps = {
  img: string | StaticImageData;
  title: string;
  content: string;
  href: string;
};

const DetailsCard: React.FC<DetailsProps> = ({ img, title, content, href }) => {
  return (
    <Link
      href={href}
      className='rounded-xl bg-grey-darker p-6 flex items-center justify-center gap-x-8'>
      <Image src={img} alt={title} className='rounded-full w-20 h-20' />
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>{title}</div>
        <div className='text-md font-sans'>{content}</div>
      </div>
    </Link>
  );
};
