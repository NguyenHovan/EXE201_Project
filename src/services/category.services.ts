import { API } from "../api"
import { Cate } from "../pages/customer/artwork/manage-artwork"
import axiosInstance from "./axiosInstance"

export const getCategoriesService = async () => {
    try {
        const response: Cate[] = await axiosInstance.get(API.GET_CATEGORIES)
        if (response) {
            console.log("getCategoriesService: ", response)
            return response
        }
    } catch (error) {
        console.log("getCategoriesService-error: ", error)
    }
}


export const getCategorieService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.GET_CATEGORIE}/${id}`)
        if (response) {
            console.log("getCategorieService: ", response)
            return response.data
        }
    } catch (error) {
        console.log("getCategorieService-error: ", error)
    }
}
