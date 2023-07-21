import { createSlice } from "@reduxjs/toolkit";
import { getProfileThunk } from "../../actions/profileAction/profileAction";

const initialState = {
    sellerData: {},
    error: {
        isError: false,
        msg: "",
    },
    isRefreshing: false,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileError: (state) => {
            state.error = {
                isError: false,
                msg: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {
            const data = action.payload;
            state.sellerData = {
                business: data?.business,
                user: data?.data,
                media: data?.media,
            };
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getProfileThunk.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
        });
    },
});

export const { clearProfileError } = profileSlice.actions;

export default profileSlice.reducer;
