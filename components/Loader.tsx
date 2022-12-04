import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";
import LoaderGif from "../assets/images/loader.gif";

export default function Loader() {
  return (
    <div className='h-screen w-full'>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <Image src={LoaderGif} height={200} width={200} alt={"loader"} />
      </Backdrop>
    </div>
  );
}
