import classNames from "classnames/bind";
import styles from "./Image.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

const Image = forwardRef(
  ({ src, className, alt, onClick, onMouseMove, onMouseOut }, ref) => {
    return (
      <img
        src={src}
        className={cx(className)}
        alt={alt}
        onClick={onClick}
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      />
    );
  }
);

export default Image;
