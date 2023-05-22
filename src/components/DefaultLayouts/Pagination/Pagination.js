import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);
const Pagination = ({ amountOfPage, className, onClick, activePage }) => {
  let listPage = [];
  const page = (pageNumber = 1) => {
    if (pageNumber <= amountOfPage && amountOfPage > 0) {
      listPage.push(pageNumber);
      pageNumber++;
      return page(pageNumber);
    } else {
      return "";
    }
  };
  page();

  return (
    <div className={cx("wrapper", className)}>
      <button
        className={cx("btn", Number(activePage) === 1 ? "disabled" : "")}
        onClick={() =>
          onClick(Number(activePage) !== 1 && Number(activePage) - 1)
        }
      >
        <LeftOutlined />
      </button>
      {listPage.map((item, index) => {
        return (
          <div
            key={index}
            className={cx(
              "page-number",
              Number(activePage) === item ? "active" : ""
            )}
            onClick={() => onClick(item)}
          >
            {item}
          </div>
        );
      })}
      <button
        className={cx(
          "btn",
          Number(activePage) === amountOfPage ? "disabled" : ""
        )}
        onClick={() =>
          onClick(Number(activePage) !== amountOfPage && Number(activePage) + 1)
        }
      >
        <RightOutlined />
      </button>
    </div>
  );
};
export default Pagination;
