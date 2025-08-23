import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axiosInstance';
import { ProjectDetail } from '@/constants/interfaces';



interface ProjectDetailsState {
  projectDetails: ProjectDetail[];
  projectDetail: ProjectDetail | null;
  loading: boolean;
  message: string | null;
}

const initialState: ProjectDetailsState = {
  projectDetails: [],
  projectDetail: null,
  loading: false,
  message: null,
};

// 1. Создать запись
export const createProjectDetail = createAsyncThunk(
  'projectDetails/createProjectDetail',
  async (
    data: {
      projectId: string;
      estimate_end_date: string;
      end_date?: string | null;
      start_date: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post('/project-details', data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || 'Ошибка создания project detail'
      );
    }
  }
);

// 2. Получить все записи
export const fetchProjectDetails = createAsyncThunk(
  'projectDetails/fetchProjectDetails',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/project-details');
      return res.data;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || 'Ошибка загрузки project details'
      );
    }
  }
);

// 3. Получить по ID
export const fetchProjectDetailById = createAsyncThunk(
  'projectDetails/fetchProjectDetailById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/project-details/project/${id}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || 'Ошибка загрузки project detail'
      );
    }
  }
);

// 4. Обновить запись (PATCH)
export const updateProjectDetail = createAsyncThunk(
  'projectDetails/updateProjectDetail',
  async (
    { id, data }: { id: number; data: Partial<ProjectDetail> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(`/project-details/${id}`, data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || 'Ошибка обновления project detail'
      );
    }
  }
);

// 5. Удалить запись
export const deleteProjectDetail = createAsyncThunk(
  'projectDetails/deleteProjectDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/project-details/${id}`);
      return { id, ...res.data };
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || 'Ошибка удаления project detail'
      );
    }
  }
);

const projectDetailsSlice = createSlice({
  name: 'projectDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProjectDetails
    builder
      .addCase(fetchProjectDetails.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetails = action.payload;
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });

    // fetchProjectDetailById
    builder
      .addCase(fetchProjectDetailById.fulfilled, (state, action) => {
        state.projectDetail = action.payload;
      });

    // createProjectDetail
    builder
      .addCase(createProjectDetail.fulfilled, (state, action) => {
        state.projectDetails.push(action.payload);
        state.message = 'Project detail создан';
      });

    // updateProjectDetail
    builder
      .addCase(updateProjectDetail.fulfilled, (state, action) => {
        state.projectDetails = state.projectDetails.map((d) =>
          d.id === action.payload.id ? action.payload : d
        );
        if (state.projectDetail?.id === action.payload.id) {
          state.projectDetail = action.payload;
        }
        state.message = 'Project detail обновлен';
      });

    // deleteProjectDetail
    builder
      .addCase(deleteProjectDetail.fulfilled, (state, action) => {
        state.projectDetails = state.projectDetails.filter(
          (d) => d.id !== action.payload.id
        );
        if (state.projectDetail?.id === action.payload.id) {
          state.projectDetail = null;
        }
        state.message = 'Project detail удален';
      });
  },
});

export default projectDetailsSlice.reducer;
