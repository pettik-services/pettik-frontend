import axios from '../../utils/axios';
import { apiConfig } from './config';
const apiServerProxyUrl = apiConfig.apiServerProxyUrl;

export const getBlogs = () =>
    axios
        .get(`/blogs`)
        .then(({ data }) => data);

export const getBlogById = (id: string) => axios
    .get(`/blogs`)
    .then(({ data }) => {
        return data?.blog_list?.filter?.((blog: any) => {
            return blog?.blogID === id
        })?.[0]
    });



export default apiServerProxyUrl;