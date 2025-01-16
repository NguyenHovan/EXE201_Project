
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH, roles } from "../consts";

// export const role = {
//     ADMIN: "ADMIN",
//     CLINIC_OWNER: "CLINICOWNER",
//     DOCTOR: "DOCTOR",
//     CUSTOMER: "CUSTOMER",
// }
 const useRedirect = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user")
    const parsedUser = user ? JSON.parse(user) : null;
    const userRole = parsedUser?.role;
    const location = useLocation();
    const path = location.pathname
    useEffect(() => {
        if (userRole) {
            const token = localStorage.getItem("token");
            if (isTokenExpired(token)) {
                logout(userRole);
            }
            Redirect();
        }
    }, [userRole, path]);

    const logout = (role:string) => { 
        if(role === "ADMIN"){
            window.location.href = PATH.ADMIN_LOGIN; 
        }else{
            window.location.href = PATH.LOGIN; 
        }
        localStorage.clear();
        message.error("Token expired!")
    };

    const isTokenExpired = (token: string) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Thời gian hiện tại theo Unix timestamp
            return decodedToken.exp < currentTime; // True nếu token đã hết hạn
        } catch (error) {
            console.error("Invalid token:", error);
            return true; // Nếu có lỗi khi decode token, coi như token đã hết hạn
        }
    };

    const Redirect = () => {
        switch (userRole) {
            case roles.ADMIN:
                if (!path.includes(roles.ADMIN || PATH.ADMIN_LOGIN)) {
                    navigate(PATH.ADMIN_HOME)
                }
                break;
            case roles:
                if (!path.includes(roles.STAFF || PATH.STAFF_LOGIN)) {
                    navigate(PATH.STAFF_LOGIN);
                }
                break
            case roles.CUSTOMER:
                if (!path.includes(roles.CUSTOMER || PATH.LOGIN)) {
                    navigate(PATH.HOME);
                }
                break;
                case roles.MANAGER:
                if (!path.includes(roles.MANAGER || PATH.MANAGER_LOGIN)) {
                    navigate(PATH.MANAGER_LOGIN)
                }
                break;
            default:
                navigate(PATH.HOME);
        }
    }
    const canAccess = (allowedRoles: string[]) => {
        return userRole && allowedRoles.includes(userRole);
    };

    return { canAccess };
}
export default useRedirect;