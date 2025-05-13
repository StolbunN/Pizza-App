import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css"
import axios, { AxiosError } from "axios";
import MenuList from "../../components/MenuList/MenuList";

function Menu() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>()

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.get<IProduct[]>(`${PREFIX}/products`);
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
        <Heading>Меню</Heading>
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

export default Menu;