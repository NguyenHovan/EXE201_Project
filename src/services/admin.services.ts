import { API } from "../api"
import axiosInstance from "./axiosInstance"

export const adminGetAccountsService = async (values: filterAccount) => {
    try {
        const response = await axiosInstance.get(API.ADMIN_GET_ALL_ACCOUNTS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("adminGetAccountsService-error: ", error)
    }
}