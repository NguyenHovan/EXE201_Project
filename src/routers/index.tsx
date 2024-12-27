import {  Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { AdminDashboard, ForgotPassword, Home, Login, Register, RegisterPremium } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.HOME} element={<Home />} />
            {/* Admin */}
            <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            {/* Customer */}
            <Route path={PATH.CUSTOMER_REGISTER_PREMIUM} element={<RegisterPremium />} />
        </Routes>
    )
}

export default AppRouter
