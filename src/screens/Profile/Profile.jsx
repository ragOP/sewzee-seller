import "./Profile.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useState } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import ProdileRightTab from "../../components/ProdileRightTab/ProdileRightTab";
import { useReducer } from "react";
import EditProfileReducer from "../../hooks/editProfileData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileThunk } from "../../store/actions/profileAction/profileAction";

const Profile = () => {
    const dispatch = useDispatch();
    const [profileSidTab, setProfileSidTab] = useState("Personal Details");
    const { profile } = useSelector((state) => state);
    const [formState, reducerDispatch] = useReducer(
        EditProfileReducer,
        profile?.sellerData
    );

    useEffect(() => {
        dispatch(getProfileThunk());
    }, []);

    return (
        <section className="profileWrapper">
            <PageHeader headerTitle="Account Details" isBtn={false} />
            <div className="profileContainer">
                <ProfileSidebar
                    profileSidTab={profileSidTab}
                    setProfileSidTab={setProfileSidTab}
                    formState={formState}
                />
                <ProdileRightTab
                    profileSidTab={profileSidTab}
                    formState={formState}
                    reducerDispatch={reducerDispatch}
                />
            </div>
        </section>
    );
};

export default Profile;
