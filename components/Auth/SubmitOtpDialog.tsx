import React, { useState, useEffect } from "react";
import ResponsiveDialog from "../CustomDialog/ResponsiveDialog";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import OTPInput from "../OTPInput";

interface Props {
  handleClose: () => void;
  open: boolean;
  phoneNumber: string;
  handleSubmit: () => void;
  validationMessage?: string;
  otp: string[];
  setOtp: (value: string[]) => void;
}

const SubmitOtpDialog: React.FC<Props> = ({
  handleClose,
  phoneNumber,
  open,
  handleSubmit,
  validationMessage,
  otp,
  setOtp,
}) => {
  return (
    <ResponsiveDialog handleClose={handleClose} open={open} className='p-0'>
      <div className='flex flex-col h-full w-full gap-y-8 md:w-[50vh] relative p-12 items-center'>
        <CloseIcon
          className='absolute top-2 right-2 hover:cursor-pointer'
          onClick={handleClose}
        />
        <div className='text-2xl font-semi-bold'>Enter OTP</div>

        <OTPInput
          otp={otp}
          setOtp={setOtp}
          validationMessage={validationMessage || ""}
        />
        <div className='text-center text-sm'>
          <div>A verification code has been sent via SMS to</div>
          <div className='text-lg text-black'>+91 {phoneNumber}</div>
        </div>

        <Button
          onClick={handleSubmit}
          variant='contained'
          className='rounded-full w-full py-2 bg-primary-dark text-white shadow-none  font-bold text-sm hover:bg-yellow'>
          CONTINUE
        </Button>
        <div>
          <span className='font-light text-sm text-center'>
            Did not receive OTP?{" "}
            <span className='text-center hover:cursor-pointer font-semi-bold text-blue-dark'>
              Resend the OTP
            </span>
          </span>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default SubmitOtpDialog;
