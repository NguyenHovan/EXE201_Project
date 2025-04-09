import { API } from "../api"
import axiosInstance from "./axiosInstance"
// STAFF PACKAGE
export const staffCheckAi = async (id: string, status: number) => {
    try {
        const response = await axiosInstance.put(`${API.STAFF_CHECK_AI}/${id}/status`, {
            status
        })
        if (response) {
            console.log("staffCheckAi: ", response)
            return response
        }
    } catch (error) {
        console.log("staffCheckAi-error: ", error)
    }
}