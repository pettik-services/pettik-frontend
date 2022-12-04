import axios from '../../utils/axios';

export const updateUser = (payload: any) =>
    axios
        .post(`/user/details/store`, payload);

export const deletePet = (payload: any) =>
    axios
        .post(`/delete/pet`, payload);