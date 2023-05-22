import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

import Image from "../../../../components/DefaultLayouts/Image";
import Carousel from "../../../../components/DefaultLayouts/Carousel/Carousel";
import {
  addProductSelected,
  updateOrder,
  productDetail,
  handlePendingOrder,
} from "./productDetailSlice";
import ProductDescription from "./ProductDescription/ProductDescription";
import Loading from "../../../../components/DefaultLayouts/Loading";
import MiniCart from "../../cart/MiniCart/MiniCart";
import Title from "../../../../components/DefaultLayouts/Title/Title";
import { Drawer, Rate } from "antd";
import Button from "../../../../components/DefaultLayouts/Button/Button";

const cx = classNames.bind(styles);

Modal.setAppElement("#root");

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [capaIndex, setCapaIndex] = useState("");
  const [inputQty, setInputQty] = useState(1);

  const dispatch = useDispatch();
  // Get Info product
  const { info: productInfo, isLoading } = useSelector(
    (state) => state.productDetail
  );
  const { name, image, capacity, price, stock } = productInfo;

  // Get  Product Info
  const param = useParams();
  useEffect(() => {
    const fetchAPI = (id) => {
      try {
        dispatch(productDetail(id));
      } catch (error) {
        throw error.message;
      }
    };
    fetchAPI(param.id);
  }, [param.id]);

  // refesh Pending Order
  // useEffect(() => {
  //   const fetAPT = async () => {
  //      productAPI.updateOrderPending({
  //       status: "Dispatched",
  //       cart: order.list,
  //     });
  //   };
  //   fetAPT();
  // }, []);

  // Change capacity Selected
  const handleSelected = (index) => {
    if (capaIndex === index) {
      setCapaIndex("");
    } else {
      setCapaIndex(index);
    }
  };
  //Handle input value
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value < 10) {
      setInputQty(e.target.value);
    }
  };

  // handle increase of decrease qty
  const handleIncrease = () => {
    if (inputQty < 9 && capaIndex !== "") {
      setInputQty((prev) => Number(prev) + 1);
    }
  };

  const handleDecrease = () => {
    if (inputQty > 1 && capaIndex !== "") {
      setInputQty((prev) => Number(prev) - 1);
    }
  };

  // Add product to cart
  const handleAddProductToCart = (productInfo) => {
    const product = {
      productId: productInfo._id,
      name: name,
      price: price[capaIndex],
      capacity: capacity[capaIndex],
      quantity: inputQty,
      image: image,
    };

    const token = localStorage.getItem("token");
    if (token) {
      const fetchAPI = () => {
        dispatch(handlePendingOrder({ type: "ADD_ORDER", product }));
      };
      fetchAPI();
    } else {
      dispatch(addProductSelected(product));
      const actionUpdateOrder = updateOrder({
        price: product.price * product.quantity,
        quantity: product.quantity,
      });
      dispatch(actionUpdateOrder);
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={cx("wrapper")}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title />

          <div className={cx("container")}>
            {/* Product Image */}
            <div className={cx("product__photo")}>
              <div className={cx("photo-container")}>
                <div className={cx("photo-main")}>
                  <Image src={image} alt={name} className={cx("img-main")} />
                </div>
                {/* Photo album */}
                <div className={cx("photo-album")}>
                  <Carousel src={image} className={cx("carousel")} />
                </div>
              </div>
            </div>

            <div className={cx("product__info")}>
              <div className={cx("title")}>
                <h1>{name}</h1>
                <Rate
                  allowHalf
                  style={{
                    fontSize: 26,
                  }}
                  defaultValue={3}
                />
              </div>

              <div className={cx("price")}>
                ${" "}
                <span>
                  {capaIndex === "" ? price.join(" - ") : price[capaIndex]}
                </span>
              </div>

              <div className={cx("variant")}>
                <div className={cx("capacity")}>
                  <div className={cx("capacity-title")}>
                    <span className={cx("title-item")}>
                      {capaIndex === "" ? "Select Size" : "Capacity"}
                    </span>
                    <span>
                      {capaIndex === "" ? "" : `${capacity[capaIndex]}ml`}
                    </span>
                  </div>
                  <div className={cx("capacity-item")}>
                    {capacity.length === 0
                      ? ""
                      : capacity.map((item, index) => {
                          return (
                            <div
                              className={cx(
                                "item-select",
                                capaIndex === index ? "selected" : ""
                              )}
                              key={index}
                              onClick={() => handleSelected(index)}
                            >{`${item}ml`}</div>
                          );
                        })}
                  </div>
                </div>
                <div
                  className={cx("stock", stock[capaIndex] < 0 ? "soldout" : "")}
                  style={capaIndex === "" ? { display: "none" } : null}
                >
                  {stock[capaIndex] > 0 ? "Available" : "Out of Stock"}
                </div>
              </div>

              <div className={cx("order")}>
                {/* user-order-quantity */}
                <div className={cx("quantity")}>
                  <input
                    className={cx("input-quantity")}
                    type="number"
                    placeholder="Qty"
                    onChange={handleChange}
                    value={capaIndex === "" ? "" : inputQty}
                    disabled={capaIndex === ""}
                  />

                  <div className={cx("btn-qty")}>
                    <FontAwesomeIcon
                      className={cx("btn-item")}
                      icon={faCaretUp}
                      onClick={handleIncrease}
                    />
                    <FontAwesomeIcon
                      className={cx("btn-item")}
                      icon={faCaretDown}
                      onClick={handleDecrease}
                    />
                  </div>
                </div>

                <div
                  className={cx(
                    "cart",
                    inputQty === "" || inputQty === 0 || capaIndex === ""
                      ? "disabled"
                      : ""
                  )}
                  onClick={() =>
                    inputQty >= 1 &&
                    capaIndex !== "" &&
                    handleAddProductToCart(productInfo)
                  }
                >
                  <span>Add to Cart</span>
                  <span className={cx("total")}>
                    {inputQty === "" || inputQty < 1 || capaIndex === ""
                      ? ""
                      : ` - $${Number(inputQty) * price[capaIndex]}`}
                  </span>
                </div>
              </div>

              <div className={cx("shipping")}>
                Free Standard Shipping on $75+
              </div>
            </div>
          </div>

          {/* Mini cart when user click "Add to cart button" */}

          <Drawer
            title="Your Cart"
            placement="right"
            onClose={onClose}
            open={open}
            closeIcon={<Button className="icon-close">X</Button>}
            contentWrapperStyle={{
              width: "33vw",
              minWidth: "500px",
              height: "100vh",
            }}
            className={cx("drawer")}
          >
            <MiniCart />
          </Drawer>

          {/* description */}
          <ProductDescription productInfo={productInfo} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
