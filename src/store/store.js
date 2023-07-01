import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

//reducers
import productsReducer from "./slices/productSlices/productSlice";


//persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: [""],
};

//combine all reducers
const reducer = combineReducers({
    products: productsReducer,
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
