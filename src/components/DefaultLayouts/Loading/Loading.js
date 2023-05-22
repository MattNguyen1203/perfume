import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
const cx = classNames.bind(styles);

const Loading = ({ className }) => {
  return <div className={cx("loader", className)}></div>;
};

export default Loading;
