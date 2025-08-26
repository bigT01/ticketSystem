import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

interface ProjectUsageItem {
  day: string;
  requests: string;
}

interface ProjectUsageState {
  usage: ProjectUsageItem[];
  loading: boolean;
  message: string | null;
}

const initialState: ProjectUsageState = {
  usage: [],
  loading: false,
  message: null,
};

// Получить usage по projectId
export const fetchProjectUsage = createAsyncThunk(
  "projectUsage/fetchProjectUsage",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/project-usage/stats/${projectId}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка загрузки статистики проекта");
    }
  }
);

const projectUsageSlice = createSlice({
  name: "projectUsage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectUsage.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchProjectUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.usage = action.payload;
      })
      .addCase(fetchProjectUsage.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export default projectUsageSlice.reducer;
