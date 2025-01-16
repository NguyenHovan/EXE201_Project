import { User } from "../models";

export const priceUnit = (price: number) => {
    return price.toLocaleString('vi-VN')+"VND"
}


export const getUserDataFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    const userData: User = JSON.parse(user)
    return userData;
}