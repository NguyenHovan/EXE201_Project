import { API } from "../api"
import { JobDataProps } from "../pages/customer/job/modal-create-update-job"
import { JobCardProps } from "../pages/job"
import axiosInstance from "./axiosInstance"

export const getJobsService = async () => {
    try {
        const response: JobCardProps[] = await axiosInstance.get(API.CUSTOMER_GET_ALL_JOBS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getJobsService-error: ", error)
    }
}

export const createJobService = async (data: JobDataProps) => {
    try {
        const response = await axiosInstance.post(API.CUSTOMER_CREATE_JOB,{
            ...data
        })
        if (response) {
            console.log("createJobService: ", response)
            return response
        }
    } catch (error) {
        console.log("createJobService-error: ", error)
    }
}
export const updateJobService = async (data: JobDataProps, id: string) => {
    try {
        const response = await axiosInstance.put(`${API.CUSTOMER_GET_JOB_DETAIL}/${id}`,{
            ...data
        })
        if (response) {
            console.log("updateJobService: ", response)
            return response
        }
    } catch (error) {
        console.log("updateJobService-error: ", error)
    }
}

export const deleteJobService = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${API.CUSTOMER_DELETE_JOB}/${id}`)
        if (response) {
            console.log("deleteJobService: ", response)
            return response.data
        }
    } catch (error) {
        console.log("deleteJobService-error: ", error)
    }
}

export const getJobService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.CUSTOMER_GET_JOB_DETAIL}/${id}`)
        if (response) {
            console.log("getJobService: ", response)
            return response.data
        }
    } catch (error) {
        console.log("getJobsService-error: ", error)
    }
}
