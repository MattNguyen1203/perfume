import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styles from "../../pages/admin/styles/dashboard.module.css"



const AdminRoutes = () => {
  // const [layout, setLayout] = useState("product")
  return (
    <div className={styles.container}>
      <nav className={styles.nav_bar}>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
              to="/admin/product"
              // onClick={()=>setLayout("product")}
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
              to="/admin/order"
              // onClick={()=>setLayout("order")}
            >
              Order
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.outlet}>
        <Outlet/>   
      </div>
    </div>
  );
};

export default AdminRoutes;
