import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../../../api/user/productAPI";
export const getProductList = createAsyncThunk(
  "productList/getProductList",
  async (arg, thunkAPI) => {
    if (arg.type === "NOT_FILTER") {
      const res = await productAPI.getAll();
      const result = await productAPI.filter({
        page: arg.params.page,
      });
      return {
        list: result.list || [],
        totalPage: Math.ceil(res.total / 12),
      };
    } else if (arg.type === "FILTER") {
      const res = await productAPI.filter(arg.params);
      const result = await productAPI.filter({ ...arg.params, page: arg.page });
      return {
        list: result.list || [],
        totalPage: Math.ceil(res.total / 12),
      };
    }
  }
);

const productListSlice = createSlice({
  name: "productList",
  initialState: {
    list: [],
    totalPage: 0,
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    [getProductList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductList.fulfilled]: (state, action) => {
      state.list = action.payload.list;
      state.totalPage = action.payload.totalPage;
      state.isLoading = false;
    },
  },
});

const { reducer } = productListSlice;

export default reducer;
