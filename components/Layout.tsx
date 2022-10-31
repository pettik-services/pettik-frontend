import React from "react";
import Footer from "./Footer/Footer";
import { AiOutlineVerticalAlignTop } from "react-icons/ai/index";
import { useMediaQuery } from "react-responsive";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Header from "./Header";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className='flex flex-col'>
        <Header />
        <div className='pt-[8%]'>{children}</div>
        <Footer />
        {!isTabletOrMobile && (
          <Box
            onClick={scrollToTop}
            role='presentation'
            sx={{ position: "fixed", bottom: 16, right: 16 }}>
            <Fab
              size='small'
              aria-label='scroll back to top'
              className='bg-primary-dark text-white hover:text-black'>
              <AiOutlineVerticalAlignTop size={24} />
            </Fab>
          </Box>
        )}
      </div>
    </>
  );
};

export const getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

export default Layout;
