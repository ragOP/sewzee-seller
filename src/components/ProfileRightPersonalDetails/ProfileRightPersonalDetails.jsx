import { CiEdit } from "react-icons/ci";

import "./ProfileRightPersonalDetails.css";

const ProfileRightPersonalDetails = ({ formState, reducerDispatch }) => {
    const { user, business } = formState;
    const userData = business?.contactDetails.find(
        (item) => item?.email === user?.email
    );
    return (
        <div className="profilePersonalWrapper">
            <div className="profilePersonal">
                <div className="profilePersonalContent">
                    <div className="profilePersonalImg">
                        <img src={business?.logo} alt="" />
                    </div>
                    <div className="profilePersonalData">
                        <h6>{user?.name}</h6>
                        <p>{userData?.role}</p>
                        <span>
                            {business?.city}, {business?.country}
                        </span>
                    </div>
                </div>
                {/* <div className="profilePersonalEdit">
                    <span>Edit</span>
                    <CiEdit />
                </div> */}
            </div>
            <div className="profilePersonalInfo">
                <div className="profilePersonalHeader">
                    <h6>Personal Information</h6>
                </div>
                <div className="profilePersonalInfoContent">
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Name</p>
                            <span>{user?.name}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Email</p>
                            <span> {user?.email}</span>
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Phone</p>
                            <span>{user?.number}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Bio</p>
                            <span>{userData?.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileRightPersonalDetails;
