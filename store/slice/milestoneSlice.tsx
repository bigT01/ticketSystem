import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

interface Completion {
  id: number;
  contribution_percentage: number;
  completed_at: string;
  developer: {
    id: number;
    staff_id?: string;
    staff?: {
      name: string;
      image: string;
    };
  };
}

interface Milestone {
  id: number;
  name: string;
  percentage_of_project: number;
  completion_date: string;
  status: string;
  project?: {
    id: string;
    name: string;
  };
  contribution_percentages?: number[];
}

interface MilestoneState {
  milestones: Milestone[];
  milestone: Milestone | null;
  loading: boolean;
  message: string | null;
}

const initialState: MilestoneState = {
  milestones: [],
  milestone: null,
  loading: false,
  message: null,
};

// 1. Создать Milestone
export const createMilestone = createAsyncThunk(
  "milestones/createMilestone",
  async (
    data: {
      projectId: string;
      name: string;
      percentage_of_project: number;
      completion_date: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/milestones", data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка создания milestone");
    }
  }
);

// 2. Получить все Milestones
export const fetchMilestones = createAsyncThunk(
  "milestones/fetchMilestones",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/milestones");
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка загрузки milestones");
    }
  }
);

// 3. Получить Milestone по ID
export const fetchMilestoneById = createAsyncThunk(
  "milestones/fetchMilestoneById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/milestones/${id}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка загрузки milestone");
    }
  }
);

// 4. Получить Milestones по projectId
export const fetchMilestonesByProject = createAsyncThunk(
  "milestones/fetchMilestonesByProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/milestones/project/${projectId}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка загрузки milestones проекта");
    }
  }
);

// 5. Обновить Milestone
export const updateMilestone = createAsyncThunk(
  "milestones/updateMilestone",
  async (
    { id, data }: { id: number; data: Partial<Milestone> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(`/milestones/${id}`, data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка обновления milestone");
    }
  }
);

// 6. Удалить Milestone
export const deleteMilestone = createAsyncThunk(
  "milestones/deleteMilestone",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/milestones/${id}`);
      return { id, ...res.data };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка удаления milestone");
    }
  }
);

const milestoneSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createMilestone.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(createMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones.push(action.payload);
        state.message = "Milestone успешно создан";
      })
      .addCase(createMilestone.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // FETCH ALL
      .addCase(fetchMilestones.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchMilestones.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones = action.payload;
      })
      .addCase(fetchMilestones.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // FETCH BY ID
      .addCase(fetchMilestoneById.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchMilestoneById.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload;
      })
      .addCase(fetchMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // FETCH BY PROJECT
      .addCase(fetchMilestonesByProject.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchMilestonesByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones = action.payload;
      })
      .addCase(fetchMilestonesByProject.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // UPDATE
      .addCase(updateMilestone.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(updateMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones = state.milestones.map((m) =>
          m.id === action.payload.id ? action.payload : m
        );
        state.message = "Milestone обновлён";
      })
      .addCase(updateMilestone.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // DELETE
      .addCase(deleteMilestone.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(deleteMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones = state.milestones.filter((m) => m.id !== action.payload.id);
        state.message = "Milestone удалён";
      })
      .addCase(deleteMilestone.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export default milestoneSlice.reducer;
