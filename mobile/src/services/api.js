import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.48:8888'
})

export default api;