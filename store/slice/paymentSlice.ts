import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";
import { IPayment } from "@/constants/interfaces";

interface PaymentState {
  payments: IPayment[];
  current: IPayment | null;
  loading: boolean;
  message: string | null;
}

const initialState: PaymentState = {
  payments: [],
  current: null,
  loading: false,
  message: null,
};

// 🔹 Получить все выплаты
export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/payments");
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка загрузки выплат");
    }
  }
);

// 🔹 Получить выплату по ID
export const fetchPaymentById = createAsyncThunk(
  "payment/fetchPaymentById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/payments/${id}`);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка загрузки выплаты");
    }
  }
);

// 🔹 Создать выплату
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data: Omit<IPayment, "id" | "date">, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments", data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка создания выплаты");
    }
  }
);

// 🔹 Обновить выплату
export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async ({ id, data }: { id: number; data: Partial<IPayment> }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/payments/${id}`, data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка обновления выплаты");
    }
  }
);

// 🔹 Удалить выплату
export const deletePayment = createAsyncThunk(
  "payment/deletePayment",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/payments/${id}`);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Ошибка удаления выплаты");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET all
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // GET by id
      .addCase(fetchPaymentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      // CREATE
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      })

      // UPDATE
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.payments = state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })

      // DELETE
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter((p) => p.id !== action.payload);
        if (state.current?.id === action.payload) {
          state.current = null;
        }
      });
  },
});

export default paymentSlice.reducer;
