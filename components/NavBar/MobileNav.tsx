import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi/index";

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();

  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='fixed bg-primary-dark w-full h-14 flex py-2 items-center justify-center'>
        <Image src={Logo} alt='Logo' className='h-10 w-10' />
        <div className='absolute top-0 left-0 flex items-center px-4 h-14 z-20'>
          <GiHamburgerMenu
            size={24}
            className='text-white'
            onClick={showDefaultDrawer}
          />
        </div>
      </div>
      <Drawer
        placement='left'
        width={"100%"}
        onClose={onClose}
        open={open}
        className='w-[80%]'>
        Yet to build
      </Drawer>
    </>
  );
};

export default MobileNav;
