import { createAsyncThunk } from "@reduxjs/toolkit";
import SewzeeService from "../../../services/sewzeeService";

export const getOrdersThunk = createAsyncThunk(
    "sewzee/orders",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getOrders()
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
