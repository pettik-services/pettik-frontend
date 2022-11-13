import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { PackageItem } from "./Packages";

interface Props {
  serviceDetails: any[];
  setValues: (values: any) => void;
  values: any;
  handleNext: () => void;
}

const SelectServiceElement: React.FC<Props> = ({
  serviceDetails,
  values,
  setValues,
  handleNext,
}) => {
  const petType = values?.pet?.type?.toLowerCase();
  const availableServices =
    serviceDetails.filter((service: any) => {
      const check = service?.service_for?.toLowerCase() === petType;
      return true;
    }) || [];

  const handleSelect = (service: any) => {
    setValues({ ...values, service: service });
    handleNext();
  };

  const handleDeSelect = () => {
    setValues({
      ...values,
      service: null,
    });
  };
  return (
    <div className='flex flex-col gap-y-6'>
      <div className='text-2xl font-bold'>Select Plan For Your Pet</div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-12 items-center justify-center'>
        {availableServices.map((service, idx) => {
          return (
            <PackageItem
              key={idx}
              title={service?.name}
              content={service?.included}
              price={service?.cost}
              image={service?.service_icon}
              duration={service?.service_time}
              buttonEnabled
              service={service}
              selectedService={values?.service}
              onSelect={handleSelect}
              onDeSelect={handleDeSelect}
            />
          );
        })}
      </div>
      <div className='flex mt-4 w-full items-center md:items-start md:justify-start justify-center'>
        <Button
          variant='contained'
          onClick={() => handleNext()}
          className='rounded-full py-2 px-8 bg-yellowNew shadow-none text-white font-bold hover:text-white hover:bg-primary-dark'>
          PROCEED
        </Button>
      </div>
    </div>
  );
};

export default SelectServiceElement;
