import axios from 'axios';
import localStorage from '../helper/localStorage';
import { statusCode } from '../enums/code';

const BASE_API_DOMAIN = 'http://localhost:9000/api/v1';

const axiosClient = axios.create({
    baseURL: BASE_API_DOMAIN,
    responseType: 'json',
    timeout: 15 * 1000,
});

axiosClient.interceptors.request.use(async (request) => {
    const accessToken = localStorage.getAccessToken('accessToken');
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle error
        if (error.response.status === statusCode.NOT_ALLOWED) {
            window.location.href = '/403';
        }
    }
);

export default axiosClient;
