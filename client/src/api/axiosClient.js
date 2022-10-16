import axios from "axios"
import queryString from "query-string"

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    paramsSerializer: (params) => queryString.stringify(params),
})


axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config
})


axiosClient.interceptors.response.use(
    // return directly response.data
    (response) => {
        if (response && response.data) {
            return response.data
        }

        return response
    },
    (error) => {
        // Handle errors
        console.log(error)
        throw error
    }
)


export default axiosClient
