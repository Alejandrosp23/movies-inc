import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_API_KEY}`,
    }
});

export default apiClient;