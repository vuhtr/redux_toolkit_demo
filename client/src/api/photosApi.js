import axiosClient from "./axiosClient"

const photosApi = {
    getUserPhotos: (params) => {
        const url = "/photos"
        return axiosClient.get(url, { params })
    },

    get: (id) => {
        const url = `/photos/${id}`
        return axiosClient.get(url)
    },

    post: (data) => {
        const url = "/photos"
        return axiosClient.post(url, data)
    },

    remove: (id) => {
        const url = `/photos/${id}`
        return axiosClient.delete(url)
    },

    update: (id, data) => {
        const url = `/photos/${id}`
        return axiosClient.put(url, data)
    }
}

export default photosApi
