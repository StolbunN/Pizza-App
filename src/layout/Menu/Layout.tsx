import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { User } from "../../components/User/User";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import cartIcon from "../../assets/cart-icon.svg";
import menuIcon from "../../assets/menu-icon.svg";
import offIcon from "../../assets/off-icon.svg";

export function Layout() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <User name={profile?.name} email={profile?.email} />
        <nav className={styles["menu"]}>
          <NavLink to="/" className={({ isActive }) => cn(styles["link"], {
            [styles.active]: isActive
          })}>
            <img src={menuIcon} alt="Меню" />
            Menu
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => cn(styles["link"], {
            [styles.active]: isActive
          })}>
            <img src={cartIcon} alt="Корзина" />
            Корзина <span className={styles["cart-count"]}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
          </NavLink>
        </nav>
        <Button className={styles["btn-exit"]} onClick={logout}>
          <img src={offIcon} alt="" />
          <span>Выйти</span>
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}