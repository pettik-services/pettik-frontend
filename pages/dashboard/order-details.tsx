import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import {
  a11yProps,
  StyledTab,
  StyledTabs,
  TabPanel,
} from "../../components/Tabs/Tabs";
import Button from "@mui/material/Button";
import UpcomingOrdersImg from "../../assets/images/upcoming-orders.png";
import Image from "next/image";
import withAuth, { AuthProps } from "../../components/Auth/AuthHOC";
import { getOrderDetails } from "../api/orders";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Chip from "@mui/material/Chip";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const OrderDetails: React.FC<AuthProps> = ({ isAuthenticated }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    data: orderDetails,
    isSuccess,
    isLoading,
  } = useQuery(["order-details"], getOrderDetails, {
    enabled: isAuthenticated,
  });

  const handleCancelOrderClick = (order: any) => {
    // call cancel order mutation here
    console.log("cancel order clicked");
  };
  const handleDownloadInvoiceClick = (order: any) => {
    // call download invoice query here
    console.log("download invoice clicked");
  };

  if (isLoading) return <Loader />;

  if (isSuccess) {
    //Upcoming Orders
    const upcomingGroomingOrders =
      orderDetails?.data?.bookings?.grooming_details?.filter(
        (order) => order?.status?.toLowerCase() === "upcoming"
      ) || [];
    const upcomingVaccinationOrder =
      orderDetails?.data?.bookings?.vaccination_details?.filter(
        (order) => order?.status?.toLowerCase() === "upcoming"
      ) || [];
    const upcomingOrders = [
      ...upcomingGroomingOrders,
      ...upcomingVaccinationOrder,
    ];

    //Cancelled orders
    const cancelledGroomingOrders =
      orderDetails?.data?.bookings?.grooming_details?.filter(
        (order) => order?.status?.toLowerCase() === "cancelled"
      ) || [];
    const cancelledVaccinationOrder =
      orderDetails?.data?.bookings?.vaccination_details?.filter(
        (order) => order?.status?.toLowerCase() === "cancelled"
      ) || [];
    const cancelledOrders = [
      ...cancelledGroomingOrders,
      ...cancelledVaccinationOrder,
    ];

    //Completed orders
    const completedGroomingOrders =
      orderDetails?.data?.bookings?.grooming_details?.filter(
        (order) => order?.status?.toLowerCase() === "completed"
      ) || [];
    const completedVaccinationOrder =
      orderDetails?.data?.bookings?.vaccination_details?.filter(
        (order) => order?.status?.toLowerCase() === "completed"
      ) || [];
    const completedOrders = [
      ...completedGroomingOrders,
      ...completedVaccinationOrder,
    ];

    return (
      <div className='px-6 md:px-12 py-6 md:py-0 min-h-screen'>
        <div className='text-center md:text-start font-semi-bold pb-4'>
          See your order details
        </div>
        <div className='flex flex-row w-full justify-center md:justify-start'>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label='styled tabs'>
            <StyledTab label='Upcoming' {...a11yProps(0)} />
            <StyledTab label='Completed' {...a11yProps(1)} />
            <StyledTab label='Cancelled' {...a11yProps(2)} />
          </StyledTabs>
        </div>
        <div className='py-6 md:py-4'>
          <TabPanel value={value} index={0}>
            <div className='flex flex-col gap-y-8'>
              {upcomingOrders?.length === 0 ? (
                <NoData />
              ) : (
                upcomingOrders.map((order, idx) => (
                  <OrderItem
                    key={idx}
                    orderDetails={order}
                    handleDownloadInvoiceClick={handleDownloadInvoiceClick}
                    handleCancelOrderClick={handleCancelOrderClick}
                  />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className='flex flex-col gap-y-8'>
              {completedOrders?.length === 0 ? (
                <NoData />
              ) : (
                completedOrders.map((order, idx) => (
                  <OrderItem
                    key={idx}
                    orderDetails={order}
                    handleDownloadInvoiceClick={handleDownloadInvoiceClick}
                    handleCancelOrderClick={handleCancelOrderClick}
                    isCompletedTab
                  />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className='flex flex-col gap-y-8'>
              {cancelledOrders?.length === 0 ? (
                <NoData />
              ) : (
                cancelledOrders.map((order, idx) => (
                  <OrderItem
                    key={idx}
                    orderDetails={order}
                    handleDownloadInvoiceClick={handleDownloadInvoiceClick}
                    handleCancelOrderClick={handleCancelOrderClick}
                    isCancelledTab
                  />
                ))
              )}
            </div>
          </TabPanel>
        </div>
      </div>
    );
  }
  return null;
};

export default withAuth(OrderDetails);

interface OrderItemProps {
  orderDetails: any;
  handleDownloadInvoiceClick: (order: any) => void;
  handleCancelOrderClick: (order: any) => void;
  isCancelledTab?: boolean;
  isCompletedTab?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderDetails,
  handleDownloadInvoiceClick,
  handleCancelOrderClick,
  isCancelledTab = false,
  isCompletedTab = false,
}) => {
  return (
    <div className='bg-grey-darker rounded-xl p-4 flex md:flex-row flex-col items-center justify-between gap-y-4'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-x-6'>
        <Image src={UpcomingOrdersImg} alt='order img' className='h-20 w-20' />
        <div className='flex flex-col text-center md:text-start font-semi-bold text-lg justify-center'>
          <div>
            {orderDetails?.vaccine
              ? typeof orderDetails.vaccine === "string"
                ? orderDetails.vaccine
                : orderDetails.vaccine?.join(" + ")
              : orderDetails?.service}
          </div>
          <div>{orderDetails?.pet_name}</div>
          <div className='flex gap-x-3 pt-2 justify-center md:justify-start'>
            <Chip
              icon={<CalendarMonthIcon />}
              label={orderDetails?.user_selected_date}
            />
            <Chip
              icon={<ScheduleIcon />}
              label={orderDetails?.user_selected_time}
            />
          </div>
        </div>
      </div>
      {!isCancelledTab && (
        <div className='flex flex-col gap-y-3'>
          <Button
            variant='contained'
            startIcon={<DownloadingOutlinedIcon />}
            onClick={() => handleDownloadInvoiceClick(orderDetails)}
            className='rounded-xl py-2 px-8 bg-green-200 text-black shadow-none  font-semi-bold text-sm'>
            DOWNLOAD INVOICE
          </Button>
          {!isCompletedTab && (
            <Button
              variant='contained'
              startIcon={<HighlightOffOutlinedIcon />}
              onClick={() => handleCancelOrderClick(orderDetails)}
              className='rounded-xl py-2 px-8 bg-red-200 text-black shadow-none font-semi-bold text-sm'>
              CANCEL ORDER
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const NoData = () => {
  return (
    <div className='bg-grey-darker rounded-xl flex items-center justify-center py-12 text-xl md:text-3xl text-gray-500 font-nunito-black'>
      No Data !
    </div>
  );
};
