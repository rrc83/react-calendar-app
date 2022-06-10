import { uiReducer } from "../reducers/uiReducer";
import { configureStore } from "@reduxjs/toolkit";
import { calendarReducer } from "../reducers/calendarReducers";
import { authReducer } from "../reducers/authReducer";

export const store = configureStore({
    reducer: {
        ui:uiReducer,
        calendar:calendarReducer,
        auth:authReducer
    }
});