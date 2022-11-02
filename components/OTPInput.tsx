import React, { useState, useRef, useEffect } from "react";

interface OTPProps {
  validationMessage: string;
  otp: string[];
  setOtp: (value: string[]) => void;
}

let currentOTPIndex: number = 0;
const OTPInput: React.FC<OTPProps> = ({ validationMessage, otp, setOtp }) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOtp: string[] = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOtp);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div>
      <div className='flex flex-row gap-x-2'>
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={index === activeOTPIndex ? inputRef : null}
                type={"number"}
                className={`w-12 h-14 border rounded-xl bg-transparent outline-none text-center font-semi-bold text-xl ${
                  validationMessage && validationMessage.length > 0
                    ? "border-red-400 focus:border-red-700"
                    : "border-gray-300 focus:border-gray-700"
                } focus:text-gray-700 text-gray-400 transition hide-input`}
                onChange={handleOnChange}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                value={otp[index]}
              />
            </React.Fragment>
          );
        })}
      </div>
      {validationMessage && validationMessage.length > 0 && (
        <div className='pt-2 px-1 text-red-600 text-sm'>{validationMessage}</div>
      )}
    </div>
  );
};

export default OTPInput;
