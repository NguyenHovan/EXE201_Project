import { User } from "../models";

export const priceUnit = (price: number) => {
    return price.toLocaleString('vi-VN')+"VND"
}


export const getUserDataFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if(user){
        const userData: User = JSON.parse(user)
         return userData;
    }
}

export const IMG = {
    IMG_TEMP: 'https://images.ui8.net/uploads/6_1729479362712.png',
  }

  
  
  