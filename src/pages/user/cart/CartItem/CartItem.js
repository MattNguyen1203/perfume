import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";
import Image from "../../../../components/DefaultLayouts/Image/Image";
import { useDispatch } from "react-redux";
import {
  addProductSelected,
  handlePendingOrder,
  removeItem,
  updateOrder,
} from "../../products/ProductDetail/productDetailSlice";

const cx = classNames.bind(styles);

const CartItem = ({ productSelected, className }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (productId, quantity, capacity, price) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const fetchAPI = () => {
          dispatch(
            handlePendingOrder({
              type: "REMOVE_ITEM",
              product: { productId, capacity },
            })
          );
        };
        fetchAPI();
      } catch (error) {
        return error.message;
      }
    } else {
      dispatch(removeItem({ productId, capacity }));
      dispatch(
        updateOrder({ quantity: quantity * -1, price: price * quantity })
      );
    }
  };

  const handleChangeOrder = (productId, quantity, capacity, price) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const fetchAPI = () => {
          dispatch(
            handlePendingOrder({
              type: "ADD_ORDER",
              product: { productId, capacity, quantity },
            })
          );
        };
        fetchAPI();
      } catch (error) {
        return error.message;
      }
    } else {
      dispatch(addProductSelected({ productId, quantity, capacity }));
      dispatch(updateOrder({ quantity, price }));
    }
  };

  // const handleRoute = (id) => {
  //   navigate(`/products/${id}`);
  // };
  return (
    <>
      {productSelected.map((item, index) => {
        return (
          <div className={cx("cart-item", className)} key={index}>
            <Image src={item.image} className={cx("item-img")} />
            <div className={cx("main-item")}>
              <div className={cx("info")}>
                <a
                  href={`products/${item.productId}`}
                  className={cx("item-name")}
                >
                  {item.name}
                </a>
                <span
                  className={cx("item-capacity")}
                >{`${item.capacity}ml`}</span>
                <span className={cx("item-price")}>{`$${item.price}`}</span>
              </div>
              <div className={cx("item-quantity")}>
                <div className={cx("qty")}>
                  <div className={cx("title")}>Quantity:</div>
                  <div className={cx("btn-qty")}>
                    <div
                      className={cx(
                        "btn-minus",
                        item.quantity === 1 ? "disabled" : ""
                      )}
                      onClick={
                        item.quantity > 1
                          ? () =>
                              handleChangeOrder(
                                item.productId,
                                -1,
                                item.capacity,
                                item.price
                              )
                          : null
                      }
                    >
                      -
                    </div>
                    <span>{item.quantity}</span>
                    <div
                      className={cx(
                        "btn-plus",
                        item.quantity === 9 ? "disabled" : ""
                      )}
                      onClick={
                        item.quantity < 9
                          ? () =>
                              handleChangeOrder(
                                item.productId,
                                1,
                                item.capacity,
                                item.price
                              )
                          : null
                      }
                    >
                      +
                    </div>
                  </div>
                </div>
                <div
                  className={cx("btn-remove")}
                  onClick={() =>
                    handleRemoveItem(
                      item.productId,
                      item.quantity,
                      item.capacity,
                      item.price
                    )
                  }
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartItem;
