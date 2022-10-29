import React from "react";

const OfferBanner = () => {
  const offerCode = "PETTIK";
  return (
    <div className='bg-light-grey px-4 md:px-12 py-6 md:py-6 my-6 md:my-8 flex flex-col md:flex-row md:gap-y-0 gap-y-4'>
      <div className='flex w-full md:w-1/2 flex-col md:flex-row gap-x-12'>
        <div className='flex flex-row md:flex-col w-full md:w-1/2 items-start justify-center md:gap-x-0 gap-x-2'>
          <div className='text-xl font-semi-bold md:text-xl md:font-semi-bold'>
            FLAT
          </div>
          <div className='text-xl font-semi-bold md:text-5xl md:font-bold'>
            ₹ 150 OFF *
          </div>
        </div>
        <div className='flex flex-col md:flex-col w-full md:w-1/2 items-center  md:items-start justify-center'>
          <div className='text-lg md:text-xl font-semi-bold text-center md:px-0 px-2'>
            on services of Rs. 2000 & above
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row w-full md:w-1/2 items-center justify-center  gap-y-4 md:gap-y-0 '>
        <div className='flex flex-col md:flex-col w-full md:w-1/2 md:items-end items-center justify-center'>
          <button className='bg-primary-dark text-white w-[70%] text-xl md:text-2xl font-semi-bold px-4 py-2 md:px-6 md:py-2 rounded-2xl'>
            Use Code : {offerCode}
          </button>
        </div>
        <div className='flex flex-col md:flex-col w-full md:w-1/2 items-center md:items-end justify-center'>
          <div className='text-xl font-semi-bold'>T&C* apply</div>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
