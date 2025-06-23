import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import logo from "../../assets/logo.svg";

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}