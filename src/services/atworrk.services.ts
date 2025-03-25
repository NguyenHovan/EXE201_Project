import { API } from "../api"
import { ArtworkData } from "../pages/customer/artwork/modal-create-update-artwork"
import { AtWork } from "../pages/home"
import axiosInstance from "./axiosInstance"

export const createArtworkService = async (data: ArtworkData) => {
    try {
        const response = await axiosInstance.post(API.CUSTOMER_CREATE_ATWORKS,{
            ...data
        })
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getAtWorksService-error: ", error)
    }
}
export const updateArtworkService = async (id: string,data: ArtworkData) => {
    try {
        const response = await axiosInstance.put(`${API.CUSTOMER_CREATE_ATWORKS}/${id}`,{
            ...data
        })
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getAtWorksService-error: ", error)
    }
}
export const getAtWorksService = async () => {
    try {
        const response:AtWork[] = await axiosInstance.get(API.CUSTOMER_GET_ALL_ATWORKS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getAtWorksService-error: ", error)
    }
}

export const getAtWorkService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.CUSTOMER_GET_ATWORK}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as AtWork
        }
    } catch (error) {
        console.log("getAtWorkService-error: ", error)
    }
}

export const getAtWorksByCreator = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.CUSTOMER_GET_ATWORKS_BY_CREATOR}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data 
        }
    } catch (error) {
        console.log("getAtWorkService-error: ", error)
    }
}


export const deleteArtworkService = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${API.CUSTOMER_DELETE_ATWORK}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as AtWork
        }
    } catch (error) {
        console.log("getAtWorkService-error: ", error)
    }
}