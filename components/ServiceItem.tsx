import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";

type Props = {
  backgroundColor: string;
  href: string;
  image: string | StaticImageData;
  title: string;
  content: string;
  buttonText: string;
};

const ServiceItem: React.FC<Props> = ({
  backgroundColor,
  href,
  image,
  content,
  title,
  buttonText,
}) => {
  return (
    <div className='h-[500px] flex flex-col relative items-center justify-end'>
      <Image alt='image' src={image} className='absolute top-0' />
      <div
        className={`h-[70%] rounded-[80px] border-4 border-black ${backgroundColor} flex flex-col items-center justify-center px-2`}>
        <div className='text-lg font-bold'>{title}</div>
        <div className='pt-1'>{content}</div>
        <Link
          href={href}
          className='absolute bottom-8 border-2 py-1 px-4 border-black bg-white text-black font-bold rounded-lg '>
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ServiceItem;
