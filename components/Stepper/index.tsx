import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";

interface Props {
  steps: string[];
  completed: { [k: number]: boolean };
  setCompleted: (values: { [k: number]: boolean }) => void;
  getFrom: (
    activeStep: number,
    handleBack: () => void,
    handleNext: () => void
  ) => JSX.Element;
}

const CustomStepper: React.FC<Props> = ({
  steps,
  completed,
  setCompleted,
  getFrom,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setCompleted({ ...completed, [0]: true });
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className='w-full flex flex-col px-6 md:px-12 gap-y-6'>
      <div className='w-full md:w-1/2'>
        <Stepper activeStep={activeStep} connector={<div></div>}>
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={completed[index]}
              className='flex flex-col justify-center items-center gap-y-2'>
              <div
                onClick={handleStep(index)}
                className={`${
                  activeStep === index
                    ? "border-yellowNew"
                    : completed[index]
                    ? "bg-yellow-300 border-yellowNew"
                    : "border-grey-darker"
                } bg-grey-darker border-[3px] hover:cursor-pointer rounded-full h-10 w-10 md:h-16 md:w-16 flex items-center justify-center font-bold md:text-2xl text-gray-700`}>
                <div>{index + 1}</div>
              </div>
              <div className='text-xs md:text-sm text-center'>{label}</div>
            </Step>
          ))}
        </Stepper>
      </div>
      <React.Fragment>
        {getFrom(activeStep, handleBack, handleComplete)}
      </React.Fragment>
    </div>
  );
};

export default CustomStepper;
