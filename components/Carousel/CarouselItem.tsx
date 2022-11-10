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
    description?: string;
    buttonText?: string;
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
              alignContent === "center" ? "md:w-full" : "md:w-[60%]"
            } ${
              alignContent === "left" ? "order-first" : "order-last"
            } w-full h-full flex flex-col items-center justify-center px-8 py-4 md:px-0 md:py-0 gap-y-2 md:gap-y-4`}>
            <div
              className={`${
                content?.description
                  ? "text-3xl md:text-5xl"
                  : "text-2xl md:text-5xl leading-relaxed"
              } w-[90%] ${
                alignContent === "center"
                  ? "md:w-1/3 text-center"
                  : "md:w-[90%] md:text-start text-center"
              } font-nunito-black`}>
              {content?.title}
            </div>
            {content?.description && (
              <div className='text-lg md:text-xl font-regular text-center w-full md:w-[40%]'>
                {content.description}
              </div>
            )}
            <div
              className={`w-full flex px-12 ${
                alignContent === "center" ? "items-center justify-center" : "justify-center md:justify-start"
              }`}>
              {content?.buttonText && (
                <Link
                  href={href || "/"}
                  className='text-sm font-bold rounded-xl bg-primary-dark px-6 py-2 text-white shadow-md'>
                  {content.buttonText}
                </Link>
              )}
            </div>
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
