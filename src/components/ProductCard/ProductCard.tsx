import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";

function ProductCard(props: ProductCardProps) {

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]} id={props.id}>
      <div className={styles["product-img"]}>
        <img className={styles.img} src="./pizza.png" alt="" />
        <div className={styles["buy-panel"]}>
          <div className={styles.price}>
            <span>{props.price}</span>
          </div>
          <button className={styles.cart}>
            <img className={styles["cart__img"]} src={props.img} alt="" />
          </button>
        </div>
        <Rating appearance="rating-card_position" rating={props.rating}/>
      </div>
      <div className={styles.description}>
        <div className={styles.name}>
          {props.productName}
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