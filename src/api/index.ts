
export const API = {
    //AUTH
    LOGIN: "/api/v1/authentication/login",
    REGISTER: "/api/v1/authentication/register",
    //ADMIN
    ADMIN_GET_ALL_ACCOUNTS: "/api/v1/accounts",
    ADMIN_GET_ALL_ACCOUNT: "/api/v1/account/:id",
    ADMIN_CREATE_ACCOUNTS: "/api/v1/accounts",
    ADMIN_UPDATE_ACCOUNTS: "/api/v1/accounts",
    ADMIN_GET_ALL_RECRUITER: "/api/recruiter",
    //ATWORK
    CUSTOMER_GET_ALL_ATWORKS: "/api/v1/artworks",
    CUSTOMER_CREATE_ATWORKS: "/api/v1/artworks",
    CUSTOMER_UPDATE_ATWORKS: "/api/v1/artworks",
    CUSTOMER_GET_ATWORK: "/api/v1/artworks",
    CUSTOMER_DELETE_ATWORK: "/api/v1/artworks",
    CUSTOMER_GET_ATWORKS_BY_CREATOR: "/api/v1/artworks/images-by-creator",
    //JOB
    CUSTOMER_GET_ALL_JOBS: "/api/v1/jobs",
    CUSTOMER_CREATE_JOB: "/api/v1/jobs",
    CUSTOMER_DELETE_JOB: "/api/v1/jobs",
    CUSTOMER_GET_JOB_DETAIL: "/api/v1/jobs",
    //FREELANCER
    CREATE_NEW_SERICE: "/api/v1/freelancerservices",
    GET_SERVICES: "/api/v1/freelancerservices",
    GET_SERVICE: "/api/v1/freelancerservices",
    EDIT_SERVICES: "/api/v1/freelancerservices",
    GET_SERVICES_BY_USERID: "/api/v1/freelancerservices?UserId",
    DELETE_SERVICE: "/api/v1/freelancerservices",
    //PORTFOLIO
    GET_PORTFOLIOS: "/api/v1/portfolios",
    GET_PORTFOLIO: "/api/v1/portfolios",
    DELETE_PORTFOLIO: "/api/v1/portfolios",
    //CATEGORIES
    GET_CATEGORIES: "/api/v1/categories",
    GET_CATEGORIE: "/api/v1/categories",
    DELETE_CATEGORIES: "/api/v1/categories",
    CREATE_CATEGORY: "/api/v1/categories",
    UPDATE_CATEGORY: "/api/v1/categories",
    //PACKAGES
    GET_PACKAGES: "/api/v1/pro-packages",
    CREATE_PACKAGES: "/api/v1/pro-packages",
    UPDATE_PACKAGES: "/api/v1/pro-packages",
    DELETE_PACKAGES: "/api/v1/pro-packages",
    //PAYMENT
    CREATE_PAYMENT: "/api/payment/create",
}  