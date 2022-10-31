import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

type Props = {
  getDrawerContent: () => JSX.Element;
  getDrawerButton: (toggleDrawer: (open: boolean) => any) => JSX.Element;
};

const CustomSwipeableDrawer: React.FC<Props> = ({
  getDrawerContent,
  getDrawerButton,
}) => {
  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      {getDrawerContent()}
    </Box>
  );

  return (
    <div>
      {getDrawerButton(toggleDrawer)}
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default CustomSwipeableDrawer;
