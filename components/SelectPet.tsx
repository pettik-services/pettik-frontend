import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cat from "../assets/images/cat.png";
import Dog from "../assets/images/dog.png";
import AddSquare from "../assets/images/addsquare.svg";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

interface Props {
  petDetails: any[];
  setValues: (values: any) => void;
  values: any;
  handleNext: () => void;
}

interface PetCard {
  pet: any;
  onSelect: (pet: any) => void;
  onDeSelect: () => void;
  values: any;
}

interface AddPetCard {}

const SelectPetCard: React.FC<PetCard> = ({
  pet,
  onSelect,
  onDeSelect,
  values,
}) => {
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    if (
      values?.pet?.pet_unique_id &&
      values?.pet?.pet_unique_id === pet?.pet_unique_id
    ) {
      setSelected(true);
    }
  }, []);

  const handleSelectPet = () => {
    if (isSelected) {
      setSelected(false);
      onDeSelect();
    } else {
      setSelected(true);
      onSelect(pet);
    }
  };

  return (
    <div className='bg-grey-darker rounded-xl p-3 flex flex-col gap-y-4 items-center justify-center md:items-start md:justify-start'>
      <div className='flex flex-col md:flex-row gap-x-4 items-center md:items-start'>
        <Image
          src={pet?.type?.toLowerCase() === "cat" ? Cat : Dog}
          alt='cat'
          className='h-20 w-20 md:h-16 md:w-16 rounded-full'
        />

        <div className='flex flex-col text-center md:text-start'>
          <div className='text-lg font-bold'>{pet?.name}</div>
          <div>{pet?.pet_unique_id}</div>
          <div>{pet?.breed}</div>
        </div>
      </div>
      <div className='flex w-full items-center justify-center'>
        <Button
          variant='contained'
          onClick={handleSelectPet}
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

const AddPetCard: React.FC<AddPetCard> = () => {
  const router = useRouter();
  return (
    <div className='bg-white border-[3px] border-black rounded-xl p-3 flex flex-col gap-y-4 items-center justify-center'>
      <Image
        src={AddSquare}
        alt='add pet'
        className='w-[30%] hover:cursor-pointer'
        onClick={() => router.push("/dashboard/pet")}
      />
      <Button
        variant='contained'
        onClick={() => router.push("/dashboard/pet")}
        className='rounded-full py-2 px-8 bg-yellowNew shadow-none text-white font-bold text-xs hover:text-white hover:bg-primary-dark'>
        ADD PET
      </Button>
    </div>
  );
};

const SelectPetElement: React.FC<Props> = ({
  petDetails,
  setValues,
  values,
  handleNext,
}) => {
  const handleSelectPet = (pet: any) => {
    setValues({ ...values, pet: pet });
    handleNext();
  };
  const handleDeSelectPet = () => {
    setValues({ ...values, pet: null });
  };

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='text-2xl font-bold'>Select or Add a Pet</div>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
        {petDetails.map((pet: any, idx: number) => (
          <SelectPetCard
            key={idx}
            pet={pet}
            onSelect={handleSelectPet}
            onDeSelect={handleDeSelectPet}
            values={values}
          />
        ))}
        <AddPetCard />
      </div>
    </div>
  );
};

export default SelectPetElement;
