import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import withAuth from "../../components/Auth/AuthHOC";
import Loader from "../../components/Loader";
import SelectAddressElement from "../../components/SelectAddress";
import SelectDateTimeElement from "../../components/SelectDateTime";
import SelectPetElement from "../../components/SelectPet";
import SelectVaccineElement from "../../components/SelectVaccination";
import CustomStepper from "../../components/Stepper";
import VaccinationReviewElement from "../../components/VaccinationFinalReview";
import { showErrorToast, showSuccessToast } from "../../utils/toaster";
import { getUserData } from "../api/auth";
import { bookVaccination, getVaccinationData } from "../api/services";

const steps = [
  "Select Pet",
  "Select Vaccine",
  "Select Address",
  "Select Date & Time",
  "Final Review",
];

const BookVaccination = () => {
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [values, setValues] = useState<{
    pet: any;
    vaccine: any;
    address: any;
    dateTime: any;
  }>({ pet: null, vaccine: null, address: null, dateTime: null });

  const router = useRouter();

  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery(["user-profile"], getUserData);

  const {
    data: vaccinations,
    isSuccess: isVaccinationSuccess,
    isLoading: isVaccinationLoading,
  } = useQuery(["vaccination"], getVaccinationData);

  const bookVaccineMutation = useMutation({
    mutationFn: bookVaccination,
    onSuccess: (data) => {
      showSuccessToast(data?.data?.message);
      router.push("/dashboard");
    },
  });

  const handleBookVaccination = () => {
    let totalCost = 0;
    const vaccineNames = values?.vaccine?.map((v: any) => {
      totalCost += v?.cost;
      return v?.name;
    });

    const address = `${values?.address?.street_address} ${values?.address?.city} ${values?.address?.pincode}`;
    const payload = {
      vaccine: vaccineNames,
      pet_name: values?.pet?.name,
      pet_unique_id: values?.pet?.pet_unique_id,
      cost: totalCost.toString(),
      pet_address: address,
      time: values?.dateTime?.time?.from,
      date: values?.dateTime?.date,
    };
    bookVaccineMutation.mutate(payload);
  };

  if (isLoading || isVaccinationLoading) return <Loader />;

  if (isSuccess && isVaccinationSuccess) {
    const petDetails = user?.data?.userData?.pet_details || [];
    const addressDetails = user?.data?.userData?.user_details?.address || [];

    return (
      <div className='pb-0 md:pb-12 py-12 md:py-0 min-h-screen'>
        <CustomStepper
          steps={steps}
          title={"Complete the vaccination booking in 5 simple steps"}
          getFrom={(activeStep: number, handleBack, handleNext) => (
            <VaccinationFrom
              activeStep={activeStep}
              petDetails={petDetails}
              addressDetails={addressDetails}
              vaccinationDetails={vaccinations?.data?.services || []}
              values={values}
              setValues={setValues}
              handleBack={handleBack}
              handleNext={handleNext}
              handleBookVaccination={handleBookVaccination}
            />
          )}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
    );
  }

  return null;
};

export default withAuth(BookVaccination);

interface FormProps {
  activeStep: number;
  petDetails: any[];
  addressDetails: any[];
  vaccinationDetails: any[];
  values: any;
  setValues: (values: any) => void;
  handleBack: () => void;
  handleNext: () => void;
  handleBookVaccination: () => void;
}

const VaccinationFrom: React.FC<FormProps> = ({
  activeStep,
  addressDetails,
  petDetails,
  vaccinationDetails,
  values,
  setValues,
  handleBack,
  handleNext,
  handleBookVaccination,
}) => {
  useEffect(() => {
    if (activeStep === 1 && values?.pet === null) {
      handleBack();
      showErrorToast("You must select a pet to proceed!");
    }
    if (activeStep === 2 && values?.vaccine === null) {
      handleBack();
      showErrorToast("You must select a vaccine to proceed!");
    }
    if (activeStep === 3 && values?.address === null) {
      handleBack();
      showErrorToast("You must select address to proceed!");
    }
    if (
      activeStep === 4 &&
      (values?.dateTime === null ||
        values?.dateTime?.time === null ||
        values?.dateTime?.date === null)
    ) {
      handleBack();
      showErrorToast("You must select date and time to proceed!");
    }
  }, [activeStep]);

  return (
    <div>
      {activeStep === 0 && (
        <SelectPetElement
          petDetails={petDetails}
          setValues={setValues}
          values={values}
          handleNext={handleNext}
        />
      )}
      {activeStep === 1 && (
        <SelectVaccineElement
          vaccinationDetails={vaccinationDetails}
          setValues={setValues}
          values={values}
          handleNext={handleNext}
        />
      )}
      {activeStep === 2 && (
        <SelectAddressElement
          addressDetails={addressDetails}
          setValues={setValues}
          values={values}
          handleNext={handleNext}
        />
      )}
      {activeStep === 3 && (
        <SelectDateTimeElement
          setValues={setValues}
          values={values}
          handleNext={handleNext}
        />
      )}
      {activeStep === 4 && (
        <VaccinationReviewElement
          setValues={setValues}
          values={values}
          handleBookVaccination={handleBookVaccination}
        />
      )}
    </div>
  );
};
