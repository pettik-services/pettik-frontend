import React from "react";
import OrderGif from "../assets/images/404cat.gif";
import profileD from "../assets/images/martina-mans-face-in-a-circle-1.gif";
import Image from "next/image";



const pathToDashboard = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-evenly pt-12 items-start min-h-[60vh]">
            <div>
                <a href="/dashboard">
                    <div className="flex gap-4 rounded-xl p-4 w-auto m-4 text-start bg-[#EEEE]">
                        <Image
                            alt={'pet image'}
                            src= {profileD}
                            height={100} width={100}
                        />
                        <div className="pt-5">
                            <h2>Personal Profile</h2>
                            <label className="hover:cursor-pointer">Click here to see your personal profile</label>
                        </div>
                    </div>
                </a>
            </div>
            <div>
                <a href="/appointment-details">
                    <div className="flex gap-4 rounded-xl p-4 w-auto m-4 text-start bg-[#EEEE]">
                        <Image
                            alt={'pet image'}
                            src= {OrderGif}
                            height={130} width={130}
                        />
                        <div className="pt-5">
                            <h2>Order Details</h2>
                            <label className="hover:cursor-pointer">Click here to see your order details</label>
                        </div>
                    </div>
                </a>
            </div>
        </div>


    );
};

export default pathToDashboard;
