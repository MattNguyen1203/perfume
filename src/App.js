import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import Header from "./components/DefaultLayouts/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  setOrder,
} from "./pages/user/products/ProductDetail/productDetailSlice";
import { useEffect } from "react";
import Footer from "./components/DefaultLayouts/Footer/Footer";

function App() {
  const { order } = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  // Get Order
  useEffect(() => {
    const token = localStorage.getItem("token");

    // When user Login, call API to get order with status "Pending"
    if (token) {
      const fetchAPI = async () => {
        dispatch(getOrder());
      };
      fetchAPI();
    } else if (!token) {
      // When user not Login, get order from Local Storage
      const orderLocal = JSON.parse(localStorage.getItem("order"));
      if (orderLocal) {
        dispatch(
          setOrder({
            list: orderLocal.list,
            totalQty: orderLocal.totalQty,
            totalPayment: orderLocal.totalPayment,
          })
        );
      }
    }
  }, [JSON.stringify(order)]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let childArr;
            if (route.child !== undefined) {
              childArr = route.child;
            }
            return (
              <Route key={index} path={route.path} element={<Page />}>
                {childArr !== undefined &&
                  childArr.map((item, index) => {
                    const Child = item.component;
                    return (
                      <Route key={index} path={item.path} element={<Child />} />
                    );
                  })}
              </Route>
            );
          })}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
