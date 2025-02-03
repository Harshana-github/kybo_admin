import { createSlice } from "@reduxjs/toolkit";
import { getProduct, storeProduct } from "./productThunk";

const initialState = {
    products: {
      data: [],
      loading: false,
      error: null,
      hasFetched: false,
    },
  };

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(getProduct.pending, (state) => {
            state.products.loading = true;
            state.products.error = null;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
            state.products.loading = false;
            state.products.data = action.payload;
            state.products.hasFetched = true;
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.products.loading = false;
            state.products.error = action.error.message;
          })
          .addCase(storeProduct.fulfilled, (state, action) => {
            state.products.data.push(action.payload);
          })
          .addCase(storeProduct.rejected, (state, action) => {
            state.products.error = action.error.message;
          });
    }
})

export default productSlice.reducer;