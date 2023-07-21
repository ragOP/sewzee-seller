import "./Profile.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useState } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import ProdileRightTab from "../../components/ProdileRightTab/ProdileRightTab";
import { useReducer } from "react";
import EditProfileReducer from "../../hooks/editProfileData";
import { useSelector } from "react-redux";

const Profile = () => {
    const [profileSidTab, setProfileSidTab] = useState("Personal Details");
    const { profile } = useSelector((state) => state);
    const [formState, dispatch] = useReducer(
        EditProfileReducer,
        profile?.sellerData
    );

    console.log(formState);
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
                    reducerDispatch={dispatch}
                />
            </div>
        </section>
    );
};

export default Profile;
