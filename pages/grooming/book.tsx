import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import withAuth from "../../components/Auth/AuthHOC";
import Loader from "../../components/Loader";
import SelectAddressElement from "../../components/SelectAddress";
import SelectDateTimeElement from "../../components/SelectDateTime";
import SelectPetElement from "../../components/SelectPet";
import SelectServiceElement from "../../components/SelectGrooming";
import CustomStepper from "../../components/Stepper";
import GroomingReviewElement from "../../components/GroomingFinalReview";
import { showErrorToast, showSuccessToast } from "../../utils/toaster";
import { getUserData } from "../api/auth";
import { bookGrooming, getGroomingData } from "../api/services";

const steps = [
  "Select Pet",
  "Select Service",
  "Select Address",
  "Select Date & Time",
  "Final Review",
];

const BookGrooming = () => {
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [values, setValues] = useState<{
    pet: any;
    service: any;
    address: any;
    dateTime: any;
  }>({ pet: null, service: null, address: null, dateTime: null });

  const router = useRouter();

  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery(["user-profile"], getUserData);

  const {
    data: services,
    isSuccess: isGroomingSuccess,
    isLoading: isGroomingLoading,
  } = useQuery(["service"], getGroomingData);

  const bookGroomingMutation = useMutation({
    mutationFn: bookGrooming,
    onSuccess: (data) => {
      showSuccessToast(data?.data?.message);
      router.push("/grooming");
    },
  });

  const handleBookGrooming = () => {
    const address = `${values?.address?.street_address} ${values?.address?.city} ${values?.address?.pincode}`;
    const payload = {
      service: values?.service?.name,
      pet_name: values?.pet?.name,
      pet_unique_id: values?.pet?.pet_unique_id,
      cost: values?.service?.cost,
      pet_address: address,
      date: values?.dateTime?.date,
      time: values?.dateTime?.time?.from,
    };
    bookGroomingMutation.mutate(payload);
  };

  if (isLoading || isGroomingLoading) return <Loader />;

  if (isSuccess && isGroomingSuccess) {
    const petDetails = user?.data?.userData?.pet_details || [];
    const addressDetails = user?.data?.userData?.user_details?.address || [];

    return (
      <div className='pb-0 md:pb-12 py-12 md:py-0 min-h-screen'>
        <CustomStepper
          title={"Complete the booking in 5 simple steps"}
          steps={steps}
          getFrom={(activeStep: number, handleBack, handleNext) => (
            <GroomingFrom
              activeStep={activeStep}
              petDetails={petDetails}
              addressDetails={addressDetails}
              serviceDetails={services?.data?.services || []}
              values={values}
              setValues={setValues}
              handleBack={handleBack}
              handleNext={handleNext}
              handleBookGrooming={handleBookGrooming}
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

export default withAuth(BookGrooming);

interface FormProps {
  activeStep: number;
  petDetails: any[];
  addressDetails: any[];
  serviceDetails: any[];
  values: any;
  setValues: (values: any) => void;
  handleBack: () => void;
  handleNext: () => void;
  handleBookGrooming: () => void;
}

const GroomingFrom: React.FC<FormProps> = ({
  activeStep,
  addressDetails,
  petDetails,
  serviceDetails,
  values,
  setValues,
  handleBack,
  handleNext,
  handleBookGrooming,
}) => {
  useEffect(() => {
    if (activeStep === 1 && values?.pet === null) {
      handleBack();
      showErrorToast("You must select a pet to proceed!");
    }
    if (activeStep === 2 && values?.service === null) {
      handleBack();
      showErrorToast("You must select a service to proceed!");
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
        <SelectServiceElement
          serviceDetails={serviceDetails}
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
        <GroomingReviewElement
          setValues={setValues}
          values={values}
          handleBookGrooming={handleBookGrooming}
        />
      )}
    </div>
  );
};
