import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import styles from "./Menu.module.css"

export function Menu() {
  return (
    <div>
      <div className={styles["header"]}>
        <Header>Меню</Header>
        <Search type="search" placeholder="Введите блюдо или состав"/>
      </div>
      <main className={styles["products"]}>
        <ProductCard 
          id="1"
          price={300}
          rating={4.5}
          img="/cart-icon-white.svg"
          productName="Наслаждение"
          ingredients={"Салями, руккола, помидоры, оливки"}
        />
      </main>
    </div>  
  )
}