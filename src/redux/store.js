import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";

const store = configureStore({
  reducer: {
    // Make sure the keys here match the slice names
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});

export default store; // Export the store as the default export
