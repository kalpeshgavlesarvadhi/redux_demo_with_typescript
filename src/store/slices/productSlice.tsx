import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductData = createAsyncThunk("api/products", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
});

export interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  rating: { rate: number; count: number };
}

export interface ProductList {
  product: Product[];
  error?: string | undefined;
  loading?: boolean;
}

const initialState: ProductList = {
  product: [],
  error: "",
  loading: true,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductData.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(
      getProductData.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.product = action.payload;
      }
    );
    builder.addCase(getProductData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
