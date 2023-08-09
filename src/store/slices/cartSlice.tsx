import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export interface CartItems {
  cartItem: Product[];
}

const initialState: CartItems = {
  cartItem: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const { quantity } = item;
      const existingItem = state.cartItem.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity <= 0) {
          state.cartItem = state.cartItem.filter(
            (i) => i.id !== existingItem.id
          );
        }
      } else {
        state.cartItem.push({ ...item, quantity });
      }
    },
    deleteItems: (state, action: PayloadAction<number>) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export default cartSlice.reducer;
export const { addTocart, deleteItems } = cartSlice.actions;
