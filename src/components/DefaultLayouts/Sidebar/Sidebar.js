import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import productAPI from "../../../api/user/productAPI";
import {
  setFilterList,
  setCurrentKey,
  setInitCurrentKey,
} from "./SidebarSlice";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

function getItem(label, key, children) {
  return {
    key,
    children,
    label,
  };
}

const sidebarItem = ["aroma", "brand", "type"];

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const sidebarList = useSelector((state) => state.sideBar.sidebarList); // Get Sidebar List
  const currentKeyObj = useSelector((state) => state.sideBar.currentKey); // Check sidebar-item actived

  const current = Object.values(currentKeyObj).flat(); // Flat arr
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const paramsCurrentKeys = {
    sort: searchParams.get("sort") || null,
    brand: searchParams.get("brand") || null,
    type: searchParams.get("type") || null,
    stock: searchParams.get("stock") || null,
    price: searchParams.get("price") || null,
    aroma: searchParams.get("aroma") || null,
  };

  useEffect(() => {
    setLoading(true);
    const fetchAPI = async () => {
      try {
        const response = await productAPI.getDataSidebar(sidebarItem);
        let items = [
          getItem("Sort by", "sort", [
            getItem("A -> Z", "nac", ""),
            getItem("Z -> A", "ndc", ""),
            getItem("Price Low To High", "pac", ""),
            getItem("Price High To Low", "pdc", ""),
          ]),
          getItem(
            "Aroma",
            sidebarItem[0],
            response.aroma.map((item) => getItem(item, item.toLowerCase(), ""))
          ),
          getItem(
            "Brand",
            sidebarItem[1],
            response.brand.map((item) => getItem(item, item.toLowerCase(), ""))
          ),
          getItem(
            "Type",
            sidebarItem[2],
            response.type.map((item) => getItem(item, item.toLowerCase(), ""))
          ),
          getItem("Price", "price", [
            getItem("100$ - 300$", "100-300", ""),
            getItem("300$ - 500$", "300-500", ""),
            getItem("Higher Than 500$", "500-1000", ""),
          ]),
          getItem("Stock", "stock", [getItem("Available", "0-1000", "")]),
        ];
        const action = setFilterList(items);
        dispatch(action);
        if (response) {
          await setLoading(false);
        }
      } catch (error) {
        throw new Error("Invalid Data");
      }
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    const params = {
      sort: searchParams.get("sort") || null,
      brand: searchParams.get("brand") || null,
      type: searchParams.get("type") || null,
      stock: searchParams.get("stock") || null,
      price: searchParams.get("price") || null,
      aroma: searchParams.get("aroma") || null,
    };

    const currentKeysAction = setInitCurrentKey(params);
    dispatch(currentKeysAction);
  }, [JSON.stringify(paramsCurrentKeys)]);

  const onClick = (e) => {
    const action = setCurrentKey({
      key: e.key,
      keyPath: e.keyPath[1],
    });
    dispatch(action);
  };

  const handleFilter = () => {
    let url = "";
    let newParams = {};
    for (let key in currentKeyObj) {
      if (currentKeyObj[key] !== null) {
        newParams = { ...newParams, [key]: currentKeyObj[key] };
      }
    }
    const paramKey = Object.keys(newParams);
    const paramValue = Object.values(newParams);

    if (paramKey.length !== 0) {
      paramKey.forEach((item, index) => {
        index === paramKey.length - 1
          ? (url += `${item}=${paramValue[index]}`)
          : (url += `${item}=${paramValue[index]}&`);
      });
    }

    navigate(`?${url}`);
  };

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <Loading className={cx("sidebar-load")} />
      ) : (
        <>
          <Menu
            onClick={onClick}
            selectedKeys={current}
            mode="inline"
            style={{
              flex: 1,
              fontSize: "1.5rem",
              borderRadius: "4px",
            }}
            items={sidebarList}
            className={cx("menu")}
          />
          <Button className="btn-filter" onClick={handleFilter}>
            Filter{" "}
            <FontAwesomeIcon icon={faFilter} style={{ marginLeft: "8px" }} />
          </Button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
