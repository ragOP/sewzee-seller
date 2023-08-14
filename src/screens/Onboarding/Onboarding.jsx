import { useEffect, useReducer, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";

// local imports
import "./Onboarding.css";
import { storage } from "../../firebase/firebase";
import { sewzeeImages } from "../../assets";
import {
    ADDRESS,
    BANKDETAILS,
    CONTACTDETAIL,
    GENARELINFORMATION,
    INCREASECONTACTDETAILS,
    LOGO,
    SETLATLNG,
} from "../../hooks/constant";
import OnboardingReducer, { initialState } from "../../hooks/onBordingReducer";
import { CustomButton } from "../../ui/constants";
import CustomModal from "../../ui/CustomModal/CustomModal";
import API from "../../services/common";
import { toast } from "react-hot-toast";
import MapContainer from "../../components/MapContainer/MapContainer";
import ProductImageVideos from "../../components/Products/ProductImageVideos/ProductImageVideos";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: "none",
};

const Onboarding = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const isComplete = localStorage.getItem("isComplete");
    const imgref = useRef(null);
    const [open, setOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleMapOpen = () => setMapOpen(true);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sellerTypeLocal = localStorage.getItem("sellerType");
    const [sellerType, setSellerType] = useState(sellerTypeLocal);
    const [formState, dispatch] = useReducer(OnboardingReducer, initialState);
    const [coordinates, setCoordinates] = useState([]);

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
                    dispatch({
                        type: LOGO,
                        payload: downloadURL,
                    });
                });
            }
        );
    };

    const handleGenarelInformation = (e) => {
        e.preventDefault();
        dispatch({
            type: GENARELINFORMATION,
            payload: e.target,
        });
    };

    const handleAddress = (e) => {
        e.preventDefault();
        dispatch({
            type: ADDRESS,
            payload: e.target,
        });
    };
    const handleBankDetails = (e) => {
        e.preventDefault();
        dispatch({
            type: BANKDETAILS,
            payload: e.target,
        });
    };

    const handeContactDetails = (e, index) => {
        e.preventDefault();
        dispatch({
            type: CONTACTDETAIL,
            payload: {
                name: e.target.name,
                value: e.target.value,
                index: index,
            },
        });
    };

    const increaseContactDetails = () => {
        dispatch({
            type: INCREASECONTACTDETAILS,
            payload: {
                name: "plus",
            },
        });
    };
    const decreaseContactDetails = (index) => {
        dispatch({
            type: INCREASECONTACTDETAILS,
            payload: {
                name: "minus",
                index: index,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formState.logo === "") {
            toast.error("Please upload logo");
            setIsLoading(false);
            return;
        }
        if (formState?.address?.lng === "" || formState?.address?.lat === "") {
            toast.error("Please select a valid location");
            setIsLoading(false);
            handleMapOpen();
            return;
        }
        const onBoardUrl =
            sellerType === "Brand"
                ? "api/seller/brand/"
                : "/api/seller/boutique/";
        try {
            const res = await API.post(onBoardUrl, formState);
            if (res.status === 200) {
                toast.success("Onboarding Successfull");
                setIsLoading(false);
                localStorage.setItem("isComplete", true);
                localStorage.removeItem("userEmail");
                localStorage.removeItem("sellerType");
                navigate("/dashboard");
            }
        } catch (error) {
            if (
                error.response.data.message ===
                "err SequelizeDatabaseError: Invalid GIS data provided to function st_geomfromtext."
            ) {
                toast.error("Please select a valid location");
                setIsLoading(false);
                handleMapOpen();
            } else {
                setIsLoading(false);
                toast.error(error.response.data.message);
            }
        }
    };

    const handleModalData = (item) => {
        setSellerType(item);
        handleClose();
        localStorage.setItem("sellerType", item);
    };

    const fetchAddressCode = async (fetchAddress) => {
        const res = await Geocode.fromAddress(fetchAddress);
        console.log(res);
        const { lat, lng } = res.results[0]?.geometry?.location;
        dispatch({
            type: SETLATLNG,
            payload: { lat, lng },
        });
        setCoordinates([lat, lng]);
    };

    useEffect(() => {
        if (sellerTypeLocal === null) {
            setSellerType(sellerTypeLocal);
            handleOpen();
        }
    }, [sellerType]);

    useEffect(() => {
        if (token) {
            if (isComplete === "true") {
                navigate("/dashboard");
            }
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (
            formState?.address.address &&
            formState?.address.city &&
            formState?.address.pincode &&
            formState?.address?.state &&
            formState?.address?.country
        ) {
            let fetchAddress = `${formState?.address.address}, ${formState?.address.city}, ${formState?.address.pincode}, ${formState?.address?.state}, ${formState?.address?.country}`;
            fetchAddressCode(fetchAddress);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            dispatch({
                type: CONTACTDETAIL,
                payload: {
                    name: "email",
                    value: localStorage.getItem("userEmail"),
                    index: 0,
                },
            });
            dispatch({
                type: CONTACTDETAIL,
                payload: {
                    name: "role",
                    value: "Owner",
                    index: 0,
                },
            });
        }
    }, []);

    console.log(formState);

    return (
        <div className="OnboardingWrapper">
            <div className="OnboardingHeader">
                <div className="OnboardingHeaderContent">
                    <h1>
                        Tell Us About Your{" "}
                        <span> {sellerType ? sellerType : ""}</span>
                    </h1>
                    <p>We just need to know a few more things. </p>
                    <div className="OnboardingHeaderDots">
                        <div className="headerDots"></div>
                        <div className="headerDots"></div>
                        <div className="headerDots"></div>
                        <div className="headerDots"></div>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="OnboardingInformationWrapper"
            >
                <div className="OnboardingGenarelInformation">
                    <h6>{sellerType ? sellerType : ""} Genarel Information</h6>
                    <div className="OnboardingInputWrapper">
                        <div className="OnboardingLogoInputs">
                            <img
                                src={formState?.logo || sewzeeImages.DummyLogo}
                                alt="logo"
                            />
                            <label
                                onClick={() => imgref.current.click()}
                                className="onboardingLogoUploadBtn"
                            >
                                {" "}
                                {isUploading
                                    ? percentUpload
                                    : formState?.logo
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
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="name">Name</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={`${
                                        sellerType ? sellerType : ""
                                    } Name`}
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="nickname">Nick Name</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="nickname"
                                    id="nickname"
                                    placeholder={`${
                                        sellerType ? sellerType : ""
                                    } Nick Name`}
                                    required
                                />
                            </div>
                        </div>
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="tagline">Tagline</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="tagline"
                                    id="tagline"
                                    placeholder={`${
                                        sellerType ? sellerType : ""
                                    } Tagline`}
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="website">Website</label>
                                <input
                                    onChange={handleGenarelInformation}
                                    type="text"
                                    name="website"
                                    id="website"
                                    placeholder={`${
                                        sellerType ? sellerType : ""
                                    } Website`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="OnboardingInput width100">
                            <label htmlFor="tagline">Description</label>
                            <textarea
                                className=""
                                onChange={handleGenarelInformation}
                                type="text"
                                name="description"
                                id="description"
                                placeholder={`${
                                    sellerType ? sellerType : ""
                                } Description`}
                                required
                                rows="7"
                                cols="33"
                            />
                        </div>
                    </div>
                </div>
                <div className="OnboardingGenarelInformation">
                    <h6>{sellerType ? sellerType : ""} Image & Videos</h6>
                    <ProductImageVideos
                        formState={formState}
                        dispatch={dispatch}
                        isOnboard={true}
                    />
                </div>
                <div className="OnboardingGenarelInformation">
                    <h6>{sellerType ? sellerType : ""} Address</h6>
                    <div className="OnboardingInputWrapper">
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="address">Address</label>
                                <input
                                    onChange={handleAddress}
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Enter Address"
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="country">Country</label>
                                <input
                                    onChange={handleAddress}
                                    type="text"
                                    name="country"
                                    id="country"
                                    placeholder="Enter Country"
                                    required
                                />
                            </div>
                        </div>
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="state">State</label>
                                <input
                                    onChange={handleAddress}
                                    type="text"
                                    name="state"
                                    id="state"
                                    placeholder="Enter State"
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="city">City</label>
                                <input
                                    onChange={handleAddress}
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Enter City"
                                    required
                                />
                            </div>
                        </div>
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="pincode">Zip Code</label>
                                <input
                                    onChange={handleAddress}
                                    type="number"
                                    name="pincode"
                                    id="pincode"
                                    placeholder="Enter Zipcode"
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="localty">
                                    Localty <small>(Optional)</small>
                                </label>
                                <input
                                    onChange={handleAddress}
                                    type="text"
                                    name="localty"
                                    id=""
                                    placeholder="Enter Localty"
                                />
                            </div>
                        </div>

                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="lat">
                                    Latitude{" "}
                                    <small onClick={handleMapOpen}>
                                        Select Latitude{" "}
                                    </small>
                                </label>
                                <input
                                    onChange={handleAddress}
                                    disabled
                                    value={formState?.address?.lat}
                                    type="number"
                                    name="lat"
                                    id="lat"
                                    placeholder="Enter Latitude"
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="lng">
                                    Longitude{" "}
                                    <small onClick={handleMapOpen}>
                                        Select Longitude
                                    </small>
                                </label>
                                <input
                                    onChange={handleAddress}
                                    disabled
                                    value={formState?.address?.lng}
                                    type="number"
                                    name="lng"
                                    id="lng"
                                    placeholder="Enter Longitude"
                                    required
                                />
                            </div>
                        </div>
                        {mapOpen && (
                            <div className="onbordingMap">
                                <MapContainer
                                    defaultData={coordinates}
                                    dispatch={dispatch}
                                    setDefaultData={setCoordinates}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="OnboardingGenarelInformation">
                    <div className="OnboardContactTitle">
                        <h6>Contact Details</h6>
                        <p onClick={increaseContactDetails}>+ Add One More</p>
                    </div>
                    {formState?.contactDetails.map((info, index) => (
                        <div key={index} className="OnboardingInputWrapper">
                            {index !== 0 && (
                                <div className="OnboardContactTitle">
                                    <h6>Contact Details {index + 1}</h6>
                                    <p
                                        onClick={() =>
                                            decreaseContactDetails(index)
                                        }
                                    >
                                        Remove
                                    </p>
                                </div>
                            )}
                            <div className="OnboardingInputs">
                                <div className="OnboardingInput">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        defaultValue={info?.name}
                                        onChange={(e) =>
                                            handeContactDetails(e, index)
                                        }
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                    />
                                </div>
                                <div className="OnboardingInput">
                                    <label htmlFor="role">Role</label>
                                    <input
                                        defaultValue={info?.role}
                                        onChange={(e) =>
                                            handeContactDetails(e, index)
                                        }
                                        type="text"
                                        name="role"
                                        id="role"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="OnboardingInputs">
                                <div className="OnboardingInput">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        disabled={index === 0 ? true : false}
                                        defaultValue={info?.email}
                                        onChange={(e) =>
                                            handeContactDetails(e, index)
                                        }
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                    />
                                </div>
                                <div className="OnboardingInput">
                                    <label htmlFor="number">Phone</label>
                                    <input
                                        defaultValue={info?.number}
                                        onChange={(e) =>
                                            handeContactDetails(e, index)
                                        }
                                        type="text"
                                        name="number"
                                        id="number"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="OnboardingGenarelInformation">
                    <h6>{sellerType ? sellerType : ""} Bank Details</h6>
                    <div className="OnboardingInputWrapper">
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="account_holder_name">
                                    Account Holder Name
                                </label>
                                <input
                                    onChange={handleBankDetails}
                                    type="text"
                                    name="account_holder_name"
                                    id="account_holder_name"
                                    placeholder="Enter Account Holder Name"
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="account_no">Account No</label>
                                <input
                                    onChange={handleBankDetails}
                                    type="text"
                                    name="account_no"
                                    id="account_no"
                                    placeholder="Enter Account No"
                                    required
                                />
                            </div>
                        </div>
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="bank_name">Bank Name</label>
                                <input
                                    onChange={handleBankDetails}
                                    type="text"
                                    name="bank_name"
                                    id="bank_name"
                                    placeholder="Enter Bank Name"
                                    required
                                />
                            </div>
                            <div className="OnboardingInput">
                                <label htmlFor="branch_name">Branch Name</label>
                                <input
                                    onChange={handleBankDetails}
                                    type="text"
                                    name="branch_name"
                                    id="branch_name"
                                    placeholder="Enter Branch Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="OnboardingInputs">
                            <div className="OnboardingInput">
                                <label htmlFor="ifsc_code">IFSC Code</label>
                                <input
                                    onChange={handleBankDetails}
                                    type="number"
                                    name="ifsc_code"
                                    id="ifsc_code"
                                    placeholder="Enter IFSC Code"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flexJustifyEnd">
                    <CustomButton classId="OnboardingBtn">
                        {isLoading ? (
                            <CircularProgress
                                sx={{ color: "white" }}
                                size={20}
                            />
                        ) : (
                            "Save and Continue"
                        )}
                    </CustomButton>
                </div>
            </form>
            {/* onBoarding Modal */}
            <CustomModal
                open={open}
                handleClose={sellerType === "" ? "" : handleClose}
            >
                <Box sx={style}>
                    <h6 className="OnboardingModalTitle">
                        Choose Product Category
                    </h6>
                    <div className="OnboardingModal">
                        <div
                            onClick={() => handleModalData("Brand")}
                            className="OnboardingModalItem"
                        >
                            <img src={sewzeeImages?.Brand} alt="Brand" />
                            <p>Brand</p>
                        </div>
                        <div
                            onClick={() => handleModalData("Boutique")}
                            className="OnboardingModalItem"
                        >
                            <img src={sewzeeImages?.Boutique} alt="Boutique" />
                            <p>Boutique</p>
                        </div>
                    </div>
                </Box>
            </CustomModal>
        </div>
    );
};

export default Onboarding;
