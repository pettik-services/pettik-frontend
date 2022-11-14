import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
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
import GenerateOtpDialog from "./Auth/GenerateOtpDialog";
import SubmitOtpDialog from "./Auth/SubmitOtpDialog";
import { useMutation } from "@tanstack/react-query";
import { generateOTP, verifyOTP } from "../pages/api/auth";
import { AxiosError } from "axios";
import { showInfoToast, showSuccessToast } from "../utils/toaster";
import { removeAuthorization, setAuthorization } from "../utils/axios";
import { useRouter } from "next/router";

const Header = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [openGenerateOTPDialog, setGenerateOTP] = useState(false);
  const [openSubmitOTPDialog, setSubmitOTP] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const router = useRouter();

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const [validationMessage, setMessage] = useState<{
    phoneNumber?: string;
    otp?: string;
  }>({});
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const generateOTPMutation = useMutation({
    mutationFn: generateOTP,
    onSuccess: () => showSuccessToast("OTP sent successfully"),
  });

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      const { token, message } = data.data;
      localStorage.setItem("auth-token-pettik", token || "");
      localStorage.setItem("is-authenticated", "true");
      setAuthenticated(true);
      showSuccessToast(message);
      handleCloseSubmitOTP();
      setAuthorization();
    },
    onError: (data: AxiosError) => {
      const response = data.response?.data as any;
      setMessage({ ...validationMessage, otp: response?.message });
    },
  });

  const handleOpenGenerateOTP = () => {
    setGenerateOTP(true);
  };
  const handleCloseGenerateOTP = () => setGenerateOTP(false);

  const handleOpenSubmitOTP = () => {
    setSubmitOTP(true);
  };
  const handleCloseSubmitOTP = () => setSubmitOTP(false);

  const handleSubmitGenerateOTP = () => {
    if (phoneNumber.length === 0) {
      setMessage({
        ...validationMessage,
        phoneNumber: "Phone number should not be empty",
      });
      return;
    } else if (phoneNumber.length !== 10) {
      setMessage({
        ...validationMessage,
        phoneNumber: "Enter valid phone number",
      });
      return;
    }

    setMessage({ ...validationMessage, phoneNumber: "" });
    handleCloseGenerateOTP();
    generateOTPMutation.mutate(phoneNumber);
    handleOpenSubmitOTP();
  };

  const handleSubmitVerifyOTP = () => {
    setMessage({ ...validationMessage, otp: "" });
    verifyOTPMutation.mutate({ phone: phoneNumber, otp: otp.join("") });
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth-token-pettik");
    localStorage.removeItem("is-authenticated");
    setAuthenticated(false);
    removeAuthorization();
    showInfoToast("Logged out successfully!");
    router.push("/");
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("is-authenticated" || "") === "true";
    setAuthenticated(isAuth);
  }, []);

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
                  isAuthenticated={isAuthenticated}
                  handleOpenGenerateOTP={handleOpenGenerateOTP}
                  handleSignOut={handleSignOut}
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
            <div className='flex flex-row w-[70%] justify-center gap-x-12'>
              {NavData.map((data, key) => (
                <NavItem key={key} path={data.path} title={data.title} />
              ))}
            </div>
            <div className='w-[30%] py-4 flex justify-end mr-8 gap-2'>
              {isAuthenticated && (
                <div>
                  <Button
                    variant='contained'
                    href='/dashboard'
                    endIcon={<EastIcon />}
                    className='rounded-lg py-2 px-8 bg-grey shadow-none text-blue-dark  font-bold text-sm hover:text-white hover:bg-primary-dark'>
                    Dashboard
                  </Button>
                </div>
              )}
              <div>
                <Button
                  variant='contained'
                  endIcon={<EastIcon />}
                  onClick={
                    isAuthenticated ? handleSignOut : handleOpenGenerateOTP
                  }
                  className='rounded-lg py-2 px-8 bg-grey shadow-none text-blue-dark  font-bold text-sm hover:text-white hover:bg-primary-dark'>
                  {isAuthenticated ? "SIGN OUT" : "SIGN IN"}
                </Button>
              </div>
            </div>
          </Box>
          <GenerateOtpDialog
            handleClose={handleCloseGenerateOTP}
            open={openGenerateOTPDialog}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmitGenerateOTP}
            validationMessage={validationMessage?.phoneNumber}
          />
          <SubmitOtpDialog
            handleClose={handleCloseSubmitOTP}
            open={openSubmitOTPDialog}
            phoneNumber={phoneNumber}
            handleSubmit={handleSubmitVerifyOTP}
            validationMessage={validationMessage?.otp}
            otp={otp}
            setOtp={setOtp}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

type DrawerProps = {
  isAuthenticated: boolean;
  handleOpenGenerateOTP?: () => void;
  handleSignOut: () => void;
};

const DrawerContent: React.FC<DrawerProps> = ({
  isAuthenticated,
  handleOpenGenerateOTP,
  handleSignOut,
}) => {
  return (
    <div className='w-full h-[100vh] flex flex-col'>
      <div className={`${"h-full pt-8"} `}>
        <List>
          {NavData.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={item.path}>
                <ListItemText className='text-center' primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem className='flex flex-col items-center justify-center pt-8 gap-4 px-8'>
            {isAuthenticated && (
              <Button
                variant='contained'
                endIcon={<EastIcon />}
                href='/dashboard'
                className='rounded-lg py-2 w-full px-8 bg-grey shadow-none text-blue-dark  font-bold text-sm hover:text-white hover:bg-primary-dark'>
                Dashboard
              </Button>
            )}
            <Button
              variant='contained'
              endIcon={<EastIcon />}
              onClick={isAuthenticated ? handleSignOut : handleOpenGenerateOTP}
              className='rounded-lg w-full py-2 px-8 bg-grey shadow-none text-blue-dark  font-bold text-sm hover:text-white hover:bg-primary-dark'>
              {isAuthenticated ? "SIGN OUT" : "SIGN IN"}
            </Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
};
