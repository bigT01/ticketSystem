import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import staffSlice from "@/store/slice/staffSlice";
import companiesSlice from "@/store/slice/companiesSlice";

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    staff: staffSlice,
    companies: companiesSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
