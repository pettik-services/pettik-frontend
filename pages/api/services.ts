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


export const getVaccinationData = (): Promise<AxiosResponse<IVaccinationResponse>> =>
    axios.get(`/services/vaccination`).then((data) => data)

export const bookVaccination = (payload: any) =>
    axios
        .post(`/book/vaccination`, payload);