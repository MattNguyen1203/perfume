import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";

import CartItem from "../CartItem/CartItem";
import Order from "../../components/Order/Order";
import { Link } from "react-router-dom";
import Loading from "../../../../components/DefaultLayouts/Loading/Loading";

const cx = classNames.bind(styles);

const Cart = () => {
  const { list, totalQty } = useSelector((state) => state.productDetail.order);

  return (
    <>
      {!list ? (
        <Loading />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("note")}>Free shipping on orders of $75+</div>
          <div className={cx("container")}>
            <div className={cx("product-info")}>
              <div className={cx("header")}>
                <h2>Your Cart</h2>
                <span>{`(${totalQty} items)`}</span>
              </div>

              <div className={cx("list-item")}>
                <CartItem productSelected={list} className={cx("big-size")} />
              </div>
            </div>

            <div className={cx("order")}>
              <Order />
              <Link to={"/products"} className={cx("btn-back")}>
                Continue Shopping
              </Link>
              <Link to={"/checkout"} className={cx("btn-checkout")}>
                Go To Checkout
              </Link>

              <div className={cx("sub-note")}>
                <div>100% Authentic</div>
                <div>Need Help? Call Customer Support 866.513.0513</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
