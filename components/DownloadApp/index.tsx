import React from "react";
import DownloadButton from "./DownloadButton";
import { FaGooglePlay } from "react-icons/fa/index";
import { BsApple } from "react-icons/bs/index";

const DownloadApp = () => {
  return (
    <div className='flex flex-col w-full items-center py-8 text-black gap-y-8'>
      <div className='font-bold text-3xl'>Download Our App!</div>
      <div className='flex gap-x-2 md:gap-x-8'>
        <DownloadButton
          Icon={FaGooglePlay}
          downloadDesc='Download From'
          platform='Google Play'
          href='https://play.google.com/store/apps'
        />
        <DownloadButton
          Icon={BsApple}
          downloadDesc='Download From'
          platform='Apple Store'
          href='https://apps.apple.com/om/app/pettik/id1602909468'
        />
      </div>
    </div>
  );
};

export default DownloadApp;
