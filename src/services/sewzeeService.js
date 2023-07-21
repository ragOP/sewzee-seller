import API from "./common";

// auth services

// profile services
const getProfile = () => {
    return API.get(`api/seller/`);
};
const updateProfileBasic = (data) => {
    return API.put(`api/seller/update/basic`, data);
};
const updateProfileAddress = (data) => {
    return API.put(`api/seller/update/address`, data);
};
const updateProfileBank = (data) => {
    return API.put(`api/seller/update/bank`, data);
};
const updateProfileContact = (data) => {
    return API.put(`api/seller/update/contact`, data);
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
    updateProfileBasic,
    updateProfileAddress,
    updateProfileBank,
    updateProfileContact,
    getApprovedProduct,
    getProductCategory,
    getOrders,
};

export default SewzeeService;
