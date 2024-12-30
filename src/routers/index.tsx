import { Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { AdminDashboard, CustomerOrder, ForgotPassword, Home, InternalServer, Login, NotFound, PaymentMethod, Register, RegisterPremium } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.INTERNAL_SERVER_ERROR} element={<InternalServer />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.HOME} element={<Home />} />
            {/* Admin */}
            <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={PATH.CUSTOMER}>
                {/* Customer */}
                <Route path={PATH.CUSTOMER_ORDER} element={<CustomerOrder />} />
                <Route path={PATH.CUSTOMER_PAYMENT_METHOD} element={<PaymentMethod />} />
                <Route path={PATH.CUSTOMER_REGISTER_PREMIUM} element={<RegisterPremium />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
