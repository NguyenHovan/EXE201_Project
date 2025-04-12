import { API } from "../api"
import axiosInstance from "./axiosInstance"

export const CustomerGetProfile = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.GET_PROFILE}/${id}`)
        if (response) {
            console.log("CustomerGetProfile: ", response)
            return response
        }
    } catch (error) {
        console.log("CustomerGetProfile-error: ", error)
    }
}

export const CustomerEditProfile = async (id: string, values: any) => {
    try {
        const response = await axiosInstance.put(`${API.GET_PROFILE}/${id}`,{
            ...values
        })
        if (response) {
            console.log("CustomerEditProfile: ", response)
            return response
        }
    } catch (error) {
        console.log("CustomerEditProfile-error: ", error)
    }
}
