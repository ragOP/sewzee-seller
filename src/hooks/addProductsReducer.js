import { toast } from "react-hot-toast";
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
    REMOVESEOTAG,
    REMOVEVARIANT,
    REMOVEVIDEOS,
    SEOTAG,
    VARIANT,
    VARIANTSUB,
} from "./constant";

export const initialState = {
    name: "",
    description: "",
    price: null,
    discount: null,
    onsale: 0,
    discount_type: "percentage",
    salesprice: 0,
    totalstock: null,
    instock: 0,
    variants: [
        {
            color: "",
            colorname: "",
            image: "",
            subvariants: [
                {
                    size: "",
                    price: 0,
                    onsale: 0,
                    discount: 0,
                    discount_type: "percentage",
                    salesprice: 0,
                    stock: null,
                    instock: 1,
                },
            ],
        },
    ],
    images: [],
    videos: [],
    category: null,
    type: "",
    collection: null,
    seotags: [""],
};

const AddProdutReducer = (state = initialState, action) => {
    const { name, value, checked } = action?.payload;
    switch (action.type) {
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
                videos: [...state.videos, action?.payload],
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
            if (name === "onsale") {
                return {
                    ...state,
                    [name]: checked === true ? 1 : 0,
                    salesprice: checked === true ? state.price : 0,
                };
            } else if (name === "instock") {
                return {
                    ...state,
                    [name]: checked === true ? 1 : 0,
                    totalstock: checked === true ? state.totalstock : 0,
                };
            } else if (name === "discount") {
                if (state.discount_type === "percentage") {
                    if (value > 98) {
                        toast.error("Discount can't be greater than 100%");
                        return state;
                    } else {
                        return {
                            ...state,
                            [name]: value,
                            salesprice:
                                state.discount_type === "percentage"
                                    ? state.price - (state.price * value) / 100
                                    : state.price - value,
                        };
                    }
                } else {
                    if (value > parseInt(state?.price)) {
                        debugger;
                        console.log("value");
                        toast.error("Discount can't be greater than price");
                        return state;
                    } else {
                        return {
                            ...state,
                            [name]: value,
                            salesprice:
                                state.discount_type === "percentage"
                                    ? state.price - (state.price * value) / 100
                                    : state.price - value,
                        };
                    }
                }
            } else if (name === "discount_type") {
                return {
                    ...state,
                    [name]: value,
                    salesprice:
                        value === "percentage"
                            ? state.price -
                              (state.price * state?.discount) / 100
                            : state.price - state?.discount,
                };
            } else if (name === "price") {
                return {
                    ...state,
                    [name]: value,

                    salesprice:
                        state.discount_type === "percentage"
                            ? value - (value * state?.discount) / 100
                            : value - state?.discount,
                };
            } else {
                return {
                    ...state,
                    [name]: value,
                };
            }
        case VARIANT:
            console.log(action?.payload);
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
        case REMOVEVARIANT:
            return {
                ...state,
                variants: state.variants.filter(
                    (item, index) => index !== action.payload
                ),
            };
        case ADDMOREVARIANT:
            return {
                ...state,
                variants: [
                    ...state.variants,
                    {
                        color: "",
                        image: "",
                        colorname: "",
                        subvariants: [
                            {
                                size: "",
                                stock: null,
                                price: "",
                                instock: 0,
                                discount: "",
                                onsale: 0,
                                discount_type: "percentage",
                                salesprice: 0,
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
                                        if (name === "onsale") {
                                            return {
                                                ...subitem,
                                                [name]:
                                                    checked === true ? 1 : 0,
                                                discount:
                                                    checked === true
                                                        ? subitem?.discount
                                                        : null,
                                                salesprice:
                                                    checked === true
                                                        ? subitem?.price
                                                        : null,
                                            };
                                        } else if (name === "instock") {
                                            return {
                                                ...subitem,
                                                [name]:
                                                    checked === true ? 1 : 0,
                                                stock:
                                                    checked === true
                                                        ? subitem?.stock
                                                        : null,
                                            };
                                        } else if (name === "discount") {
                                            if (
                                                subitem.discount_type ===
                                                "percentage"
                                            ) {
                                                if (value > 99) {
                                                    toast.error(
                                                        "Discount can't be greater than 100%"
                                                    );
                                                    return subitem;
                                                } else {
                                                    return {
                                                        ...subitem,
                                                        [name]: value,
                                                        salesprice:
                                                            subitem.discount_type ===
                                                            "percentage"
                                                                ? subitem.price -
                                                                  (subitem.price *
                                                                      value) /
                                                                      100
                                                                : subitem.price -
                                                                  value,
                                                    };
                                                }
                                            } else {
                                                if (
                                                    value >
                                                    parseInt(subitem?.price)
                                                ) {
                                                    toast.error(
                                                        "Discount can't be greater than price"
                                                    );
                                                    return subitem;
                                                } else {
                                                    return {
                                                        ...subitem,
                                                        [name]: value,
                                                        salesprice:
                                                            subitem.discount_type ===
                                                            "percentage"
                                                                ? subitem.price -
                                                                  (subitem.price *
                                                                      value) /
                                                                      100
                                                                : subitem.price -
                                                                  value,
                                                    };
                                                }
                                            }
                                        } else if (name === "discount_type") {
                                            return {
                                                ...subitem,
                                                [name]: value,
                                                salesprice:
                                                    value === "percentage"
                                                        ? subitem.price -
                                                          (subitem.price *
                                                              subitem?.discount) /
                                                              100
                                                        : subitem.price -
                                                          subitem?.discount,
                                            };
                                        } else if (name === "price") {
                                            return {
                                                ...subitem,
                                                [name]: value,
                                                salesprice:
                                                    subitem.onSale === 1 &&
                                                    subitem.discount_type ===
                                                        "percentage"
                                                        ? value -
                                                          (value *
                                                              subitem?.discount) /
                                                              100
                                                        : value -
                                                          subitem?.discount,
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
        case REMOVESEOTAG:
            return {
                ...state,
                seotags: state.seotags.filter(
                    (item, index) => index !== action.payload
                ),
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
                                    discount_type: "percentage",
                                    salesprice: 0,
                                    instock: 0,
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

export default AddProdutReducer;
