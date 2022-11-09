import React, { useState, useEffect } from "react";
import withAuth from "../../components/Auth/AuthHOC";
import { useRouter } from "next/router";
import { getUserData } from "../api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/user";
import { showSuccessToast } from "../../utils/toaster";
import Loader from "../../components/Loader";
import Cat from "../../assets/images/cat.png";
import Dog from "../../assets/images/dog.png";
import Image from "next/image";
import Button from "@mui/material/Button";

interface Props {
  handleSubmit: (payload: any) => void;
}

const PetDetailsForm: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [fetchPet, setFetchPet] = useState(false);
  const { isEdit, petUniqueId } = router.query;

  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery(["user-profile"], getUserData, {
    enabled: fetchPet,
  });

  useEffect(() => {
    setFetchPet((isEdit || "") === "true");
    setFetchPet(!fetchPet);
  }, [isEdit, petUniqueId]);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () =>
      showSuccessToast(`Pet ${isEdit ? "updated" : "added"} successfully`),
  });

  const handleSubmit = (payload: any) => {
    updateUserMutation.mutate(payload);
    router.push("/dashboard");
  };

  if (isLoading && (isEdit || "") === "true") return <Loader />;

  if (isSuccess && (isEdit || "") === "true") {
    const pets = user.data?.userData?.pet_details || [];
    const petDetails = pets.filter(
      (pet) => pet.pet_unique_id === petUniqueId
    )?.[0];

    return (
      <div className='flex flex-row items-center justify-center pb-12'>
        <PetUpdateForm
          petDetails={petDetails}
          isEdit={true}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div className='flex flex-row items-center justify-center pb-12'>
      <PetUpdateForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default withAuth(PetDetailsForm);

interface FormProps {
  petDetails?: any;
  isEdit?: boolean;
  handleSubmit: (payload: any) => void;
}

const PetUpdateForm: React.FC<FormProps> = ({
  isEdit = false,
  petDetails,
  handleSubmit,
}) => {
  const [values, setValues] = useState<{
    petType: string | null;
    petName: string | null;
    petDob: string | null;
    petGender: string | null;
    petBreed: string | null;
    petWeight: string | null;
  }>({
    petType: null,
    petName: null,
    petDob: null,
    petGender: null,
    petBreed: null,
    petWeight: null,
  });
  const [validationErrors, setValidatonErrors] = useState<{
    petType: string | null;
    petName: string | null;
    petDob: string | null;
    petGender: string | null;
    petBreed: string | null;
    petWeight: string | null;
  }>({
    petType: null,
    petName: null,
    petDob: null,
    petGender: null,
    petBreed: null,
    petWeight: null,
  });
  useEffect(() => {
    if (isEdit) {
      setValues({
        ...values,
        petBreed: petDetails?.breed,
        petGender: petDetails?.gender,
        petName: petDetails?.name,
        petDob: petDetails?.dob,
        petWeight: petDetails?.weight,
        petType: (petDetails?.type || "").toLowerCase(),
      });
    }
  }, [isEdit]);

  useEffect(() => {
    setValidatonErrors({
      ...validationErrors,
      petType: null,
      petName: null,
      petDob: null,
      petGender: null,
      petBreed: null,
      petWeight: null,
    });
  }, [values]);

  const handleFormValidate = () => {
    let isValidationFailed = false;
    Object.keys(values).map((key: string, idx: number) => {
      const isSuccess = validate(key, (values as any)[key]);
      if (!isSuccess) {
        isValidationFailed = true;
      }
    });

    if (isValidationFailed) {
      return;
    }

    const payload = {
      pet: {
        ...(isEdit ? { pet_unique_id: petDetails?.pet_unique_id } : {}),
        pet_gender: values.petGender,
        pet_type: values.petType,
        pet_name: values.petName,
        pet_breed: values.petBreed,
        weight: values.petWeight,
        pet_dob: values.petDob,
      },
    };
    handleSubmit(payload);
  };

  const validate = (key: string, value: string | null): boolean => {
    if (!value || value?.length === 0) {
      setValidatonErrors({
        ...validationErrors,
        [key]: "Field should not be empty!",
      });
      return false;
    }
    return true;
  };

  return (
    <div className='rounded-xl bg-grey-darker px-6 w-full md:w-[30%] md:px-16 mt-12 md:mt-0 py-8 flex flex-col mx-4 shadow-lg font-bold text-black gap-4'>
      <div>Select Pet Type</div>
      <div className='flex flex-row gap-12'>
        <div
          className='flex flex-col items-center gap-2 hover:cursor-pointer '
          onClick={() => setValues({ ...values, petType: "dog" })}>
          <Image
            src={Dog}
            alt='dog'
            className={`${
              values.petType === "dog"
                ? "border-gray-700 border-[4px]"
                : "border-none"
            } rounded-full h-20 w-20 shadow-md`}
          />
          <div className='font-bold text-black'>DOG</div>
        </div>
        <div
          className='flex flex-col items-center gap-2 hover:cursor-pointer '
          onClick={() => setValues({ ...values, petType: "cat" })}>
          <Image
            src={Cat}
            alt='cat'
            className={`${
              values.petType === "cat"
                ? "border-gray-700 border-[4px]"
                : "border-none"
            } rounded-full h-20 w-20 shadow-md`}
          />
          <div className='font-bold text-black'>CAT</div>
        </div>
      </div>
      {validationErrors.petType && (
        <div className='text-red-400 text-xs'>{validationErrors.petType}</div>
      )}
      <div className='flex flex-col gap-1 w-full'>
        <div>Enter Pet Name</div>
        <input
          type={"text"}
          placeholder={"Pet Name"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, petName: null });
            setValues({ ...values, petName: e.target.value });
          }}
          value={values.petName ? values.petName : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.petName && (
          <div className='text-red-400 text-xs'>{validationErrors.petName}</div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Select Pet Gender</div>
        <div className='w-full flex flex-row gap-2'>
          <div
            className={`w-1/2 text-center bg-white rounded-lg py-2 hover:cursor-pointer ${
              (values.petGender || "").toLowerCase() === "male"
                ? "border-[3px] border-black"
                : "border-none"
            }`}
            onClick={() => setValues({ ...values, petGender: "Male" })}>
            MALE
          </div>
          <div
            className={`w-1/2 text-center bg-white rounded-lg py-2 hover:cursor-pointer ${
              (values.petGender || "").toLowerCase() === "female"
                ? "border-[3px] border-black"
                : "border-none"
            }`}
            onClick={() => setValues({ ...values, petGender: "Female" })}>
            FEMALE
          </div>
        </div>
        {validationErrors.petGender && (
          <div className='text-red-400 text-xs'>
            {validationErrors.petGender}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Select Pet Breed</div>
        <input
          type={"text"}
          placeholder={"Pet Breed"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, petBreed: null });
            setValues({ ...values, petBreed: e.target.value });
          }}
          value={values.petBreed ? values.petBreed : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.petBreed && (
          <div className='text-red-400 text-xs'>
            {validationErrors.petBreed}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Enter your Pet DOB</div>
        <input
          type={"text"}
          placeholder={"Pet DOB"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, petDob: null });
            setValues({ ...values, petDob: e.target.value });
          }}
          value={values.petDob ? values.petDob : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.petDob && (
          <div className='text-red-400 text-xs'>{validationErrors.petDob}</div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Enter your Pet Weight</div>
        <input
          type={"text"}
          placeholder={"Pet Weight"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, petWeight: null });
            setValues({ ...values, petWeight: e.target.value });
          }}
          value={values.petWeight ? values.petWeight : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.petWeight && (
          <div className='text-red-400 text-xs'>
            {validationErrors.petWeight}
          </div>
        )}
      </div>
      <div className='flex items-center justify-center'>
        <Button
          variant='contained'
          onClick={handleFormValidate}
          className='rounded-xl py-2 px-8 bg-primary-darker shadow-none text-white font-bold text-sm hover:text-white hover:bg-primary-dark'>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};