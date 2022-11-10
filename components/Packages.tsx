import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { getGroomingData } from "../pages/api/services";
import { useQuery } from "@tanstack/react-query";
import BlogSkeleton from "./Blog/BlogSkeleton";

type ItemProps = {
  image: string | StaticImageData;
  title: string;
  content: string[];
  price: string;
  duration: string;
  buttonEnabled?: boolean;
  selectedService?: any;
  onSelect?: (service: any) => void;
  onDeSelect?: () => void;
  service?: any;
};

export const PackageItem: React.FC<ItemProps> = ({
  image,
  title,
  content,
  price,
  duration,
  buttonEnabled = false,
  selectedService,
  onSelect,
  onDeSelect,
  service,
}) => {
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    if (
      service?.serviceID &&
      selectedService?.serviceID === service?.serviceID
    ) {
      setSelected(true);
    }
  }, []);

  const handleSelectService = () => {
    if (isSelected) {
      setSelected(false);
      if (onDeSelect) onDeSelect();
    } else {
      setSelected(true);
      if (onSelect) onSelect(service);
    }
  };

  return (
    <div className='flex flex-col items-center p-6 rounded-xl bg-gradient-to-b from-yellowNew to-white h-full shadow-xl justify-between'>
      <div className='w-full flex flex-col items-center'>
        <Image
          src={image}
          alt={title}
          width={20}
          height={20}
          className='w-[120px] h-[120px] mb-4'
        />
        <div className='text-xl md:text-2xl font-nunito-black pb-4 text-center'>
          {title}
        </div>
        {content.map((service, idx) => (
          <div className='w-full text-start px-4' key={idx}>
            {service}
          </div>
        ))}
        <div className='mb-12'></div>
      </div>
      <div className='flex flex-col w-full gap-y-8'>
        <div className='flex flex-row w-full font-nunito-black text-xl md:text-xl'>
          <div className='w-1/2 flex  ml-6 justify-start'>{price}</div>
          <div className='w-1/2 flex justify-end mr-6'>{duration}</div>
        </div>
        {buttonEnabled && (
          <div className='flex justify-center'>
            <Button
              variant='contained'
              onClick={handleSelectService}
              className={`rounded-full py-2 px-8 shadow-none text-white font-bold text-xs hover:text-white ${
                isSelected
                  ? "bg-primary-darker focus:bg-primary-darker"
                  : "bg-yellowNew focus:bg-yellowNew"
              }`}>
              {isSelected ? "DESELECT" : "SELECT"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Packages = () => {
  const {
    data: services,
    isSuccess: isGroomingSuccess,
    isLoading: isGroomingLoading,
  } = useQuery(["service"], getGroomingData);

  return (
    <div className='flex flex-col items-center justify-center px-10 gap-y-6 text-center py-6 mb-12 md:mb-24'>
      <div className='text-xl md:text-2xl font-bold text-black md:w-1/3 pb-6'>
        EXPLORE OR PACKAGES
      </div>
      <div className='w-full md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-12 items-center justify-center'>
        {isGroomingLoading
          ? [0, 1, 2].map((value, idx) => <BlogSkeleton key={idx} />)
          : services?.data?.services?.map((service: any, idx: number) => {
              const data: ItemProps = {
                image: service?.service_icon,
                content: service?.included,
                duration: service?.service_time,
                price: service?.cost,
                title: service?.name,
              };
              return <PackageItem {...data} key={idx} />;
            })}
      </div>
    </div>
  );
};

export default Packages;
