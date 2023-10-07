import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import coursesSliceReducer from './Slices/CourseSlice';
import razorpaySliceReducer from "./Slices/RazorpaySlice";

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        courses:coursesSliceReducer,
        razorpay:razorpaySliceReducer
    },
    devTools:true
});

export default store;