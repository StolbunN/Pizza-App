import ProductCard from "../ProductCard/ProductCard";
import styles from "./MenuList.module.css";
import { MenuListProps } from "./MenuList.props";

function MenuList({products}: MenuListProps) {
  return (
    <div className={styles.wrapper}>
      {products.map(p => (
      <ProductCard
        key={p.id}
        id={p.id}
        price={p.price}
        rating={p.rating}
        image={p.image}
        name={p.name}
        ingredients={p.ingredients.join(", ")}
      />
      ))}
    </div>
  )
}

export default MenuList