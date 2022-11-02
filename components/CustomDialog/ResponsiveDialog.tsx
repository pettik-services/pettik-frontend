import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DailogCloseHeader from "./DialogCloseHeader";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
}

const ResponsiveDialog: React.FC<Props> = ({
  open,
  handleClose,
  children,
  className,
  showHeader = false,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
      PaperProps={{
        sx: {
            borderRadius: fullScreen? '0px' : '16px'
        }
      }}
      disableScrollLock>
      {showHeader && (
        <DailogCloseHeader id='dailog-close-icon' onClose={handleClose} />
      )}
      <DialogContent className={`${className? className: ''}`} dividers={false}>{children}</DialogContent>
    </Dialog>
  );
};

export default ResponsiveDialog;
