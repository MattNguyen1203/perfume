import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
const Button = (props) => {
  const { className, children, onClick } = props;
  return (
    <button className={cx("btn", className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
