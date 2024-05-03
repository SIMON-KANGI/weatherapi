import axios from 'axios';

// Create a base axios instance
export const instance = axios.create({
    baseURL: 'http://127.0.0.1:5555',
});

// Function to create Axios instance with current access token
export const createAxiosInstance = () => {
    const accessToken = localStorage.getItem('access_token');
    const id=localStorage.getItem('id');
    return axios.create({
        baseURL: 'http://127.0.0.1:5555',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'user_id':id
        }
    });
};
