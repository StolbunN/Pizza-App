import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import cartIconWhite from "../../assets/cart-icon-white.svg";

function ProductCard(props: ProductCardProps) {

  const dispatch = useDispatch<AppDispatch>();

  const addItem = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div className={styles["product-img"]}>
          <img className={styles.img} src={props.image} alt="" />
          <div className={styles["buy-panel"]}>
            <div className={styles.price}>
              <span>{props.price}</span>
            </div>
            <button className={styles.cart} onClick={addItem}>
              <img className={styles["cart__img"]} src={cartIconWhite} alt="" />
            </button>
          </div>
          <Rating appearance="rating-card_position" rating={props.rating} />
        </div>
        <div className={styles.description}>
          <div className={styles.name}>
            {props.name}
          </div>
          <div className={styles.ingredients}>
            {props.ingredients}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;