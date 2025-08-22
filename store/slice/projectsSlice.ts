// projectsSlice.ts
import { IProject } from '@/constants/interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'utils/axiosInstance';


interface ProjectsState {
  projects: IProject[];
  project: IProject | null;
  loading: boolean;
  message: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  project: null,
  loading: false,
  message: null,
};

// Получить все проекты
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/projects');
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка загрузки проектов');
    }
  }
);

// Получить проект по ID
export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/projects/${id}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка загрузки проекта');
    }
  }
);

// Создать проект
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: { name: string; company_id: string; price: number }, { rejectWithValue }) => {
    try {
      const res = await api.post('/projects', projectData);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка создания проекта');
    }
  }
);

// Обновить проект
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: string; data: { name: string; price: number } }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/projects/${id}`, data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка обновления проекта');
    }
  }
);

// Удалить проект
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/projects/${id}`);
      return { id, ...res.data };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка удаления проекта');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProjects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });

    // fetchProjectById
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });

    // createProject
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.message = 'Проект успешно создан';
      })
      .addCase(createProject.rejected, (state, action) => {
        state.message = action.payload as string;
      });

    // updateProject
    builder
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        if (state.project?.id === action.payload.id) {
          state.project = action.payload;
        }
        state.message = 'Проект обновлен';
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.message = action.payload as string;
      });

    // deleteProject
    builder
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload.id);
        if (state.project?.id === action.payload.id) {
          state.project = null;
        }
        state.message = 'Проект удален';
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.message = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
