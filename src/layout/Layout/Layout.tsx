import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css"
import { User } from "../../components/User/User";
import Button from "../../components/Button/Button";

export function Layout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <User/>
        <nav className={styles["menu"]}>
          <Link to="/" className={styles["link"]}>
            <img src="./menu-icon.svg" alt="Меню" />
            Menu
          </Link>
          <Link to="/cart" className={styles["link"]}>
            <img src="./cart-icon.svg" alt="Корзина" />
            Корзина
          </Link>
        </nav>
        <Button className={styles["btn-exit"]}>
          <img src="./off.svg" alt="" />
          <span>Выйти</span>
        </Button>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}