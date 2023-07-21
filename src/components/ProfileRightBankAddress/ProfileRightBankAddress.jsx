import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { CustomButton } from "../../ui/constants";
import { CircularProgress } from "@mui/material";
import { ADDRESS } from "../../hooks/constant";
import API from "../../services/common";
import { toast } from "react-hot-toast";
import { getProfileThunk } from "../../store/actions/profileAction/profileAction";
import MapContainer from "../MapContainer/MapContainer";

const ProfileRightAddress = ({ formState, reducerDispatch }) => {
    const { business } = formState;
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);

    const handleAddress = (e) => {
        e.preventDefault();
        reducerDispatch({
            type: ADDRESS,
            payload: e.target,
        });
    };

    console.log(formState);

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                address: business.address,
                city: business.city,
                state: business.state,
                pincode: business.pincode,
                country: business.country,
                localty: business.localty,
                lat: business.position.coordinates[0],
                lng: business.position.coordinates[1],
            };
            const res = await API.put("/api/seller/update/address", data);
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
                <h6>Address</h6>
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
                        onClick={() => {
                            setMapOpen(true);
                            setIsEdit(true);
                        }}
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
                            <label>Address</label>
                            <input
                                onChange={handleAddress}
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter Address"
                                required
                                defaultValue={business?.address}
                            />
                        </div>
                        <div className="profilePersonalInfoItem">
                            <label>City</label>
                            <input
                                onChange={handleAddress}
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Enter City"
                                required
                                defaultValue={business?.city}
                            />
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <label>State</label>
                            <input
                                onChange={handleAddress}
                                type="text"
                                name="state"
                                id="state"
                                placeholder="Enter State"
                                required
                                defaultValue={business?.state}
                            />
                        </div>
                        <div className="profilePersonalInfoItem">
                            <label>Pin Code</label>
                            <input
                                onChange={handleAddress}
                                type="number"
                                name="pincode"
                                id="pincode"
                                placeholder="Enter Zipcode"
                                required
                                defaultValue={business?.pincode}
                            />
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <label>Country</label>
                            <input
                                onChange={handleAddress}
                                type="text"
                                name="country"
                                id="country"
                                placeholder="Enter Country"
                                required
                                defaultValue={business?.country}
                            />
                        </div>
                        <div className="profilePersonalInfoItem">
                            <label>Locality</label>
                            <input
                                onChange={handleAddress}
                                type="text"
                                name="localty"
                                id=""
                                placeholder="Enter Localty"
                                defaultValue={business?.localty}
                            />
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <label>Latitude</label>
                            <input
                                onChange={handleAddress}
                                disabled
                                defaultValue={
                                    formState?.business?.position
                                        ?.coordinates[0]
                                }
                                type="number"
                                name="lat"
                                id="lat"
                                placeholder="Enter Latitude"
                                required
                            />
                        </div>
                        <div className="profilePersonalInfoItem">
                            <label>Longitude</label>
                            <input
                                onChange={handleAddress}
                                disabled
                                defaultValue={
                                    formState?.business?.position
                                        ?.coordinates[1]
                                }
                                type="number"
                                name="lng"
                                id="lng"
                                placeholder="Enter Longitude"
                                required
                            />
                        </div>
                    </div>
                    {mapOpen && (
                        <div className="profileMap">
                            <MapContainer
                                defaultData={
                                    formState?.business?.position?.coordinates
                                }
                                dispatch={reducerDispatch}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="profilePersonalInfoContent">
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Address</p>
                            <span>{business?.address}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>City</p>
                            <span>{business?.city}</span>
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>State</p>
                            <span> {business?.state}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Pin Code</p>
                            <span>{business?.pincode}</span>
                        </div>
                    </div>
                    <div className="profilePersonalInfoItems">
                        <div className="profilePersonalInfoItem">
                            <p>Country</p>
                            <span>{business?.country}</span>
                        </div>
                        <div className="profilePersonalInfoItem">
                            <p>Locality</p>
                            <span>{business?.localty}</span>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default ProfileRightAddress;
