import axios from 'axios'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000
})

axiosClient.defaults.withCredentials = true

export default axiosClient
