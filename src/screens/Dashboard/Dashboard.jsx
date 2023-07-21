import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// local imports
import "./Dashboard.css";
import { getProfileThunk } from "../../store/actions/profileAction/profileAction";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state);
    const { user } = profile?.sellerData;

    useEffect(() => {
        dispatch(getProfileThunk());
    }, []);



    return (
        <div className="dashboardWrapper">
            <h1>Welcome to {user?.name}</h1>
        </div>
    );
};

export default Dashboard;
