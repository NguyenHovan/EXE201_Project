import { API } from "../api"
import axiosInstance from "./axiosInstance"
interface createPaymentServiceProps{
    checkoutUrl: string
}

export const createPaymentService = async (accountId: string, packageId: string) => {
    try {
        const response: createPaymentServiceProps = await axiosInstance.post(API.CREATE_PAYMENT, {
            packageId: packageId,
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

export const PaymentReturn = async (orderCode: string, status: string,  paymentLinkId: string , code: string) => {
    try {
        const response: createPaymentServiceProps = await axiosInstance.get(
            `/api/payment/return?orderCode=${orderCode}&status=${status}&paymentLinkId=${paymentLinkId}&code=${code}`
        )
        if (response) {
            console.log("PaymentReturn: ", response)
            return response 
        } 
    } catch (error) {
        console.log("PaymentReturn-error: ", error)
    }
}


