import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import API from "../../services/common";
import { toast } from "react-hot-toast";
import { CustomButton } from "../../ui/constants";
import { CircularProgress } from "@mui/material";
import { BANKDETAILS } from "../../hooks/constant";
import { useDispatch } from "react-redux";
import { getProfileThunk } from "../../store/actions/profileAction/profileAction";

const ProfileRightBankDetails = ({ formState, reducerDispatch }) => {
    const dispatch = useDispatch();
    const { user } = formState;
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleBankDetails = (e) => {
        e.preventDefault();
        reducerDispatch({
            type: BANKDETAILS,
            payload: e.target,
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                account_holder_name: user.account_holder_name,
                account_no: user.account_no,
                bank_name: user.bank_name,
                branch_name: user.branch_name,
                ifsc_code: user.ifsc_code,
            };
            const res = await API.put("api/seller/update/bank", data);
            console.log(res);
            if (res.status === 200) {
                setIsEdit(false);
                setIsLoading(false);
                toast.success(res?.data?.message);
                dispatch(getProfileThunk());
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleEdit} className="profilePersonalInfo">
            <div className="profilePersonalHeader">
                <h6>Bank Deatls</h6>
                {isEdit ? (
                    <CustomButton classId="profileEditBtn">
                        {isLoading ? (
                            <CircularProgress
                                size={18}
                                sx={{ color: "white" }}
                            />
                        ) : (
                            "Save"
                        )}
                    </CustomButton>
                ) : (
                    <div
                        onClick={() => setIsEdit(true)}
                        className="profilePersonalEdit"
                    >
                        <span>Edit</span>
                        <CiEdit />
                    </div>
                )}
            </div>
            {isEdit ? (
                <div className="profilePersonalInfoContent">
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Account Holder Name</p>
                            <input
                                onChange={handleBankDetails}
                                type="text"
                                name="account_holder_name"
                                id="account_holder_name"
                                placeholder="Enter Account Holder Name"
                                required
                                defaultValue={user?.account_holder_name}
                            />
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Account No</p>
                            <input
                                onChange={handleBankDetails}
                                type="text"
                                name="account_no"
                                id="account_no"
                                placeholder="Enter Account No"
                                required
                                defaultValue={user?.account_no}
                            />
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Bank Name</p>
                            <input
                                onChange={handleBankDetails}
                                type="text"
                                name="bank_name"
                                id="bank_name"
                                placeholder="Enter Bank Name"
                                required
                                defaultValue={user?.bank_name}
                            />
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Branch Name</p>
                            <input
                                onChange={handleBankDetails}
                                type="text"
                                name="branch_name"
                                id="branch_name"
                                placeholder="Enter Branch Name"
                                required
                                defaultValue={user?.branch_name}
                            />
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>IFSC Code</p>
                            <input
                                onChange={handleBankDetails}
                                type="number"
                                name="ifsc_code"
                                id="ifsc_code"
                                placeholder="Enter IFSC Code"
                                required
                                defaultValue={user?.ifsc_code}
                            />
                        </div>
                    </div>
                </div>
            ) : (
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
            )}
        </form>
    );
};

export default ProfileRightBankDetails;
