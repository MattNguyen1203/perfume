import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Order = () => {
  const totalPayment = useSelector(
    (state) => state.productDetail.order.totalPayment
  );
  return (
    <>
      <div className={cx("title")}>Order Summary</div>
      <div className={cx("order-payment")}>
        <div className={cx("item-order")}>
          <span>Subtotal</span>
          <div>{`$${totalPayment}`}</div>
        </div>

        <div className={cx("item-order")}>
          <span>Voucher</span>
          <div>{`$0`}</div>
        </div>

        <div className={cx("item-order")}>
          <span>Shipping</span>
          <div>
            {totalPayment >= 75 ? "FREE" : totalPayment === 0 ? "$0" : "3$"}
          </div>
        </div>

        <div className={cx("item-order", "estimated")}>
          <span>Estimated Total</span>
          <div>{`$${
            totalPayment >= 75
              ? totalPayment
              : totalPayment === 0
              ? 0
              : totalPayment + 3
          }`}</div>
        </div>
      </div>
    </>
  );
};

export default Order;
