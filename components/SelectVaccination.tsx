import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

interface Props {
  vaccinationDetails: any[];
  setValues: (values: any) => void;
  values: any;
  handleNext: () => void;
}

interface BoxProps {
  vaccine: any;
  selectedVaccines: any[];
  onSelect: (vaccine: any) => void;
  onDeSelect: (vaccine: any) => void;
}

const VaccineCheckBox: React.FC<BoxProps> = ({
  vaccine,
  selectedVaccines,
  onDeSelect,
  onSelect,
}) => {
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    const selectedVaccineIds = selectedVaccines.map(
      (vaccine) => vaccine?.serviceID
    );
    if (selectedVaccineIds.includes(vaccine?.serviceID)) {
      setSelected(true);
    }
  }, [selectedVaccines]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelected(isChecked);
    if (isChecked) {
      onSelect(vaccine);
    } else {
      onDeSelect(vaccine);
    }
  };

  return (
    <div className='flex flex-row gap-2 md:gap-20 w-full'>
      <div className='flex flex-col font-semi-bold w-[60%]'>
        <div>{vaccine?.name}</div>
        <div>[Optional]</div>
      </div>
      <div className='w-[40%] flex'>
        <div className='bg-grey-darker pl-4 py-0 rounded-xl flex gap-x-3 justify-center items-center'>
          <div>₹ {vaccine.cost}</div>
          <Checkbox checked={isSelected} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

const SelectVaccineElement: React.FC<Props> = ({
  vaccinationDetails,
  values,
  setValues,
  handleNext,
}) => {
  const petType = values?.pet?.type?.toLowerCase();
  const availableVaccines =
    vaccinationDetails.filter(
      (vaccine: any) => vaccine?.service_for?.toLowerCase() === petType
    ) || [];

  const handleSelect = (vaccine: any) => {
    setValues({ ...values, vaccine: [...(values?.vaccine || []), vaccine] });
  };

  const handleDeSelect = (vaccine: any) => {
    const updatedValues = (values?.vaccine || []).filter(
      (v: any) => vaccine?.serviceID !== v?.serviceID
    );
    setValues({
      ...values,
      vaccine: updatedValues.length > 0 ? updatedValues : null,
    });
  };
  return (
    <div className='flex flex-col gap-y-6'>
      <div className='text-2xl font-bold'>Select Vaccine For Your Pet</div>
      <div className='flex flex-col gap-6 w-full md:w-[40%]'>
        {availableVaccines.map((vaccine, idx) => {
          return (
            <VaccineCheckBox
              key={idx}
              vaccine={vaccine}
              selectedVaccines={values?.vaccine || []}
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

export default SelectVaccineElement;
