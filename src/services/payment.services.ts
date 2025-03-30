import { API } from "../api"
import { ProPackage } from "../pages/staff/manage-packages"
import axiosInstance from "./axiosInstance"
interface createPaymentServiceProps{
    checkoutUrl: string
}
export const createPaymentService = async (accountId: string) => {
    try {
        const response: createPaymentServiceProps = await axiosInstance.post(API.CREATE_PAYMENT, {
            packageId: "1990184c-1f18-46f5-3a75-08dd65218b1b",
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

