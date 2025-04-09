import { API } from "../api"
import { AtWork } from "../pages/home"
import axiosInstance from "./axiosInstance"

export const createReportService = async (Description: string, FileUrl: string, ReporterId: string, ArtworkId: string) => {
    try {
        const response = await axiosInstance.post(API.CREATE_REPORT, {
            Description: Description,
            FileUrl: FileUrl,
            ReporterId: ReporterId,
            ArtworkId: ArtworkId
        })
        if (response) {
            console.log("createReportService: ", response)
            return response
        }
    } catch (error) {
        console.log("createReportService-error: ", error)
    }
}

export const getReports = async () => {
    try {
        const response = await axiosInstance.get(API.STAFF_GET_REPORTS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getReports-error: ", error)
    }
}

export const updateStatusReportService = async (id: string, selectedStatus: number) => {
    try {
        const response = await axiosInstance.put(`${API.STAFF_CHANGE_STATUS_REPORT}/${id}/status`,{
            "status": selectedStatus
          })
        if (response) {
            console.log("updateStatusReportService: ", response)
            return response.data as AtWork
        }
    } catch (error) {
        console.log("updateStatusReportService-error: ", error)
    }
}