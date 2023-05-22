import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Title.module.scss";

const cx = classNames.bind(styles);
const Title = () => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate("/products");
  };

  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon
        icon={faHouse}
        onClick={handleBackHome}
        style={{ fontSize: "1.3rem", marginRight: "4px" }}
      />
      /
      <span onClick={handleClickBack} className={cx("link-title")}>
        Shop All
      </span>
    </div>
  );
};

export default Title;
