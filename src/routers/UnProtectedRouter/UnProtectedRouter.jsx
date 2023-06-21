
import { Navigate, Outlet } from "react-router-dom";
import ToastContainer from "../../ui/ToastContainer/ToastContainer";


const UnProtectedRouter = () => {
  const isLogin = localStorage.getItem("token");
  const isComplete = localStorage.getItem("isComplete");

  return (isLogin && isComplete === "true") ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default UnProtectedRouter;