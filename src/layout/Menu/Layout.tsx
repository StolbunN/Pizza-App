import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css"
import { User } from "../../components/User/User";
import Button from "../../components/Button/Button";
import cn from "classnames"
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export function Layout() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const logout = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(userActions.logout())
    navigate("/auth/login");
  }

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <User/>
        <nav className={styles["menu"]}>
          <NavLink to="/" className={({isActive}) => cn(styles["link"], {
            [styles.active]: isActive
          })}>
            <img src="/menu-icon.svg" alt="Меню" />
            Menu
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => cn(styles["link"], {
            [styles.active]: isActive
          })}>
            <img src="/cart-icon.svg" alt="Корзина" />
            Корзина
          </NavLink>
        </nav>
        <Button className={styles["btn-exit"]} onClick={logout}>
          <img src="/off.svg" alt="" />
          <span>Выйти</span>
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet/>
      </div>
    </div>
  )
}