import { API } from "../api"
import axiosInstance from "./axiosInstance"

export const CustomerGetRatings = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.GET_RATINGS}?ArtworkId=${id}`)
        if (response) {
            console.log("CustomerGetRatings: ", response)
            return response
        }
    } catch (error) {
        console.log("CustomerGetRatings-error: ", error)
    }
}

export const customerRating = async (values: any) => {
    try {
        const response = await axiosInstance.post(`${API.CREATE_RATINGS}`,{
            ...values
        })
        if (response) {
            console.log("customerRating: ", response)
            return response
        }
    } catch (error) {
        console.log("customerRating-error: ", error)
    }
}

export const customerReply = async (values: any) => {
    try {
        const response = await axiosInstance.post(`${API.REP_RATINGS}`,{
            ...values
        })
        if (response) {
            console.log("customerReply: ", response)
            return response
        }
    } catch (error) {
        console.log("customerReply-error: ", error)
    }
}

export const customerDeleteComment = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${API.DELETE_RATINGS}/${id}`)
        if (response) {
            console.log("customerDeleteComment: ", response)
            return response
        }
    } catch (error) {
        console.log("customerDeleteComment-error: ", error)
    }
}