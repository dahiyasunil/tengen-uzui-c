import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (keywords) => {
    const response = await axios.get(`${serverUrl}/api/products/`, {
      params: { search: keywords },
    });
    return response.data;
  },
);

const filters = {
  category: [],
  price: null,
  rating: null,
  sortBy: {
    price: "",
  },
};

const isAnyFilterSet = ({ category, price, rating, sortBy }) => {
  if (
    category.length > 0 ||
    price !== null ||
    rating !== null ||
    sortBy.price !== ""
  ) {
    return true;
  }
  return false;
};

const initialState = {
  products: [],
  status: "idle",
  error: null,
  isFilter: false,
  filters,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.isFilter = isAnyFilterSet(state.filters);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { updateFilters } = productSlice.actions;
export default productSlice.reducer;
