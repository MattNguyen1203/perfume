import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./MiniCart.module.scss";

import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/DefaultLayouts/Loading/Loading";

const cx = classNames.bind(styles);

const MiniCart = ({ closeModal }) => {
  // Get selected prd

  const { order, isLoading } = useSelector((state) => state.productDetail);
  const { list, totalQty, totalPayment } = order;

  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/cart");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("list-item")}>
        {isLoading ? <Loading /> : <CartItem productSelected={list} />}
      </div>

      <div className={cx("payment")}>
        <div className={cx("total")}>
          <div className={cx("total-qty")}>
            <span className={cx("title")}>Subtotal</span>
            <span>{`${totalQty} items`}</span>
          </div>
          <div className={cx("total-payment")}>{`$${totalPayment}`}</div>
        </div>
        <div className={cx("btn-to-cart")} onClick={handleRoute}>
          Review + Checkout
        </div>
        <div className={cx("note")}>
          Shipping & Taxes Calculated at Checkout
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
