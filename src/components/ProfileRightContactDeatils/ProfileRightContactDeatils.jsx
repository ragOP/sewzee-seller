import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

import API from "../../services/common";
import { CustomButton } from "../../ui/constants";
import { ADDCONTACTDETAIL, ADDCONTACTDETAILDATA } from "../../hooks/constant";
import { getProfileThunk } from "../../store/actions/profileAction/profileAction";

const ProfileRightContactDeatils = ({
    formState,
    reducerDispatch,
    editIndexs,
    isEdits,
    setIsEdits,
    setEditIndexs,
}) => {
    const dispatch = useDispatch();
    const [editIndex, setEditIndex] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { business } = formState;

    const handleAddMoreContact = () => {
        setIsEdit(true);
        setEditIndex(business?.contactDetails?.length - 1);
        reducerDispatch({ type: ADDCONTACTDETAIL, payload: {} });
    };

    const handleContactDetails = (e, index) => {
        e.preventDefault();
        reducerDispatch({
            type: ADDCONTACTDETAILDATA,
            payload: {
                name: e.target.name,
                value: e.target.value,
                index: index + 1,
            },
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                contactDetails: business?.contactDetails,
            };
            const res = await API.put("api/seller/update/contact", data);
            console.log(res);
            if (res.status === 200) {
                setIsEdit(false);
                setIsEdits(false);
                setIsLoading(false);
                setEditIndex("");
                setEditIndexs("");
                toast.success(res?.data?.message);
                dispatch(getProfileThunk());
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    console.log(business?.contactDetails);
    return (
        <>
            {business?.contactDetails.length > 1 ? (
                <>
                    {business?.contactDetails.slice(1).map((item, index) => (
                        <form
                            onSubmit={handleEdit}
                            key={item?.number}
                            className="profilePersonalInfo"
                        >
                            <div className="profilePersonalHeader">
                                <h6>Personal Information</h6>
                                {(isEdit || isEdits) &&
                                index === (editIndex || editIndexs) ? (
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
                                        onClick={() => {
                                            setIsEdit(true);
                                            setEditIndex(index);
                                        }}
                                        className="profilePersonalEdit"
                                    >
                                        <span>Edit</span>
                                        <CiEdit />
                                    </div>
                                )}
                            </div>
                            {(isEdit || isEdits) &&
                            index === (editIndex || editIndexs) ? (
                                <div className="profilePersonalInfoContent">
                                    <div className="profilePersonalInfoItems">
                                        <div className="profilePersonalInfoItem">
                                            <p>Name</p>
                                            <input
                                                onChange={(e) =>
                                                    handleContactDetails(
                                                        e,
                                                        index
                                                    )
                                                }
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter Name"
                                                required
                                                defaultValue={item?.name}
                                            />
                                        </div>
                                        <div className="profilePersonalInfoItem">
                                            <p>Email</p>
                                            <input
                                                onChange={(e) =>
                                                    handleContactDetails(
                                                        e,
                                                        index
                                                    )
                                                }
                                                type="mail"
                                                name="email"
                                                id="email"
                                                placeholder="Enter email"
                                                required
                                                defaultValue={item?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="profilePersonalInfoItems">
                                        <div className="profilePersonalInfoItem">
                                            <p>Phone</p>
                                            <input
                                                onChange={(e) =>
                                                    handleContactDetails(
                                                        e,
                                                        index
                                                    )
                                                }
                                                type="text"
                                                name="number"
                                                id="number"
                                                placeholder="Enter Phone Number"
                                                required
                                                defaultValue={item?.number}
                                            />
                                        </div>
                                        <div className="profilePersonalInfoItem">
                                            <p>Role</p>
                                            <input
                                                onChange={(e) =>
                                                    handleContactDetails(
                                                        e,
                                                        index
                                                    )
                                                }
                                                type="text"
                                                name="role"
                                                id="role"
                                                placeholder="Enter Role"
                                                required
                                                defaultValue={item?.role}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
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
                            )}
                        </form>
                    ))}
                </>
            ) : (
                <div className="addContactDetails">
                    <span>Not found Contact Details</span>
                    <p onClick={handleAddMoreContact}>+ Add Contact Details</p>
                </div>
            )}
        </>
    );
};

export default ProfileRightContactDeatils;
