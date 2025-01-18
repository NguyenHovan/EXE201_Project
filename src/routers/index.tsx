import { Route, Routes } from "react-router-dom"
import { PATH } from "../consts"
import { AdminDashboard, AdminLogin, AdminManageUser, ApplyPage, ApplySuccess, CustomerOrder, ForgotPassword, Home, InternalServer, JobInfo, JobPage, Login, NotFound, PaymentMethod, PostJob, Register, RegisterPremium } from "../pages"
import { Dashboard } from "../components";

const AppRouter = () => {
    // const { canAccess } = useRedirect();
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.INTERNAL_SERVER_ERROR} element={<InternalServer />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.JOB} element={<JobPage />} />
            <Route path={PATH.JOB_INFO} element={<JobInfo />} />
            <Route path={PATH.APPLY} element={<ApplyPage />} />
            <Route path={PATH.APPLY_SUCCESS} element={<ApplySuccess />} />
            <Route path={PATH.POST_JOB} element={<PostJob />} />
            {/* Admin */}
            {/* <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} /> */}
            <Route path={PATH.CUSTOMER}>
                {/* Customer */}
                <Route path={PATH.CUSTOMER_ORDER} element={<CustomerOrder />} />
                <Route path={PATH.CUSTOMER_PAYMENT_METHOD} element={<PaymentMethod />} />
                <Route path={PATH.CUSTOMER_REGISTER_PREMIUM} element={<RegisterPremium />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={"/admin/login"} element={<AdminLogin />} />
            {/* <Route path={PATH.ADMIN} element={canAccess([roles.ADMIN]) ? <Dashboard /> : <Navigate to={PATH.HOME} />}> */}
            <Route path={PATH.ADMIN} element={<Dashboard />}>
                {/* Admin */}
                <Route path={PATH.ADMIN_MANAGE_USER} element={<AdminManageUser />} />
                <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                {/* <Route path={PATH.ADMIN_MANAGE_USER} element={canAccess([roles.ADMIN])  ? <AdminManageUser /> : <Navigate to={PATH.HOME} />} /> */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
