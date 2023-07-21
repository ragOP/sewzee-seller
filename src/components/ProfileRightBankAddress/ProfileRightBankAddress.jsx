import { CiEdit } from "react-icons/ci";

const ProfileRightAddress = ({ formState, reducerDispatch }) => {
    const { user, business } = formState;
    
    return (
        <div className="profilePersonalInfo">
            <div className="profilePersonalHeader">
                <h6>Address</h6>
                <div className="profilePersonalEdit">
                    <span>Edit</span>
                    <CiEdit />
                </div>
            </div>
            <div className="profilePersonalInfoContent">
                <div className="profilePersonalInfoItems">
                    <div className="profilePersonalInfoItem">
                        <p>City</p>
                        <span>{business?.city}</span>
                    </div>
                    <div className="profilePersonalInfoItem">
                        <p>State</p>
                        <span> {business?.state}</span>
                    </div>
                </div>
                <div className="profilePersonalInfoItems">
                    <div className="profilePersonalInfoItem">
                        <p>Pin Code</p>
                        <span>{business?.pincode}</span>
                    </div>
                    <div className="profilePersonalInfoItem">
                        <p>Country</p>
                        <span>{business?.country}</span>
                    </div>
                </div>
                <div className="profilePersonalInfoItems">
                    <div className="profilePersonalInfoItem">
                        <p>Locality</p>
                        <span>{business?.localty}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileRightAddress;
