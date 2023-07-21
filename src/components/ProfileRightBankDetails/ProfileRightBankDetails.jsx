import { CiEdit } from "react-icons/ci";

const ProfileRightBankDetails = ({ formState, reducerDispatch }) => {
    const { user } = formState;
    return (
        <div className="profilePersonalInfo">
            <div className="profilePersonalHeader">
                <h6>Bank Deatls</h6>
                <div className="profilePersonalEdit">
                    <span>Edit</span>
                    <CiEdit />
                </div>
            </div>
            <div className="profilePersonalInfoContent">
                <div className="profilePersonalInfoItems">
                    <div className="profilePersonalInfoItem">
                        <p>Account Holder Name</p>
                        <span>{user?.account_holder_name}</span>
                    </div>
                    <div className="profilePersonalInfoItem">
                        <p>Account No</p>
                        <span> {user?.account_no}</span>
                    </div>
                </div>
                <div className="profilePersonalInfoItems">
                    <div className="profilePersonalInfoItem">
                        <p>Bank Name</p>
                        <span>{user?.bank_name}</span>
                    </div>
                    <div className="profilePersonalInfoItem">
                        <p>Branch Name</p>
                        <span>{user?.branch_name}</span>
                    </div>
                </div>
                <div className="profilePersonalInfoItems">
                    <div className="profilePersonalInfoItem">
                        <p>IFSC Code</p>
                        <span>{user?.ifsc_code}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileRightBankDetails;
