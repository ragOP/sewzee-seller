import "./ProdileRightTab.css";
import ProfileRightPersonalDetails from "../ProfileRightPersonalDetails/ProfileRightPersonalDetails";
import ProfileRightBankDetails from "../ProfileRightBankDetails/ProfileRightBankDetails";
import ProfileRightBusinessDetails from "../ProfileRightBusinessDetails/ProfileRightBusinessDetails";
import ProfileRightAddress from "../ProfileRightBankAddress/ProfileRightBankAddress";
import ProfileRightContactDeatils from "../ProfileRightContactDeatils/ProfileRightContactDeatils";
import { ADDCONTACTDETAIL } from "../../hooks/constant";
import { useState } from "react";

const ProdileRightTab = ({ profileSidTab, formState, reducerDispatch }) => {
    const { business } = formState;
    const [editIndex, setEditIndex] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const handleAddMoreContact = () => {
        setIsEdit(true);
        setEditIndex(business?.contactDetails?.length - 1);
        reducerDispatch({ type: ADDCONTACTDETAIL, payload: {} });
    };
    return (
        <div className="prodileRightTabWrapper">
            <div className="prodileRightTabHeader">
                <h6 className="prodileRightTabTitle">
                    {profileSidTab === "Business Details"
                        ? formState?.user?.isbrand === 1
                            ? "Brand Details"
                            : "Boutique Details"
                        : profileSidTab}
                </h6>
                {profileSidTab === "Contact Details" &&
                    business?.contactDetails?.length > 1 && (
                        <div className="prodileContactDetails">
                            <p onClick={handleAddMoreContact}>
                                + Add Contact Details
                            </p>
                        </div>
                    )}
            </div>
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
                    editIndexs={editIndex}
                    isEdits={isEdit}
                    setIsEdits={setIsEdit}
                    setEditIndexs={setEditIndex}
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
