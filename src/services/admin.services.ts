import { API } from "../api"
import { AccountCreateProps } from "../components/modal-create-update-account"
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

export const adminCreateAccount = async (value: AccountCreateProps) => {
    try {
        const response:Account = await axiosInstance.post(`${API.ADMIN_CREATE_ACCOUNTS}`, {
            ...value
        })
        if (response) {
            console.log("response: ", response)
            return response 
        }
    } catch (error) {
        console.log("adminCreateAccount-error: ", error)
    }
}

export const adminUpdateAccount = async (value: AccountCreateProps, id: string) => {
    console.log("values: ", value)
    try {
        const response:Account = await axiosInstance.put(`${API.ADMIN_UPDATE_ACCOUNTS}/${id}`, {...value}
            
        )
        if (response) {
            console.log("response: ", response)
            return response 
        }
    } catch (error) {
        console.log("adminUpdateAccount-error: ", error)
    }
}

export const adminGetRecruiters = async () => {
    try {
        const response:Recruiter[] = await axiosInstance.get(API.ADMIN_GET_ALL_RECRUITER)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("adminGetRecruiters-error: ", error)
    }
}
