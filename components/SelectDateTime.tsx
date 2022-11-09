import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "@mui/material/Button";

const timeSlots = [
  {
    id: 0,
    from: "9:30 AM",
    to: "11:30 AM",
  },
  {
    id: 1,
    from: " 12:00 PM",
    to: "2:00 PM",
  },
  {
    id: 2,
    from: "2:30 PM",
    to: "4:30 PM",
  },
  {
    id: 3,
    from: "5:00 PM",
    to: "7:00 PM",
  },
];

interface Props {
  setValues: (values: any) => void;
  values: any;
  handleNext: () => void;
}

const SelectDateTimeElement: React.FC<Props> = ({
  values,
  setValues,
  handleNext,
}) => {
  const today = dayjs();
  const [date, setDate] = React.useState<Dayjs | null>(today);
  const [time, setTime] = React.useState<{
    from: string;
    to: string;
    id: number;
  } | null>(null);

  useEffect(() => {
    if (values?.dateTime?.date) {
      setDate(dayjs(values?.dateTime?.date, "DD-MM-YYYY"));
    } else {
      const stringDate = today?.format("DD-MM-YYYY");
      const newDateTime = { ...(values?.dateTime || {}), date: stringDate };
      setValues({ ...values, dateTime: newDateTime });
    }
    if (values?.dateTime?.time) {
      setTime(values?.dateTime?.time);
    }
  }, [values]);

  const handleSubmitDate = (date: Dayjs | null) => {
    setDate(date);
    const stringDate = date?.format("DD-MM-YYYY");
    const newDateTime = { ...(values?.dateTime || {}), date: stringDate };
    setValues({ ...values, dateTime: newDateTime });
  };
  const handleSelectTime = (time: any) => {
    setTime(time);
    const newDateTime = { ...(values?.dateTime || {}), time: time };
    setValues({ ...values, dateTime: newDateTime });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='flex flex-col gap-y-6 py-8'>
        <div className='text-2xl font-bold'>Select Date and Time Slot</div>
        <div className='flex flex-col md:flex-row gap-x-28'>
          <div className='p-2 bg-white rounded-xl shadow-xl'>
            <StaticDatePicker
              displayStaticWrapperAs={"desktop"}
              openTo='day'
              value={date}
              onChange={(newDate) => {
                handleSubmitDate(newDate);
              }}
              disablePast
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='flex flex-col pt-4 gap-y-12'>
            <div className='flex items-center gap-x-2'>
              <AccessTimeIcon fontSize='small' />
              <div className='text-xl font-semi-bold text-yellowNew'>
                Select Time
              </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-center md:gap-4'>
              {timeSlots.map((slot) => (
                <div
                  onClick={() => handleSelectTime(slot)}
                  className={`px-2 py-1 rounded-full border-[2px] border-yellowNew hover:cursor-pointer ${
                    time?.id === slot.id
                      ? "bg-yellowNew text-white"
                      : "bg-white text-yellowNew"
                  }`}
                  key={slot.id}>
                  {slot.from} - {slot.to}
                </div>
              ))}
            </div>
            <Button
              variant='contained'
              onClick={() => handleNext()}
              className='rounded-full py-2 px-8 bg-yellowNew shadow-none text-white font-bold hover:text-white hover:bg-primary-dark'>
              PROCEED
            </Button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default SelectDateTimeElement;
