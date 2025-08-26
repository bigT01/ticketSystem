import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import staffSlice from "@/store/slice/staffSlice";
import companiesSlice from "@/store/slice/companiesSlice";
import projectsSlice from "@/store/slice/projectsSlice";
import projectDetailsSlice from "@/store/slice/projectDetailsSlice";
import milestoneSlice from "@/store/slice/milestoneSlice";
import projectUsageSlice from "@/store/slice/projectUsageSlice";

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    staff: staffSlice,
    companies: companiesSlice,
    projects: projectsSlice,
    projectDetails: projectDetailsSlice,
    milestone: milestoneSlice,
    projectUsage: projectUsageSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
