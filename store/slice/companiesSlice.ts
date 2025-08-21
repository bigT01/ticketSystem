// companiesSlice.ts
import { ICompany } from '@/constants/interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'utils/axiosInstance';

interface CompaniesState {
  companies: ICompany[];
  company: ICompany | null;
  loading: boolean;
  message: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  company: null,
  loading: false,
  message: null,
};

// Получить все компании
export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/companies');
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка загрузки компаний');
    }
  }
);

// Получить компанию по ID
export const fetchCompanyById = createAsyncThunk(
  'companies/fetchCompanyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/companies/${id}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка загрузки компании');
    }
  }
);

// Создать компанию
export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (companyData: { id: string; name: string; customer: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/companies', companyData);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка создания компании');
    }
  }
);

// Обновить компанию
export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async ({ id, data }: { id: string; data: { name: string; customer: string } }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/companies/${id}`, data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка обновления компании');
    }
  }
);

// Удалить компанию
export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/companies/${id}`);
      return { id, ...res.data };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Ошибка удаления компании');
    }
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCompanies
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });

    // fetchCompanyById
    builder
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });

    // createCompany
    builder
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
        state.message = 'Компания успешно создана';
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.message = action.payload as string;
      });

    // updateCompany
    builder
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.companies = state.companies.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
        if (state.company?.id === action.payload.id) {
          state.company = action.payload;
        }
        state.message = 'Компания обновлена';
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.message = action.payload as string;
      });

    // deleteCompany
    builder
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter((c) => c.id !== action.payload.id);
        if (state.company?.id === action.payload.id) {
          state.company = null;
        }
        state.message = 'Компания удалена';
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.message = action.payload as string;
      });
  },
});

export default companiesSlice.reducer;
