import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

//reducers
import productsReducer from "./slices/productSlices/productSlice";
import ordersReducer from "./slices/ordersSlices/ordersSlice";
import profileReducer from "./slices/profileSlices/profileSlice";

//persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["profile"],
};

//combine all reducers
const reducer = combineReducers({
    products: productsReducer,
    orders: ordersReducer,
    profile: profileReducer,
});

//persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

//store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

//persistor
export const persistor = persistStore(store);
