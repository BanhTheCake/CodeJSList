import axiosClient from "./axiosClientCreate";
import axios from "axios";
import { updateAccessToken } from "../features/user/userSlice";

const refreshAccessToken = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            axios.defaults.withCredentials = true;
            const data = await axios.post('http://localhost:3000/auth/refreshToken')
            resolve(data.data)
        } catch (error) {
            reject(error)
        }
    })
}

const setupAxiosClient = (store) => {

    axiosClient.interceptors.request.use((config) => {
        const token = store.getState().user.accessToken
        config.headers['authorization'] = `Bearer ${token}`
        return config
    })

    axiosClient.interceptors.response.use((response) => {
        if (response && response.data) {
            return response.data
        }
        return response
    }, async function(err) {
        if (!err.response) 
            throw err
        if (err.response.status === 400 && err.response.data === 'jwt expired') {
            const newAccessToken = await refreshAccessToken()
            store.dispatch(updateAccessToken(newAccessToken))
            return axiosClient(err.config)
        }
        console.log(err.response);
    })
}

export default setupAxiosClient