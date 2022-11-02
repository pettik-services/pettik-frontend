import axios from 'axios';

const apiServerProxyUrl = process.env.API_SERVER || 'https://6u26pb8qe.execute-api.us-east-1.amazonaws.com';

export const getBlogs = () =>
    axios
        .get(`${apiServerProxyUrl}/blogs`)
        .then(({ data }) => data);


export default apiServerProxyUrl;