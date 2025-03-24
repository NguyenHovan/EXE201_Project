import { API } from "../api"
import { Portfolio } from "../pages/customer/portfolio/manage-portfolio"
import { PortfolioData } from "../pages/customer/portfolio/portfolio-modal"
import axiosInstance from "./axiosInstance"

export const getPortfolios = async () => {
    try {
        const response: Portfolio[] = await axiosInstance.get(API.GET_PORTFOLIOS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}

export const getPortfolio = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.GET_PORTFOLIO}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as Portfolio
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}

export const deletePortfolio = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${API.DELETE_PORTFOLIO}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as Portfolio
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}

export const createPortfolio = async (values: PortfolioData) => {
    try {
        const response = await axiosInstance.post(`${API.GET_PORTFOLIO}`, {
            title: values.title,
            description: values.description,
            coverImageUrl: values.coverImageUrl,
            userId: values.userId,
            skills: values.skills,
            experience: values.experience,
            contactUrl: values.contactUrl,
            artworkImageIds: values.artworkImageIds,
        })
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}