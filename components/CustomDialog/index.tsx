import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DailogCloseHeader from "./DialogCloseHeader";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const CustomDialog: React.FC<Props> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='dailog-close-icon'
      open={open}
      className='p-8 rounded-2xl'>
      <DailogCloseHeader id='dailog-close-icon' onClose={handleClose} />
      <DialogContent dividers={false}>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
