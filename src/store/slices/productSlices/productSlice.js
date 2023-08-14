import { createSlice } from "@reduxjs/toolkit";
import {
    getApprovdProduct,
    getProductCategory,
} from "../../actions/productAction/productAction";

const initialState = {
    products: [],
    productList: [],
    category: [],
    collection: [],
    error: {
        isError: false,
        msg: "",
    },
    isRefreshing: false,
    isLoading: false,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = {
                isError: false,
                msg: "",
            };
        },
    },
    extraReducers: (builder) => {
        // dashboard reducers
        builder.addCase(getProductCategory.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getProductCategory.fulfilled, (state, action) => {
            const data = action.payload;
            // console.log(JSON?.parse(data?.data))
            state.category = data.category;
            state.collection = data.collection;

            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getProductCategory.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
        });

        builder.addCase(getApprovdProduct.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getApprovdProduct.fulfilled, (state, action) => {
            const data = action.payload;
            state.productList = data?.data;
            // console.log(JSON?.parse(data?.data))
            state.products = data?.data;
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getApprovdProduct.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
        });
    },
});

export const { clearDashboardError } = productSlice.actions;

export default productSlice.reducer;
