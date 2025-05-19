import { ChangeEvent, useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css"
import axios, { AxiosError } from "axios";
import MenuList from "../../components/MenuList/MenuList";

export type SearchInput = {
  value: string
}

function Menu() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getMenu(filter);
  }, [filter])

  const searchProduct = async (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }


  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const {data} = await axios.get<IProduct[]>(`${PREFIX}/products`, {
        params: {
          name
        }
      });
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

  return (
    <div>
      <div className={styles["header"]}>
        <Heading>Меню</Heading>
        <Search type="search" placeholder="Введите блюдо или состав" onChange={searchProduct}/>
      </div>
      <main className={styles["products"]}>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products}/>}
        {isLoading && <>Загрузка...</>}
        {!isLoading && products.length === 0 && <>Не найдено</>}
      </main>
    </div>  
  )
}

export default Menu;