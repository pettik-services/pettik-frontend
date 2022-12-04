import { AxiosResponse } from 'axios';
import axios from '../../utils/axios';

interface IVaccinationResponse {
    services: {
        name: string;
        cost: string;
        service_for: string;
        serviceID: number | string;
    }[];
    success: boolean;
}

interface IGroomingResponse {
    services: {
        service_time: string;
        service_icon: string;
        cost: string;
        discounted_cost: string;
        name: string;
        service_for: string;
        service_web_icon: string;
        serviceID: number;
        included: string[];
    }[];
    success: boolean;
}


export const getVaccinationData = (): Promise<AxiosResponse<IVaccinationResponse>> =>
    axios.get(`/services/vaccination`).then((data) => data)

export const getGroomingData = (): Promise<AxiosResponse<IGroomingResponse>> =>
    axios.get(`/services/grooming`).then((data) => data)

export const bookVaccination = (payload: any) =>
    axios
        .post(`/book/vaccination`, payload);

export const bookGrooming = (payload: any) =>
    axios
        .post(`/book/grooming`, payload);