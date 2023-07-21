import API from "./common";

// auth services

// profile services
const getProfile = () => {
    return API.get(`api/seller/`);
};

// product services
const getApprovedProduct = () => {
    return API.get(`/api/seller/product/approved`);
};
const getProductCategory = () => {
    return API.get(`api/seller/category`);
};

// order services
const getOrders = () => {
    return API.get(`/api/seller/orders`);
};

const SewzeeService = {
    getProfile,
    getApprovedProduct,
    getProductCategory,
    getOrders,
};

export default SewzeeService;
