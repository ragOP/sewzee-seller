import API from "./common";

// auth services

// product services
const getApprovedProduct = () => {
    return API.get(`/api/seller/product/approved`);
};
const getProductCategory = () => {
    return API.get(`api/seller/category`);
};

const SewzeeService = {
    getApprovedProduct,
    getProductCategory,
};

export default SewzeeService;
