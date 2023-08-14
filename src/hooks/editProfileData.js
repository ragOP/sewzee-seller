import {
    ADDONBOARDIMAGES,
    ADDONBOARDVIDEOS,
    ADDRESS,
    BANKDETAILS,
    CONTACTDETAIL,
    GENARELINFORMATION,
    INCREASECONTACTDETAILS,
    LOGO,
    REMOVEIMAGES,
    REMOVEVIDEOS,
    SETLATLNG,
    ADDCONTACTDETAIL,
    ADDCONTACTDETAILDATA,
} from "./constant";

const EditProfileReducer = (state, action) => {
    const { name, value } = action?.payload;
    switch (action.type) {
        case LOGO:
            return {
                ...state,
                business: {
                    ...state.business,
                    logo: action.payload,
                },
            };
        case GENARELINFORMATION:
            return {
                ...state,
                business: {
                    ...state.business,
                    [name]: value,
                },
            };
        case ADDONBOARDIMAGES:
            return {
                ...state,
                images: [...state.images, action.payload],
            };
        case REMOVEIMAGES:
            return {
                ...state,
                images: state.images.filter(
                    (item, index) => index !== action.payload
                ),
            };
        case ADDONBOARDVIDEOS:
            return {
                ...state,
                videos: [...state.videos, action.payload],
            };
        case REMOVEVIDEOS:
            return {
                ...state,
                videos: state.videos.filter(
                    (item, index) => index !== action.payload
                ),
            };
        case ADDRESS:
            return {
                ...state,
                business: {
                    ...state.business,
                    [name]: value,
                },
            };
        case ADDCONTACTDETAIL:
            return {
                ...state,
                business: {
                    ...state.business,
                    contactDetails: [
                        ...state.business.contactDetails,
                        {
                            email: "",
                            number: "",
                            name: "",
                            role: "",
                        },
                    ],
                },
            };
        case ADDCONTACTDETAILDATA:
            return {
                ...state,
                business: {
                    ...state.business,
                    contactDetails: state.business.contactDetails.map(
                        (item, index) => {
                            if (index === action.payload.index) {
                                return {
                                    ...item,
                                    [name]: value,
                                };
                            } else {
                                return item;
                            }
                        }
                    ),
                },
            };
        case SETLATLNG:
            return {
                ...state,
                address: {
                    ...state.address,
                    lng: action.payload.lng,
                    lat: action.payload.lat,
                },
            };
        case INCREASECONTACTDETAILS:
            if (name === "plus") {
                return {
                    ...state,
                    contactDetails: [
                        ...state.contactDetails,
                        {
                            email: "",
                            number: "",
                            name: "",
                            role: "",
                        },
                    ],
                };
            } else {
                return {
                    ...state,
                    contactDetails: state.contactDetails.filter(
                        (item, index) => index !== action?.payload?.index
                    ),
                };
            }
        case CONTACTDETAIL:
            return {
                ...state,
                contactDetails: state.contactDetails.map((item, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...item,
                            [name]: value,
                        };
                    } else {
                        return item;
                    }
                }),
            };

        case BANKDETAILS:
            return {
                ...state,
                user: {
                    ...state.user,
                    [name]: value,
                },
            };
        default:
            return state;
    }
};

export default EditProfileReducer;
