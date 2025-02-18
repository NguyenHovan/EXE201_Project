import { API } from "../api"
import axiosInstance from "./axiosInstance"

export const adminGetAccountsService = async () => {
    try {
        const response:Account[] = await axiosInstance.get(API.ADMIN_GET_ALL_ACCOUNTS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("adminGetAccountsService-error: ", error)
    }
}

export const adminGetAccountService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.ADMIN_GET_ALL_ACCOUNTS}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as Account
        }
    } catch (error) {
        console.log("adminGetAccountService-error: ", error)
    }
}