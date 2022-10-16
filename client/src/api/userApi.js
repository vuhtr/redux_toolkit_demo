import axiosClient from "./axiosClient";

const userApi = {
    signup: (data) => {
        const url = '/signup'
        data.role = 'user'
        data.avatar = 'https://cdn-icons-png.flaticon.com/512/147/147142.png'
        return axiosClient.post(url, data)
    },

    login: (data) => {
        const url = '/login';
        console.log(data)
        return axiosClient.post(url, data);
    }
}

export default userApi;