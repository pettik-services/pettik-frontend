import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddSquare from "../assets/images/addsquare.svg";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

interface Props {
  addressDetails: any[];
  setValues: (values: any) => void;
  values: any;
  handleNext: () => void;
}

interface AddressCard {
  address: any;
  onSelect: (address: any) => void;
  onDeSelect: () => void;
  values: any;
}

interface AddAddressCard {}

const SelectAddressCard: React.FC<AddressCard> = ({
  address,
  onSelect,
  onDeSelect,
  values,
}) => {
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    if (
      values?.address &&
      values?.address?.street_address === address?.street_address &&
      values?.address?.city === address?.city &&
      values?.address?.pincode === address?.pincode
    ) {
      setSelected(true);
    }
  }, []);

  const handleSelectAddress = () => {
    if (isSelected) {
      setSelected(false);
      onDeSelect();
    } else {
      setSelected(true);
      onSelect(address);
    }
  };

  return (
    <div className='bg-grey-darker rounded-xl p-3 flex flex-col gap-y-4 items-center justify-center md:items-start md:justify-around'>
      <div className="text-center md:text-start px-3">
        <div>{address?.street_address}</div>
        <div>
          {address?.city} {address?.pincode}
        </div>
      </div>

      <div className='flex w-full items-center justify-center'>
        <Button
          variant='contained'
          onClick={handleSelectAddress}
          className={`rounded-full py-2 px-8 shadow-none text-white font-bold text-xs hover:text-white ${
            isSelected
              ? "bg-primary-darker focus:bg-primary-darker"
              : "bg-yellowNew focus:bg-yellowNew"
          }`}>
          {isSelected ? "DESELECT" : "SELECT"}
        </Button>
      </div>
    </div>
  );
};

const AddAddressCard: React.FC<AddAddressCard> = () => {
  const router = useRouter();
  return (
    <div className='bg-white border-[3px] border-black rounded-xl p-3 flex flex-col gap-y-4 items-center justify-center'>
      <Image
        src={AddSquare}
        alt='add address'
        className='w-[30%] hover:cursor-pointer'
        onClick={() => router.push("/dashboard/address")}
      />
      <Button
        variant='contained'
        onClick={() => router.push("/dashboard/address")}
        className='rounded-full py-2 px-8 bg-yellowNew shadow-none text-white font-bold text-xs hover:text-white hover:bg-primary-dark'>
        ADD ADDRESS
      </Button>
    </div>
  );
};

const SelectAddressElement: React.FC<Props> = ({
  addressDetails,
  setValues,
  values,
  handleNext
}) => {
  const handleSelectAddress = (address: any) => {
    setValues({ ...values, address: address });
    handleNext();
  };
  const handleDeSelectAddress = () => {
    setValues({ ...values, address: null });
  };

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='text-2xl font-bold'>
        Select or Add Address of Your Pet
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
        {addressDetails.map((address: any, idx: number) => (
          <SelectAddressCard
            key={idx}
            address={address}
            onSelect={handleSelectAddress}
            onDeSelect={handleDeSelectAddress}
            values={values}
          />
        ))}
        <AddAddressCard />
      </div>
    </div>
  );
};

export default SelectAddressElement;
