import { CiEdit } from "react-icons/ci";

const ProfileRightContactDeatils = ({ formState, reducerDispatch }) => {
    const { user, business } = formState;
    return (
        <>
            {business?.contactDetails.length > 1 ? (
                <>
                    {business?.contactDetails.slice(1).map((item) => (
                        <div className="profilePersonalInfo">
                            <div className="profilePersonalHeader">
                                <h6>Personal Information</h6>
                                <div className="profilePersonalEdit">
                                    <span>Edit</span>
                                    <CiEdit />
                                </div>
                            </div>
                            <div className="profilePersonalInfoContent">
                                <div className="profilePersonalInfoItems">
                                    <div className="profilePersonalInfoItem">
                                        <p>Name</p>
                                        <span>{item?.name}</span>
                                    </div>
                                    <div className="profilePersonalInfoItem">
                                        <p>Email</p>
                                        <span> {item?.email}</span>
                                    </div>
                                </div>
                                <div className="profilePersonalInfoItems">
                                    <div className="profilePersonalInfoItem">
                                        <p>Phone</p>
                                        <span>{item?.number}</span>
                                    </div>
                                    <div className="profilePersonalInfoItem">
                                        <p>Bio</p>
                                        <span>{item?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className="addContactDetails">
                    <span>Not found Contact Details</span>
                    <p>+ Add Contact Details</p>
                </div>
            )}
        </>
    );
};

export default ProfileRightContactDeatils;
