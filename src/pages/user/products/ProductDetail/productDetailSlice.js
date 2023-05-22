import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../../../api/user/productAPI";
import orderAPI from "../../../../api/user/orderAPI";

export const productDetail = createAsyncThunk(
  "productDetail/productDetail",
  async (params, thunkAPI) => {
    try {
      const res = productAPI.get(params);
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "productDetail/getOrder",
  async (_, thunkAPI) => {
    const res = await orderAPI.getOrderPending();
    return res;
  }
);

export const handlePendingOrder = createAsyncThunk(
  "productDetail/handlePendingOrder",
  async (arg, thunkAPI) => {
    const { productDetail } = thunkAPI.getState();
    // First Pending Order
    if (productDetail.order.list.length === 0) {
      await orderAPI.addOrder({
        status: "Pending",
        cart: [arg.product],
      });

      return [arg.product];
    } else {
      // Pending Order existed

      // Check product selected existed: itemIndex > 0 => existed
      const itemIndex = productDetail.order.list.findIndex(
        (item) =>
          item.productId === arg.product.productId &&
          item.capacity === arg.product.capacity
      );
      if (itemIndex >= 0) {
        // product existed
        let result = [];
        if (arg.type === "ADD_ORDER") {
          result = productDetail.order.list.map((item, index) => {
            if (
              index === itemIndex &&
              productDetail.order.list[itemIndex].quantity >= 1
            ) {
              item = {
                ...item,
                quantity: Number(item.quantity) + Number(arg.product.quantity),
              };
              return item;
            } else {
              return item;
            }
          });
        } else if (arg.type === "REMOVE_ITEM") {
          result = productDetail.order.list.filter(
            (item, index) => index !== itemIndex && item
          );
        }

        await orderAPI.updateOrderPending({
          status: "Pending",
          cart: result,
        });
        return result;
      } else if (itemIndex < 0) {
        // product didnt exist
        const result = [...productDetail.order.list, arg.product];
        await orderAPI.updateOrderPending({
          status: "Pending",
          cart: result,
        });
        return result;
      }
    }
  }
);
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    info: {},
    imgActiveIndex: 0,
    order: {
      list: [],
      totalQty: 0,
      totalPayment: 0,
    },
    isLoading: true,
  },
  reducers: {
    changeActiveImg: (state, action) => {
      if (state.imgActiveIndex !== action.payload) {
        state.imgActiveIndex = action.payload;
      }
    },
    setOrder: (state, action) => {
      state.order.list = action.payload.list;
      state.order.totalQty = action.payload.totalQty;
      state.order.totalPayment = action.payload.totalPayment;
    },

    addProductSelected: (state, action) => {
      const itemIndex = state.order.list.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.capacity === action.payload.capacity
      );

      if (itemIndex >= 0 && state.order.list[itemIndex].quantity >= 1) {
        state.order.list[itemIndex].quantity += action.payload.quantity;
      } else if (itemIndex < 0) {
        state.order.list.push(action.payload);
      }

      localStorage.setItem("order", JSON.stringify(state.order));
    },

    removeItem: (state, action) => {
      const newProductSelected = state.order.list.filter(
        (item) =>
          item.productId !== action.payload.productId ||
          (item.capacity !== action.payload.capacity &&
            item.productId === action.payload.productId)
      );
      state.order.list = newProductSelected;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    updateOrder: (state, action) => {
      state.order.totalQty =
        Number(state.order.totalQty) + action.payload.quantity;
      if (action.payload.quantity > 0) {
        state.order.totalPayment =
          Number(state.order.totalPayment) + action.payload.price;
      } else {
        state.order.totalPayment =
          Number(state.order.totalPayment) - action.payload.price;
      }

      localStorage.setItem("order", JSON.stringify(state.order));
    },
  },

  extraReducers: {
    [productDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [productDetail.fulfilled]: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
    },

    [getOrder.fulfilled]: (state, action) => {
      state.isLoading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      if (action.payload.cart) {
        state.order = {
          list: action.payload.cart.detail,
          totalQty: action.payload.cart.totalItem,
          totalPayment: action.payload.total,
        };

        state.isLoading = false;
      }
    },

    [handlePendingOrder.fulfilled]: (state, action) => {
      state.order.list = action.payload;
    },
  },
});

const { reducer, actions } = productDetailSlice;
export const {
  getDetail,
  changeActiveImg,
  setOrder,
  addProductSelected,
  removeItem,
  updateOrder,
} = actions;
export default reducer;
