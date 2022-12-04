import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  title: string;
  href: string;
  width?: string;
};

const BlogCard: React.FC<Props> = ({ image, title, href, width }) => {
  return (
    <div className='flex flex-col items-center'>
      <img src={image} alt={title} className={`rounded-2xl ${width? width : 'w-full'}`} />
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
