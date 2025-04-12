import { API } from "../api"
import axiosInstance from "./axiosInstance"
interface createPaymentServiceProps{
    checkoutUrl: string
}
export const createPaymentService = async (accountId: string) => {
    try {
        const response: createPaymentServiceProps = await axiosInstance.post(API.CREATE_PAYMENT, {
            packageId: "5500e9cf-13c1-48cf-117a-08dd79456e0e",
            accountId: accountId
        })
        if (response) {
            console.log("createPackageService: ", response)
            return response 
        } 
    } catch (error) {
        console.log("createPackageService-error: ", error)
    }
}

