import Image, { StaticImageData } from "next/image";
import { useMediaQuery } from "react-responsive";
import React from "react";
import Link from "next/link";

export type BannerItemProps = {
  desktopImage: string | StaticImageData;
  mobileImage: string | StaticImageData;
  href?: string;
  content?: {
    title: string;
    description: string;
    buttonText: string;
  };
  color: "dark" | "light";
  alignContent: "left" | "right" | "center";
  showContent?: boolean;
  key?: number;
};

const CarouselItem: React.FC<BannerItemProps> = ({
  desktopImage,
  mobileImage,
  href,
  content,
  color,
  alignContent,
  showContent = true,
  key,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className='w-full h-56 md:h-72 relative' key={key}>
      <Image
        src={isTabletOrMobile ? mobileImage : desktopImage}
        alt={content?.title || ""}
        className='w-full h-full absolute top-0 left-0 -z-10 object-cover'
      />
      {showContent && (
        <div
          className={`w-full h-full flex ${
            color === "dark" ? "text-black" : "text-white"
          }`}>
          <div
            className={`${
              alignContent === "center" ? "md:w-full" : "md:w-[40%]"
            } ${
              alignContent === "left" ? "order-first" : "order-last"
            } w-full h-full flex flex-col items-center justify-center px-12 py-4 md:px-0 md:py-0 gap-y-4`}>
            <div className='text-3xl font-bold text-center'>
              {content?.title}
            </div>
            <div className='text-xl font-regular text-center'>
              {content?.description}
            </div>
            <Link
              href={href || "/"}
              className='text-sm font-bold rounded-xl bg-grey px-6 py-2 text-primary-darker'>
              {content?.buttonText}
            </Link>
          </div>
          <div
            className={`${
              alignContent === "center"
                ? "md:w-full hidden"
                : "md:w-[60%] hidden md:block"
            }`}></div>
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
