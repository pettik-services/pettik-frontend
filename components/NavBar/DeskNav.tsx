import React from "react";
import { NavData } from "./data";
import NavItem from "./NavItem";
import Notification from "./Notification";
import Logo from "../../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const DeskNav = () => {
  return (
    <div className='flex w-full fixed'>
      <div className='flex flex-col w-full'>
        <Notification
          description={{
            content: "Extra 15% off on 1st order over ₹400 with code",
            promoCode: "PETTIKFIRST",
          }}
          contact='123546'
        />
        <div className='flex flex-row  top-2 w-full content-center text-sm bg-white'>
          <div className='w-[10%] flex justify-center absolute top-2'>
            <Link href={"/"}>
              <Image src={Logo} alt='logo' className='w-24 h-24' />
            </Link>
          </div>
          <div className='flex flex-row w-[75%] justify-center gap-x-12'>
            {NavData.map((data) => (
              <NavItem path={data.path} title={data.title} />
            ))}
          </div>
          <div className='w-[25%] py-4 font-bold text-blue-dark gap-10 flex'>
            <div>
              <button className='py-2 px-8 rounded-xl bg-grey'>
                Location →
              </button>
            </div>
            <div>
              <button className='py-2 px-8 rounded-xl bg-grey'>
                Sign In →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskNav;
