import ProductList from "../pages/user/products/ProductList";
import ProductDetail from "../pages/user/products/ProductDetail";
import Cart from "../pages/user/cart/Cart/Cart";
import Checkout from "../pages/user/checkout/Checkout";
import Home from "../pages/user/home/Home";
import Auth from "../pages/user/auth/Auth";
import AdminRoutes from "../pages/admin";
import ProductLayout from "../pages/admin/pages/product";
import OrderLayout from "../pages/admin/pages/order";
import ShopSystem from "../pages/user/shops/ShopSystem";

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: ProductList },
  { path: "/products?:filter", component: ProductList },
  { path: "/products/:id", component: ProductDetail },
  { path: "/stores", component: ShopSystem },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/auth", component: Auth },
  {
    path: "/admin",
    component: AdminRoutes,
    child: [
      { path: "", component: ProductLayout },
      { path: "/admin/product", component: ProductLayout },
      { path: "/admin/order", component: OrderLayout },
    ],
  },
];
