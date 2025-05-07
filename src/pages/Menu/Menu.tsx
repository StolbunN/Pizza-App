import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css"

export function Menu() {

  const [products, setProducts] = useState<Product[]>([])

  const getMenu = async () => {
    try {
      const res = await fetch(`${PREFIX}/products`);
      if(!res.ok) {
        return;
      }
      const data = await res.json() as Product[];
      setProducts(data);
    } catch(err) {
      console.error(err);
      return;
    }
  }

  useEffect(() => {
    getMenu();
  }, [])

  return (
    <div>
      <div className={styles["header"]}>
        <Header>Меню</Header>
        <Search type="search" placeholder="Введите блюдо или состав"/>
      </div>
      <main className={styles["products"]}>
        {products.map(p => (
          <ProductCard
            key={p.id}
            id={p.id}
            price={p.price}
            rating={p.rating}
            img={p.image}
            name={p.name}
            ingredients={p.ingredients.join(", ")}
        />
        ))}
      </main>
    </div>  
  )
}