import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import MainLayout from "../../components/MainLayout/MainLayout";
import ToastContainer from "../../ui/ToastContainer/ToastContainer";
import PageLoader from "../../ui/PageLoader/PageLoader";


const ProtectedRouter = () => {
    const token = localStorage.getItem("token");
    const isComplete = localStorage.getItem("isComplete");

    return (
        token ? (isComplete === "true" ?
            <MainLayout>
                <ToastContainer />
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </MainLayout> :
            <Navigate to="/onboarding" />
        ) : (
            <Navigate to="/" />
        )
    )
};

export default ProtectedRouter;