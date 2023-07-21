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
            console.log(data);
            state.ordersList = data?.data;
            // const convertData = data.data.map((item) => {
            //     // const images = JSON.parse(item.images);
            //     const findcategory = state.category.find(
            //         (item) => item?.id === item?.category
            //     );
            //     console.log(findcategory);
            //     return [
            //         item.images,
            //         item?.name,
            //         item?.price,
            //         item?.category,
            //         item?.instock === 1 ? "Yes" : "No",
            //         item.id,
            //     ];
            // });
            // const productData = convertData.map((item) => ({
            //     productImage: item[0],
            //     productName: item[1],
            //     productPrice: item[2],
            //     productCategory: item[3],
            //     productInStock: item[4],
            //     action: item[5],
            // }));
            // state.products = productData;
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
