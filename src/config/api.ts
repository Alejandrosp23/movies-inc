import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'place your api key here';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
});

export default apiClient;