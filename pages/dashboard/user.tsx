import React, { useState, useEffect } from "react";
import withAuth from "../../components/Auth/AuthHOC";
import { useRouter } from "next/router";
import { getUserData } from "../api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/user";
import { showSuccessToast } from "../../utils/toaster";
import Loader from "../../components/Loader";
import Button from "@mui/material/Button";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

interface Props {
  handleSubmit: (payload: any) => void;
}

const UserDetailsForm: React.FC<Props> = ({}) => {
  const router = useRouter();
  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery(["user-profile"], getUserData, {
    enabled: true,
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      showSuccessToast(`User updated successfully`);
      router.reload();
    },
  });

  const handleSubmit = (payload: any) => {
    updateUserMutation.mutate(payload);
  };

  if (isLoading) return <Loader />;

  if (isSuccess) {
    const userDetails = user.data?.userData?.user_details;

    return (
      <div className='flex flex-row items-center justify-center pb-12'>
        <UserUpdateForm userDetails={userDetails} handleSubmit={handleSubmit} />
      </div>
    );
  }

  return null;
};

export default withAuth(UserDetailsForm);

interface FormProps {
  userDetails?: any;
  handleSubmit: (payload: any) => void;
}

const UserUpdateForm: React.FC<FormProps> = ({ userDetails, handleSubmit }) => {
  const [values, setValues] = useState<{
    name: string | null;
    email: string | null;
  }>({
    name: null,
    email: null,
  });
  const [validationErrors, setValidatonErrors] = useState<{
    name: string | null;
    email: string | null;
  }>({
    name: null,
    email: null,
  });
  useEffect(() => {
    console.log("user details user", userDetails);
    if (userDetails) {
      setValues({
        ...values,
        name: userDetails?.name,
        email: userDetails?.email,
      });
    }
  }, [userDetails]);

  useEffect(() => {
    setValidatonErrors({
      ...validationErrors,
      name: null,
      email: null,
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
      name: values.name,
      email: values.email,
    };
    handleSubmit(payload);
  };

  const validate = (key: string, value: string | null): boolean => {
    if (key === "email") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value || "")) {
        return true;
      } else {
        setValidatonErrors({
          ...validationErrors,
          [key]: "Invalid email address!",
        });
        return false;
      }
    }
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
        <PersonOutlineIcon sx={{ fontSize: "60px" }} />
      </div>

      <div className='flex flex-col gap-1 w-full'>
        <div>Enter Your Name</div>
        <input
          type={"text"}
          placeholder={"Your name"}
          onChange={(e) => {
            setValues({ ...values, name: e.target.value });
          }}
          value={values.name ? values.name : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.name && (
          <div className='text-red-400 text-xs'>{validationErrors.name}</div>
        )}
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div>Enter your email</div>
        <input
          type={"text"}
          placeholder={"Your email"}
          onChange={(e) => {
            setValidatonErrors({ ...validationErrors, email: null });
            setValues({ ...values, email: e.target.value });
          }}
          value={values.email ? values.email : ""}
          className={`px-4 py-3 bg-white rounded-lg placeholder:text-gray-400 text-black placeholder:font-light font-light outline-none text-sm`}
        />
        {validationErrors.email && (
          <div className='text-red-400 text-xs'>{validationErrors.email}</div>
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
