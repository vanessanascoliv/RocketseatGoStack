import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'//mesmo baseURL do Insomnia
});

export default api;