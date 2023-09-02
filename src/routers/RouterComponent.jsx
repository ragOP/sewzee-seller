import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";

// routers
import ProtectedRouter from "./ProtectedRouter/ProtectedRouter";
import UnProtectedRouter from "./UnProtectedRouter/UnProtectedRouter";

// screens
import Login from "../screens/Login/Login";
import SignUp from "../screens/SignUp/SignUp";
import Onboarding from "../screens/Onboarding/Onboarding";

// dashboard screens
const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));

// products screens
const Products = lazy(() => import("../screens/Products/Products"));
const AddProduct = lazy(() => import("../screens/AddProduct/AddProduct"));
const EditProduct = lazy(() => import("../screens/EditProduct/EditProduct"));

// Orders screens
const Orders = lazy(() => import("../screens/Orders/Orders"));
const SingleOrder = lazy(() => import("../screens/Orders/SingleOrder"));

// profile
const Profile = lazy(() => import("../screens/Profile/Profile"));

const RouterComponent = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRouter />}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                    <Route
                        path="/products/add"
                        element={<AddProduct />}
                    ></Route>
                    <Route
                        path="/products/edit/:productId"
                        element={<EditProduct />}
                    ></Route>
                    <Route path="/orders" element={<Orders />}></Route>
                    <Route
                        path="/orders/:orderId"
                        element={<SingleOrder />}
                    ></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Route>
                <Route element={<UnProtectedRouter />}>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/onboarding" element={<Onboarding />}></Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default RouterComponent;
