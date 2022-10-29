import { BackTop } from "antd";
import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header";
import { AiOutlineVerticalAlignTop } from "react-icons/ai/index";
import { useMediaQuery } from "react-responsive";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <div className='flex flex-col'>
        <Header />
        <div className='pt-[8%]'>{children}</div>
        <Footer />
        {!isTabletOrMobile && (
          <BackTop>
            <div className='bg-primary-dark w-12 h-12 flex items-center justify-center rounded-full text-white'>
              <AiOutlineVerticalAlignTop size={24} />
            </div>
          </BackTop>
        )}
      </div>
    </>
  );
};

export const getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

export default Layout;
