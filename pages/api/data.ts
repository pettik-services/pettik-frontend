import { AxiosResponse } from 'axios';
import axios from '../../utils/axios';

export interface BreedResponse {
    label: string;
    value: string;
}

export const getCatBreeds = (): Promise<AxiosResponse<BreedResponse[]>> =>
    axios.get(`/breeds/cat`).then((data) => {
        return (data?.data?.breeds || []).map((breed: any) => ({
            label: breed?.name,
            value: breed?.id?.toString(),
        }))
    })

export const getDogBreeds = (): Promise<AxiosResponse<BreedResponse[]>> =>
    axios.get(`/breeds/dog`).then((data) => {
        return (data?.data?.breeds || []).map((breed: any) => ({
            label: breed?.name,
            value: breed?.id?.toString(),
        }))
    })
