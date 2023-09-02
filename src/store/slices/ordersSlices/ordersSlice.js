import { createSlice } from "@reduxjs/toolkit";
import { getOrdersThunk } from "../../actions/ordersAction/ordersAction";

const initialState = {
    orders: [],
    ordersList: [],
    error: {
        isError: false,
        msg: "",
    },
    isRefreshing: false,
    isLoading: false,
};

export const ordersSlice = createSlice({
    name: "orders",
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
        builder.addCase(getOrdersThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
            const data = action.payload;

            state.ordersList = data?.data;
            state.orders = data?.data;
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getOrdersThunk.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
        });
    },
});

export const { clearDashboardError } = ordersSlice.actions;

export default ordersSlice.reducer;
