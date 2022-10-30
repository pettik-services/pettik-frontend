import Image from "next/image";
import React from "react";
import Logo from "../../assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi/index";

const MobileNav: React.FC = () => {

  return (
    <>
      <div className='fixed bg-primary-dark w-full h-14 flex py-2 items-center justify-center z-20'>
        <Image src={Logo} alt='Logo' className='h-10 w-10' />
        <div className='absolute top-0 left-0 flex items-center px-4 h-14 z-20'>
          <GiHamburgerMenu
            size={24}
            className='text-white'
            onClick={() => console.log('open drawer')}
          />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
