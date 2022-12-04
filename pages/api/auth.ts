import { AxiosResponse } from 'axios';
import axios from '../../utils/axios';

interface IUserResponse {
    isExistingUser: boolean,
    userData: {
        is_active: boolean,
        id: string,
        user_details: {
            name: string,
            address:
            {
                city: string;
                pincode: string;
                street_address?: string;
            }[],
            userID: string;
            email: string;
        },
        pet_details:
        {
            gender: string,
            dob: string
            name: string
            weight: string
            profile_picture: string
            pet_unique_id: string
            breed: string
        }[]

    },
    is_active: boolean,
    success: boolean
}

export const generateOTP = (phone: string) =>
    axios
        .post(`/generate`, {
            phone
        });

export const verifyOTP = (data: { phone: string, otp: string }): Promise<AxiosResponse<{
    success: boolean;
    token?: string;
    message: string;
}>> =>
    axios
        .post(`/verify`, data);

export const getUserData = (): Promise<AxiosResponse<IUserResponse>> =>
    axios.get(`/user/details/check`).then((data) => data)
