import { API } from "../api"
import { AtWork } from "../pages/home"
import { ProPackage } from "../pages/staff/manage-packages"
import axiosInstance from "./axiosInstance"
// STAFF PACKAGE
export const createPackageService = async (data: ProPackage) => {
    try {
        const response = await axiosInstance.post(API.CREATE_PACKAGES, data)
        if (response) {
            console.log("createPackageService: ", response)
            return response
        }
    } catch (error) {
        console.log("createPackageService-error: ", error)
    }
}
export const updatePackageService = async (id: string,data: ProPackage) => {
    try {
        const response = await axiosInstance.put(`${API.UPDATE_PACKAGES}/${id}`,{
            ...data
        })
        if (response) {
            console.log("updatePackageService: ", response)
            return response
        }
    } catch (error) {
        console.log("updatePackageService-error: ", error)
    }
}
export const getPackages = async () => {
    try {
        const response:ProPackage[] = await axiosInstance.get(API.GET_PACKAGES)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getAtWorksService-error: ", error)
    }
}

export const deletePackageService = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${API.DELETE_PACKAGES}/${id}`)
        if (response) {
            console.log("deletePackageService: ", response)
            return response.data as AtWork
        }
    } catch (error) {
        console.log("deletePackageService-error: ", error)
    }
}