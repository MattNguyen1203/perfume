import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";

import "./Carousel.module.scss";
import Image from "../Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveImg } from "../../../pages/user/products/ProductDetail/productDetailSlice";
import { memo } from "react";

const cx = classNames.bind(styles);
const Carousel = ({ className, src }) => {
  const arrSrc = [src, src, src, src];

  const dispatch = useDispatch();
  const imgActiveIndex = useSelector(
    (state) => state.productDetail.imgActiveIndex
  );
  const handleActiveImg = (index) => {
    const action = changeActiveImg(index);
    dispatch(action);
  };
  return (
    <div className={cx(className)}>
      {arrSrc.map((item, index) => (
        <Image
          key={index}
          src={item}
          className={cx(
            "item-img",
            imgActiveIndex === index ? "active-img" : ""
          )}
          onClick={() => handleActiveImg(index)}
        />
      ))}
    </div>
  );
};

export default memo(Carousel);
