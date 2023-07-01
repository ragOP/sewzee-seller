import { createAsyncThunk } from "@reduxjs/toolkit";
import SewzeeService from "../../../services/sewzeeService";


export const getApprovdProduct = createAsyncThunk(
    "sewzee/ApprovdProduct",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getApprovedProduct(payload)
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
export const getProductCategory = createAsyncThunk(
    "sewzee/productCategory",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getProductCategory(payload)
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
