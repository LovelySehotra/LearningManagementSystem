import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import coursesSliceReducer from './Slices/CourseSlice';

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        courses:coursesSliceReducer,
    },
    devTools:true
});

export default store;