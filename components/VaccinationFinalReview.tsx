import Image from "next/image";
import React from "react";
import Hurray from "../assets/images/hurray.png";
import Button from "@mui/material/Button";

interface Props {
  setValues: (values: any) => void;
  values: any;
  handleBookVaccination: () => void;
}

const VaccinationReviewElement: React.FC<Props> = ({
  values,
  setValues,
  handleBookVaccination,
}) => {
  let totalCost = 0;
  values?.vaccine?.map((v: any) => {
    totalCost += parseInt(v?.cost);
  });
  return (
    <div className='flex flex-col gap-y-6 py-6'>
      <div>
        <div className='text-2xl font-bold'>
          Huraay, you have submitted all the details. You are only one step away
        </div>
        <div>Review the Vaccine details and Place the order now done</div>
      </div>
      <div className='flex'>
        <div className='flex flex-col bg-grey-darker rounded-2xl items-center p-6 justify-center text-center gap-y-4'>
          <Image src={Hurray} alt='hurray' className='h-20 w-20' />
          <div className='text-sm font-semi-bold'>
            {values?.vaccine?.map((v: any, idx: number) => (
              <div key={idx}>{v?.name}</div>
            ))}
          </div>
          <div>
            <span className='font-bold text-lg'>Date: </span>
            {values?.dateTime?.date}
          </div>
          <div>
            <span className='font-bold text-lg'>Time: </span>
            {values?.dateTime?.time?.from}
          </div>
          <div>
            <span className='font-bold text-lg'>Address: </span>
            {values?.address?.street_address}, {values?.address?.city},
            {values?.address?.pincode}
          </div>
          <div className='flex justify-between w-full font-bold px-4 py-6'>
            <div className='font-bold'>Amount: </div>
            <div className='text-green-700'>₹ {totalCost}/-</div>
          </div>
          <Button
            variant='contained'
            onClick={() => handleBookVaccination()}
            className='rounded-full py-2 px-8 bg-yellowNew shadow-none text-white font-bold hover:text-white hover:bg-primary-dark'>
            PROCEED
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VaccinationReviewElement;
