import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/orders', orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/orders/myorders');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load orders');
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/orders');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    myOrders: [],
    allOrders: [],
    lastOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.allOrders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.allOrders[index] = action.payload;
      });
  },
});

export const { clearLastOrder } = orderSlice.actions;
export default orderSlice.reducer;
