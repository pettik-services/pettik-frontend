import Image, { StaticImageData } from "next/image";
import React from "react";
import { openInNewWindow } from "../../utils/helpers";
import { IconType } from "react-icons/lib/cjs/iconBase";

type Props = {
  Icon: IconType;
  platform: string;
  downloadDesc: string;
  href: string;
};

const DownloadButton: React.FC<Props> = ({
  Icon,
  platform,
  downloadDesc,
  href,
}) => {
  return (
    <div
      className='bg-black rounded-xl md:rounded-2xl px-4 md:px-6 py-1 md:py-2 flex gap-x-2 md:gap-x-4 items-center justify-center hover:cursor-pointer'
      onClick={() => openInNewWindow(href)}>
      <div className='flex w-[20%]'>
        <Icon size={32} color='#ffffff'/>
      </div>
      <div className='flex flex-col w-[80%] justify-center items-center -gap-y-4'>
        <div className='text-xs text-white font-light'>{downloadDesc}</div>
        <div className='textsm md:text-lg text-white font-bold'>{platform}</div>
      </div>
    </div>
  );
};

export default DownloadButton;
