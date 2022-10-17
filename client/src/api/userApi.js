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
        return axiosClient.post(url, data);
    },

    get: (id) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },

    update: (id, data) => {
        const url = `/users/${id}`;
        return axiosClient.patch(url, data);
    },
}

export default userApi;