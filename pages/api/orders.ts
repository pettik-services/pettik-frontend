import { AxiosResponse } from 'axios';
import axios from '../../utils/axios';

export type IOrderDetailsResponse = {
    bookings: {
        id: string;
        grooming_details: IGroomingDetails[];
        vaccination_details: IVaccinationDetails[];
    }
}

export type IGroomingDetails = {
    user_selected_time?: string;
    done_by?: string;
    cost?: string;
    orderID?: string;
    pet_address?: string;
    booking_date?: string;
    user_selected_date?: string;
    is_completed?: boolean;
    pet_name?: string;
    reviews?: string;
    service?: string;
    pet_unique_id?: string;
    status?: string;
}

export type IVaccinationDetails = {
    user_selected_time?: string;
    done_by?: string;
    cost?: string;
    orderID?: string;
    pet_address?: string;
    booking_date?: string;
    user_selected_date?: string;
    is_completed?: boolean;
    vaccine?: string[];
    pet_name?: string;
    reviews?: string;
    pet_unique_id?: string;
    status?: string;
}

export const getOrderDetails = (): Promise<AxiosResponse<IOrderDetailsResponse>> =>
    axios.get(`/orderDetails`).then((data) => data)