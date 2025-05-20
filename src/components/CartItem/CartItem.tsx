import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import cn from "classnames";

function CartItem(props: CartItemProps) {

  const dispatch = useDispatch<AppDispatch>();

  const increase = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  }

  const decrease = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.decrease(props.id));
  }

  const remove = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.remove(props.id))
  }

  return (
    <div className={styles["item"]}>
      <div className={styles["product-img"]}>
        <img className={styles["img"]} src={props.image} alt="Изображение товара" />
      </div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>
          {props.name}
        </div>
        <div className={styles["price"]}>
          <span>{props.price}&nbsp;</span>
        </div>
      </div>
      <div className={styles["actions"]}>
        <button className={cn(styles["button"], styles["decrease"])} onClick={decrease}>
          <img src="/decrease.svg" alt="Убрать из корзины" />
        </button>
        <div className={styles["item__count"]}>
          {props.count}
        </div>
        <button className={cn(styles["button"], styles["increase"])} onClick={increase}>
          <img src="/increase.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles["button__remove"]} onClick={remove}>
          <img src="/delete.svg" alt="Удалить из корзины" />
        </button>
      </div>
    </div>
  )
}

export default CartItem;