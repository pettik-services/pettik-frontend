import axios, { AxiosResponse } from 'axios';
import { apiConfig } from './config';

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

const apiServerProxyUrl = apiConfig.apiServerProxyUrl;

export const generateOTP = (phone: string) =>
    axios
        .post(`${apiServerProxyUrl}/generate`, {
            phone
        });

export const verifyOTP = (data: { phone: string, otp: string }): Promise<AxiosResponse<{
    success: boolean;
    token?: string;
    message: string;
}>> =>
    axios
        .post(`${apiServerProxyUrl}/verify`, data);

export const getUserData = (token: string): Promise<AxiosResponse<IUserResponse>> =>
    axios.get(`${apiServerProxyUrl}/user/details/check`, {
        headers: {
            Authorization: token
        }
    }).then((data) => data)



export default apiServerProxyUrl;