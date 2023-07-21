import { createAsyncThunk } from "@reduxjs/toolkit";
import SewzeeService from "../../../services/sewzeeService";

export const getProfileThunk = createAsyncThunk(
    "sewzee/profile",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getProfile()
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
