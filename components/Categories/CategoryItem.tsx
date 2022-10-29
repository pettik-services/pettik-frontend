import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  imageUrl: string | StaticImageData;
  title: string;
  path: string;
  disabled?: boolean;
};

const CategoryItem: React.FC<Props> = ({
  imageUrl,
  title,
  path,
  disabled = false,
}) => {
  return (
    <Link href={path} className={`${disabled && 'pointer-events-none'}`}>
      <div className='w-20 md:w-24'>
        <Image
          src={imageUrl}
          className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover'
          alt={title}
        />
      </div>
      <p className='text-center font-semibold text-xs md:text-sm mt-2 text-black'>
        {title}
      </p>
    </Link>
  );
};

export default CategoryItem;
