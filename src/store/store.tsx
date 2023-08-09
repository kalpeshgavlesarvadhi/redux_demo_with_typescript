import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
