import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Logo from "../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Notification from "./NavBar/Notification";
import { useMediaQuery } from "react-responsive";
import { NavData } from "./NavBar/data";
import NavItem from "./NavBar/NavItem";
import EastIcon from "@mui/icons-material/East";
import CustomSwipeableDrawer from "./NavBar/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Header = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <AppBar
      position='fixed'
      className={`${
        isTabletOrMobile ? "bg-primary-dark text-white" : "bg-white text-black"
      } shadow-none`}>
      {!isTabletOrMobile && (
        <Notification
          description={{
            content: "Extra 15% off on 1st order over ₹400 with code",
            promoCode: "PETTIKFIRST",
          }}
          contact='997-116-1976'
        />
      )}
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link href={"/"} className='hidden md:block'>
            <Image src={Logo} alt='logo' className='w-20 h-20' />
          </Link>

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            className='relative'>
            <CustomSwipeableDrawer
              getDrawerContent={() => (
                <DrawerContent
                  account={{
                    name: "Jhon Davis",
                    email: "jhon@email.com",
                    number: "1234567790",
                  }}
                  isLoggedIn={false}
                />
              )}
              getDrawerButton={(toggleDrawer) => (
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={toggleDrawer(true)}
                  color='inherit'>
                  <MenuIcon />
                </IconButton>
              )}
            />
          </Box>
          <Link
            href={"/"}
            className='items-center flex w-full justify-center md:hidden absolute top-0 left-0 -z-10'>
            <Image src={Logo} alt='logo' className='w-14 h-14 p-1' />
          </Link>
          <Box className='hidden md:flex w-full'>
            <div className='flex flex-row w-[75%] justify-center gap-x-12'>
              {NavData.map((data) => (
                <NavItem path={data.path} title={data.title} />
              ))}
            </div>
            <div className='w-[25%] py-4 flex justify-end mr-8'>
              <div>
                <Button
                  variant='contained'
                  endIcon={<EastIcon />}
                  className='rounded-lg py-2 px-8 bg-grey shadow-none text-blue-dark  font-bold text-sm hover:text-white hover:bg-primary-dark'>
                  SIGN IN
                </Button>
              </div>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 80,
      height: 80,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

type DrawerProps = {
  isLoggedIn: boolean;
  account?: {
    name: string;
    email: string;
    number: string;
  };
};

const DrawerContent: React.FC<DrawerProps> = ({ isLoggedIn, account }) => {
  return (
    <div className='w-full h-[100vh] flex flex-col'>
      {isLoggedIn && (
        <div className='h-[40%] w-full rounded-br-[50%] bg-primary-dark p-6 flex flex-col items-start'>
          <Avatar {...stringAvatar(account!.name)} />
        </div>
      )}
      <div className={`${isLoggedIn ? "h-[60%]" : "h-full pt-8"} `}>
        <List>
          {NavData.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={item.path}>
                <ListItemText className='text-center' primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem className="flex items-center justify-center pt-8">
            <Button
              variant='contained'
              endIcon={<EastIcon />}
              className='rounded-lg py-2 px-8 bg-grey shadow-none text-blue-dark  font-bold text-sm hover:text-white hover:bg-primary-dark'>
              SIGN IN
            </Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
};
