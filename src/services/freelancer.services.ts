import { API } from "../api"
import { NewService } from "../pages/customer/freelancer-service/add-new-service"
import { Service } from "../pages/customer/freelancer-service/manage-freelancer-service"
import axiosInstance from "./axiosInstance"

export const createNewSerivce = async (values: NewService) => {
    try {
        const response: NewService = await axiosInstance.post(API.CREATE_NEW_SERICE, {
            deliveryTime: values.deliveryTime, description: values.description, imageUrl: values.imageUrl,
            numConcepts: values.numConcepts, numRevisions: values.numRevisions, price: values.price,
            servicename: values.servicename, userId: values.userId
        })
        if (response) {
            console.log("createNewSerivce: ", response)
            return response
        }
    } catch (error) {
        console.log("createNewSerivce-error: ", error)
    }
}

export const getServices = async () => {
    try {
        const response: Service[] = await axiosInstance.get(API.GET_SERVICES)
        if (response) {
            console.log("getServices: ", response)
            return response
        }
    } catch (error) {
        console.log("getServices-error: ", error)
    }
}

export const getServicesByUserId = async (id: string) => {
    try {
        const response: Service[] = await axiosInstance.get(`${API.GET_SERVICES_BY_USERID}=${id}`)
        if (response) {
            console.log("getServices: ", response)
            return response
        }
    } catch (error) {
        console.log("getServices-error: ", error)
    }
}

export const editSerivce = async (values: NewService, id:string) => {
    try {
        const response: NewService = await axiosInstance.put(`${API.EDIT_SERVICES}/${id}`, {
            deliveryTime: values.deliveryTime, description: values.description, imageUrl: values.imageUrl,
            numConcepts: values.numConcepts, numRevisions: values.numRevisions, price: values.price,
            servicename: values.servicename, 
        })
        if (response) {
            console.log("createNewSerivce: ", response)
            return response
        }
    } catch (error) {
        console.log("createNewSerivce-error: ", error)
    }
}

export const getService = async (id: string) => {
    try {
        const response
         = await axiosInstance.get(`${API.GET_SERVICE}/${id}`)
        if (response) {
            console.log("getService: ", response)
            return response.data
        }
    } catch (error) {
        console.log("getService-error: ", error)
    }
}

export const deleteService = async (id: string) => {
    try {
        const response: NewService = await axiosInstance.delete(`${API.DELETE_SERVICE}/${id}`)
        if (response) {
            console.log("deleteServices: ", response)
            return response
        }
    } catch (error) {
        console.log("deleteServices-error: ", error)
    }
}
