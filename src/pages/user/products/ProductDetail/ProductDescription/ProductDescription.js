import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./ProductDescription.module.scss";

const cx = classNames.bind(styles);
const ProductDescription = ({ productInfo }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("prd-des-title")}>About The Product</div>
      <div className={cx("prd-des-detail")}>
        <h2 className={cx("prd-name")}>{productInfo.name}</h2>
        <div className={cx("marketing-copy")}>{productInfo.description}</div>
        <div className={cx("sub-des")}>
          <div className={cx("sub-item")}>
            <div className={cx("title")}>Products Detail</div>
            <div className={cx("content")}>
              <div>- Product's Name: {productInfo.name}.</div>
              <div>- Brand: {productInfo.brand}.</div>
              <div>
                - Aroma:{" "}
                {productInfo.aroma && productInfo.aroma.length > 1
                  ? productInfo.aroma.join(", ")
                  : productInfo.aroma}
                .
              </div>
              <div>- Manufacturing Year: 2023.</div>
            </div>
          </div>
          <div className={cx("sub-item")}>
            <div className={cx("title")}>Shipping and Returns</div>
            <div className={cx("content")}>
              <div>
                - A flat rate cost of $4.95 USD will be deducted from your
                refund for returns.
              </div>
              <div>
                - Returns accepted by mail and in store within 45 days of the
                shipment date.
              </div>
              <div>- Items must be unworn and tags must be attached.</div>
              <div>
                - Once a return is received, please allow 7-14 business days to
                process and 3-5 business days for the refund to be credited to
                the payment method used at the time of purchase.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDescription);
