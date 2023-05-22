import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Nav from "../Nav/Nav";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";

const cx = classNames.bind(styles);
const Header = () => {
  const [open, setOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [logo] = useState(localStorage.getItem("name") || "Guest");
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token"));
  const [isAdmin] = useState(Number(localStorage.getItem("role")) === 1);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = (e) => {
      window.pageYOffset > 0 ? setIsScroll(true) : setIsScroll(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRoute = () => {
    navigate("");
  };
  // Handle logout event
  const handleLogout = () => {
    // Remove the token and username from localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("");
    setIsLogin(false);
  };
  //Profile
  const items = [
    isLogin
      ? { key: "1", label: <div onClick={handleLogout}>Logout</div> }
      : {
          key: "1",
          label: (
            <a rel="noopener noreferrer" href="/auth">
              Login
            </a>
          ),
        },

    !isLogin && {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="/auth">
          Register
        </a>
      ),
    },
    isAdmin && {
      key: "3",
      label: (
        <a rel="noopener noreferrer" href="/admin">
          Dashboard
        </a>
      ),
    },
  ];

  return (
    <>
      <div className={cx("wrapper", isScroll ? "change-color" : "")}>
        <div onClick={showDrawer}>
          <Menu />
        </div>
        <div onClick={handleRoute} style={{ cursor: "pointer" }}>
          <img
            src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/olivia-dark.png"
            width="300"
            alt="Perfume Logo, product list anwar fragnances"
          />
        </div>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        >
          <div className={cx("avatar")}>{logo}</div>
        </Dropdown>
      </div>

      <Drawer
        width="100vw"
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        className={cx("drawer")}
      >
        <Nav onClose={onClose} />
      </Drawer>
    </>
  );
};

export default Header;
