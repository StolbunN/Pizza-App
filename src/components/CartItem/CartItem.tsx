import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {

  const dispatch = useDispatch<AppDispatch>();

  const increase = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  }

  const decrease = (e: MouseEvent) => {
    e.preventDefault();
  }

  const remove = (e: MouseEvent) => {
    e.preventDefault();
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
          <span>{props.price}</span>
        </div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["button"]} onClick={decrease}>
        </button>
        <div className={styles["item__count"]}>
          {props.count}
        </div>
        <button className={styles["button"]} onClick={increase}>
        </button>
        <button className={styles["button__remove"]} onClick={remove}>
        </button>
      </div>
    </div>
  )
}

export default CartItem;