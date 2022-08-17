import axios from 'axios'
import queryString from 'query-string';

const axiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
})

export default axiosClient