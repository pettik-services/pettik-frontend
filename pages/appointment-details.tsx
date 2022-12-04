import React, { useState, useEffect } from "react";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"
import Loader from "../components/Loader";
import {
    a11yProps,
    StyledTab,
    StyledTabs,
    TabPanel,
} from "../components/Tabs/Tabs";
import axios from 'axios';

interface DetailsInterface {
    booking_date: string,
    pet_name: string,
    service: string,
    orderID: string,
    status: string,
}


let item;
if (typeof window !== 'undefined') {
    // Perform localStorage action
    item = localStorage.getItem('auth-token-pettik')
}


// API config
var config = {
    method: 'get',
    url: 'https://6u26pb8q2e.execute-api.us-east-1.amazonaws.com/orderDetails',
    headers: {
        'Authorization': item,
    }

};

const Appointment = () => {
    const [value, setValue] = useState(0);
    const [completed, setCompleted] = useState<DetailsInterface[]>([]);
    const [upcoming, setUpcoming] = useState<DetailsInterface[]>([]);
    const [cancelled, setCancelled] = useState<DetailsInterface[]>([]);
    const [Reload, setReload] = useState(true);
    const [isDisabled, setDisabled] = useState(false);

    useEffect(() => {
        axios(config)
            .then(function (response) {
                let res = response.data.bookings.grooming_details;
                let arr1 = [];
                let arr2 = [];
                let arr3 = [];
                for (const data of res) {
                    switch (data.status) {
                        case "Completed":
                            arr1.push(data);
                            setReload(false);
                            break;
                        case "Upcoming":
                            arr2.push(data);
                            setReload(false);
                            break;
                        case "Cancelled":
                            arr3.push(data);
                            setReload(false);
                            break;
                    }
                }
                setCompleted([...arr1]);
                setUpcoming([...arr2]);
                setCancelled([...arr3]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

    };
    if (Reload) return <Loader />
    else {
        return (
            <>
                <div className='px-6 md:px-12 py-6 md:py-0 min-h-screen'>
                    <div className='text-center md:text-start font-semi-bold pb-4'>
                        See you appointment details
                    </div>
                    <div className='flex flex-row w-full justify-center md:justify-start'>
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label='styled tabs'>
                            <StyledTab label='Upcoming'   {...a11yProps(0)} />
                            <StyledTab label='Completed'  {...a11yProps(1)} />
                            <StyledTab label='Cancelled'  {...a11yProps(2)} />
                        </StyledTabs>
                    </div>
                    <div className='py-6 md:py-4'>
                        <TabPanel value={value} index={0}>
                            {
                                upcoming.map((data) => {
                                    return (<UpcomingSection
                                        pet_name1={data?.pet_name}
                                        booking_date1={data?.booking_date}
                                        service1={data?.service}
                                        key1={data?.orderID}
                                    />);
                                })
                            }
                        </TabPanel>
                        <TabPanel  value={value} index={1}>
                            {
                                completed.map((data) => {
                                    return (<CompletedSection
                                        pet_name2={data?.pet_name}
                                        booking_date2={data?.booking_date}
                                        service2={data?.service}
                                        key2={data?.orderID}
                                    />);
                                })
                            }
                            
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {
                                cancelled.map((data) => {
                                    return (<CancelledSection
                                        pet_name3={data.pet_name}
                                        booking_date3={data.booking_date}
                                        service3={data?.service}
                                        key3={data?.orderID}
                                    />)
                                })
                            }
                        </TabPanel>
                    </div>
                </div>
            </>
        );
    }

}

export default Appointment;

// Upcoming Component
const UpcomingSection = ({ key1, pet_name1, booking_date1, service1 }: any) => {
    return (
        <div className='p-6 mb-4 bg-grey-darker rounded-2xl flex flex-col md:flex-row gap-x-8  gap-y-8 items-center relative justify-between'>
            <div className="flex gap-12">
                <div className='hover:cursor-pointer gap-12'>
                    <Avatar
                        alt='pet image'
                        src="https://cdn.dribbble.com/users/673318/screenshots/13978786/animal-avatars-icons-illustrations-characters-users_copy_23_4x.png"
                        sx={{ width: 75, height: 75 }}
                    />
                </div>
                <div key={key1} className='flex flex-col uppercase text-sm font-semi-bold gap-y-3'>
                    <h2>{service1}</h2>
                    <label>{booking_date1}</label>
                    <h3>{pet_name1}</h3>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div>
                    <Button className="rounded-xl" variant="outlined" color='success' startIcon={<DownloadForOfflineOutlinedIcon />}>
                        Download invoice
                    </Button>
                </div>
                <div>
                    <Button className="rounded-xl" variant="outlined" color='error' startIcon={<CancelOutlinedIcon />}>
                        Cancle Order
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Completed Component
const CompletedSection = ({ key2, pet_name2, booking_date2, service2 }: any) => {
    return (
        <div className='p-6 mb-4 bg-grey-darker rounded-2xl flex flex-col md:flex-row gap-x-8  gap-y-8 items-center relative justify-between'>
            <div className="flex gap-12">
                <div className='hover:cursor-pointer gap-12'>
                    <Avatar
                        alt='pet image'
                        src="https://cdn.dribbble.com/users/673318/screenshots/13978786/animal-avatars-icons-illustrations-characters-users_copy_23_4x.png"
                        sx={{ width: 75, height: 75 }}
                    />
                </div>
                <div key={key2} className='flex flex-col uppercase text-sm font-semi-bold gap-y-3'>
                    <h2>{service2}</h2>
                    <label>{booking_date2}</label>
                    <h3>{pet_name2}</h3>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div>
                    <Button className="rounded-xl" variant="outlined" color='success' startIcon={<DownloadForOfflineOutlinedIcon />}>
                        Download invoice
                    </Button>
                </div>
                <div>
                    <Button className="rounded-xl" variant="outlined" color='error' startIcon={<CancelOutlinedIcon />}>
                        Cancle Order
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Cancelled Component
const CancelledSection = ({ key3, pet_name3, booking_date3, service3 }: any) => {
    return (
        <div key={key3} className='p-6 mb-4 bg-grey-darker rounded-2xl flex flex-col md:flex-row gap-x-8  gap-y-8 items-center relative justify-between'>
            <div className="flex gap-12">
                <div className='hover:cursor-pointer gap-12'>
                    <Avatar
                        alt='pet image'
                        src="https://cdn.dribbble.com/users/673318/screenshots/13978786/animal-avatars-icons-illustrations-characters-users_copy_23_4x.png"
                        sx={{ width: 75, height: 75 }}
                    />
                </div>
                <div className='flex flex-col uppercase text-sm font-semi-bold gap-y-3'>
                    <h2>{service3}</h2>
                    <label>{booking_date3}</label>
                    <h3>{pet_name3}</h3>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="flex justify-between">
                    <Button className="rounded-xl" variant="outlined" color='success' startIcon={<DownloadForOfflineOutlinedIcon />}>
                        Download invoice
                    </Button>
                </div>
            </div>
        </div>
    );
};

