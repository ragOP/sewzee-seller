import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { CustomButton } from "../../ui/constants";
import { useRef } from "react";
import { storage } from "../../firebase/firebase";
import { GENARELINFORMATION, LOGO } from "../../hooks/constant";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import API from "../../services/common";

const ProfileRightBusinessDetails = ({ formState, reducerDispatch }) => {
    const imgref = useRef(null);
    const { user, business } = formState;
    const [isLoading, setIsLoading] = useState(false);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleUpload = (e) => {
        setIsUploading(true);
        const file = e.target.files[0];

        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = `${Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )}%`;
                setPercentUpload(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setIsUploading(false);
                    reducerDispatch({
                        type: LOGO,
                        payload: downloadURL,
                    });
                });
            }
        );
    };

    const handleGenarelInformation = (e) => {
        e.preventDefault();
        reducerDispatch({
            type: GENARELINFORMATION,
            payload: e.target,
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                name: formState?.business?.name,
                nickname: formState?.business?.nickname,
                tagline: formState?.business?.tagline,
                website: formState?.business?.website,
                description: formState?.business?.description,
                logo: formState?.business?.logo,
            };
            const res = await API.put("api/seller/update/basic", data);
            console.log(res);
            if (res.status === 200) {
                setIsEdit(false);
                setIsLoading(false);
                toast.success("Successfully Updated");
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleEdit} className="profilePersonalInfo">
                <div className="profilePersonalHeader">
                    <h6>
                        {user?.isbrand === 1 ? "Brand" : "Boutique"} Information
                    </h6>
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
                            <div className="profilePersonalImgEdit">
                                <img src={business?.logo} alt="" />
                                <label
                                    onClick={() => imgref.current.click()}
                                    className="onboardingLogoUploadBtn"
                                >
                                    {" "}
                                    {isUploading
                                        ? percentUpload
                                        : formState?.business.logo
                                        ? "Upload Again"
                                        : "Upload"}
                                </label>
                                <input
                                    onChange={handleUpload}
                                    type="file"
                                    ref={imgref}
                                    hidden
                                />
                            </div>
                        </div>
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalInfoItem">
                                <label>Name</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={`Name`}
                                    required
                                    defaultValue={business?.name}
                                />
                            </div>
                            <div className="profilePersonalInfoItem">
                                <label>Nick Name</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="nickname"
                                    id="nickname"
                                    placeholder={`nickname`}
                                    required
                                    defaultValue={business?.nickname}
                                />
                            </div>
                        </div>
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalInfoItem">
                                <label>Tagline</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="tagline"
                                    id="tagline"
                                    placeholder={`tagline`}
                                    required
                                    defaultValue={business?.tagline}
                                />
                            </div>
                            <div className="profilePersonalInfoItem">
                                <label>Website</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="website"
                                    id="website"
                                    placeholder={`website`}
                                    required
                                    defaultValue={business?.website}
                                />
                            </div>
                        </div>
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalInfoItem width100">
                                <p>Description</p>
                                <textarea
                                    className=""
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder={`description`}
                                    required
                                    rows="7"
                                    cols="33"
                                    defaultValue={business?.description}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profilePersonalInfoContent">
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalImg">
                                <img src={business?.logo} alt="" />
                            </div>
                        </div>
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalInfoItem">
                                <p>Name</p>
                                <span>{business?.name}</span>
                            </div>
                            <div className="profilePersonalInfoItem">
                                <p>Nick Name</p>
                                <span> {business?.nickname}</span>
                            </div>
                        </div>
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalInfoItem">
                                <p>Tagline</p>
                                <span>{business?.tagline}</span>
                            </div>
                            <div className="profilePersonalInfoItem">
                                <p>Website</p>
                                <span>{business?.website}</span>
                            </div>
                        </div>
                        <div className="profilePersonalInfoItems">
                            <div className="profilePersonalInfoItem width100">
                                <p>Description</p>
                                <span>{business?.description}</span>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileRightBusinessDetails;
