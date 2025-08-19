import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import staffSlice from "@/store/slice/staffSlice";

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    staff: staffSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
