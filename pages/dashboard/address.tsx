import React, { useState, useEffect } from "react";
import withAuth from "../../components/Auth/AuthHOC";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/user";
import { showSuccessToast } from "../../utils/toaster";
import Button from "@mui/material/Button";
import AddHomeIcon from "@mui/icons-material/AddHome";

interface Props {
  handleSubmit: (payload: any) => void;
}

const AddressDetailsForm: React.FC<Props> = ({}) => {
  const router = useRouter();

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      showSuccessToast(`Address updated successfully`);
      router.reload();
    },
  });

  const handleSubmit = (payload: any) => {
    updateUserMutation.mutate(payload);
  };
  return (
    <div className='flex flex-row items-center justify-center pb-12'>
      <UserUpdateForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default withAuth(AddressDetailsForm);

interface FormProps {
  handleSubmit: (payload: any) => void;
}

const UserUpdateForm: React.FC<FormProps> = ({ handleSubmit }) => {
  const [values, setValues] = useState<{
    street: string | null;
    city: string | null;
    pincode: string | null;
  }>({
    street: null,
    city: null,
    pincode: null,
  });
  const [validationErrors, setValidatonErrors] = useState<{
    street: string | null;
    city: string | null;
    pincode: string | null;
  }>({
    street: null,
    city: null,
    pincode: null,
  });

  useEffect(() => {
    setValidatonErrors({
      ...validationErrors,
      street: null,
      city: null,
      pincode: null,
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

    const payload = { address: values };
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
    <div className='rounded-xl bg-grey-darker px-6 w-full md:w-[30%] md:px-16 mt-12 md:mt-0 py-8 flex flex-col mx-4 shadow-lg font-bold text-black gap-4 items-center justify-center'>
      <div className={`bg-primary-light rounded-full p-4 shadow-md`}>
        <AddHomeIcon sx={{ fontSize: "60px" }} />
      </div>

      <div className='flex flex-col gap-1 w-full'>
        <div>Enter Street</div>
        <input
          type={"text"}
          placeholder={"Street"}
          onChange={(e) => {
            setValues({ ...values, street: e.target.value });
          }}
          value={values.street ? values.street : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.street && (
          <div className='text-red-400 text-xs'>{validationErrors.street}</div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Enter city</div>
        <input
          type={"text"}
          placeholder={"City"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, city: null });
            setValues({ ...values, city: e.target.value });
          }}
          value={values.city ? values.city : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.city && (
          <div className='text-red-400 text-xs'>{validationErrors.city}</div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Enter Pin Code</div>
        <input
          type={"text"}
          placeholder={"Pin Code"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, pincode: null });
            setValues({ ...values, pincode: e.target.value });
          }}
          value={values.pincode ? values.pincode : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.pincode && (
          <div className='text-red-400 text-xs'>{validationErrors.pincode}</div>
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
