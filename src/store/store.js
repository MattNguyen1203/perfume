import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../pages/user/products/ProductList/productListSlice";
import productDetailReducer from "../pages/user/products/ProductDetail/productDetailSlice";
import sideBarReducer from "../components/DefaultLayouts/Sidebar/SidebarSlice";
import adminProductsSlice from "../pages/admin/redux/reducers/product";
import adminOrdersSlice from "../pages/admin/redux/reducers/order";
const rootReducer = {
  productList: productListReducer,
  productDetail: productDetailReducer,
  sideBar: sideBarReducer,
  adminProducts: adminProductsSlice.reducer,
  adminOrders: adminOrdersSlice.reducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
