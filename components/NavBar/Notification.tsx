import React from "react";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailIcon from "@mui/icons-material/Mail";
import CustomDialog from "../CustomDialog";

type Props = {
  description: {
    content: string;
    promoCode: string;
  };
  contact: string;
};

const Notification: React.FC<Props> = ({ description, contact }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='w-full flex gap-2 text-center text-white font-light text-sm bg-white'>
      <div className='bg-primary-dark py-1 w-[70%]'>
        <span>{description.content}</span>{" "}
        <span className='font-semi-bold'>{description.promoCode}</span>
      </div>
      <div className='bg-primary-dark py-1 w-[30%]'>
        Customer Support:
        <span onClick={handleOpen} className='hover:cursor-pointer ml-2'>
          <HeadsetMicIcon fontSize='small' />
        </span>
      </div>
      <CustomDialog handleClose={handleClose} open={open}>
        <div className='relative flex flex-col px-6 py-6 gap-8 items-center '>
          <a
            href='tel:997-116-1976'
            className='bg-primary-dark rounded-md w-full flex flex-row p-6 text-white items-center gap-4'>
            <PhoneInTalkIcon fontSize='large' />
            <div className='flex flex-col'>
              <div>7 Days, 9 A.M to 9 P.M</div>
              <div className='text-2xl font-semi-bold'>{contact}</div>
            </div>
          </a>
          <a
            href='mailto:hello@pettik.com'
            className='bg-primary-dark rounded-md w-full flex flex-row p-6 text-white items-center gap-4 hover:cursor-pointer'>
            <MailIcon fontSize='large' />
            <div className='flex flex-col'>
              <div className='text-2xl font-semi-bold'>hello@pettik.com</div>
            </div>
          </a>
        </div>
      </CustomDialog>
    </div>
  );
};

export default Notification;
