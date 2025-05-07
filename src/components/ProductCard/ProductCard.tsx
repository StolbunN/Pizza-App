import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";

function ProductCard(props: ProductCardProps) {

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
      <div className={styles["product-img"]}>
        <img className={styles.img} src={props.img} alt="" />
        <div className={styles["buy-panel"]}>
          <div className={styles.price}>
            <span>{props.price}</span>
          </div>
          <button className={styles.cart}>
            <img className={styles["cart__img"]} src="./cart-icon-white.svg" alt="" />
          </button>
        </div>
        <Rating appearance="rating-card_position" rating={props.rating}/>
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
  )
}

export default ProductCard;