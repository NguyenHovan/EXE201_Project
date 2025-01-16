import { API } from "../api"
import axiosInstance from "./axiosInstance"

export const loginService = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post(API.LOGIN, {
            email, password
        })
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("loginService-error: ", error)
    }
}