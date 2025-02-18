import { API } from "../api"
import { AtWork } from "../pages/home"
import axiosInstance from "./axiosInstance"

export const getAtWorksService = async () => {
    try {
        const response:AtWork[] = await axiosInstance.get(API.CUSTOMER_GET_ALL_ATWORKS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getAtWorksService-error: ", error)
    }
}

export const getAtWorkService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.CUSTOMER_GET_ATWORK}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as AtWork
        }
    } catch (error) {
        console.log("getAtWorkService-error: ", error)
    }
}