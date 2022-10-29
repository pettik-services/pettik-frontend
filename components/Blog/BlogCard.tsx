import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: string | StaticImageData;
  title: string;
  href: string;
};

const BlogCard: React.FC<Props> = ({ image, title, href }) => {
  return (
    <div className='flex flex-col items-center'>
      <Image src={image} alt={title} className='rounded-2xl' />
      <div className='text-sm font-regular text-center pt-4'>{title}</div>
      <Link
        href={href}
        className='text-black font-semi-bold underline hover:text-primary-dark'>
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
