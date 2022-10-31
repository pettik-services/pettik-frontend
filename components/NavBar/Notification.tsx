import React from "react";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailIcon from "@mui/icons-material/Mail";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box className='rounded-xl absolute top-[50%] left-[50%] bg-white translate-y-[-50%] translate-x-[-50%] p-6 w-1/4'>
          <div
            className='absolute top-2 right-2 hover:cursor-pointer'
            onClick={handleClose}>
            <CloseIcon fontSize='medium' />
          </div>
          <div className='relative flex flex-col px-6 py-6 gap-8 items-center '>
            <a href="tel:997-116-1976" className='bg-primary-dark rounded-xl w-full flex flex-row p-6 text-white items-center gap-4'>
              <PhoneInTalkIcon fontSize='large' />
              <div className='flex flex-col'>
                <div>7 Days, 9 A.M to 9 P.M</div>
                <div className='text-2xl font-semi-bold'>{contact}</div>
              </div>
            </a>
            <a href="mailto:hello@pettik.com" className='bg-primary-dark rounded-xl w-full flex flex-row p-6 text-white items-center gap-4 hover:cursor-pointer'>
              <MailIcon fontSize='large' />
              <div className='flex flex-col'>
                <div className='text-2xl font-semi-bold'>hello@pettik.com</div>
              </div>
            </a>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Notification;
