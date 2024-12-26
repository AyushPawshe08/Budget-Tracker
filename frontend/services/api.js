import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/users', // Backend API URL
    withCredentials: true // To send cookies with requests
});

export const signupUser = async (data) => {
    return await api.post('/register', data); // POST request to /register (no need to repeat '/api/users')
};

export const logoutUser = () => api.get('/logout'); // GET request to /logout

export const loginUser = async (data) => {
    return await api.post('/login', data); // POST request to /login
};