import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Image from "../../../../components/DefaultLayouts/Image/Image";

const cx = classNames.bind(styles);
const ProductItem = ({ data }) => {
  return (
    <a href={`products/${data._id}`} className={cx("wrapper")}>
      <Image src={data.image} className={cx("product-img")} />
      <div className={cx("product-info")}>
        <div className={cx("product-name")}>{data.name}</div>
        <div className={cx("product-price")}>
          $<span>{`${data.price[0]}`}</span>
        </div>
      </div>
    </a>
  );
};

export default ProductItem;
