import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css"
import axios, { AxiosError } from "axios";
import MenuList from "../../components/MenuList/MenuList";

export function Menu() {

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>()

  const getMenu = async () => {
    try {
      setIsLoading(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });
      const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
    } catch(err) {
      if(err instanceof AxiosError) {
        console.error(err.message);
        setError(err.message);
      }
      console.error(err);
      return;
    }
    finally {
      setIsLoading(false)
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
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products}/>}
        {isLoading && <>Загрузка...</>}
      </main>
    </div>  
  )
}