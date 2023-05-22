import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../../../components/DefaultLayouts/Sidebar/Sidebar";
import Pagination from "../../../../components/DefaultLayouts/Pagination";
import ProductItem from "../ProductItem/ProductItem";
import { getProductList } from "./productListSlice";
import NotFound from "../../../../components/NotFound/NotFound";
import Loading from "../../../../components/DefaultLayouts/Loading/Loading";
import Title from "../../../../components/DefaultLayouts/Title/Title";

const cx = classNames.bind(styles);

const ProductsList = () => {
  // use Hook
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get list data API
  const productList = useSelector((state) => state.productList);
  const { list, totalPage, isLoading } = productList;

  // Active page and filter field
  const activePage = searchParams.get("page");

  const params = {
    sort: searchParams.get("sort"),
    brand: searchParams.get("brand"),
    type: searchParams.get("type"),
    stock: searchParams.get("stock"),
    price: searchParams.get("price"),
    aroma: searchParams.get("aroma"),
  };
  // use useEffect Hook to fetch APT
  useEffect(() => {
    // setLoading(true);
    const fetchAPI = () => {
      try {
        // check "params" have any value # null
        const paramValues = Object.values(params).every(
          (item) => item === null
        );

        if (paramValues) {
          dispatch(
            getProductList({
              type: "NOT_FILTER",
              params: { page: activePage || 1 },
            })
          );
        } else {
          dispatch(
            getProductList({
              type: "FILTER",
              params: params,
              page: activePage || 1,
            })
          );
        }
      } catch (error) {
        throw new Error({
          error: error.message,
        });
      }
    };
    fetchAPI();
  }, [JSON.stringify(params), activePage]);

  // add event onClick of pagination
  const handleChangeActivePage = (item) => {
    let url = "";
    let newParams = { page: item };
    for (let key in params) {
      if (params[key] !== null) {
        newParams = { ...newParams, [key]: params[key] };
      }
    }
    const paramKey = Object.keys(newParams);
    const paramValue = Object.values(newParams);
    paramKey.forEach((item, index) => {
      index === paramKey.length - 1
        ? (url += `${item}=${paramValue[index]}`)
        : (url += `${item}=${paramValue[index]}&`);
    });
    navigate(`?${url}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <img
          src="https://cdn.create.vista.com/api/media/medium/647481922/stock-photo-transparent-bottle-perfume-pink-background?token="
          alt=""
        />
        <img
          src="https://cdn.create.vista.com/api/media/medium/228009566/stock-photo-perfume-bottle-light-pink-floral?token="
          alt=""
        />
      </div>
      <Title />

      <div className={cx("title")}>
        <span>Fragrance</span>
        <span className={cx("sub-title")}>{` (${list.length} items)`}</span>
      </div>
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          {isLoading ? (
            <Loading className={cx("loader-list")} />
          ) : list.length !== 0 ? (
            <div className={cx("list-product")}>
              {list.map((item, index) => {
                return <ProductItem key={index} data={item} />;
              })}
            </div>
          ) : (
            <NotFound />
          )}

          {totalPage > 1 && (
            <Pagination
              amountOfPage={totalPage}
              className={cx("pagination")}
              onClick={handleChangeActivePage}
              activePage={activePage || 1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
