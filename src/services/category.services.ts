import { API } from "../api"
import { Category } from "../pages/admin/manage-categories"
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

export const createCategoryService = async (cate: Category) => {
    try {
        const response = await axiosInstance.post(API.CREATE_CATEGORY,{
            ...cate
        })
        if (response) {
            console.log("createCategorysService: ", response)
            return response.data as Category
        }
    } catch (error) {
        console.log("createCategorysService-error: ", error)
    }
}

export const updateCategoryService = async (cate: Category, id: string) => {
    try {
        const response = await axiosInstance.put(`${API.UPDATE_CATEGORY}/${id}`, cate)
        if (response) {
            console.log("updateCategoryService: ", response)
            return response.data as Category
        }
    } catch (error) {
        console.log("updateCategoryService-error: ", error)
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
