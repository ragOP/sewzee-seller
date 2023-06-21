import { ADDRESS, BANKDETAILS, CONTACTDETAIL, GENARELINFORMATION, INCREASECONTACTDETAILS, LOGO } from "./constant";

export const initialState = {
    name: "",
    nickname: "",
    tagline: "",
    logo: "",
    website: "",
    address: {
        pincode: null,
        address: "",
        localty: "",
        city: "",
        state: "",
        country: ""
    },
    contactDetails: [
        {
            email: "",
            number: "",
            name: "",
            role: ""
        }
    ],
    bankDetails: {
        account_no: "",
        ifsc_code: "",
        bank_name: "",
        branch_name: "",
        account_holder_name: ""
    }
}

const OnboardingReducer = (state = initialState, action) => {
    const { name, value } = action?.payload;
    switch (action.type) {
        case LOGO:
            return {
                ...state,
                logo: action.payload
            }
        case GENARELINFORMATION:
            return {
                ...state,
                [name]: value
            }

        case ADDRESS:
            return {
                ...state,
                address: {
                    ...state.address,
                    [name]: value
                }
            }
        case INCREASECONTACTDETAILS:
            if (name === "plus") {
                return {
                    ...state,
                    contactDetails: [...state.contactDetails, {
                        email: "",
                        number: "",
                        name: "",
                        role: ""
                    }]
                }
            } else {
                return {
                    ...state,
                    contactDetails: state.contactDetails.filter((item, index) => index !== action?.payload?.index)
                }
            }
        case CONTACTDETAIL:
            return {
                ...state,
                contactDetails: state.contactDetails.map((item, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...item,
                            [name]: value
                        }
                    }
                    else {
                        return item
                    }
                })
            }

        case BANKDETAILS:

            return {
                ...state,
                bankDetails: {
                    ...state.bankDetails,
                    [name]: value
                }
            }
        default:
            return state;
    }
}

export default OnboardingReducer;