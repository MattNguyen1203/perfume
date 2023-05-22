import classNames from "classnames/bind";
import styles from "./Nav.module.scss";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(styles);

const Nav = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?name=${inputValue}`);
    }
  };
  return (
    <div>
      <div className={cx("nav-open")}>
        <div onClick={onClose} className={cx("btn-close")}>
          X
        </div>
        <div className={cx("nav-all")}>
          {/* Main Menu */}
          <div className={cx("first")}>
            <div className={cx("nav-con", "numx")}>
              <div className={cx("nav-text")}>FEEL THE LOVE</div>
              <div className={cx("nav-headline")}>
                <a href="/products?type=men" className={cx("hi")}>
                  MEN
                </a>
                <span style={{ fontSize: "9rem" }}>&nbsp;&&nbsp;</span>
                <a href="/products?type=women" className={cx("hi")}>
                  WOMEN
                </a>
                <br />
                <a href="/products?type=unisex" className={cx("hi")}>
                  UNISEX
                </a>
              </div>
            </div>
            <a href="/cart" className={cx("nav-cart")}>
              YOUR CART
            </a>
          </div>
          <div className={cx("nav-con", "numy")}>
            <div className={cx("nav-text")}>YOU LOOKING FOR...</div>
            <div className={cx("nav-headline")}>
              <input
                className={cx("nav-input")}
                placeholder="Enter Name"
                onKeyPress={handlePress}
                onChange={handleChange}
                value={inputValue}
              />
            </div>
          </div>
          <div className={cx("nav-con", "numz")}>
            <div className={cx("nav-text")}>ANY QUESTION?</div>
            <div className={cx("nav-headline", "halo")}>
              <div className={cx("hi")}>CONTACT US</div>
              <div className={cx("icon-container")}>
                <div className={cx("icon", "hi")}>
                  {" "}
                  <FacebookOutlined />{" "}
                </div>
                <div className={cx("icon", "hi")}>
                  {" "}
                  <InstagramOutlined />
                </div>
                <div className={cx("icon", "hi")}>
                  {" "}
                  <TwitterOutlined />{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Credit */}
          <div className={cx("bottom")}>
            <div className={cx("bottom-credit")}>
              BTMM © 2023 NVH. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
