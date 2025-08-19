import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'utils/axiosInstance';

interface Staff {
  id: string;
  name: string;
  image: string;
  paid: number;
  isActive: boolean;
  projectsCount: number;
}

interface StaffState {
  staff: Staff[];
  loading: boolean;
  message: string | null;
}

const initialState: StaffState = {
  staff: [],
  loading: false,
  message: null,
};

export const fetchStaff = createAsyncThunk(
  'staff/fetchStaff',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/stuff'); // {{baseURL}}/stuff
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка загрузки сотрудников');
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export default staffSlice.reducer;