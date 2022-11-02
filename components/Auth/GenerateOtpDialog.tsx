import Image from "next/image";
import React from "react";
import ResponsiveDialog from "../CustomDialog/ResponsiveDialog";
import Pug from "../../assets/images/pug.png";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

interface Props {
  handleClose: () => void;
  open: boolean;
  setPhoneNumber: (number: string) => void;
  handleSubmit: () => void;
  validationMessage?: string;
}

const GenerateOtpDialog: React.FC<Props> = ({
  handleClose,
  setPhoneNumber,
  open,
  handleSubmit,
  validationMessage,
}) => {
  return (
    <ResponsiveDialog handleClose={handleClose} open={open} className='p-0'>
      <div className='flex flex-col h-full w-full  md:h-[60vh] md:w-[50vh]'>
        <div className='h-[45%] md:h-1/2 relative bg-primary-dark rounded-b-[100px] flex flex-col items-center px-6 md:px-0 py-10 md:p-6 text-center font-semi-bold text-white'>
          <Image
            src={Pug}
            alt={"dog"}
            className='absolute bottom-0 w-[50%] md:w-[40%]'
          />
          <CloseIcon
            className='absolute top-2 right-2 hover:cursor-pointer'
            onClick={handleClose}
          />

          <div>Woof - Woof Parents!</div>
          <div>Let&apos;s make our dog cheerful and healthy together.</div>
        </div>
        <div className='h-[65%] md:h-1/2 flex flex-col items-center justify-center gap-y-4 px-12 text-md'>
          <div>
            <div className='w-full rounded-full border border-gray-300 py-1 px-4 flex flex-row gap-x-2'>
              <div className='font-semi-bold'>+91</div>
              <Divider orientation='vertical' variant='fullWidth' />
              <input
                type={"number"}
                className='focus:border-none focus:outline-none w-full placeholder:text-sm text-black'
                placeholder='Enter your mobile number'
                onChange={(e) => setPhoneNumber(e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            {validationMessage && validationMessage?.length > 0 && (
              <div className='text-red-500 font-light text-xs pt-1 pl-2'>
                {validationMessage}
              </div>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            variant='contained'
            className='rounded-full w-full py-2 bg-primary-dark text-white shadow-none  font-bold text-sm hover:bg-yellow'>
            CONTINUE
          </Button>
          <div>
            <span className='font-light text-xs text-center'>
              By continuing, I agree to the{" "}
              <span>
                <a
                  className='text-center hover:cursor-pointer text-blue-dark'
                  href='/terms-and-conditions'>
                  Terms of use
                </a>
              </span>{" "}
              and
              <span className='text-center hover:cursor-pointer text-blue-dark'>
                {" "}
                <a href='/privacy-policy'>Privacy & Cookie Policy</a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default GenerateOtpDialog;
