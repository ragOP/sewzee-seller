import { ProfileSidebarList } from "../../constants";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ profileSidTab, setProfileSidTab, formState }) => {
    const { user } = formState;

    return (
        <div className="profileSidebarWrapper">
            <div className="profileSidebar">
                {ProfileSidebarList.map((item) => (
                    <div
                        key={item}
                        onClick={() => setProfileSidTab(item)}
                        className={`profileSidebarList ${
                            profileSidTab === item && "listActive"
                        }`}
                    >
                        <p>
                            {item === "Business Details"
                                ? user?.isbrand === 1
                                    ? "Brand Details"
                                    : "Boutique Details"
                                : item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSidebar;
