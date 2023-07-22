import "./ProdileRightTab.css";
import ProfileRightPersonalDetails from "../ProfileRightPersonalDetails/ProfileRightPersonalDetails";
import ProfileRightBankDetails from "../ProfileRightBankDetails/ProfileRightBankDetails";
import ProfileRightBusinessDetails from "../ProfileRightBusinessDetails/ProfileRightBusinessDetails";
import ProfileRightAddress from "../ProfileRightBankAddress/ProfileRightBankAddress";
import ProfileRightContactDeatils from "../ProfileRightContactDeatils/ProfileRightContactDeatils";

const ProdileRightTab = ({ profileSidTab, formState, reducerDispatch }) => {
    return (
        <div className="prodileRightTabWrapper">
            <h6 className="prodileRightTabTitle">
                {profileSidTab === "Business Details"
                    ? formState?.user?.isbrand === 1
                        ? "Brand Details"
                        : "Boutique Details"
                    : profileSidTab}
            </h6>
            {profileSidTab === "Personal Details" && (
                <ProfileRightPersonalDetails
                    formState={formState}
                    reducerDispatch={reducerDispatch}
                />
            )}
            {profileSidTab === "Address" && (
                <ProfileRightAddress
                    formState={formState}
                    reducerDispatch={reducerDispatch}
                />
            )}
            {profileSidTab === "Contact Details" && (
                <ProfileRightContactDeatils
                    formState={formState}
                    reducerDispatch={reducerDispatch}
                />
            )}
            {profileSidTab === "Bank Details" && (
                <ProfileRightBankDetails
                    formState={formState}
                    reducerDispatch={reducerDispatch}
                />
            )}
            {profileSidTab === "Business Details" && (
                <ProfileRightBusinessDetails
                    formState={formState}
                    reducerDispatch={reducerDispatch}
                />
            )}
        </div>
    );
};

export default ProdileRightTab;
