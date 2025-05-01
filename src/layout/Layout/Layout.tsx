import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css"
import { User } from "../../components/User/User";
import Button from "../../components/Button/Button";
import cn from "classnames"

export function Layout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <User/>
        <nav className={styles["menu"]}>
          <NavLink to="/" className={({isActive}) => cn(styles["link"], {
            [styles.active]: isActive
          })}>
            <img src="./menu-icon.svg" alt="Меню" />
            Menu
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => cn(styles["link"], {
            [styles.active]: isActive
          })}>
            <img src="./cart-icon.svg" alt="Корзина" />
            Корзина
          </NavLink>
        </nav>
        <Button className={styles["btn-exit"]}>
          <img src="./off.svg" alt="" />
          <span>Выйти</span>
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet/>
      </div>
    </div>
  )
}