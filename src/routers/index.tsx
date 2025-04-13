import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { PATH, roles } from "../consts"
import { AddNewService, AdminDashboard, AdminLogin, AdminManageArtworks, AdminManageCategories, AdminManageJobs, AdminManagePortfolios, AdminManageRecruiter, AdminManageServices, AdminManageUser, ApplyPage, ApplySuccess, ArtWorkDetail, CheckAiArtWorks, CustomerManageJob, CustomerManagePortfolio, CustomerOrder, CustomerProfile, ForgotPassword, HireFreelancer, Home, InternalServer, JobDetail, JobInfo, JobPage, Login, ManageArtWork, ManageFreelancerSerivces, ManageReports, NotFound, PaymentFail, PaymentMethod, PaymentSuccess, PortfolioDetail, PostJob, PostPage, Register, RegisterPremium, StaffDashboard, StaffManagePackages, ViewPost } from "../pages"
import { Dashboard } from "../components";
import HireFreelancerDetail from "../pages/hire-freelancer-detail";
import { useRedirect } from "../hooks";

const AppRouter = () => {
  
    const { canAccess } = useRedirect();
    const navigate = useNavigate()
    const goToHome  = ()=>{
        navigate('/')
        window.location.reload()
    }
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.INTERNAL_SERVER_ERROR} element={<InternalServer />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.PAYMENT_SUCCESS} element={<PaymentSuccess />}/>
            <Route path={PATH.PAYMENT_FAIL} element={<PaymentFail />}/>
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.JOB} element={<JobPage />} />
            <Route path={PATH.JOB_INFO} element={<JobInfo />} />
            <Route path={PATH.APPLY} element={<ApplyPage />} />
            <Route path={PATH.APPLY_SUCCESS} element={<ApplySuccess />} />
            <Route path={PATH.POST_JOB} element={<PostJob />} />
            <Route path={PATH.POST} element={<PostPage />} />
            <Route path={PATH.VIEW_POST} element={<ViewPost />} />
            <Route path={PATH.CUSTOMER_ATWORK_DETAIL} element={<ArtWorkDetail />} />
            <Route path={PATH.HIRE_FREELANCER} element={<HireFreelancer />} />
            <Route path={PATH.JOB_DETAIL} element={<JobDetail />} />
            <Route path={PATH.HIRE_FREELANCER_DETAIL} element={<HireFreelancerDetail />} />
            {/* Admin */}
            {/* <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} /> */}
            <Route path={PATH.CUSTOMER}  element={!canAccess([roles.CUSTOMER]) && <Navigate to={PATH.HOME} />}>
                {/* Customer */}
                <Route path={PATH.CUSTOMER_MANAGE_SERVICES} element={<ManageFreelancerSerivces />} />
                <Route path={PATH.CUSTOMER_ORDER} element={<CustomerOrder />} />
                <Route path={PATH.CUSTOMER_PAYMENT_METHOD} element={<PaymentMethod />} />
                <Route path={PATH.CUSTOMER_REGISTER_PREMIUM} element={<RegisterPremium />} />
                <Route path={PATH.CUSTOMER_ADD_NEW_SERVICE} element={<AddNewService />} />
                <Route path={PATH.CUSTOMER_EDIT_SERVICE} element={<AddNewService />} />
                <Route path={PATH.CUSTOMER_MANAGE_PORTFOLIO} element={<CustomerManagePortfolio />} />
                <Route path={PATH.CUSTOMER_PORTFOLIO_DETAIL} element={<PortfolioDetail />} />
                <Route path={PATH.CUSTOMER_MANAGE_ARTWORKS} element={<ManageArtWork />} />
                <Route path={PATH.CUSTOMER_MANAGE_JOBS} element={<CustomerManageJob />} />
                <Route path={PATH.CUSTOMER_MANAGE_PROFILE} element={<CustomerProfile />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={PATH.ADMIN}  element={canAccess([roles.ADMIN]) ? <Dashboard /> : <Navigate to={PATH.HOME} />}>
                {/* Admin */}
                <Route path={PATH.ADMIN_MANAGE_USER} element={<AdminManageUser />} />
                <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                <Route path={PATH.ADMIN_MANAGE_RECRUITER} element={<AdminManageRecruiter />} />
                <Route path={PATH.ADMIN_MANAGE_JOBS} element={<AdminManageJobs />} />
                <Route path={PATH.ADMIN_MANAGE_PORTFOLIOS} element={<AdminManagePortfolios />} />
                <Route path={PATH.ADMIN_MANAGE_ARTWORKS} element={<AdminManageArtworks />} />
                <Route path={PATH.ADMIN_MANAGE_SERVICES} element={<AdminManageServices />} />
                <Route path={PATH.ADMIN_MANAGE_CATEGORIES} element={<AdminManageCategories />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={PATH.STAFF} element={canAccess([roles.STAFF]) ? <Dashboard /> : <Navigate to={PATH.HOME} />}>
                <Route path={PATH.STAFF_DASHBOARD} element={<StaffDashboard />} />{/* Staff */}
                <Route path={PATH.STAFF_MANAGE_PACKAGES} element={<StaffManagePackages />} />
                <Route path={PATH.STAFF_CHECK_AI} element={<CheckAiArtWorks />} />
                <Route path={PATH.STAFF_MANAGE_REPORTS} element={<ManageReports />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter
