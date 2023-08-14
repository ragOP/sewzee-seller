import {
    ADDIMAGES,
    ADDMORESUBVARIANT,
    ADDMORETAGS,
    ADDMOREVARIANT,
    ADDTYPECATEGORYCOLLECTION,
    ADDVIDEOS,
    BASICDETAILS,
    PRICING,
    REMOVEIMAGES,
    REMOVEVIDEOS,
    SEOTAG,
    SETINITIALDATA,
    VARIANT,
    VARIANTSUB,
} from "./constant";

const editProductsReducer = (state, action) => {
    const { name, value, checked } = action?.payload;
    switch (action.type) {
        case SETINITIALDATA:
            return {
                ...action.payload,
            };
        case BASICDETAILS:
            return {
                ...state,
                [name]: value,
            };
        case ADDIMAGES:
            return {
                ...state,
                images: [...state.images, action?.payload],
            };
        case REMOVEIMAGES:
            return {
                ...state,
                images: state.images.filter(
                    (item, index) => index !== action.payload
                ),
            };
        case ADDVIDEOS:
            return {
                ...state,
                videos: [...state.images, action?.payload],
            };
        case REMOVEVIDEOS:
            return {
                ...state,
                videos: state.videos.filter(
                    (item, index) => index !== action.payload
                ),
            };
        case ADDTYPECATEGORYCOLLECTION:
            return {
                ...state,
                [name]: value,
            };
        case PRICING:
            if (name === "onsale" || "instock") {
                return {
                    ...state,
                    [name]: checked === true ? 1 : 0,
                };
            } else {
                return {
                    ...state,
                    [name]: value,
                };
            }
        case VARIANT:
            console.log(action.payload);
            return {
                ...state,
                variants: state.variants.map((item, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...item,
                            [name]: value,
                        };
                    }
                    return item;
                }),
            };
        case ADDMOREVARIANT:
            return {
                ...state,
                variants: [
                    ...state.variants,
                    {
                        color: "",
                        image: "",
                        subvariants: [
                            {
                                size: "",
                                stock: 0,
                                price: "",
                                discount: "",
                                onsale: 0,
                            },
                        ],
                    },
                ],
            };
        case VARIANTSUB:
            console.log(action.payload);
            return {
                ...state,
                variants: state.variants.map((item, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...item,
                            subvariants: item.subvariants.map(
                                (subitem, subindex) => {
                                    if (subindex === action.payload.subIndex) {
                                        if (name === "onsale" || "instock") {
                                            return {
                                                ...subitem,
                                                [name]:
                                                    checked === true ? 1 : 0,
                                            };
                                        } else {
                                            return {
                                                ...subitem,
                                                [name]: value,
                                            };
                                        }
                                    }
                                    return subitem;
                                }
                            ),
                        };
                    }
                    return item;
                }),
            };

        case SEOTAG:
            return {
                ...state,
                seotags: state.seotags.map((item, index) => {
                    if (index === action.payload.index) {
                        return action.payload.value;
                    }
                    return item;
                }),
            };
        case ADDMORETAGS:
            return {
                ...state,
                seotags: [...state.seotags, ""],
            };

        case ADDMORESUBVARIANT:
            return {
                ...state,
                variants: state.variants.map((item, index) => {
                    if (index === action.payload) {
                        return {
                            ...item,
                            subvariants: [
                                ...item.subvariants,
                                {
                                    size: "",
                                    stock: 0,
                                    price: "",
                                    discount: "",
                                    onsale: 0,
                                },
                            ],
                        };
                    }
                    return item;
                }),
            };
        default:
            return state;
    }
};

export default editProductsReducer;
