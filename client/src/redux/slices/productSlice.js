import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async ({ keyword = '', category = '' } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products', { params: { keyword, category } });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load product');
    }
  }
);

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const { data } = await api.get('/products/categories');
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productSlice.reducer;
