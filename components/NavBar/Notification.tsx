import React from "react";

type Props = {
  description: {
    content: string;
    promoCode: string;
  };
  contact: string;
};

const Notification: React.FC<Props> = ({ description, contact }) => {
  return (
    <div className='w-full flex gap-2 text-center text-white font-regular bg-white'>
      <div className='bg-primary-dark py-1 w-[70%]'><span>{description.content}</span> <span className="font-bold">{description.promoCode}</span></div>
      <div className='bg-primary-dark py-1 w-[30%]'>{contact}</div>
    </div>
  );
};

export default Notification;
