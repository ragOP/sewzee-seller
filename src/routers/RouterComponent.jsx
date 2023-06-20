import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

// routers
import ProtectedRouter from "./ProtectedRouter/ProtectedRouter";
import UnProtectedRouter from "./UnProtectedRouter/UnProtectedRouter";

// screens
import Login from "../screens/Login/Login";
import SignUp from "../screens/SignUp/SignUp";
import Onboarding from "../screens/Onboarding/Onboarding";
import { lazy } from "react";

const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));

const RouterComponent = () => {
    return (
        <Router>
            <Routes >
                <Route element={<ProtectedRouter />}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Route>
                <Route element={<UnProtectedRouter />}>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/onboarding" element={<Onboarding />}></Route>
                </Route>
            </Routes>
        </Router >
    )
}

export default RouterComponent